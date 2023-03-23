import { handleHooks } from '@lucia-auth/sveltekit'
import { auth } from '$lib/server/lucia'
import type { Handle } from '@sveltejs/kit'
import { sequence } from '@sveltejs/kit/hooks'
import { redirect } from '@sveltejs/kit'
export const customHandle: Handle = async ({ resolve, event }) => {
	if (event.url.pathname !== '/login') {
		const { session } = await event.locals.validateUser()
		if (!session) {
			if (event.url.pathname !== '/register') throw redirect(302, '/login')
		} else {
			if (event.url.pathname === '/register') throw redirect(302, '/')
		}
	}
	return resolve(event)
}

export const handle: Handle = sequence(handleHooks(auth), customHandle)
