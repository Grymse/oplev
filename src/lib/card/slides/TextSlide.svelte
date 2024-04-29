<script lang="ts">
	import type { TextEventSlide } from '$lib/slides';

	export let slide: TextEventSlide;
</script>

<div class="w-full h-full p-16 text-left font-normal flex flex-col gap-6 pointer-events-none">
	{@html slide.text}
</div>
