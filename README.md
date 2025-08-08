# 🧘‍♀️ Global Pilates Studio Finder

A comprehensive web application to discover Pilates studios around the world. Find studios near you, explore amenities, read reviews, and connect with the global Pilates community.

## 🌟 Features

- **Location-Based Search**: Enter your zip code or use geolocation to find nearby studios
- **Global Coverage**: Pilates studios from major cities worldwide
- **Interactive Map**: View studio locations on an integrated map
- **Detailed Studio Information**: Reviews, amenities, contact details, and descriptions
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI**: Clean, intuitive interface with smooth animations

## 🚀 Live Demo

Visit the live application: [https://chenz4027.github.io/pilatesStudios](https://chenz4027.github.io/pilatesStudios)

## 🛠️ Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Mapping**: Leaflet.js with OpenStreetMap
- **Styling**: Custom CSS with CSS Grid and Flexbox
- **Deployment**: GitHub Pages with automated workflow
- **APIs**: Geolocation API for user location detection

## 🏗️ Project Structure

```
pilatesStudios/
├── index.html          # Main application page
├── styles.css          # All styling and responsive design
├── script.js           # Core JavaScript functionality
├── .github/
│   └── workflows/
│       └── deploy.yml  # GitHub Pages deployment
└── README.md           # Project documentation
```

## 🎯 How to Use

1. **Search by Location**: Enter your zip code or city name in the search box
2. **Use Current Location**: Click "Use My Location" for automatic location detection
3. **Browse Studios**: View results in list or map format
4. **Explore Details**: Click on any studio for detailed information
5. **Get Directions**: Click "Get Directions" to open in Google Maps

## 🌍 Featured Locations

The application includes Pilates studios from:
- New York, USA
- Los Angeles, USA  
- Chicago, USA
- London, UK
- Sydney, Australia
- Milan, Italy
- Tokyo, Japan
- São Paulo, Brazil

## 🚀 Getting Started

### Prerequisites
- Modern web browser with JavaScript enabled
- Internet connection for map tiles and geolocation

### Local Development
1. Clone the repository:
   ```bash
   git clone https://github.com/chenz4027/pilatesStudios.git
   ```

2. Navigate to the project directory:
   ```bash
   cd pilatesStudios
   ```

3. Open `index.html` in your web browser or serve with a local server:
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js (if you have serve installed)
   npx serve .
   ```

4. Visit `http://localhost:8000` in your browser

## 🔧 Customization

### Adding New Studios
Edit the `pilatesStudios` array in `script.js`:

```javascript
{
    id: 9,
    name: "Your Studio Name",
    address: "123 Your Street, Your City",
    lat: 40.7589,  // Latitude
    lng: -73.9851, // Longitude
    rating: 4.8,
    reviews: 127,
    phone: "(555) 123-4567",
    website: "www.yourstudio.com",
    description: "Studio description...",
    amenities: ["Amenity 1", "Amenity 2"],
    image: "🏢",
    zipCodes: ["12345", "12346"]
}
```

### Styling Changes
Modify `styles.css` to customize:
- Color scheme (update CSS custom properties)
- Layout and spacing
- Animation effects
- Responsive breakpoints

## 📱 Responsive Design

The application is fully responsive and optimized for:
- 📱 Mobile devices (320px and up)
- 📱 Tablets (768px and up)  
- 💻 Desktop (1024px and up)
- 🖥️ Large screens (1200px and up)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Chen Zhang**
- Portfolio: [https://chenz4027.github.io](https://chenz4027.github.io)
- GitHub: [@chenz4027](https://github.com/chenz4027)

## 🙏 Acknowledgments

- Leaflet.js for excellent mapping capabilities
- OpenStreetMap for map tiles
- Google Fonts for typography
- The global Pilates community for inspiration

---

*Built with ❤️ for the Pilates community worldwide*