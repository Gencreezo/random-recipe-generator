<template>
	<div class="flex flex-col place-items-center">
		<Title />
	</div>
	<main class="max-w-5xl mx-auto">
		<div class="flex flex-col pt-16">
			<div class="flex flex-col md:px-48 gap-4">
				<TagInput @tag-added="addTag" />
				<TagList :initialTags="tags" @tag-updated="handleTagUpdate" />
				<div class="flex flex-col items-center">
					<button
						@click="fetchRecipes"
						class="w-2/3 mt-4 p-2 bg-pink-700 text-white font-extrabold text-2xl rounded-full hover:shadow-lg"
					>
						Surprise me 😋
					</button>
				</div>
			</div>

			<div class="mt-6">
				<Transition name="fade" mode="out-in">
					<RecipeList
						v-if="activeComponent === RecipeList"
						:recipes="recipes"
						@recipeSelected="handleRecipeSelected"
					/>
					<RecipeDetails
						v-else
						:recipe="selectedRecipe"
						@back="handleBackToList"
					/>
				</Transition>
			</div>
		</div>
	</main>
</template>

<script setup>
	import { ref, shallowRef } from 'vue'
	import { getRandomRecipes } from '@/api/recipeAPI'
	import Title from '@/components/Title.vue'
	import TagList from '@/components/TagList.vue'
	import TagInput from '@/components/TagInput.vue'
	import RecipeList from '@/components/RecipeList.vue'
	import RecipeDetails from '@/components/RecipeDetails.vue'

	const activeComponent = shallowRef(RecipeList)

	const recipes = ref([])
	const selectedRecipe = ref({})

	const handleRecipeSelected = (recipe) => {
		selectedRecipe.value = recipe
		activeComponent.value = RecipeDetails
	}

	const handleBackToList = () => {
		activeComponent.value = RecipeList
	}

	const tags = ref([
		{ title: 'Italian', color: 'cuisine', active: false },
		{ title: 'Vegetarian', color: 'diet', active: false },
		{ title: 'Appetizer', color: 'appetizer', active: false },
		{ title: 'Main Course', color: 'main', active: false },
		{ title: 'Dessert', color: 'dessert', active: false },
		{ title: 'Vegan', color: 'diet', active: false },
	])

	const handleTagUpdate = (tag) => {
		const normalizedTitle = tag.title.toLowerCase()
		const existingTag = tags.value.find(
			(t) => t.title.toLowerCase() === normalizedTitle
		)
		if (existingTag) {
			existingTag.active = tag.isActive
		}
	}

	const addTag = (tagTitle) => {
		const normalizedTitle = tagTitle.toLowerCase()
		const existingTag = tags.value.find(
			(t) => t.title.toLowerCase() === normalizedTitle
		)
		if (existingTag) {
			existingTag.active = true
		} else {
			tags.value.push({ title: tagTitle, color: 'default', active: true })
		}
	}

	const fetchRecipes = async () => {
		const tagsString = tagsToString()
		try {
			recipes.value = await getRandomRecipes(tagsString)
		} catch (error) {
			console.error('Error fetching data:', error)
		}
	}

	function tagsToString() {
		return tags.value
			.filter((tag) => tag.active)
			.map((tag) => tag.title.toLowerCase())
			.join(',')
	}
</script>

<style scoped>
	.fade-enter-active,
	.fade-leave-active {
		transition: opacity 0.5s ease;
	}

	.fade-enter-from,
	.fade-leave-to {
		opacity: 0;
	}
</style>
