<script lang="ts">
	import { faker } from '@faker-js/faker'
	import { enhance, applyAction } from '$app/forms'
	import { invalidateAll } from '$app/navigation'
</script>

<form
	class="flex flex-col gap-6"
	method="POST"
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
		<div class="w-full flex flex-col gap-3">
			<div class="w-full">
				<span class="text-sm">__aj2000__</span>
			</div>
		</div>
	</div>

	<div class="flex w-full">
		<div class="flex justify-end items-start">
			<span class="px-6 py-1 font-bold w-[125px]">Old Password</span>
		</div>
		<div class="w-full flex flex-col gap-3">
			<div class="w-full">
				<input
					class="input input-sm w-full bg-base-content border-base-300"
					type="password"
					id="password"
					name="password"
					placeholder="password"
					required
				/>
			</div>
		</div>
	</div>

	<div class="flex w-full">
		<div class="flex justify-end items-start">
			<span class="px-6 py-1 font-bold w-[125px]">New Password</span>
		</div>
		<div class="w-full flex flex-col gap-3">
			<div class="w-full">
				<input
					class="input input-sm w-full bg-base-content border-base-300"
					type="password"
					id="new-password"
					name="new-password"
					placeholder="new password"
					required
				/>
			</div>
		</div>
	</div>

	<div class="flex w-full">
		<div class="flex justify-end items-start">
			<span class=" px-6 py-1 font-bold w-[125px]">Confirm New Password</span>
		</div>
		<div class="w-full flex flex-col gap-3">
			<div class="w-full">
				<input
					class="input input-sm w-full bg-base-content border-base-300"
					type="password"
					id="confirm-password"
					name="confirm-password"
					placeholder="confirm new password"
					required
				/>
			</div>
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
					type="submit">Change Password</button
				>
			</div>
		</div>
	</div>
</form>
