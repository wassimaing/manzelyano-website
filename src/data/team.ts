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
