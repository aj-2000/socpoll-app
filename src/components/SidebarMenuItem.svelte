<script lang="ts">
	export let icon = ''
	export let title = ''
	export let href = ''
	import Icon from '@iconify/svelte'
</script>

<a {href} class="flex items-center justify-start gap-3 btn-ghost">
	<Icon class="text-3xl" {icon} />
	<span class="text-md font-normal">{title}</span>
</a>
