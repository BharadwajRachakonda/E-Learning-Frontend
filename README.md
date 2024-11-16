# Installations

npm install

npm run dev (start with the backend url no need to open the front end front end link is given at the backend)

# Issues

Having a issue with tailwind add this to vite.config.js

```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
});
```
