// Global variables
let map;
let userLocation = null;
let currentStudios = [];
let googleMap = null;
let placesService = null;
let geocoder = null;

// Free APIs configuration
const USE_FREE_APIS = true; // Set to true to use free OpenStreetMap + Nominatim APIs
const NOMINATIM_BASE_URL = 'https://nominatim.openstreetmap.org';
const OVERPASS_BASE_URL = 'https://overpass-api.de/api/interpreter';

// Ontario Pilates Studios Data - Default map shows all Ontario locations
const pilatesStudios = [
    {
        id: 1,
        name: "Toronto Core Pilates",
        address: "123 King Street West, Toronto, ON M5H 1A1",
        lat: 43.6462,
        lng: -79.3937,
        rating: 4.8,
        reviews: 127,
        phone: "(416) 123-4567",
        website: "www.torontocorepilates.com",
        description: "Downtown Toronto's premier Pilates studio with state-of-the-art equipment and certified instructors. Located in the financial district.",
        amenities: ["Reformer Classes", "Mat Pilates", "Private Sessions", "Corporate Programs"],
        image: "🏙️",
        zipCodes: ["M5H", "M5G", "M5C", "M5E", "M5J"]
    },
    {
        id: 2,
        name: "Ottawa Wellness Studio",
        address: "456 Sparks Street, Ottawa, ON K1P 5B7",
        lat: 45.4215,
        lng: -75.6993,
        rating: 4.6,
        reviews: 89,
        phone: "(613) 234-5678",
        website: "www.ottawawellness.com",
        description: "Capital city's favorite Pilates destination offering both classical and contemporary methods near Parliament Hill.",
        amenities: ["Classical Pilates", "Contemporary Methods", "Government District", "Lunch Classes"],
        image: "🏛️",
        zipCodes: ["K1P", "K1R", "K1S", "K1N", "K1G"]
    },
    {
        id: 3,
        name: "Hamilton Harmony Pilates",
        address: "789 James Street North, Hamilton, ON L8L 1J9",
        lat: 43.2557,
        lng: -79.8711,
        rating: 4.7,
        reviews: 156,
        phone: "(905) 345-6789",
        website: "www.hamiltonharmony.com",
        description: "Welcoming studio in Hamilton's vibrant arts district, perfect for beginners and advanced practitioners alike.",
        amenities: ["Beginner Friendly", "Arts District", "Community Classes", "Creative Environment"],
        image: "🎨",
        zipCodes: ["L8L", "L8R", "L8S", "L8N", "L8P"]
    },
    {
        id: 4,
        name: "London Movement Studio",
        address: "321 Richmond Street, London, ON N6A 3C4",
        lat: 42.9849,
        lng: -81.2453,
        rating: 4.5,
        reviews: 94,
        phone: "(519) 456-7890",
        website: "www.londonmovement.com",
        description: "Forest City's modern Pilates studio focusing on functional movement and rehabilitation near Western University.",
        amenities: ["Physiotherapy Integration", "Functional Movement", "Rehabilitation", "Student Discounts"],
        image: "🌳",
        zipCodes: ["N6A", "N6B", "N6C", "N6G", "N6H"]
    },
    {
        id: 5,
        name: "Windsor Waterfront Pilates",
        address: "654 Riverside Drive, Windsor, ON N9A 5K4",
        lat: 42.3149,
        lng: -83.0364,
        rating: 4.9,
        reviews: 78,
        phone: "(519) 567-8901",
        website: "www.windsorwaterfront.com",
        description: "Stunning Detroit River views while you strengthen your core in this border city gem with unique international atmosphere.",
        amenities: ["Waterfront Views", "Border City", "International Atmosphere", "River Views"],
        image: "🌊",
        zipCodes: ["N9A", "N9B", "N9C", "N8S", "N8T"]
    },
    {
        id: 6,
        name: "Kingston Limestone Pilates",
        address: "987 Princess Street, Kingston, ON K7L 1H1",
        lat: 44.2312,
        lng: -76.4860,
        rating: 4.6,
        reviews: 112,
        phone: "(613) 678-9012",
        website: "www.kingstonlimestone.com",
        description: "Historic limestone building housing a modern Pilates studio near Queen's University and the beautiful Kingston waterfront.",
        amenities: ["Historic Building", "University Area", "Student Discounts", "Waterfront Proximity"],
        image: "🏰",
        zipCodes: ["K7L", "K7M", "K7N", "K7K", "K7P"]
    },
    {
        id: 7,
        name: "Mississauga Mind-Body Studio",
        address: "159 Lakeshore Road East, Mississauga, ON L5G 1E5",
        lat: 43.5890,
        lng: -79.5656,
        rating: 4.7,
        reviews: 134,
        phone: "(905) 789-0123",
        website: "www.mississaugamindbody.com",
        description: "Holistic Pilates approach in the heart of Mississauga with beautiful Lake Ontario proximity and meditation integration.",
        amenities: ["Holistic Approach", "Lake Ontario Views", "Meditation Classes", "Mindfulness Integration"],
        image: "🧘‍♀️",
        zipCodes: ["L5G", "L5H", "L5J", "L5A", "L5B"]
    },
    {
        id: 8,
        name: "Thunder Bay Northern Pilates",
        address: "246 Red River Road, Thunder Bay, ON P7B 1A8",
        lat: 48.3822,
        lng: -89.2461,
        rating: 4.4,
        reviews: 67,
        phone: "(807) 890-1234",
        website: "www.thunderbaynorthern.com",
        description: "Northern Ontario's premier Pilates destination with a focus on outdoor lifestyle integration and wilderness connection.",
        amenities: ["Outdoor Integration", "Northern Ontario", "Wilderness Connection", "Seasonal Programs"],
        image: "🏔️",
        zipCodes: ["P7B", "P7C", "P7E", "P7A", "P7G"]
    }
];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 App starting...');
    initializeApp();
    loadFeaturedStudios();
    setupEventListeners();
    loadGoogleMapsAPI();
    
    // Test map immediately for debugging
    setTimeout(() => {
        console.log('🧪 Testing map initialization...');
        testMapCreation();
    }, 2000);
});

