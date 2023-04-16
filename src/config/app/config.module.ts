import { Module } from '@nestjs/common';
import configuration from '../app/configuration';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { schema } from '../app/config.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema: schema,
      expandVariables: true,
      cache: true,
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class AppConfigModule {}
