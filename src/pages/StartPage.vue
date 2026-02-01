<script setup>
	import { useRouter } from "vue-router";

	const router = useRouter();
</script>
<template>
	<div class="start-page">
		<div class="start-content">
			<p>
				Вверху показана фраза на русском. Ниже — набор английских слов из этой
				фразы. Нажимай на слова в правильном порядке, чтобы собрать английский
				вариант фразы.
			</p>
			<div class="btn-group">
				<button class="btn-to-selected" @click="router.push('/menu')">
					Выбрать категорию
				</button>
			</div>
		</div>
	</div>
</template>
<style scoped>
	.start-page {
		position: relative;
		width: 100%;
		height: 100%;
	}
	.start-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		overflow-y: auto;
		height: 100%;
		padding: 20px;
	}
.btn-group {
	flex:1 0 auto;
	display: flex;
	justify-content: center;
	align-items: center;
}
	.btn-to-selected {
		width: fit-content;
		padding: 20px;
		border-radius: 16px;
		margin-top: 20px;
		cursor: pointer;
		background: linear-gradient(135deg, #2563eb 0%, #3b82f6 100%);
		position: relative;
		overflow: hidden;
	}
	.btn-to-selected::before {
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
	.btn-to-selected:hover::before {
		left: 100%;
	}
</style>
