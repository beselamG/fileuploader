import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { SignOutButton } from "./SignOutButton";

export const NavBar = ({ roles, userName }) => {
  return (
    <Navbar bg="dark" variant="dark" fixed="top">
      <Container>
        <Navbar.Brand href="#home">File Uploader </Navbar.Brand>

        <Nav className="me-auto">
          <Navbar.Text>
            Signed in as: <strong>{userName}</strong>
          </Navbar.Text>

          <NavDropdown
            title="Your Roles"
            id="collasible-nav-dropdown"
            style={{ marginLeft: 15 }}
          >
            {roles &&
              roles?.map((role, index) => (
                <NavDropdown.Item key={index}>{role}</NavDropdown.Item>
              ))}
          </NavDropdown>
        </Nav>
      </Container>

      <SignOutButton />
    </Navbar>
  );
};
