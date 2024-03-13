import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "./Home.css";
import { FaSmile } from "react-icons/fa";

function Home() {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top" data-bs-theme="dark" >
            <Container>
                <Navbar.Brand href="/" >Pramod-App <FaSmile/></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto ">
                        <Nav.Link href="/" className=" home-nav-link">Home</Nav.Link>
                        <Nav.Link href="/projects" className=" home-nav-link">MyProjects</Nav.Link>
                        <Nav.Link href="/portfolio" className=" home-nav-link">Portfolio</Nav.Link>
                        <Nav.Link href="/register" className=" home-nav-link">Register</Nav.Link>
                        <Nav.Link href="/login" className=" home-nav-link">Login</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Home;
