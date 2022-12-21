import React, {Component, createContext, useContext, useState} from 'react';
import {KcContextBase, KcProps} from "keycloakify";
import {I18n} from "../i18n";
import {TemplateProps} from "keycloakify/lib/components/Template";

const KeycloakContext = createContext(undefined);

//export type KeycloakProviderProps = KcProps & {
//    children: any,
//    kcContext: KcContextBase.Login;
//    i18n: I18n;
//    doFetchDefaultThemeResources?: boolean;
//    Template?: (props: TemplateProps) => JSX.Element | null;
//};

export function KeycloakProvider(props) {
    const { children, kcContext, i18n, doFetchDefaultThemeResources = true, ...kcProps } = props;

    if (!kcContext) return null;

    const { social, realm, url, usernameEditDisabled, login, auth, registrationDisabled } = kcContext;

    const { msg, msgStr } = i18n;


    return (
        <KeycloakContext.Provider value={{
            kcContext, i18n, doFetchDefaultThemeResources, kcProps,
            social, realm, url, usernameEditDisabled, login, auth, registrationDisabled,
            msg, msgStr,
        }}>
            {children}
        </KeycloakContext.Provider>
    )
}

export const useKeycloak = () => {
    const ctx = useContext(KeycloakContext);

    if (!ctx) throw Error('The `useKeycloak` hook must be called from a descendent of the `KeycloakProvider`.');

    return {
        kcContext: ctx.kcContext,
        i18n: ctx.i18n,
        doFetchDefaultThemeResources: ctx.doFetchDefaultThemeResources,
        kcProps: ctx.kcProps,

        social: ctx.social,
        realm: ctx.realm,
        url: ctx.url,
        usernameEditDisabled: ctx.usernameEditDisabled,
        login: ctx.login,
        auth: ctx.auth,
        registrationDisabled: ctx.registrationDisabled,

        msg: ctx.msg,
        msgStr: ctx.msgStr,
    }
}