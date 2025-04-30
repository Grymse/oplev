<script lang="ts">
	import PassIcon from '$lib/icons/PassIcon.svelte';
	import HeartIcon from '$lib/icons/HeartIcon.svelte';
	import LikeIcon from '$lib/icons/LikeIcon.svelte';
	import type { EventReaction } from '$lib/utils/slides';

	type Props = {
		buttonScaling: {
			like: number;
			pass: number;
			heart: number;
		};
		onreact: (reaction: EventReaction) => void;
	};

	let { buttonScaling, onreact }: Props = $props();
</script>

<div class="relative z-10 w-full">
	<div class="absolute -mt-6 flex h-16 w-full items-center justify-center gap-6">
		<!-- X / Pass -->
		<button
			onclick={() => onreact('pass')}
			type="button"
			class="btn-icon btn-icon-lg preset-filled-tertiary-500 h-12 w-12 rounded-full"
			style="transform: scale({buttonScaling.pass + 1}) translate({buttonScaling.pass *
				-50}%, {-buttonScaling.pass * 50}%);"
		>
			<PassIcon />
		</button>

		<!-- HEART -->
		<button
			onclick={() => onreact('heart')}
			type="button"
			class="btn-icon btn-icon-lg preset-filled-primary-500 h-20 w-20 rounded-full"
			style="transform: scale({buttonScaling.heart + 1}) translate(0%, {-buttonScaling.heart *
				75}%);"
		>
			<HeartIcon />
		</button>

		<!-- LIKE -->
		<button
			onclick={() => onreact('like')}
			type="button"
			class="btn-icon btn-icon-lg preset-filled-secondary-500 h-12 w-12 rounded-full duration-0"
			style="transform: scale({buttonScaling.like + 1}) translate({buttonScaling.like *
				50}%, {-buttonScaling.like * 50}%);"
		>
			<LikeIcon />
		</button>
	</div>
</div>
