<script lang="ts">
	import AspectRatio from '$lib/ui/AspectRatio.svelte';
	import SwipingController from '$lib/event/SwipingController.svelte';
</script>

<main class="overflow-x-hidden overflow-y-scroll">
	<AspectRatio ratio={10 / 16} offsetMaxHeight={-50}>
		<SwipingController />
	</AspectRatio>
</main>
