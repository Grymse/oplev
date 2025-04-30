<script lang="ts">
	import OpenEventDrawerButton from '$lib/floating-ui/drawer/OpenEventDrawerButton.svelte';
	import type { EventInfo } from '$lib/utils/slides';
	import { ISOToTimeDay } from '$lib/utils/translations';
	import type { Vector2 } from '$lib/utils/vectors';
	import Slides from './slides/Slides.svelte';

	type Props = {
		event: EventInfo;
		active?: boolean;
	}

	let { event, active = false }: Props = $props();
</script>

<div
	class="h-full w-full to-secondary-900 from-tertiary-900 bg-gradient-to-tr relative background-gradient shadow-md rounded-container overflow-hidden"
>
	<div
		class="absolute left-0 bottom-0 h-[25%] bg-gradient-to-t from-black from-50 to-transparent to-0 w-full z-10"
	></div>
	<Slides slides={event.slides} {active} />

	<OpenEventDrawerButton {event}>
		<div
			class="absolute bottom-8 select-none text-left left-8 z-20 active:text-surface-700-300 duration-50"
		>
			<h2 class="h2">{event.name} ({event.country})</h2>
			<h4 class="h4">{event.venue}</h4>
			<p>{ISOToTimeDay(event.time)}</p>
		</div>
	</OpenEventDrawerButton>
</div>
