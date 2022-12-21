import React, {useState, memo, useEffect} from "react";
import {useKeycloak} from "./KeycloakContext";

const InfoNode = memo((props: any) => {
    const { realm, url, registrationDisabled, msg } = useKeycloak();

    if (realm.password && realm.registrationAllowed && !registrationDisabled)
        return (
            <div id="kc-registration">
                    <span>
                        {msg("noAccount")}
                        <a tabIndex={6} href={url.registrationUrl}>
                            {msg("doRegister")}
                        </a>
                    </span>
            </div>
        );

    return null;
});

export default InfoNode;
