// Global variables
let map;
let userLocation = null;
let currentStudios = [];

// Sample Pilates studios data (in a real app, this would come from a database/API)
const pilatesStudios = [
    {
        id: 1,
        name: "Core Power Pilates Studio",
        address: "123 Main St, New York, NY 10001",
        lat: 40.7589,
        lng: -73.9851,
        rating: 4.8,
        reviews: 127,
        phone: "(555) 123-4567",
        website: "www.corepowerpilates.com",
        description: "A premier Pilates studio offering reformer classes, mat work, and specialized training. Our certified instructors provide personalized attention in a serene environment.",
        amenities: ["Reformer Classes", "Mat Pilates", "Private Sessions", "Beginner Friendly"],
        image: "🏢",
        zipCodes: ["10001", "10002", "10003", "10004", "10005"]
    },
    {
        id: 2,
        name: "Zen Pilates & Wellness",
        address: "456 Oak Ave, Los Angeles, CA 90210",
        lat: 34.0522,
        lng: -118.2437,
        rating: 4.9,
        reviews: 89,
        phone: "(555) 987-6543",
        website: "www.zenpilates.com",
        description: "Holistic approach to Pilates combining traditional methods with modern wellness practices. Offering group classes and one-on-one sessions.",
        amenities: ["Classical Pilates", "Wellness Programs", "Meditation", "Nutrition Counseling"],
        image: "🧘‍♀️",
        zipCodes: ["90210", "90211", "90212", "90213", "90214"]
    },
    {
        id: 3,
        name: "Studio Equilibrium",
        address: "789 Pine Rd, Chicago, IL 60601",
        lat: 41.8781,
        lng: -87.6298,
        rating: 4.7,
        reviews: 156,
        phone: "(555) 456-7890",
        website: "www.studioequilibrium.com",
        description: "Modern Pilates studio focusing on alignment, strength, and flexibility. Features state-of-the-art equipment and expert instruction.",
        amenities: ["Tower Classes", "Barre Fusion", "Rehab Pilates", "Advanced Training"],
        image: "⚖️",
        zipCodes: ["60601", "60602", "60603", "60604", "60605"]
    },
    {
        id: 4,
        name: "Flow Pilates London",
        address: "12 Regent Street, London W1B 5SA, UK",
        lat: 51.5074,
        lng: -0.1278,
        rating: 4.6,
        reviews: 203,
        phone: "+44 20 7123 4567",
        website: "www.flowpilateslondon.co.uk",
        description: "London's premier Pilates destination offering dynamic classes in the heart of the city. Combining traditional Pilates with contemporary techniques.",
        amenities: ["Dynamic Reformer", "Mat Classes", "Prenatal Pilates", "Corporate Programs"],
        image: "🇬🇧",
        zipCodes: ["W1B", "W1C", "W1D", "W1F", "W1G"]
    },
    {
        id: 5,
        name: "Pilates Plus Sydney",
        address: "88 George Street, Sydney NSW 2000, Australia",
        lat: -33.8688,
        lng: 151.2093,
        rating: 4.8,
        reviews: 174,
        phone: "+61 2 9876 5432",
        website: "www.pilatesplussydney.com.au",
        description: "Sydney's leading Pilates studio with harbor views. Offering comprehensive programs for all fitness levels in a stunning waterfront location.",
        amenities: ["Harbor View Classes", "Aqua Pilates", "Outdoor Sessions", "Wellness Retreats"],
        image: "🇦🇺",
        zipCodes: ["2000", "2001", "2002", "2003", "2004"]
    },
    {
        id: 6,
        name: "Milano Pilates Center",
        address: "Via Montenapoleone 10, 20121 Milano, Italy",
        lat: 45.4642,
        lng: 9.1900,
        rating: 4.9,
        reviews: 91,
        phone: "+39 02 1234 5678",
        website: "www.milanopilatescenter.it",
        description: "Elegant Pilates studio in the fashion capital of Italy. Combining Italian style with precise Pilates methodology for a unique experience.",
        amenities: ["Italian Method", "Fashion District Location", "Luxury Amenities", "Celebrity Training"],
        image: "🇮🇹",
        zipCodes: ["20121", "20122", "20123", "20124", "20125"]
    },
    {
        id: 7,
        name: "Tokyo Core Studio",
        address: "1-1-1 Shibuya, Tokyo 150-0002, Japan",
        lat: 35.6762,
        lng: 139.6503,
        rating: 4.7,
        reviews: 132,
        phone: "+81 3 1234 5678",
        website: "www.tokyocorestudio.jp",
        description: "Modern Pilates studio in the heart of Tokyo, blending Japanese precision with Pilates principles. Offering bilingual instruction and zen atmosphere.",
        amenities: ["Bilingual Classes", "Japanese Aesthetics", "Mind-Body Connection", "Tech Integration"],
        image: "🇯🇵",
        zipCodes: ["150-0002", "150-0001", "150-0011", "150-0012", "150-0013"]
    },
    {
        id: 8,
        name: "São Paulo Pilates Academy",
        address: "Rua Augusta 1500, São Paulo SP 01304-001, Brazil",
        lat: -23.5505,
        lng: -46.6333,
        rating: 4.6,
        reviews: 198,
        phone: "+55 11 9876 5432",
        website: "www.sppilatescademy.com.br",
        description: "Brazil's premier Pilates academy offering comprehensive training and classes. Known for vibrant energy and innovative teaching methods.",
        amenities: ["Brazilian Style", "Dance Fusion", "Beach Body Programs", "Carnival Prep"],
        image: "🇧🇷",
        zipCodes: ["01304-001", "01305-001", "01306-001", "01307-001", "01308-001"]
    }
];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    loadFeaturedStudios();
    setupEventListeners();
});