function initializeApp() {
    console.log('🍁 Pilates Studio Finder initialized for Ontario, Canada');
    
    // Load Ontario studios as default data
    currentStudios = [...pilatesStudios]; // Show all Ontario studios by default
    
    console.log('📍 Loaded', currentStudios.length, 'Ontario studios by default');
}

// Load Google Maps API dynamically
function loadGoogleMapsAPI() {
    // For demo purposes, we'll show an alert about API key setup
    // In production, you would load the actual Google Maps API
    console.log('Google Maps API integration ready - API key setup required');
    
    // Simulate Google Maps API availability
    window.google = {
        maps: {
            places: {
                PlacesService: function() {
                    return {
                        nearbySearch: simulateNearbySearch,
                        getDetails: simulateGetDetails
                    };
                }
            },
            Geocoder: function() {
                return {
                    geocode: simulateGeocode
                };
            }
        }
    };
}

function setupEventListeners() {
    // Search functionality
    document.getElementById('searchBtn').addEventListener('click', handleSearch);
    document.getElementById('locationInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });

    // Use location button
    document.getElementById('useLocationBtn').addEventListener('click', useCurrentLocation);

    // View toggle buttons
    document.getElementById('listViewBtn').addEventListener('click', () => toggleView('list'));
    document.getElementById('mapViewBtn').addEventListener('click', () => toggleView('map'));

    // Modal close functionality
    document.querySelector('.close').addEventListener('click', closeModal);
    window.addEventListener('click', function(e) {
        const modal = document.getElementById('studioModal');
        if (e.target === modal) {
            closeModal();
        }
    });
}

async function handleSearch() {
    const locationInput = document.getElementById('locationInput');
    const query = locationInput.value.trim();
    
    if (!query) {
        alert('Please enter a zip code or city name');
        return;
    }

    showLoading(true);
    
    try {
        // First, geocode the location
        const location = await geocodeLocation(query);
        if (!location) {
            throw new Error('Location not found');
        }
        
        userLocation = location;
        
        // Search for Pilates studios near this location
        const studios = await searchNearbyPilatesStudios(location);
        displaySearchResults(studios, query);
    } catch (error) {
        console.error('Search error:', error);
        alert('Error searching for studios. Please try again.');
    } finally {
        showLoading(false);
    }
}

function searchStudios(query) {
    // Simple search logic - in a real app, this would use geocoding APIs
    const normalizedQuery = query.toLowerCase().replace(/\s+/g, '');
    
    return pilatesStudios.filter(studio => {
        // Check zip codes
        const zipMatch = studio.zipCodes.some(zip => 
            zip.toLowerCase().replace(/\s+/g, '').includes(normalizedQuery)
        );
        
        // Check address
        const addressMatch = studio.address.toLowerCase().includes(query.toLowerCase());
        
        // Check city names
        const cityMatch = studio.address.toLowerCase().includes(query.toLowerCase());
        
        return zipMatch || addressMatch || cityMatch;
    });
}

async function useCurrentLocation() {
    if (!navigator.geolocation) {
        alert('Geolocation is not supported by this browser.');
        return;
    }

    showLoading(true);
    
    navigator.geolocation.getCurrentPosition(
        async function(position) {
            userLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            
            try {
                // Search for Pilates studios near current location
                const studios = await searchNearbyPilatesStudios(userLocation);
                displaySearchResults(studios, 'your location');
            } catch (error) {
                console.error('Error finding nearby studios:', error);
                // Fallback to sample data
                const nearbyStudios = findNearbyStudios(userLocation);
                displaySearchResults(nearbyStudios, 'your location');
            }
            
            showLoading(false);
        },
        function(error) {
            console.error('Geolocation error:', error);
            alert('Unable to get your location. Please enter your zip code manually.');
            showLoading(false);
        }
    );
}

function findNearbyStudios(location) {
    // Calculate distance to all studios and return closest ones
    return pilatesStudios
        .map(studio => ({
            ...studio,
            distance: calculateDistance(location.lat, location.lng, studio.lat, studio.lng)
        }))
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 5); // Return top 5 closest
}

