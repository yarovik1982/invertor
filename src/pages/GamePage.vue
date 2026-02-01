<script setup>
	import { ref, computed, watch } from "vue";
	import { storeToRefs } from "pinia";

	import { useStatusStore } from "@/store/status";
	import { usePrasesStore } from "@/store/prases";

	/* =======================
   STORES
======================= */
	const statusStore = useStatusStore();
	const phrasesStore = usePrasesStore();

	const { selectedCategory } = storeToRefs(statusStore);

	/* =======================
   GAME STATE
======================= */
	const result = ref([]);
	const hintedWord = ref(null);

	const isHintOpen = ref(false);
	const isCompleted = ref(false);
	const isCorrect = ref(false);

	const audio = ref(null);

	/* =======================
   CURRENT PHRASE
======================= */
	const currentPhrase = computed(() =>
		phrasesStore.currentPhrase(selectedCategory.value),
	);

	const ruPhrase = computed(() => currentPhrase.value?.ru ?? "");
	const engPhrase = computed(() => currentPhrase.value?.eng ?? "");
	const audioSrc = computed(() => currentPhrase.value?.audio ?? null);

	/* =======================
   SHUFFLED WORDS
======================= */
	const shuffledWords = computed(() => {
		if (!engPhrase.value) return [];
		return engPhrase.value.split(" ").sort(() => Math.random() - 0.5);
	});

	/* =======================
   USED WORDS
======================= */
	const usedWords = computed(() => new Set(result.value));

	/* =======================
   WORD CLICK
======================= */
	const pushResult = (word) => {
		if (isCompleted.value) return;
		if (usedWords.value.has(word)) return;

		result.value.push(word);

		if (hintedWord.value === word) {
			hintedWord.value = null;
		}

		checkCompletion();
	};

	/* =======================
   UNDO
======================= */
	const undo = () => {
		if (result.value.length > 0) {
			result.value.pop();
			hintedWord.value = null;
		}
	};

	/* =======================
   CHECK COMPLETION
======================= */
	const checkCompletion = () => {
		if (result.value.length !== shuffledWords.value.length) return;

		isCompleted.value = true;

		const userPhrase = result.value.join(" ").toLowerCase();
		const correctPhrase = engPhrase.value.toLowerCase();

		isCorrect.value = userPhrase === correctPhrase;
	};

	/* =======================
   RESET EXERCISE
======================= */
	const resetExercise = () => {
		result.value = [];
		hintedWord.value = null;
		isCompleted.value = false;
		isCorrect.value = false;
	};

	/* =======================
   NEXT PHRASE
======================= */
	const goNextPhrase = () => {
		stopAudio();
		phrasesStore.nextPhrase(selectedCategory.value);
		resetExercise();
	};

	/* =======================
   AUDIO
======================= */
	const playAudio = () => {
		if (!audioSrc.value) {
			goNextPhrase();
			return;
		}

		stopAudio();

		audio.value = new Audio(audioSrc.value);
		audio.value.play();

		// audio.value.onended = () => {
		// 	goNextPhrase();
		// };
	};

	const stopAudio = () => {
		if (audio.value) {
			audio.value.pause();
			audio.value = null;
		}
	};

	/* =======================
   SKIP AUDIO (CLICK OVERLAY)
======================= */
	const skipAudio = () => {
		goNextPhrase();
	};

	/* =======================
   HINT LOGIC
======================= */
	const openHint = () => {
		if (result.value.length === 0) return;
		isHintOpen.value = true;
	};

	const acceptHint = () => {
		const words = engPhrase.value.split(" ");
		const nextIndex = result.value.length;

		hintedWord.value = words[nextIndex] || null;
		isHintOpen.value = false;
	};

	const disableAds = () => {
		isHintOpen.value = false;
	};

	/* =======================
   CLEANUP ON CHANGE
======================= */
	watch([engPhrase, selectedCategory], () => {
		stopAudio();
		resetExercise();
	});
</script>

