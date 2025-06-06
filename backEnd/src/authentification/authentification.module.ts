import { Module } from '@nestjs/common';
import { AuthentificationService } from './authentification.service';
import { AuthentificationController } from './authentification.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { AccessTokenGuard } from './guards/accessToken.guards';
import { AccessTokenStrategy } from './strategies/accessToken.strategies';
import { RefreshTokenStrategy } from './strategies/refreshToken.strategies';
import { UsersService } from 'src/users/users.service';
import { RolesGuard } from './guards/role.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [JwtModule.register({}),UsersModule],
  controllers: [AuthentificationController],
  providers: [AuthentificationService,AccessTokenStrategy,RefreshTokenStrategy,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],

})
export class AuthentificationModule {}
