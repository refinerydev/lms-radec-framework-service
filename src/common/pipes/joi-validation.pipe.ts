import {
  Injectable,
  PipeTransform,
  UnprocessableEntityException,
} from '@nestjs/common';
import Joi, { NumberSchema, ObjectSchema, StringSchema } from 'joi';
import { HttpResponse } from '../helper/http.helper';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema | StringSchema | NumberSchema) {}

  transform(values: Record<string, any>) {
    const { error, value } = this.schema.validate(values, {
      abortEarly: false,
      allowUnknown: true,
      stripUnknown: true,
      cache: true,
    });

    if (!error) return value;

    const errors = this.validateError(error.details);

    throw new UnprocessableEntityException(errors);
  }

  private validateError = (details: Joi.ValidationErrorItem[]) => {
    const errors: string[] = [];

    for (const item of details) {
      const message = item.message.replace(/['"]+/g, '');
      errors.push(message);
    }

    const response: HttpResponse = {
      meta: {
        status: 'fail',
        message: 'Validation failed',
      },
      errors,
    };

    return response;
  };
}