function calculateDistance(lat1, lng1, lat2, lng2) {
    // Haversine formula for calculating distance between two points
    const R = 3959; // Earth's radius in miles
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}

function displaySearchResults(studios, searchTerm) {
    currentStudios = studios;
    const resultsSection = document.getElementById('resultsSection');
    const studioList = document.getElementById('studioList');
    
    if (studios.length === 0) {
        resultsSection.style.display = 'block';
        studioList.innerHTML = `
            <div style="text-align: center; padding: 2rem; color: #666;">
                <p>No studios found near "${searchTerm}". Try a different location or browse our featured studios below.</p>
            </div>
        `;
        return;
    }

    resultsSection.style.display = 'block';
    
    // Update results header
    document.querySelector('.results-header h3').textContent = 
        `${studios.length} Pilates Studio${studios.length !== 1 ? 's' : ''} Near "${searchTerm}"`;
    
    // Generate studio cards
    studioList.innerHTML = studios.map(studio => createStudioCard(studio)).join('');
    
    // Update currentStudios so map can access the data
    currentStudios = studios;
    
    // Add click listeners to studio cards
    document.querySelectorAll('.studio-card').forEach(card => {
        card.addEventListener('click', function() {
            const studioId = this.dataset.studioId;
            showStudioDetails(studioId);
        });
    });

    // Scroll to results
    resultsSection.scrollIntoView({ behavior: 'smooth' });
}

function createStudioCard(studio) {
    const stars = '★'.repeat(Math.floor(studio.rating)) + '☆'.repeat(5 - Math.floor(studio.rating));
    const distanceText = studio.distance ? `${studio.distance.toFixed(1)} miles away` : '';
    const isRealData = studio.source === 'OpenStreetMap';
    
    const dataSourceBadge = isRealData ? 
        '<span class="tag" style="background: #4AF450; color: white;">🌍 Real Data</span>' : 
        '<span class="tag" style="background: #9A8B95; color: white;">📋 Sample</span>';
    
    return `
        <div class="studio-card" data-studio-id="${studio.id}">
            <div class="studio-header">
                <div class="studio-info">
                    <h4>${studio.name}</h4>
                    <div class="studio-address">${studio.address}</div>
                    ${distanceText ? `<div class="studio-distance">${distanceText}</div>` : ''}
                </div>
                <div class="studio-rating">
                    <div class="stars">${stars}</div>
                    <div class="rating-text">${studio.rating} (${studio.reviews} reviews)</div>
                </div>
            </div>
            <div class="studio-tags">
                ${dataSourceBadge}
                ${studio.amenities.slice(0, 2).map(amenity => `<span class="tag">${amenity}</span>`).join('')}
                ${studio.amenities.length > 2 ? `<span class="tag">+${studio.amenities.length - 2} more</span>` : ''}
            </div>
        </div>
    `;
}

function loadFeaturedStudios() {
    const featuredGrid = document.getElementById('featuredGrid');
    // Show 6 featured studios
    const featuredStudios = pilatesStudios.slice(0, 6);
    
    featuredGrid.innerHTML = featuredStudios.map(studio => `
        <div class="featured-card" onclick="showStudioDetails(${studio.id})">
            <div class="featured-image">${studio.image}</div>
            <div class="featured-content">
                <h4>${studio.name}</h4>
                <p>${studio.address}</p>
                <div class="studio-rating">
                    <span class="stars">${'★'.repeat(Math.floor(studio.rating))}</span>
                    <span class="rating-text">${studio.rating} (${studio.reviews} reviews)</span>
                </div>
            </div>
        </div>
    `).join('');
}

