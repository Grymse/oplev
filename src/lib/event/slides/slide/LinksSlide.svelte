<script lang="ts">
	import type { LinksEventSlide } from '$lib/utils/slides';
	import LinkIcon from '../helpers/LinkIcon.svelte';

	interface Props {
		slide: LinksEventSlide;
	}

	let { slide }: Props = $props();
	let links = $derived(Object.entries(slide.links).map(([text, url]) => ({ text, url })));
</script>

<div
	class="w-full h-full pb-20 justify-center items-center text-left font-normal flex flex-col"
	class:gap-4={links?.length === 5}
	class:gap-6={links?.length !== 5}
>
	{#each links as link}
		<a href={link.url} class="z-10" target="_blank" rel="noopener noreferrer">
			<button class={`btn ${links.length === 5 ? 'btn-lg' : 'btn-lg'} w-60 variant-filled-primary`}>
				<LinkIcon fill="#fff" title={link.text} />{link.text}
			</button>
		</a>
	{/each}
</div>
