<script lang="ts">
	import type { EventSlide } from '$lib/utils/slides';
	import SlidesPageBar from './SlidesPageBar.svelte';
	import Slide from './Slide.svelte';
	import type { Vector2 } from '$lib/utils/vectors';
	import { stopPropagation } from 'svelte/legacy';
	
	type Props = {
		active?: boolean;
		slides: EventSlide[];
	}

	let { active = false, slides }: Props = $props();
	let currentSlide = $state(0);

	function nextSlide(e: MouseEvent | TouchEvent) {
		e.stopPropagation();
		currentSlide = currentSlide === slides.length - 1 ? currentSlide : currentSlide + 1;
	}

	function prevSlide(e: MouseEvent | TouchEvent) {
		e.stopPropagation();
		currentSlide = currentSlide === 0 ? 0 : currentSlide - 1;
	}
	$effect(() => {
		slides; // include to enforce reactivity
		currentSlide = 0;
	});
</script>

<div class="w-full h-full relative select-none">
	{#if active}
		<button
			aria-label="Previous slide"
			class="w-[35%] z-10 left-0 absolute h-full duration-100 active:bg-gradient-to-r active:from-white active:to-transparent opacity-15"
			onclick={prevSlide}
			ontouchend={prevSlide}
		></button>
		<button
			aria-label="Next slide"
			class="w-[35%] z-10 right-0 absolute h-full duration-100 active:bg-gradient-to-l active:from-white active:to-transparent opacity-15"
			onclick={nextSlide}
			ontouchend={nextSlide}
		></button>
		<SlidesPageBar
			slideCount={slides.length}
			bind:currentSlide={currentSlide}
		/>
	{/if}
	<Slide {active} slide={slides[currentSlide]} />
</div>
