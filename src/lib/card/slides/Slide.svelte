<script lang="ts">
	import type { EventSlide } from '$lib/slides';
	import ImageSlide from './ImageSlide.svelte';
	import TextSlide from './TextSlide.svelte';
	import YoutubeSlide from './YoutubeSlide.svelte';

	export let slide: EventSlide;
	export let active: boolean = false;
</script>

{#if slide.type === 'img'}
	<ImageSlide {active} {slide} />
{:else if slide.type === 'text'}
	<TextSlide {slide} />
{:else}
	<YoutubeSlide {active} {slide} />
{/if}
