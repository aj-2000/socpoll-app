<script lang="ts">
	import PollComponent from '../components/PollComponent.svelte'
	import type { PageData } from './$types'
	export let data: PageData
	$: ({ polls } = data)
</script>

<main class="w-full h-full grid grid-cols-12">
	<section class="flex flex-col gap-4 items-end col-span-7 overflow-auto py-8">
		{#each polls as poll, i}
			<PollComponent {...poll} />
		{/each}
	</section>
	<section class="col-span-7 overflow-auto" />
</main>
