
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";
import "./App.css";
import AuthenticatedMain from "./components/AuthenticatedMain";
import { SignInButton } from "./components/SignInButton";

function Main() {
  
  return (
    <>
      <AuthenticatedTemplate>
        <AuthenticatedMain />
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <SignInButton />
        <p>You are not signed in! Please sign in.</p>
      </UnauthenticatedTemplate>
    </>
  );
}

export default Main;