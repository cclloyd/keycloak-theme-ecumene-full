import React, {useState, memo, useEffect, FormEventHandler} from "react";
import {useKeycloak} from "./KeycloakContext";
import {clsx} from "keycloakify/lib/tools/clsx";
import {useConstCallback} from "powerhooks/useConstCallback";
import DynamicInput from "./DynamicInput";
import FormSocial from "./FormSocial";
import FormRememberMe from "./FormRememberMe";

const FormNodeLogin = memo((props: any) => {
    const {
        kcContext, i18n, doFetchDefaultThemeResources, kcProps,
        social, realm, url, usernameEditDisabled, login, auth, registrationDisabled,
        msg, msgStr,
    } = useKeycloak();

    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

    const onSubmit = useConstCallback<FormEventHandler<HTMLFormElement>>(e => {
        e.preventDefault();
        setIsLoginButtonDisabled(true);
        const formElement = e.target as HTMLFormElement;
        formElement.querySelector("input[name='email']")?.setAttribute("name", "username");
        formElement.submit();
    });

    return (
        <div id="kc-form" className={clsx(realm.password && social.providers !== undefined && kcProps.kcContentWrapperClass)}>
            {realm.password && (
                <form id="kc-form-login" onSubmit={onSubmit} action={url.loginAction} method="post">

                    <div className={clsx(kcProps.kcFormGroupClass)}>
                        {(() => {
                            const label = !realm.loginWithEmailAllowed ? "username" : realm.registrationEmailAsUsername ? "email" : "usernameOrEmail";
                            const autoCompleteHelper: typeof label = label === "usernameOrEmail" ? "username" : label;
                            return (<DynamicInput
                                defaultValue={login.username ?? ''}
                                id={autoCompleteHelper}
                                label={label}
                                tabIndex={1}
                            />);
                        })()}
                    </div>

                    <div className={clsx(kcProps.kcFormGroupClass)}>
                        <DynamicInput
                            id={'password'}
                            label={'password'}
                            type={'password'}
                            tabIndex={2}
                        />
                    </div>

                    <FormRememberMe/>

                    <div id="kc-form-buttons" className={clsx(kcProps.kcFormGroupClass)}>
                        <input
                            type="hidden"
                            id="id-hidden-input"
                            name="credentialId"
                            {...(auth?.selectedCredential !== undefined ? {value: auth.selectedCredential} : {})}
                        />
                        <input
                            tabIndex={4}
                            name="login"
                            id="kc-login"
                            type="submit"
                            value={msgStr("doLogIn")}
                            disabled={isLoginButtonDisabled}
                        />
                    </div>
                </form>
            )}

            <div className={clsx(kcProps.kcFormOptionsWrapperClass)}>
                {realm.resetPasswordAllowed && (
                    <span>
                        <a tabIndex={5} href={url.loginResetCredentialsUrl}>
                            {msg("doForgotPassword")}
                        </a>
                    </span>
                )}
            </div>

            <FormSocial/>
        </div>
    );
});

export default FormNodeLogin;
