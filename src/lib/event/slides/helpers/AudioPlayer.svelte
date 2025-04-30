<script lang="ts">
	import { stopPropagation } from 'svelte/legacy';

	type Props = {
		source: string;
		active?: boolean;
	}

	let { source, active = false }: Props = $props();
	let isPlaying = $state(true);
	let audio: HTMLAudioElement = $state();

	function toggleAudio() {
		if (isPlaying) {
			audio.pause();
		} else {
			audio.play();
		}
		isPlaying = !isPlaying;
	}
</script>

<button onclick={stopPropagation(toggleAudio)} class="btn-icon preset-filled">
	{#if isPlaying}
		<!-- SOUND -->
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="2"
			stroke="currentColor"
			class="w-6 h-6"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
			/>
		</svg>
	{:else}
		<!-- NO SOUND-->
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="2"
			stroke="currentColor"
			class="w-6 h-6"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M17.25 9.75 19.5 12m0 0 2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6 4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
			/>
		</svg>
	{/if}
</button>

<audio autoplay={active} src={source} loop bind:this={audio}> </audio>
