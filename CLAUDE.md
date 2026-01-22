# CLAUDE.md - BlogForEveryone Project Guide

## Project Overview

**BlogForEveryone** is a personal portfolio website for Alex Dreemurr, built as a pure client-side static web application. It showcases personal information, diary entries, photo galleries, and interests with a unique artistic aesthetic featuring dynamic decorative backgrounds.

**Key Characteristics:**
- **Type:** Static HTML5 personal website
- **Size:** ~503MB (primarily fonts)
- **Language:** Chinese interface (首页, 日记, 相册, etc.)
- **No Backend:** Completely client-side with no server dependencies
- **No Framework:** Pure vanilla HTML/CSS/JavaScript

## Technology Stack

### Core Technologies
- **HTML5** - Semantic markup (6 main pages + 2 diary pages)
- **CSS3** - Modern features: Grid, Flexbox, CSS Variables, animations
- **Vanilla JavaScript** - 489 lines total across 8 modules
- **Node.js** - Used only for gallery generation script (`generate-gallery.js`)

### Libraries & Dependencies
- Material Design Icons (embedded SVGs in HTML)
- Custom fonts: Chubbo, Zodiak, Source Han Serif SC, Noto Serif SC
- No package.json or npm dependencies for the website itself

## Directory Structure

```
BlogForEveryone/
├── index.html                 # Home page with bio section
├── diary.html                 # Diary list with alternating red/purple boxes
├── gallery.html               # Gallery overview with thumbnail grid
├── gallery-inner.html         # Individual gallery viewer (3-panel layout)
├── contact.html               # Empty placeholder
├── resources.html             # Empty placeholder
├── communal_style.css         # Shared styles (CSS variables, fonts, nav)
├── generate-gallery.js        # Node.js script for gallery metadata generation
│
├── js/                        # JavaScript modules (489 lines total)
│   ├── draw_background.js     # Main decorator engine (127 lines)
│   ├── dotted_square.js       # 7x7 dot grid pattern
│   ├── dotted_triangle.js     # Triangular dot arrangement
│   ├── circle.js              # Circular/elliptical shapes
│   ├── triangle.js            # Directional triangles (4 corners)
│   ├── half-circle.js         # Semi-circles (4 directions)
│   ├── quarter_circle.js      # Quarter circles (4 corners)
│   └── clickDiary.js          # Diary navigation handler
│
├── diaries/                   # Individual diary content pages
│   ├── diary1.html            # Full diary entry with background
│   └── diary2.html            # Full diary entry with background
│
├── gallery/                   # Photo galleries with metadata
│   ├── gallery.json           # Master gallery index (auto-generated)
│   ├── gallery1/              # Individual gallery folder
│   │   ├── images.json        # Image list (auto-generated)
│   │   ├── cover.jpg          # Gallery thumbnail
│   │   ├── title.txt          # Optional custom title
│   │   └── *.jpg              # Gallery images
│   ├── gallery2/
│   └── gallery3/
│
├── img/                       # Static image assets
│   ├── title-background.jpg
│   ├── headpic.jpg
│   ├── headpic2.jpg
│   └── diary-background/      # Themed diary backgrounds
│       ├── old-fashioned/     # Vintage journal aesthetic
│       └── black-style/       # Dark modern aesthetic
│
├── fonts/                     # Custom typography (38MB total)
│   ├── Chubbo-Variable.woff   # Display font
│   ├── Zodiak-Bold.woff       # Title font
│   ├── SourceHanSerifSC-Regular.otf
│   └── NotoSerifSC-Regular.ttf
│
├── .vscode/
│   └── launch.json            # Chrome debugger config (localhost:8080)
└── 样式设计.txt                 # Design specifications (Chinese notes)
```

## Key Files Explained

### Core Application Files

#### `communal_style.css` (2.7KB)
Shared styling foundation for all pages.

**CSS Custom Properties (Colors):**
```css
--red: #94214d        /* Burgundy - primary brand color */
--purple: #334063     /* Deep purple - navigation & accents */
--brown: #9b7131      /* Warm brown */
--yellow: hsl(36, 37%, 65%)
--white: #ffffff
--gray: #9f9d89
--whitegray: hsl(223.75, 32%, 90%)
--gallery-paper: hsl(190, 10%, 82%)
```

**Key Features:**
- Font-face declarations for 4 custom fonts
- Global box-sizing reset
- Navigation bar styles (`.nav-bar`)
- Responsive `--grid-h` and `--grid-l` variables (set dynamically by JS)
- Custom scrollbar styling (Firefox & Chromium)

#### `js/draw_background.js` (127 lines) - CRITICAL
The main decorator engine that generates the distinctive background.

