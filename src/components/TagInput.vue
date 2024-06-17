<!-- src/components/AutocompleteInput.vue -->
<template>
	<div class="flex rounded-full shadow-md">
		<input
			v-model="inputValue"
			@keydown.enter.prevent="addTag"
			type="text"
			placeholder="add a tag: mexican, chicken, breakfast"
			class="rounded-l-full px-2 py-1 w-full text-center border-none focus:ring-0 focus:outline-pink-400"
		/>
		<button aria-label="add tag" class="bg-pink-700 rounded-r-full px-4 py-2">
			<Icon icon="material-symbols:add" class="text-white w-10 h-10" />
		</button>
	</div>
</template>

<script setup>
	import { ref } from 'vue'
	import { Icon } from '@iconify/vue'

	const emit = defineEmits(['tag-added'])

	const inputValue = ref('')

	const addTag = () => {
		if (inputValue.value.trim() !== '') {
			emit('tag-added', inputValue.value.trim())
			inputValue.value = ''
		}
	}
</script>

<style scoped>
	/* Add any custom styles if necessary */
</style>
