import React, {useEffect, useState} from 'react';
import {Button, Container, Figure, Nav, Navbar, NavDropdown, Offcanvas} from "react-bootstrap";
import logo from "../img/logoLQ.png"
import {Link, NavLink} from "react-router-dom";
import axios from "axios";
import profil from "../img/profile.png"
import {FaGithub, FaInstagram, FaLinkedin} from "react-icons/fa";

const NavbarComponent=()=>{
    const [juz, setJuz] = useState([]);
    const [surah, setSurah]=useState([]);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    useEffect(()=>{
        axios.get("https://api.quran.com/api/v4/juzs")
            .then((res )=>{
                setJuz(res.data.juzs)

            })
            .catch((error)=>{
                console.log(error, "error handle juz")
            })
        axios.get("https://api.quran.com/api/v4/chapters/")
            .then((res)=>{
                setSurah(res.data.chapters)
            })
            .catch((error)=>{
                console.log(error, 'error handle surah')
            })


    },[]);
        return (
            <div>
               <>
                   <Navbar className="fixed-top" collapseOnSelect expand="lg" bg="dark" variant="dark">
                       <Container>
                           <Navbar.Brand >
                               <Link to="/" className="text-decoration-none text-light">
                               <img
                                   alt=""
                                   src={logo}
                                   width="80"
                                   height="30"
                                   className="d-inline-block align-top"
                               />{' '}
                                   </Link>
                           </Navbar.Brand>
                           <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                           <Navbar.Collapse id="responsive-navbar-nav">
                               <Nav className="me-auto">
                                   <Nav.Link  variant="danger" ><NavLink to="/" className="text-decoration-none text-light">Home</NavLink></Nav.Link>
                                   <NavDropdown className="text-white" id="collasible-nav-dropdown"
                                                style={{ maxHeight: "28px" }}
                                                title={"Juz"}>
                                       <div>
                                           {juz.map((item, index)=>(
                                               <NavDropdown.Item  key={index} ><Link to={"/juz/"+ item.id} className="text-decoration-none text-dark">Juz {item.id}</Link></NavDropdown.Item>
                                           ))}
                                       </div>
                                   </NavDropdown>
                                   <NavDropdown id="collasible-nav-dropdown"
                                                style={{ maxHeight: "28px" }}
                                                title={"Info Surah"}>
                                       {surah.map((surahitem, index)=>(
                                           <NavDropdown.Item key={index}><Link to={"/info/" + surahitem.id} className="text-decoration-none text-dark">{surahitem.id}. {surahitem.name_simple}</Link></NavDropdown.Item>
                                       ))}
                                   </NavDropdown>
                                   <Button className="float-end
                               " variant="success" onClick={handleShow}>
                                       About
                                   </Button>
                               </Nav>
                           </Navbar.Collapse>
                       </Container>
                   </Navbar>

                   {/*Figure Area*/}
                   <Offcanvas show={show} onHide={handleClose}>
                       <Offcanvas.Header closeButton>
                           <Offcanvas.Title>About</Offcanvas.Title>
                       </Offcanvas.Header>
                       <Offcanvas.Body>
                           <p>This is Al-quran Digital .
                           Make with React JS, and Boostrap for Library UI
                           </p>
                           <Figure>
                               <h5> Author</h5>
                               {/* eslint-disable-next-line react/jsx-no-undef */}
                               <Figure.Image
                                   width={200}
                                   height={400}
                                   alt="171x180"
                                   src={profil}
                               />
                               <Figure.Caption>
                                   My name is Eka Sinta Aprilia. I'm a Informatics Engineering Student
                                   UIN Sultan Syarif Kasim Riau
                               </Figure.Caption>
                           </Figure>
                       </Offcanvas.Body>
                       {/*// <!-- Section: Social media -->*/}
                       <section className="mb-4 float-end">
                           <h5 className="text-success"> Follow my Sosial Media</h5>
                           {/*<!-- Instagram -->*/}
                           <a className="btn btn-outline-success btn-floating m-1" href="https://www.instagram.com/ekasintaaprilia/" role="button"
                           ><i ><FaInstagram style={{width:"20", height:"20"}}/></i
                           ></a>

                           {/*<!-- Linkedin -->*/}
                           <a className="btn btn-outline-success btn-floating m-1" href="https://www.linkedin.com/in/eka-sinta-aprilia-819925174/" role="button"
                           ><i ><FaLinkedin style={{width:"20", height:"20"}}/></i
                           ></a>

                           {/*<!-- Github -->*/}
                           <a className="btn btn-outline-success btn-floating m-1" href="https://github.com/ekasintaap" role="button"
                           ><i ><FaGithub style={{width:"20", height:"20"}}/></i
                           ></a>
                       </section>

                   </Offcanvas>
               </>
            </div>
        );
}

export default NavbarComponent;