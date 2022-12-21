import React, {useState, memo, useEffect} from "react";
import { useConstCallback } from "powerhooks/useConstCallback";
import type { FormEventHandler } from "react";
import {clsx} from "keycloakify/lib/tools/clsx";
import {useKeycloak} from "./KeycloakContext";

const DynamicInput = memo((props: any) => {

    const { type, id, label, tabIndex, defaultValue } = props;

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
        <>
            <label htmlFor={id} className={clsx(kcProps.kcLabelClass)}>
                {msg(label)}
            </label>
            <input
                tabIndex={tabIndex}
                id={id}
                className={clsx(kcProps.kcInputClass)}
                name={id}
                defaultValue={defaultValue}
                type={type}
                onClick={handleClick}
                onChange={handleChange}
                onBlur={handleBlur}
                onFocus={handleClick}
                {...(usernameEditDisabled ? { "disabled": true } : {
                    "autoFocus": true,
                    "autoComplete": "off"
                })}
            />
        </>
    );
});

export default DynamicInput;
