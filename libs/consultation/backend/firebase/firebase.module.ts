import { Module, OnModuleInit } from '@nestjs/common';
import { FirebaseService } from './firebase.service';

@Module({
  providers: [FirebaseService],
  exports: [FirebaseService],
})
export class FirebaseModule implements OnModuleInit {
  constructor(private readonly firebaseService: FirebaseService) {}

  async onModuleInit() {
    // Initialize database when module starts
    await this.firebaseService.initializeDatabase();
  }
}
