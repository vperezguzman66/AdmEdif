import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import configuration from './config/configuration';
import { PrismaModule } from './modules/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { BuildingsModule } from './modules/buildings/buildings.module';
import { UnitsModule } from './modules/units/units.module';
import { PropertiesModule } from './modules/properties/properties.module';
import { LeadsModule } from './modules/leads/leads.module';

const envFilePath = [
  join(process.cwd(), '.env.cloud'),
  join(process.cwd(), '.env'),
  join(process.cwd(), '..', '.env.cloud'),
  join(process.cwd(), '..', '.env'),
];

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath,
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    BuildingsModule,
    UnitsModule,
    PropertiesModule,
    LeadsModule,
  ],
})
export class AppModule {}
