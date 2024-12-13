import Joi from 'joi';

export const createTaskDto = Joi.object({
  title: Joi.string().min(3).max(60).required(),
  description: Joi.string().min(6).max(100),
});
