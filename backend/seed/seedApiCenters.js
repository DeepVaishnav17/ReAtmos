require("dotenv").config();

const mongoose = require("mongoose");
const ApiCenter = require("../models/ApiCenter");

const MONGO_URI = process.env.MONGO_URI;

// 👇 YOUR DATA (shortened here, paste full object)
const STATE_CITY_MAP = {'Andaman and Nicobar Islands': ['Sri Vijaya Puram'], 'Andhra Pradesh': ['Chittoor', 'Vijayawada', 'Anantapur', 'Tirumala', 'Rajamahendravaram', 'Amaravati', 'Visakhapatnam', 'Tirupati', 'Kadapa'], 'Arunachal Pradesh': ['Naharlagun'], 'Assam': ['Sivasagar', 'Nalbari', 'Silchar', 'Guwahati', 'Byrnihat', 'Nagaon'], 'Bihar': ['Gaya', 'Saharsa', 'Motihari', 'Manguraha', 'Darbhanga', 'Purnia', 'Begusarai', 'Samastipur', 'Aurangabad', 'Muzaffarpur', 'Arrah', 'Bettiah', 'Patna', 'Bhagalpur', 'Hajipur', 'Munger', 'Chhapra', 'Araria', 'Siwan', 'Katihar', 'Bihar Sharif', 'Kishanganj', 'Rajgir', 'Sasaram', 'Buxar'], 'Chandigarh': ['Chandigarh'], 'Chhattisgarh': ['Raipur', 'Bilaspur', 'Korba', 'Chhal', 'Tumidih', 'Milupara', 'Kunjemura', 'Bhilai'], 'Delhi': ['Delhi'], 'Gujarat': ['Vatva', 'Nandesari', 'Gandhi Nagar', 'Ahmedabad', 'Ankleshwar', 'Surat', 'Vapi'], 'Haryana': ['Ambala', 'Kaithal', 'Jind', 'Sirsa', 'Palwal', 'Dharuhera', 'Manesar', 'Sonipat', 'Fatehabad', 'Narnaul', 'Yamunanagar', 'Gurugram', 'Bahadurgarh', 'Rohtak', 'Faridabad', 'Mandikhera', 'Hisar', 'Panchgaon', 'Bhiwani', 'Panchkula', 'Panipat', 'Charkhi Dadri', 'Ballabgarh', 'Karnal', 'Kurukshetra'], 'Himachal Pradesh': ['Baddi'], 'Jammu and Kashmir': ['Srinagar'], 'Jharkhand': ['Pathardih', 'Jorapokhar', 'Dhanbad'], 'Karnataka': ['Tumakuru', 'Bengaluru', 'Kolar', 'Mangalore', 'Mysuru', 'Kalaburagi', 'Hubballi', 'Koppal', 'Dharwad', 'Chikkamagaluru', 'Raichur', 'Gadag', 'Hassan', 'Karwar', 'Yadgir', 'Madikeri', 'Chikkaballapur', 'Vijayapura', 'Davanagere', 'Bagalkot', 'Ramanagara', 'Belgaum', 'Chamarajanagar', 'Bidar', 'Haveri', 'Shivamogga', 'Udupi'], 'Kerala': ['Eloor', 'Kozhikode', 'Thiruvananthapuram', 'Ernakulam', 'Thrissur', 'Kollam', 'Kannur', 'Kochi'], 'Madhya Pradesh': ['Maihar', 'Dewas', 'Pithampur', 'Ujjain', 'Ratlam', 'Jabalpur', 'Sagar', 'Katni', 'Bhopal', 'Mandideep', 'Satna', 'Indore', 'Damoh', 'Gwalior', 'Singrauli'], 'Maharashtra': ['Mira Bhayandar', 'Ahmednagar', 'Thane', 'Kalyan', 'Sangli', 'Pune', 'Badlapur', 'Aurangabad', 'Latur', 'Malegaon', 'Solapur', 'Navi Mumbai', 'Chandrapur', 'Nagpur', 'Jalna', 'Parbhani', 'Belapur', 'Akola', 'Nashik', 'Pimpri Chinchwad', 'Boisar', 'Virar', 'Nanded', 'Ulhasnagar', 'Bhiwandi', 'Mumbai', 'Dhule', 'Jalgaon', 'Amravati', 'Kolhapur', 'Mahad'], 'Manipur': ['Imphal'], 'Meghalaya': ['Shillong'], 'Mizoram': ['Aizawl'], 'Nagaland': ['Kohima'], 'Odisha': ['Brajrajnagar', 'Angul', 'Byasanagar', 'Rourkela', 'Barbil', 'Nayagarh', 'Tensa', 'Bileipada', 'Suakati', 'Cuttack', 'Talcher', 'Baripada', 'Keonjhar', 'Bhubaneswar', 'Rairangpur', 'Balasore'], 'Puducherry': ['Puducherry'], 'Punjab': ['Amritsar', 'Khanna', 'Ludhiana', 'Jalandhar', 'Mandi Gobindgarh', 'Bathinda', 'Rupnagar', 'Patiala'], 'Rajasthan': ['Jaisalmer', 'Udaipur', 'Sawai Madhopur', 'Dholpur', 'Bikaner', 'Jhalawar', 'Jaipur', 'Banswara', 'Pali', 'Sikar', 'Karauli', 'Hanumangarh', 'Bundi', 'Alwar', 'Nagaur', 'Churu', 'Chittorgarh', 'Barmer', 'Bhiwadi', 'Jhunjhunu', 'Jodhpur', 'Dausa', 'Tonk', 'Bhilwara', 'Bharatpur', 'Pratapgarh', 'Sirohi', 'Rajsamand', 'Dungarpur', 'Baran', 'Sri Ganganagar', 'Ajmer', 'Kota', 'Jalore'], 'Sikkim': ['Gangtok'], 'Tamil Nadu': ['Cuddalore', 'Gummidipoondi', 'Karur', 'Ramanathapuram', 'Vellore', 'Palkalaiperur', 'Tiruchirappalli', 'Thoothukudi', 'Kanchipuram', 'Hosur', 'Virudhunagar', 'Thanjavur', 'Namakkal', 'Ooty', 'Tiruppur', 'Tirunelveli', 'Ariyalur', 'Nagapattinam', 'Dindigul', 'Salem', 'Chengalpattu', 'Ranipet', 'Madurai', 'Coimbatore', 'Chennai', 'Pudukottai'], 'Telangana': ['Hyderabad'], 'Tripura': ['Agartala'], 'Uttar Pradesh': ['Meerut', 'Prayagraj', 'Lucknow', 'Kanpur', 'Jhansi', 'Firozabad', 'Ghaziabad', 'Greater Noida', 'NOIDA', 'Bulandshahr', 'Gorakhpur', 'Muzaffarnagar', 'Bareilly', 'Agra', 'Vrindavan', 'Varanasi', 'Baghpat', 'Khurja', 'Hapur', 'Moradabad'], 'Uttarakhand': ['Rishikesh', 'Kashipur', 'Dehradun'], 'West Bengal': ['Asansol', 'Barrackpore', 'Howrah', 'Kolkata', 'Durgapur', 'Haldia', 'Siliguri']};

console.log("MONGO_URI =", process.env.MONGO_URI);

async function getLatLng(city, state) {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      `${city}, ${state}, India`
    )}&limit=1`,
    {
      headers: {
        "User-Agent": "carbon-app/1.0 (contact@yourapp.com)",
      },
    }
  );

  const data = await res.json();
  if (!data.length) return null;

  return {
    lat: parseFloat(data[0].lat),
    lng: parseFloat(data[0].lon),
  };
}

async function seed() {
  await mongoose.connect(MONGO_URI);
  console.log("MongoDB connected");

  for (const state of Object.keys(STATE_CITY_MAP)) {
    for (const city of STATE_CITY_MAP[state]) {
      const exists = await ApiCenter.findOne({ name: city });
      if (exists) {
        console.log(`Skipped: ${city}`);
        continue;
      }

      const coords = await getLatLng(city, state);
      if (!coords) {
        console.log(`❌ Could not geocode: ${city}`);
        continue;
      }

      await ApiCenter.create({
        name: city,
        state,
        lat: coords.lat,
        lng: coords.lng,
      });

      console.log(`✅ Added: ${city}, ${state}`);
    }
  }

  console.log("Seeding complete");
  process.exit();
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
