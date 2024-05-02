<script lang="ts">
	import AspectRatio from '$lib/AspectRatio.svelte';
	import Controller from '$lib/Controller.svelte';
	import Draggable from '$lib/event/Draggable.svelte';
</script>

<div class="absolute top-0 h-svh w-screen">
	<AspectRatio ratio={9 / 16}>
		<Controller />
	</AspectRatio>
</div>
