import { prisma } from '$lib/server/prisma'
import { redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ locals }) => {
	const { session } = await locals.validateUser()
	if (!session) {
		throw redirect(302, '/login')
	}
	const getAllPolls = async () => {
		const allPolls = await prisma.poll.findMany({
			include: {
				options: true,
				pollResponses: {
					select: {
						id: true
					}
				},
				author: {
					select: {
						username: true
					}
				}
			}
		})
		const pollsWithResponseCount = allPolls.map((poll) => ({
			...poll,
			numberOfVotes: poll.pollResponses.length
		}))

		return pollsWithResponseCount || []
	}

	return {
		polls: getAllPolls()
	}
}
