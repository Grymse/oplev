<script lang="ts">
	import { Search, X } from '@lucide/svelte';
	type Props = {
		search: string;
		isActive?: boolean;
		onclick?: () => void;
	};

	let { search = $bindable(''), isActive, onclick: injectedOnClick }: Props = $props();

	let showIsActive = $derived(isActive !== undefined ? isActive : search.length !== 0);

	let isVisible = $state(false);

	function onblur() {
		isVisible = false;
	}

	function onclick() {
		isVisible = true;
		injectedOnClick?.();
	}
</script>

<div>
	{#if isVisible}
		<div class="relative">
			<input class="input pr-6" autofocus bind:value={search} {onblur} />
			<button onclick={() => (search = '')} class="btn-icon absolute top-0.5 right-1"><X /></button>
		</div>
	{:else}
		<button {onclick} class="btn-icon" class:preset-filled-primary-500={showIsActive}
			><Search />
		</button>
	{/if}
</div>
