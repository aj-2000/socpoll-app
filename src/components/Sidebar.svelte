<script lang="ts">
	import SidebarMenuItem from './SidebarMenuItem.svelte'
	import { applyAction, enhance } from '$app/forms'
	import { invalidateAll } from '$app/navigation'
	import { page } from '$app/stores'
</script>

<!-- 020202: sidebar background -->
<div
	class="col-span-1 bg-base-content border-r-[1px] border-[#323333] text-base-100 h-screen py-4 px-4"
>
	<div class="flex flex-col justify-between h-full ">
		<div class="flex flex-col gap-6 h-full">
			<div class="text-2xl font-semibold font-serif py-6 cursor-pointer">SocPoll</div>
			<SidebarMenuItem href="/" title="Home" icon="material-symbols:home" />
			<SidebarMenuItem title="Explore" icon="material-symbols:explore" />
			<SidebarMenuItem title="Messages" icon="jam:messages-f" />
			<SidebarMenuItem title="Create" icon="system-uicons:create" />
			<SidebarMenuItem href="/profile" title="Profile" icon="gg:profile" />
			{#if $page.data.user}
				<form
					action="/logout"
					method="POST"
					use:enhance={() => {
						;``
						return async ({ result }) => {
							invalidateAll()
							await applyAction(result)
						}
					}}
				>
					<button type="submit">Log out</button>
				</form>
			{/if}
		</div>
		<SidebarMenuItem icon="charm:menu-hamburger" title="More" />
	</div>
</div>
