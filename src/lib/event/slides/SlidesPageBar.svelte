<script lang="ts">
    type Props = {
        slideCount?: number;
        currentSlide?: number;
    }

    let { slideCount = 0, currentSlide = $bindable(0) }: Props = $props();

    let indexArray = $derived(Array.from({ length: slideCount }, (_, i) => i));
</script>

{#if 2 <= slideCount}
<div
    class="absolute w-full z-40 grid gap-2 px-8"
    style={`grid-template-columns: repeat(${slideCount}, minmax(0, 1fr))`}
>
    {#each indexArray as i}
        <button
            aria-label="Slide"    
        class={`rounded-full h-5 z-40`} onclick={() => currentSlide = i}>
            <div
                class={`rounded-full w-full h-1 ${i === currentSlide ? 'bg-white' : 'bg-gray-500'} opacity-50`}>
            </div>
        </button>
    {/each}
</div>
{/if}