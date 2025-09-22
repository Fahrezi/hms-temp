# LazyImage Component Documentation

## Overview

The LazyImage component is a lightweight, performant solution for lazy loading images in React applications. It helps improve page performance by deferring the loading of off-screen images until they are about to enter the viewport.

## Why Lazy Loading Matters

### Performance Benefits

- **Faster Initial Page Load**: Only loads images that are immediately visible
- **Reduced Bandwidth Usage**: Users who don't scroll through the entire page never download offscreen images
- **Improved Core Web Vitals**: Better LCP and CLS scores
- **Better User Experience**: Especially important on mobile devices or slow connections

### SEO Benefits

- Better Core Web Vitals scores can positively impact search engine rankings
- Improved page speed is a known ranking factor for search engines

## Features

- ✨ **Intersection Observer Based**: Efficiently detects when images enter the viewport
- 🎨 **Placeholder Support**: Displays placeholders while images are loading
- 🔄 **Smooth Transitions**: Fades in images once loaded
- 📐 **Handles Unknown Dimensions**: Prevents layout shifts
- 📏 **Aspect Ratio Control**: Maintains proper image proportions
- 💪 **TypeScript Support**: Fully typed for development confidence
- 🛠️ **Customizable**: Supports various style and behavior adjustments

## Detail Component

LazyImage component already declare in:

```
src/
  components/
    ui/
      LazyImage/
        index.tsx
        LazyImage.tsx
        LazyImage.module.scss
```

## Usage

### Basic Usage

```tsx
import LazyImage from '@/components/ui/LazyImage';

const Gallery = () => {
  return (
    <div className='gallery'>
      <LazyImage src='/images/photo1.jpg' alt='Beautiful landscape' width={400} height={300} />
    </div>
  );
};
```

## API Reference

### Props

| Prop                | Type     | Default   | Description                        |
| ------------------- | -------- | --------- | ---------------------------------- |
| src                 | string   | required  | Image source URL                   |
| alt                 | string   | required  | Alternative text for accessibility |
| width               | number   | undefined | Width in pixels                    |
| height              | number   | undefined | Height in pixels                   |
| className           | string   | ''        | Additional CSS class(es)           |
| placeholderSrc      | string   | gray SVG  | URL or data URI for placeholder    |
| objectFit           | string   | 'cover'   | CSS object-fit property value      |
| onLoad              | function | undefined | Callback when image loads          |
| aspectRatio         | string   | undefined | CSS aspect ratio (e.g., "16/9")    |
| fallbackAspectRatio | string   | "16/9"    | Default aspect ratio if unknown    |

## Advanced Usage

### External Images with Unknown Dimensions

```tsx
<LazyImage src='https://external-api.com/image.jpg' alt='External image' aspectRatio='4/3' fallbackAspectRatio='16/9' />
```

### Custom Placeholder

```tsx
<LazyImage
  src='/images/high-res.jpg'
  alt='Product image'
  placeholderSrc='/images/low-res-thumbnail.jpg'
  onLoad={() => console.log('Image loaded!')}
/>
```

### Responsive Usage

```tsx
<div className='responsive-container'>
  <LazyImage src='/images/hero.jpg' alt='Hero image' aspectRatio='21/9' objectFit='cover' />
</div>
```

## Technical Details

### How It Works

1. Creates a container with appropriate dimensions/aspect ratio
2. Shows a placeholder until the image loads
3. Uses IntersectionObserver to detect viewport proximity
4. Loads image only when near viewport
5. Handles unknown dimensions via preloading
6. Implements smooth transition effects

### Browser Support

- IntersectionObserver API
- CSS aspect-ratio property

> Note: Consider adding polyfills for older browsers

## Performance Considerations

- Images load ~200px before entering viewport (configurable)
- Use small placeholder images (LQIP recommended)
- Avoid lazy loading critical above-the-fold images

## Best Practices

1. Always provide meaningful alt text
2. Set width/height when known to prevent layout shifts
3. Use appropriate aspect ratios for responsive images
4. Optimize placeholder images for quick loading
5. Consider using WebP format with fallbacks
