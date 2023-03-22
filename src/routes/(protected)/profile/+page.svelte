<script>
	import Icon from '@iconify/svelte'

	export let data
</script>

<main class="text-white grid grid-cols-12 py-8">
	<div class="flex gap-6 items-center justify-end col-span-8">
		<div class="py-4 px-12">
			<div class="avatar">
				<div class="w-36 rounded-full">
					<img
						alt="Ajay Sharma"
						src="https://media.licdn.com/dms/image/D4D03AQHae7pP4xol3A/profile-displayphoto-shrink_800_800/0/1672334663749?e=1683763200&v=beta&t=Dn5onPWb_XllML7j57twBleDjdBpNR_THdSkGhsG8_M"
					/>
				</div>
			</div>
		</div>
		<div class="flex flex-col gap-4">
			<div class="flex items-center gap-6">
				<span class="text-xl">
					{data.userProfile?.username}
				</span>
				<div>
					<button class="btn">Edit Profile</button>
				</div>
				<div>
					<Icon class="text-3xl" icon="material-symbols:settings" />
				</div>
			</div>
			<div class="flex gap-8">
				<span>
					{'5 Polls'}
				</span>
				<span>
					{'52 Followers'}
				</span>
				<span>
					{'334 Following'}
				</span>
			</div>
			<div>
				<span>{data.userProfile?.name}</span>
				<p class="text-sm max-w-xs">
					{data.userProfile?.bio}
				</p>
			</div>
		</div>
	</div>
	<div class="col-span-12 grid-col flex flex-col px-32">
		<hr />
	</div>
</main>
