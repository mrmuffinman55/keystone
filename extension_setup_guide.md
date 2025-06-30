# Learning Data Extractor Browser Extension

A Chrome/Edge extension designed to extract course and learning data from various platforms for your Sphere Grid learning system.

## 📁 File Structure

```
learning-data-extractor/
├── manifest.json                 # Extension manifest
├── popup/
│   ├── popup.html               # Main UI interface
│   └── popup.js                 # UI controller
├── background.js                # Service worker
├── content-scripts/
│   ├── udemy.js                # Udemy-specific extractor
│   ├── youtube.js              # YouTube-specific extractor
│   ├── amazon.js               # Amazon-specific extractor
│   └── generic.js              # Generic webpage extractor
├── assets/
│   ├── icon-16.png             # Extension icons
│   ├── icon-48.png
│   └── icon-128.png
└── README.md                    # This file
```

## 🚀 Installation

### Method 1: Load as Unpacked Extension (Development)

1. **Create Extension Folder**
   ```bash
   mkdir learning-data-extractor
   cd learning-data-extractor
   ```

2. **Save the Files**
   - Copy each artifact file into the appropriate location
   - Create the folder structure as shown above

3. **Create Basic Icons** (optional for testing)
   - Create simple 16x16, 48x48, and 128x128 PNG icons
   - Or use placeholder images temporarily

4. **Load in Chrome/Edge**
   - Open `chrome://extensions/` (or `edge://extensions/`)
   - Enable "Developer mode" (toggle in top right)
   - Click "Load unpacked"
   - Select your `learning-data-extractor` folder

### Method 2: Create Icons Programmatically

If you want to quickly generate basic icons:

```javascript
// Run this in browser console to create icon data URLs
function createIcon(size, color = '#667eea') {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    
    // Background
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, size, size);
    
    // Grid pattern
    ctx.fillStyle = '#ffffff';
    ctx.font = `${size/2}px Arial`;
    ctx.textAlign = 'center';
    ctx.fillText('SG', size/2, size/2 + size/8);
    
    return canvas.toDataURL();
}

console.log('16x16:', createIcon(16));
console.log('48x48:', createIcon(48));
console.log('128x128:', createIcon(128));
```

## 🎯 Usage

### Udemy Extraction

1. **Navigate to Udemy**
   - Go to `udemy.com/my-courses/learning/`
   - Click the extension icon

2. **Scan Page**
   - Click "Scan Page" to analyze available data
   - View counts of courses, progress, etc.

3. **Extract Data**
   - Click individual "Extract" buttons for specific data types
   - Or use "Export JSON" to get all data

### YouTube Extraction

1. **Navigate to YouTube**
   - Go to `youtube.com/feed/library` (for playlists)
   - Or `youtube.com/playlist?list=YOUR_PLAYLIST_ID` (specific playlist)
   - Or `youtube.com/feed/history` (watch history)

2. **Scan and Extract**
   - Click "Scan Page" to see available data
   - Extract playlists, videos, or watch history
   - Extension handles pagination automatically

### Amazon Extraction

1. **Navigate to Amazon Wishlists**
   - Go to `amazon.com/hz/wishlist/` (Your Lists)
   - Or specific wishlist URL: `amazon.com/hz/wishlist/ls/YOUR_LIST_ID`

2. **Extract Wishlist Data**
   - Click "Scan Page" to analyze wishlists and items
   - Extract wishlists, wishlist items, or cart items
   - Supports multiple Amazon regions (US, UK, DE, FR, CA, etc.)

### Multi-Page Extraction

- Right-click on course/playlist pages
- Select "Scan All Pages" for bulk extraction
- Extension will navigate through pagination automatically

### Generic Web Pages

- Works on any webpage
- Analyzes page structure and suggests extraction patterns
- Great for discovering new learning platforms

## 📊 Data Format

Extracted data follows this structure:

### Udemy Data
```json
{
  "courses": [
    {
      "id": "unique-course-id",
      "title": "Course Title",
      "instructor": "Instructor Name",
      "progress": 75,
      "url": "https://...",
      "category": "Programming",
      "duration": "5 hours",
      "rating": 4.5,
      "extractedAt": "2025-06-28T...",
      "platform": "Udemy"
    }
  ],
  "progress": [...],
  "categories": [...],
  "instructors": [...]
}
```

### YouTube Data
```json
{
  "playlists": [
    {
      "id": "playlist-id",
      "title": "My Learning Playlist",
      "description": "Collection of programming tutorials",
      "url": "https://youtube.com/playlist?list=...",
      "privacy": "private",
      "videoCount": 25,
      "videos": [
        {
          "id": "video-id",
          "title": "JavaScript Tutorial",
          "url": "https://youtube.com/watch?v=...",
          "duration": "10:45",
          "channel": "Tech Channel",
          "playlistIndex": 1,
          "platform": "YouTube"
        }
      ],
      "platform": "YouTube"
    }
  ],
  "watchHistory": [...],
  "channels": [...]
}
```

