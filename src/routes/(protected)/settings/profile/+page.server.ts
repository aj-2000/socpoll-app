import { editProfileFormDataSchema } from '$lib/zodSchemas'
import { superValidate } from 'sveltekit-superforms/server'
import { fail, redirect, error } from '@sveltejs/kit'
import { prisma } from '$lib/server/prisma'
export const load = async (event) => {
	const { session, user } = await event.locals.validateUser()
	if (!session) {
		throw redirect(302, '/login')
	}
	const form = await superValidate(event, editProfileFormDataSchema)
	return {
		form
	}
}
export const actions = {
	updateProfile: async (event) => {
		console.log('run')
		const formObj = await superValidate(event, editProfileFormDataSchema)
		console.log(formObj)
		if (!formObj.valid) {
			return fail(400, {
				formObj
			})
		}
		const form = formObj.data
		const userId = (await event.locals.validateUser()).user?.userId
		if (userId) return fail(400, { message: 'user not found' })
		const updatedUser = await prisma.user.update({
			where: { id: userId }, // Replace <USER_ID> with the actual ID of the user you want to update
			data: {
				username: form.username, // Replace <NEW_USERNAME> with the new username value
				name: form.name, // Replace <NEW_NAME> with the new name value
				bio: form.bio // Replace <NEW_BIO> with the new bio value
			}
		})

		return {
			form: formObj
		}
	}
}