function initializeApp() {
    console.log('Pilates Studio Finder initialized');
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
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Search for studios based on zip code or location
        const results = searchStudios(query);
        displaySearchResults(results, query);
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
            
            // Find nearby studios (simplified - in reality would use proper distance calculation)
            const nearbyStudios = findNearbyStudios(userLocation);
            displaySearchResults(nearbyStudios, 'your location');
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
    
    // Add click listeners to studio cards
    document.querySelectorAll('.studio-card').forEach(card => {
        card.addEventListener('click', function() {
            const studioId = parseInt(this.dataset.studioId);
            showStudioDetails(studioId);
        });
    });

    // Scroll to results
    resultsSection.scrollIntoView({ behavior: 'smooth' });
}

function createStudioCard(studio) {
    const stars = '★'.repeat(Math.floor(studio.rating)) + '☆'.repeat(5 - Math.floor(studio.rating));
    const distanceText = studio.distance ? `${studio.distance.toFixed(1)} miles away` : '';
    
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
                ${studio.amenities.slice(0, 3).map(amenity => `<span class="tag">${amenity}</span>`).join('')}
                ${studio.amenities.length > 3 ? `<span class="tag">+${studio.amenities.length - 3} more</span>` : ''}
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
    const listView = document.getElementById('studioList');
    const mapView = document.getElementById('mapContainer');
    const listBtn = document.getElementById('listViewBtn');
    const mapBtn = document.getElementById('mapViewBtn');
    
    if (viewType === 'list') {
        listView.style.display = 'block';
        mapView.style.display = 'none';
        listBtn.classList.add('active');
        mapBtn.classList.remove('active');
    } else {
        listView.style.display = 'none';
        mapView.style.display = 'block';
        listBtn.classList.remove('active');
        mapBtn.classList.add('active');
        initializeMap();
    }
}

function initializeMap() {
    if (map) {
        map.remove();
    }
    
    // Default center (New York)
    let center = [40.7589, -73.9851];
    let zoom = 10;
    
    // If we have search results, center on them
    if (currentStudios.length > 0) {
        if (userLocation) {
            center = [userLocation.lat, userLocation.lng];
        } else {
            center = [currentStudios[0].lat, currentStudios[0].lng];
        }
        zoom = currentStudios.length === 1 ? 15 : 12;
    }
    
    map = L.map('mapContainer').setView(center, zoom);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    
    // Add markers for studios
    const studiesToShow = currentStudios.length > 0 ? currentStudios : pilatesStudios.slice(0, 10);
    
    studiesToShow.forEach(studio => {
        const marker = L.marker([studio.lat, studio.lng]).addTo(map);
        marker.bindPopup(`
            <div style="text-align: center; min-width: 200px;">
                <h4 style="margin: 0 0 0.5rem 0; color: #333;">${studio.name}</h4>
                <p style="margin: 0 0 0.5rem 0; color: #666; font-size: 0.9rem;">${studio.address}</p>
                <div style="margin: 0.5rem 0;">
                    <span style="color: #ffd700;">★</span> ${studio.rating} (${studio.reviews} reviews)
                </div>
                <button onclick="showStudioDetails(${studio.id})" style="
                    background: #667eea; 
                    color: white; 
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
                iconUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTAiIGZpbGw9IiM2NjdlZWEiLz4KPGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMyIgZmlsbD0id2hpdGUiLz4KPC9zdmc+',
                iconSize: [20, 20],
                iconAnchor: [10, 10]
            })
        }).addTo(map).bindPopup('Your Location');
    }
}

function showStudioDetails(studioId) {
    const studio = pilatesStudios.find(s => s.id === studioId);
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
        
        <div style="background: #f8f9ff; padding: 1.5rem; border-radius: 12px; margin-bottom: 2rem;">
            <h3 style="color: #333; margin-bottom: 1rem;">About This Studio</h3>
            <p style="color: #666; line-height: 1.6;">${studio.description}</p>
        </div>
        
        <div style="margin-bottom: 2rem;">
            <h3 style="color: #333; margin-bottom: 1rem;">Amenities & Services</h3>
            <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                ${studio.amenities.map(amenity => `
                    <span style="
                        background: #e8f0ff; 
                        color: #667eea; 
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
                <div style="font-weight: 600; color: #333;">Phone</div>
                <div style="color: #667eea;">${studio.phone}</div>
            </div>
            <div style="background: white; padding: 1rem; border-radius: 8px; text-align: center; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                <div style="font-size: 1.5rem; margin-bottom: 0.5rem;">🌐</div>
                <div style="font-weight: 600; color: #333;">Website</div>
                <div><a href="http://${studio.website}" target="_blank" style="color: #667eea; text-decoration: none;">${studio.website}</a></div>
            </div>
        </div>
        
        <div style="text-align: center;">
            <button onclick="window.open('https://maps.google.com/?q=${encodeURIComponent(studio.address)}', '_blank')" style="
                background: #667eea; 
                color: white; 
                border: none; 
                padding: 1rem 2rem; 
                border-radius: 10px; 
                font-size: 1rem;
                font-weight: 600;
                cursor: pointer;
                margin-right: 1rem;
            ">Get Directions</button>
            <button onclick="closeModal()" style="
                background: #f5f5f5; 
                color: #333; 
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
    alert('Contact: Visit https://chenz4027.github.io for more information or to get in touch.');
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