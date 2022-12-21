import { getKcContext } from "keycloakify/lib/getKcContext";

export const { kcContext } = getKcContext<
    // NOTE: A 'keycloakify' field must be added 
    // in the package.json to generate theses pages
    // https://docs.keycloakify.dev/build-options#keycloakify.extrapages
    ////| { pageId: "my-extra-page-1.ftl"; }
    ////| { pageId: "my-extra-page-2.ftl"; someCustomValue: string; }
    // NOTE: register.ftl is deprecated in favor of register-user-profile.ftl
    // but let's say we use it anyway and have this plugin enabled: https://github.com/micedre/keycloak-mail-whitelisting
    // keycloak-mail-whitelisting define the non standard ftl global authorizedMailDomains, we declare it here.
    | { pageId: "register.ftl"; authorizedMailDomains: string[]; }
>({
    // Uncomment to test the login page for development.
    "mockPageId": "login.ftl",
    //"mockPageId": "login-otp.ftl",
    "mockData": [
        {
            "pageId": "login.ftl",
            "locale": {
                "currentLanguageTag": "en",
            },
        },
		{
			"pageId": "login-otp.ftl",
			"otpLogin": {
				"userOtpCredentials": [
					{
						"id": "id1",
						"userLabel": "label1"
					},
					{
						"id": "id2",
						"userLabel": "label2"
					}
				]
			}
		},
    ]
});

export type KcContext = NonNullable<typeof kcContext>;