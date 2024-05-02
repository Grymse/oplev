<script lang="ts">
	import { getDrawerStore, type DrawerSettings } from '@skeletonlabs/skeleton';
	import type { EventInfo } from '../../slides';
	export let event: EventInfo;
	const drawerStore = getDrawerStore();

	export function openEventDrawer() {
		const drawerSettings: DrawerSettings = {
			id: 'slides',
			meta: { event },
			padding: 'p-0',
			bgDrawer: 'bg-transparent',
			bgBackdrop: 'bg-gradient-to-tr from-indigo-500/50 via-purple-500/50 to-pink-500/50',
			height: 'h-full',
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
