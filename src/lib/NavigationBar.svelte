<script lang="ts">
	import { Navigation } from '@skeletonlabs/skeleton-svelte';

    type Route = {
        label: string;
        href: string;
        icon: string;
    }
    type Props = {
        routes: Route[];
    }

    let { routes }: Props = $props();
	let path = $state(window.location.pathname);

</script>

<Navigation.Bar classes="max-h-16 h-16 flex justify-center items-center" tilesClasses="w-40" onValueChange={newPath => path = newPath}>
	{#each routes as route}
		<Navigation.Tile
            classes={path === route.href ? 'text-primary-500' :''}
        label={route.label} id={route.href} href={route.href}>
			{@html route.icon}
		</Navigation.Tile>
	{/each}
</Navigation.Bar>