<script lang="ts">
	import AspectRatio from '$lib/ui/AspectRatio.svelte';
	import SwipingController from '$lib/event/SwipingController.svelte';
</script>

<AspectRatio ratio={10 / 16}>
	<SwipingController />
</AspectRatio>
