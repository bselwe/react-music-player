import { ReducerMap, createAction } from "redux-actions";
import { addReducerFactory } from "../../Utils/AddReducer";
import { Dispatch } from "react-redux";
import { Thunk } from "../../Utils/Thunk";
import { loginManager } from "../../Services/LoginManager"

export let singInReducers: ReducerMap<AppState, any> = {};
const addReducer = addReducerFactory(singInReducers);

export const SignInWithPassword = (username: string, password: string) =>
    async (dispatch: Dispatch<any>, getState: () => AppState) => {
        try {
            const isSignedIn = await loginManager.trySignIn(username, password);

            dispatch(SetSignedIn({
                isSignedIn,
                signInError: !isSignedIn ? ("Nie udało się zalogować") : undefined
            }));
        }
        catch {
            dispatch(SetSignedIn({
                isSignedIn: false,
                signInError: ("Wystąpił problem z logowaniem")
            }));
        }
    };

interface ChangeSignedInStatePayload {
    readonly isSignedIn: boolean;
    readonly signInError?: string;
}

const SetSignedIn = createAction<ChangeSignedInStatePayload>("ACCOUNT/INTERNAL_SET_SIGNED_IN");
addReducer(SetSignedIn, (state, action) => {
    const isSignedIn = !!action.payload && action.payload.isSignedIn;

    return {
        ...state,
        isSignedIn,
        signInError: action.payload ? action.payload.signInError : undefined
    };
});