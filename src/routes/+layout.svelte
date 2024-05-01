<script lang="ts">
	import '../app.postcss';
	import { AppShell, AppBar, TabGroup, TabAnchor, initializeStores } from '@skeletonlabs/skeleton';
	initializeStores();
	initializeEventSystem();
	import { page } from '$app/stores';
	import DrawerController from '$lib/drawer/DrawerController.svelte';
	import { initializeEventSystem } from '$lib/events';

	const pages = [
		{
			label: 'Swipe',
			path: '/',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
</svg>
`
		},
		{
			label: 'Program',
			path: '/program',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
</svg>
`
		}
	];
</script>

<DrawerController />

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<AppBar background="none" class="w-screen">
			<TabGroup border="" justify="justify-center" class="w-screen absolute left-0">
				{#each pages as { label, path, icon }}
					<TabAnchor href={path} selected={path === $page.url.pathname}>
						<div class="flex gap-1">
							{@html icon}<span>{label}</span>
						</div>
					</TabAnchor>
				{/each}
			</TabGroup>
		</AppBar>
	</svelte:fragment>

	<slot />
</AppShell>
