<script lang="ts">
	import type { EventSlide } from '$lib/slides';
	import SlidesPageBar from './SlidesPageBar.svelte';
	import Slide from './Slide.svelte';
	import { createEventDispatcher } from 'svelte';
	
	export let active: boolean = false;
	export let slides: EventSlide[];
	let currentSlide = 0;
	let initMousePos = { x: 0, y: 0 };
	$: reset(slides);

	const dispatch = createEventDispatcher();

	function reset(slides: EventSlide[]) {
		currentSlide = 0;
	}

	$: dispatch('slideChange', { index: currentSlide });

	// store the initial mouse position. This is used to determine if the user is dragging the slide
	function clickInit(e: MouseEvent) {
		initMousePos = { x: e.clientX, y: e.clientY };
	}

	// check if the user is dragging the slide
	function isDrag(e: MouseEvent) {
		const x = e.clientX - initMousePos.x;
		const y = e.clientY - initMousePos.y;
		return 20 < Math.abs(x) || 20 < Math.abs(y);
	}

	function onRightSideClick(e: MouseEvent) {
		console.log(e);
		if (!isDrag(e)) nextSlide();
	}

	function onLeftSideClick(e: MouseEvent) {
		if (!isDrag(e)) prevSlide();
	}

	function nextSlide() {
		currentSlide = currentSlide === slides.length - 1 ? currentSlide : currentSlide + 1;
	}

	function prevSlide() {
		currentSlide = currentSlide === 0 ? 0 : currentSlide - 1;
	}
</script>

<div class="w-full h-full relative select-none" role="none" on:mousedown={clickInit}>
	{#if active}
		<button
			class="w-[35%] z-10 left-0 absolute h-full duration-100 active:bg-gradient-to-r active:from-white active:to-transparent opacity-15"
			on:click={onLeftSideClick}
		/>
		<button
			class="w-[35%] z-10 right-0 absolute h-full duration-100 active:bg-gradient-to-l active:from-white active:to-transparent opacity-15"
			on:click={onRightSideClick}
		/>

	{/if}
	<SlidesPageBar
		slideCount={slides.length}
		currentSlide={currentSlide}
		on:barClick={(e) => (currentSlide = e.detail.index)}
	/>
	<Slide {active} slide={slides[currentSlide]} />
</div>
