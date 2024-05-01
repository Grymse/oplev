<script lang="ts">
	import LinkIcon from '$lib/card/slides/helpers/LinkIcon.svelte';
	import type { EventInfo } from '$lib/slides';
	import { ISOToTimeDay } from '$lib/translations';

	export let event: EventInfo;

	console.log(event.slides);

	$: img = event.slides.find((slide) => slide.type === 'img')?.img;
	$: links = event.slides.find((slide) => slide.type === 'links')?.links;
</script>

<div class="p-4 flex flex-col gap-4 pb-28">
	<div class="flex rounded-container-token h-36 overflow-hidden bg-purple-800">
		{#if img}
			<img src={img} alt="" class="h-full" />
		{/if}
		<div class="p-4">
			<h2 class="h2">{event.name} ({event.country})</h2>
			<h4 class="h4">{event.venue}</h4>
			<p>{ISOToTimeDay(event.time)}</p>
		</div>
	</div>
	{#if links}
		<div class="flex gap-4">
			{#each Object.entries(links) as [text, url]}
				<a href={String(url)} class="z-10" target="_blank" rel="noopener noreferrer">
					<button class="btn-icon btn-icon-lg variant-filled-primary">
						<LinkIcon fill="#fff" title={text} />
					</button>
				</a>
			{/each}
		</div>
	{/if}
	<h4>Description</h4>
	{@html event.description}
</div>
<div class="absolute w-full px-8 left-0 bottom-8">
	<button class="w-full btn gap-1 variant-filled-secondary">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			class="w-8 h-8"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
			/>
		</svg>
		Close
	</button>
</div>
