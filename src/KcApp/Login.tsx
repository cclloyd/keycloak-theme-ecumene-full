import React, {useState, memo, useEffect} from "react";
import { useConstCallback } from "powerhooks/useConstCallback";
import type { FormEventHandler } from "react";
import {KcContextBase, KcProps} from "keycloakify";
import {I18n} from "./i18n";
import Template, {TemplateProps} from "keycloakify/lib/components/Template";
import {clsx} from "keycloakify/lib/tools/clsx";

export type LoginProps = KcProps & {
    kcContext: KcContextBase.Login;
    i18n: I18n;
    doFetchDefaultThemeResources?: boolean;
    Template?: (props: TemplateProps) => JSX.Element | null;
};

const Login = memo((props: LoginProps) => {
    const { kcContext, i18n, doFetchDefaultThemeResources = true, ...kcProps } = props;

    const { social, realm, url, usernameEditDisabled, login, auth, registrationDisabled } = kcContext;

    const { msg, msgStr } = i18n;

    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

    const onSubmit = useConstCallback<FormEventHandler<HTMLFormElement>>(e => {
        e.preventDefault();

        setIsLoginButtonDisabled(true);

        const formElement = e.target as HTMLFormElement;

        //NOTE: Even if we login with email Keycloak expect username and password in
        //the POST request.
        formElement.querySelector("input[name='email']")?.setAttribute("name", "username");

        formElement.submit();
    });

    const handleChange = (e: any) => {
        if (e.target.value.length > 0) {
            // @ts-ignore
            document.querySelector(`label[for=${e.target.id}]`).classList.add('active');
        }
    }
    const handleBlur = (e: any) => {
        if (e.target.value.length === 0) {
            // @ts-ignore
            document.querySelector(`label[for=${e.target.id}]`).classList.remove('active');
        }
    }

    const handleClick = (e: any) => {
        const label = document.querySelector(`label[for=${e.target.id}]`);
        // @ts-ignore
        label.classList.add('active');
    }

    return (
        <Template
            {...{ kcContext, i18n, doFetchDefaultThemeResources, ...kcProps }}
            displayInfo={social.displayInfo}
            displayWide={realm.password && social.providers !== undefined}
            doFetchDefaultThemeResources={false}
            //headerNode={<><img src={'images/logo-reclaimer.png'} id={'logo'}/><span>{msg("doLogIn")}</span></>}
            headerNode={msg("doLogIn")}
            formNode={
                <div id="kc-form" className={clsx(realm.password && social.providers !== undefined && kcProps.kcContentWrapperClass)}>
                    <div
                        id="kc-form-wrapper"
                        className={clsx(
                            realm.password && social.providers && [kcProps.kcFormSocialAccountContentClass, kcProps.kcFormSocialAccountClass]
                        )}
                    >
                        {realm.password && (
                            <form id="kc-form-login" onSubmit={onSubmit} action={url.loginAction} method="post">
                                <div className={clsx(kcProps.kcFormGroupClass)}>
                                    {(() => {
                                        const label = !realm.loginWithEmailAllowed
                                            ? "username"
                                            : realm.registrationEmailAsUsername
                                                ? "email"
                                                : "usernameOrEmail";

                                        const autoCompleteHelper: typeof label = label === "usernameOrEmail" ? "username" : label;

                                        return (
                                            <>
                                                <label htmlFor={autoCompleteHelper} className={clsx(kcProps.kcLabelClass)}>
                                                    {msg(label)}
                                                </label>
                                                <input
                                                    tabIndex={1}
                                                    id={autoCompleteHelper}
                                                    className={clsx(kcProps.kcInputClass)}
                                                    //NOTE: This is used by Google Chrome auto fill so we use it to tell
                                                    //the browser how to pre fill the form but before submit we put it back
                                                    //to username because it is what keycloak expects.
                                                    name={autoCompleteHelper}
                                                    defaultValue={login.username ?? ""}
                                                    type="text"
                                                    onClick={handleClick}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    {...(usernameEditDisabled
                                                        ? { "disabled": true }
                                                        : {
                                                            "autoFocus": true,
                                                            "autoComplete": "off"
                                                        })}
                                                />
                                            </>
                                        );
                                    })()}
                                </div>
                                <div className={clsx(kcProps.kcFormGroupClass)}>
                                    <label htmlFor="password" className={clsx(kcProps.kcLabelClass)}>
                                        {msg("password")}
                                    </label>
                                    <input
                                        tabIndex={2}
                                        id="password"
                                        className={clsx(kcProps.kcInputClass)}
                                        name="password"
                                        type="password"
                                        autoComplete="off"
                                        onClick={handleClick}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </div>
                                <div className={clsx(kcProps.kcFormGroupClass, kcProps.kcFormSettingClass)}>
                                    <div id="kc-form-options">
                                        {realm.rememberMe && !usernameEditDisabled && (
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
                                        )}
                                    </div>
                                    <div className={clsx(kcProps.kcFormOptionsWrapperClass)}>
                                        {realm.resetPasswordAllowed && (
                                            <span>
                                                <a tabIndex={5} href={url.loginResetCredentialsUrl}>
                                                    {msg("doForgotPassword")}
                                                </a>
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div id="kc-form-buttons" className={clsx(kcProps.kcFormGroupClass)}>
                                    <input
                                        type="hidden"
                                        id="id-hidden-input"
                                        name="credentialId"
                                        {...(auth?.selectedCredential !== undefined
                                            ? {
                                                "value": auth.selectedCredential
                                            }
                                            : {})}
                                    />
                                    <input
                                        tabIndex={4}
                                        className={clsx(
                                            kcProps.kcButtonClass,
                                            kcProps.kcButtonPrimaryClass,
                                            kcProps.kcButtonBlockClass,
                                            kcProps.kcButtonLargeClass
                                        )}
                                        name="login"
                                        id="kc-login"
                                        type="submit"
                                        value={msgStr("doLogIn")}
                                        disabled={isLoginButtonDisabled}
                                    />
                                </div>
                            </form>
                        )}
                    </div>
                    {realm.password && social.providers !== undefined && (
                        <div id="kc-social-providers" className={clsx(kcProps.kcFormSocialAccountContentClass, kcProps.kcFormSocialAccountClass)}>
                            <ul className={clsx(
                                kcProps.kcFormSocialAccountListClass,
                                social.providers.length > 4 && kcProps.kcFormSocialAccountDoubleListClass
                            )}>
                                {social.providers.map(p => (
                                    <li key={p.providerId} className={clsx(kcProps.kcFormSocialAccountListLinkClass)}>
                                        <a href={p.loginUrl} id={`zocial-${p.alias}`} className={clsx("zocial", p.providerId)}>
                                            <span>{p.displayName}</span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            }
            infoNode={
                realm.password &&
                realm.registrationAllowed &&
                !registrationDisabled && (
                    <div id="kc-registration">
                        <span>
                            {msg("noAccount")}
                            <a tabIndex={6} href={url.registrationUrl}>
                                {msg("doRegister")}
                            </a>
                        </span>
                    </div>
                )
            }
        />
    );
});

export default Login;
