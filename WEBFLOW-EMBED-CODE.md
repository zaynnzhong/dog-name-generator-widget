# 🚀 WORKING Webflow Embed Code

## ✅ Method 1: Standard Embed (Recommended)

```html
<!-- Unified Dog Name Widget for Webflow (Backend Mode) -->
<div
  class="dog-name-unified-widget"
  data-cta-url="/your-target-page"
  data-api-url="https://dog-name-generator-backend-d40b1jow7-onlydogfans-projects.vercel.app"
></div>

<script src="https://zaynnzhong.github.io/dog-name-generator-widget/dog-name-unified-widget.iife.js"></script>
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

## 🔧 Method 2: With Error Handling & Debugging

```html
<!-- Unified Dog Name Widget with Debug Mode -->
<div
  class="dog-name-unified-widget"
  data-api-url="https://dog-name-generator-backend-d40b1jow7-onlydogfans-projects.vercel.app"
  data-cta-url="/premium-names"
>
  <div style="padding: 20px; text-align: center; color: #666;">
    🐕 Loading Dog Name Generator...
  </div>
</div>

<script src="https://zaynnzhong.github.io/dog-name-generator-widget/dog-name-unified-widget.iife.js"></script>
<script>
  // Enhanced initialization with debugging
  function initializeWidget() {
    console.log("🚀 Initializing Dog Name Widget...");

    if (window.renderDogNameUnifiedWidget) {
      try {
        window.renderDogNameUnifiedWidget();
        console.log("✅ Widget loaded successfully!");
      } catch (error) {
        console.error("❌ Widget initialization failed:", error);
      }
    } else {
      console.error("❌ Widget function not available");
      // Retry after a short delay
      setTimeout(() => {
        if (window.renderDogNameUnifiedWidget) {
          window.renderDogNameUnifiedWidget();
        }
      }, 1000);
    }
  }

  // Try multiple initialization methods
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeWidget);
  } else {
    initializeWidget();
  }

  window.addEventListener("load", initializeWidget);
</script>
```

## 🎯 How to Embed in Webflow:

1. **Go to your Webflow page**
2. **Add an "HTML Embed" element** where you want the widget
3. **Paste ONE of the code blocks above**
4. **Customize the `data-cta-url`** to your target page:
   - `/premium-names` - Premium subscription page
   - `/dog-community` - Community/signup page
   - `/contact` - Contact form
   - `/membership` - Paid membership
5. **Publish your site**

## 🐛 Troubleshooting:

### If widget doesn't show:

1. **Check browser console** (F12 → Console tab)
2. **Look for error messages** starting with 🐕 or ❌
3. **Try Method 2** (with enhanced debugging)
4. **Clear browser cache** (Ctrl/Cmd + Shift + R)

### Common Issues:

- **API Key Invalid**: Make sure API key starts with `AIza`
- **JavaScript Blocked**: Check if Webflow has script restrictions
- **CDN Cache**: Try adding `?v=3` to the script URL
- **Console Errors**: Share any red error messages for help

## 📱 Widget Features:

- ✅ **Choice Screen**: Quick Generate vs Take Quiz
- ✅ **Quick Mode**: 3 fields → instant names (30 sec)
- ✅ **Quiz Mode**: 7 questions → personality + signature name
- ✅ **CTA Integration**: Links to YOUR Webflow pages
- ✅ **Mobile Responsive**: Works on all devices
- ✅ **API Powered**: Uses Google Gemini AI

## 🎉 Success Check:

When working correctly, you should see:

1. **Widget loads** with purple gradient background
2. **Two buttons**: "Quick Generate" and "Take Quiz"
3. **Console message**: "✅ Widget loaded successfully!"

---

**Need help?** Check the console for error messages and let me know what you see!
