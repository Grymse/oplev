<script lang="ts">
	import '../app.css';
	import { initializeEventSystem } from '$lib/utils/events';
	import NavigationBar from '$lib/NavigationBar.svelte';
	import type { Snippet } from 'svelte';
	import SwipeIcon from '$lib/icons/SwipeIcon.svelte';
	import ProgramIcon from '$lib/icons/ProgramIcon.svelte';

	initializeEventSystem();
	type Props = { children?: Snippet };

	const routes = [
		{
			label: 'Swipe',
			href: '/',
			icon: SwipeIcon
		},
		{
			label: 'Program',
			href: '/program',
			icon: ProgramIcon
		}
	];

	let { children }: Props = $props();
</script>

<!-- <SavingDrawer>
	{#snippet trigger()}
		<button class="btn flex-col text-surface-600-400 absolute right-2 top-2">
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
					d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
				/>
			</svg>
			Save
		</button>
	{/snippet}
</SavingDrawer> -->

<div class="grid h-svh w-screen grid-rows-[1fr_auto]">
	<main class="overflow-x-hidden overflow-y-scroll">
		{@render children?.()}
	</main>
	<NavigationBar {routes} />
</div>