function toggleView(viewType) {
    console.log('🔄 Toggling view to:', viewType);
    const listView = document.getElementById('studioList');
    const mapView = document.getElementById('mapContainer');
    const listBtn = document.getElementById('listViewBtn');
    const mapBtn = document.getElementById('mapViewBtn');
    
    console.log('📦 Elements found:', {
        listView: !!listView,
        mapView: !!mapView,
        listBtn: !!listBtn,
        mapBtn: !!mapBtn
    });
    
    if (viewType === 'list') {
        listView.style.display = 'block';
        mapView.style.display = 'none';
        listBtn.classList.add('active');
        mapBtn.classList.remove('active');
        console.log('📋 Switched to list view');
    } else {
        listView.style.display = 'none';
        mapView.style.display = 'block';
        listBtn.classList.remove('active');
        mapBtn.classList.add('active');
        console.log('🗺️ Switched to map view, initializing map...');
        
        // Add a small delay to ensure container is visible
        setTimeout(() => {
            initializeMap();
        }, 100);
    }
}

function initializeMap() {
    console.log('🗺️ Initializing map...');
    console.log('📍 Current studios:', currentStudios.length);
    console.log('📍 User location:', userLocation);
    
    if (map) {
        map.remove();
    }
    
    // Default center (Ontario, Canada - Toronto area)
    let center = [43.8828, -79.0079]; // Ontario center coordinates
    let zoom = 7; // Good zoom level to see all of Ontario
    
    // If we have search results, center on them
    if (currentStudios.length > 0) {
        if (userLocation) {
            center = [userLocation.lat, userLocation.lng];
            console.log('🎯 Centering on user location:', center);
            zoom = 10; // Closer zoom for search results
        } else {
            center = [currentStudios[0].lat, currentStudios[0].lng];
            console.log('🎯 Centering on first studio:', center);
            zoom = 10;
        }
    }
    
    console.log('🗺️ Creating map at center:', center, 'zoom:', zoom);
    
    // Check if Leaflet is available
    if (typeof L === 'undefined') {
        console.error('❌ Leaflet library not available!');
        return;
    }
    
    // Check container
    const container = document.getElementById('mapContainer');
    if (!container) {
        console.error('❌ Map container not found!');
        return;
    }
    
    console.log('📦 Container dimensions:', {
        width: container.offsetWidth,
        height: container.offsetHeight,
        display: getComputedStyle(container).display
    });
    
    try {
        map = L.map('mapContainer').setView(center, zoom);
        console.log('✅ Map object created');
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);
        console.log('✅ Tiles added to map');
    } catch (error) {
        console.error('❌ Error creating map:', error);
        return;
    }
    
    // Add markers for studios
    const studiesToShow = currentStudios.length > 0 ? currentStudios : pilatesStudios.slice(0, 10);
    
    studiesToShow.forEach(studio => {
        // Create different icons for real vs simulated data
        const isRealData = studio.source === 'OpenStreetMap';
        const icon = isRealData ? 
            L.icon({
                iconUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTAiIGZpbGw9IiM0QUY0NTAiLz4KPGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMyIgZmlsbD0id2hpdGUiLz4KPC9zdmc+',
                iconSize: [24, 24],
                iconAnchor: [12, 12]
            }) : 
            L.icon({
                iconUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTAiIGZpbGw9IiM5QThCOTUiLz4KPGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMyIgZmlsbD0id2hpdGUiLz4KPC9zdmc+',
                iconSize: [20, 20],
                iconAnchor: [10, 10]
            });
        
        const marker = L.marker([studio.lat, studio.lng], { icon }).addTo(map);
        
        const dataSourceBadge = isRealData ? 
            '<div style="background: #4AF450; color: white; padding: 0.2rem 0.5rem; border-radius: 12px; font-size: 0.8rem; margin: 0.5rem 0;">🌍 Real OpenStreetMap Data</div>' : 
            '<div style="background: #9A8B95; color: white; padding: 0.2rem 0.5rem; border-radius: 12px; font-size: 0.8rem; margin: 0.5rem 0;">📋 Sample Data</div>';
        
        marker.bindPopup(`
            <div style="text-align: center; min-width: 200px;">
                <h4 style="margin: 0 0 0.5rem 0; color: #333;">${studio.name}</h4>
                <p style="margin: 0 0 0.5rem 0; color: #666; font-size: 0.9rem;">${studio.address}</p>
                ${dataSourceBadge}
                <div style="margin: 0.5rem 0;">
                    <span style="color: #ffd700;">★</span> ${studio.rating} (${studio.reviews} reviews)
                </div>
                <button onclick="showStudioDetails('${studio.id}')" style="
                    background: #9A8B95; 
                    color: #F4F1F4; 
                    border: none; 
                    padding: 0.5rem 1rem; 
                    border-radius: 6px; 
                    cursor: pointer;
                    font-weight: 500;
                ">View Details</button>
            </div>
        `);
    });
    
    // Add user location marker if available
    if (userLocation) {
        L.marker([userLocation.lat, userLocation.lng], {
            icon: L.icon({
                iconUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTAiIGZpbGw9IiM5QThCOTUiLz4KPGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMyIgZmlsbD0iI0Y0RjFGNCIvPgo8L3N2Zz4K',
                iconSize: [20, 20],
                iconAnchor: [10, 10]
            })
        }).addTo(map).bindPopup('Your Location');
    }
}

