export const validateEmail = (email: string): string | null => {
    if (!email) return "Email is required";
    if (email.includes(" ")) return "Email should not contain spaces";
    if (!email.endsWith("@gmail.com")) return "Email must end with @gmail.com";

    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!gmailRegex.test(email)) return "Please enter a valid Gmail address";

    return null;
};

export const validatePassword = (password: string): string | null => {
    if (!password) return "Password is required";
    if (password.length < 6) return "Password must be at least 6 characters";
    return null;
};

export const validateName = (name: string, field: "first" | "last") => {
    if (!name.trim()) return "This field is required";

    if (/\s/.test(name)) return "No spaces allowed";

    if (!/^[A-Za-z]+$/.test(name)) return "Only alphabets allowed";

    if (field === "first" && (name.length < 3 || name.length > 20))
        return "First name must be 3–20 characters";

    if (field === "last" && (name.length < 1 || name.length > 20))
        return "Last name must be 1–20 characters";

    if (/^(.)\1+$/.test(name))
        return "Name cannot contain repeated characters only";

    return "";
};

export const validatePhone = (phone: string): string | null => {
    if (!phone) return "Phone number is required";

    if (!/^\d{10}$/.test(phone)) {
        return "Phone number must be exactly 10 digits";
    }

    if (phone.charAt(0) === "0") {
        return "Phone number should not start with 0";
    }

    if (phone === "0000000000") {
        return "Phone number cannot be all zeros";
    }

    if (/^(\d)\1{9}$/.test(phone)) {
        return "Phone number cannot have all digits the same";
    }

    return null;
};


const repeatedCharRegex = /^(.)\1+$/;

const titleDescriptionRegex = /^[A-Za-z0-9 ,.!?'"()-]+$/;

export const validateTitle = (title: string): string | null => {
    if (!title.trim()) return "Title is required";

    if (title.trim().length < 5) return "Title must be at least 5 characters";

    if (repeatedCharRegex.test(title.trim()))
        return "Title cannot contain repeated characters only";

    if (!titleDescriptionRegex.test(title))
        return "Title contains invalid characters";

    return null;
};

export const validateDescription = (description: string): string | null => {
    if (!description.trim()) return "Description is required";

    if (description.trim().length < 20)
        return "Description must be at least 20 characters";

    if (repeatedCharRegex.test(description.trim()))
        return "Description cannot contain repeated characters only";

    return null;
};

export const validateTags = (tags: string): string | null => {
    if (!tags.trim()) return "Tags are required";

    if (tags.includes(" ")) return "Tags cannot contain spaces";

    const tagRegex = /^[a-zA-Z0-9,]+$/;
    if (!tagRegex.test(tags))
        return "Tags may only contain letters, numbers, and commas";

    const tagList = tags.split(",").filter(Boolean);
    if (tagList.length === 0) return "Enter valid tags";

    for (let t of tagList) {
        if (repeatedCharRegex.test(t))
            return "Tags cannot contain repeated characters only";
    }

    return null;
};

export const validateImage = (file: File | null): string | null => {
    if (!file) return "Image is required";
    return null;
};
