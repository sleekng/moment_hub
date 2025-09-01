// Utility for managing dynamic social preview meta tags
export class SocialPreviewManager {
  constructor() {
    this.baseURL = import.meta.env.VITE_WEBSITE_URL || 'https://momentshub.org';
  }

  // Update meta tags for wishlist sharing
  updateWishlistPreview(wishlist) {
    if (!wishlist) return;

    const title = wishlist.title || 'Wishlist';
    const description = wishlist.description || `Check out this amazing wishlist by ${wishlist.user?.username || 'someone'}`;
    const image = wishlist.photo || this.getWishlistImage(wishlist);
    const url = `${this.baseURL}/wishlist/${wishlist.id}/${wishlist.user?.username}`;

    console.log('Updating wishlist social preview:', { title, description, image, url });

    this.updateMetaTags({
      title,
      description,
      image,
      url,
      type: 'website'
    });
  }

  // Update meta tags for individual wish sharing
  updateWishPreview(wish) {
    if (!wish) return;

    const title = wish.name || 'Wish';
    const description = wish.description || `Check out this wish: ${wish.name}`;
    const image = wish.photo || this.getWishImage(wish);
    const url = `${this.baseURL}/wishlist/${wish.wishlist_id}/${wish.wishlist?.user?.username}`;

    console.log('Updating wish social preview:', { title, description, image, url });

    this.updateMetaTags({
      title,
      description,
      image,
      url,
      type: 'website'
    });
  }

  // Get appropriate image for wishlist
  getWishlistImage(wishlist) {
    // If wishlist has a photo, use it
    if (wishlist.photo) {
      return this.getFullImageUrl(wishlist.photo);
    }

    // If wishlist has wishes with photos, use the first one
    if (wishlist.wishes && wishlist.wishes.length > 0) {
      const wishWithPhoto = wishlist.wishes.find(wish => wish.photo);
      if (wishWithPhoto) {
        return this.getFullImageUrl(wishWithPhoto.photo);
      }
    }

    // Default to category image or logo
    if (wishlist.category?.slug) {
      return `${this.baseURL}/assets/${wishlist.category.slug}.svg`;
    }

    // Fallback to logo
    return `${this.baseURL}/assets/sharable-log.png`;
  }

  // Get appropriate image for wish
  getWishImage(wish) {
    // If wish has a photo, use it
    if (wish.photo) {
      return this.getFullImageUrl(wish.photo);
    }

    // If wish has a category, use category image
    if (wish.category?.slug) {
      return `${this.baseURL}/assets/${wish.category.slug}.svg`;
    }

    // Fallback to logo
    return `${this.baseURL}/assets/sharable-log.png`;
  }

  // Convert relative image URL to absolute URL
  getFullImageUrl(imageUrl) {
    if (!imageUrl) return `${this.baseURL}/assets/sharable-log.png`;
    
    // If already absolute URL, return as is
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
      return imageUrl;
    }

    // If starts with /, it's relative to domain
    if (imageUrl.startsWith('/')) {
      return `${this.baseURL}${imageUrl}`;
    }

    // Otherwise, assume it's relative to assets
    return `${this.baseURL}/assets/${imageUrl}`;
  }

  // Update all meta tags
  updateMetaTags({ title, description, image, url, type = 'website' }) {
    // Update basic meta tags
    this.updateMetaTag('title', title);
    this.updateMetaTag('description', description);

    // Update Open Graph tags
    this.updateMetaTag('og:title', title);
    this.updateMetaTag('og:description', description);
    this.updateMetaTag('og:image', image);
    this.updateMetaTag('og:url', url);
    this.updateMetaTag('og:type', type);

    // Update Twitter Card tags
    this.updateMetaTag('twitter:title', title);
    this.updateMetaTag('twitter:description', description);
    this.updateMetaTag('twitter:image', image);
    this.updateMetaTag('twitter:card', 'summary_large_image');

    // Update canonical URL
    this.updateCanonicalUrl(url);
  }

  // Update individual meta tag
  updateMetaTag(name, content) {
    let meta = document.querySelector(`meta[name="${name}"]`);
    if (!meta) {
      meta = document.querySelector(`meta[property="${name}"]`);
    }
    
    if (!meta) {
      meta = document.createElement('meta');
      if (name.startsWith('og:') || name.startsWith('twitter:')) {
        meta.setAttribute('property', name);
      } else {
        meta.setAttribute('name', name);
      }
      document.head.appendChild(meta);
    }
    
    meta.setAttribute('content', content);
  }

  // Update canonical URL
  updateCanonicalUrl(url) {
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);
  }

  // Reset to default meta tags
  resetToDefault() {
    const defaultMeta = {
      title: 'Moment Hub - Wishlist Makes Gifting Easy and Meaningful!',
      description: 'Create and share your perfect wishlist with Moment Hub. Make gifting easy and meaningful for birthdays, holidays, or any special occasion!',
      image: `${this.baseURL}/assets/sharable-log.png`,
      url: this.baseURL,
      type: 'website'
    };

    this.updateMetaTags(defaultMeta);
  }
}

// Create singleton instance
export const socialPreviewManager = new SocialPreviewManager();
