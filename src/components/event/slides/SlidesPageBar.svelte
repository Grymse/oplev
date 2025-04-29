<script lang="ts">
	import { createEventDispatcher } from "svelte";

    const dispatcher = createEventDispatcher();
    export let slideCount = 0;
    export let currentSlide = 0;

    function onBarClick(index: number) {
        currentSlide = index;
        dispatcher("barClick", { index });
    }

    $: indexArray = Array.from({ length: slideCount }, (_, i) => i);
</script>

{#if 2 <= slideCount}
<div
    class="absolute w-full z-40 grid gap-2 px-8"
    style={`grid-template-columns: repeat(${slideCount}, minmax(0, 1fr))`}
>
    {#each indexArray as i}
        <button class={`rounded-full h-5 z-40`} on:click={() => onBarClick(i)}>
            <div
                class={`rounded-full w-full h-1 ${i === currentSlide ? 'bg-white' : 'bg-gray-500'} opacity-50`}
            />
        </button>
    {/each}
</div>
{/if}