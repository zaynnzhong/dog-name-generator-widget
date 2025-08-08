# Contributing to Dog Name Generator Widget

## 🚀 Development Workflow

This project uses an automated CI/CD pipeline with GitHub Actions for building, testing, and deploying the widget.

## 📋 Prerequisites

- Node.js 16+ and npm 8+
- Git
- GitHub account with repository access

## 🛠️ Local Development

### 1. Clone and Setup

```bash
git clone https://github.com/zaynnzhong/dog-name-generator-widget.git
cd dog-name-generator-widget
npm install
```

### 2. Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Build widget only
npm run build-widget

# Preview build
npm run preview

# Lint code
npm run lint
```

### 3. Environment Setup

Create a `.env` file for local development:

```bash
VITE_GEMINI_API_KEY=your-gemini-api-key-here
```

## 🔄 CI/CD Pipeline

The project uses GitHub Actions for automated workflows:

### **Triggers**

- **Push to main/master**: Builds, tests, and auto-deploys
- **Pull Requests**: Builds and tests only
- **Manual Releases**: Creates versioned releases

### **Pipeline Features**

1. **Automated Building**: Builds widget on every push
2. **Version Management**: Auto-generates version numbers
3. **CDN Cache Purging**: Automatically purges jsDelivr cache
4. **Quality Checks**: Validates widget file integrity
5. **GitHub Releases**: Creates releases with CDN URLs
6. **Artifact Storage**: Stores build artifacts

## 📦 Release Process

### Automatic Releases (Recommended)

Every push to `main` triggers an automatic release:

```bash
git add .
git commit -m "✨ Add new feature"
git push origin main
```

**What happens:**

1. 🔨 Builds the widget
2. 🧪 Runs tests
3. 📦 Creates versioned files
4. 🚀 Commits build artifacts
5. 🌐 Purges CDN cache
6. 🏷️ Creates GitHub release
7. 📝 Updates documentation

### Manual Versioning

For explicit version control:

```bash
# Patch version (1.0.0 → 1.0.1)
npm run version:patch

# Minor version (1.0.0 → 1.1.0)
npm run version:minor

# Major version (1.0.0 → 2.0.0)
npm run version:major

# Then push
git push origin main --tags
```

## 🌐 CDN URLs

The pipeline automatically generates multiple CDN URLs:

### Latest (Always Current)

```
https://cdn.jsdelivr.net/gh/zaynnzhong/dog-name-generator-widget/dog-name-generator-widget.iife.js
```

### Versioned (Immutable)

```
https://cdn.jsdelivr.net/gh/zaynnzhong/dog-name-generator-widget@v20240108-a1b2c3d4/dog-name-generator-widget.iife.js
```

## 🧪 Testing

The pipeline includes automated tests:

- ✅ **File Existence**: Verifies widget file is generated
- ✅ **File Size**: Ensures reasonable file size
- ✅ **Component Check**: Validates React component presence
- ✅ **Style Check**: Confirms inline styles are included

### Local Testing

```bash
npm test
```

## 🏗️ Build Artifacts

Each build generates:

- `dog-name-generator-widget.iife.js` - Main widget file
- `dog-name-generator-widget-vYYYYMMDD-hash.iife.js` - Versioned file
- `dist/` folder with development builds

## 🚨 Troubleshooting

### Pipeline Fails

1. Check GitHub Actions tab for error logs
2. Verify Node.js/npm versions in workflow
3. Ensure all dependencies are in package.json

### CDN Not Updating

1. Check if cache purge step succeeded
2. Try manual purge: `https://purge.jsdelivr.net/gh/zaynnzhong/dog-name-generator-widget/dog-name-generator-widget.iife.js`
3. Wait 2-5 minutes for global propagation

### Widget Not Loading

1. Verify file exists on CDN
2. Check browser console for errors
3. Validate API key configuration

## 📋 Code Standards

- **TypeScript**: Strict type checking enabled
- **ESLint**: Code linting with React hooks rules
- **Formatting**: Consistent code formatting
- **Commit Messages**: Use conventional commits

### Commit Message Format

```
✨ feat: add new feature
🐛 fix: bug fix
📝 docs: documentation update
🚀 deploy: deployment related
🧪 test: testing related
♻️ refactor: code refactoring
```

## 🤝 Pull Request Process

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Make changes and commit: `git commit -m "✨ Add amazing feature"`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

**PR triggers:**

- ✅ Automated build and test
- ✅ Code quality checks
- ❌ No deployment (main branch only)

## 🔐 Secrets and Environment Variables

No secrets required for the build pipeline. The widget loads API keys from:

1. `data-api-key` attribute (production)
2. `VITE_GEMINI_API_KEY` environment variable (development)

## 📞 Support

- 🐛 **Issues**: GitHub Issues tab
- 💬 **Discussions**: GitHub Discussions
- 📧 **Email**: Repository owner

---

**Happy coding! 🐕✨**
