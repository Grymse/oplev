<script lang="ts">
	import type { EventSlide } from '$lib/slides';
	import Slide from './slides/Slide.svelte';
	import AudioPlayer from './slides/helpers/AudioPlayer.svelte';

	export let active: boolean = false;
	export let slides: EventSlide[];
	let currentSlide = 0;
	let initMousePos = { x: 0, y: 0 };
	$: reset(slides);

	function reset(slides: EventSlide[]) {
		currentSlide = 0;
	}

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
		<div class="w-full h-full absolute flex z-10">
			<button
				class="w-[50%] h-full duration-100 active:bg-gradient-to-r active:from-white active:to-transparent opacity-15"
				on:click={onLeftSideClick}
			/>
			<button
				class="w-[50%] h-full duration-100 active:bg-gradient-to-l active:from-white active:to-transparent opacity-15"
				on:click={onRightSideClick}
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
