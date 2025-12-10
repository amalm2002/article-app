import { ObjectId } from "mongodb";
import { Schema, Types } from "mongoose";

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


export interface UserResponseDTO {
    firstName: string;
    phone: string;
    email: string;
    preferences: string[];
    lastName?: string | null | undefined;
    dob?: NativeDate | null | undefined;
    createdAt: NativeDate;
    updatedAt: NativeDate;
    _id: Types.ObjectId;
    __v: number;
}

export interface UserDocumentDTO {
    _id: Types.ObjectId;
    firstName: string;
    lastName?: string | null | undefined;
    phone: string;
    email: string;
    dob?: NativeDate | null | undefined;
    password: string;
    preferences: string[];
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}