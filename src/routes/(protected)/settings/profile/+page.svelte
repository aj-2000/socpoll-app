<script lang="ts">
	import { enhance, applyAction } from '$app/forms'
	import type { PageData } from './$types'
	import { invalidateAll } from '$app/navigation'
	export let data: PageData
	let bio = data.userProfile.bio || ''
	let fileInput
	let files
	let avatar
	function getBase64(image) {
		const reader = new FileReader()
		reader.readAsDataURL(image)
		reader.onload = (e) => {
			avatar = e.target.result
		}
	}
	import { faker } from '@faker-js/faker'
</script>

<!-- <SuperDebug data={$form} /> -->
<form
	class="flex flex-col gap-6"
	method="POST"
	action="?/update"
	use:enhance={() => {
		;``
		return async ({ result }) => {
			invalidateAll()
			await applyAction(result)
		}
	}}
>
	<div class="flex">
		<div class="flex justify-end items-start ">
			<span class="px-6 py-1 font-bold w-[125px]"
				><img alt="Ajay Sharma" class="w-10 h-10 rounded-full" src={faker.image.avatar()} /></span
			>
		</div>
		<div class="w-full flex flex-col">
			<div class="w-full">
				<span class="text-sm">{data.user?.username}</span>
			</div>
			<div class="w-full">
				<input
					type="file"
					class="hidden"
					name="photo"
					id="file"
					accept=".png,.jpg"
					bind:this={fileInput}
				/>
				<button class="upload-btn" on:click={() => fileInput.click()}>Upload</button>
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
					value={data.userProfile?.name}
					placeholder="Ajay Sharma"
					required
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
					class="input input-sm w-full bg-base-content border-base-300 disabled:bg-gray-600 disabled:text-gray-400"
					type="text"
					id="username"
					name="username"
					value={data.userProfile?.username}
					placeholder="__aj2000__"
					required
					disabled
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
					rows="2"
					bind:value={bio}
					placeholder="Seeker
Photography account: @_ajay.clicks_"
				/>
			</div>
			<div class="text-xs font-bold text-base-300">{bio.length} / 256</div>
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
