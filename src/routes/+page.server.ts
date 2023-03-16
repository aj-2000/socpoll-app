import { redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ locals }) => {
	const { session } = await locals.validateUser()
	if (!session) {
		throw redirect(302, '/login')
	}
}
