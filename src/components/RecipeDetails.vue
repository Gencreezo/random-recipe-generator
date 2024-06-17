<template>
	<div>
		<div class="py-4">
			<button
				class="rounded-full border border-pink-700 px-4 py-2 text-pink-700 hover:bg-pink-700 hover:text-white"
				@click="$emit('back')"
			>
				Back
			</button>
		</div>
		<div class="flex flex-col md:flex-row gap-4">
			<div class="md:w-1/2">
				<RecipeOverview
					:imgSrc="recipe.image"
					:title="recipe.title"
					:summary="recipe.summary"
					:readyInMinutes="recipe.readyInMinutes"
					:tags="{
						cuisines: recipe.cuisines,
						dishTypes: recipe.dishTypes,
						vegetarian: recipe.vegetarian,
						vegan: recipe.vegan,
						glutenFree: recipe.glutenFree,
						dairyFree: recipe.dairyFree,
						veryHealthy: recipe.veryHealthy,
						cheap: recipe.cheap,
					}"
					:extendedIngredients="recipe.extendedIngredients"
				/>
			</div>
			<div class="md:w-1/2">
				<RecipeInstructions :instructions="instructionSteps" />
			</div>
		</div>
	</div>
</template>

<script setup>
	import { computed } from 'vue'
	import RecipeOverview from '@/components/RecipeOverview.vue'
	import RecipeInstructions from '@/components/RecipeInstructions.vue'

	const props = defineProps({
		recipe: {
			type: Object,
			default: () => {},
		},
	})

	const instructionSteps = computed(() => {
		return props.recipe.analyzedInstructions
	})
</script>

<style></style>
