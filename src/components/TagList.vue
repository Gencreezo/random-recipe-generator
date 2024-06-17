<template>
	<div class="flex flex-wrap place-content-center gap-2">
		<Tag
			v-for="tag in tags"
			:key="tag.title"
			:title="tag.title"
			:color="tag.color"
			:active="tag.active"
			:hide="hideInactive && !tag.active"
			:disabled="toggleDisabled"
			@update:active="updateTagStatus(tag.title, $event)"
		/>
	</div>
</template>

<script setup>
	import { ref, watch } from 'vue'
	import Tag from './Tag.vue'

	const props = defineProps({
		initialTags: {
			type: Array,
			default: () => [],
		},
		hideInactive: {
			type: Boolean,
			default: false,
		},
		toggleDisabled: {
			type: Boolean,
			default: false,
		},
	})

	const emit = defineEmits(['tag-updated'])

	const tags = ref(props.initialTags)

	watch(
		props.initialTags,
		(newTags) => {
			tags.value = newTags
		},
		{ immediate: true }
	)

	const updateTagStatus = (title, isActive) => {
		const tag = tags.value.find((tag) => tag.title === title)
		if (tag) {
			tag.active = isActive
			emit('tag-updated', { title, isActive })
		}
	}
</script>
