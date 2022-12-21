import React, {useState, memo, useEffect, FormEventHandler} from "react";
import {useKeycloak} from "./KeycloakContext";
import {clsx} from "keycloakify/lib/tools/clsx";
import {useConstCallback} from "powerhooks/useConstCallback";
import DynamicInput from "./DynamicInput";

const FormSocial = memo((props: any) => {
    const {
        kcProps, social, realm,
    } = useKeycloak();

    if (realm.password && social.providers !== undefined)
        return (
            <div id="kc-form" className={clsx(kcProps.kcContentWrapperClass)}>
                <div id="kc-social-providers" className={clsx(kcProps.kcFormSocialAccountContentClass, kcProps.kcFormSocialAccountClass)}>
                    <ul className={clsx(
                        kcProps.kcFormSocialAccountListClass,
                        social.providers.length > 4 && kcProps.kcFormSocialAccountDoubleListClass
                    )}>
                        {social.providers.map((p: any) => (
                            <li key={p.providerId} className={clsx(kcProps.kcFormSocialAccountListLinkClass)}>
                                <a href={p.loginUrl} id={`zocial-${p.alias}`} className={clsx("zocial", p.providerId)}>
                                    <span>{p.displayName}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );

    return null;
});

export default FormSocial;
