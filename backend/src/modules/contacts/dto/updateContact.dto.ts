import Joi from 'joi';

export const updateContactDto = Joi.object({
  email: Joi.string().email(),
  phone: Joi.string().min(6).max(20),
  fullName: Joi.string().min(3).max(60),
}).or('fullName', 'email', 'phone');
