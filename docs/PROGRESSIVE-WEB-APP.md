# Building and Previewing PWA in this Codebase

This codebase is pre-configured for Progressive Web App (PWA) functionality using `vite-plugin-pwa` and `@vite-pwa/assets-generator`. Follow these steps to customize and preview your PWA:

**Customization:**

1.  **Replace the Default Logo:**

    - Locate `public/images/logo.svg`.
    - Replace it with your desired application logo, ensuring it's also named `logo.svg`.

2.  **Update PWA Manifest:**

    - Open `vite.config.ts`.
    - Modify the `manifest` object within the `VitePWA` plugin configuration:

      - Change `name`, `short_name`, `description`, and `theme_color` to your desired values.
      - Example:

      ```typescript
      manifest: {
        name: 'Your App Name',
        short_name: 'App Name',
        description: 'Your app description.',
        theme_color: '#your-theme-color',
        // ... rest of the manifest config
      },
      ```

3.  **Update `index.html` Metadata:**
    - Open `public/index.html`.
    - Modify the following tags within the `<head>` section:
      - `<title>`: Change the page title.
      - `<meta name="description">`: Update the meta description.
      - `<meta name="theme-color">`: Update the theme color to match your `vite.config.ts` manifest.

**Build and Preview:**

1.  **Generate PWA Assets:**

    - Run: `npm run generate-pwa-assets`
    - This will generate the necessary PWA icons and assets from your `logo.svg`.

2.  **Build the Project:**

    - Run: `npm run build`
    - This creates the production build in the `dist` directory.

3.  **Preview the PWA:**
    - Run: `npm run preview`
    - This starts a local server to preview your PWA.
    - Once the preview server has started, use your browser's developer tools, and go to the Application tab to inspect the PWA manifest and service worker.

**Key Points:**

- The `vite.config.ts` is already configured for PWA.
- The `generate-pwa-assets` script is already configured in `package.json`.
- Ensure your logo is named `logo.svg` and placed in the `public` directory.
- Preview on various devices and browsers to confirm proper functionality.
- Keep the theme colors in `vite.config.ts` and `index.html` consistent.
