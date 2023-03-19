<script lang="ts">
	import '../app.css'
	import CreatePollForm from '../components/CreatePollForm.svelte'
	import Sidebar from '../components/Sidebar.svelte'
	import type { PageData } from './$types'
	export let data: PageData
</script>

{#if !data.user}
	<div class="bg-[#141414] h-screen">
		<slot />
	</div>
{:else}
	<div class="grid grid-cols-6">
		<Sidebar />
		<div class="col-span-5 bg-[#141414] h-screen">
			<slot />
		</div>
	</div>
	<!-- Put this part before </body> tag -->
	<input type="checkbox" id="create-poll-modal" class="modal-toggle" />
	<div class="modal">
		<div class="modal-box relative bg-base-content text-base-100   border-[1px] border-[#323333]">
			<label
				for="create-poll-modal"
				class="btn btn-sm border-base-300 hover:text-base-content hover:bg-base-300 btn-circle absolute right-2 top-2"
				>✕</label
			>
			<CreatePollForm />
		</div>
	</div>
{/if}
