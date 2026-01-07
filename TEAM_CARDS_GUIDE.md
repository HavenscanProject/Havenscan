# Team Cards Animation Guide

## 🎨 Available Animation Styles

The TeamCards component includes **6 unique animation styles**. Change the `animationStyle` prop in `app/about/page.tsx` to try different effects:

### 1. **3D Tilt + Glow** (Default)
```tsx
<TeamCards members={teamMembers} animationStyle="3d-tilt" />
```
**Features:**
- ✨ 3D perspective tilt on mouse move
- 💫 Glowing border effect on hover
- 🎯 Smooth scale transformation
- 🌟 Blue glow shadow

**Best for:** Modern, tech-forward aesthetic

---

### 2. **Glassmorphism + Parallax**
```tsx
<TeamCards members={teamMembers} animationStyle="glassmorphism" />
```
**Features:**
- 🔮 Glass-like frosted effect
- 🌊 Parallax movement following cursor
- 🎨 Animated gradient backgrounds
- ✨ Backdrop blur effects

**Best for:** Elegant, premium feel

---

### 3. **Card Flip**
```tsx
<TeamCards members={teamMembers} animationStyle="flip" />
```
**Features:**
- 🔄 3D flip animation on click
- 🎴 Front shows name/role, back shows bio
- 💫 Smooth 180° rotation
- 🎨 Gradient background on back

**Best for:** Interactive, engaging experience

---

### 4. **Magnetic Cursor**
```tsx
<TeamCards members={teamMembers} animationStyle="magnetic" />
```
**Features:**
- 🧲 Cards follow cursor movement
- 🎯 Magnetic attraction effect
- 📏 Subtle scale on hover
- ✨ Smooth transitions

**Best for:** Playful, interactive feel

---

### 5. **Gradient Wave**
```tsx
<TeamCards members={teamMembers} animationStyle="gradient" />
```
**Features:**
- 🌈 Animated gradient backgrounds
- 🌊 Wave effect overlay
- 🎨 Color transitions (blue → purple → pink)
- ✨ Text color inversion on hover

**Best for:** Vibrant, dynamic look

---

### 6. **Floating + Scale**
```tsx
<TeamCards members={teamMembers} animationStyle="floating" />
```
**Features:**
- 🎈 Continuous floating animation
- ⭐ Floating particles on hover
- 📈 Scale up on hover
- ✨ Staggered animation delays

**Best for:** Playful, energetic vibe

---

## 📝 Customizing Team Members

Update the `teamMembers` array in `app/about/page.tsx`:

```tsx
const teamMembers: TeamMember[] = [
  {
    name: "John Doe",
    role: "CEO & Founder",
    bio: "10+ years in IoT and home automation. Previously at...",
    image: "/images/team/john.jpg", // Optional
    linkedin: "https://linkedin.com/in/johndoe", // Optional
    email: "john@havenscan.com", // Optional
  },
  // ... add more members
];
```

## 🎨 Customization Tips

### Change Colors
Edit the gradient colors in each animation style component:
- Blue: `from-blue-500 to-blue-600`
- Purple: `from-purple-500 to-purple-600`
- Pink: `from-pink-500 to-pink-600`

### Adjust Animation Speed
In `app/globals.css`, modify animation durations:
```css
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}
/* Change 50% timing to adjust speed */
```

### Add Images
1. Place team photos in `public/images/team/`
2. Update the `image` property in team member objects
3. Modify the avatar section to display images:
```tsx
{member.image ? (
  <img src={member.image} alt={member.name} className="w-24 h-24 rounded-full object-cover" />
) : (
  <div className="w-24 h-24 rounded-full bg-gradient-to-br...">
    {member.name.charAt(0)}
  </div>
)}
```

## 🚀 Quick Start

1. **Choose your animation style** - Change `animationStyle` prop
2. **Update team data** - Replace placeholder names/roles/bios
3. **Add images** (optional) - Add team photos
4. **Customize colors** - Match your brand

## 💡 Pro Tips

- **3D Tilt** works great for tech companies
- **Glassmorphism** gives a premium, modern feel
- **Card Flip** is perfect for detailed bios
- **Magnetic** adds playful interactivity
- **Gradient Wave** creates vibrant energy
- **Floating** is fun and eye-catching

Mix and match or create your own by combining elements from different styles!

