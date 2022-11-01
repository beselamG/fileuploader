import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from "@azure/msal-react";
import "./App.css";
import Container from "./components/Container";
import FileUploader from "./components/FileUploader";
import { PageLayout } from "./components/PageLayout";
import ProfileContent from "./components/ProfileContent";
import { SignInButton } from "./components/SignInButton";
import { SignOutButton } from "./components/SignOutButton";

function App() {
  return (
    <>
      <AuthenticatedTemplate>
        <SignOutButton />
        <Container/>
        <FileUploader/>
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <SignInButton />
        <p>You are not signed in! Please sign in.</p>
      </UnauthenticatedTemplate>
    </>
  );
}

export default App;
