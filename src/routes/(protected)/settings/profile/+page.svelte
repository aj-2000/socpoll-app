<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client'
	import { faker } from '@faker-js/faker'
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte'
	import type { PageData } from './$types'
	export let data: PageData
	const { form, errors, enhance, constraints } = superForm(data.form, {
		taintedMessage: 'Are you sure you want to leave this page?',
		validators: {
			name: (name) => {
				return 'Works'
			}
		}
	})
</script>

<!-- <SuperDebug data={$form} /> -->
<form class="flex flex-col gap-6" method="POST" action="?/updateProfile" use:enhance>
	<div class="flex">
		<div class="flex justify-end items-start ">
			<span class="px-6 py-1 font-bold w-[125px]"
				><img alt="Ajay Sharma" class="w-10 h-10 rounded-full" src={faker.image.avatar()} /></span
			>
		</div>
		<div class="w-full flex flex-col">
			<div class="w-full">
				<span class="text-sm">__aj2000__</span>
			</div>
			<div class="w-full">
				<span class="text-sm">Change profile photo</span>
			</div>
		</div>
	</div>

	<div class="flex w-full">
		<div class="flex justify-end items-start">
			<span class="px-8 py-1 font-bold w-[125px]">Name</span>
		</div>
		<div class="w-full flex flex-col gap-3">
			<div class="w-full">
				<input
					class="input input-sm w-full bg-base-content border-base-300"
					type="text"
					id="name"
					name="name"
					bind:value={$form.name}
					placeholder="Ajay Sharma"
					{...$constraints.name}
				/>
			</div>
			<div class="text-xs text-base-300">
				Help people discover your account by using the name you're known by: either your full name,
				nickname, or business name.
			</div>
		</div>
	</div>
	<div class="flex w-full">
		<div class="flex justify-end items-start">
			<span class="px-8 py-1 font-bold w-[125px]">Username</span>
		</div>
		<div class="w-full flex flex-col gap-3">
			<div class="w-full">
				<input
					class="input input-sm w-full bg-base-content border-base-300"
					type="text"
					id="username"
					name="username"
					placeholder="__aj2000__"
					bind:value={$form.username}
					{...$constraints.username}
				/>
			</div>
		</div>
	</div>
	<div class="flex w-full">
		<div class="flex justify-end items-start">
			<span class="px-8 py-1 font-bold w-[125px]">Bio</span>
		</div>
		<div class="w-full flex flex-col gap-2">
			<div class="w-full">
				<textarea
					class="w-full bg-base-content border border-base-300 p-2"
					id="bio"
					name="bio"
					required
					rows="2"
					bind:value={$form.bio}
					{...$constraints.bio}
					placeholder="Seeker
Photography account: @_ajay.clicks_"
				/>
			</div>
			<div class="text-xs font-bold text-base-300">42 / 150</div>
		</div>
	</div>
	<div class="flex w-full">
		<div class="flex justify-end items-start">
			<span class="px-8 py-1 font-bold w-[125px]" />
		</div>
		<div class="w-full flex flex-col gap-3">
			<div class="w-full">
				<button
					class="btn btn-sm border-base-300 hover:text-base-content hover:bg-base-300"
					type="submit">Save</button
				>
			</div>
		</div>
	</div>
</form>
