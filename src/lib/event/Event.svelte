<script lang="ts">
	import OpenEventDrawerButton from '$lib/floating-ui/drawer/OpenEventDrawerButton.svelte';
	import type { EventInfo } from '$lib/utils/slides';
	import { ISOToTimeDay } from '$lib/utils/translations';
	import Slides from './slides/Slides.svelte';

	type Props = {
		event: EventInfo;
		active?: boolean;
	};

	let { event, active = false }: Props = $props();
</script>

<div
	class="to-secondary-900 from-tertiary-900 background-gradient rounded-container relative h-full w-full overflow-hidden bg-gradient-to-tr shadow-md"
>
	<div
		class="from-50 to-0 absolute bottom-0 left-0 z-10 h-[25%] w-full bg-gradient-to-t from-black to-transparent"
	></div>
	<Slides slides={event.slides} {active} />

	<OpenEventDrawerButton {event}>
		<div
			class="active:text-surface-700-300 absolute bottom-8 left-8 z-20 text-left duration-50 select-none"
		>
			<h2 class="h2">{event.name} ({event.country})</h2>
			<h4 class="h4">{event.venue}</h4>
			<p>{ISOToTimeDay(event.time)}</p>
		</div>
	</OpenEventDrawerButton>
</div>
