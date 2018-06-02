interface AuthenticationState {
    readonly isSignedIn: boolean;
    readonly signInError?: string;
}

interface AppState extends AuthenticationState {
}