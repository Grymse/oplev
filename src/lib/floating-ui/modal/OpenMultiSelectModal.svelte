<script lang="ts">
	import { type Snippet } from 'svelte';
	import ModalBase from '../ModalBase.svelte';

	type Props = {
		title: string;
		options: string[];
		values: string[];
		trigger: Snippet;
	};

	let {
		trigger,
		values = $bindable([]),
		options = $bindable([]),
		title = 'Title'
	}: Props = $props();

	function clear() {
		values = [];
	}

	function selectAll() {
		values = [...options];
	}

	function isChecked(option: string) {
		return values.includes(option);
	}

	function toggleValue(option: string) {
		if (values.includes(option)) {
			values = values.filter((value) => value !== option);
		} else {
			values = [...values, option];
		}
	}
</script>

<ModalBase {trigger}>
	{#snippet content(closeDrawer)}
		<header class="flex justify-between">
			<h2 class="h2">{title}</h2>
		</header>
		<article class="h-[calc(100vh/2)] overflow-y-scroll">
			{#each options as option (option)}
				<label class="flex items-center space-x-2">
					<input
						class="checkbox"
						type="checkbox"
						checked={isChecked(option)}
						onchange={() => toggleValue(option)}
					/>
					<p>{option}</p>
				</label>
			{/each}
		</article>
		<footer class="flex justify-between">
			<div class="flex gap-2">
				<button class="btn preset-outlined-surface-950-50" onclick={clear}>Clear</button>
				<button class="btn preset-outlined-surface-950-50" onclick={selectAll}>All</button>
			</div>
			<button class="btn preset-filled-primary-500" onclick={closeDrawer}>Finish</button>
		</footer>
	{/snippet}
</ModalBase>
