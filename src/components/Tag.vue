<!-- src/components/Tag.vue -->
<template>
	<div :class="tagClasses" @click="toggleActive">
		{{ title }}
	</div>
</template>

<script setup>
	import { ref, computed, watchEffect } from 'vue'

	// Props
	const props = defineProps({
		title: {
			type: String,
			required: true,
		},
		color: {
			type: String,
			required: true,
		},
		active: {
			type: Boolean,
			default: false,
		},
		hide: {
			type: Boolean,
			default: false,
		},
		disabled: {
			type: Boolean,
			default: false,
		},
	})

	const emit = defineEmits(['update:active'])

	// State for active status
	const isActive = ref(props.active)

	const tagClasses = computed(() => {
		const baseClasses =
			'inline-flex items-center px-3 py-1 rounded-full border cursor-pointer transition-colors'
		const colorClasses = {
			cuisine: {
				active: 'bg-orange-500 text-white border-orange-500',
				inactive: 'border-orange-500 text-orange-500',
			},
			diet: {
				active: 'bg-green-500 text-white border-green-500',
				inactive: 'border-green-500 text-green-500',
			},
			appetizer: {
				active: 'bg-lime-500 text-white border-lime-500',
				inactive: 'border-lime-500 text-lime-500',
			},
			main: {
				active: 'bg-red-500 text-white border-red-500',
				inactive: 'border-red-500 text-red-500',
			},
			dessert: {
				active: 'bg-pink-500 text-white border-pink-500',
				inactive: 'border-pink-500 text-pink-500',
			},
			cheap: {
				active: 'bg-yellow-500 text-white border-yellow-500',
				inactive: 'border-yellow-500 text-yellow-500',
			},
			default: {
				active: 'bg-sky-500 text-white border-sky-500',
				inactive: 'border-sky-500 text-sky-500',
			},
		}

		const color = colorClasses[props.color] || colorClasses.default

		const visibilityClass = props.hide ? 'hidden' : ''

		return `${baseClasses} ${
			isActive.value ? color.active : color.inactive
		} ${visibilityClass}`
	})

	// Toggle active state
	const toggleActive = () => {
		if (!props.disabled) {
			isActive.value = !isActive.value
			emit('update:active', isActive.value)
		}
	}

	// Watch for changes in the active prop
	watchEffect(() => {
		isActive.value = props.active
	})
</script>

<style scoped>
	/* You can add custom scoped styles here if necessary */
</style>
