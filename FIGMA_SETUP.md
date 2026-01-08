# Figma Prototype Setup Guide

## Adding Your Figma Prototype

The mobile app showcase section is ready! You just need to add your Figma prototype URL.

### Step 1: Get Your Figma Prototype URL

You have two options:

#### Option A: Use Figma Site/Published Prototype (Easiest)
If you have a Figma site URL (like `https://merry-decay-69640409.figma.site/`), you can use it directly! This is already set up in the code.

#### Option B: Get the Prototype Link from Figma
1. Open your Figma file
2. Click the **Play** button (▶️) in the top right (next to Share) OR go to **Menu → Prototype**
3. This opens the prototype view
4. Click **Share** in the prototype view
5. Make sure **"Anyone with the link can view"** is enabled
6. Copy the link - it should look like: `https://www.figma.com/proto/...`

**Note:** If you only see a "Share" button that gives you a file link (`figma.com/file/...`), you need to:
- First enter Prototype mode (click the Play button)
- Then share from there to get the prototype link

### Step 2: Update the Component

In `app/page.tsx`, find the `MobileAppShowcase` component (around line 328) and update the `figmaUrl` prop:

```tsx
<MobileAppShowcase
  figmaUrl="https://stuck-beauty-29109683.figma.site/"
/>
```

**Examples:**

Using a Figma site URL (already configured):
```tsx
<MobileAppShowcase
  figmaUrl="https://stuck-beauty-29109683.figma.site/"
/>
```

Using a prototype link:
```tsx
<MobileAppShowcase
  figmaUrl="https://www.figma.com/proto/abc123xyz456/HavenScan-App?node-id=1-2&starting-point-node-id=1-2"
/>
```

Using a share link (will attempt to convert):
```tsx
<MobileAppShowcase
  figmaUrl="https://www.figma.com/make/5Lxvsk2EL9RcWy65inmZar/Sensor-Data-Collection-App?t=NnXLpudfTX3ZZsiK-1"
/>
```

### Step 3: Test

1. Run `npm run dev`
2. Navigate to the homepage
3. Scroll to the "From Detection to Action" section
4. You should see your Figma prototype embedded in a phone frame

## Features

✅ **Responsive Design** - Works on desktop and mobile  
✅ **Professional Phone Frame** - Realistic iPhone-style mockup  
✅ **Scroll Animation** - Subtle fade-in on scroll  
✅ **Clean Integration** - Matches your site's design  
✅ **Interactive Prototype** - Full Figma prototype functionality  

## Troubleshooting

**Prototype not showing?**
- **Figma site URLs** (`figma.site`) should work directly - make sure the site is published
- **Prototype links** should contain `/proto/` - if you only have a file link, enter Prototype mode first
- Verify sharing permissions are set to "Anyone with the link"
- Check browser console for any iframe errors (F12 → Console tab)
- Some browsers block iframes - try a different browser or check security settings

**Phone frame looks off?**
- The component automatically converts regular Figma URLs to embed format
- If issues persist, try using the embed URL directly: `https://www.figma.com/embed?embed_host=share&url=YOUR_URL`

**Performance issues?**
- Figma embeds can be heavy - consider lazy loading if needed
- The component already includes scroll-based loading

## Customization

The component accepts these props:
- `figmaUrl` (required): Your Figma prototype URL

The phone frame and styling are built-in and match your site's design system.

