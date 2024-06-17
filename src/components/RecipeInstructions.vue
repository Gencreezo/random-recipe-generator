<template>
	<TransitionGroup name="list" tag="div" class="flex flex-col gap-4">
		<InstructionStep
			v-for="(step, i) in steps"
			:key="i"
			:number="step.number"
			:description="step.step"
			:ingredients="step.ingredients"
			:equipment="step.equipment"
			:style="{ animationDelay: i * 0.2 + 's' }"
		/>
	</TransitionGroup>
</template>

<script setup>
	import { computed } from 'vue'
	import InstructionStep from './InstructionStep.vue'

	const props = defineProps({
		instructions: {
			type: Object,
			default: () => {},
		},
	})

	const steps = computed(() => {
		return props.instructions[0].steps
	})
</script>

<style scoped>
	.list-enter-active,
	.list-leave-active {
		transition: all 0.5s ease;
	}

	.list-enter-from,
	.list-leave-to {
		opacity: 0;
		transform: translateX(20px);
	}

	.instruction-step {
		opacity: 0;
		animation: fadeInUp 0.5s forwards;
	}

	@keyframes fadeInUp {
		0% {
			opacity: 0;
			transform: translateX(20px);
		}
		100% {
			opacity: 1;
			transform: translateX(0);
		}
	}
</style>
