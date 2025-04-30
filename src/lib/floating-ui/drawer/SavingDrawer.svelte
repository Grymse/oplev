<script lang="ts">
	import { eventSystem } from '$lib/utils/events';
	import { generateURL } from '$lib/utils/urls';
	import { get } from 'svelte/store';
	import Drawer from '../DrawerBase.svelte';
	import type { Snippet } from 'svelte';

	type Props = {
		children: Snippet;
	};

	const { children }: Props = $props();

	const url = generateURL(get(eventSystem).reactions);
</script>

<Drawer trigger={children}>
	{#snippet content(closeDrawer)}
		<div class="relative h-full max-h-full w-full overflow-hidden">
			<div class="absolute bottom-0 z-10 w-full p-4">
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
			<div class="relative flex max-h-full flex-col gap-4 overflow-y-scroll p-4 pb-24">
				<h1 class="h1">Save your likes</h1>
				<p>
					Everything is automatically saved in your browser! However, if you'd like to share it
					across multiple browsers, you can share this URL. Copy this in and continue somewhere
					else. <span class="italic">Note multiple browsers will not synchronize in real-time.</span
					>
				</p>
				<span class="max-h-36 min-h-24">{url}</span>
				<div class="mt-2 flex w-full flex-col items-center justify-center gap-4">
					<h2>You can also use the QR</h2>
					<img
						class="h-64 w-64"
						src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data={url}"
						alt="QR code for the URL"
					/>
				</div>
			</div>
		</div>
	{/snippet}
</Drawer>
