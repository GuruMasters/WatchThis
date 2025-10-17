import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as admin from 'firebase-admin';
import * as path from 'path';
import helmet from 'helmet';

// Load environment variables from .env file
dotenv.config();

// Initialize Firebase Admin SDK (optional - graceful degradation)
if (!admin.apps.length) {
  try {
    // Check multiple possible locations for Firebase service account file
    const possiblePaths = [
      path.join(process.cwd(), 'watchthis-b1602-firebase-adminsdk-fbsvc-93cbf24913.json'),
      path.join(process.cwd(), '..', 'watchthis-b1602-firebase-adminsdk-fbsvc-93cbf24913.json'),
      path.join(__dirname, '..', '..', 'watchthis-b1602-firebase-adminsdk-fbsvc-93cbf24913.json'),
    ];

    let serviceAccountPath: string | null = null;
    const fs = require('fs');
    
    for (const path of possiblePaths) {
      if (fs.existsSync(path)) {
        serviceAccountPath = path;
        break;
      }
    }

    if (serviceAccountPath) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccountPath),
        projectId: 'watchthis-b1602',
      });
      console.log('🔥 Firebase Admin SDK initialized successfully');
    } else {
      console.warn('⚠️  Firebase service account file not found. Running in mock mode.');
      console.warn('   Backend will work but data will not be persisted to Firestore.');
      console.warn('   To enable Firebase, add the service account JSON file to the project root.');
    }
  } catch (error) {
    console.error('❌ Failed to initialize Firebase Admin SDK:', error.message);
    console.warn('⚠️  Backend will run in mock mode without Firebase functionality.');
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Security headers with Helmet
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", 'data:', 'https:'],
      },
    },
    crossOriginEmbedderPolicy: false,
  }));

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );
  
  // Enable CORS with environment-based origins
  const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:4088', 
    'http://localhost:5321',
    process.env.FRONTEND_URL,
    process.env.FRONTEND_URL_PROD,
  ].filter(Boolean);

  app.enableCors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  });

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('WatchThis API')
    .setDescription('Backend API for WatchThis booking system')
    .setVersion('1.0')
    .addTag('consultation')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 3088;
  await app.listen(port);
  
  console.log(`\n🚀 WatchThis Backend (NestJS) running on port ${port}`);
  console.log(`📡 Health check: http://localhost:${port}`);
  console.log(`🔗 API Documentation: http://localhost:${port}/api`);
  console.log(`🔒 Security: Helmet enabled, CORS configured, Rate limiting active`);
  console.log(`🌍 Allowed origins: ${allowedOrigins.join(', ')}\n`);
}

bootstrap();
