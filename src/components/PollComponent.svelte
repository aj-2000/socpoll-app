<script lang="ts">
	import Icon from '@iconify/svelte'
	import moment from 'moment'
	import { enhance } from '$app/forms'
	import { faker } from '@faker-js/faker'
	export let title = ''
	export let endDate = ''
	export let numberOfVotes = 0
	export let userPollResponse = null
	export let options = []
	export let id = ''
	export let comments = []
	export let author
	export let username

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
					<img alt="Ajay Sharma" src={faker.image.avatar()} />
				</div>
			</div>

			<span class="text-sm font-semibold">{author.username}</span>
		</div>
		<button><Icon class="text-3xl" icon="carbon:overflow-menu-horizontal" /></button>
	</div>
	<form method="POST" class="flex flex-col gap-4" action="?/vote" use:enhance>
		<input type="hidden" name="pollId" value={pollId} />

		<div
			class="prose border bg-base-300  border-[#323333] p-2 rounded-md max-h-[400px] overflow-auto"
		>
			{@html title}
		</div>

		<div class="flex flex-col gap-4 justify-center form-control w-full">
			{#each options as { id, optionText, pollId, numberOfVotes }, i}
				<div class="w-full h-12 border border-[#323333] round relative px-1">
					<div
						class="absolute h-full flex items-center bg-green-500 top-0 left-0 bg-opacity-20"
						style="width:  {totalVotes ? (numberOfVotes / totalVotes) * 100 : 0}%;"
					/>
					<label class="absolute h-full flex  items-center gap-2 z-10 w-full top-0 left-0 p-2">
						<input
							type="radio"
							class="h-6 w-6 border border-base-300"
							name="optionId"
							value={id}
							checked={userPollResponse?.optionId === id}
						/>

						<div class="w-full flex justify-between items-center">
							<span class="text-base-100 text-sm font-medium">{optionText} </span>
							<div class="flex items-center  border border-base-300  rounded-full">
								<span class="text-sm font-bold py-1 px-2 border-r border-base-300">
									{`${numberOfVotes} ${numberOfVotes > 1 ? 'Votes' : 'Vote'}`}</span
								><span
									class="text-sm font-bold py-1 px-2 bg-base-300 text-base-content rounded-r-full"
								>
									{Number(totalVotes ? (numberOfVotes / totalVotes) * 100 : 0).toFixed(2)}%</span
								>
							</div>
						</div>
					</label>
				</div>
			{/each}

			<section>
				<div class="flex items-center justify-between">
					<div class="flex gap-1 items-center text-sm ">
						<span class="font-bold"> {`${totalVotes} ${totalVotes > 1 ? 'Votes' : 'Vote'}`} </span>
						<span>
							<Icon icon="mdi:dot" />
						</span>
						<span class="text-sm font-semibold text-base-300"
							>{moment(endDate).isAfter(moment()) ? 'ends' : 'ended'}
							{daysAgo}
						</span>
					</div>
					<div class="flex gap-2 items-center">
						{#if username === author.username}
							<form method="POST" action="?/delete" use:enhance>
								<input type="hidden" name="pollId" value={pollId} />
								<input
									class="btn btn-sm border-red-500 hover:text-base-content hover:bg-red-500 text-red-500"
									type="submit"
									value="Delete poll"
								/>
							</form>
						{/if}

						{#if moment(endDate).isAfter(moment())}
							<input
								class="btn btn-sm border-base-300 hover:text-base-content hover:bg-base-300"
								type="submit"
								value={userPollResponse ? 'Update vote' : 'Vote'}
							/>
						{/if}
					</div>
				</div>
			</section>
		</div>
	</form>
</div>
