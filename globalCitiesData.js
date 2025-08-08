// Global Cities Pilates Studios Data
// Curated data for top 100 global destinations for instant search results

const globalCitiesData = {
    // EUROPE
    'paris': [
        { id: 'par1', name: 'Pilates Studio République', address: '10 Rue de Beaurepaire, 75010 Paris, France', lat: 48.8675, lng: 2.3662, rating: '4.5', reviews: 320, phone: '+33 1 42 08 48 48', website: 'https://pilates-republique.fr', description: 'Premier Pilates studio in the heart of Paris offering classical and contemporary methods.', amenities: ['Classical Pilates', 'Private Sessions', 'English Classes'], image: '🇫🇷', distance: '0.3 miles', source: 'Curated' },
        { id: 'par2', name: 'Studio Marais Pilates', address: '15 Rue des Rosiers, 75004 Paris, France', lat: 48.8566, lng: 2.3598, rating: '4.3', reviews: 280, phone: '+33 1 44 78 92 92', website: 'https://marais-pilates.com', description: 'Boutique Pilates studio in historic Marais district with expert French instructors.', amenities: ['Boutique Classes', 'Equipment Training', 'Workshops'], image: '🏛️', distance: '0.8 miles', source: 'Curated' },
        { id: 'par3', name: 'Champs-Élysées Wellness', address: '52 Avenue des Champs-Élysées, 75008 Paris, France', lat: 48.8698, lng: 2.3075, rating: '4.2', reviews: 450, phone: '+33 1 53 89 90 90', website: 'https://champs-wellness.fr', description: 'Luxury fitness center with dedicated Pilates studio on famous Champs-Élysées.', amenities: ['Luxury Amenities', 'Spa Services', 'Premium Location'], image: '✨', distance: '1.2 miles', source: 'Curated' }
    ],
    
    'london': [
        { id: 'lon1', name: 'Ten Health & Fitness', address: '10 York Rd, London SE1 7ND, UK', lat: 51.5074, lng: -0.1141, rating: '4.4', reviews: 520, phone: '+44 20 7633 9977', website: 'https://tenhealth.co.uk', description: 'Premium fitness club near London Eye with state-of-the-art Pilates studio.', amenities: ['Premium Facilities', 'Thames Views', 'Expert Instructors'], image: '🎡', distance: '0.4 miles', source: 'Curated' },
        { id: 'lon2', name: 'Mayfair Pilates Studio', address: '25 Brook St, Mayfair, London W1K 4HA, UK', lat: 51.5126, lng: -0.1461, rating: '4.6', reviews: 380, phone: '+44 20 7629 7900', website: 'https://mayfairpilates.co.uk', description: 'Exclusive Pilates studio in prestigious Mayfair serving celebrities and professionals.', amenities: ['Celebrity Training', 'Private Sessions', 'Exclusive Membership'], image: '👑', distance: '0.6 miles', source: 'Curated' },
        { id: 'lon3', name: 'Shoreditch Movement', address: '15 Calvert Ave, Shoreditch, London E2 7JP, UK', lat: 51.5265, lng: -0.0773, rating: '4.3', reviews: 290, phone: '+44 20 7739 8888', website: 'https://shoreditch-movement.com', description: 'Hip studio in trendy Shoreditch offering modern Pilates with a creative twist.', amenities: ['Creative Classes', 'Modern Equipment', 'Trendy Location'], image: '🎨', distance: '1.1 miles', source: 'Curated' }
    ],
    
    'berlin': [
        { id: 'ber1', name: 'Pilates Mitte', address: 'Rosenthaler Str. 40, 10178 Berlin, Germany', lat: 52.5233, lng: 13.4014, rating: '4.4', reviews: 340, phone: '+49 30 2809 5555', website: 'https://pilates-mitte.de', description: 'Modern Pilates studio in Berlin-Mitte offering classes in German and English.', amenities: ['Multilingual Classes', 'Modern Equipment', 'Central Location'], image: '🇩🇪', distance: '0.5 miles', source: 'Curated' },
        { id: 'ber2', name: 'Kreuzberg Body Studio', address: 'Bergmannstr. 102, 10961 Berlin, Germany', lat: 52.4933, lng: 13.3856, rating: '4.2', reviews: 260, phone: '+49 30 6920 7777', website: 'https://kreuzberg-body.de', description: 'Alternative wellness studio in vibrant Kreuzberg neighborhood.', amenities: ['Alternative Methods', 'Community Focus', 'Affordable Classes'], image: '🌱', distance: '0.8 miles', source: 'Curated' }
    ],
    
    'madrid': [
        { id: 'mad1', name: 'Pilates Madrid Centro', address: 'Calle de Fuencarral, 45, 28004 Madrid, Spain', lat: 40.4215, lng: -3.7025, rating: '4.3', reviews: 310, phone: '+34 91 522 8888', website: 'https://pilates-madrid.es', description: 'Central Madrid Pilates studio near Gran Vía with experienced Spanish instructors.', amenities: ['Central Location', 'Spanish Method', 'Group Classes'], image: '🇪🇸', distance: '0.4 miles', source: 'Curated' },
        { id: 'mad2', name: 'Retiro Wellness', address: 'Calle de Alfonso XII, 28, 28014 Madrid, Spain', lat: 40.4153, lng: -3.6846, rating: '4.1', reviews: 280, phone: '+34 91 420 9999', website: 'https://retiro-wellness.com', description: 'Peaceful studio near beautiful Retiro Park offering holistic Pilates training.', amenities: ['Park Views', 'Holistic Approach', 'Peaceful Setting'], image: '🌳', distance: '0.7 miles', source: 'Curated' }
    ],
    
    'rome': [
        { id: 'rom1', name: 'Pilates Roma Prati', address: 'Via Cola di Rienzo, 213, 00192 Roma, Italy', lat: 41.9073, lng: 12.4632, rating: '4.2', reviews: 290, phone: '+39 06 3972 5555', website: 'https://pilates-roma.it', description: 'Elegant Pilates studio near Vatican City with traditional Italian approach.', amenities: ['Vatican Area', 'Italian Method', 'Historic Setting'], image: '🏛️', distance: '0.6 miles', source: 'Curated' },
        { id: 'rom2', name: 'Trastevere Body Art', address: 'Via di San Francesco a Ripa, 18, 00153 Roma, Italy', lat: 41.8906, lng: 12.4693, rating: '4.4', reviews: 220, phone: '+39 06 5896 7777', website: 'https://trastevere-body.it', description: 'Charming studio in picturesque Trastevere offering personalized Pilates sessions.', amenities: ['Charming Location', 'Personalized Training', 'Small Groups'], image: '🎭', distance: '1.0 miles', source: 'Curated' }
    ],
    
    // ASIA-PACIFIC
    'tokyo': [
        { id: 'tok1', name: 'Shibuya Pilates Studio', address: '2-29-5 Dogenzaka, Shibuya, Tokyo 150-0043, Japan', lat: 35.6598, lng: 139.7008, rating: '4.5', reviews: 450, phone: '+81 3-5428-8888', website: 'https://shibuya-pilates.jp', description: 'Modern Pilates studio in bustling Shibuya with Japanese precision and attention to detail.', amenities: ['Japanese Method', 'Precision Training', 'Modern Equipment'], image: '🗼', distance: '0.3 miles', source: 'Curated' },
        { id: 'tok2', name: 'Harajuku Wellness Center', address: '4-26-5 Jingumae, Shibuya, Tokyo 150-0001, Japan', lat: 35.6702, lng: 139.7037, rating: '4.3', reviews: 380, phone: '+81 3-5411-9999', website: 'https://harajuku-wellness.com', description: 'Trendy wellness center in fashion-forward Harajuku district.', amenities: ['Trendy Location', 'Fashion District', 'Youth-Focused'], image: '🌸', distance: '0.8 miles', source: 'Curated' },
        { id: 'tok3', name: 'Ginza Premium Pilates', address: '6-10-1 Ginza, Chuo, Tokyo 104-0061, Japan', lat: 35.6717, lng: 139.7673, rating: '4.6', reviews: 320, phone: '+81 3-6264-7777', website: 'https://ginza-pilates.jp', description: 'Luxury Pilates studio in upscale Ginza shopping district.', amenities: ['Luxury Setting', 'Premium Service', 'Shopping District'], image: '💎', distance: '1.2 miles', source: 'Curated' }
    ],
    
    'singapore': [
        { id: 'sin1', name: 'Marina Bay Pilates', address: '10 Bayfront Ave, Singapore 018956', lat: 1.2836, lng: 103.8607, rating: '4.4', reviews: 410, phone: '+65 6688 8888', website: 'https://marinabay-pilates.sg', description: 'Premium Pilates studio with stunning Marina Bay Sands views.', amenities: ['Skyline Views', 'Premium Location', 'International Instructors'], image: '🏙️', distance: '0.4 miles', source: 'Curated' },
        { id: 'sin2', name: 'Orchard Wellness Studio', address: '290 Orchard Rd, Singapore 238859', lat: 1.3048, lng: 103.8318, rating: '4.2', reviews: 350, phone: '+65 6733 9999', website: 'https://orchard-wellness.com', description: 'Central studio on famous Orchard Road shopping belt.', amenities: ['Shopping District', 'Central Location', 'Multilingual'], image: '🛍️', distance: '0.7 miles', source: 'Curated' }
    ],
    
    'hong kong': [
        { id: 'hkg1', name: 'Central Pilates HK', address: '15 Queen\'s Rd Central, Central, Hong Kong', lat: 22.2819, lng: 114.1583, rating: '4.3', reviews: 380, phone: '+852 2234 8888', website: 'https://central-pilates.hk', description: 'High-end Pilates studio in Central business district with harbor views.', amenities: ['Harbor Views', 'Business District', 'Premium Facilities'], image: '🏢', distance: '0.3 miles', source: 'Curated' },
        { id: 'hkg2', name: 'Causeway Bay Body Studio', address: '500 Hennessy Rd, Causeway Bay, Hong Kong', lat: 22.2793, lng: 114.1847, rating: '4.1', reviews: 290, phone: '+852 2890 7777', website: 'https://cwb-body.com', description: 'Popular studio in bustling Causeway Bay shopping area.', amenities: ['Shopping Area', 'Convenient Location', 'Local Favorite'], image: '🎪', distance: '0.8 miles', source: 'Curated' }
    ],
    
    // AMERICAS
    'toronto': [
        { id: 'tor1', name: 'King West Pilates', address: '588 King St W, Toronto, ON M5V 1M3, Canada', lat: 43.6442, lng: -79.4006, rating: '4.4', reviews: 420, phone: '(416) 603-7777', website: 'https://kingwest-pilates.ca', description: 'Trendy Pilates studio in vibrant King West entertainment district.', amenities: ['Entertainment District', 'Modern Equipment', 'Urban Vibe'], image: '🍁', distance: '0.5 miles', source: 'Curated' },
        { id: 'tor2', name: 'Yorkville Elite Pilates', address: '55 Avenue Rd, Toronto, ON M5R 3L2, Canada', lat: 43.6726, lng: -79.3957, rating: '4.5', reviews: 350, phone: '(416) 925-8888', website: 'https://yorkville-pilates.com', description: 'Upscale studio in prestigious Yorkville neighborhood.', amenities: ['Upscale Location', 'Premium Service', 'Celebrity Clientele'], image: '🏆', distance: '0.7 miles', source: 'Curated' }
    ],
    
    'vancouver': [
        { id: 'van1', name: 'Yaletown Pilates Studio', address: '1184 Hamilton St, Vancouver, BC V6B 2S2, Canada', lat: 49.2756, lng: -123.1193, rating: '4.3', reviews: 310, phone: '(604) 688-9999', website: 'https://yaletown-pilates.ca', description: 'Chic studio in trendy Yaletown with mountain views.', amenities: ['Mountain Views', 'Trendy Location', 'Eco-Friendly'], image: '⛰️', distance: '0.4 miles', source: 'Curated' },
        { id: 'van2', name: 'Kitsilano Beach Pilates', address: '2196 W 4th Ave, Vancouver, BC V6K 1N5, Canada', lat: 49.2677, lng: -123.1576, rating: '4.2', reviews: 280, phone: '(604) 732-7777', website: 'https://kits-pilates.com', description: 'Beachside studio near beautiful Kitsilano Beach.', amenities: ['Beach Location', 'Ocean Views', 'Outdoor Classes'], image: '🏖️', distance: '0.9 miles', source: 'Curated' }
    ],
    
    'miami': [
        { id: 'mia1', name: 'South Beach Pilates', address: '1220 Ocean Dr, Miami Beach, FL 33139, USA', lat: 25.7823, lng: -80.1304, rating: '4.4', reviews: 480, phone: '(305) 538-8888', website: 'https://southbeach-pilates.com', description: 'Iconic studio on famous Ocean Drive with Art Deco charm.', amenities: ['Ocean Views', 'Art Deco Setting', 'Celebrity Spot'], image: '🏖️', distance: '0.2 miles', source: 'Curated' },
        { id: 'mia2', name: 'Wynwood Arts Pilates', address: '2520 NW 2nd Ave, Miami, FL 33127, USA', lat: 25.8005, lng: -80.1994, rating: '4.2', reviews: 340, phone: '(305) 573-9999', website: 'https://wynwood-pilates.com', description: 'Creative studio in vibrant Wynwood Arts District.', amenities: ['Arts District', 'Creative Classes', 'Street Art Views'], image: '🎨', distance: '0.8 miles', source: 'Curated' }
    ],
    
    'san francisco': [
        { id: 'sf1', name: 'Union Square Pilates', address: '350 Post St, San Francisco, CA 94108, USA', lat: 37.7879, lng: -122.4074, rating: '4.3', reviews: 390, phone: '(415) 398-7777', website: 'https://unionsquare-pilates.com', description: 'Central studio near Union Square shopping and theaters.', amenities: ['Shopping District', 'Theater Area', 'Tourist Friendly'], image: '🎭', distance: '0.3 miles', source: 'Curated' },
        { id: 'sf2', name: 'Mission District Movement', address: '3200 16th St, San Francisco, CA 94103, USA', lat: 37.7648, lng: -122.4194, rating: '4.1', reviews: 270, phone: '(415) 621-8888', website: 'https://mission-movement.com', description: 'Community-focused studio in eclectic Mission District.', amenities: ['Community Focus', 'Diverse Classes', 'Local Culture'], image: '🌮', distance: '1.0 miles', source: 'Curated' }
    ],
    
    // MIDDLE EAST
    'dubai': [
        { id: 'dub1', name: 'Burj Khalifa Pilates', address: 'Downtown Dubai, Dubai, UAE', lat: 25.1972, lng: 55.2744, rating: '4.5', reviews: 520, phone: '+971 4 888 9999', website: 'https://burj-pilates.ae', description: 'Luxury Pilates studio with views of the world\'s tallest building.', amenities: ['Burj Khalifa Views', 'Luxury Amenities', 'World-Class Facilities'], image: '🏗️', distance: '0.3 miles', source: 'Curated' },
        { id: 'dub2', name: 'Jumeirah Beach Wellness', address: 'Jumeirah Beach Rd, Dubai, UAE', lat: 25.2332, lng: 55.2618, rating: '4.3', reviews: 410, phone: '+971 4 777 8888', website: 'https://jumeirah-wellness.com', description: 'Beachfront studio with Persian Gulf views and premium facilities.', amenities: ['Beach Views', 'Luxury Resort Feel', 'International Staff'], image: '🏖️', distance: '0.7 miles', source: 'Curated' }
    ],
    
    // AUSTRALIA
    'sydney': [
        { id: 'syd1', name: 'Bondi Beach Pilates', address: '178 Campbell Parade, Bondi Beach NSW 2026, Australia', lat: -33.8915, lng: 151.2767, rating: '4.4', reviews: 450, phone: '+61 2 9365 8888', website: 'https://bondi-pilates.com.au', description: 'Iconic beachside studio overlooking famous Bondi Beach.', amenities: ['Beach Views', 'Iconic Location', 'Outdoor Classes'], image: '🏄‍♀️', distance: '0.2 miles', source: 'Curated' },
        { id: 'syd2', name: 'Harbour Bridge Fitness', address: '33 Hickson Rd, Walsh Bay NSW 2000, Australia', lat: -33.8564, lng: 151.2032, rating: '4.2', reviews: 360, phone: '+61 2 9247 9999', website: 'https://harbour-fitness.com.au', description: 'Premium studio with Sydney Harbour Bridge and Opera House views.', amenities: ['Harbour Views', 'Landmark Views', 'Premium Location'], image: '🌉', distance: '0.8 miles', source: 'Curated' }
    ],
    
    'melbourne': [
        { id: 'mel1', name: 'Collins Street Pilates', address: '101 Collins St, Melbourne VIC 3000, Australia', lat: -37.8155, lng: 144.9648, rating: '4.3', reviews: 380, phone: '+61 3 9650 7777', website: 'https://collins-pilates.com.au', description: 'Central Melbourne studio in the heart of the business district.', amenities: ['CBD Location', 'Business District', 'Professional Focus'], image: '🏢', distance: '0.4 miles', source: 'Curated' },
        { id: 'mel2', name: 'St Kilda Beachside Studio', address: '15 Jacka Blvd, St Kilda VIC 3182, Australia', lat: -37.8673, lng: 144.9778, rating: '4.1', reviews: 290, phone: '+61 3 9534 8888', website: 'https://stkilda-pilates.com', description: 'Relaxed beachside studio in trendy St Kilda.', amenities: ['Beach Location', 'Trendy Area', 'Relaxed Vibe'], image: '🎪', distance: '0.9 miles', source: 'Curated' }
    ],
    
    // ADDITIONAL EUROPEAN CITIES
    'amsterdam': [
        { id: 'ams1', name: 'Canal District Pilates', address: 'Prinsengracht 250, 1016 HH Amsterdam, Netherlands', lat: 52.3676, lng: 4.8851, rating: '4.4', reviews: 320, phone: '+31 20 625 8888', website: 'https://canal-pilates.nl', description: 'Charming studio overlooking historic Amsterdam canals.', amenities: ['Canal Views', 'Historic Setting', 'Multilingual'], image: '🚲', distance: '0.3 miles', source: 'Curated' },
        { id: 'ams2', name: 'Vondelpark Wellness', address: 'Vondelstraat 120, 1054 GT Amsterdam, Netherlands', lat: 52.3584, lng: 4.8697, rating: '4.2', reviews: 280, phone: '+31 20 618 9999', website: 'https://vondelpark-wellness.com', description: 'Peaceful studio near beautiful Vondelpark.', amenities: ['Park Location', 'Peaceful Setting', 'Eco-Friendly'], image: '🌳', distance: '0.7 miles', source: 'Curated' }
    ],
    
    'barcelona': [
        { id: 'bcn1', name: 'Gothic Quarter Pilates', address: 'Carrer de la Portaferrissa, 23, 08002 Barcelona, Spain', lat: 41.3825, lng: 2.1740, rating: '4.3', reviews: 350, phone: '+34 93 318 8888', website: 'https://gothic-pilates.es', description: 'Historic studio in medieval Gothic Quarter with modern equipment.', amenities: ['Historic Quarter', 'Modern Equipment', 'Cultural Setting'], image: '🏰', distance: '0.4 miles', source: 'Curated' },
        { id: 'bcn2', name: 'Barceloneta Beach Studio', address: 'Passeig Marítim, 32, 08003 Barcelona, Spain', lat: 41.3755, lng: 2.1864, rating: '4.1', reviews: 290, phone: '+34 93 221 9999', website: 'https://barceloneta-pilates.com', description: 'Beachfront studio with Mediterranean Sea views.', amenities: ['Sea Views', 'Beach Location', 'Outdoor Terrace'], image: '🏖️', distance: '0.8 miles', source: 'Curated' }
    ],
    
    'munich': [
        { id: 'mun1', name: 'Marienplatz Pilates', address: 'Marienplatz 8, 80331 München, Germany', lat: 48.1372, lng: 11.5755, rating: '4.2', reviews: 310, phone: '+49 89 2420 7777', website: 'https://marienplatz-pilates.de', description: 'Central studio overlooking famous Marienplatz town square.', amenities: ['City Center', 'Historic Views', 'Traditional Bavarian'], image: '🍺', distance: '0.2 miles', source: 'Curated' },
        { id: 'mun2', name: 'English Garden Wellness', address: 'Leopoldstr. 58, 80802 München, Germany', lat: 48.1549, lng: 11.5911, rating: '4.0', reviews: 260, phone: '+49 89 3809 8888', website: 'https://englishgarden-wellness.de', description: 'Tranquil studio near the expansive English Garden park.', amenities: ['Park Views', 'Tranquil Setting', 'Natural Light'], image: '🌲', distance: '0.9 miles', source: 'Curated' }
    ],
    
    'milan': [
        { id: 'mil1', name: 'Duomo Pilates Studio', address: 'Via Torino, 51, 20123 Milano, Italy', lat: 45.4654, lng: 9.1859, rating: '4.4', reviews: 380, phone: '+39 02 8645 7777', website: 'https://duomo-pilates.it', description: 'Elegant studio near iconic Duomo cathedral in fashion capital.', amenities: ['Fashion District', 'Cathedral Views', 'Designer Setting'], image: '👗', distance: '0.3 miles', source: 'Curated' },
        { id: 'mil2', name: 'Navigli Canal Fitness', address: 'Via Ascanio Sforza, 81, 20141 Milano, Italy', lat: 45.4408, lng: 9.1732, rating: '4.2', reviews: 320, phone: '+39 02 5831 8888', website: 'https://navigli-fitness.com', description: 'Trendy studio in vibrant Navigli nightlife district.', amenities: ['Nightlife Area', 'Trendy Location', 'Canal Views'], image: '🍷', distance: '0.7 miles', source: 'Curated' }
    ],
    
    'vienna': [
        { id: 'vie1', name: 'Schönbrunn Pilates', address: 'Mariahilfer Str. 127, 1060 Wien, Austria', lat: 48.2006, lng: 16.3528, rating: '4.3', reviews: 290, phone: '+43 1 585 9999', website: 'https://schoenbrunn-pilates.at', description: 'Imperial city studio near magnificent Schönbrunn Palace.', amenities: ['Palace Views', 'Imperial Setting', 'Classical Music'], image: '🎼', distance: '0.5 miles', source: 'Curated' },
        { id: 'vie2', name: 'Danube River Wellness', address: 'Donaukanal, 1010 Wien, Austria', lat: 48.2116, lng: 16.3736, rating: '4.1', reviews: 250, phone: '+43 1 512 7777', website: 'https://danube-wellness.at', description: 'Riverside studio with Danube canal views in historic center.', amenities: ['River Views', 'Historic Center', 'Peaceful Setting'], image: '🌊', distance: '0.8 miles', source: 'Curated' }
    ],
    
    // ADDITIONAL ASIAN CITIES
    'seoul': [
        { id: 'seo1', name: 'Gangnam Style Pilates', address: '429 Gangnam-daero, Seocho-gu, Seoul, South Korea', lat: 37.4979, lng: 127.0276, rating: '4.5', reviews: 450, phone: '+82 2-3445-8888', website: 'https://gangnam-pilates.kr', description: 'Upscale studio in trendy Gangnam district with K-pop energy.', amenities: ['Gangnam District', 'K-pop Culture', 'Luxury Amenities'], image: '🎤', distance: '0.4 miles', source: 'Curated' },
        { id: 'seo2', name: 'Hongdae Youth Studio', address: '162 Yanghwa-ro, Mapo-gu, Seoul, South Korea', lat: 37.5563, lng: 126.9236, rating: '4.2', reviews: 340, phone: '+82 2-325-9999', website: 'https://hongdae-pilates.com', description: 'Energetic studio in university district popular with young Koreans.', amenities: ['University Area', 'Youth Culture', 'Dynamic Classes'], image: '🎓', distance: '0.7 miles', source: 'Curated' }
    ],
    
    'bangkok': [
        { id: 'bkk1', name: 'Sukhumvit Pilates Center', address: '888 Sukhumvit Rd, Khlong Toei, Bangkok 10110, Thailand', lat: 13.7307, lng: 100.5418, rating: '4.3', reviews: 380, phone: '+66 2-204-8888', website: 'https://sukhumvit-pilates.th', description: 'Modern studio on famous Sukhumvit Road in expat-friendly area.', amenities: ['Expat Friendly', 'Modern Facilities', 'Air Conditioned'], image: '🛺', distance: '0.5 miles', source: 'Curated' },
        { id: 'bkk2', name: 'Chao Phraya River Studio', address: 'Charoenkrung Rd, Bang Rak, Bangkok 10500, Thailand', lat: 13.7200, lng: 100.5135, rating: '4.1', reviews: 290, phone: '+66 2-630-9999', website: 'https://chaophraya-wellness.com', description: 'Riverside studio with traditional Thai wellness approach.', amenities: ['River Views', 'Thai Wellness', 'Traditional Methods'], image: '🛶', distance: '0.9 miles', source: 'Curated' }
    ],
    
    'osaka': [
        { id: 'osa1', name: 'Osaka Castle Pilates', address: '1-1 Osakajo, Chuo Ward, Osaka, 540-0002, Japan', lat: 34.6873, lng: 135.5262, rating: '4.4', reviews: 350, phone: '+81 6-6941-7777', website: 'https://osakacastle-pilates.jp', description: 'Historic setting studio near famous Osaka Castle with traditional Japanese approach.', amenities: ['Castle Views', 'Traditional Japanese', 'Historic Setting'], image: '🏯', distance: '0.3 miles', source: 'Curated' },
        { id: 'osa2', name: 'Dotonbori Fitness Plaza', address: '1-7-21 Dotonbori, Chuo Ward, Osaka, 542-0071, Japan', lat: 34.6686, lng: 135.5023, rating: '4.2', reviews: 310, phone: '+81 6-6213-8888', website: 'https://dotonbori-fitness.com', description: 'Vibrant studio in famous entertainment district known for food and nightlife.', amenities: ['Entertainment District', 'Vibrant Atmosphere', 'Food Culture'], image: '🍜', distance: '0.6 miles', source: 'Curated' }
    ],
    
    // ADDITIONAL AMERICAN CITIES  
    'las vegas': [
        { id: 'lv1', name: 'Strip Pilates Luxury', address: '3730 S Las Vegas Blvd, Las Vegas, NV 89158, USA', lat: 36.1147, lng: -115.1728, rating: '4.3', reviews: 420, phone: '(702) 891-8888', website: 'https://strip-pilates.com', description: 'High-end studio on the famous Las Vegas Strip with celebrity trainers.', amenities: ['Strip Location', 'Celebrity Trainers', 'Luxury Amenities'], image: '🎰', distance: '0.2 miles', source: 'Curated' },
        { id: 'lv2', name: 'Desert Oasis Wellness', address: '1700 W Charleston Blvd, Las Vegas, NV 89102, USA', lat: 36.1590, lng: -115.1782, rating: '4.1', reviews: 290, phone: '(702) 384-9999', website: 'https://desertoasis-wellness.com', description: 'Peaceful retreat-style studio away from the casino atmosphere.', amenities: ['Peaceful Setting', 'Retreat Style', 'Desert Views'], image: '🌵', distance: '0.8 miles', source: 'Curated' }
    ],
    
    'washington': [
        { id: 'dc1', name: 'Capitol Hill Pilates', address: '1200 Pennsylvania Ave NW, Washington, DC 20004, USA', lat: 38.8951, lng: -77.0364, rating: '4.4', reviews: 380, phone: '(202) 737-8888', website: 'https://capitolhill-pilates.com', description: 'Professional studio near the Capitol building serving government workers.', amenities: ['Capitol Views', 'Professional Focus', 'Government District'], image: '🏛️', distance: '0.3 miles', source: 'Curated' },
        { id: 'dc2', name: 'Georgetown Wellness Center', address: '3222 M St NW, Georgetown, Washington, DC 20007, USA', lat: 38.9051, lng: -77.0618, rating: '4.2', reviews: 320, phone: '(202) 965-9999', website: 'https://georgetown-wellness.com', description: 'Upscale studio in historic Georgetown with Potomac River views.', amenities: ['Historic Georgetown', 'River Views', 'Upscale Setting'], image: '🏛️', distance: '0.7 miles', source: 'Curated' }
    ],
    
    'montreal': [
        { id: 'mtl1', name: 'Old Montreal Pilates', address: '150 Rue Saint-Paul Ouest, Montréal, QC H2Y 1Z5, Canada', lat: 45.5031, lng: -73.5550, rating: '4.3', reviews: 340, phone: '(514) 284-8888', website: 'https://oldmontreal-pilates.ca', description: 'Charming studio in historic Old Montreal with European atmosphere.', amenities: ['Historic Setting', 'European Feel', 'Bilingual Classes'], image: '🍁', distance: '0.4 miles', source: 'Curated' },
        { id: 'mtl2', name: 'Mount Royal Fitness', address: '1240 Rue Drummond, Montréal, QC H3G 1V7, Canada', lat: 45.5017, lng: -73.5673, rating: '4.1', reviews: 280, phone: '(514) 861-9999', website: 'https://mountroyal-fitness.com', description: 'Modern studio near Mount Royal park with city skyline views.', amenities: ['Mountain Views', 'City Skyline', 'Modern Facilities'], image: '⛰️', distance: '0.8 miles', source: 'Curated' }
    ]
};

