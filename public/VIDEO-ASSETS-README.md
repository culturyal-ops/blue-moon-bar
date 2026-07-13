# Video Assets for Blue Moon Website

## Hero Background Video

**Location:** `/public/hero-video.mp4`

### Requirements

- **Format:** MP4 (H.264 codec)
- **Recommended dimensions:** 1920x1080 or higher
- **Aspect ratio:** 16:9
- **Duration:** 10-30 seconds (will loop)
- **File size:** < 5MB for optimal performance
- **Content:** Blue Moon bar and kitchen exterior/interior footage showing atmosphere
- **Timing:** Evening/dusk lighting preferred to match "after dark" theme
- **Mood:** Warm, inviting, hospitality-focused

### Technical Specifications

- Codec: H.264
- Frame rate: 24-30 fps
- Audio: None (video will be muted)
- Compression: High quality, web-optimized
- Color: Natural, warm tones

### Optimization Tips

1. Use video compression tools (Handbrake, FFmpeg) to reduce file size
2. Encode with web-optimized settings
3. Test on both desktop and mobile devices
4. Ensure the most important visual content is centered (see object-position settings)

### Current Object Position Settings

- **Desktop:** `center 40%` - Centers horizontally, 40% from top
- **Mobile:** `65% center` - 65% from left, centered vertically

These can be adjusted in `Hero.tsx` BackgroundVideo component props.

### Poster Image

**Location:** `/public/hero-poster.svg`

The poster image displays while the video loads and as a fallback for users who prefer reduced motion.

### Testing Checklist

- [ ] Video loads on desktop
- [ ] Video loads on mobile
- [ ] Video autoplays correctly
- [ ] Poster displays before video load
- [ ] Reduced motion fallback works
- [ ] Video pauses when scrolled out of view
- [ ] Text remains readable over video
- [ ] No layout shift when video loads
- [ ] File size is optimized for web

## Implementation

The hero video is implemented using:
- **Component:** `src/components/BackgroundVideo.tsx`
- **Styling:** `src/components/BackgroundVideo.css`
- **Used in:** `src/components/Hero.tsx`

### Key Features

- Autoplay, muted, looping
- Viewport-aware (pauses when not visible)
- Respects prefers-reduced-motion
- Graceful image fallback
- Dark overlay for text readability
- Object-fit cover with custom positioning
- No layout shift