**Functionality:**
1. Calculates responsive grid dimensions based on viewport
2. Generates grid of `.deco-block` elements
3. Randomly assigns patterns from 10 types
4. Randomly assigns colors from 8-color palette
5. Ensures adjacent blocks don't share colors
6. Recalculates and redraws on window resize

**Global Variables Set:**
```javascript
--grid-h: Dynamic height unit (px)
--grid-l: Dynamic width unit (px)
```

**Pattern Types:**
- `dottedSquare` - 7×7 dot grid (weighted 2×)
- `dottedTriangle` - Triangular dots (weighted 2×)
- `circle` - Centered ellipses
- `triangle` - CSS clip-path triangles (weighted 3×)
- `halfCircle` - Semi-circles in 4 directions
- `quarterCircle` - Quarter arcs in 4 corners

**Color Palette:**
`['var(--red)', 'var(--red)', 'var(--purple)', 'var(--purple)', 'var(--brown)', 'var(--white)', 'var(--gray)', 'var(--yellow)']`
- Red and purple are weighted 2× for prominence

#### `generate-gallery.js` (67 lines) - Node.js Script
Generates gallery metadata JSON files. Must be run manually after adding images.

**Process:**
1. Scans `/gallery/` directory for subdirectories
2. For each gallery folder:
   - Reads `title.txt` (optional) or uses folder name
   - Finds all images (`.jpg`, `.jpeg`, `.png`, `.webp`, `.gif`)
   - Sorts images numerically
   - Generates `images.json` with image list
3. Creates master `gallery.json` with all gallery metadata

**Expected Data Structure:**
```json
// gallery/gallery.json
[
  {
    "id": 1,
    "folder": "gallery1",
    "title": "名古屋、京都旅游",
    "cover": "cover.jpg"
  }
]

// gallery/gallery1/images.json
["image1.jpg", "image2.jpg", ...]
```

### Page Structure

#### Navigation Pattern (Identical Across All Pages)
```html
<header>
  <ul class="nav-bar">
    <a href="index.html">首页 (Home)</a>
    <a href="diary.html">日记 (Diary)</a>
    <a href="gallery.html">相册 (Gallery)</a>
    <a>资源 (Resources)</a>
    <a>联系 (Contact)</a>
  </ul>
</header>
```

#### Background Decorator (Required on Most Pages)
```html
<div class="background"></div>
<!-- Pattern generator scripts -->
<script src="js/dotted_square.js"></script>
<script src="js/dotted_triangle.js"></script>
<script src="js/circle.js"></script>
<script src="js/triangle.js"></script>
<script src="js/half-circle.js"></script>
<script src="js/quarter_circle.js"></script>
<!-- Main decorator engine (must load last) -->
<script src="js/draw_background.js"></script>
```

## Code Conventions & Patterns

### CSS Conventions

1. **Responsive Design Pattern:**
   - Mobile-first approach
   - Breakpoints: `600px`, `900px`, `1000px`, `1200px`
   - Base unit: `var(--grid-h)` - dynamically calculated

2. **Color Usage:**
   - Use CSS custom properties exclusively: `var(--red)`, not `#94214d`
   - Background colors alternate for list items (see diary.html)
   - Hover states: transition to white background with dark text

3. **Sizing:**
   - Heights: Use multiples of `var(--grid-h)` for consistency
   - Widths: Responsive viewport units (`vw`) with `@media` overrides
   - Navigation: `calc(var(--grid-h) * 2)` on mobile, `* 1` on desktop

4. **Transitions:**
   ```css
   transition-property: background-color, color, box-shadow;
   transition-duration: 0.5s;
   ```

### JavaScript Conventions

1. **Variable Declarations:**
   - Uses `var` (ES5 style) - maintain consistency if editing
   - Global variables for selectors cached at module level

2. **Random Selection Pattern:**
   ```javascript
   function randChoice(my_list, already_item = '') {
     // Ensures non-repeating selection
     while (true) {
       var index = randInt(0, len - 1);
       if (my_list[index] != already_item) {
         return my_list[index];
       }
     }
   }
   ```

3. **Pattern Generator Interface:**
   All pattern functions follow this signature:
   ```javascript
   function patternName(deco_block, l, h, color, [direction]) {
     // deco_block: parent DOM element
     // l: width in pixels
     // h: height in pixels
     // color: CSS color variable
     // direction: optional orientation
   }
   ```

4. **Dynamic Content Loading:**
   ```javascript
   fetch('gallery/gallery.json')
     .then(res => res.json())
     .then(data => {
       // Render dynamic content
     });
   ```

### HTML Conventions

1. **Chinese Labels:**
   - All user-facing text is in Chinese
   - Navigation: 首页, 日记, 相册, 资源, 联系
   - Maintain Chinese when adding content

2. **SVG Icons:**
   - Material Design Icons embedded inline
   - Use `fill="currentColor"` for color inheritance

