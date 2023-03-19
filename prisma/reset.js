import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function deleteAllRecords() {
	try {
		// Delete all records of each model
		await prisma.session.deleteMany()
		await prisma.key.deleteMany()
		await prisma.extendedProfile.deleteMany()
		await prisma.avatar.deleteMany()
		await prisma.pollResponses.deleteMany()
		await prisma.option.deleteMany()
		await prisma.poll.deleteMany()
		await prisma.user.deleteMany()
	} catch (error) {
		console.error(error)
	} finally {
		await prisma.$disconnect()
	}
}

deleteAllRecords()
