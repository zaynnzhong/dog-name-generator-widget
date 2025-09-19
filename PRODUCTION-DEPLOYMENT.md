# 🚀 Production Deployment Guide

## Overview

This guide helps you deploy the Dog Name Generator Widget with backend API integration for production use.

## 📦 What You Need to Deploy

### 1. Frontend (GitHub Pages) ✅ Already Set Up

- **Repository:** https://github.com/onlydogfanspage/dog-name-generator-
- **URL:** https://onlydogfanspage.github.io/dog-name-generator-/
- **Widget File:** `dog-name-unified-widget.iife.js`

### 2. Backend API (Needs Deployment)

- **Files:** `/backend/` folder
- **Purpose:** Handles Gemini API calls securely
- **Recommended Services:** Vercel, Railway, Heroku, or Netlify Functions

## 🌐 Backend Deployment Options

### Option 1: Vercel (Recommended - Free Tier Available)

1. **Install Vercel CLI:**

   ```bash
   npm i -g vercel
   ```

2. **Deploy backend:**

   ```bash
   cd backend
   vercel
   ```

3. **Set environment variable:**

   ```bash
   vercel env add GEMINI_API_KEY
   # Enter your API key: AIzaSyB-T35VfSzeKXHIVaEh5OINtGB_8PlqTtk
   ```

4. **Redeploy with environment:**
   ```bash
   vercel --prod
   ```

### Option 2: Railway (Easy Docker Deployment)

1. **Connect to Railway:** https://railway.app
2. **Deploy from GitHub:** Connect your backend folder
3. **Set environment variable:** `GEMINI_API_KEY=AIzaSyB-T35VfSzeKXHIVaEh5OINtGB_8PlqTtk`

### Option 3: Heroku

1. **Create Heroku app:**

   ```bash
   heroku create your-dog-names-api
   ```

2. **Set environment variable:**

   ```bash
   heroku config:set GEMINI_API_KEY=AIzaSyB-T35VfSzeKXHIVaEh5OINtGB_8PlqTtk
   ```

3. **Deploy:**
   ```bash
   git subtree push --prefix backend heroku main
   ```

## 📝 Final Embed Code

Once your backend is deployed, use this embed code on your website:

```html
<!-- Dog Name Generator Widget -->
<div
  class="dog-name-unified-widget"
  data-cta-url="/premium-names"
  data-api-url="https://YOUR-BACKEND-URL.com"
></div>

<script src="https://onlydogfanspage.github.io/dog-name-generator-/dog-name-unified-widget.iife.js"></script>
<script>
  window.addEventListener("load", function () {
    console.log("🐕 Loading Dog Name Widget...");
    if (window.renderDogNameUnifiedWidget) {
      window.renderDogNameUnifiedWidget();
      console.log("✅ Widget initialized successfully!");
    } else {
      console.error("❌ Widget function not found");
    }
  });
</script>
```

**Replace:**

- `YOUR-BACKEND-URL.com` with your deployed backend URL: `https://dog-name-generator-backend-pg3e01x4m-onlydogfans-projects.vercel.app`
- `/premium-names` with your target page URL

## 🔧 Configuration Options

### Widget Attributes:

- `data-cta-url`: Where users go after generating names
- `data-api-url`: Your backend API endpoint

### Backend Environment Variables:

- `GEMINI_API_KEY`: Your Google Gemini API key
- `PORT`: Server port (auto-detected on most platforms)

## ✅ Deployment Checklist

- [ ] Backend deployed and running
- [ ] Environment variable `GEMINI_API_KEY` set
- [ ] Backend health check working: `https://YOUR-BACKEND-URL.com/health`
- [ ] CORS configured for your domain
- [ ] Widget embed code updated with your backend URL
- [ ] Widget tested on your live site

## 🧪 Testing Your Deployment

1. **Test backend health:**

   ```bash
   curl https://YOUR-BACKEND-URL.com/health
   ```

2. **Test name generation:**

   ```bash
   curl -X POST https://YOUR-BACKEND-URL.com/api/generate-names \
        -H "Content-Type: application/json" \
        -d '{"prompt":"Generate 5 dog names for a golden retriever"}'
   ```

3. **Test widget on your site:**
   - Widget loads without API key prompt
   - Both Quick Generate and Quiz modes work
   - Names generate successfully
   - CTA button redirects to correct page

## 🔒 Security Notes

- ✅ API key is stored securely on backend
- ✅ Frontend never exposes API key
- ✅ CORS configured for specific domains
- ✅ Rate limiting can be added if needed

## 📞 Support

If you need help with deployment, check the backend logs or test the API endpoints directly.

Example successful deployment URLs:

- Backend: `https://dog-names-api.vercel.app`
- Frontend: `https://onlydogfanspage.github.io/dog-name-generator-/`