<template>
	<div class="game-page" id="forHint">
		<div class="overlay" v-if="isHintOpen">
			<div class="dialog" style="background-color: #121212">
				<p>Вы можете отключить рекламу, задонатив автору 100 звезд</p>

				<div class="dialog-group">
					<button @click="disableAds">Задонатить</button>
					<button @click="acceptHint">Оставить</button>
				</div>
			</div>
		</div>
		<div
			class="overlay"
			id="forVoice"
			v-if="isCompleted && isCorrect"
			@click.self="skipAudio">
			<div class="dialog">
				<div class="dialog-row">
					<button class="btn-more" @click="skipAudio">Дальше</button>
				</div>
				<div class="dialog-group dialog-voice">
					<button class="btn-voice" @click="playAudio">📢</button>
				</div>
			</div>
		</div>
		<div class="overlay" id="forChecked" v-if="isCompleted && !isCorrect">
			<div class="dialog">
				<div class="dialog-group">
					<button @click="resetExercise">Заново</button>
					<button>Далее</button>
				</div>
			</div>
		</div>

		<div class="game-content">
			<h2>
				Категория:
				<span style="color: #5e5ebd; text-shadow: initial">{{
					selectedCategory
				}}</span>
			</h2>
			<p class="ru" style="font-size: 20px; color: orange; margin-top: 20px">
				{{ ruPhrase }}
			</p>

			<div class="result" style="font-size: 30px; color: #04e904">
				{{ result.join(" ") }}
			</div>

			<p class="eng">
				<button
					class="word"
					v-for="(word, index) in shuffledWords"
					:key="index"
					:disabled="usedWords.has(word) || isCompleted"
					:class="{
						hint: word === hintedWord,
						disabled: usedWords.has(word),
					}"
					@click="pushResult(word)">
					{{ word }}
				</button>
			</p>

			<div
				class="actions-group"
				:class="{ visible: result.length > 0 && !isCompleted }">
				<button @click="undo">Отменить</button>
				<button @click="openHint">Подсказка</button>
			</div>
		</div>
	</div>
</template>

<style scoped>
	.game-page {
		position: relative;
		width: 100%;
		height: 100%;
	}
	.game-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		overflow-y: auto;
		height: 100%;
		padding: 20px;
	}
	.result {
		flex: 1 auto;
	}
	.eng {
		display: flex;
		width: 100%;
		gap: 10px;
		justify-content: center;
		flex-wrap: wrap;
		padding-bottom: 20px;
	}
	.word {
		background: transparent;
		text-transform: lowercase;
		box-shadow: 0 0 1px 1px gold;
		min-width: 50px;
		padding: 10px;
		border-radius: 12px;
		cursor: pointer;
		transition: box-shadow 0.3s linear, transform 0.3s linear;
	}
	.word.hint,
	.word:hover {
		box-shadow: 0 -2px 10px 1px gold;
		transform: translateY(-3px);
	}
	.word.disabled {
		opacity: 0.4;
		pointer-events: none;
		cursor: not-allowed;
	}
	.overlay {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: linear-gradient(transparent);
		backdrop-filter: blur(5px);
		z-index: 10;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.dialog-group {
		display: flex;
		width: 100%;
		align-items: center;
		justify-content: space-around;
		padding: 20px;
		gap: 10px;
	}
	.dialog-group button {
		width: fit-content;
		min-width: 200px;
		padding: 20px;
		border-radius: 16px;
		margin-top: 20px;
		cursor: pointer;
		background: linear-gradient(135deg, #2563eb 0%, #3b82f6 100%);
		position: relative;
		overflow: hidden;
	}
	.dialog-group button:before {
		content: "";
		position: absolute;
		top: 0;
		left: -100%;
		width: 100%;
		height: 100%;
		background: linear-gradient(
			90deg,
			transparent,
			rgba(255, 255, 255, 0.2),
			transparent
		);
		transition: left 0.5s;
	}
	.dialog-group button:hover::before {
		left: 100%;
	}
	button.btn-more {
		cursor: pointer;
		padding: 10px;
		border-radius: 12px;
		transition: all 0.3s 0.1s linear;
      background: linear-gradient(135deg, #2563eb 0%, #3b82f6 100%);
      position: relative;
		overflow: hidden;
	}
   button.btn-more:before {
      content: "";
		position: absolute;
		top: 0;
		left: -100%;
		width: 100%;
		height: 100%;
		background: linear-gradient(
			90deg,
			transparent,
			rgba(255, 255, 255, 0.2),
			transparent
		);
		transition: left 0.5s;
   }
   button.btn-more:hover::before {
      left: 100%;
   }
	button.btn-voice {
		width: 70px;
		height: 70px;
		min-width: 70px;
		border-radius: 50%;
		font-size: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: transform 0.3s linear;
	}
	button.btn-voice:active {
		transform: scale(1.2);
	}
	.actions-group {
		display: flex;
		width: 100%;
		align-items: center;
		justify-content: space-between;
		padding-bottom: 20px;
		visibility: hidden;
	}
	.actions-group.visible {
		visibility: visible;
	}
	.actions-group button {
		cursor: pointer;
		padding: 10px;
		border-radius: 12px;
		transform: scale(0);
		transition: all 0.3s 0.1s linear;
      background: linear-gradient(135deg, #2563eb 0%, #3b82f6 100%);
      overflow: hidden;
      position: relative;
	}
   .actions-group button:before {
      content: "";
		position: absolute;
		top: 0;
		left: -100%;
		width: 100%;
		height: 100%;
      background: linear-gradient(
			90deg,
			transparent,
			rgba(255, 255, 255, 0.2),
			transparent
		);
		transition: left 0.5s;
   }
   .actions-group button:hover::before {
      left: 100%;
   }
	.actions-group.visible button:nth-child(1) {
		transition-delay: 0.1s;
   }
	.actions-group.visible button {
		transform: scale(1);
	}
</style>
