<script lang="ts">
	import { getDrawerStore, type DrawerSettings } from '@skeletonlabs/skeleton';
	const drawerStore = getDrawerStore();

	export function openSavingDrawer() {
		const drawerSettings: DrawerSettings = {
			id: 'saving',
			bgDrawer: 'bg-purple-900 text-white',
			bgBackdrop: 'bg-gradient-to-tr from-indigo-500/50 via-purple-500/50 to-pink-500/50',
			padding: 'p-4',
			height: 'h-full',
			rounded: 'rounded-xl',
			position: 'top'
		};
		drawerStore.open(drawerSettings);
	}
</script>

<div
	role="button"
	tabindex="-1"
	aria-details="Opens event modal"
	on:keypress={console.log}
	on:click|preventDefault={openSavingDrawer}
>
	<slot />
</div>
