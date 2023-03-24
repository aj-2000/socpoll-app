import { editProfileFormDataSchema } from '$lib/zodSchemas'
import { superValidate } from 'sveltekit-superforms/server'
import { fail, redirect, error } from '@sveltejs/kit'
import { prisma } from '$lib/server/prisma'
import { auth } from '$lib/server/lucia'
export const load = async (event) => {
	const { user } = await event.locals.validateUser()

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
	update: async ({ request, locals }) => {
		const data = await request.formData()

		const user = (await locals.validateUser()).user
		if (!user) return fail(400, { message: 'user not found' })
		console.log(data)
		const updatedUser = await prisma.user.update({
			where: { id: user.userId }, // Replace <USER_ID> with the actual ID of the user you want to update
			data: {
				// username: data.get('username'), // Replace <NEW_USERNAME> with the new username value
				name: data.get('name'), // Replace <NEW_NAME> with the new name value
				bio: data.get('bio') // Replace <NEW_BIO> with the new bio value
			}
		})

		return {
			status: 204,
			updatedUser: updatedUser
		}
	},
	upload: async ({ request, locals }) => {
		const form = await request.formData()
		console.log(form)
	}
}
