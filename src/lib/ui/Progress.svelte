<script lang="ts">
    type Props = {
        max: number;
        value: number;
        vertical?: boolean;
    }

    let { max, value, vertical = false }: Props = $props();
</script>

<div class="w-full h-full">
    <div class="w-full h-full bg-primary-500"
        style="transform: scale(1, 0.25);"
    >

    </div>
</div>