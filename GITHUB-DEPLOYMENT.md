# 🚀 GitHub-Based Deployment Guide

## Quick Deployment Options

### Option 1: Vercel (One-Click Deploy)

1. **Go to Vercel:** https://vercel.com
2. **Import from GitHub:** Click "New Project" → Import your repository
3. **Configure:**
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Output Directory: Leave empty
4. **Add Environment Variable:**
   - Key: `GEMINI_API_KEY`
   - Value: `AIzaSyB-T35VfSzeKXHIVaEh5OINtGB_8PlqTtk`
5. **Deploy!** - You'll get a URL like `https://your-project.vercel.app`

### Option 2: Railway (GitHub Integration)

1. **Go to Railway:** https://railway.app
2. **Deploy from GitHub:** Connect your repository
3. **Select backend folder** as the source
4. **Add Environment Variable:**
   - `GEMINI_API_KEY=AIzaSyB-T35VfSzeKXHIVaEh5OINtGB_8PlqTtk`
5. **Deploy!** - You'll get a URL like `https://your-project.up.railway.app`

### Option 3: Render (Free Tier)

1. **Go to Render:** https://render.com
2. **New Web Service** → Connect GitHub
3. **Settings:**
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
4. **Environment Variable:**
   - `GEMINI_API_KEY=AIzaSyB-T35VfSzeKXHIVaEh5OINtGB_8PlqTtk`

## After Backend Deployment

Once deployed, you'll get a backend URL. Update your widget embed code:

```html
<!-- Dog Name Generator Widget -->
<div
  class="dog-name-unified-widget"
  data-cta-url="/your-page"
  data-api-url="https://YOUR-BACKEND-URL.com"
></div>

<script src="https://onlydogfanspage.github.io/dog-name-generator-/dog-name-unified-widget.iife.js"></script>
<script>
  window.addEventListener("load", function () {
    if (window.renderDogNameUnifiedWidget) {
      window.renderDogNameUnifiedWidget();
    }
  });
</script>
```

## ✅ Recommended: Vercel

**Why Vercel:**
- ✅ Free tier with good limits
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Easy GitHub integration
- ✅ Environment variable support
- ✅ Instant deployments

**Steps:**
1. Push your code to GitHub ✅ (Already done)
2. Go to vercel.com and import your repository
3. Set backend folder as root directory
4. Add GEMINI_API_KEY environment variable
5. Deploy and get your URL
6. Update widget embed code with your new URL

## Testing Your Deployment

After deployment, test these endpoints:

```bash
# Health check
curl https://YOUR-BACKEND-URL.com/health

# Name generation test
curl -X POST https://YOUR-BACKEND-URL.com/api/generate-names \
     -H "Content-Type: application/json" \
     -d '{"prompt":"Generate 5 dog names for a golden retriever"}'
```

## 🔧 Troubleshooting

**Common Issues:**
- **500 Error:** Check if GEMINI_API_KEY is set correctly
- **CORS Error:** Make sure your frontend domain is allowed
- **404 Error:** Verify the backend folder is set as root directory

**Logs:**
- Vercel: Check function logs in dashboard
- Railway: View logs in project dashboard
- Render: Check deploy and service logs