# Social Preview Implementation

This document describes the dynamic social preview functionality implemented for Moments Hub.

## Overview

The social preview system automatically updates Open Graph and Twitter Card meta tags when users share wishes or wishlists, providing rich previews similar to the examples shown in the reference image.

## Features

### Dynamic Meta Tags
- **Title**: Uses wishlist title or wish name
- **Description**: Uses wishlist description or wish description
- **Image**: Uses wishlist photo, wish photo, or category image
- **URL**: Dynamic URL for the specific wishlist or wish

### Supported Platforms
- Facebook (Open Graph)
- Twitter (Twitter Cards)
- WhatsApp
- Email clients
- Any platform that supports Open Graph meta tags

## Implementation Details

### Files Modified

1. **`src/utils/socialPreview.js`** - Core utility for managing meta tags
2. **`src/pages/Dashboard/Wishlist.vue`** - Wishlist page integration
3. **`src/components/Dashboard/WishCard.vue`** - Individual wish sharing
4. **`src/components/Dashboard/WishlistDetails.vue`** - Wishlist details sharing
5. **`src/router/index.js`** - Added individual wish route
6. **`index.html`** - Updated default meta tags

### How It Works

1. **Wishlist Sharing**: When a user opens the share menu for a wishlist, the system updates meta tags with:
   - Wishlist title and description
   - Wishlist photo or first wish photo
   - Dynamic URL for the wishlist

2. **Individual Wish Sharing**: When a user opens the share menu for a wish, the system updates meta tags with:
   - Wish name and description
   - Wish photo or category image
   - URL that redirects to the wishlist with the wish highlighted

3. **Route Handling**: Individual wish URLs (`/wish/:id`) automatically redirect to the appropriate wishlist with the wish highlighted.

### Image Priority

The system uses the following priority for images:

1. **Wishlist**: Wishlist photo → First wish photo → Category image → Logo
2. **Wish**: Wish photo → Category image → Logo

### URL Structure

- **Wishlist**: `https://momentshub.org/wishlist/{id}/{username}`
- **Individual Wish**: `https://momentshub.org/wish/{id}` (redirects to wishlist)

## Usage

### For Developers

```javascript
import { socialPreviewManager } from '@/utils/socialPreview.js';

// Update wishlist preview
socialPreviewManager.updateWishlistPreview(wishlistData);

// Update wish preview
socialPreviewManager.updateWishPreview(wishData);

// Reset to default
socialPreviewManager.resetToDefault();
```

### For Users

1. **Share Wishlist**: Click share button on any wishlist
2. **Share Individual Wish**: Click share button on any wish card
3. **Copy Link**: Use the copy link feature to get shareable URLs

## Testing

### Facebook Debugger
Use [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) to test Open Graph tags.

### Twitter Card Validator
Use [Twitter Card Validator](https://cards-dev.twitter.com/validator) to test Twitter Cards.

### WhatsApp Preview
Share links directly in WhatsApp to see the preview.

## Browser Support

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support
- Mobile browsers: Full support

## Notes

- Meta tags are updated dynamically using JavaScript
- Fallback images ensure previews always have an image
- URLs are automatically converted to absolute URLs
- The system gracefully handles missing data with sensible defaults