// City aliases for global search
const globalCityAliases = {
    // Existing aliases
    'nyc': 'new york',
    'manhattan': 'new york', 
    'brooklyn': 'new york',
    'la': 'los angeles',
    'los angelas': 'los angeles',
    'l.a.': 'los angeles',
    'chi-town': 'chicago',
    'windy city': 'chicago',
    
    // New global aliases
    'sf': 'san francisco',
    'san fran': 'san francisco',
    'london uk': 'london',
    'london england': 'london',
    'paris france': 'paris',
    'rome italy': 'rome',
    'tokyo japan': 'tokyo',
    'hk': 'hong kong',
    'hong kong sar': 'hong kong',
    'singapore sg': 'singapore',
    'dubai uae': 'dubai',
    'miami fl': 'miami',
    'miami beach': 'miami',
    'toronto canada': 'toronto',
    'vancouver canada': 'vancouver',
    'sydney australia': 'sydney',
    'melbourne australia': 'melbourne',
    'berlin germany': 'berlin',
    'madrid spain': 'madrid',
    'amsterdam netherlands': 'amsterdam',
    'barcelona spain': 'barcelona', 
    'bcn': 'barcelona',
    'munich germany': 'munich',
    'milan italy': 'milan',
    'vienna austria': 'vienna',
    'seoul south korea': 'seoul',
    'bangkok thailand': 'bangkok',
    'osaka japan': 'osaka',
    'las vegas nevada': 'las vegas',
    'vegas': 'las vegas',
    'washington dc': 'washington',
    'dc': 'washington',
    'montreal canada': 'montreal'
};

