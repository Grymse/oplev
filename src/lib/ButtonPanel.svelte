<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import PassIcon from './icons/PassIcon.svelte';
	import HeartIcon from './icons/HeartIcon.svelte';
	import LikeIcon from './icons/LikeIcon.svelte';
	const dispatch = createEventDispatcher();

	type Props = {
		interactionVisualization: {
		like: number;
		pass: number;
		heart: number;
	};
	}

	let { interactionVisualization }: Props = $props();

	function like() {
		dispatch('like');
	}

	function heart() {
		dispatch('heart');
	}

	function pass() {
		dispatch('pass');
	}
</script>

<div class="relative w-full z-10">
	<div class="absolute flex w-full justify-center gap-6 h-16 -mt-6 items-center">
		<!-- X / Pass -->
		<button
			onclick={pass}
			type="button"
			class="btn-icon btn-icon-lg h-16 preset-filled-tertiary-500"
			style="transform: scale({interactionVisualization.pass +
				1}) translate({interactionVisualization.pass * -50}%, {-interactionVisualization.pass *
				50}%);"
		>
			<PassIcon />
		</button>

		<!-- HEART -->
		<button
			onclick={heart}
			type="button"
			class="btn-icon btn-icon-lg w-20 h-20 preset-filled-primary-500"
			style="transform: scale({interactionVisualization.heart +
				1}) translate(0%, {-interactionVisualization.heart * 75}%);"
		>
			<HeartIcon />
		</button>

		<!-- LIKE -->
		<button
			onclick={like}
			type="button"
			class="btn-icon btn-icon-lg duration-0 h-16 preset-filled-secondary-500"
			style="transform: scale({interactionVisualization.like +
				1}) translate({interactionVisualization.like * 50}%, {-interactionVisualization.like *
				50}%);"
		>
			<LikeIcon />
		</button>
	</div>
</div>
