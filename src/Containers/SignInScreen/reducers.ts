import { ReducerMap, createAction } from "redux-actions";
import { addReducerFactory } from "../../Utils/AddReducer";
import { Dispatch } from "react-redux";
import { Thunk } from "../../Utils/Thunk";
import { loginManager } from "../../Services/LoginManager"
import { apiClient } from "../../Services/ApiClient";

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

export const FetchUserInfo = () =>
    async (dispatch: Dispatch<any>, getState: () => AppState) => {
        try {
            let isSignedIn = await loginManager.isSigned();
            dispatch(SetSignedIn({ isSignedIn }));

            if (isSignedIn)
            {
                let res = await apiClient.fetchUserInfo();
                if (res.IsSuccess)
                    dispatch(SetUserInfo(res.Response));
                else
                    dispatch(SetUserInfo(undefined));
            }
            else
                dispatch(SetUserInfo(undefined));
        }
        catch {
            dispatch(SetUserInfo(undefined));
        }
    };

const SetUserInfo = createAction("LOADING/SET_USER_INFO", (userInfo: Models.UserInfoDTO) => ({ userInfo }));
addReducer(SetUserInfo, (state, action) => {
    return {
        ...state,
        userInfo: action.payload.userInfo
    };
});

export const SignOutFromStore = createAction("ACCOUNT/SIGN_OUT");
addReducer(SignOutFromStore, (state) => {
    return {
        ...state,
        isSignedIn: false,
        signInError: undefined,
        userInfo: undefined,
        signUpError: undefined,
        signUpResult: undefined,
        favorites: []
    };
});
