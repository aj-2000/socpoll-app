import { editProfileFormDataSchema } from '$lib/zodSchemas'
import { superValidate } from 'sveltekit-superforms/server'
import { fail, redirect, error } from '@sveltejs/kit'
import { prisma } from '$lib/server/prisma'
export const load = async (event) => {
	const { session, user } = await event.locals.validateUser()
	if (!session) {
		throw redirect(302, '/login')
	}
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
export const actions = {
	default: async ({ request, locals }) => {
		const data = await request.formData()

		const userId = (await locals.validateUser()).user?.userId
		if (!userId) return fail(400, { message: 'user not found' })
		console.log(data)
		const updatedUser = await prisma.user.update({
			where: { id: userId }, // Replace <USER_ID> with the actual ID of the user you want to update
			data: {
				username: data.get('username'), // Replace <NEW_USERNAME> with the new username value
				name: data.get('name'), // Replace <NEW_NAME> with the new name value
				bio: data.get('bio') // Replace <NEW_BIO> with the new bio value
			}
		})
		console.log(updatedUser)
		return {
			status: 204,
			updatedUser: updatedUser
		}
	}
}