### Amazon Data
```json
{
  "wishlists": [
    {
      "id": "wishlist-id",
      "title": "Programming Books",
      "privacy": "private",
      "itemCount": 15,
      "region": "US",
      "items": [
        {
          "id": "product-asin",
          "asin": "B08N5WRWNW",
          "title": "Clean Code Book",
          "url": "https://amazon.com/dp/...",
          "price": {
            "current": 29.99,
            "original": 39.99,
            "currency": "$"
          },
          "availability": "in-stock",
          "rating": 4.5,
          "addedDate": "2025-01-15T...",
          "platform": "Amazon"
        }
      ],
      "platform": "Amazon"
    }
  ],
  "cartItems": [...],
  "registryItems": [...]
}
```

## 🔧 Advanced Configuration

### YouTube API Integration (Optional)

For enhanced YouTube data extraction, you can optionally configure YouTube Data API v3:

1. **Get API Key**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing
   - Enable YouTube Data API v3
   - Create credentials (API Key)

2. **Configure Extension**
   - Add API key to extension options
   - Enables extraction of public playlists via API
   - Provides additional metadata not available through scraping

3. **Benefits**
   - More reliable data for public playlists
   - Additional metadata (view counts, likes, etc.)
   - Less affected by YouTube UI changes

**Note:** API has quotas and rate limits. Browser extraction works without API for most use cases.

### Amazon Anti-Scraping Considerations

Amazon implements various anti-scraping measures:

- **Rate Limiting**: Extension includes 2-second delays between requests
- **Captcha**: May appear during heavy extraction - solve manually if needed
- **Session Limits**: Long extraction sessions may be blocked
- **IP Blocking**: Avoid rapid successive extractions

**Best Practices:**
- Extract wishlists during normal browsing sessions
- Take breaks between large extractions
- Use during off-peak hours when possible

## 🔧 Customization

### Adding New Platforms

1. **Create Platform Script**
   ```javascript
   // content-scripts/coursera.js
   class CourseraExtractor {
     constructor() {
       this.platform = 'Coursera';
       this.selectors = this.getCourseraSelectors();
       this.init();
     }
     
     getCourseraSelectors() {
       return {
         courseTiles: ['.course-card', '.specialization-card'],
         courseTitle: ['h2 a', '.course-name'],
         // ... other selectors
       };
     }
   }
   ```

2. **Update Manifest**
   ```json
   {
     "content_scripts": [
       {
         "matches": ["https://www.coursera.org/*"],
         "js": ["content-scripts/coursera.js"]
       }
     ]
   }
   ```

### Modifying Udemy Selectors

If Udemy changes their page structure:

```javascript
// In udemy.js, update selectors
courseTiles: [
  '[data-purpose="enrolled-course-card"]',  // Current
  '.new-course-card-class',                 // Add new selector
  '.course-card--course-card--2H1Zc'       // Keep old as fallback
]
```

## 🛠️ Development Tips

### Testing

1. **Console Debugging**
   ```javascript
   // Open DevTools on target page
   // Test selectors directly
   document.querySelectorAll('[data-purpose="enrolled-course-card"]')
   ```

2. **Extension Debugging**
   - Right-click extension icon → "Inspect popup"
   - Check "background page" in `chrome://extensions/`
   - View content script errors in page console

### Content Script Communication

```javascript
// From popup to content script
chrome.tabs.sendMessage(tabId, {
  action: 'extractData',
  dataType: 'courses'
});

// From content script to popup
chrome.runtime.sendMessage({
  action: 'notifyProgress',
  progress: 50
});
```

## 🚨 Troubleshooting

### Common Issues

1. **"Could not establish connection"**
   - Refresh the target page
   - Content scripts need page reload after extension installation

2. **No data found**
   - Check if selectors match current page structure
   - Verify you're on the correct page type

3. **Permissions errors**
   - Ensure host permissions in manifest match the sites
   - Some sites may block content scripts

### Platform-Specific Issues

#### YouTube
- **Private playlists not found**: Make sure you're logged into YouTube
- **Infinite scroll not working**: Extension handles this automatically, but very large playlists may timeout
- **API rate limits**: If using YouTube API, check your quota limits

#### Amazon
- **Wishlist access denied**: Ensure you're logged into your Amazon account
- **Rate limiting**: Amazon has anti-scraping measures - extension includes delays
- **Regional differences**: Make sure you're on the correct Amazon domain for your region
- **Private wishlists**: Only your own private wishlists can be extracted

### Debugging Steps

1. Check console for errors
2. Verify selectors work manually
3. Test on different course/playlist/wishlist pages
4. Check if page has loaded completely
5. Disable other extensions that might interfere

## 🔮 Future Enhancements

- **Auto-categorization** using AI/ML
- **Skill tree visualization** in popup
- **Progress tracking** over time
- **Integration with external tools** (Notion, Airtable)
- **Collaborative features** for team learning
- **Mobile app companion**

## 📝 Notes for Sphere Grid Integration

This extension provides the data collection layer. For your Sphere Grid system, you'll want to:

1. **Import extracted JSON** into your main application
2. **Map courses to skill nodes** based on categories/content
3. **Define skill dependencies** (prerequisites)
4. **Create unlock logic** based on completion hours
5. **Design the FFX-style grid UI** for visualization

The extracted data includes all the metadata needed to build your skill tree relationships and progression system.

## 🤝 Contributing

To extend this for other platforms:
1. Study the target site's HTML structure
2. Create a new content script following the pattern
3. Update manifest permissions
4. Test thoroughly on different page types
5. Submit PR with documentation

---

**Happy Learning and Sphere Grid Building! 🌐✨**