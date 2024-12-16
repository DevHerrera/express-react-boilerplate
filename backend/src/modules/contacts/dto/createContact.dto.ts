import Joi from 'joi';

export const createContactDto = Joi.object({
  email: Joi.string().email(),
  phone: Joi.string().min(6).max(20).required(),
  fullName: Joi.string().min(3).max(60).required(),
});
