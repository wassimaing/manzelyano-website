export interface Testimonial {
    id: number;
    name: string;
    role: string;
    image: string;
    text: string;
}

export const testimonials: Testimonial[] = [
    {
        id: 1,
        name: "Sarah Ben Ali",
        role: "Alumni Sister",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
        text: "Manzel Yano was more than just a club; it was a second family. The values I learned here deeply influenced my professional career and personal life."
    },
    {
        id: 2,
        name: "Ahmed Tounsi",
        role: "Former Animator",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
        text: "Leading the summer camps was the highlight of my youth. Watching the kids grow and learn while having fun is an experience I'll never forget."
    },
    {
        id: 3,
        name: "Yasmine Dridi",
        role: "Volunteer",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop",
        text: "Volunteering here taught me the true meaning of service. The energy and positivity in this community are unmatched."
    },
    {
        id: 4,
        name: "Karim Mejbri",
        role: "Alumni Brother",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
        text: "The leadership workshops and team activities prepared me for real-world challenges better than any classroom could."
    },
    {
        id: 5,
        name: "Nour El Hoda",
        role: "Active Animator",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
        text: "Every weekend is a new adventure. I love how we combine fun with meaningful education for the children."
    }
];
