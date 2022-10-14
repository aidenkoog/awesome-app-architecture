/* eslint-disable no-use-before-define */
/* eslint-disable indent */
/* eslint-disable prettier/prettier */
import _ from 'lodash';
import { NavigationActions, StackActions } from 'react-navigation';

let navigator;

function setTopLevelNavigator(navigatorRef) {
    navigator = navigatorRef;
}

function navigate(routeName, params) {
    navigator.dispatch(
        NavigationActions.navigate({
            routeName,
            params,
        }),
    );
}

function pushToNewScreen(routeName, params) {
    if (getTopCurrentRoute() !== routeName) {
        navigator.dispatch(
            StackActions.push({
                routeName,
                params,
            }),
        );
    }
}

function replaceToNewScreen(routeName, params) {
    navigator.dispatch(
        StackActions.replace({
            routeName,
            params,
        }),
    );
}

function pushToNewScreenWithoutCheckDuplicate(routeName, params) {
    navigator.dispatch(
        StackActions.push({
            routeName,
            params,
        }),
    );
}

function getTopCurrentRoute() {
    const nav = _.get(navigator, ['state', 'nav']);
    return getCurrentRoute(nav);
}

function getCurrentRoute(nav) {
    if (Array.isArray(nav.routes) && nav.routes.length > 0) {
        return getCurrentRoute(nav.routes[nav.index]);
    }
    return nav.routeName;
}

function hasRouter(routerName) {
    const nav = _.get(navigator, ['state', 'nav']);
    if (Array.isArray(nav.routes) && nav.routes.length > 0) {
        return nav.routes.some((item) => routerName === item.routeName);
    }
    return false;
}

function navigateAndReset(routeName, params) {
    navigator.dispatch(
        StackActions.reset({
            index: 0,
            key: null,
            actions: [
                NavigationActions.navigate({
                    routeName,
                    params,
                }),
            ],
        }),
    );
}

export default {
    navigate,
    pushToNewScreen,
    setTopLevelNavigator,
    getTopCurrentRoute,
    pushToNewScreenWithoutCheckDuplicate,
    replaceToNewScreen,
    navigateAndReset,
    hasRouter,
};
