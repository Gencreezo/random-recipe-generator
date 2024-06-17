<template>
	<div class="instruction-step shadow-lg rounded p-4">
		<span class="bg-slate-800 text-white font-black rounded-full px-3 py-2">{{
			number
		}}</span>
		<div class="flex flex-col gap-4 pt-2 px-4">
			<div class="flex gap-6 pt-4">
				<div v-if="joinedIngredients" class="flex flex-col w-1/2">
					<span class="font-semibold">Ingredients</span>
					<span>{{ joinedIngredients }}</span>
				</div>
				<div v-if="joinedEquipment" class="flex flex-col w-1/2">
					<span class="font-semibold">Equipment</span>
					<span>{{ joinedEquipment }}</span>
				</div>
			</div>
			<div class="flex flex-col">
				<span class="font-semibold">Instructions</span>
				<p>
					{{ description }}
				</p>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { computed } from 'vue'
	const props = defineProps({
		number: {
			type: Number,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		ingredients: {
			type: Array,
			default: () => [],
		},
		equipment: {
			type: Array,
			default: () => [],
		},
	})

	const joinedIngredients = computed(() => {
		return props.ingredients.map((ingredient) => ingredient.name).join(', ')
	})

	const joinedEquipment = computed(() => {
		return props.equipment.map((equipment) => equipment.name).join(', ')
	})
</script>

<style></style>
