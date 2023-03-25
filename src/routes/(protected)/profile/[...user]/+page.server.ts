import { fail, redirect, error } from '@sveltejs/kit'
import { prisma } from '$lib/server/prisma'
export const load = async (event) => {
	const { session, user } = await event.locals.validateUser()
	const userProfile = await prisma.user.findUnique({
		where: {
			username: event.params.user
		},
		select: {
			id: true,
			name: true,
			username: true,
			bio: true,
			polls: {
				orderBy: { createdAt: 'desc' },
				include: {
					options: {
						include: {
							pollResponses: {
								select: {
									responderId: true
								}
							}
						}
					},
					pollResponses: {
						select: {
							optionId: true,
							responderId: true
						}
					},
					author: {
						select: {
							username: true
						}
					}
				}
			},
			followers: {
				select: {
					follower: {
						select: {
							id: true,
							name: true,
							username: true,
							photoUrl: true
						}
					}
				}
			},
			following: {
				select: {
					following: {
						select: {
							id: true,
							name: true,
							username: true,
							photoUrl: true
						}
					}
				}
			}
		}
	})

	const follow: any[] = await prisma.$queryRaw`SELECT *
												FROM Follow 
												WHERE followerId = ${user?.userId}
												AND followingId = ${userProfile?.id};`

	if (!userProfile) {
		return fail(404, { message: 'USER NOT FOUND' })
	}
	console.log(userProfile.polls)
	return {
		userProfile,
		following: follow.length !== 0
	}
}
