<template>
	<div
		class="recipe-item flex flex-col md:flex-row w-full rounded-md shadow cursor-pointer"
	>
		<img :src="imgSrc" alt="" class="h-36 rounded-l-md" />
		<div class="flex justify-between py-2 px-4 w-full">
			<div class="flex flex-col justify-between">
				<div>
					<h3 class="font-bold text-lg">
						{{ title }}
					</h3>
					<div class="flex flex-col md:flex-row capitalize">
						<span v-if="limitedCuisines" class="mr-1">{{
							limitedCuisines
						}}</span>
						<span v-if="limitedDishTypes">{{ limitedDishTypes }}</span>
					</div>
				</div>
				<div>
					<div class="flex flex-wrap gap-2 py-4">
						<TagIcon
							v-for="tag in computedTags"
							:key="tag.label"
							:icon="tag.icon"
							:iconColor="tag.iconColor"
							:label="tag.label"
							:active="tag.active"
						/>
					</div>
				</div>
			</div>
			<div class="mt-auto md:my-auto md:px-4 w-1/5 md:w-auto">
				<span class="flex flex-col place-items-center font-bold gap-2">
					<Icon icon="material-symbols:alarm-outline" class="w-10 h-10" />
					{{ readyInMinutes }} min
				</span>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { computed } from 'vue'
	import { Icon } from '@iconify/vue'
	import TagIcon from './TagIcon.vue'

	const props = defineProps({
		imgSrc: {
			type: String,
			default: '',
		},
		title: {
			type: String,
			default: '',
		},
		summary: {
			type: String,
			default: '',
		},
		readyInMinutes: {
			type: Number,
			default: '',
		},
		tags: {
			type: Object,
			default: () => ({}),
		},
	})

	const limitedCuisines = computed(() => {
		return props.tags.cuisines.slice(0, 2).join(', ')
	})

	const limitedDishTypes = computed(() => {
		return props.tags.dishTypes.slice(0, 3).join(', ')
	})

	const computedTags = computed(() => {
		return [
			{
				label: 'Vegetarian',
				icon: 'mdi:carrot',
				iconColor: 'text-lime-500',
				active: props.tags.vegetarian,
			},
			{
				label: 'Vegan',
				icon: 'mdi:leaf',
				iconColor: 'text-green-500',
				active: props.tags.vegan,
			},
			{
				label: 'Gluten Free',
				icon: 'healthicons:gluten-free',
				iconColor: 'text-amber-500',
				active: props.tags.glutenFree,
			},
			{
				label: 'Dairy Free',
				icon: 'healthicons:dairy-outline',
				iconColor: 'text-sky-500',
				active: props.tags.dairyFree,
			},
			{
				label: 'Very Healthy',
				icon: 'streamline:health-medical-heart-rate-health-beauty-information-data-beat-pulse-monitor-heart-rate-info',
				iconColor: 'text-rose-500',
				active: props.tags.veryHealthy,
			},
			{
				label: 'Cheap',
				icon: 'mdi:currency-usd',
				iconColor: 'text-yellow-500',
				active: props.tags.cheap,
			},
		]
	})
</script>

<style></style>
