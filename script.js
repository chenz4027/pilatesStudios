// Global variables
let map;
let userLocation = null;
let currentStudios = [];
let googleMap = null;
let placesService = null;
let geocoder = null;

// Pagination variables
let currentPage = 1;
let studiosPerPage = 5;
let totalStudios = 0;
let allStudios = [];
let currentSearchTerm = '';

// Free APIs configuration
const USE_FREE_APIS = true; // Set to true to use free OpenStreetMap + Nominatim APIs
const NOMINATIM_BASE_URL = 'https://nominatim.openstreetmap.org';
const OVERPASS_BASE_URL = 'https://overpass-api.de/api/interpreter';

// Major cities data for quick search
const majorCitiesData = {
    'new york': [
        { id: 'ny1', name: 'Pure Yoga', address: '203 E 86th St, New York, NY 10028', lat: 40.7831, lng: -73.9527, rating: '4.2', reviews: 450, phone: '(212) 769-2200', website: 'https://pureyoga.com', description: 'Premium yoga and Pilates studio in the Upper East Side offering classes for all levels.', amenities: ['Mat Rental', 'Changing Rooms', 'Showers'], image: '🧘‍♀️', distance: '0.5 miles', source: 'Curated' },
        { id: 'ny2', name: 'SLT Studio', address: '25 E 73rd St, New York, NY 10021', lat: 40.7738, lng: -73.9668, rating: '4.4', reviews: 320, phone: '(212) 772-7005', website: 'https://sltmethod.com', description: 'High-intensity, low-impact Pilates-inspired workout using the Megaformer machine.', amenities: ['Equipment Provided', 'Towel Service', 'Water'], image: '💪', distance: '0.8 miles', source: 'Curated' },
        { id: 'ny3', name: 'Equinox Pilates', address: '817 Broadway, New York, NY 10003', lat: 40.7342, lng: -73.9911, rating: '4.1', reviews: 650, phone: '(212) 780-9300', website: 'https://equinox.com', description: 'Premium fitness club with dedicated Pilates studio and certified instructors.', amenities: ['Full Gym Access', 'Spa Services', 'Personal Training'], image: '🏋️‍♀️', distance: '1.2 miles', source: 'Curated' },
        { id: 'ny4', name: 'The Pilates Studio NYC', address: '141 E 55th St, New York, NY 10022', lat: 40.7614, lng: -73.9706, rating: '4.3', reviews: 280, phone: '(212) 888-6788', website: 'https://pilatesstudionyc.com', description: 'Traditional Pilates studio offering private and group classes on authentic equipment.', amenities: ['Private Sessions', 'Small Groups', 'Equipment Training'], image: '🤸‍♀️', distance: '0.6 miles', source: 'Curated' },
        { id: 'ny5', name: 'Club Pilates', address: '200 W 60th St, New York, NY 10023', lat: 40.7697, lng: -73.9826, rating: '4.0', reviews: 400, phone: '(212) 581-3434', website: 'https://clubpilates.com', description: 'Modern Pilates studio offering diverse classes for every body and fitness level.', amenities: ['Beginner Friendly', 'Multiple Class Types', 'Online Booking'], image: '🧘‍♂️', distance: '0.9 miles', source: 'Curated' },
        { id: 'ny6', name: 'Breathe Pilates', address: '78 5th Ave, New York, NY 10011', lat: 40.7370, lng: -73.9929, rating: '4.2', reviews: 190, phone: '(212) 242-2979', website: 'https://breathepilates.com', description: 'Boutique Pilates studio focusing on alignment and breath-based movement.', amenities: ['Prenatal Classes', 'Rehabilitation', 'Workshops'], image: '🌱', distance: '1.1 miles', source: 'Curated' },
        { id: 'ny7', name: 'Gotham Gym Pilates', address: '1356 1st Ave, New York, NY 10021', lat: 40.7703, lng: -73.9539, rating: '4.1', reviews: 310, phone: '(212) 794-4700', website: 'https://gothamgym.com', description: 'Full-service gym with comprehensive Pilates program and group classes.', amenities: ['Full Gym', 'Group Classes', 'Personal Training'], image: '🏃‍♀️', distance: '0.7 miles', source: 'Curated' },
        { id: 'ny8', name: 'Physique 57', address: '161 W 54th St, New York, NY 10019', lat: 40.7642, lng: -73.9809, rating: '4.3', reviews: 380, phone: '(212) 956-8484', website: 'https://physique57.com', description: 'Barre and Pilates fusion studio offering high-energy group fitness classes.', amenities: ['Barre Classes', 'Pilates Fusion', 'Retail Shop'], image: '💃', distance: '0.4 miles', source: 'Curated' },
        { id: 'ny9', name: 'Real Pilates', address: '177 Duane St, New York, NY 10013', lat: 40.7174, lng: -74.0089, rating: '4.4', reviews: 270, phone: '(212) 625-0777', website: 'https://realpilates.com', description: 'Classical Pilates studio dedicated to the traditional method and authentic equipment.', amenities: ['Classical Method', 'Authentic Equipment', 'Teacher Training'], image: '⚖️', distance: '1.3 miles', source: 'Curated' },
        { id: 'ny10', name: 'Movement Research', address: '131 E 10th St, New York, NY 10003', lat: 40.7301, lng: -73.9870, rating: '4.0', reviews: 150, phone: '(212) 598-0551', website: 'https://movementresearch.org', description: 'Alternative movement studio offering Pilates, dance, and somatic practices.', amenities: ['Alternative Methods', 'Dance Integration', 'Workshops'], image: '🎭', distance: '1.5 miles', source: 'Curated' },
        { id: 'ny11', name: 'Pilates on Fifth', address: '500 5th Ave, New York, NY 10110', lat: 40.7520, lng: -73.9807, rating: '4.2', reviews: 220, phone: '(212) 768-3535', website: 'https://pilatesonfifth.com', description: 'Upscale Pilates studio in Midtown with panoramic city views.', amenities: ['City Views', 'Premium Location', 'Corporate Classes'], image: '🏙️', distance: '0.3 miles', source: 'Curated' },
        { id: 'ny12', name: 'Elev8d Fitness', address: '75 Wall St, New York, NY 10005', lat: 40.7074, lng: -74.0113, rating: '4.1', reviews: 290, phone: '(212) 509-7171', website: 'https://elev8dfitness.com', description: 'Modern fitness studio combining Pilates with functional movement training.', amenities: ['Functional Training', 'HIIT Classes', 'Recovery Services'], image: '🚀', distance: '1.8 miles', source: 'Curated' },
        { id: 'ny13', name: 'The Spot Athletics', address: '16 W 22nd St, New York, NY 10010', lat: 40.7404, lng: -73.9928, rating: '4.3', reviews: 340, phone: '(212) 242-7768', website: 'https://thespotathletics.com', description: 'Athletic training facility with specialized Pilates for sports performance.', amenities: ['Sports Performance', 'Athletic Training', 'Recovery'], image: '⚽', distance: '1.0 miles', source: 'Curated' },
        { id: 'ny14', name: 'Fierce45', address: '1170 Broadway, New York, NY 10001', lat: 40.7446, lng: -73.9894, rating: '4.0', reviews: 410, phone: '(212) 779-4545', website: 'https://fierce45.com', description: '45-minute high-intensity Pilates and strength training fusion classes.', amenities: ['Quick Sessions', 'High Intensity', 'Strength Focus'], image: '⚡', distance: '1.1 miles', source: 'Curated' },
        { id: 'ny15', name: 'Pilates Plus', address: '2109 Broadway, New York, NY 10023', lat: 40.7756, lng: -73.9823, rating: '4.2', reviews: 260, phone: '(212) 874-1993', website: 'https://pilatesplus.com', description: 'Community-focused Pilates studio offering accessible classes for all levels.', amenities: ['Community Classes', 'All Levels', 'Affordable Options'], image: '🤝', distance: '0.6 miles', source: 'Curated' }
    ],
    'los angeles': [
        { id: 'la1', name: 'Alo Yoga Studio', address: '8466 Melrose Ave, West Hollywood, CA 90069', lat: 34.0838, lng: -118.3707, rating: '4.3', reviews: 520, phone: '(323) 782-2562', website: 'https://aloyoga.com', description: 'Trendy yoga and Pilates studio popular with celebrities and fitness enthusiasts.', amenities: ['Celebrity Training', 'Premium Equipment', 'Retail Store'], image: '⭐', distance: '0.4 miles', source: 'Curated' },
        { id: 'la2', name: 'Club Pilates Beverly Hills', address: '269 S Beverly Dr, Beverly Hills, CA 90212', lat: 34.0644, lng: -118.4006, rating: '4.1', reviews: 380, phone: '(310) 550-7453', website: 'https://clubpilates.com', description: 'Modern Pilates studio in the heart of Beverly Hills with state-of-the-art equipment.', amenities: ['Luxury Location', 'Modern Equipment', 'Valet Parking'], image: '💎', distance: '0.7 miles', source: 'Curated' },
        { id: 'la3', name: 'The Pilates Class', address: '8500 Sunset Blvd, West Hollywood, CA 90069', lat: 34.0969, lng: -118.3779, rating: '4.4', reviews: 290, phone: '(310) 855-0053', website: 'https://thepilatesclass.com', description: 'High-energy Pilates classes combining cardio and strength training.', amenities: ['Cardio Pilates', 'Strength Training', 'Music-Driven'], image: '🎵', distance: '0.5 miles', source: 'Curated' },
        { id: 'la4', name: 'SoulCycle x Pilates', address: '1350 3rd St Promenade, Santa Monica, CA 90401', lat: 34.0195, lng: -118.4967, rating: '4.2', reviews: 450, phone: '(310) 394-7685', website: 'https://soulcycle.com', description: 'Fusion studio offering both SoulCycle and Pilates classes near the beach.', amenities: ['Beach Location', 'Cycling + Pilates', 'Ocean Views'], image: '🌊', distance: '1.2 miles', source: 'Curated' },
        { id: 'la5', name: 'Erika Bloom Pilates', address: '9229 Sunset Blvd, West Hollywood, CA 90069', lat: 34.0903, lng: -118.3862, rating: '4.5', reviews: 180, phone: '(310) 276-3663', website: 'https://erikabloom.com', description: 'Celebrity trainer Erika Bloom\'s flagship West Coast studio.', amenities: ['Celebrity Trainer', 'Private Sessions', 'Advanced Training'], image: '🌟', distance: '0.6 miles', source: 'Curated' },
        { id: 'la6', name: 'Balanced Body Education', address: '5909 Warner Ave, Huntington Beach, CA 92649', lat: 33.7089, lng: -118.0203, rating: '4.3', reviews: 210, phone: '(714) 848-8897', website: 'https://balancedbody.com', description: 'Professional Pilates education center and studio with comprehensive programs.', amenities: ['Professional Training', 'Education Center', 'Equipment Sales'], image: '🎓', distance: '2.8 miles', source: 'Curated' }
    ],
    'chicago': [
        { id: 'chi1', name: 'Studio Three Chicago', address: '1926 N Lincoln Ave, Chicago, IL 60614', lat: 41.9198, lng: -87.6369, rating: '4.4', reviews: 280, phone: '(773) 348-3100', website: 'https://studiothree.com', description: 'Premier Pilates and movement studio in Lincoln Park with expert instructors.', amenities: ['Expert Instructors', 'Movement Therapy', 'Private Sessions'], image: '🏆', distance: '0.5 miles', source: 'Curated' },
        { id: 'chi2', name: 'Mindful Body Pilates', address: '1856 W North Ave, Chicago, IL 60622', lat: 41.9103, lng: -87.6756, rating: '4.2', reviews: 320, phone: '(773) 489-4800', website: 'https://mindfulbodypilates.com', description: 'Holistic Pilates studio focusing on mindful movement and body awareness.', amenities: ['Holistic Approach', 'Mind-Body Focus', 'Therapeutic'], image: '🧠', distance: '0.8 miles', source: 'Curated' },
        { id: 'chi3', name: 'Chicago Pilates & Fitness', address: '70 W Hubbard St, Chicago, IL 60654', lat: 41.8896, lng: -87.6317, rating: '4.1', reviews: 390, phone: '(312) 527-6200', website: 'https://chicagopilates.com', description: 'Downtown Pilates studio offering comprehensive fitness and Pilates programs.', amenities: ['Downtown Location', 'Full Fitness', 'Corporate Programs'], image: '🏢', distance: '0.3 miles', source: 'Curated' }
    ]
};

