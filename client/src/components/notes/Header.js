import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Navbar, Container } from 'react-bootstrap';


const Header = ({ setIsLogin }) => {

    const logoutSubmit = () => {
        localStorage.clear();
        setIsLogin(false)
    }

    return (
        <header className='mt-3'>
            <Navbar bg="transparnt" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand className='fs-3 text-uppercase' href="/">
                        <img
                            src="/images/logo.png"
                            width="30"
                            height="30"
                            className="d-inline-block align-text-top"
                            alt='logo'
                        />{' '}
                        Notes
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto fs-6 text-uppercase ">
                                <Nav.Link href="/create">Create Note</Nav.Link>
                            <Nav.Link onClick={logoutSubmit} href="/">Logout</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}

export default Header;
