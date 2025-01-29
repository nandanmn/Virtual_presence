# 🚀 Virtual Presence Project
> A web-based Augmented Reality application for screen sharing and image display using AR markers.

## 👥 Project Duo
- Nagaraju P
- Nandan M N

🎓 Guide: Mr. DEEPAK P, Assistant Professor, Dept. of CS & Engineering, NIEIT, Mysore

## 📁 Repository Contents
```
Virtual_Presence/
│
├── 📑 index.html             # Main webpage
├── 🎨 styles.css             # CSS styling
├── ⚙️ script.js              # JavaScript functionality
└── 🎯 pattern-Batman.patt    # AR marker pattern
```

## 🛠️ Setup Instructions
1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/Virtual_Presence.git
   ```

2. Navigate to project directory
   ```bash
   cd Virtual_presence
   ```

3. Start a local server:
   ```bash
   python -m http.server 8000
   ```

4. Access the website:
   - 🌐 Open Chrome browser
   - 🔗 Visit: `localhost:8000`
   - 📷 Grant camera access when prompted

## ⚙️ Configuration
### Remove.bg API Setup
1. 📝 Create an account at [Remove.bg](https://www.remove.bg/)
2. 🔑 Get your API key
3. 🔄 Update the API key in `script.js`:
   ```javascript
   headers: {
       'X-Api-Key': 'your-api-key-here'
   }
   ```

## ✨ Features
### 🖥️ Screen Share AR
- 📡 Real-time screen sharing in AR environment
- 📸 Screenshot capture functionality
- 👁️ Live preview of shared screen
- 🎯 Marker-based positioning

### 🖼️ Image Upload AR
- 🎨 Image display in AR
- 🎭 Background removal capability
- 📷 AR view capture
- 📊 Multiple image format support

## 💻 System Requirements
- 📹 Computer with webcam
- 🌐 Chrome browser (latest version)
- 🐍 Python installed
- 🌍 Active internet connection
- 📱 Minimum resolution: 768px
- ⚡ JavaScript enabled

## ❗ Troubleshooting
### 📷 Camera Issues
- Enable camera permissions in browser
- Ensure camera isn't in use by other applications
- Verify webcam connection

### 🖥️ Screen Share Problems
- Accept screen sharing prompt
- Try sharing specific windows
- Use supported browser (Chrome recommended)

### 🎯 AR Marker Detection
- Maintain good lighting
- Keep marker steady
- Ensure marker is fully visible
- Clean webcam lens

### 🎨 Background Removal
- Check internet connectivity
- Verify API key configuration
- Use supported image formats
- Reduce image size if necessary

## 💡 Usage Tips
### 🧭 Navigation
- Access features via top navigation menu
- 🏠 "AR Experience" - Home page
- 🖥️ "Screen Share AR" - Screen sharing feature
- 🖼️ "Image Upload AR" - Image upload feature
- ℹ️ "About" - Project information

### ⚡ Performance Optimization
- Use Chrome browser
- Close unnecessary tabs
- Ensure adequate lighting
- Maintain stable internet connection
- Keep AR marker in good condition

## 🔧 Technologies Used
- 🎮 A-Frame (v1.2.0)
- 🎯 AR.js
- 🎨 HTML5 Canvas API
- 📹 Screen Capture API
- 🎭 Remove.bg API
- 📸 HTML2Canvas

---
Thank you for reviewing our project!
