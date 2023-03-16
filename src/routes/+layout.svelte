<script lang="ts">
	import '../app.css'
	import Sidebar from '../components/Sidebar.svelte'
	import type { PageData } from './$types'
	export let data: PageData
</script>

{#if !data.user}
	<slot />
{/if}

{#if data.user}
	<div class="grid grid-cols-6">
		<Sidebar />
		<div class="col-span-5 bg-[#141414] h-screen">
			<slot />
		</div>
	</div>
{/if}
