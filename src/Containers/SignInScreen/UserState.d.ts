interface UserState {
    readonly userInfo?: Models.UserInfoDTO;
    readonly isSignedIn?: boolean;
    readonly signInError?: string;
    readonly signUpError?: string;
}

interface AppState extends UserState {
}