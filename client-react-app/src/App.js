import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import "./App.css";
import { getMsalConfig } from "./authConfig";
import Main from "./Main";
import { AppConfigurationClient } from "@azure/app-configuration";
import { useEffect, useState } from "react";
import { ApplicationInsights } from '@microsoft/applicationinsights-web'

function App() {
  const [uri, setUri] = useState(null);

  const appInsights = new ApplicationInsights({ config: {
    connectionString: 'InstrumentationKey=4905fa8a-d841-4d8d-9ffe-12631c4eccdf;IngestionEndpoint=https://westeurope-1.in.applicationinsights.azure.com/;LiveEndpoint=https://westeurope.livediagnostics.monitor.azure.com/'
    /* ...Other Configuration Options... */
  } });

  appInsights.loadAppInsights();
appInsights.trackPageView();

  const getRedirectUri = async () => {
    const client = new AppConfigurationClient(
      process.env.REACT_APP_APP_CONFIG_CON_ST
    );
    const api_url = await client.getConfigurationSetting({
      key: "REACT_APP_REDIRECT",
    });
    if (api_url.value != null) {
      setUri(api_url?.value);
    }
  };

  const getMsalInstance = (uri) => {
    const config = getMsalConfig(uri);
    const msalInstance = new PublicClientApplication(config);
    return msalInstance;
  };

  useEffect(() => {
    getRedirectUri();
  }, []);

  if (uri != null) {
    return (
      <MsalProvider instance={getMsalInstance(uri)}>
        <Main />
      </MsalProvider>
    );
  }
  return (
    <div>
      <h1>service not available</h1>
    </div>
  );
}

export default App;
