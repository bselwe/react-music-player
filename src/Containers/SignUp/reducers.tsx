import { ReducerMap, createAction } from "redux-actions";
import { addReducerFactory } from "../../Utils/AddReducer";
import { Dispatch } from "react-redux";
import { Thunk } from "../../Utils/Thunk";
import Tidal from "../../Services/TidalClient";
import { loginManager } from "../../Services/LoginManager"

export let singInReducers: ReducerMap<AppState, any> = {};
const addReducer = addReducerFactory(singInReducers);

export const SignUpWithPassword = (username: string, password: string) =>
    async (dispatch: Dispatch<any>, getState: () => AppState) => {
        try {
            const isSignedIn = await loginManager.trySignUp(username, password);

            dispatch(SetSignedIn({
                isSignedIn,
                signUpError: !isSignedIn ? ("Nie udało się zarejestrować") : undefined
            }));
        }
        catch {
            dispatch(SetSignedIn({
                isSignedIn: false,
                signUpError: ("Wystąpił problem z rejestracją")
            }));
        }
    };

interface ChangeSignedInStatePayload {
    readonly isSignedIn: boolean;
    readonly signUpError?: string;
}

const SetSignedIn = createAction<ChangeSignedInStatePayload>("ACCOUNT/INTERNAL_SET_SIGNED_IN");
addReducer(SetSignedIn, (state, action) => {
    const isSignedIn = !!action.payload && action.payload.isSignedIn;

    return {
        ...state,
        isSignedIn,
        SignUpError: action.payload ? action.payload.signUpError : undefined
    };
});