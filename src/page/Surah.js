import React, { useEffect, useState} from 'react';
import {Button, Card, Col, Row} from "react-bootstrap";
import bg from "../img/surahbg.png";
import {Link, useParams} from "react-router-dom";
import axios from "axios";

const SurahComponent=()=> {
    const {id} = useParams();
    const [namaSurah, setNamaSurah] = useState([]);
    const [ayat, setAyat]= useState([]);
    const [arti, setArti]=useState([]);
    const [audioAyat, setAudioAyat]= useState([]);
    const [audioSurah, setAudioSurah]=useState([]);

    useEffect(() => {
        axios.get("https://api.quran.com/api/v4/chapters/" + id)
            .then((res) => {
                setNamaSurah(res.data.chapter)
                // console.log(res.data.chapter)
            })
            .catch((error) => {
                console.log(error, 'error handle nama surah')
            })
        axios.get("https://api.quran.com/api/v4/quran/verses/uthmani?chapter_number=" + id)
            .then((res)=>{
                setAyat(res.data.verses)
            })
            .catch((error)=>{
                console.log(error, 'error handle ayat surah')
            })
        axios.get("https://api.quran.com/api/v4/quran/translations/134?chapter_number=" +id)
            .then((res)=>{
                setArti(res.data.translations)
        })
            .catch((error)=>{
                console.log(error, 'error handle arti surah')
            })
        axios.get("https://api.quran.com/api/v4/quran/recitations/7?chapter_number=" +id)
            .then((res)=>{
                setAudioAyat(res.data.audio_files)
            })
            .catch((error)=>{
                console.log(error, "error handle audio ayat")
            })
        axios.get("https://api.quran.com/api/v4/chapter_recitations/7/" +id)
            .then((res)=>{
                setAudioSurah(res.data.audio_file)
            })
            .catch((error)=>{
                console.log(error, "error handle audio ayat")
            })
},[id])
        return (
            <>
            <div>
                <Card style={{marginTop:"55px"}}>
                    <Card.Img variant="top" src={bg} style={{width:'100%', height:'200px'}}/>
                    <Card.Body>
                        <Card.ImgOverlay>
                            <div className=" row justify-content-center align-items-center text-xxl" style={{margin:"50px", fontSize:""}} >
                                <Card.Title className="text-success text-xxl" ><h1> Surah {namaSurah.name_simple}</h1></Card.Title>
                                <h5  ><Link className="text-decoration-none text-warning text-decoration-underline" to={"/info/" + namaSurah.id}>More Info surah</Link></h5>
                            </div>
                        </Card.ImgOverlay>
                    </Card.Body>
                </Card>
                <div className="bg-success bg-opacity-50">
                    <h5 className="text-decoration-underline text-white">Play Full Surah</h5>
                <audio className="h-10 mt-2 w-full text-white" src={audioSurah.audio_url} controls />
                </div>
                {ayat.map((ayatitem, index)=>{
                    return(
                        <Card key={index} className="mt-1">
                            <Card.Body>
                                <Row>
                                    <Col sm={1}>
                                        <span className="badge bg-success">{ayatitem.verse_key}</span>
                                    </Col>
                                    <Col sm={11}>
                                        <p className="text-end fs-1">{ayatitem.text_uthmani}</p>
                                        {arti.length? <p className="text-md-start fst-italic" dangerouslySetInnerHTML={{__html:arti[index]?.text}} />:null}
                                        {audioAyat.length? <audio  className="h-10 mt-2   text-end float-end" src={"https://verses.quran.com/" + audioAyat[index]?.url} controls color="primary" />:null}
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    )
                })}
            </div>
            </>
        );

}

export default SurahComponent;