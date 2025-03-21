import { z } from 'zod'

export const ProductCreateSchema = z.object({
    name: z.string(),
    description: z.string(),
    price: z.number(),
    tags: z.array(z.string())
})