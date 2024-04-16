import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Outlet, useNavigate } from 'react-router-dom';

const AppLayout = () => {
    const [keyword, setKeyword] = useState('');

    const navigate = useNavigate();

    const searchByKeyword = (event) => {
        event.preventDefault();
        navigate(`/search?q=${keyword}`);
        setKeyword('');
    };

    return (
        <div>
            <Navbar expand="lg" className="bg-black">
                <Container fluid>
                    <Navbar.Brand className="text-danger fw-bold" href="/">
                        여기로고
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
                            <Nav.Link className="text-white" href="/">
                                홈
                            </Nav.Link>
                            <Nav.Link className="text-white" href="/camping">
                                캠핑장
                            </Nav.Link>
                            <Nav.Link className="text-white" href="/festival">
                                축제
                            </Nav.Link>
                        </Nav>
                        <Form
                            className="d-flex"
                            onSubmit={(event) => {
                                searchByKeyword(event);
                            }}
                        >
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                                value={keyword}
                                onChange={(event) => setKeyword(event.target.value)}
                            />
                            <Button variant="outline-danger" type="submit">
                                Search
                            </Button>
                            <Button
                                className="ms-3"
                                variant="outline-danger"
                                // type="submit"
                                onClick={() => navigate('/auth/login')}
                            >
                                Login
                            </Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Outlet />
        </div>
    );
};

export default AppLayout;
