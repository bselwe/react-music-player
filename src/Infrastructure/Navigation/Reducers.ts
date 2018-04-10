import { AppNavigator } from "./Navigation";

export const routerReducer = (state, action) => {
    const nextState = AppNavigator.router.getStateForAction(action, state);
    return nextState || state;
};