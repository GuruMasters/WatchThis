"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = void 0;
const functions = __importStar(require("firebase-functions"));
const core_1 = require("@nestjs/core");
const platform_express_1 = require("@nestjs/platform-express");
const common_1 = require("@nestjs/common");
const express_1 = __importDefault(require("express"));
const admin = __importStar(require("firebase-admin"));
const dotenv = __importStar(require("dotenv"));
const path = __importStar(require("path"));
const helmet_1 = __importDefault(require("helmet"));
const app_module_1 = require("./app/app.module");
// Load environment variables
dotenv.config();
// Initialize Firebase Admin SDK
if (!admin.apps.length) {
    try {
        const possiblePaths = [
            path.join(process.cwd(), 'watchthis-b1602-firebase-adminsdk-fbsvc-93cbf24913.json'),
            path.join(process.cwd(), '..', 'watchthis-b1602-firebase-adminsdk-fbsvc-93cbf24913.json'),
            path.join(__dirname, '..', '..', 'watchthis-b1602-firebase-adminsdk-fbsvc-93cbf24913.json'),
        ];
        let serviceAccountPath = null;
        const fs = require('fs');
        for (const p of possiblePaths) {
            if (fs.existsSync(p)) {
                serviceAccountPath = p;
                break;
            }
        }
        if (serviceAccountPath) {
            admin.initializeApp({
                credential: admin.credential.cert(serviceAccountPath),
                projectId: 'watchthis-b1602',
            });
            console.log('🔥 Firebase Admin SDK initialized successfully');
        }
        else {
            console.warn('⚠️  Firebase service account file not found. Running in mock mode.');
        }
    }
    catch (error) {
        console.error('❌ Failed to initialize Firebase Admin SDK:', error.message);
    }
}
const server = (0, express_1.default)();
exports.api = functions.https.onRequest(async (req, res) => {
    // Create NestJS app with Express adapter
    const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_express_1.ExpressAdapter(server));
    // Security headers
    app.use((0, helmet_1.default)({
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
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    // Enable CORS
    const allowedOrigins = [
        'http://localhost:3000',
        'http://localhost:4088',
        'http://localhost:5321',
        'https://watchthis-b1602.web.app',
        'https://watchthis-b1602.firebaseapp.com',
        process.env.FRONTEND_URL,
        process.env.FRONTEND_URL_PROD,
    ].filter((origin) => Boolean(origin));
    app.enableCors({
        origin: allowedOrigins,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        credentials: true,
        allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    });
    await app.init();
    server(req, res);
});
//# sourceMappingURL=index.js.map