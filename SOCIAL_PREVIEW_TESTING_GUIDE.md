# Social Preview Testing Guide

## 🚨 CRITICAL: Case Sensitivity Issue Fixed

The main issue was **case sensitivity** in the image file names:
- ❌ **Wrong**: `Logo-single.png` (capital L)
- ✅ **Correct**: `logo-single.png` (lowercase l)

## 🔧 What Was Fixed

1. **Fixed all image references** to use correct case-sensitive filenames
2. **Added missing meta tags** for better social media compatibility
3. **Updated all preview HTML files** with correct image paths

## 📱 Immediate Testing Steps

### Step 1: Test Image Accessibility
First, verify these URLs work in your browser:

```
https://momentshub.org/assets/logo-single.png
https://momentshub.org/favicon.ico
```

### Step 2: Test Social Media Debuggers

**Facebook Sharing Debugger:**
1. Go to: https://developers.facebook.com/tools/debug/
2. Enter: `https://momentshub.org`
3. Click "Debug"
4. Click "Scrape Again"
5. Check if image appears in preview

**Twitter Card Validator:**
1. Go to: https://cards-dev.twitter.com/validator
2. Enter: `https://momentshub.org`
3. Click "Preview card"
4. Check if image appears in preview

**LinkedIn Post Inspector:**
1. Go to: https://www.linkedin.com/post-inspector/
2. Enter: `https://momentshub.org`
3. Click "Inspect"

### Step 3: Test Preview URLs

**Wishlist Preview:**
```
https://momentshub.org/wishlist-preview.html?id=753&username=phil2&title=Birthday%20Wishlist&description=Check%20out%20my%20birthday%20wishlist!
```

**Wish Preview:**
```
https://momentshub.org/wish-preview.html?id=123&name=iPhone%2015&description=Latest%20iPhone%20model&wishlistId=753&username=phil2
```

### Step 4: Mobile Testing

**Test on Mobile Devices:**
1. **iOS Safari**: Share link in Messages, WhatsApp, or Facebook
2. **Android Chrome**: Share link in WhatsApp, Facebook, or Twitter
3. **Mobile Apps**: Test in social media apps

## 🔍 What to Look For

### ✅ Success Indicators
- **Desktop**: Social preview shows logo image (not favicon)
- **Mobile**: Social preview shows logo image with title and description
- **Social Apps**: Rich preview with image, title, and description
- **Debuggers**: Show correct image in preview

### ❌ Failure Indicators
- **Still showing favicon**: Cache issue or wrong image path
- **No image at all**: Image file not accessible
- **Generic preview**: Meta tags not being read

## 🛠️ Troubleshooting

### If Still Not Working:

1. **Clear Browser Cache**
   - Press `Ctrl+Shift+Delete` (Windows) or `Cmd+Shift+Delete` (Mac)
   - Clear all cached images and files

2. **Test in Incognito/Private Mode**
   - Open browser in private/incognito mode
   - Test the URLs there

3. **Check File Accessibility**
   - Try accessing `https://momentshub.org/assets/logo-single.png` directly
   - Should show the logo image

4. **Force Re-scraping**
   - Use social media debuggers to force re-scraping
   - Wait 24-72 hours for cache updates

### Common Issues:

**Issue**: "Image not found" error
**Solution**: Check if `logo-single.png` exists in `/public/assets/` folder

**Issue**: Still showing old preview
**Solution**: Use debugger tools to force re-scraping

**Issue**: Mobile not showing preview
**Solution**: Test in different mobile apps and browsers

## 📋 Testing Checklist

- [ ] `https://momentshub.org/assets/logo-single.png` loads correctly
- [ ] Facebook debugger shows logo image
- [ ] Twitter validator shows logo image
- [ ] LinkedIn inspector shows logo image
- [ ] Mobile WhatsApp shows preview with image
- [ ] Mobile Facebook shows preview with image
- [ ] Mobile Twitter shows preview with image
- [ ] Desktop browsers show logo in social previews

## 🚀 Next Steps

1. **Test immediately** with the URLs above
2. **Use debugger tools** to force re-scraping
3. **Test on mobile devices** in different apps
4. **Wait 24-72 hours** for cache propagation
5. **Report results** - what works and what doesn't

## 📞 If Still Not Working

If you're still experiencing issues after following this guide:

1. **Check browser console** for any errors
2. **Verify file permissions** on the server
3. **Test with different image formats** (JPG, PNG, SVG)
4. **Contact hosting provider** about image serving
5. **Consider using a CDN** for better image delivery

---

**Last Updated**: January 2025
**Status**: Case sensitivity issue fixed, ready for testing
**Priority**: High - Social preview functionality
