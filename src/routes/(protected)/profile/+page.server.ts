import { fail, redirect, error } from '@sveltejs/kit'
import { prisma } from '$lib/server/prisma'
export const load = async (event) => {
	const { session, user } = await event.locals.validateUser()
	return {
		userProfile: await prisma.user.findUnique({
			where: {
				id: user.userId
			},
			select: {
				name: true,
				username: true,
				bio: true
			}
		})
	}
}
