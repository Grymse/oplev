<script lang="ts">
	import { Drawer, getDrawerStore } from '@skeletonlabs/skeleton';
	import EventDrawer from './EventDrawer.svelte';
	import SlidesDrawer from './SlidesDrawer.svelte';
	import SavingDrawer from './SavingDrawer.svelte';
	const drawerStore = getDrawerStore();

	const drawers = {
		event: EventDrawer,
		slides: SlidesDrawer,
		saving: SavingDrawer
	};
</script>

<Drawer>
	{#each Object.entries(drawers) as [drawerId, DrawerComponent]}
		{#if $drawerStore.id === drawerId}
			<svelte:component this={DrawerComponent} {...$drawerStore.meta} />
		{/if}
	{/each}
</Drawer>
