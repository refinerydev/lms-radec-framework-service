import Joi from 'joi';

export const createUserSchema = Joi.object({
  fullname: Joi.string().min(2).max(100).required(),
  nisn: Joi.string().length(10).required(),
  username: Joi.string().regex(/^\S+$/).required(),
  password: Joi.string().min(8).required(),
});

export interface CreateUserDto {
  fullname: string;
  nisn: string;
  username: string;
  password: string;
}