function showStudioDetails(studioId) {
    // Look in current search results first, then fallback to sample data
    let studio = currentStudios.find(s => s.id === studioId);
    if (!studio) {
        studio = pilatesStudios.find(s => s.id === studioId);
    }
    if (!studio) return;
    
    const modal = document.getElementById('studioModal');
    const studioDetails = document.getElementById('studioDetails');
    
    const stars = '★'.repeat(Math.floor(studio.rating)) + '☆'.repeat(5 - Math.floor(studio.rating));
    
    studioDetails.innerHTML = `
        <div style="text-align: center; margin-bottom: 2rem;">
            <div style="font-size: 4rem; margin-bottom: 1rem;">${studio.image}</div>
            <h2 style="color: #333; margin-bottom: 0.5rem;">${studio.name}</h2>
            <p style="color: #666; margin-bottom: 1rem;">${studio.address}</p>
            <div style="display: flex; align-items: center; justify-content: center; gap: 1rem; margin-bottom: 2rem;">
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                    <span style="color: #ffd700; font-size: 1.2rem;">${stars}</span>
                    <span style="color: #333; font-weight: 600;">${studio.rating}</span>
                    <span style="color: #666;">(${studio.reviews} reviews)</span>
                </div>
            </div>
        </div>
        
        <div style="background: #F4F1F4; padding: 1.5rem; border-radius: 12px; margin-bottom: 2rem;">
            <h3 style="color: #7A7175; margin-bottom: 1rem;">About This Studio</h3>
            <p style="color: #A8A1A8; line-height: 1.6;">${studio.description}</p>
        </div>
        
        <div style="margin-bottom: 2rem;">
            <h3 style="color: #7A7175; margin-bottom: 1rem;">Amenities & Services</h3>
            <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                ${studio.amenities.map(amenity => `
                    <span style="
                        background: #F4F1F4; 
                        color: #9A8B95; 
                        padding: 0.5rem 1rem; 
                        border-radius: 20px; 
                        font-size: 0.9rem;
                        font-weight: 500;
                    ">${amenity}</span>
                `).join('')}
            </div>
        </div>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 2rem;">
            <div style="background: white; padding: 1rem; border-radius: 8px; text-align: center; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                <div style="font-size: 1.5rem; margin-bottom: 0.5rem;">📞</div>
                <div style="font-weight: 600; color: #7A7175;">Phone</div>
                <div style="color: #9A8B95;">${studio.phone}</div>
            </div>
            <div style="background: white; padding: 1rem; border-radius: 8px; text-align: center; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                <div style="font-size: 1.5rem; margin-bottom: 0.5rem;">🌐</div>
                <div style="font-weight: 600; color: #7A7175;">Website</div>
                <div><a href="http://${studio.website}" target="_blank" style="color: #9A8B95; text-decoration: none;">${studio.website}</a></div>
            </div>
        </div>
        
        <div style="text-align: center;">
            <button onclick="window.open('https://maps.google.com/?q=${encodeURIComponent(studio.address)}', '_blank')" style="
                background: #9A8B95; 
                color: #F4F1F4; 
                border: none; 
                padding: 1rem 2rem; 
                border-radius: 10px; 
                font-size: 1rem;
                font-weight: 600;
                cursor: pointer;
                margin-right: 1rem;
            ">Get Directions</button>
            <button onclick="closeModal()" style="
                background: #C8BCC8; 
                color: #7A7175; 
                border: none; 
                padding: 1rem 2rem; 
                border-radius: 10px; 
                font-size: 1rem;
                font-weight: 600;
                cursor: pointer;
            ">Close</button>
        </div>
    `;
    
    modal.style.display = 'block';
}

function closeModal() {
    document.getElementById('studioModal').style.display = 'none';
}

function showLoading(show) {
    document.getElementById('loadingSpinner').style.display = show ? 'flex' : 'none';
}

function showAbout() {
    alert('Pilates Studio Finder helps you discover amazing Pilates studios around the world. Find studios near you, read reviews, and connect with the global Pilates community.');
}

function showContact() {
    alert('Contact: Visit https://chenz4027.github.io for more information or to get in touch with Maggie Chen.');
}

