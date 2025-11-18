# Accessibility Documentation

This document outlines the accessibility features implemented in the Radical Healing Blog to ensure WCAG 2.1 Level AA compliance.

## Overview

The Radical Healing Blog is designed to be accessible to all users, including those using assistive technologies such as screen readers, keyboard navigation, and other accessibility tools.

## Key Accessibility Features

### 1. Semantic HTML Structure

#### Proper Heading Hierarchy
- All pages use a single `<h1>` element for the main page title
- Heading levels follow a logical hierarchy (h1 → h2 → h3) without skipping levels
- Examples:
  - Homepage: h1 (Hero title) → h2 (Section titles) → h3 (Card titles)
  - Blog listing: h1 (Page title) → h2 (Related posts) → h3 (Card titles)
  - Blog post: h1 (Post title) → h2+ (Content headings from markdown)

#### Landmark Regions
- `<header>` - Site header with navigation
- `<main id="main-content">` - Main content area (target for skip link)
- `<nav aria-label="Main navigation">` - Primary navigation
- `<nav aria-label="Footer navigation">` - Footer navigation
- `<footer>` - Site footer
- `<article>` - Blog post content
- `<section>` - Content sections with headings

### 2. Skip to Content Link

A skip-to-content link is provided at the top of every page to allow keyboard users to bypass repetitive navigation:

- Hidden by default using `sr-only` class
- Becomes visible when focused via keyboard
- Links to `#main-content` (the main element)
- Styled prominently when visible with high contrast
- Located in: `components/layout/SkipToContent.tsx`

### 3. Keyboard Navigation

All interactive elements are keyboard accessible:

#### Focus Indicators
- All interactive elements have visible focus indicators
- Focus styles use `focus:ring-2` and `focus:ring-offset-2` for clear visibility
- Focus indicators meet WCAG 2.1 contrast requirements

#### Keyboard Shortcuts
- `Tab` - Navigate forward through interactive elements
- `Shift + Tab` - Navigate backward through interactive elements
- `Enter` or `Space` - Activate buttons and links
- `Escape` - Close modals (video player modal)

#### Interactive Components
- Navigation menu (mobile hamburger menu)
- Audio player controls (play/pause, volume, mute)
- Video cards (clickable with Enter/Space)
- Form inputs and buttons
- Pagination controls

### 4. ARIA Labels and Attributes

#### Navigation
- Main navigation: `aria-label="Main navigation"`
- Footer navigation: `aria-label="Footer navigation"`
- Mobile menu button: `aria-expanded` state, `aria-label="Toggle navigation menu"`

#### Audio Player
- Play/pause button: `aria-label` describes current state ("Play healing music" / "Pause healing music")
- Volume control: `aria-label="Volume control"`
- Mute button: `aria-label` describes current state ("Mute audio" / "Unmute audio")

#### Video Components
- Video cards: `role="button"`, `aria-label="Play video: {title}"`
- Video modal: `role="dialog"`, `aria-modal="true"`, `aria-labelledby="video-modal-title"`
- Close button: `aria-label="Close video"`

#### Forms
- All form inputs have associated `<label>` elements
- Error messages: `role="alert"`, `aria-describedby` links to error text
- Helper text: `aria-describedby` links to helper text
- Invalid state: `aria-invalid="true"` when validation fails
- Required fields: `required` attribute and visual indicator

#### Pagination
- Page buttons: `aria-label="Go to page {number}"`
- Current page: `aria-current="page"`
- Previous/Next buttons: `aria-label` describes action

#### Decorative Elements
- Decorative icons and graphics: `aria-hidden="true"`
- Quotation marks in quote cards: `aria-hidden="true"`

### 5. Color Contrast

All text meets WCAG 2.1 Level AA contrast requirements:

- **Primary text** (#3A3A3A) on white background: 11.6:1 ratio ✓
- **Light text** (#6B6B6B) on white background: 5.7:1 ratio ✓
- **Primary color** (#A8C5A7) used for interactive elements with sufficient contrast
- **Links** use primary color with underline on hover for additional visual cue

### 6. Responsive Design

The site is fully responsive and accessible across all viewport sizes:

- Minimum supported width: 320px
- Maximum tested width: 2560px
- Touch targets meet minimum size requirements (44x44px)
- Mobile navigation uses accessible hamburger menu pattern

### 7. Images and Media

#### Images
- All images have descriptive `alt` text
- Decorative images use `alt=""` or `aria-hidden="true"`
- Lazy loading implemented for performance without affecting accessibility

#### Videos
- Video embeds include `title` attribute
- Video player modal provides keyboard-accessible controls
- Captions should be enabled in embedded videos (YouTube/Vimeo)

#### Audio
- Background audio player is optional and user-controlled
- Audio preferences persist across sessions
- Visual feedback for all audio controls

### 8. Forms and Validation

#### Feedback Form
- All required fields clearly marked
- Real-time validation with clear error messages
- Error messages appear immediately below relevant fields
- Success/error states announced to screen readers via `role="alert"`
- Form can be completed entirely via keyboard
- Character count for textarea (visual and programmatic)

### 9. Loading States and Feedback

- Loading spinners include `aria-label` or `aria-live` regions
- Error messages provide retry options
- Success messages confirm completed actions
- All state changes provide appropriate feedback

### 10. Screen Reader Support

The site has been designed with screen reader users in mind:

- Logical reading order matches visual layout
- Hidden content uses `sr-only` class (not `display: none`)
- Dynamic content updates use ARIA live regions where appropriate
- Form validation errors are announced
- Modal dialogs trap focus appropriately

## Testing Recommendations

### Manual Testing
1. **Keyboard Navigation**: Navigate entire site using only keyboard
2. **Screen Reader**: Test with VoiceOver (macOS), NVDA (Windows), or JAWS
3. **Zoom**: Test at 200% zoom level
4. **Color Blindness**: Use color blindness simulators

### Automated Testing Tools
- **axe DevTools**: Browser extension for accessibility testing
- **Lighthouse**: Built into Chrome DevTools
- **WAVE**: Web accessibility evaluation tool
- **Pa11y**: Command-line accessibility testing

### Browser Testing
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Known Limitations

1. **Video Captions**: Embedded videos (YouTube/Vimeo) should have captions enabled by content creators
2. **Third-party Content**: External content may not meet our accessibility standards
3. **Dynamic Content**: Some animations may need to respect `prefers-reduced-motion` media query

## Future Improvements

1. Implement `prefers-reduced-motion` media query support
2. Add high contrast mode support
3. Implement focus-visible for better focus management
4. Add more comprehensive ARIA live regions for dynamic content
5. Implement keyboard shortcuts documentation page
6. Add accessibility statement page

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM Resources](https://webaim.org/resources/)
- [A11y Project Checklist](https://www.a11yproject.com/checklist/)

## Contact

If you encounter any accessibility issues, please submit feedback through our [feedback form](/feedback) or contact us directly.

---

Last Updated: November 2024
