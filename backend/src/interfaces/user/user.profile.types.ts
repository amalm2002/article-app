export interface UserId {
    userId: string
}

export interface UserDetils {
    userId: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    dob: string;
}

export interface UpdatePassword {
    userId: string;
    currentPassword: string;
    newPassword: string;
}

export interface updateThePreference {
    userId: string;
    preference: string[];
}