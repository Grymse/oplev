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
	class="flex h-full w-full flex-col items-center justify-center pb-20 text-left font-normal"
	class:gap-4={links?.length === 5}
	class:gap-6={links?.length !== 5}
>
	{#each links as link (link.url)}
		<a href={link.url} class="z-10" target="_blank" rel="noopener noreferrer">
			<button class="btn btn-lg preset-filled-primary-500 w-60">
				<LinkIcon title={link.text} />{link.text}
			</button>
		</a>
	{/each}
</div>
