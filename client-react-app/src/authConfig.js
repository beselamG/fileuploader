
  export const getMsalConfig = (redirectUrl) =>{
  
    const msalConfig = {
      auth: {
        clientId: '2ece27ca-0d97-4cf5-aa0c-bd3b281e39fb', //aad TENAT id  
        authority:
          'https://login.microsoftonline.com/031e4f4a-6a35-45e0-a98e-107900032d62', // This is a URL (e.g. https://login.microsoftonline.com/{your tenant ID})
        redirectUri: redirectUrl,
      },
      cache: {
        cacheLocation: 'sessionStorage', // This configures where your cache will be stored
        storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
      },
    };
    return msalConfig;
    
  
  };
  
  // Add scopes here for ID token to be used at Microsoft identity platform endpoints.
  export const loginRequest = {
   scopes: ["User.Read"]
  };
  
  // Add the endpoints here for Microsoft Graph API services you'd like to use.
  export const graphConfig = {
      graphMeEndpoint: "https://graph.microsoft.com"
  };