3. **Page-Specific Styles:**
   - Inline `<style>` blocks in `<head>` for page-specific CSS
   - Shared styles in `communal_style.css`

## Development Workflows

### Local Development Setup

1. **Start Local Server:**
   ```bash
   # Any static file server works. Examples:
   python -m http.server 8080
   # or
   npx serve -p 8080
   ```

2. **VS Code Debugger:**
   - Configured in `.vscode/launch.json`
   - Launches Chrome at `localhost:8080`
   - Press F5 to start debugging

### Adding New Gallery

1. **Create Gallery Folder:**
   ```bash
   mkdir gallery/gallery4
   ```

2. **Add Images:**
   - Supported formats: `.jpg`, `.jpeg`, `.png`, `.webp`, `.gif`
   - Name images numerically for proper sorting: `1.jpg`, `2.jpg`, `10.jpg`
   - **Required:** Add `cover.jpg` for thumbnail

3. **Optional Custom Title:**
   ```bash
   echo "My Gallery Title" > gallery/gallery4/title.txt
   ```

4. **Generate Metadata:**
   ```bash
   node generate-gallery.js
   ```
   This creates:
   - `gallery/gallery4/images.json`
   - Updates `gallery/gallery.json`

5. **No Code Changes Needed:**
   - `gallery.html` dynamically loads from `gallery.json`
   - New gallery appears automatically

### Adding New Diary Entry

1. **Create HTML File:**
   ```bash
   cp diaries/diary1.html diaries/diary3.html
   ```

2. **Edit Content in New File:**
   - Update title, date, body text
   - Choose background theme: `old-fashioned` or `black-style`

3. **Update `diary.html`:**
   Add new entry to the diary list:
   ```html
   <div class="diary" id="diary-3" onclick="clickDiary(this)">
     <p class="title">New Diary Title</p>
     <div class="date">
       <svg>...</svg>
       <p>2026年1月22日</p>
     </div>
   </div>
   ```

4. **Update `js/clickDiary.js`:**
   Add routing for new diary ID (if needed)

### Modifying Design/Colors

1. **Change Color Scheme:**
   Edit `communal_style.css`:
   ```css
   :root {
     --red: #new-color;
     --purple: #new-color;
   }
   ```

2. **Add New Pattern:**
   - Create new file: `js/new_pattern.js`
   - Implement pattern function with standard signature
   - Add to `pattern_list` in `js/draw_background.js`
   - Include `<script>` tag in HTML pages

3. **Modify Grid Density:**
   In `js/draw_background.js`:
   ```javascript
   function chooseLine(width) {
     if (width > 900) {
       return 12;  // Fewer rows = larger blocks
     } else {
       return 15;  // More rows = smaller blocks
     }
   }
   ```

### Testing Responsive Design

1. **Browser DevTools:**
   - Open Chrome DevTools (F12)
   - Toggle device toolbar (Ctrl+Shift+M)
   - Test breakpoints: 600px, 900px, 1000px, 1200px

2. **Watch for:**
   - Navigation height changes at 900px
   - Background pattern regeneration on resize
   - Content width adjustments
   - Scroll behavior in main content areas

## Common Tasks

### Task: Update Site Title/Author

**Files to Edit:**
- `index.html:110` - Change `<h1>Alex<span>Dreemurr</span></h1>`
- `gallery.html:137` - Change `<h1>Alex's Gallery</h1>`

### Task: Add New Page

1. Copy existing page structure
2. Update `<title>` and `<style>` block
3. Include required scripts:
   - Pattern generators (6 scripts)
   - `draw_background.js` (must be last)
4. Add navigation link in all other pages

### Task: Change Font

1. Add new font file to `/fonts/`
2. Add `@font-face` in `communal_style.css`
3. Update `font-family` in styles:
   ```css
   *, *::before, *::after {
     font-family: your-font-name;
   }
   ```

### Task: Disable Background Animation

**Option 1:** Remove on specific page
- Delete `<div class="background"></div>`
- Remove pattern generator `<script>` tags
- Remove `<script src="js/draw_background.js"></script>`

**Option 2:** Disable resize listener
In `js/draw_background.js:109-125`, comment out:
```javascript
// window.addEventListener('resize', () => { ... });
```

## Important Considerations

### Performance

1. **Background Generation:**
   - Runs on every window resize
   - Can be expensive on large screens (12-15 rows × ~20 columns)
   - Consider debouncing resize handler for better performance

2. **Image Loading:**
   - No lazy loading implemented
   - All gallery images load immediately
   - Large galleries may be slow on poor connections

3. **Font Files:**
   - 38MB of fonts loaded on every page
   - Consider subsetting fonts for Chinese characters actually used
   - Or use system fonts as fallback

### Browser Compatibility

