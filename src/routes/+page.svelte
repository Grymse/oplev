<script lang="ts">
	import AspectRatio from '$lib/AspectRatio.svelte';
	import Controller from '$lib/Controller.svelte';
	import Draggable from '$lib/event/Draggable.svelte';
</script>

<div class="absolute -top-3 w-screen" style="height: min(calc(100svh + 4em), 100vh)">
	<AspectRatio ratio={10 / 16}>
		<Controller />
	</AspectRatio>
</div>