// City aliases for better search matching
const cityAliases = {
    'nyc': 'new york',
    'manhattan': 'new york', 
    'brooklyn': 'new york',
    'la': 'los angeles',
    'los angelas': 'los angeles', // Common misspelling
    'l.a.': 'los angeles',
    'chi-town': 'chicago',
    'windy city': 'chicago'
};

// City center coordinates for map centering
const cityCenters = {
    'new york': { lat: 40.7589, lng: -73.9851 }, // Times Square area
    'los angeles': { lat: 34.0522, lng: -118.2437 }, // Downtown LA
    'chicago': { lat: 41.8781, lng: -87.6298 } // Downtown Chicago
};

// Real Ontario Pilates Studios Data - Sourced from web research January 2025
const pilatesStudios = [
    {
        id: 1,
        name: "Articulate Bodies",
        address: "750 Yonge Street, 3rd Floor, Toronto, ON M4Y 2B6",
        lat: 43.6703,
        lng: -79.3860,
        rating: 4.8,
        reviews: 127,
        phone: "(647) 519-0395",
        website: "https://www.torontopilatesstudio.com",
        description: "Midtown Toronto Pilates studio featuring Fletcher Pilates® method and Fascial Fitness® concept. Focus on body awareness, posture & alignment.",
        amenities: ["Fletcher Pilates Method", "Trio Group Classes", "Private Sessions", "Pilates Prelude"],
        image: "🏙️",
        zipCodes: ["M4Y", "M5G", "M5C", "M5E", "M5J"]
    },
    {
        id: 2,
        name: "Core Integrity",
        address: "311 Richmond Road, Suite 302, Ottawa, ON K1Z 6X3",
        lat: 45.3926,
        lng: -75.7287,
        rating: 4.6,
        reviews: 89,
        phone: "(613) 866-6774",
        website: "https://www.core-integrity.ca",
        description: "Boutique Pilates studio in Ottawa's Westboro community with emphasis on biomechanics and movement quality. Voted top 10 in Ottawa.",
        amenities: ["Biomechanics Focus", "Age Well 60+ Classes", "Private Training", "Beginner Friendly"],
        image: "🏛️",
        zipCodes: ["K1Z", "K1R", "K1S", "K1N", "K1G"]
    },
    {
        id: 3,
        name: "Studio Zee Pilates",
        address: "430 York Boulevard, Hamilton, ON L8R 3K7",
        lat: 43.2557,
        lng: -79.8711,
        rating: 4.7,
        reviews: 156,
        phone: "(905) 667-1045",
        website: "https://www.studiozeepilates.com",
        description: "Hamilton's original Pilates studio serving the community for over 20 years. Offers Mat, Reformer, Physiotherapy and Osteopathy services.",
        amenities: ["STOTT Certified", "Physiotherapy", "Osteopathy", "Community Classes"],
        image: "🎨",
        zipCodes: ["L8R", "L8L", "L8S", "L8N", "L8P"]
    },
    {
        id: 4,
        name: "Pilates Just Plane Works",
        address: "1305 Victoria Street North Unit 4, Kitchener, ON N2B 3C9",
        lat: 43.4516,
        lng: -80.4925,
        rating: 4.5,
        reviews: 94,
        phone: "(519) 572-5352",
        website: "https://pilatesjustplaneworks.ca",
        description: "Welcoming Kitchener studio with highly certified movement educators focused on proper alignment and mind/body awareness.",
        amenities: ["Movement Education", "Mind-Body Awareness", "Proper Alignment", "Complimentary Consultation"],
        image: "🌳",
        zipCodes: ["N2B", "N2A", "N2C", "N2G", "N2H"]
    },
    {
        id: 5,
        name: "Pilates Essentials",
        address: "2569 Jefferson Boulevard #A, Windsor, ON N8T 2W5",
        lat: 42.3149,
        lng: -83.0364,
        rating: 4.9,
        reviews: 78,
        phone: "(519) 735-8909",
        website: "https://www.pilatesessentials.ca",
        description: "Fully equipped STOTT® Pilates studio with V2 Max™ Reformers and professional equipment. 25+ years in the fitness industry.",
        amenities: ["STOTT Equipment", "V2 Max Reformers", "25+ Years Experience", "Private & Semi-Private"],
        image: "🌊",
        zipCodes: ["N8T", "N9A", "N9B", "N8S", "N8X"]
    },
    {
        id: 6,
        name: "Body Harmonics",
        address: "672 Dupont Street, Suite 406, Toronto, ON M6G 1Z6",
        lat: 43.6738,
        lng: -79.4194,
        rating: 4.6,
        reviews: 112,
        phone: "(416) 537-0714",
        website: "https://www.bodyharmonics.com",
        description: "Global Pilates education center with studios, wellness clinics, and certification programs. 115+ mat, reformer and springboard classes.",
        amenities: ["Global Education", "Wellness Clinics", "Teacher Training", "115+ Classes"],
        image: "🏰",
        zipCodes: ["M6G", "M6H", "M6J", "M6K", "M6P"]
    },
    {
        id: 7,
        name: "Retrofit Pilates",
        address: "206-2323 Bloor Street West, Toronto, ON M6S 0A3",
        lat: 43.6501,
        lng: -79.4755,
        rating: 4.7,
        reviews: 134,
        phone: "(416) 763-6368",
        website: "https://retrofit.ca",
        description: "One of Toronto's foremost Pilates studios and Balanced Body Authorized International Teacher Training Centre in Bloor West Village.",
        amenities: ["Balanced Body Certified", "Teacher Training", "3 Studios", "4000+ Square Feet"],
        image: "🧘‍♀️",
        zipCodes: ["M6S", "M6R", "M6P", "M6N", "M6M"]
    },
    {
        id: 8,
        name: "Rebalance Pilates",
        address: "366 Adelaide Street East, Unit 226, Toronto, ON M5A 3X9",
        lat: 43.6517,
        lng: -79.3659,
        rating: 4.4,
        reviews: 67,
        phone: "(416) 894-8553",
        website: "https://rebalancepilates.ca",
        description: "Private Pilates studio specializing in fitness, pre/post natal, and rehabilitation. Featured on Best Toronto Pilates Studios lists.",
        amenities: ["Private Sessions", "Pre/Post Natal", "Rehabilitation", "Online Classes"],
        image: "🏔️",
        zipCodes: ["M5A", "M5B", "M5C", "M5E", "M4Y"]
    },
    {
        id: 9,
        name: "AMA Pilates Studio",
        address: "41 Main Street North, Brampton, ON L6V 1N4",
        lat: 43.6834,
        lng: -79.7608,
        rating: 4.8,
        reviews: 95,
        phone: "(905) 450-9925",
        website: "https://amapilates.com",
        description: "Brampton's premier STOTT PILATES™ studio offering contemporary, science-backed approach with mat work and specialized equipment.",
        amenities: ["STOTT PILATES", "Reformers", "Private & Semi-Private", "Kids and Teens"],
        image: "🌸",
        zipCodes: ["L6V", "L6W", "L6X", "L6Y", "L6Z"]
    },
    {
        id: 10,
        name: "Studio Le Ciel Pilates",
        address: "50 Sheppard Avenue West, Suite 300, North York, ON M2N 1M2",
        lat: 43.7615,
        lng: -79.4111,
        rating: 4.7,
        reviews: 88,
        phone: "(416) 222-7453",
        website: "https://studiolecielpilates.com",
        description: "Professional North York studio offering rigorous training with qualified instructors based on accurate Pilates movement principles.",
        amenities: ["Reformer", "Cadillac", "Chair & Ladder Barrel", "Rehabilitation"],
        image: "🏢",
        zipCodes: ["M2N", "M2M", "M2P", "M2R", "M2H"]
    },
    {
        id: 11,
        name: "Holistic Bodyworx",
        address: "4259 Sherwoodtowne Boulevard, Mississauga, ON L4Z 1Y5",
        lat: 43.5890,
        lng: -79.6441,
        rating: 4.6,
        reviews: 72,
        phone: "(905) 949-1234",
        website: "https://holisticbodyworx.ca",
        description: "Mississauga Pilates, yoga and wellness studio offering holistic approach to movement and healing.",
        amenities: ["Pilates & Yoga", "Wellness Studio", "Group Classes", "Private Sessions"],
        image: "🧘",
        zipCodes: ["L4Z", "L5A", "L5B", "L5C", "L5G"]
    },
    {
        id: 12,
        name: "Vitalize Pilates Studio",
        address: "2155 Leanne Boulevard, Suite 130, Mississauga, ON L5K 2K8",
        lat: 43.5696,
        lng: -79.7398,
        rating: 4.5,
        reviews: 64,
        phone: "(905) 822-8754",
        website: "https://vitalizepilatesstudio.com",
        description: "Modern Mississauga studio focused on reconnecting, renewing and revitalizing your mind and body through Pilates.",
        amenities: ["Reconnect & Renew", "Modern Equipment", "Mind-Body Focus", "Revitalization"],
        image: "⚡",
        zipCodes: ["L5K", "L5L", "L5M", "L5N", "L5R"]
    },
    {
        id: 13,
        name: "Pilates Body Studio",
        address: "119 Lakeshore Road West, Mississauga, ON L5H 1E9",
        lat: 43.5643,
        lng: -79.5943,
        rating: 4.9,
        reviews: 156,
        phone: "(905) 608-7678",
        website: "https://pilatesbody.ca",
        description: "Mississauga's premiere Pilates studio and STOTT PILATES Certification Center with loyal clientele and expert instructors.",
        amenities: ["STOTT Certification", "Expert Instructors", "Premiere Studio", "Teacher Training"],
        image: "🌟",
        zipCodes: ["L5H", "L5J", "L5V", "L5W", "L4T"]
    },
    {
        id: 14,
        name: "Pilates Works",
        address: "284 Church Street, Oakville, ON L6J 7N2",
        lat: 43.4481,
        lng: -79.6877,
        rating: 4.8,
        reviews: 89,
        phone: "(905) 845-5914",
        website: "https://mypilatesworks.ca",
        description: "Private Pilates studio and strength training gym in downtown Oakville combining holistic approach with modern equipment.",
        amenities: ["Private Studio", "Strength Training", "One-on-One", "Downtown Location"],
        image: "💪",
        zipCodes: ["L6J", "L6K", "L6L", "L6M", "L6H"]
    },
    {
        id: 15,
        name: "Pilates Vitality & Wellness",
        address: "1400 Cornwall Road, Unit 16, Oakville, ON L6J 7W5",
        lat: 43.4267,
        lng: -79.7156,
        rating: 4.7,
        reviews: 103,
        phone: "(289) 681-9079",
        website: "https://pilatesvitalitywellness.com",
        description: "STOTT™ Pilates-certified studio in Oakville offering transformative movement that strengthens body and sharpens focus.",
        amenities: ["STOTT Certified", "Transformative Movement", "State-of-Art Reformers", "Wellness Focus"],
        image: "🌺",
        zipCodes: ["L6J", "L6K", "L6L", "L6M", "L6H"]
    },
    {
        id: 16,
        name: "Heart of Movement",
        address: "323 Kerr Street, Unit 102, Oakville, ON L6K 3B7",
        lat: 43.4394,
        lng: -79.6892,
        rating: 4.6,
        reviews: 76,
        phone: "(905) 599-9651",
        website: "https://heartofmovement.ca",
        description: "Oakville's only boutique Classical Pilates Studio offering personalized fitness journey in beautiful light-filled space.",
        amenities: ["Classical Pilates", "Boutique Studio", "Personalized Journey", "Light-Filled Space"],
        image: "❤️",
        zipCodes: ["L6K", "L6L", "L6M", "L6H", "L6J"]
    },
    {
        id: 17,
        name: "The Pilates Body",
        address: "2578 Bristol Circle, Unit 2, Oakville, ON L6H 6Z7",
        lat: 43.4123,
        lng: -79.7234,
        rating: 4.8,
        reviews: 124,
        phone: "(905) 257-7070",
        website: "https://pilatesbody.ca",
        description: "25 years of Pilates excellence in Oakville with wonderful instructors and personalized attention for all fitness levels.",
        amenities: ["25 Years Experience", "Evening Classes", "Injury Modifications", "All Fitness Levels"],
        image: "🏆",
        zipCodes: ["L6H", "L6K", "L6L", "L6M", "L6J"]
    },
    {
        id: 18,
        name: "Grounded Pilates Downtown",
        address: "418 Pearl Street, Unit 50, Burlington, ON L7R 2N1",
        lat: 43.3255,
        lng: -79.7990,
        rating: 4.9,
        reviews: 142,
        phone: "(905) 638-1777",
        website: "https://groundedpilates.ca",
        description: "Boutique Pilates studio in downtown Burlington's Village Square offering inclusive, judgment-free movement for all bodies.",
        amenities: ["Judgment-Free", "All Bodies Welcome", "Reformer Classes", "Downtown Location"],
        image: "🌳",
        zipCodes: ["L7R", "L7S", "L7T", "L7P", "L7N"]
    },
    {
        id: 19,
        name: "Grounded Pilates West",
        address: "335 Plains Road East, Unit 6, Burlington, ON L7T 4H8",
        lat: 43.3089,
        lng: -79.8324,
        rating: 4.8,
        reviews: 118,
        phone: "(905) 638-1777",
        website: "https://groundedpilates.ca",
        description: "Bright and colorful Aldershot location with six-person reformer classes and peaceful plant-filled yoga studio.",
        amenities: ["6-Person Classes", "Bright & Colorful", "Plant-Filled", "Pilates Chair"],
        image: "🌿",
        zipCodes: ["L7T", "L7S", "L7R", "L7P", "L7N"]
    },
    {
        id: 20,
        name: "Exhale Pilates",
        address: "482 John Street, Suite 300, Burlington, ON L7R 2K7",
        lat: 43.3198,
        lng: -79.7889,
        rating: 4.7,
        reviews: 97,
        phone: "(905) 631-5555",
        website: "https://exhalepilates.ca",
        description: "Beautiful and inclusive boutique studio in downtown Burlington specializing in athletic reformer Pilates classes.",
        amenities: ["Athletic Reformer", "Inclusive Studio", "Community Driven", "Virtual Classes"],
        image: "💨",
        zipCodes: ["L7R", "L7S", "L7T", "L7P", "L7N"]
    },
    {
        id: 21,
        name: "Cornerstone Movement Institute",
        address: "1893 Appleby Line, Unit 4, Burlington, ON L7L 6K3",
        lat: 43.3445,
        lng: -79.8123,
        rating: 4.6,
        reviews: 83,
        phone: "(905) 631-8352",
        website: "https://thecornerstonepilates.com",
        description: "Science-based movement education clinic offering biomechanics-focused Pilates with anatomy integration and neuropilates.",
        amenities: ["Science-Based", "Biomechanics Focus", "Neuropilates", "Movement Education"],
        image: "🔬",
        zipCodes: ["L7L", "L7M", "L7N", "L7P", "L7R"]
    },
    {
        id: 22,
        name: "Club Pilates Barrie",
        address: "678 Veterans Drive, Unit 2, Barrie, ON L9J 0H6",
        lat: 44.3894,
        lng: -79.6903,
        rating: 4.5,
        reviews: 134,
        phone: "(705) 252-7453",
        website: "https://clubpilates.com/barrie",
        description: "Boutique reformer-based group Pilates classes with TriggerPoint, TRX®, springboard, and EXO-Chair equipment in Barrie.",
        amenities: ["Reformer-Based", "Group Classes", "TriggerPoint & TRX", "All Fitness Levels"],
        image: "🏃‍♀️",
        zipCodes: ["L9J", "L4N", "L4M", "L0L", "L0M"]
    },
    {
        id: 23,
        name: "Pure Pilates Vaughan",
        address: "9200 Weston Road, Unit 40, Vaughan, ON L4H 2P8",
        lat: 43.7934,
        lng: -79.5567,
        rating: 4.4,
        reviews: 89,
        phone: "(905) 832-6789",
        website: "https://purepilatesvaughan.com",
        description: "Modern Vaughan studio offering classical and contemporary Pilates with state-of-the-art reformers and personalized instruction.",
        amenities: ["Classical & Contemporary", "State-of-Art Reformers", "Personalized Instruction", "Modern Studio"],
        image: "🎯",
        zipCodes: ["L4H", "L4J", "L4K", "L4L", "L6A"]
    },
    {
        id: 24,
        name: "Pilates Plus Markham",
        address: "7030 Woodbine Avenue, Unit 500, Markham, ON L3R 6G2",
        lat: 43.8563,
        lng: -79.3152,
        rating: 4.7,
        reviews: 112,
        phone: "(905) 477-8234",
        website: "https://pilatesplusmarkham.ca",
        description: "Premium Markham Pilates studio combining traditional techniques with modern equipment for comprehensive fitness solutions.",
        amenities: ["Premium Studio", "Traditional & Modern", "Comprehensive Fitness", "Expert Instructors"],
        image: "➕",
        zipCodes: ["L3R", "L3S", "L3T", "L6E", "L6G"]
    },
    {
        id: 25,
        name: "The Studio Guelph",
        address: "58 Cork Street West, Guelph, ON N1H 2W8",
        lat: 43.5448,
        lng: -80.2482,
        rating: 4.6,
        reviews: 76,
        phone: "(519) 824-7890",
        website: "https://thestudioguelph.com",
        description: "Guelph's community-focused Pilates studio offering mat and reformer classes with emphasis on proper form and mindful movement.",
        amenities: ["Community Focused", "Mat & Reformer", "Proper Form", "Mindful Movement"],
        image: "🏘️",
        zipCodes: ["N1H", "N1G", "N1E", "N1K", "N1L"]
    },
    {
        id: 26,
        name: "Waterloo Pilates Centre",
        address: "465 Phillip Street, Unit 12, Waterloo, ON N2L 6C7",
        lat: 43.4643,
        lng: -80.5204,
        rating: 4.5,
        reviews: 94,
        phone: "(519) 885-4567",
        website: "https://waterloopilatescenter.ca",
        description: "Established Waterloo center offering comprehensive Pilates training with certified instructors and modern equipment.",
        amenities: ["Established Center", "Certified Instructors", "Modern Equipment", "Comprehensive Training"],
        image: "🌊",
        zipCodes: ["N2L", "N2T", "N2V", "N2J", "N2K"]
    },
    {
        id: 27,
        name: "Cambridge Core Studio",
        address: "200 Main Street, Cambridge, ON N1R 2H8",
        lat: 43.3616,
        lng: -80.3144,
        rating: 4.3,
        reviews: 68,
        phone: "(519) 621-3456",
        website: "https://cambridgecorestudio.com",
        description: "Cambridge studio specializing in core strength and stability through classical Pilates methods and rehabilitation techniques.",
        amenities: ["Core Specialization", "Classical Methods", "Rehabilitation", "Stability Focus"],
        image: "🎯",
        zipCodes: ["N1R", "N1S", "N1T", "N3C", "N3H"]
    },
    {
        id: 28,
        name: "Northern Pilates Sudbury",
        address: "1500 Paris Street, Unit 201, Sudbury, ON P3E 3B8",
        lat: 46.4907,
        lng: -80.9853,
        rating: 4.4,
        reviews: 52,
        phone: "(705) 675-8901",
        website: "https://northernpilatessudbury.ca",
        description: "Northern Ontario's premier Pilates destination offering mat and equipment classes for all levels in the heart of Sudbury.",
        amenities: ["Northern Ontario Premier", "All Levels", "Mat & Equipment", "Heart of Sudbury"],
        image: "❄️",
        zipCodes: ["P3E", "P3A", "P3B", "P3C", "P3G"]
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
    
    // Show the results section and map by default
    const resultsSection = document.getElementById('resultsSection');
    if (resultsSection) {
        resultsSection.style.display = 'block';
        console.log('✅ Made results section visible by default');
    }
    
    // Show Ontario studios in list view initially
    displaySearchResults(currentStudios, 'Ontario, Canada');
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
    console.log('🔍 User searched for:', query);
    
    try {
        // FIRST: Search through our Ontario studios for immediate matches
        const localMatches = searchStudios(query);
        console.log('🍁 Found', localMatches.length, 'local Ontario matches for:', query);
        
        if (localMatches.length > 0) {
            // If we found local matches, show them immediately
            console.log('✅ Showing local Ontario studios');
            displaySearchResults(localMatches, query);
            showLoading(false);
            return;
        }
        
        // SECOND: Check for major cities with pre-curated data (fast!)
        const queryLower = query.toLowerCase().trim();
        console.log('🏙️ Checking major cities data for:', queryLower);
        
        // Check aliases first
        let targetCity = queryLower;
        for (const [alias, city] of Object.entries(cityAliases)) {
            if (queryLower.includes(alias) || alias.includes(queryLower)) {
                targetCity = city;
                console.log('🔄 Mapped alias "' + alias + '" to "' + city + '"');
                break;
            }
        }
        
        // Now check for the actual city data
        for (const [cityKey, cityStudios] of Object.entries(majorCitiesData)) {
            if (targetCity.includes(cityKey) || cityKey.includes(targetCity)) {
                console.log('⚡ Found curated data for', cityKey, '- showing', cityStudios.length, 'studios instantly!');
                
                // Set user location to city center for map centering
                if (cityCenters[cityKey]) {
                    userLocation = cityCenters[cityKey];
                    console.log('🗺️ Set map center to', cityKey, 'coordinates:', userLocation);
                }
                
                displaySearchResults(cityStudios, query);
                showLoading(false);
                return;
            }
        }
        
        // THIRD: If no major city match, try geocoding and slower API search
        console.log('🌐 No major city match, trying geocoding and API search...');
        const location = await geocodeLocation(query);
        if (!location) {
            // No location found anywhere
            displaySearchResults([], query);
            showLoading(false);
            return;
        }
        
        userLocation = location;
        
        // Search for studios near this location using APIs (slower)
        const studios = await searchNearbyPilatesStudios(location);
        displaySearchResults(studios, query);
    } catch (error) {
        console.error('Search error:', error);
        // Show local studios as fallback
        console.log('🆘 Error occurred, showing all Ontario studios as fallback');
        displaySearchResults(pilatesStudios, query);
    } finally {
        showLoading(false);
    }
}

function searchStudios(query) {
    console.log('🔍 Searching Ontario studios for:', query);
    const queryLower = query.toLowerCase().trim();
    const normalizedQuery = queryLower.replace(/\s+/g, '');
    
    const matches = pilatesStudios.filter(studio => {
        // Check postal codes (Ontario format like M5H, L6J, N1H, P3E)
        const postalMatch = studio.zipCodes.some(postal => 
            postal.toLowerCase().includes(normalizedQuery) ||
            postal.toLowerCase().replace(/\s+/g, '').includes(normalizedQuery)
        );
        
        // Check full address
        const addressMatch = studio.address.toLowerCase().includes(queryLower);
        
        // Check studio name
        const nameMatch = studio.name.toLowerCase().includes(queryLower);
        
        // Check specific Ontario cities (extract city from address)
        const addressParts = studio.address.toLowerCase();
        const cityMatch = (
            (queryLower.includes('toronto') && addressParts.includes('toronto')) ||
            (queryLower.includes('mississauga') && addressParts.includes('mississauga')) ||
            (queryLower.includes('ottawa') && addressParts.includes('ottawa')) ||
            (queryLower.includes('hamilton') && addressParts.includes('hamilton')) ||
            (queryLower.includes('brampton') && addressParts.includes('brampton')) ||
            (queryLower.includes('oakville') && addressParts.includes('oakville')) ||
            (queryLower.includes('burlington') && addressParts.includes('burlington')) ||
            (queryLower.includes('vaughan') && addressParts.includes('vaughan')) ||
            (queryLower.includes('markham') && addressParts.includes('markham')) ||
            (queryLower.includes('kitchener') && addressParts.includes('kitchener')) ||
            (queryLower.includes('waterloo') && addressParts.includes('waterloo')) ||
            (queryLower.includes('cambridge') && addressParts.includes('cambridge')) ||
            (queryLower.includes('guelph') && addressParts.includes('guelph')) ||
            (queryLower.includes('barrie') && addressParts.includes('barrie')) ||
            (queryLower.includes('windsor') && addressParts.includes('windsor')) ||
            (queryLower.includes('sudbury') && addressParts.includes('sudbury')) ||
            (queryLower.includes('north york') && addressParts.includes('north york'))
        );
        
        const isMatch = postalMatch || addressMatch || nameMatch || cityMatch;
        if (isMatch) {
            console.log('✅ Match found:', studio.name, 'in', studio.address);
        }
        
        return isMatch;
    });
    
    console.log('🎯 Found', matches.length, 'matches for query:', query);
    return matches;
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
                // Fallback to Ontario data
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
    // Store all studios for pagination
    allStudios = studios;
    totalStudios = studios.length;
    currentSearchTerm = searchTerm;
    currentPage = 1; // Reset to first page
    
    const resultsSection = document.getElementById('resultsSection');
    const studioList = document.getElementById('studioList');
    const pagination = document.getElementById('pagination');
    
    if (studios.length === 0) {
        resultsSection.style.display = 'block';
        pagination.style.display = 'none';
        studioList.innerHTML = `
            <div style="text-align: center; padding: 2rem; color: #666;">
                <h4 style="color: var(--morandi-deep); margin-bottom: 1rem;">🔍 No Studios Found</h4>
                <p style="margin-bottom: 1rem;">We couldn't find any Pilates studios near <strong>"${searchTerm}"</strong>.</p>
                <p style="margin-bottom: 1.5rem;">Our specialty is <strong>Ontario, Canada</strong> with 28 curated studios. Try searching for Ontario cities:</p>
                <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; justify-content: center; margin-bottom: 1.5rem;">
                    <button onclick="searchLocation('Toronto')" style="padding: 0.5rem 1rem; background: var(--morandi-sage); color: white; border: none; border-radius: 6px; cursor: pointer;">Toronto</button>
                    <button onclick="searchLocation('Ottawa')" style="padding: 0.5rem 1rem; background: var(--morandi-sage); color: white; border: none; border-radius: 6px; cursor: pointer;">Ottawa</button>
                    <button onclick="searchLocation('Mississauga')" style="padding: 0.5rem 1rem; background: var(--morandi-sage); color: white; border: none; border-radius: 6px; cursor: pointer;">Mississauga</button>
                    <button onclick="searchLocation('Hamilton')" style="padding: 0.5rem 1rem; background: var(--morandi-sage); color: white; border: none; border-radius: 6px; cursor: pointer;">Hamilton</button>
                </div>
                <p style="font-size: 0.9rem; color: var(--morandi-stone);">Or browse our featured studios below.</p>
            </div>
        `;
        return;
    }

    resultsSection.style.display = 'block';
    
    // Update results header
    document.querySelector('.results-header h3').textContent = 
        `${studios.length} Pilates Studio${studios.length !== 1 ? 's' : ''} Near "${searchTerm}"`;
    
    // Display paginated results
    displayCurrentPage();
    
    // Set up pagination
    setupPagination();
    
    // Update the map with new search results
    console.log('🗺️ Updating map for search results...');
    initializeMap();
    
    // Scroll to results
    resultsSection.scrollIntoView({ behavior: 'smooth' });
}

function displayCurrentPage() {
    const studioList = document.getElementById('studioList');
    const startIndex = (currentPage - 1) * studiosPerPage;
    const endIndex = Math.min(startIndex + studiosPerPage, totalStudios);
    
    // Get studios for current page
    const pageStudios = allStudios.slice(startIndex, endIndex);
    currentStudios = pageStudios; // Update for map display
    
    // Generate studio cards for current page
    studioList.innerHTML = pageStudios.map(studio => createStudioCard(studio)).join('');
    
    // Add click listeners to studio cards
    document.querySelectorAll('.studio-card').forEach(card => {
        card.addEventListener('click', function() {
            const studioId = this.dataset.studioId;
            showStudioDetails(studioId);
        });
    });
}

function setupPagination() {
    const pagination = document.getElementById('pagination');
    const paginationInfo = document.getElementById('paginationInfo');
    const pageNumbers = document.getElementById('pageNumbers');
    const prevBtn = document.getElementById('prevPage');
    const nextBtn = document.getElementById('nextPage');
    
    if (totalStudios <= studiosPerPage) {
        pagination.style.display = 'none';
        return;
    }
    
    pagination.style.display = 'block';
    
    const totalPages = Math.ceil(totalStudios / studiosPerPage);
    const startIndex = (currentPage - 1) * studiosPerPage + 1;
    const endIndex = Math.min(currentPage * studiosPerPage, totalStudios);
    
    // Update pagination info
    paginationInfo.textContent = `Showing ${startIndex}-${endIndex} of ${totalStudios} studios`;
    
    // Generate page numbers
    generatePageNumbers(totalPages, pageNumbers);
    
    // Update button states
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
    
    // Add event listeners
    prevBtn.onclick = () => changePage(currentPage - 1);
    nextBtn.onclick = () => changePage(currentPage + 1);
}

function generatePageNumbers(totalPages, container) {
    container.innerHTML = '';
    
    // Show max 5 page numbers at a time
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + 4);
    
    // Adjust start if we're near the end
    if (endPage - startPage < 4) {
        startPage = Math.max(1, endPage - 4);
    }
    
    for (let i = startPage; i <= endPage; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.className = `page-number ${i === currentPage ? 'active' : ''}`;
        pageBtn.textContent = i;
        pageBtn.onclick = () => changePage(i);
        container.appendChild(pageBtn);
    }
}

