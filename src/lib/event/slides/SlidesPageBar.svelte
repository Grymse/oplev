<script lang="ts">
	type Props = {
		slideCount?: number;
		currentSlide?: number;
	};

	let { slideCount = 0, currentSlide = $bindable(0) }: Props = $props();

	let indexArray = $derived(Array.from({ length: slideCount }, (_, i) => i));
</script>

{#if 2 <= slideCount}
	<div
		class="absolute z-40 grid w-full gap-2 px-8"
		style={`grid-template-columns: repeat(${slideCount}, minmax(0, 1fr))`}
	>
		{#each indexArray as i (i)}
			<button aria-label="Slide" class="z-40 h-5 rounded-full" onclick={() => (currentSlide = i)}>
				<div
					class={`h-1 w-full rounded-full ${i === currentSlide ? 'bg-white' : 'bg-gray-500'} opacity-50`}
				></div>
			</button>
		{/each}
	</div>
{/if}