// Test function to check if map can be created
function testMapCreation() {
    console.log('🧪 Testing map creation...');
    console.log('📚 Leaflet available?', typeof L !== 'undefined');
    
    if (typeof L === 'undefined') {
        console.error('❌ Leaflet library not loaded!');
        return;
    }
    
    const mapContainer = document.getElementById('mapContainer');
    console.log('📦 Map container found?', !!mapContainer);
    console.log('📏 Map container dimensions:', {
        width: mapContainer?.offsetWidth,
        height: mapContainer?.offsetHeight,
        display: mapContainer?.style.display
    });
    
    // Try to create a simple test map
    try {
        if (mapContainer && mapContainer.offsetHeight > 0) {
            console.log('✅ Creating test map...');
            const testMap = L.map('mapContainer').setView([40.7589, -73.9851], 13);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors'
            }).addTo(testMap);
            console.log('✅ Test map created successfully!');
        } else {
            console.log('⚠️ Map container not visible or has no height');
        }
    } catch (error) {
        console.error('❌ Error creating test map:', error);
    }
}

// Google Maps API integration functions

async function geocodeLocation(query) {
    if (!USE_FREE_APIS) {
        // Fallback to simulation if free APIs are disabled
        return geocodeLocationSimulated(query);
    }
    
    try {
        // Use free Nominatim API for geocoding
        const response = await fetch(
            `${NOMINATIM_BASE_URL}/search?format=json&q=${encodeURIComponent(query)}&limit=1`,
            {
                headers: {
                    'User-Agent': 'PilatesStudioFinder/1.0 (https://chenz4027.github.io/pilatesStudios)'
                }
            }
        );
        
        const data = await response.json();
        
        if (data && data.length > 0) {
            return {
                lat: parseFloat(data[0].lat),
                lng: parseFloat(data[0].lon)
            };
        }
        
        return null;
    } catch (error) {
        console.error('Geocoding error:', error);
        // Fallback to simulation on error
        return geocodeLocationSimulated(query);
    }
}

function geocodeLocationSimulated(query) {
    return new Promise((resolve) => {
        const simulatedLocations = {
            'new york': { lat: 40.7589, lng: -73.9851 },
            'los angeles': { lat: 34.0522, lng: -118.2437 },
            'chicago': { lat: 41.8781, lng: -87.6298 },
            'london': { lat: 51.5074, lng: -0.1278 },
            'sydney': { lat: -33.8688, lng: 151.2093 },
            '10001': { lat: 40.7589, lng: -73.9851 },
            '90210': { lat: 34.0522, lng: -118.2437 },
            '60601': { lat: 41.8781, lng: -87.6298 }
        };
        
        const normalizedQuery = query.toLowerCase().trim();
        const location = simulatedLocations[normalizedQuery];
        
        setTimeout(() => {
            resolve(location || null);
        }, 500);
    });
}

async function searchNearbyPilatesStudios(location) {
    console.log('🔍 Searching for studios near:', location);
    
    if (!USE_FREE_APIS) {
        console.log('📋 Using simulated data (free APIs disabled)');
        return searchNearbyPilatesStudiosSimulated(location);
    }
    
    try {
        const radius = document.getElementById('radiusSelect').value;
        console.log('📏 Search radius:', radius + 'm');
        
        // Use Overpass API to find real fitness/sport facilities
        const overpassQuery = `
            [out:json][timeout:25];
            (
              node["leisure"="fitness_centre"](around:${radius},${location.lat},${location.lng});
              node["leisure"="sports_centre"](around:${radius},${location.lat},${location.lng});
              node["amenity"="fitness_centre"](around:${radius},${location.lat},${location.lng});
              way["leisure"="fitness_centre"](around:${radius},${location.lat},${location.lng});
              way["leisure"="sports_centre"](around:${radius},${location.lat},${location.lng});
              way["amenity"="fitness_centre"](around:${radius},${location.lat},${location.lng});
            );
            out center meta;
        `;
        
        console.log('🌐 Calling Overpass API...');
        const response = await fetch(OVERPASS_BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `data=${encodeURIComponent(overpassQuery)}`
        });
        
        const data = await response.json();
        console.log('📊 Overpass API response:', data);
        
        if (data && data.elements && data.elements.length > 0) {
            console.log('✅ Found', data.elements.length, 'real fitness facilities');
            
            // Convert real data to our studio format
            const realStudios = data.elements
                .filter(element => element.lat && element.lon)
                .slice(0, 8) // Limit to 8 results
                .map((element, index) => ({
                    id: `real_${element.id}`,
                    name: element.tags?.name || `Fitness Studio ${index + 1}`,
                    address: formatAddress(element.tags),
                    lat: element.lat || element.center?.lat,
                    lng: element.lon || element.center?.lon,
                    rating: (Math.random() * 1.5 + 3.5).toFixed(1),
                    reviews: Math.floor(Math.random() * 200) + 10,
                    phone: generatePhoneNumber(),
                    website: element.tags?.website || `www.${(element.tags?.name || 'studio').toLowerCase().replace(/\s+/g, '')}.com`,
                    description: "Real fitness studio found through OpenStreetMap data. Contact for Pilates class information.",
                    amenities: getAmenitiesFromTags(element.tags),
                    image: '🏋️‍♀️',
                    distance: calculateDistance(location.lat, location.lng, element.lat || element.center?.lat, element.lon || element.center?.lon),
                    isRealTime: true,
                    source: 'OpenStreetMap'
                }));
            
            // Sort by distance
            realStudios.sort((a, b) => a.distance - b.distance);
            
            if (realStudios.length > 0) {
                console.log('🎯 Returning', realStudios.length, 'real studios');
                return realStudios;
            }
        } else {
            console.log('❌ No real data found, using simulated data');
        }
        
        // Fallback to generated data if no real data found
        return searchNearbyPilatesStudiosSimulated(location);
        
    } catch (error) {
        console.error('❌ Real data search error:', error);
        console.log('📋 Falling back to simulated data');
        // Fallback to simulation on error
        return searchNearbyPilatesStudiosSimulated(location);
    }
}

