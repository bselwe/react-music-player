import { ReducerMap, createAction } from "redux-actions";
import { addReducerFactory } from "../../Utils/AddReducer";
import { Dispatch } from "react-redux";
import { Thunk } from "../../Utils/Thunk";
import Tidal from "../../Services/TidalClient";
import { apiClient } from "../../Services/ApiClient";

export let singUpReducers: ReducerMap<AppState, any> = {};
const addReducer = addReducerFactory(singUpReducers);

export const SignUpWithPassword = (name: string, lastname: string, email: string, password: string) =>
    async (dispatch: Dispatch<any>, getState: () => AppState) => {
        try {
            const response = await apiClient.signUp({
                FirstName: name, 
                LastName: lastname, 
                Email: email, 
                Password: password
            });

            dispatch(SetSignedUp({
                signUpError: !response.IsSuccess ? ("Nie udało się zarejestrować") : undefined,
                signUpResult: response.IsSuccess
            }));    
        }
        catch {
            dispatch(SetSignedUp({
                signUpError: ("Wystąpił problem z rejestracją"),
                signUpResult: undefined
            }));
        }
    };

interface ChangeSignedUpStatePayload {
    readonly signUpError?: string;
    readonly signUpResult?: boolean;
}

const SetSignedUp = createAction<ChangeSignedUpStatePayload>("ACCOUNT/INTERNAL_SET_SIGNED_UP");
addReducer(SetSignedUp, (state, action) => {
    return {
        ...state,
        signUpError: action.payload ? action.payload.signUpError : undefined,
        signUpResult: action.payload ? action.payload.signUpResult : undefined
    };
});