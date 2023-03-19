<script>
	const MIN_OPTIONS = 2
	const MAX_OPTIONS = 6

	let options = ['', ''] // initial options
	let optionCount = 2

	function addOption() {
		if (optionCount >= MAX_OPTIONS) {
			alert('You can only add up to 6 options.')
			return
		}

		options = [...options, '']
		optionCount++
	}

	function removeOption(index) {
		if (optionCount <= MIN_OPTIONS) {
			return
		}

		options.splice(index, 1)
		options = [...options]
		optionCount--
	}
</script>

<form class="flex flex-col gap-6">
	<hgroup class="flex flex-col items-center justify-center gap-2 text-center">
		<h2 class="text-2xl font-semibold font-serif cursor-pointer">Create A Poll</h2>
	</hgroup>
	<section class="flex flex-col gap-4">
		<div class="form-control w-full">
			<label for="title" class="label">
				<span class="label-text text-base-100">Poll Title</span>
			</label>
			<input
				class="input input-sm w-full bg-base-content border-base-300"
				type="text"
				id="title"
				name="title"
				required
				placeholder="What's your favorite ..."
			/>
		</div>
		<div class="form-control w-full">
			<label for="endDate" class="label">
				<span class="label-text text-base-100">End Date</span>
			</label>
			<input
				class="input input-sm w-full bg-base-content border-base-300"
				type="datetime-local"
				id="endDate"
				name="endDate"
				min={new Date().toDateString()}
				required
			/>
		</div>
		<div class="form-control w-full flex-col flex gap-4">
			<label class="label-text text-base-100" for="options">Poll Options</label>
			{#each options as option, index}
				<div class=" w-full flex gap-2 items-center">
					<input
						class="input input-sm w-full bg-base-content border-base-300"
						type="text"
						id={`option${index}`}
						name="options[]"
						value={option}
						required
						placeholder="Option {index + 1}"
					/>
					{#if index >= MIN_OPTIONS}
						<button
							class="btn btn-sm border-base-300 hover:text-base-content hover:bg-base-300"
							type="button"
							on:click={() => removeOption(index)}>✕</button
						>
					{/if}
				</div>
			{/each}
			{#if optionCount < MAX_OPTIONS}
				<button
					type="button"
					class="btn btn-sm border-base-300 hover:text-base-content hover:bg-base-300"
					on:click={addOption}>Add Option</button
				>
			{/if}
		</div>
	</section>
	<input
		type="submit"
		class="btn btn-sm border-base-300 hover:text-base-content hover:bg-base-300"
		value="Create Poll"
	/>
</form>
