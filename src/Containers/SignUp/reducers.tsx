import { ReducerMap, createAction } from "redux-actions";
import { addReducerFactory } from "../../Utils/AddReducer";
import { Dispatch } from "react-redux";
import { Thunk } from "../../Utils/Thunk";
import Tidal from "../../Services/TidalClient";
import { loginManager } from "../../Services/LoginManager"

export let singUpReducers: ReducerMap<AppState, any> = {};
const addReducer = addReducerFactory(singUpReducers);

export const SignUpWithPassword = (name: string, lastname: string, email: string, password: string) =>
    async (dispatch: Dispatch<any>, getState: () => AppState) => {
        try {
            const isSignedUp = await loginManager.trySignUp(email, password);

            dispatch(SetSignedUp({
                signUpError: !isSignedUp ? ("Nie udało się zarejestrować") : undefined
            }));
        }
        catch {
            dispatch(SetSignedUp({
                signUpError: ("Wystąpił problem z rejestracją")
            }));
        }
    };

interface ChangeSignedUpStatePayload {
    readonly signUpError?: string;
}

const SetSignedUp = createAction<ChangeSignedUpStatePayload>("ACCOUNT/INTERNAL_SET_SIGNED_UP");
addReducer(SetSignedUp, (state, action) => {
    return {
        ...state,
        SignUpError: action.payload ? action.payload.signUpError : undefined
    };
});