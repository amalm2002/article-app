export interface Register {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    dob: string;
    password: string;
    preferences: any
}

export interface Login {
    email: string;
    password: string;
}