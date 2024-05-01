<script lang="ts">
	import type { EventSlide } from '$lib/slides';
	import ImageSlide from './ImageSlide.svelte';
	import LinksSlide from './LinksSlide.svelte';
	import SpotifySlide from './SpotifySlide.svelte';
	import YoutubeSlide from './YoutubeSlide.svelte';

	export let slide: EventSlide;
	export let active: boolean = false;
</script>

{#if slide.type === 'img'}
	<ImageSlide {active} {slide} />
{:else if slide.type === 'spotify'}
	<SpotifySlide {slide} />
{:else if slide.type === 'links'}
	<LinksSlide {slide} />
{:else}
	<YoutubeSlide {active} {slide} />
{/if}