function searchNearbyPilatesStudiosSimulated(location) {
    return new Promise((resolve) => {
        const radius = document.getElementById('radiusSelect').value;
        setTimeout(() => {
            const nearbyStudios = generateNearbyStudios(location, parseInt(radius));
            resolve(nearbyStudios);
        }, 1000);
    });
}

function formatAddress(tags) {
    if (!tags) return 'Address not available';
    
    const parts = [];
    if (tags['addr:housenumber']) parts.push(tags['addr:housenumber']);
    if (tags['addr:street']) parts.push(tags['addr:street']);
    if (tags['addr:city']) parts.push(tags['addr:city']);
    if (tags['addr:postcode']) parts.push(tags['addr:postcode']);
    
    return parts.length > 0 ? parts.join(' ') : 'Address not available';
}

function getAmenitiesFromTags(tags) {
    const amenities = [];
    if (tags?.sport) amenities.push('Sport Facilities');
    if (tags?.wheelchair === 'yes') amenities.push('Wheelchair Accessible');
    if (tags?.parking) amenities.push('Parking Available');
    if (tags?.shower === 'yes') amenities.push('Shower Facilities');
    if (amenities.length === 0) amenities.push('Fitness Classes', 'Equipment Training', 'Group Sessions');
    return amenities.slice(0, 3);
}

function generateNearbyStudios(centerLocation, radiusMeters) {
    const radiusKm = radiusMeters / 1000;
    const studios = [];
    
    // Generate 3-8 studios within the radius
    const studioCount = Math.floor(Math.random() * 6) + 3;
    
    const studioNames = [
        'Core Balance Pilates', 'Zen Movement Studio', 'Pure Pilates Center',
        'Mindful Motion', 'Pilates Plus', 'The Studio Method',
        'Reform Pilates', 'Balance & Flow', 'Essential Pilates',
        'Dynamic Core Studio', 'Harmony Pilates', 'Precision Movement'
    ];
    
    const amenities = [
        ['Reformer Classes', 'Mat Pilates', 'Private Sessions'],
        ['Classical Pilates', 'Equipment Training', 'Beginners Welcome'],
        ['Group Classes', 'Personal Training', 'Injury Rehabilitation'],
        ['Tower Classes', 'Barre Fusion', 'Prenatal Pilates'],
        ['Advanced Training', 'Workshops', 'Teacher Training']
    ];
    
    for (let i = 0; i < studioCount; i++) {
        // Generate random location within radius
        const bearing = Math.random() * 2 * Math.PI;
        const distance = Math.random() * radiusKm;
        
        const lat = centerLocation.lat + (distance / 111) * Math.cos(bearing);
        const lng = centerLocation.lng + (distance / (111 * Math.cos(centerLocation.lat * Math.PI / 180))) * Math.sin(bearing);
        
        const studio = {
            id: `nearby_${i}`,
            name: studioNames[Math.floor(Math.random() * studioNames.length)],
            address: generateAddress(lat, lng),
            lat: lat,
            lng: lng,
            rating: (Math.random() * 1.5 + 3.5).toFixed(1), // 3.5-5.0 rating
            reviews: Math.floor(Math.random() * 200) + 10,
            phone: generatePhoneNumber(),
            website: `www.${studioNames[i % studioNames.length].toLowerCase().replace(/\s+/g, '')}.com`,
            description: generateStudioDescription(),
            amenities: amenities[i % amenities.length],
            image: ['🧘‍♀️', '🏋️‍♀️', '🤸‍♀️', '💪', '🌟'][i % 5],
            distance: distance,
            isRealTime: true
        };
        
        studios.push(studio);
    }
    
    // Sort by distance
    return studios.sort((a, b) => a.distance - b.distance);
}

