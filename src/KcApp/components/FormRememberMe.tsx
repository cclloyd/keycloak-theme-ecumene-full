import React, {useState, memo, useEffect, FormEventHandler} from "react";
import {useKeycloak} from "./KeycloakContext";
import {clsx} from "keycloakify/lib/tools/clsx";
import {useConstCallback} from "powerhooks/useConstCallback";
import DynamicInput from "./DynamicInput";
import FormSocial from "./FormSocial";

const FormNodeLogin = memo((props: any) => {
    const {
        realm, usernameEditDisabled, login, msg,
    } = useKeycloak();


    if (realm.rememberMe && !usernameEditDisabled)
        return (
            <>
                <label htmlFor={'rememberMe'} className={'toggle'}>
                    <input
                        tabIndex={3}
                        id="rememberMe"
                        name="rememberMe"
                        type="checkbox"
                        {...(login.rememberMe ? {"checked": true} : {})}
                    />
                    <div className={'toggle-switch'}></div>
                    <span className={'toggle-label'}>{msg("rememberMe")}</span>
                </label>
            </>
        );

    return null;
});

export default FormNodeLogin;