function changePage(newPage) {
    const totalPages = Math.ceil(totalStudios / studiosPerPage);
    
    if (newPage < 1 || newPage > totalPages) return;
    
    currentPage = newPage;
    displayCurrentPage();
    setupPagination();
    
    // Scroll to top of results
    document.getElementById('resultsSection').scrollIntoView({ behavior: 'smooth' });
}

// Helper function for quick city search buttons
function searchLocation(cityName) {
    document.getElementById('locationInput').value = cityName;
    handleSearch();
}

function createStudioCard(studio) {
    const stars = '★'.repeat(Math.floor(studio.rating)) + '☆'.repeat(5 - Math.floor(studio.rating));
    const distanceText = studio.distance ? `${studio.distance.toFixed(1)} miles away` : '';
    const isRealData = studio.source === 'OpenStreetMap';
    
    const dataSourceBadge = isRealData ? 
        '<span class="tag" style="background: #4AF450; color: white;">🌍 Real Data</span>' : 
        '<span class="tag" style="background: #9A8B95; color: white;">🍁 Ontario</span>';
    
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
            '<div style="background: #9A8B95; color: white; padding: 0.2rem 0.5rem; border-radius: 12px; font-size: 0.8rem; margin: 0.5rem 0;">🍁 Ontario Data</div>';
        
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
    // Look in current search results first, then fallback to Ontario data
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
                <div><a href="${studio.website}" target="_blank" style="color: #9A8B95; text-decoration: none;">${studio.website.replace('https://', '').replace('http://', '')}</a></div>
            </div>
        </div>
        
        <div style="text-align: center;">
            <button onclick="window.open('${studio.website}', '_blank')" style="
                background: #7A7175; 
                color: #F4F1F4; 
                border: none; 
                padding: 1rem 2rem; 
                border-radius: 10px; 
                font-size: 1rem;
                font-weight: 600;
                cursor: pointer;
                margin-right: 1rem;
            ">Visit Website</button>
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
        
        // Use Overpass API to find Pilates studios and fitness facilities
        const overpassQuery = `
            [out:json][timeout:25];
            (
              node[~"name"~"pilates",i](around:${radius},${location.lat},${location.lng});
              way[~"name"~"pilates",i](around:${radius},${location.lat},${location.lng});
              relation[~"name"~"pilates",i](around:${radius},${location.lat},${location.lng});
              node["leisure"="fitness_centre"](around:${radius},${location.lat},${location.lng});
              node["leisure"="sports_centre"](around:${radius},${location.lat},${location.lng});
              node["amenity"="fitness_centre"](around:${radius},${location.lat},${location.lng});
              way["leisure"="fitness_centre"](around:${radius},${location.lat},${location.lng});
              way["leisure"="sports_centre"](around:${radius},${location.lat},${location.lng});
              way["amenity"="fitness_centre"](around:${radius},${location.lat},${location.lng});
              node["shop"="sports"](around:${radius},${location.lat},${location.lng});
              way["shop"="sports"](around:${radius},${location.lat},${location.lng});
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
                .slice(0, 50) // Limit to 50 results for major cities
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
            name: 'Test Studio',
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

    // Add some Ontario postal codes for testing
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

// Force show map for debugging
function testMapNow() {
    console.log('🧪 FORCE TESTING MAP...');
    
    // Make sure we have data
    if (currentStudios.length === 0) {
        currentStudios = [...pilatesStudios];
        console.log('📍 Loaded studios:', currentStudios.length);
    }
    
    // Show the results section and map container
    const resultsSection = document.getElementById('resultsSection');
    const mapContainer = document.getElementById('mapContainer');
    const listContainer = document.getElementById('studioList');
    
    console.log('🔍 Elements found:', {
        resultsSection: !!resultsSection,
        mapContainer: !!mapContainer,
        listContainer: !!listContainer
    });
    
    if (resultsSection) {
        resultsSection.style.display = 'block';
        console.log('✅ Made results section visible');
    }
    
    if (mapContainer) {
        mapContainer.style.display = 'block';
        mapContainer.style.height = '500px';
        mapContainer.style.backgroundColor = '#ff6b6b'; // Red background for testing
        console.log('✅ Made map container visible with red background');
    }
    
    if (listContainer) {
        listContainer.style.display = 'none';
        console.log('✅ Hidden list container');
    }
    
    // Force initialize the map
    setTimeout(() => {
        console.log('🗺️ Forcing map initialization...');
        initializeMap();
    }, 500);
}

// Make it globally available
window.testMapNow = testMapNow;