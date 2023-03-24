<script lang="ts">
	import SidebarMenuItem from './SidebarMenuItem.svelte'
	import { applyAction, enhance } from '$app/forms'
	import { invalidateAll } from '$app/navigation'
	import { page } from '$app/stores'
	export let username = ''

	import Icon from '@iconify/svelte'
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
			<!-- The button to open modal -->
			<label for="create-poll-modal" class="flex items-center justify-start gap-3 btn-ghost">
				<Icon class="text-3xl" icon="system-uicons:create" />
				<span class="text-md font-normal">Create</span>
			</label>
			<SidebarMenuItem href="/profile/{username}" title="Profile" icon="gg:profile" />
		</div>
		<!-- More Menu -->
		<div class="dropdown dropdown-top ">
			<label tabindex="0"
				><div class="flex items-center justify-start gap-3 btn-ghost">
					<Icon class="text-3xl" icon="charm:menu-hamburger" />
					<span class="text-md font-normal">More</span>
				</div>
			</label>
			<ul
				tabindex="0"
				class="dropdown-content menu rounded-box w-52  border-[1px] border-[#323333] mb-2 bg-base-content"
			>
				<li class="flex flex-col">
					<div class="flex justify-between items-center">
						<a href="/settings/profile">Settings</a>
						<Icon class="text-xl" icon="material-symbols:settings" />
					</div>
					<div class="flex justify-between items-center border-t-[1px] border-[#323333]">
						<a href="/settings/profile">Appearnce</a>
						<Icon class="text-xl" icon="gridicons:themes" />
					</div>
				</li>
				<li class="border-t-4 border-[#323333]">
					<div>
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
					</div>
				</li>
			</ul>
		</div>
	</div>
</div>
