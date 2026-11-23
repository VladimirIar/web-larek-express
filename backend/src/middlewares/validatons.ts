import { celebrate, Joi, Segments } from 'celebrate';

export const validateProduct = celebrate({
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(2).max(30).required(),
    image: Joi.object({
      fileName: Joi.string().required(),
      originalName: Joi.string().default('productImage'),
    }),
    category: Joi.string().required(),
    description: Joi.string().optional(),
    price: Joi.number().positive().allow(null).default(null),

  }),
});

export const validateOrder = celebrate({
  [Segments.BODY]: Joi.object({
    payment: Joi.string().valid('card', 'online').required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    address: Joi.string().required(),
    total: Joi.number().required(),
    items: Joi.array()
      .items(Joi.string().hex().length(24).required())
      .min(1).required(),
  }),
});
