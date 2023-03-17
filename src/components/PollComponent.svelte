<script lang="ts">
	import Icon from '@iconify/svelte'
	import moment from 'moment'
	export let title = ''
	export let endDate = ''
	export let numberOfVotes = 0
	export let options = []
	export let pollId = ''
	export let comments = []
	export let author = {}
	$: daysAgo = moment(endDate).fromNow()
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
	<content class="flex flex-col gap-4">
		<span> {title} </span>

		<form class="flex flex-col gap-2">
			{#each options as { id, optionText, pollId }, i}
				<div>
					<input type="radio" name={pollId} value={id} />
					<label for="html">{optionText}</label><br />
				</div>
			{/each}
		</form>
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
			<button class="text-base font-semibold"> Vote </button>
		</div>
	</section>
</div>
