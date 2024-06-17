<template>
	<TransitionGroup name="list" tag="div" class="flex flex-col gap-4">
		<RecipeItem
			v-for="(recipe, index) in recipes"
			:key="recipe.id"
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
			@click="() => $emit('recipeSelected', recipe)"
			:style="{ animationDelay: index * 0.2 + 's' }"
		/>
	</TransitionGroup>
</template>

<script setup>
	import { ref, watch } from 'vue'
	import RecipeItem from '@/components/RecipeItem.vue'

	const props = defineProps({
		recipes: {
			type: Array,
			default: () => [],
		},
	})

	const tags = ref([
		{ title: 'Vegetarian', color: 'diet', active: true },
		{ title: 'Vegan', color: 'diet', active: false },
		{ title: 'Gluten Free', color: 'default', active: false },
		{ title: 'Dairy Free', color: 'default', active: false },
		{ title: 'Very Healthy', color: 'diet', active: false },
		{ title: 'Cheap', color: 'cheap', active: false },
	])

	const updateTags = () => {
		tags.value.forEach((tag) => (tag.active = false))

		props.recipes.forEach((recipe) => {
			tags.value.forEach((tag) => {
				if (recipe[tag.property]) {
					tag.active = true
				}
			})
		})
	}

	watch(() => props.recipes, updateTags, { immediate: true })

	const emit = defineEmits(['recipeSelected'])

	const handleRecipeSelected = (recipeId) => {
		const selectedRecipe = props.recipes.find(
			(recipe) => recipe.id === recipeId
		)
		recipeSelected.emit()
	}
</script>

<style scoped>
	.list-enter-active,
	.list-leave-active {
		transition: all 0.5s ease;
	}

	.list-enter-from,
	.list-leave-to {
		opacity: 0;
		transform: translateY(20px);
	}

	.recipe-item {
		opacity: 0;
		animation: fadeInUp 0.5s forwards;
	}

	@keyframes fadeInUp {
		0% {
			opacity: 0;
			transform: translateY(20px);
		}
		100% {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
