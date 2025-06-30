# 🎯 Usage
Basic Extraction

Navigate to Udemy

Go to udemy.com/my-courses/learning/
Click the extension icon


Scan Page

Click "Scan Page" to analyze available data
View counts of courses, progress, etc.


Extract Data

Click individual "Extract" buttons for specific data types
Or use "Export JSON" to get all data



Multi-Page Extraction

Right-click on course pages
Select "Scan All Course Pages" for bulk extraction
Extension will navigate through pagination automatically

Generic Web Pages

Works on any webpage
Analyzes page structure and suggests extraction patterns
Great for discovering new learning platforms

# 📊 Data Format
Extracted data follows this structure:

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

# Modifying Udemy Selectors
If Udemy changes their page structure:
```js
// In udemy.js, update selectors
courseTiles: [
  '[data-purpose="enrolled-course-card"]',  // Current
  '.new-course-card-class',                 // Add new selector
  '.course-card--course-card--2H1Zc'       // Keep old as fallback
]
```

# 🛠️ Development Tips
Testing

1. Console Debugging
```js
// Open DevTools on target page
// Test selectors directly
document.querySelectorAll('[data-purpose="enrolled-course-card"]')
```
2. Extension Debugging

Right-click extension icon → "Inspect popup"
Check "background page" in chrome://extensions/
View content script errors in page console

Content Script Communication
```js
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

# 🚨 Troubleshooting
Common Issues

"Could not establish connection"

Refresh the target page
Content scripts need page reload after extension installation


No data found

Check if selectors match current page structure
Verify you're on the correct page type


Permissions errors

Ensure host permissions in manifest match the sites
Some sites may block content scripts

# Debugging Steps

Check console for errors
Verify selectors work manually
Test on different course pages
Check if page has loaded completely

# 🔮 Future Enhancements

Auto-categorization using AI/ML
Skill tree visualization in popup
Progress tracking over time
Integration with external tools (Notion, Airtable)
Collaborative features for team learning
Mobile app companion

📝 Data Extraction Stories & Tasks:

MJOL-19: Multi-Platform Learning Data Extraction (Story)
MJOL-20: YouTube Playlist Data Extraction (Task)
MJOL-21: Instagram/Facebook Message Research (Task)
MJOL-22: Amazon Wishlist Data Extraction (Task)
MJOL-23: Learning Platform Extraction (Task)


# 🛠️ Data Extraction Approaches for Each Platform:
## 🎥 YouTube Playlists:
✅ Feasible

YouTube Data API v3 - For public playlists
Browser Extension - For private playlists and watch history
Challenge: Rate limiting, authentication for private content

## 📱 Instagram/Facebook Messages:
⚠️ Highly Challenging

No official API for personal messages
Data Export method - Use "Download Your Data" features
Browser extension - Possible but violates ToS
Recommendation: Focus on export file processing

## 🛒 Amazon Wishlist:
✅ Feasible

Public wishlists - Direct web scraping
Private wishlists - Browser extension with user session
Challenge: Anti-scraping measures, rate limiting

## 🎓 Learning Sites (learncantrill.io, dev.io):
✅ Feasible
