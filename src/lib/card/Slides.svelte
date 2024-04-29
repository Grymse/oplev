<script lang="ts">
	import type { EventSlide } from '$lib/slides';
	import Slide from './slides/Slide.svelte';

	export let active: boolean = false;
	export let slides: EventSlide[];
	let currentSlide = 0;
	$: reset(slides);

	function reset(slides: EventSlide[]) {
		currentSlide = 0;
	}

	function nextSlide() {
		currentSlide = currentSlide === slides.length - 1 ? currentSlide : currentSlide + 1;
	}

	function prevSlide() {
		currentSlide = currentSlide === 0 ? 0 : currentSlide - 1;
	}
</script>

<div class="w-full h-full relative select-none">
	{#if active}
		<div class="w-full h-full absolute flex z-10">
			<button
				class="w-[50%] h-full duration-100 active:bg-gradient-to-r active:from-white active:to-transparent opacity-15"
				on:click={prevSlide}
			/>
			<button
				class="w-[50%] h-full duration-100 active:bg-gradient-to-l active:from-white active:to-transparent opacity-15"
				on:click={nextSlide}
			/>
		</div>
		{#if slides.length !== 1}
			<div
				class="absolute top-2 w-full z-10 grid gap-2 px-8"
				style={`grid-template-columns: repeat(${slides.length}, minmax(0, 1fr))`}
			>
				{#each slides as slide, i}
					<div
						class={`rounded-full h-1 ${i === currentSlide ? 'bg-white' : 'bg-gray-500'} opacity-50`}
					/>
				{/each}
			</div>
		{/if}
	{/if}
	<Slide {active} slide={slides[currentSlide]} />
</div>
