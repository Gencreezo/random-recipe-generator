<template>
	<div class="flex flex-col justify-center">
		<div class="flex justify-end">
			<img src="/wok.webp" alt="" class="h-24 lg:h-48" />
		</div>
		<h1 class="text-4xl lg:text-7xl font-black z-10 title">What to Cook?</h1>
	</div>
</template>

<script lang="ts" setup></script>

<style>
	.title {
		font-family: 'Fredoka One', system-ui;
		font-weight: 900; /* Extra bold */
		color: white; /* Transparent color */
		-webkit-text-stroke: 2px #be185d; /* WebKit browsers */
		-webkit-text-fill-color: white; /* WebKit browsers */
		letter-spacing: 2px; /* Extra spacing between letters */
		animation: pop 1s ease-in-out; /* Animation */
	}

	/* Keyframes for pop animation */
	@keyframes pop {
		0% {
			transform: scale(1);
		}
		50% {
			transform: scale(1.1);
		}
		100% {
			transform: scale(1);
		}
	}
</style>
