import React from 'react';
import { useMsal } from '@azure/msal-react';
import Button from 'react-bootstrap/Button';
import { handleLogout } from '../services/mainService';



// Renders a button which, when selected, will redirect the page to the logout prompt
 
export const SignOutButton = () => {
  const { instance } = useMsal();

  return (
    <Button
      style= {{marginRight:10}}
      className="d-flex"
      variant="outline-success"
      onClick={() => handleLogout(instance)}
    >
      Sign out 
    </Button>
  );
};
