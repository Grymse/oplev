<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import PassIcon from '../lib/icons/PassIcon.svelte';
	import HeartIcon from '../lib/icons/HeartIcon.svelte';
	import LikeIcon from '../lib/icons/LikeIcon.svelte';
	const dispatch = createEventDispatcher();

	export let interactionVisualization: {
		like: number;
		pass: number;
		heart: number;
	};

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
			on:click={pass}
			type="button"
			class="btn-icon btn-icon-xl h-16 variant-filled-tertiary"
			style="transform: scale({interactionVisualization.pass +
				1}) translate({interactionVisualization.pass * -50}%, {-interactionVisualization.pass *
				50}%);"
		>
			<PassIcon />
		</button>

		<!-- HEART -->
		<button
			on:click={heart}
			type="button"
			class="btn-icon btn-icon-xl w-20 h-20 variant-filled-primary"
			style="transform: scale({interactionVisualization.heart +
				1}) translate(0%, {-interactionVisualization.heart * 75}%);"
		>
			<HeartIcon />
		</button>

		<!-- LIKE -->
		<button
			on:click={like}
			type="button"
			class="btn-icon btn-icon-xl duration-0 h-16 variant-filled-secondary"
			style="transform: scale({interactionVisualization.like +
				1}) translate({interactionVisualization.like * 50}%, {-interactionVisualization.like *
				50}%);"
		>
			<LikeIcon />
		</button>
	</div>
</div>
