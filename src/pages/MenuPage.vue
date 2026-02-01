<script setup>
	import { ref } from "vue";
	import { useRouter } from "vue-router";
	import { storeToRefs } from "pinia";
	import { useStatusStore } from "../store/status.js";

	const router = useRouter();

	// store
	const statusStore = useStatusStore();
	const { selectedCategory } = storeToRefs(statusStore);

	// local state
	const isDialog = ref(false);

	const btns = [
		{ id: "life", label: "Быт" },
		{ id: "travels", label: "Путешествия" },
		{ id: "work", label: "Работа" },
		{ id: "shoping", label: "Покупки" },
	];

	const toggleDialog = () => {
		isDialog.value = !isDialog.value;
	};

	const selectCategory = (id) => {
		statusStore.setCategory(id);
		toggleDialog();
	};

	const confirmCategory = () => {
		toggleDialog();
		router.push("/game");
	};
</script>

<template>
	<div class="menu-page">
		<div class="overlay" v-if="isDialog">
			<div class="dialog">
				<div class="dialog-row">Выбрана категория {{ selectedCategory }}</div>

				<div class="dialog-group">
					<button class="btn-action" id="cancel" @click="toggleDialog">
						Отменить
					</button>

					<button class="btn-action" id="more" @click="confirmCategory">
						Далее
					</button>
				</div>
			</div>
		</div>
		<div class="menu-content">
			<h2>Выбор категории</h2>

			<div class="row" >
				<button class="btn-category" v-for="btn in btns" :key="btn.id" :id="btn.id" @click="selectCategory(btn.id)">
					{{ btn.label }}
				</button>
			</div>
		</div>
	</div>
</template>

<style scoped>
	.menu-page {
		width: 100%;
		height: 100%;
		position: relative;
		padding: 20px;
	}
    .menu-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow-y: auto;
        height: 100%;
        padding: 20px;
    }
	.overlay {
		position: absolute;
		top: -20px;
		left: 0;
		width: 100%;
		height: calc(100% - 20px);
		background: linear-gradient(rgba(0,0,0,.7));
		backdrop-filter: blur(5px);
		z-index: 10;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.dialog {
        /* height: 50%; */
		padding: 20px;
        backdrop-filter: blur(10px);
		/* background-color: #121212; */
		/* border-radius: 16px; */
	}
	.dialog-row {
		/* color: #555; */
		/* text-shadow: initial; */
        margin-bottom: 20px;
	}
	.dialog-group {
		width: 100%;
		display: flex;
		justify-content: center;
		gap: 20px;
	}
	.btn-action {
		padding: 10px;
		border-radius: 12px;
		cursor: pointer;
		min-width: calc(50% - 5px);
        background: linear-gradient(135deg, #2563eb 0%, #3b82f6 100%);
        position: relative;
		overflow: hidden;
	}
    .btn-action:before {
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
	.btn-action:hover::before {
		left: 100%;
	}
	.row {
		flex: 1 auto;
        display: flex;
        flex-direction: column;
        width: 100%;
        align-items: center;
        justify-content: center;
        gap: 20px;

	}
	.btn-category {
		width: fit-content;
		min-width: 200px;
		padding: 20px;
		border-radius: 16px;
		/* margin-top: 20px; */
		cursor: pointer;
		background: linear-gradient(135deg, #2563eb 0%, #3b82f6 100%);
		position: relative;
		overflow: hidden;
	}
	.btn-category::before {
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
	.btn-category:hover::before {
		left: 100%;
	}
</style>
