import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { FirebaseModule } from './firebase/firebase.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    FirebaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}