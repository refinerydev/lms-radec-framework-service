import {
  Controller,
  Post,
  Body,
  HttpStatus,
  Res,
  UsePipes,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, createUserSchema } from './dto/create-user.dto';
import {
  HttpResponse,
  getResponseMessage,
} from '../../common/helper/http.helper';
import { Response } from 'express';
import { JoiValidationPipe } from '../../common/pipes/joi-validation.pipe';
import { moduleOperation } from '../../common/constants/module-operations';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UsePipes(new JoiValidationPipe(createUserSchema))
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    const result = await this.usersService.create(createUserDto);

    let response: HttpResponse;

    if (!result.data) {
      response = {
        meta: {
          status: 'fail',
          message: result.message,
        },
        errors: result.errors,
      };

      return res.status(HttpStatus.CONFLICT).send(response);
    }

    response = {
      meta: {
        status: 'success',
        message: getResponseMessage(moduleOperation.createUser),
      },
      data: result.data,
    };

    return res.status(HttpStatus.CREATED).send(response);
  }
}
