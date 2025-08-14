# Deployment Guide for AI Persona Chat App

## Overview
This guide covers deploying the AI Persona Chat App to various platforms.

## Prerequisites
- Node.js 18.17 or later
- API keys for OpenAI and/or Google Gemini
- Git repository (for platform deployments)

## Environment Variables
Before deployment, ensure you have the following environment variables set:

```bash
# Required: At least one of these API keys
OPENAI_API_KEY=your_openai_api_key_here
GEMINI_API_KEY=your_google_gemini_api_key_here

# Optional
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

## Platform-Specific Deployment

### 1. Vercel (Recommended)
Vercel is the easiest platform for Next.js deployments.

**Steps:**
1. Push your code to GitHub/GitLab/Bitbucket
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

**Vercel Configuration:**
- Framework: Next.js
- Build Command: `npm run build`
- Output Directory: `.next`
- Install Command: `npm install`

### 2. Netlify
**Steps:**
1. Connect your repository to Netlify
2. Set build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
3. Add environment variables in Netlify dashboard
4. Deploy

### 3. AWS Amplify
**Steps:**
1. Connect your repository to AWS Amplify
2. Configure build settings:
   - Build command: `npm run build`
   - Base directory: (leave empty)
   - Build output directory: `.next`
3. Add environment variables
4. Deploy

### 4. Digital Ocean App Platform
**Steps:**
1. Create new app from GitHub repository
2. Configure component:
   - Type: Web Service
   - Build command: `npm run build`
   - Run command: `npm start`
3. Add environment variables
4. Deploy

### 5. Railway
**Steps:**
1. Connect your GitHub repository
2. Railway will auto-detect Next.js
3. Add environment variables
4. Deploy

### 6. Docker Deployment
Create a `Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t ai-persona-chat .
docker run -p 3000:3000 ai-persona-chat
```

## Post-Deployment Checklist

1. **Test all features:**
   - Home page loads correctly
   - Chat interface is responsive
   - Both personas work
   - API endpoints respond correctly

2. **Performance optimization:**
   - Enable gzip compression
   - Configure CDN if needed
   - Monitor performance metrics

3. **Security:**
   - Ensure API keys are properly secured
   - Check HTTPS is enabled
   - Verify security headers

4. **Monitoring:**
   - Set up error monitoring (Sentry)
   - Configure analytics if needed
   - Monitor API usage

## Common Issues and Solutions

### Build Errors
- **SWC Error**: This is a warning and doesn't affect functionality
- **Multiple lockfiles**: Remove extra package-lock.json files
- **Missing dependencies**: Run `npm install` before building

### Runtime Errors
- **API Key Issues**: Verify environment variables are set correctly
- **CORS Errors**: Ensure proper domain configuration
- **Memory Issues**: Consider upgrading to higher-tier hosting plan

### Performance Issues
- **Slow loading**: Enable compression and optimize images
- **Large bundle**: Review dependencies and use dynamic imports
- **Memory leaks**: Monitor memory usage in production

## Environment-Specific Notes

### Development
```bash
npm run dev
```

### Production
```bash
npm run build
npm start
```

### Testing Build Locally
```bash
npm run build
npm start
```

## Support
For deployment issues, check:
1. Platform-specific documentation
2. Next.js deployment guides
3. GitHub Issues for common problems

## Security Considerations
- Never commit API keys to version control
- Use environment variables for all secrets
- Enable security headers via next.config.mjs
- Consider rate limiting for API endpoints
- Monitor for unusual API usage patterns
