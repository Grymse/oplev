<script lang="ts">
	import LinkIcon from '$lib/event/slides/helpers/LinkIcon.svelte';
	import type { EventInfo } from '$lib/utils/slides';
	import { ISOToTimeDay } from '$lib/utils/translations';
	import type { Snippet } from 'svelte';
	import DrawerBase from '../DrawerBase.svelte';

	type Props = {
		event: EventInfo;
		children: Snippet;
	};

	let { event, children }: Props = $props();

	let links = $derived(event.slides.find((slide) => slide.type === 'links')?.links);
</script>

<DrawerBase trigger={children}>
	{#snippet content(closeDrawer)}
		<div class="relative max-h-[calc(100vh-8rem)] overflow-hidden">
			<div class="absolute bottom-4 z-10 w-full p-4">
				<button class="btn preset-filled w-full gap-1" onclick={closeDrawer}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="h-8 w-8"
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
			<div class="flex max-h-[calc(100vh-8rem)] flex-col gap-4 overflow-y-scroll p-4 pb-24">
				<div
					class="rounded-container preset-filled-primary-200-800 flex h-36 min-h-36 overflow-hidden"
				>
					{#if event.img}
						<img src={event.img} alt="" class="h-full" />
					{/if}
					<div class="space-y-1 p-4">
						<h5 class="h5 leading-tight">{event.name} ({event.country})</h5>
						<p class="leading-tight">{event.venue}</p>
						<p class="text-sm">{ISOToTimeDay(event.time)}</p>
					</div>
				</div>
				{#if links}
					<div class="flex gap-4">
						{#each Object.entries(links) as [text, url] (url)}
							<a href={String(url)} class="z-10" target="_blank" rel="noopener noreferrer">
								<button class="btn-icon btn-icon-lg preset-filled-primary-500 h-10 w-10 p-1">
									<LinkIcon title={text} />
								</button>
							</a>
						{/each}
					</div>
				{/if}
				{event.description}
			</div>
		</div>
	{/snippet}
</DrawerBase>
