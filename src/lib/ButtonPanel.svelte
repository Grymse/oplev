<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let interactionVisualization: {
		like: number;
		pass: number;
		heart: number;
	};

	function like() {
		dispatch('like');
	}

	function heart() {
		dispatch('heart');
	}

	function pass() {
		dispatch('pass');
	}
</script>

<div class="relative z-10">
	<div class="absolute flex gap-10 w-full justify-center h-16 -my-4 items-center">
		<!-- X / Pass -->
		<button
			on:click={pass}
			type="button"
			class="btn-icon btn-icon-xl h-16 variant-filled-tertiary"
			style="transform: scale({interactionVisualization.pass +
				1}) translate({interactionVisualization.pass * -50}%, {-interactionVisualization.pass *
				50}%);"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 16 16"
				fill="currentColor"
				class="w-10 h-10"
			>
				<path
					d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z"
				/>
			</svg>
		</button>

		<!-- HEART -->
		<button
			on:click={heart}
			type="button"
			class="btn-icon btn-icon-xl w-20 h-20 variant-filled-primary"
			style="transform: scale({interactionVisualization.heart +
				1}) translate(0%, {-interactionVisualization.heart * 75}%);"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="currentColor"
				class="w-10 h-10"
			>
				<path
					d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z"
				/>
			</svg>
		</button>

		<!-- LIKE -->
		<button
			on:click={like}
			type="button"
			class="btn-icon btn-icon-xl h-16 variant-filled-secondary"
			style="transform: scale({interactionVisualization.like +
				1}) translate({interactionVisualization.like * 50}%, {-interactionVisualization.like *
				50}%);"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 16 16"
				fill="currentColor"
				class="w-8 h-8"
			>
				<path
					d="M2.09 15a1 1 0 0 0 1-1V8a1 1 0 1 0-2 0v6a1 1 0 0 0 1 1ZM5.765 13H4.09V8c.663 0 1.218-.466 1.556-1.037a4.02 4.02 0 0 1 1.358-1.377c.478-.292.907-.706.989-1.26V4.32a9.03 9.03 0 0 0 0-2.642c-.028-.194.048-.394.224-.479A2 2 0 0 1 11.09 3c0 .812-.08 1.605-.235 2.371a.521.521 0 0 0 .502.629h1.733c1.104 0 2.01.898 1.901 1.997a19.831 19.831 0 0 1-1.081 4.788c-.27.747-.998 1.215-1.793 1.215H9.414c-.215 0-.428-.035-.632-.103l-2.384-.794A2.002 2.002 0 0 0 5.765 13Z"
				/>
			</svg>
		</button>
	</div>
</div>
