interface AuthenticationState {
    readonly isSignedIn: boolean;
    readonly signInError?: string;
    readonly signUpError?: string;
}

interface AppState extends AuthenticationState {
}