// src/interfaces/Candidate.interface.ts

export interface Candidate {
    name?: string;
    login: string;
    location?: string;
    avatar_url?: string;
    email?: string;
    html_url: string;
    company?: string;
    bio: string; // Add the bio field here
  }
  