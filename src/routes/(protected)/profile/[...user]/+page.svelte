<script>
	import Icon from '@iconify/svelte'
	import { enhance, applyAction } from '$app/forms'
	export let data
	import { faker } from '@faker-js/faker'
	import PollComponent from '../../../../components/PollComponent.svelte'
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
					{data?.userProfile?.username}
				</span>

				{#if data.user.userId !== data.userProfile.id}
					<form method="POST" action="/?/follow" use:enhance>
						<input type="hidden" name="followingId" id="followingId" value={data.userProfile.id} />
						<input
							class="btn btn-sm border-[#323333] hover:text-base-content hover:bg-base-300"
							type="submit"
							value={data.following ? 'Unfollow' : 'Follow'}
						/>
					</form>
				{/if}
				{#if data.user.userId === data.userProfile.id}
					<div>
						<a
							href="/settings/profile"
							class="btn btn-sm border-[#323333] hover:text-base-content hover:bg-base-300"
							>Edit Profile</a
						>
					</div>
				{/if}
				<div>
					<Icon class="text-3xl" icon="material-symbols:settings" />
				</div>
			</div>
			<div class="flex gap-8 items-center">
				<span>
					{data.userProfile?.polls.length} Polls
				</span>
				<span>
					<label for="followers-modal" class="cursor-pointer">
						{data.userProfile?.followers.length} Followers
					</label>
				</span>
				<span>
					<label for="followings-modal" class="cursor-pointer">
						{data.userProfile?.following.length} Followings
					</label>
				</span>
			</div>
			<div>
				<span>{data?.userProfile?.name}</span>
				<p class="text-sm max-w-xs">
					{data?.userProfile?.bio}
				</p>
			</div>
		</div>
	</div>
	<div class="col-span-12 grid-col flex flex-col px-32">
		<hr />

		<section class="max-h-fit flex flex-col gap-4 items-center col-span-7 py-8">
			{#each data.userProfile?.polls as poll, i}
				<PollComponent username={data.user?.username} {...poll} />
			{/each}
		</section>
	</div>
</main>

<!-- Put this part before </body> tag -->
<input type="checkbox" id="followers-modal" class="modal-toggle" />
<label for="followers-modal" class="modal cursor-pointer">
	<label class="modal-box relative  max-w-sm" for="">
		<h3 class="text-lg font-bold">Followers</h3>

		<div class="py-4 flex flex-col gap-4">
			{#each data.userProfile?.followers as { follower }}
				<div class="flex justify-between items-center">
					<div class="flex items-center gap-2">
						<div class="avatar">
							<div class="w-12 rounded-full">
								<img alt="Ajay Sharma" src={faker.image.avatar()} />
							</div>
						</div>

						<div class="flex flex-col">
							<span class="text-base font-bold">{follower.name}</span>
							<span class="text-sm">{follower.username}</span>
						</div>
					</div>
					<button class="btn btm-sm">Unfollow</button>
				</div>
			{/each}
		</div>
	</label>
</label>

<!-- Put this part before </body> tag -->
<input type="checkbox" id="followings-modal" class="modal-toggle" />
<label for="followings-modal" class="modal cursor-pointer">
	<label class="modal-box relative max-w-sm" for="followings-modal">
		<h3 class="text-lg font-bold">Followings</h3>

		<div class="py-4 flex flex-col gap-4">
			{#each data.userProfile?.following as { following }}
				<div class="flex justify-between items-center">
					<div class="flex items-center gap-2">
						<div class="avatar">
							<div class="w-12 rounded-full">
								<img alt="Ajay Sharma" src={faker.image.avatar()} />
							</div>
						</div>

						<div class="flex flex-col">
							<span class="text-base font-bold">{following.name}</span>
							<span class="text-sm">{following.username}</span>
						</div>
					</div>
					<button class="btn btm-sm">Unfollow</button>
				</div>
			{/each}
		</div>
	</label>
</label>
