export interface IUser {
    name: string;
    email: string;
    password: string;
    role: string;
    educational_background: string;
    major: string;
    funding_need: string;
    preference: string;
    created_at?: Date;
    updated_at?: Date;
}