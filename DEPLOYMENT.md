# Deploying to GitHub Pages

This guide explains how to deploy your React application to GitHub Pages at `https://ram7767.github.io/ram7767/`.

## Prerequisites

1. Your repository must be named `ram7767.github.io`
2. GitHub Pages must be enabled in your repository settings
3. The project is already configured to work with GitHub Pages (base: './')

## Deployment Steps

### Method 1: Using npm scripts (Recommended)

1. Make sure you have committed and pushed all your changes to GitHub:
   ```bash
   git add .
   git commit -m "Deploy updates"
   git push origin main
   ```

2. Run the deploy command:
   ```bash
   npm run deploy
   ```

This script will:
- Automatically run `npm run build` (due to `predeploy`)
- Deploy the contents of your `dist` folder to the `gh-pages` branch

### Method 2: Manual deployment

1. Build your project:
   ```bash
   npm run build
   ```

2. Push the `dist` folder to the `gh-pages` branch manually using the `gh-pages` package:
   ```bash
   npx gh-pages -d dist
   ```

## GitHub Repository Settings

Make sure your GitHub repository is configured properly:

1. Go to your repository on GitHub
2. Navigate to Settings → Pages
3. Under "Source", select "Deploy from a branch"
4. Select the `gh-pages` branch
5. Click Save

## Configuration Notes

- The `vite.config.ts` file has `"base": "./"` which is required for GitHub Pages subdirectories
- The output directory is `dist/`, which is correctly set in the deployment scripts
- The `.gitignore` file excludes unnecessary files from the repository

## Troubleshooting

### Page not loading after deployment
- Check that the `base` property in `vite.config.ts` is set to `'./'`
- Verify that the GitHub Pages source is set to the `gh-pages` branch
- Clear your browser cache

### Images or assets not showing
- Ensure all asset paths are relative in your components
- Check that the `base` property in `vite.config.ts` is correctly set
- Verify the build completed without errors

### Custom domain setup
If you want to use a custom domain:
1. Add a `CNAME` file to your `public` folder with your domain name
2. Add the custom domain in GitHub Pages settings

## Automation with GitHub Actions (Optional)

For automatic deployment on every push to main, add this workflow file at `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

---
Project: ram7767.github.io
Repository: https://github.com/ram7767/ram7767