- **Tested:** Modern Chrome (implied by VS Code config)
- **CSS Features Used:**
  - CSS Grid (all modern browsers)
  - CSS Variables (IE11 not supported)
  - Flexbox (all modern browsers)
  - Clip-path (check caniuse.com for Safari)

### Accessibility Considerations

**Current Issues:**
- No `alt` text on many images
- Hover-only interactions (not keyboard accessible)
- Chinese text with no language declarations
- No ARIA labels on navigation

**Improvements to Consider:**
```html
<html lang="zh-CN">
<a href="index.html" aria-label="首页">...</a>
<img src="..." alt="描述性文字">
```

### Security Notes

- Pure static site - minimal attack surface
- No user input processing
- No external API calls (except local JSON)
- No sensitive data in repository

## Git Workflow

### Branch Strategy

- Main branch: Not specified in current status
- Feature branches: Use format `claude/claude-md-mkp8mulk4gl6jiim-*`
- Current branch: `claude/claude-md-mkp8mulk4gl6jiim-pM93R`

### Commit Message Style

Based on recent commits:
```
小更新 (small update)
bug fixed
bug fixed again
相册 (gallery)
相册更新 (gallery update)
```

**Recommendation:** Use descriptive Chinese or English messages:
- "添加新日记功能" (Add new diary feature)
- "修复背景装饰渲染问题" (Fix background decoration rendering)
- "更新相册3的图片" (Update gallery 3 images)

### Git Operations

**Remember:**
- Always push to branch starting with `claude/` and ending with session ID
- Use: `git push -u origin <branch-name>`
- Network failures: retry up to 4 times with exponential backoff

## Troubleshooting

### Background Not Appearing

1. Check `<div class="background"></div>` exists
2. Verify all 6 pattern scripts load before `draw_background.js`
3. Check browser console for JavaScript errors
4. Ensure `communal_style.css` is loaded

### Gallery Not Loading

1. Run `node generate-gallery.js` to regenerate metadata
2. Check `gallery/gallery.json` exists and is valid JSON
3. Verify `cover.jpg` exists in each gallery folder
4. Check browser console for fetch errors

### Responsive Layout Issues

1. Check `--grid-h` and `--grid-l` are set (inspect in DevTools)
2. Verify `@media` query breakpoints
3. Test with `window.innerWidth` in console
4. Check for CSS override conflicts

### Navigation Links Not Working

1. Verify file paths are relative: `href="index.html"` not `href="/index.html"`
2. Check file names match exactly (case-sensitive on Linux servers)
3. Ensure target files exist in root directory

## Future Considerations

### Potential Improvements

1. **Performance:**
   - Implement lazy loading for gallery images
   - Debounce resize handler
   - Consider using CSS `content-visibility` for off-screen elements

2. **Features:**
   - Add search functionality for diaries
   - Implement gallery image lightbox/modal
   - Add RSS feed for new diary entries
   - Dark mode toggle

3. **Code Quality:**
   - Modernize JavaScript (ES6+: `const`/`let`, arrow functions)
   - Extract inline styles to CSS files
   - Add JSDoc comments to functions
   - Create component system for repeated elements

4. **Content Management:**
   - Consider static site generator (11ty, Hugo) for easier content management
   - Markdown support for diary entries
   - Automated gallery thumbnail generation

5. **Accessibility:**
   - Add ARIA labels throughout
   - Implement keyboard navigation
   - Add `lang` attributes
   - Improve color contrast ratios

### Scalability Notes

**Current Limitations:**
- Manual diary entry requires HTML editing
- No pagination for large galleries
- All content loads at once
- No build process for optimization

**If scaling up:**
- Consider static site generator
- Implement pagination
- Add build step for image optimization
- Use service worker for offline access

## Quick Reference

### File Size Limits
- HTML pages: ~6-15KB each
- CSS: ~2.7KB shared
- JS: ~489 lines total across 8 files
- Fonts: ~38MB (largest asset)

### Load Order
```html
1. communal_style.css
2. Pattern generator scripts (6)
3. draw_background.js (MUST BE LAST)
```

### Color Variables
```css
--red, --purple, --brown, --yellow, --white, --gray,
--whitegray, --whitegrayer, --paper-yellow, --gallery-paper
```

### Responsive Breakpoints
```
600px  - Tablets (portrait)
900px  - Tablets (landscape) / Small laptops
1000px - Laptops
1200px - Desktops
```

### Chinese Terminology
```
首页 (Shǒuyè) - Home
日记 (Rìjì) - Diary
相册 (Xiàngcè) - Gallery
资源 (Zīyuán) - Resources
联系 (Liánxì) - Contact
```

---

**Last Updated:** 2026-01-22
**Project Status:** Active development
**Maintainer:** Alex Dreemurr
