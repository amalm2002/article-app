export interface Register {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    dob: string;
    password: string;
    confirmPassword: string;
    categories: any
}

export interface Login {
    email: string;
    password: string;
}