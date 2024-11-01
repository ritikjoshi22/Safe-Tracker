import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Store } from "./Store";
import { useContext, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import HomePage from "./pages/HomePage"
import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {
  const {
    state: { mode, userInfo },
    dispatch,
  } = useContext(Store);
  useEffect(() => {
    document.body.setAttribute("data-bs-theme", mode);
  }, [mode]);

  const switchModeHandler = () => {
    dispatch({ type: "SWITCH_MODE" });
  };
  const signoutHandler = () => {
    dispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("cartItems");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethod");
    window.location.href = "/signin";
  };
  return (
    <>
      <div className="d-flex flex-column vh-100">
        <ToastContainer position="bottom-center" limit={1} />
        <header>
          <Navbar
            className="d-flex flex-column align-items-stretch p-2 pb-0 mb-3"
            bg="dark"
            variant="dark"
            expand="lg"
          >
            <div className="d-flex justify-content-between align-items-center">
              <LinkContainer to="/" className="header-link border-0">
                <Navbar.Brand>Beyond Infinity♾️</Navbar.Brand>
              </LinkContainer>
              <Navbar.Collapse>
                <Link to="/ambulance" className="w-50 text-center nav-link header-link">
                  Ambulance
                </Link>
                <Link to="/police" className="w-50 text-center	nav-link header-link">
                  Police
                </Link>
                <Link to="/fireBrigade" className="w-50 text-center nav-link header-link">
                  Fire Brigade
                </Link>
                <Link to="/family" className="w-50 text-center	nav-link header-link">
                  Family
                </Link>
                <Nav className="w-100 justify-content-end">
                  <Link
                    to="#"
                    className="nav-link header-link"
                    onClick={switchModeHandler}
                  >
                    <i
                      className={
                        mode === "light" ? "fas fa-sun" : "fas fa-moon"
                      }
                    ></i>{" "}
                    {mode === "light" ? "Light" : "Dark"}
                  </Link>

                  {userInfo ? (
                    <NavDropdown
                      className="header-link"
                      title={`Hello, ${userInfo.name}`}
                    >
                      <LinkContainer to="/profile">
                        <NavDropdown.Item>User Profile</NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Divider />
                      <Link
                        className="dropdown-item"
                        to="#signout"
                        onClick={signoutHandler}
                      >
                        {" "}
                        Sign Out{" "}
                      </Link>
                    </NavDropdown>
                  ) : (
                    <NavDropdown
                      className="header-link"
                      title={`Hello, sign in`}
                    >
                      <LinkContainer to="/signin">
                        <NavDropdown.Item>Sign In</NavDropdown.Item>
                      </LinkContainer>
                    </NavDropdown>
                  )}
                </Nav>
              </Navbar.Collapse>
            </div>
          </Navbar>
        </header>
        <main>
          <Container className="mt-3">
            <Outlet />
          </Container>
        </main>
        <footer className="text-center">
          <div>All right reserved</div>
        </footer>
      </div>
    </>
  );
}

export default App;
