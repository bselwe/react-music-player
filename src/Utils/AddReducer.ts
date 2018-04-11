import { ReducerMap } from "redux-actions";
import { Action } from "redux";

type ActionFunction5<T1, T2, T3, T4, T5, R> = (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5) => R;

export function addReducerFactory<TState>(reducers: ReducerMap<TState, any>) {
    function addReducer<TPayload>(action: ReduxActions.ActionFunction0<TPayload>, reducer: (state: TState) => TState): void;
    function addReducer<TPayload>(action: ReduxActions.ActionFunction1<any, ReduxActions.Action<TPayload>>, reducer: (state: TState, action: Action & { payload: TPayload }) => TState): void;
    function addReducer<TPayload>(action: ReduxActions.ActionFunction2<any, any, ReduxActions.Action<TPayload>>, reducer: (state: TState, action: Action & { payload: TPayload }) => TState): void;
    function addReducer<TPayload>(action: ReduxActions.ActionFunction3<any, any, any, ReduxActions.Action<TPayload>>, reducer: (state: TState, action: Action & { payload: TPayload }) => TState): void;
    function addReducer<TPayload>(action: ReduxActions.ActionFunction4<any, any, any, any, ReduxActions.Action<TPayload>>, reducer: (state: TState, action: Action & { payload: TPayload }) => TState): void;
    function addReducer<TPayload>(action: ActionFunction5<any, any, any, any, any, ReduxActions.Action<TPayload>>, reducer: (state: TState, action: Action & { payload: TPayload }) => TState): void;
    function addReducer<TPayload>(action: ReduxActions.ActionFunctionAny<ReduxActions.Action<TPayload>>, reducer: (state: TState, action: Action & { payload: TPayload }) => TState): void {
        reducers[action.toString()] = reducer;
    }

    return addReducer;
}
