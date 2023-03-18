import { prisma } from '$lib/server/prisma'
import { error, redirect } from '@sveltejs/kit'
import type { PageServerLoad, Actions } from './$types'

export const load: PageServerLoad = async ({ locals }) => {
	const { session, user } = await locals.validateUser()
	if (!session) {
		throw redirect(302, '/login')
	}

	const getAllPolls = async (userId) => {
		const allPolls = await prisma.poll.findMany({
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
		})
		const pollsWithResponseCount = allPolls.map((poll) => {
			return {
				...poll,
				numberOfVotes: poll.pollResponses.length,
				userPollResponse: poll.pollResponses.find((response) => userId === response.responderId)
			}
		})
		return pollsWithResponseCount || []
	}

	return {
		polls: await getAllPolls(user.userId)
	}
}

export const actions = {
	vote: async ({ request, locals }) => {
		const data = await request.formData()
		// Todo: any
		let pollId, optionId
		try {
			pollId = Number(data.get('pollId'))
			optionId = Number(data.get('optionId'))
		} catch (err) {
			return error(403, 'Invalid Poll Response Data')
		}

		const userId = (await locals.validateUser()).user?.userId

		// Check if the user has already responded to this poll
		const existingResponse = await prisma.pollResponses.findFirst({
			where: {
				pollId,
				responderId: userId
			}
		})

		if (existingResponse) {
			// Update the existing response
			await prisma.pollResponses.update({
				where: {
					id: existingResponse.id
				},
				data: {
					optionId
				}
			})

			// Update the number of votes for the old and new options
			const oldOption = await prisma.option.findUnique({
				where: {
					id: existingResponse.optionId
				},
				select: {
					numberOfVotes: true
				}
			})
			const newOption = await prisma.option.findUnique({
				where: {
					id: optionId
				},
				select: {
					numberOfVotes: true
				}
			})

			await prisma.option.update({
				where: {
					id: existingResponse.optionId
				},
				data: {
					numberOfVotes: oldOption.numberOfVotes - 1
				}
			})

			await prisma.option.update({
				where: {
					id: optionId
				},
				data: {
					numberOfVotes: newOption.numberOfVotes + 1
				}
			})
			return {
				status: 200,
				body: { message: 'Vote updated successfully' }
			}
		} else {
			// Create a new response

			await prisma.pollResponses.create({
				data: {
					poll: {
						connect: {
							id: pollId
						}
					},
					responder: {
						connect: {
							id: userId
						}
					},
					option: {
						connect: {
							id: optionId
						}
					}
				}
			})

			// Update the number of votes for the selected option
			await prisma.option.update({
				where: {
					id: optionId
				},
				data: {
					numberOfVotes: {
						increment: 1
					}
				}
			})
		}

		return {
			status: 200,
			body: { message: 'Vote submitted successfully' }
		}
	}
} satisfies Actions
