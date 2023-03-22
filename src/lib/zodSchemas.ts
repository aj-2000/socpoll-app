import z from 'zod'

export const editProfileFormDataSchema = z.object({
	name: z.string().min(1),
	username: z.string().min(1),
	bio: z.string().max(150)
})
