<script lang="ts">
	import Icon from '@iconify/svelte'
	import moment from 'moment'
	export let title = ''
	export let endDate = ''
	export let numberOfVotes = 0
	export let userPollResponse = null
	export let options = []
	export let id = ''
	export let comments = []
	export let author = {}
	import { enhance } from '$app/forms'
	$: daysAgo = moment(endDate).fromNow()
	$: pollId = id
	$: totalVotes = numberOfVotes
</script>

<div
	class="flex flex-col gap-4 p-4 rounded bg-base-content border-[1px] border-[#323333] text-base-100 w-10/12"
>
	<div class="flex justify-between items-center">
		<div class="flex items-center gap-4">
			<div class="avatar">
				<div class="w-10 rounded-full">
					<img
						alt="Ajay Sharma"
						src="https://media.licdn.com/dms/image/D4D03AQHae7pP4xol3A/profile-displayphoto-shrink_800_800/0/1672334663749?e=1683763200&v=beta&t=Dn5onPWb_XllML7j57twBleDjdBpNR_THdSkGhsG8_M"
					/>
				</div>
			</div>

			<span class="text-sm font-semibold">{author.username}</span>
		</div>
		<button><Icon class="text-3xl" icon="carbon:overflow-menu-horizontal" /></button>
	</div>
	<form method="POST" class="flex flex-col gap-4" action="?/vote" use:enhance>
		<input type="hidden" name="pollId" value={pollId} />

		<span> {title} </span>

		<div class="flex flex-col gap-4 justify-center form-control w-full">
			{#each options as { id, optionText, pollId, numberOfVotes }, i}
				<label class="flex items-center gap-2">
					<input
						type="radio"
						class="form-radio h-5 w-5 text-blue-600"
						name="optionId"
						value={id}
						checked={userPollResponse?.optionId === id}
					/>
					<div class="w-full">
						<div class="flex justify-between items-center">
							<span class="text-base-100 text-sm">{optionText} </span>
							<span class="px-1 py-0.5 bg-blue-500 rounded-md"
								>{numberOfVotes} votes - {totalVotes
									? (numberOfVotes / totalVotes) * 100
									: 0}%</span
							>
						</div>

						<div class="w-full h-4 mt-1 bg-gray-200 rounded-full">
							<div
								class="h-full bg-blue-500 rounded-full"
								style="width: {totalVotes ? (numberOfVotes / totalVotes) * 100 : 0}%;"
							/>
						</div>
					</div>
				</label>
			{/each}
		</div>

		<section>
			<div class="flex items-center justify-between">
				<div class="flex gap-1 items-center text-sm">
					<span> Total Votes: {totalVotes} </span>
					<span>
						<Icon icon="mdi:dot" />
					</span>
					<span> ends {daysAgo} </span>
				</div>
				<input
					class="text-base font-semibold"
					type="submit"
					value={userPollResponse ? 'Update Vote' : 'Vote'}
				/>
			</div>
		</section>
	</form>
</div>
