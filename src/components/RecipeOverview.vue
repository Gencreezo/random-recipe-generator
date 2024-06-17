<template>
	<div class="shadow-lg rounded">
		<div class="w-full h-32">
			<img :src="imgSrc" alt="" class="w-full h-32 object-none rounded" />
		</div>
		<div class="flex flex-col justify-between w-full p-4">
			<div class="flex flex-col">
				<div class="flex justify-between">
					<div>
						<h3 class="font-bold text-lg">
							{{ title }}
						</h3>
						<div class="flex capitalize">
							<span v-if="limitedCuisines" class="mr-1">{{
								limitedCuisines
							}}</span>
							<span v-if="limitedDishTypes">{{ limitedDishTypes }}</span>
						</div>
					</div>
					<TagIcon
						icon="material-symbols:alarm-outline"
						:label="`${readyInMinutes} min`"
						:active="true"
					/>
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
			<div class="my-auto px-4"></div>
			<div class="p-4">
				<span class="font-semibold">Ingredients</span>
				<ul class="list-disc list-inside leading-loose">
					<li
						v-for="(ingredient, i) in extendedIngredients"
						:key="i"
						class="capitalize"
					>
						{{ ingredient.amount }} {{ ingredient.unit }} {{ ingredient.name }}
					</li>
				</ul>
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
		extendedIngredients: {
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
