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
</script>

<div
	class="flex flex-col gap-4 p-4 rounded bg-base-content border-[1px] border-[#323333] text-base-100 w-full"
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
	<form method="POST" action="?/vote" use:enhance>
		<input type="hidden" name="pollId" value={pollId} />
		<content class="flex flex-col gap-4">
			<span> {title} </span>

			<div class="flex flex-col gap-2">
				{#each options as { id, optionText, pollId }, i}
					<input
						type="radio"
						name="optionId"
						value={id}
						checked={userPollResponse?.optionId === id}
					/>
					<label for="html">{optionText}</label><br />
				{/each}
			</div>
		</content>
		<section>
			<div class="flex items-center justify-between">
				<div class="flex gap-1 items-center text-sm">
					<span> Total Votes: {numberOfVotes} </span>
					<span>
						<Icon icon="mdi:dot" />
					</span>
					<span> ends {daysAgo} </span>
				</div>
				<input class="text-base font-semibold" type="submit" value="Vote" />
			</div>
		</section>
	</form>
</div>
