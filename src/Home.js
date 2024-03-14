import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "./Home.css";
import { FaSmile } from "react-icons/fa";

function Home() {
    return (
<<<<<<< HEAD
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
=======
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary bg-dark border-bottom border-body" data-bs-theme="dark">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                        <a className="navbar-brand fs-5 fw-bold" href="#">Pramod-App</a>
                        <div className="d-flex justify-content-end">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="/">Home</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="/register">Register</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link active" href="/login">Login</a>
                                </li>
                            </ul>
                        </div>
                        {/* <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form> */}
                    </div>
                </div>
            </nav>
        </>
    )
>>>>>>> aa50028ea64e9c1ccd12284a923a8385419cddfe
}

export default Home;
