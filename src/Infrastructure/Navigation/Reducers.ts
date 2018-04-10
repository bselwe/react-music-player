import { AppNavigator, initialNavigationState } from "./Navigation";

export const routerReducer = (state = initialNavigationState, action) => {
    const nextState = AppNavigator.router.getStateForAction(action, state);
    return nextState || state;
};