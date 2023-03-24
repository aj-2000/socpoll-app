import { fail, redirect, error } from '@sveltejs/kit'
import { prisma } from '$lib/server/prisma'
export const load = async (event) => {
	console.log(event.params)
	const { session, user } = await event.locals.validateUser()
	const userProfile = await prisma.user.findUnique({
		where: {
			username: event.params.user
		},
		select: {
			id: true,
			name: true,
			username: true,
			bio: true
		}
	})

	const follow: any[] = await prisma.$queryRaw`SELECT *
												FROM Follow 
												WHERE followerId = ${user?.userId}
												AND followingId = ${userProfile?.id};`

	if (!userProfile) {
		return fail(404, { message: 'USER NOT FOUND' })
	}
	return {
		userProfile,
		following: follow.length !== 0
	}
}
