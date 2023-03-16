<script lang="ts">
	import Icon from '@iconify/svelte'
	export let icon = ''
	export let title = ''
	export let href = ''
</script>

<a {href} class="flex justify-start gap-3 btn-ghost">
	<Icon class="text-3xl text" {icon} />
	<span class="text-md font-normal">{title}</span>
</a>
