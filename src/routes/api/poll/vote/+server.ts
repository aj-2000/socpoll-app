import { PrismaClient } from '@prisma/client'
import { json, type RequestHandler } from '@sveltejs/kit'
const prisma = new PrismaClient()

export const GET: RequestHandler = async (req) => {
	// const { pollId, optionId } = req.body
	const pollId = 20
	const optionId = 1
	const userId = (await req.locals.validateUser()).user?.userId

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

	return json({
		status: 200,
		body: { message: 'Vote submitted successfully' }
	})
}
