<script lang="ts">
	import { faker } from '@faker-js/faker'
</script>

<div class="flex w-full">
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
				value="Ajay Sharma"
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
				class="input input-sm w-full bg-base-content border-base-300"
				type="text"
				id="name"
				name="name"
				value="__aj2000__"
				required
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
				value="Seeker
Photography account: @_ajay.clicks_"
			/>
		</div>
		<div class="text-xs font-bold text-base-300">42 / 150</div>
	</div>
</div>
