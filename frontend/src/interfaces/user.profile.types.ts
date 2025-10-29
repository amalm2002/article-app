export interface UserId {
    userId: string;
}

export interface UserDeatils {
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

export interface PreferencesUpdate {
    userId: string;
    preference: string[]
}