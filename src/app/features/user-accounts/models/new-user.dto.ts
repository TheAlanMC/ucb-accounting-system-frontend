export interface NewUserDto {
    email: string;
    firstName: string;
    lastName: string;
    password: string | null;
    confirmPassword: string | null;
}