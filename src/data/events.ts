export interface Event {
    id: string;
    title: string;
    date: string; // Kept for display/compatibility
    startDate: string;
    endDate: string;
    location: string;
    image: string;
    category: "Community" | "Social" | "Sports" | "Education" | "Workshop";
    color: "pink" | "purple" | "blue" | "yellow";
    overview: string;
    durationDays?: number;
    timeline: { time: string; activity: string }[];
    gallery: string[];
}
export const events: Event[] = [
    {
        id: "1",
        title: "Summer ss 2024",
        date: "FROM July 15 TO July 20, 2024",
        startDate: "2024-07-15",
        endDate: "2024-07-20",
        location: "Ain Draham",
        image: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?q=80&w=2670&auto=format&fit=crop",
        category: "Social",
        color: "pink",
        overview:
            "Join us for an unforgettable 5-day adventure in the heart of nature. Our Summer Camp is designed to foster leadership, teamwork, and independence among youth. Through a series of workshops, outdoor activities, and challenges, participants will discover their potential and make lifelong friendships.\n\nWe believe in learning by doing. The camp program includes hiking, survival skills training, team-building exercises, and evening campfires where we share stories and dreams. It's not just a camp; it's a journey of self-discovery.",
        timeline: [
            { time: "08:00 AM", activity: "Breakfast & Morning Assembly" },
            { time: "09:30 AM", activity: "Team Building Workshop" },
            { time: "12:00 PM", activity: "Lunch Break" },
            { time: "02:00 PM", activity: "Outdoor Adventure / Hiking" },
            { time: "06:00 PM", activity: "Dinner" },
            { time: "08:00 PM", activity: "Campfire & Storytelling" },
        ],
        gallery: [
            "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=2670&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=2649&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=2670&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2670&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1520699049698-acd2fcc51606?q=80&w=2670&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?q=80&w=2670&auto=format&fit=crop",
        ],
    },
    {
        id: "2",
        title: "Beach Cleanup Drive",
        date: "August 02, 2024",
        startDate: "2024-08-02",
        endDate: "2024-08-02",
        location: "Bizerte Corniche",
        image: "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?q=80&w=2670&auto=format&fit=crop",
        category: "Community",
        color: "blue",
        overview:
            "Our planet needs us. The Beach Cleanup Drive is a community initiative to restore the beauty of our coastline. We will be gathering at Bizerte Corniche to collect plastic waste and debris, sorting it for recycling. This event is open to everyone who cares about the environment.\n\nGloves, bags, and refreshments will be provided. Let’s work together to create a cleaner, safer environment for marine life and our community.",
        timeline: [
            { time: "09:00 AM", activity: "Gathering & Briefing" },
            { time: "09:30 AM", activity: "Cleanup Begins (Zone A)" },
            { time: "11:00 AM", activity: "Break & Refreshments" },
            { time: "11:30 AM", activity: "Cleanup Continues (Zone B)" },
            { time: "01:00 PM", activity: "Waste Sorting & Collection" },
            { time: "01:30 PM", activity: "Group Photo & Closing" },
        ],
        gallery: [
            "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?q=80&w=2670&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1595278069441-2cf29f8005a4?q=80&w=2670&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1569000972078-d46797b5e43a?q=80&w=2670&auto=format&fit=crop",
        ],
    },
    {
        id: "3",
        title: "test",
        date: "August 15, 2024",
        startDate: "2024-08-15",
        endDate: "2024-08-15",
        location: "Menzel Bourguiba Hall",
        image: "https://images.unsplash.com/photo-1561489413-985b06da5bee?q=80&w=2670&auto=format&fit=crop",
        category: "Social",
        color: "purple",
        overview:
            "An evening of elegance and generosity. The Charity Gala Night is our annual fundraising event to support local education projects. Guests will enjoy a formal dinner, live music performances, and an auction. All proceeds will go towards providing school supplies for underprivileged children.\n\nDress to impress and open your heart. Together, we can make education accessible to every child in our city.",
        timeline: [
            { time: "07:00 PM", activity: "Red Carpet & Welcome Drinks" },
            { time: "08:00 PM", activity: "Opening Speech" },
            { time: "08:30 PM", activity: "Dinner Service" },
            { time: "09:30 PM", activity: "Live Music & Performances" },
            { time: "10:30 PM", activity: "Charity Auction" },
            { time: "11:30 PM", activity: "Closing Remarks" },
        ],
        gallery: [
            "https://images.unsplash.com/photo-1561489413-985b06da5bee?q=80&w=2670&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1519671482502-9759101d23bb?q=80&w=2670&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2670&auto=format&fit=crop",
        ],
    },
    {
        id: "4",
        title: "Youth Football Cup",
        date: "September 01, 2024",
        startDate: "2024-09-01",
        endDate: "2024-09-01",
        location: "City Stadium",
        image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=2936&auto=format&fit=crop",
        category: "Sports",
        color: "yellow",
        overview:
            "Kick off the season with our Youth Football Cup! Teams from across the region will compete for the championship trophy. It's a day of sportsmanship, fair play, and high energy.\n\nWhether you're a player or a supporter, come cheer for your favorite team. We'll also have mini-games for the audience and a food court.",
        timeline: [
            { time: "08:00 AM", activity: "Team Registration" },
            { time: "09:00 AM", activity: "Opening Ceremony" },
            { time: "09:30 AM", activity: "Group Stage Matches" },
            { time: "01:00 PM", activity: "Lunch Break" },
            { time: "02:00 PM", activity: "Semi-Finals" },
            { time: "04:00 PM", activity: "Final Match" },
            { time: "05:30 PM", activity: "Awards Ceremony" },
        ],
        gallery: [
            "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=2936&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1518091043644-c1d4457512c6?q=80&w=2831&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1517466787929-bc90951d6db0?q=80&w=2480&auto=format&fit=crop",
        ],
    },
];