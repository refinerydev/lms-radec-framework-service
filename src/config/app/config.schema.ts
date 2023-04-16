import Joi from 'joi';

export const schema = Joi.object({
  APP_ENV: Joi.string().valid('development', 'test', 'production').required(),
  APP_NAME: Joi.string().required(),
  APP_VERSION: Joi.string().required(),
  APP_PORT: Joi.number().required(),
  DATABASE_URL: Joi.string().required(),
});
