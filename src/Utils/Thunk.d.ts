import { Dispatch } from "redux";

interface Thunk<TState = AppState> {
    (dispatch: Dispatch<any>, getState: () => TState): void;
}
