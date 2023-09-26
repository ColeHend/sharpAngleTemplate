export interface UserResponse {
    Id: number | null;
    Username: string;
    MoreData: string;
    Password: string | null;
    PassHash: null;
    PassSalt: null;
}