<script lang="ts">
	import AspectRatio from '$lib/AspectRatio.svelte';
	import Controller from '$lib/Controller.svelte';
	import Draggable from '$lib/event/Draggable.svelte';
</script>

<div class="absolute -top-3 w-screen" style="height: calc(100svh + 4em);">
	<AspectRatio ratio={10 / 16}>
		<Controller />
	</AspectRatio>
</div>