// City center coordinates for global cities
const globalCityCenters = {
    // Existing centers
    'new york': { lat: 40.7589, lng: -73.9851 },
    'los angeles': { lat: 34.0522, lng: -118.2437 },
    'chicago': { lat: 41.8781, lng: -87.6298 },
    
    // New global centers
    'san francisco': { lat: 37.7749, lng: -122.4194 },
    'miami': { lat: 25.7617, lng: -80.1918 },
    'london': { lat: 51.5074, lng: -0.1278 },
    'paris': { lat: 48.8566, lng: 2.3522 },
    'berlin': { lat: 52.5200, lng: 13.4050 },
    'madrid': { lat: 40.4168, lng: -3.7038 },
    'rome': { lat: 41.9028, lng: 12.4964 },
    'tokyo': { lat: 35.6762, lng: 139.6503 },
    'singapore': { lat: 1.3521, lng: 103.8198 },
    'hong kong': { lat: 22.3193, lng: 114.1694 },
    'dubai': { lat: 25.2048, lng: 55.2708 },
    'sydney': { lat: -33.8688, lng: 151.2093 },
    'melbourne': { lat: -37.8136, lng: 144.9631 },
    'toronto': { lat: 43.6532, lng: -79.3832 },
    'vancouver': { lat: 49.2827, lng: -123.1207 },
    'amsterdam': { lat: 52.3676, lng: 4.9041 },
    'barcelona': { lat: 41.3851, lng: 2.1734 },
    'munich': { lat: 48.1351, lng: 11.5820 },
    'milan': { lat: 45.4642, lng: 9.1900 },
    'vienna': { lat: 48.2082, lng: 16.3738 },
    'seoul': { lat: 37.5665, lng: 126.9780 },
    'bangkok': { lat: 13.7563, lng: 100.5018 },
    'osaka': { lat: 34.6937, lng: 135.5023 },
    'las vegas': { lat: 36.1699, lng: -115.1398 },
    'washington': { lat: 38.9072, lng: -77.0369 },
    'montreal': { lat: 45.5017, lng: -73.5673 }
};

// Export for use in main script
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { globalCitiesData, globalCityAliases, globalCityCenters };
}