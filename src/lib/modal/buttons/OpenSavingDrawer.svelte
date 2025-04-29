<script lang="ts">
	import { preventDefault } from 'svelte/legacy';

	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();

	/* export function openSavingDrawer() {
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
	} */
</script>

<div
	role="button"
	tabindex="-1"
	aria-details="Opens event modal"
	onkeypress={console.log}
>
	{@render children?.()}
</div>
