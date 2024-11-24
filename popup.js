
const countries = {
    "United States (Eastern Time)": -5,
    "United States (Central Time)": -6,
    "United States (Mountain Time)": -7,
    "United States (Pacific Time)": -8,
    "Canada (Toronto)": -5,
    "Canada (Vancouver)": -8,
    "Brazil (Brasilia)": -3,
    "Argentina": -3,
    "United Kingdom": 0,
    "France": 1,
    "Germany": 1,
    "Italy": 1,
    "Spain": 1,
    "Netherlands": 1,
    "Sweden": 1,
    "South Africa": 2,
    "Nigeria": 1,
    "Turkey": 3,
    "Russia (Moscow)": 3,
    "India": 5.5,
    "Pakistan": 5,
    "China": 8,
    "Japan": 9,
    "South Korea": 9,
    "Indonesia (Jakarta)": 7,
    "Singapore": 8,
    "Australia (Sydney)": 11,
    "Australia (Perth)": 8,
    "New Zealand": 13,
    "United Arab Emirates": 4,
    "Saudi Arabia": 3,
    "Egypt": 2,
    "Mexico (Mexico City)": -6,
    "Chile": -3,
    "Colombia": -5,
    "Vietnam": 7,
    "Thailand": 7,
    "Malaysia": 8,
    "Philippines": 8,
    "Hong Kong": 8,
    "Taiwan": 8,
    "Kenya": 3,
    "Ethiopia": 3,
    "Tanzania": 3,
    "Morocco": 0,
    "Algeria": 1,
    "Greece": 2,
    "Ukraine": 2,
    "Poland": 1,
    "Portugal": 0,
    "Norway": 1,
    "Denmark": 1,
    "Finland": 2,
    "Iceland": 0,
    "Greenland": -3,
    "Fiji": 12,
    "Papua New Guinea": 10
};

const select = document.getElementById("country-select");
const utcOutput = document.getElementById("utc-output");
const countdownOutput = document.getElementById("countdown-output");

// Populate the country dropdown
Object.keys(countries).forEach(country => {
    const option = document.createElement("option");
    option.value = countries[country];
    option.textContent = country;
    select.appendChild(option);
});

select.addEventListener("change", () => {
    const offset = parseFloat(select.value);
    if (!isNaN(offset)) {
        const now = new Date();
        const utcTime = new Date(now.getTime() + now.getTimezoneOffset() * 60000 + offset * 3600000);
        utcOutput.textContent = `UTC Time: ${utcTime.toUTCString()}`;

        // Calculate countdown to UTC 14:00
        const utcNow = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds()));
        const targetUTC = new Date(Date.UTC(utcNow.getUTCFullYear(), utcNow.getUTCMonth(), utcNow.getUTCDate(), 14, 0, 0));
        if (utcNow > targetUTC) {
            targetUTC.setUTCDate(targetUTC.getUTCDate() + 1); // Move to next day's 14:00 UTC
        }
        const timeDiff = targetUTC - utcNow;
        const hoursLeft = Math.floor(timeDiff / (1000 * 60 * 60));
        const minutesLeft = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        countdownOutput.textContent = `Time left to UTC 14:00: ${hoursLeft} hours and ${minutesLeft} minutes`;
    } else {
        utcOutput.textContent = "";
        countdownOutput.textContent = "";
    }
});
