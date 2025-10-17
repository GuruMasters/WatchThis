# GitHub Actions CI/CD - Configuration Notes

## Secrets Required

If you want to enable Docker Hub push, add these secrets to your GitHub repository:

**Settings → Secrets and variables → Actions → New repository secret**

1. `DOCKER_USERNAME` - Your Docker Hub username
2. `DOCKER_PASSWORD` - Your Docker Hub password or access token

## Current Configuration

- **Docker Hub push**: Disabled (commented out)
- **Artifact uploads**: Enabled (retains builds for 7 days)
- **Lighthouse CI**: Configured but requires setup
- **Security scan**: Enabled (Trivy)

## To Enable Docker Hub Push

1. Add secrets to GitHub repository
2. Uncomment the Docker login section in `ci.yml`
3. Update image tags in build steps

## Optional Secrets

- `SENTRY_DSN` - For error tracking (add to frontend/backend .env in production)
- `VITE_SENTRY_DSN` - Frontend Sentry (add to Vercel/deployment platform)

## CI/CD Pipeline Triggers

- Push to `main` or `develop` branches
- Pull requests to `main` or `develop`
- Manual workflow dispatch

## Pipeline Steps

1. **Lint & Test** - ESLint + Unit tests
2. **Build** - Production builds
3. **Docker** - Container images (main branch only)
4. **Performance** - Lighthouse testing
5. **Security** - Dependency audit + Trivy scan