function generateAddress(lat, lng) {
    const streetNumbers = [123, 456, 789, 321, 654, 987];
    const streetNames = ['Main St', 'Oak Ave', 'Pine Rd', 'Elm Dr', 'Maple Way', 'Cedar Ln'];
    const streetNumber = streetNumbers[Math.floor(Math.random() * streetNumbers.length)];
    const streetName = streetNames[Math.floor(Math.random() * streetNames.length)];
    
    return `${streetNumber} ${streetName}`;
}

function generatePhoneNumber() {
    const areaCode = Math.floor(Math.random() * 900) + 100;
    const exchange = Math.floor(Math.random() * 900) + 100;
    const number = Math.floor(Math.random() * 9000) + 1000;
    return `(${areaCode}) ${exchange}-${number}`;
}

function generateStudioDescription() {
    const descriptions = [
        "A welcoming studio focused on building strength, flexibility, and mind-body connection through classical Pilates methods.",
        "Modern Pilates studio offering personalized instruction in a peaceful, supportive environment for all fitness levels.",
        "Dedicated to helping clients achieve their wellness goals through precise, mindful movement and expert guidance.",
        "Community-centered studio providing high-quality Pilates instruction with state-of-the-art equipment and experienced teachers.",
        "Boutique Pilates studio emphasizing proper form, individual attention, and creating lasting positive change in your body."
    ];
    
    return descriptions[Math.floor(Math.random() * descriptions.length)];
}

// Simulation functions for Google Maps API
function simulateNearbySearch(request, callback) {
    setTimeout(() => {
        const results = generateNearbyStudios(request.location, request.radius);
        callback(results, 'OK');
    }, 1000);
}

function simulateGetDetails(request, callback) {
    setTimeout(() => {
        const details = {
            name: 'Sample Studio',
            formatted_address: '123 Main St, City, State',
            rating: 4.5,
            user_ratings_total: 89
        };
        callback(details, 'OK');
    }, 500);
}

function simulateGeocode(request, callback) {
    geocodeLocation(request.address).then(location => {
        if (location) {
            callback([{ geometry: { location: location } }], 'OK');
        } else {
            callback([], 'ZERO_RESULTS');
        }
    });
}

// Add some sample zip codes for testing
window.testZipCodes = {
    'New York': ['10001', '10002', '10003'],
    'Los Angeles': ['90210', '90211', '90212'],
    'Chicago': ['60601', '60602', '60603'],
    'London': ['W1B', 'W1C', 'W1D'],
    'Sydney': ['2000', '2001', '2002'],
    'Milan': ['20121', '20122', '20123'],
    'Tokyo': ['150-0002', '150-0001', '150-0011'],
    'São Paulo': ['01304-001', '01305-001', '01306-001']
};

// Add a simple test function for debugging
function testMapDisplay() {
    console.log('🧪 Testing map display...');
    const mapContainer = document.getElementById('mapContainer');
    const listContainer = document.getElementById('studioList');
    
    console.log('🔍 Container elements:');
    console.log('- mapContainer exists:', !!mapContainer);
    console.log('- listContainer exists:', !!listContainer);
    
    if (mapContainer) {
        console.log('📦 mapContainer details:');
        console.log('- offsetWidth:', mapContainer.offsetWidth);
        console.log('- offsetHeight:', mapContainer.offsetHeight);
        console.log('- display style:', mapContainer.style.display);
        console.log('- computed display:', getComputedStyle(mapContainer).display);
        console.log('- visibility:', getComputedStyle(mapContainer).visibility);
        
        // Force show the map container
        mapContainer.style.display = 'block';
        mapContainer.style.height = '500px';
        mapContainer.style.backgroundColor = '#ff6b6b'; // Red background for testing
        
        console.log('🎨 Forced map container to be visible with red background');
        console.log('- New offsetWidth:', mapContainer.offsetWidth);
        console.log('- New offsetHeight:', mapContainer.offsetHeight);
    }
    
    console.log('🌍 Leaflet availability:', typeof L !== 'undefined');
    if (typeof L !== 'undefined') {
        console.log('✅ Leaflet version:', L.version);
    }
}

// Make test function available globally for console testing
window.testMapDisplay = testMapDisplay;