import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { PrismaModule } from './modules/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { BuildingsModule } from './modules/buildings/buildings.module';
import { UnitsModule } from './modules/units/units.module';
import { PropertiesModule } from './modules/properties/properties.module';
import { LeadsModule } from './modules/leads/leads.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: ['.env.cloud', '.env'],
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
