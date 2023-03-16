<script lang="ts">
	import Icon from '@iconify/svelte'
	export let title = ''
	export let endDate = ''
	export let numberOfVotes = ''
	export let options = []
	export let pollId = ''
</script>

<div class="flex flex-col gap-4 p-4 rounded bg-[#020202] border-[1px] border-[#323333] text-white">
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

			<span class="text-sm font-semibold">__aj2000__</span>
		</div>
		<button><Icon class="text-3xl" icon="carbon:overflow-menu-horizontal" /></button>
	</div>
	<content class="flex flex-col gap-4">
		<span> What programming language do you use during the coding interview? </span>
		<section class="flex flex-col gap-2">
			<div>
				<input type="radio" id="html" name="fav_language" value="HTML" />
				<label for="html">HTML</label><br />
			</div>
			<div>
				<input type="radio" id="css" name="fav_language" value="CSS" />
				<label for="css">CSS</label><br />
			</div>
			<div>
				<input type="radio" id="javascript" name="fav_language" value="JavaScript" />
				<label for="javascript">JavaScript</label>
			</div>
		</section>
	</content>
	<section>
		<div class="flex items-center justify-between">
			<div class="flex gap-1 items-center text-sm">
				<span> Total Votes: 24 </span>
				<span>
					<Icon icon="mdi:dot" />
				</span>
				<span> 5 Days Left </span>
			</div>
			<button class="text-base font-semibold"> Vote </button>
		</div>
	</section>
</div>
