import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";
import "./App.css";
import AuthenticatedMain from "./components/AuthenticatedMain";
import { SignInButton } from "./components/SignInButton";

function Main() {
  return (
    <div className="main">
      <AuthenticatedTemplate>
        <AuthenticatedMain />
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <div className="login">
          <SignInButton />
          <p>You are not signed in! Please sign in.</p>
        </div>
      </UnauthenticatedTemplate>
    </div>
  );
}

export default Main;
