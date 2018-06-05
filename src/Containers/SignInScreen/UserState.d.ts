interface UserState {
    readonly userInfo?: Models.UserInfoDTO;
    readonly isSignedIn?: boolean;
    readonly signInError?: string;
    readonly signUpError?: string;
    readonly signUpResult?: boolean;
}

interface AppState extends UserState {
}