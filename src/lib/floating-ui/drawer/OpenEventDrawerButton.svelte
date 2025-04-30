<script lang="ts">
	import LinkIcon from '$lib/event/slides/helpers/LinkIcon.svelte';
	import type { EventInfo } from '$lib/utils/slides';
	import { ISOToTimeDay } from '$lib/utils/translations';
	import type { Snippet } from 'svelte';
    import DrawerBase from '../DrawerBase.svelte';

	type Props = {
		event: EventInfo;
		children: Snippet
	}

	let { event, children }: Props = $props();

	let links = $derived(event.slides.find((slide) => slide.type === 'links')?.links);
</script>

<DrawerBase trigger={children}>
	{#snippet content(closeDrawer)}
	<div class="relative h-full max-h-full w-full overflow-hidden">
		<div class="absolute bottom-0 z-10 w-full p-4">
			<button class="w-full btn gap-1 preset-filled" onclick={closeDrawer}>
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
		<div class="p-4 pb-24 relative flex flex-col gap-4 max-h-full overflow-y-scroll">
			<div class="flex rounded-container overflow-hidden min-h-36 h-36 bg-purple-800">
				{#if event.img}
					<img src={event.img} alt="" class="h-full" />
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
							<button class="btn-icon btn-icon-lg preset-filled-primary-500">
								<LinkIcon fill="#fff" title={text} />
							</button>
						</a>
					{/each}
				</div>
			{/if}
			{@html event.description}
		</div>
	</div>
	{/snippet}
</DrawerBase>
