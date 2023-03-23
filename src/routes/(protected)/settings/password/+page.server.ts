import { fail } from '@sveltejs/kit'
import { auth } from '$lib/server/lucia'
export const actions = {
	default: async ({ request, locals }) => {
		const data = await request.formData()
		const user = (await locals.validateUser()).user
		if (
			data.get('new-password') === '' ||
			data.get('new-password') !== data.get('confirm-password')
		) {
			return fail(401, { message: 'new and confirm password Does not match' })
		}
		if (!user) return fail(400, { message: 'user not found' })

		const password = data.get('password')
		const validatedUser = await auth.validateKeyPassword('username', user.username, password)
		const newPassword = data.get('new-password')
		if (validatedUser) {
			const updatedUser = await auth.updateKeyPassword('username', user.username, newPassword)
			await auth.invalidateAllUserSessions(user.userId)
			return {
				status: 204,
				message: 'Password updated successfully',
				updatedUser: updatedUser
			}
		} else {
			return fail(409, { message: 'Unauthorized' })
		}
	}
}
