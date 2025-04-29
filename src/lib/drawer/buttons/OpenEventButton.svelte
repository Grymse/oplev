<script lang="ts">
	import { getDrawerStore, type DrawerSettings } from '@skeletonlabs/skeleton';
	import type { EventInfo } from '../../slides';
	import type { Vector2 } from '../../types/vector';

	export let event: EventInfo;
	const drawerStore = getDrawerStore();

	let startPos: Vector2;

	function handleStart(e: MouseEvent | TouchEvent) {
		const point = e instanceof MouseEvent ? e : e.touches[0];
		startPos = { x: point.clientX, y: point.clientY };
	}

	function handleEnd(e: MouseEvent | TouchEvent) {
		const point = e instanceof MouseEvent ? e : e.changedTouches[0];
		const deltaX = point.clientX - startPos.x;
		const deltaY = point.clientY - startPos.y;
		const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
		if (distance <= 50) {
			openEventDrawer(e);
		}
	}

	function openEventDrawer(e: MouseEvent | TouchEvent) {
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
	on:mousedown={handleStart}
	on:mouseup|preventDefault={handleEnd}
	on:touchstart={handleStart}
	on:touchend|preventDefault={handleEnd}
>
	<slot />
</div>
