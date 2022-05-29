import React, { useState, useEffect } from 'react'
import './App.css';
import About from './components/About';
import Alert from './components/Alert';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import TextArea from './components/TextArea';
import {
  HashRouter as Router,
  Routes,
  Route
} from "react-router-dom";
export default function App() {
  const [mode, setmode] = useState('Dark Mode');
  function togglemode() {
    if (mode === 'Dark Mode') {
      setmode('Light Mode');
      showalert("Dark Mode has been enabled", "success");
    }
    else {
      setmode('Dark Mode');
      showalert("Light Mode has been enabled", "success");
    }
  }
  const [alert, setalert] = useState(null);
  const [titlevalue, settitlevalue] = useState('TextUtils- Home');
  function showalert(message, type) {
    setalert({
      mess: message,
      type: type
    });
    setTimeout(() => {
      setalert(null);
    }, 1500);
  }
  useEffect(() => {
    settitlevalue(document.title);
  });
  return (
    <Router>
      <div className='container-fluid px-0 py-0 d-flex flex-column' style={mode === "Light Mode" ? { backgroundColor: "#212529", minHeight: "100vh" } : { backgroundColor: "white", minHeight: "100vh" }}>
        <Navbar title="TextUtils" abouttext="About" mode={mode} togglemode={togglemode} titlevalue = {titlevalue}/>
        <Alert alert={alert} />
        <Routes>
          <Route path="/" element={<TextArea heading="Text Analyzer" mode={mode} showalert={showalert} />}/>
          <Route path="about" element={<About mode={mode} />} />
        </Routes>
        <Footer mode={mode} />
      </div>
    </Router>
  )
}
