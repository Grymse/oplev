<script lang="ts">
	import { getDrawerStore, type DrawerSettings } from '@skeletonlabs/skeleton';
	import type { EventInfo } from './slides';
	export let event: EventInfo;
	const drawerStore = getDrawerStore();

	export function openEventDrawer() {
		const drawerSettings: DrawerSettings = {
			id: 'event',
			meta: { event },
			// Provide your property overrides:
			bgDrawer: 'bg-purple-900 text-white',
			bgBackdrop: 'bg-gradient-to-tr from-indigo-500/50 via-purple-500/50 to-pink-500/50',
			padding: 'p-4',
			height: 'h-[90%]',
			rounded: 'rounded-xl',
			position: 'bottom'
		};
		drawerStore.open(drawerSettings);
	}
</script>

<div
	role="button"
	tabindex="-1"
	aria-details="Opens event modal"
	on:keypress={console.log}
	on:click|preventDefault={openEventDrawer}
>
	<slot />
</div>
