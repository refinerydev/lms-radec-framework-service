import Joi from 'joi';

export const createUserSchema = Joi.object({
  fullname: Joi.string().required(),
  nisn: Joi.string().required(),
  username: Joi.string().required(),
  password: Joi.string().min(8).required(),
});

export interface CreateUserDto {
  fullname: string;
  nisn: string;
  username: string;
  password: string;
}
