// vite.config.ts
import { defineConfig } from "file:///C:/Users/SEBASTIAN/Desktop/hydrogen-storefront/node_modules/vite/dist/node/index.js";
import { hydrogen } from "file:///C:/Users/SEBASTIAN/Desktop/hydrogen-storefront/node_modules/@shopify/hydrogen/dist/vite/plugin.js";
import { oxygen } from "file:///C:/Users/SEBASTIAN/Desktop/hydrogen-storefront/node_modules/@shopify/mini-oxygen/dist/vite/plugin.js";
import { vitePlugin as remix } from "file:///C:/Users/SEBASTIAN/Desktop/hydrogen-storefront/node_modules/@remix-run/dev/dist/index.js";
import tsconfigPaths from "file:///C:/Users/SEBASTIAN/Desktop/hydrogen-storefront/node_modules/vite-tsconfig-paths/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [
    hydrogen(),
    oxygen(),
    remix({
      presets: [hydrogen.preset()],
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true
      }
    }),
    tsconfigPaths()
  ],
  ssr: {
    optimizeDeps: {
      include: ["typographic-base"]
    }
  },
  optimizeDeps: {
    include: [
      "clsx",
      "@headlessui/react",
      "typographic-base",
      "react-intersection-observer",
      "react-use/esm/useScroll",
      "react-use/esm/useDebounce",
      "react-use/esm/useWindowScroll"
    ]
  },
  build: {
    // Allow a strict Content-Security-Policy
    // withtout inlining assets as base64:
    assetsInlineLimit: 0
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxTRUJBU1RJQU5cXFxcRGVza3RvcFxcXFxoeWRyb2dlbi1zdG9yZWZyb250XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxTRUJBU1RJQU5cXFxcRGVza3RvcFxcXFxoeWRyb2dlbi1zdG9yZWZyb250XFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9TRUJBU1RJQU4vRGVza3RvcC9oeWRyb2dlbi1zdG9yZWZyb250L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHtkZWZpbmVDb25maWd9IGZyb20gJ3ZpdGUnO1xyXG5pbXBvcnQge2h5ZHJvZ2VufSBmcm9tICdAc2hvcGlmeS9oeWRyb2dlbi92aXRlJztcclxuaW1wb3J0IHtveHlnZW59IGZyb20gJ0BzaG9waWZ5L21pbmktb3h5Z2VuL3ZpdGUnO1xyXG5pbXBvcnQge3ZpdGVQbHVnaW4gYXMgcmVtaXh9IGZyb20gJ0ByZW1peC1ydW4vZGV2JztcclxuaW1wb3J0IHRzY29uZmlnUGF0aHMgZnJvbSAndml0ZS10c2NvbmZpZy1wYXRocyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIHBsdWdpbnM6IFtcclxuICAgIGh5ZHJvZ2VuKCksXHJcbiAgICBveHlnZW4oKSxcclxuICAgIHJlbWl4KHtcclxuICAgICAgcHJlc2V0czogW2h5ZHJvZ2VuLnByZXNldCgpXSxcclxuICAgICAgZnV0dXJlOiB7XHJcbiAgICAgICAgdjNfZmV0Y2hlclBlcnNpc3Q6IHRydWUsXHJcbiAgICAgICAgdjNfcmVsYXRpdmVTcGxhdFBhdGg6IHRydWUsXHJcbiAgICAgICAgdjNfdGhyb3dBYm9ydFJlYXNvbjogdHJ1ZSxcclxuICAgICAgfSxcclxuICAgIH0pLFxyXG4gICAgdHNjb25maWdQYXRocygpLFxyXG4gIF0sXHJcbiAgc3NyOiB7XHJcbiAgICBvcHRpbWl6ZURlcHM6IHtcclxuICAgICAgaW5jbHVkZTogWyd0eXBvZ3JhcGhpYy1iYXNlJ10sXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgb3B0aW1pemVEZXBzOiB7XHJcbiAgICBpbmNsdWRlOiBbXHJcbiAgICAgICdjbHN4JyxcclxuICAgICAgJ0BoZWFkbGVzc3VpL3JlYWN0JyxcclxuICAgICAgJ3R5cG9ncmFwaGljLWJhc2UnLFxyXG4gICAgICAncmVhY3QtaW50ZXJzZWN0aW9uLW9ic2VydmVyJyxcclxuICAgICAgJ3JlYWN0LXVzZS9lc20vdXNlU2Nyb2xsJyxcclxuICAgICAgJ3JlYWN0LXVzZS9lc20vdXNlRGVib3VuY2UnLFxyXG4gICAgICAncmVhY3QtdXNlL2VzbS91c2VXaW5kb3dTY3JvbGwnLFxyXG4gICAgXSxcclxuICB9LFxyXG4gIGJ1aWxkOiB7XHJcbiAgICAvLyBBbGxvdyBhIHN0cmljdCBDb250ZW50LVNlY3VyaXR5LVBvbGljeVxyXG4gICAgLy8gd2l0aHRvdXQgaW5saW5pbmcgYXNzZXRzIGFzIGJhc2U2NDpcclxuICAgIGFzc2V0c0lubGluZUxpbWl0OiAwLFxyXG4gIH0sXHJcbn0pO1xyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXNVLFNBQVEsb0JBQW1CO0FBQ2pXLFNBQVEsZ0JBQWU7QUFDdkIsU0FBUSxjQUFhO0FBQ3JCLFNBQVEsY0FBYyxhQUFZO0FBQ2xDLE9BQU8sbUJBQW1CO0FBRTFCLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLFNBQVM7QUFBQSxJQUNULE9BQU87QUFBQSxJQUNQLE1BQU07QUFBQSxNQUNKLFNBQVMsQ0FBQyxTQUFTLE9BQU8sQ0FBQztBQUFBLE1BQzNCLFFBQVE7QUFBQSxRQUNOLG1CQUFtQjtBQUFBLFFBQ25CLHNCQUFzQjtBQUFBLFFBQ3RCLHFCQUFxQjtBQUFBLE1BQ3ZCO0FBQUEsSUFDRixDQUFDO0FBQUEsSUFDRCxjQUFjO0FBQUEsRUFDaEI7QUFBQSxFQUNBLEtBQUs7QUFBQSxJQUNILGNBQWM7QUFBQSxNQUNaLFNBQVMsQ0FBQyxrQkFBa0I7QUFBQSxJQUM5QjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLGNBQWM7QUFBQSxJQUNaLFNBQVM7QUFBQSxNQUNQO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLE9BQU87QUFBQTtBQUFBO0FBQUEsSUFHTCxtQkFBbUI7QUFBQSxFQUNyQjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
