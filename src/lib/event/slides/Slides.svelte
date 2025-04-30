<script lang="ts">
	import type { EventSlide } from '$lib/utils/slides';
	import SlidesPageBar from './SlidesPageBar.svelte';
	import Slide from './Slide.svelte';

	type Props = {
		active?: boolean;
		slides: EventSlide[];
	};

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
		// eslint-disable-next-line @typescript-eslint/no-unused-expressions
		slides; // include to enforce reactivity
		currentSlide = 0;
	});
</script>

<div class="relative h-full w-full select-none">
	{#if active}
		<button
			aria-label="Previous slide"
			class="absolute left-0 z-10 h-full w-[35%] opacity-15 duration-100 active:bg-gradient-to-r active:from-white active:to-transparent"
			onclick={prevSlide}
			ontouchend={prevSlide}
		></button>
		<button
			aria-label="Next slide"
			class="absolute right-0 z-10 h-full w-[35%] opacity-15 duration-100 active:bg-gradient-to-l active:from-white active:to-transparent"
			onclick={nextSlide}
			ontouchend={nextSlide}
		></button>
		<SlidesPageBar slideCount={slides.length} bind:currentSlide />
	{/if}
	<Slide {active} slide={slides[currentSlide]} />
</div>
