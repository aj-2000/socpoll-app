// Import the Prisma Client
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function createPolls() {
	for (let i = 0; i < 30; i++) {
		// Set the end date to 7 days after the current date
		const endDate = new Date()
		endDate.setDate(endDate.getDate() + 7)

		const poll = await prisma.poll.create({
			data: {
				title: `Poll ${i + 1}`,
				author: {
					connect: { username: '__aj2000__' } // replace with your username
				},
				options: {
					create: [
						{ optionText: `Option 1 for Poll ${i + 1}` },
						{ optionText: `Option 2 for Poll ${i + 1}` },
						{ optionText: `Option 3 for Poll ${i + 1}` }
					]
				},
				endDate // Set the end date for the poll
			}
		})

		console.log(`Created poll ${poll.id}`)
	}
}

createPolls()
	.catch((e) => console.error(e))
	.finally(async () => {
		await prisma.$disconnect()
	})
