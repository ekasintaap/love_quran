import React, { useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import {Card, Col, Row} from "react-bootstrap";
import bg from "../img/surahbg.png";
import "../page/info.css"

const InfoComponent=()=> {
    const {id}=useParams()
    const [info, setInfo]=useState([]);
    const [surah, setSurah]= useState([])


    useEffect(()=>{
        axios.get("https://api.quran.com/api/v4/chapters/" + id + "/info?language=id")
            .then((res)=>{
                setInfo(res.data.chapter_info)
            })
            .catch((error)=>{
                console.log(error, 'error handle info')
            })
        axios.get("https://api.quran.com/api/v4/chapters/" + id)
            .then((res)=>{
                setSurah(res.data.chapter)
            })
            .catch((error)=>{
                console.log(error, 'error handle surah')
            })
    },[id])
        return (
            <div>
                <Card style={{marginTop:"55px"}}>
                    <Card.Img variant="top" src={bg} style={{width:'100%', height:'200px'}}/>
                    <Card.Body>
                        <Card.ImgOverlay>
                            <div className=" row justify-content-center align-items-center text-xxl" style={{margin:"50px", fontSize:""}} >
                                <Card.Title className="text-success text-xxl" ><h1> Surah  {surah.name_simple}</h1></Card.Title>
                                <h5  ><Link className="text-decoration-none text-warning text-decoration-underline" to={"/surah/" + surah.id}>Read Surah</Link></h5>
                            </div>
                        </Card.ImgOverlay>
                    </Card.Body>
                </Card>
                <Card key={id} className="mt-1">
                    <Card.Body>
                        <Row>
                            <Col sm={1}>
                                <span className="badge bg-success">Surah Ke-{info.chapter_id}</span>
                            </Col>
                            <Col sm={11}>
                                <p className="text-success" dangerouslySetInnerHTML={{__html: info.short_text}}/>
                                <h3 className="text-start"><strong>Info Surah</strong> </h3>
                                <p className="text-start" dangerouslySetInnerHTML={{__html: info.text}}/>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </div>
        );
}

export default InfoComponent;