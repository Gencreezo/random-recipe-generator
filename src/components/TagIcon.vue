<template>
	<span
		v-if="active"
		class="flex flex-col items-center gap-2 px-2 text-xs"
		:title="label"
	>
		<Icon :icon="icon" class="w-8 h-8" :class="iconColor" /> {{ label }}
	</span>
</template>

<script setup>
	import { Icon } from '@iconify/vue'

	const props = defineProps({
		icon: {
			type: String,
			required: true,
		},
		iconColor: {
			type: String,
			required: false,
		},
		label: {
			type: String,
			required: true,
		},
		active: {
			type: Boolean,
			required: true,
		},
	})
</script>

<style scoped>
	.tag-icon {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
		padding: 0.25rem 0.5rem;
		border-radius: 0.25rem;
		font-size: 0.675rem; /* Small text size */
		cursor: default;
	}
</style>
