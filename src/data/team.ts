export interface TeamMember {
    name: string;
    role: string;
    department: string;
    email: string;
    experience: string;
    image: string;
}

export interface Department {
    id: string;
    name: string;
    description: string;
    icon: string; // lucide-react icon name as string
    color: string;
    iconColor: string;
    members: TeamMember[];
}

export const departments: Department[] = [
    {
        id: "formation",
        name: "Formation",
        description: "Empowering youth through educational workshops and skill-building sessions.",
        icon: "GraduationCap",
        color: "from-blue-500/10 to-blue-600/10",
        iconColor: "text-blue-400",
        members: [
            {
                name: "SISTER JOUMANA AOUN",
                role: "FORMATRICE",
                department: "Formation",
                email: "joumana.aoun@manzelyano.org",
                experience: "With over 10 years of experience in educational methodology and youth empowerment, Sister Joumana has pioneered our formation programs, focusing on spiritual and pedagogical development that transforms how we engage with our community.",
                image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2576&auto=format&fit=crop"
            },
            {
                name: "SISTER CRISTINA VARGAS",
                role: "FORMATRICE",
                department: "Formation",
                email: "cristina.vargas@manzelyano.org",
                experience: "Sister Cristina brings international experience in vocational training and community formation. She specializes in creating interactive workshops that foster creativity and leadership skills among young participants.",
                image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=2574&auto=format&fit=crop"
            }
        ]
    },
    {
        id: "comm",
        name: "COMMUNICATION ET MARKETING",
        description: "Spreading our message and connecting with the community through digital presence.",
        icon: "Megaphone",
        color: "from-pink-500/10 to-pink-600/10",
        iconColor: "text-pink-400",
        members: [
            {
                name: "Mohamed Wassim Guebsi",
                role: "CO Responsable Communication & marketing",
                department: "Communication",
                email: "wassim.guebsi@manzelyano.org",
                experience: "Wassim is a digital marketing strategist focused on community building. His expertise in brand storytelling and event promotion has significantly grown our online presence and engagement.",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2574&auto=format&fit=crop"
            },
            {
                name: "Maryem Dridi",
                role: "CO Responsable Communication & marketing",
                department: "Communication",
                email: "maryem.dridi@manzelyano.org",
                experience: "Maryem is a creative director passionate about visual communication. She ensures that every Manzel Yano campaign captures the essence of our mission through compelling content and storytelling.",
                image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2574&auto=format&fit=crop"
            },
            {
                name: "Kenza Bouras",
                role: "HR Manager",
                department: "Communication",
                email: "kenza.bouras@manzelyano.org",
                experience: "Kenza manages our internal communications and member development. Her focus is on fostering a positive and productive environment for all our volunteers and staff.",
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2574&auto=format&fit=crop"
            }
        ]
    },
    {
        id: "deco",
        name: "Decoration",
        description: "Transforming spaces into creative environments for our events and workshops.",
        icon: "Palette",
        color: "from-yellow-500/10 to-yellow-600/10",
        iconColor: "text-yellow-400",
        members: [
            {
                name: "Mohamed Thenour Bejaoui",
                role: "Responsable Decoration",
                department: "Decoration",
                email: "mohamed.bejaoui@manzelyano.org",
                experience: "Mohamed transforms vision into reality. His keen eye for spatial design and aesthetic harmony ensures that every Manzel Yano event feels unique, professional, and inspiring for everyone.",
                image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2574&auto=format&fit=crop"
            }
        ]
    },
    {
        id: "logistics",
        name: "Logistique",
        description: "Ensuring every event runs smoothly with precise planning and coordination.",
        icon: "Truck",
        color: "from-purple-500/10 to-purple-600/10",
        iconColor: "text-purple-400",
        members: [
            {
                name: "Maryem Hammas",
                role: "Co responsable Logistique",
                department: "Logistique",
                email: "maryem.hammas@manzelyano.org",
                experience: "Maryem ensures that every logistical detail is meticulously planned and executed, from site preparation to resource allocation, guaranteeing a seamless experience for all our events.",
                image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2574&auto=format&fit=crop"
            },
            {
                name: "Fares Saad",
                role: "Co responsable Logistique",
                department: "Logistique",
                email: "fares.saad@manzelyano.org",
                experience: "Fares coordinates our operational logistics with precision. His expertise in supply chain management and event setup ensures that everything is in its place at the right time.",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2574&auto=format&fit=crop"
            }
        ]
    },
    {
        id: "animation",
        name: "Animation",
        description: "Bringing joy and energy to our youth through dynamic activities and games.",
        icon: "Smile",
        color: "from-green-500/10 to-green-600/10",
        iconColor: "text-green-400",
        members: [
            {
                name: "Yara Bouhadida",
                role: "co responsable Animation",
                department: "Animation",
                email: "yara.bouhadida@manzelyano.org",
                experience: "Yara brings magic to Manzel Yano. Her expertise in youth animation and team-building games allows her to create memorable experiences that foster personal growth among our members.",
                image: "https://images.unsplash.com/photo-1520699049698-acd2fcc51606?q=80&w=2574&auto=format&fit=crop"
            },
            {
                name: "Yassmin ben blel",
                role: "co responsable Animation",
                department: "Animation",
                email: "yassmin.benblel@manzelyano.org",
                experience: "Yassmin specializes in creative engagement and interactive storytelling. Her energy and enthusiasm make every animation session a highlight for the youth we serve.",
                image: "https://images.unsplash.com/photo-1548142813-c348350df52b?q=80&w=2578&auto=format&fit=crop"
            }
        ]
    }
];
