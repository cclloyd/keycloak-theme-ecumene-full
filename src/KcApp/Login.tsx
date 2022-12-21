import React, {useState, memo, useEffect} from "react";
import { useConstCallback } from "powerhooks/useConstCallback";
import type { FormEventHandler } from "react";
import {KcContextBase, KcProps} from "keycloakify";
import {I18n} from "./i18n";
import Template, {TemplateProps} from "keycloakify/lib/components/Template";
import {clsx} from "keycloakify/lib/tools/clsx";
import {useKeycloak} from "./components/KeycloakContext";
import InfoNode from "./components/InfoNode";
import FormNodeLogin from "./components/FormNodeLogin";

export type LoginProps = KcProps & {
    kcContext: KcContextBase.Login;
    i18n: I18n;
    doFetchDefaultThemeResources?: boolean;
    Template?: (props: TemplateProps) => JSX.Element | null;
};

const Login = memo((props: any) => {

    const {
        kcContext, i18n, doFetchDefaultThemeResources, kcProps,
        social, realm, url, usernameEditDisabled, login, auth, registrationDisabled,
        msg, msgStr,
    } = useKeycloak();



    return (
        <Template
            {...{ kcContext, i18n, doFetchDefaultThemeResources, ...kcProps }}
            displayInfo={social.displayInfo}
            displayWide={realm.password && social.providers !== undefined}
            doFetchDefaultThemeResources={false}
            headerNode={msg("doLogIn")}
            formNode={<FormNodeLogin/>}
            infoNode={<InfoNode/>}
        />
    );
});

export default Login;
