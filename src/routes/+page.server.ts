import { prisma } from '$lib/server/prisma'
import { error, redirect } from '@sveltejs/kit'
import type { PageServerLoad, Actions } from './$types'
import { compile } from 'mdsvex'
export const load: PageServerLoad = async ({ locals }) => {
	const { session, user } = await locals.validateUser()
	if (!session) {
		throw redirect(302, '/login')
	}

	const getAllPolls = async (userId) => {
		const allPolls = await prisma.poll.findMany({
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
			throw error(403, 'Invalid Poll Response Data')
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
			if (existingResponse.optionId === optionId) {
				return {
					status: 204,
					body: { message: 'Already voted for same option.' }
				}
			}
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
	},
	create: async ({ request, locals }) => {
		const userId = (await locals.validateUser()).user?.userId
		if (!userId) {
			return { status: 404, body: { message: 'User not found' } }
		}
		const data = await request.formData()
		const compiltedTitle = await compile(data.get('title'))
		const endDate = data.get('endDate')
		const options = data.getAll('options[]')
		const poll = await prisma.poll.create({
			data: {
				title: compiltedTitle?.code || 'Untitled',
				endDate: new Date(endDate),
				author: { connect: { id: userId } },
				options: {
					create: options.map((option) => ({ optionText: option }))
				}
			},
			include: {
				options: true // assuming you want to include the options relation
			}
		})

		return { status: 201, body: poll }
	},
	delete: async ({ request, locals }) => {
		const userId = (await locals.validateUser()).user?.userId
		if (!userId) {
			throw error(404, 'User not found')
		}
		const data = await request.formData()
		const pollId = Number(data.get('pollId'))
		if (!pollId) {
			throw error(422, 'pollId is required')
		}
		const poll = await prisma.poll.findUnique({
			where: { id: pollId },
			include: { options: true }
		})
		if (!poll) {
			throw error(404, 'Poll not found')
		}
		if (poll.authorId !== userId) {
			throw error(401, `User with id ${userId} is not the author of the poll with id ${pollId}`)
		}
		const optionIds = poll.options.map((option) => option.id)
		await prisma.pollResponses.deleteMany({ where: { pollId } })
		await prisma.option.deleteMany({ where: { id: { in: optionIds } } })
		const deletedPoll = await prisma.poll.delete({ where: { id: pollId } })
		return deletedPoll
	}
} satisfies Actions
