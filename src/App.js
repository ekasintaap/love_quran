import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarComponent from "./component/Navbar";
import {Route, Routes} from "react-router-dom";
import HomeComponen from "./page/Home";
import SurahComponent from "./page/Surah";
import JuzComponent from "./page/Juz";
import InfoComponent from "./page/Info";
import ErrorPageCom from "./page/ErorPage";
import FooterComponent from "./component/Footer";
import React from "react";

function App() {
  return (
      <>
      <div className="App" >
          <NavbarComponent/>
          <Routes>
              <Route path="/" element={<HomeComponen/>}/>
              <Route path="surah/:id" element={<SurahComponent/>}/>
              <Route path="juz/:id" element={<JuzComponent/>}/>
              <Route path="info/:id" element={<InfoComponent/>}/>
          </Routes>
          <FooterComponent/>
      </div>
      </>
  );
}

export default App;
