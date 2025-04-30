<script lang="ts">
	import type { ImageEventSlide } from '$lib/utils/slides';
	import AudioPlayer from '../helpers/AudioPlayer.svelte';

	type Props = {
		slide: ImageEventSlide;
		active?: boolean;
	}

	let { slide, active = false }: Props = $props();
</script>

{#if slide.audio}
	<div class="absolute z-10 right-4 top-6">
		<AudioPlayer {active} source={slide.audio} />
	</div>
{/if}
<img src={slide.img} alt="Event" class="object-cover pointer-events-none h-full w-full" />
