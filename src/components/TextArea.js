import React, { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import './TextArea.css';
export default function TextArea(props) {  //rfc
    document.title = "TextUtils- Home";
    const { transcript, resetTranscript } = useSpeechRecognition();
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
        alert("Browser doesn't support Speech Recognition");
    }
    const handleListing = () => {
        SpeechRecognition.startListening({
            continuous: true,
        });
    };
    const stopHandle = () => {
        SpeechRecognition.stopListening();
    };

    function changehandler(event) {
        setText(event.target.value);
        resetTranscript('');
        if (copymessage === 'Copied')
            setCopyMessage('Copy');
    }
    function upperCaseConverter() {
        let newtext = (text + transcript).toUpperCase();
        resetTranscript('');
        setText(newtext);
        props.showalert("Text has been converted to Upper Case",'success');
    }
    function lowerCaseConverter() {
        let newtext = (text + transcript).toLowerCase();
        resetTranscript('');
        setText(newtext);
        props.showalert("Text has been converted to Lower Case",'success');
    }
    function removeextraspaces() {
        let newtext = (text + transcript).split(/[ ]+/);
        resetTranscript('');
        setText(newtext.join(" "));
        props.showalert("Extra spaces have been removed from text",'success');
    }
    function cleartext() {
        let newtext = '';
        setText(newtext);
        resetTranscript('');
        props.showalert("Cleared",'success');
    }
    function copytext() {
        navigator.clipboard.writeText(text + transcript);
        setCopyMessage('Copied');
        props.showalert("Copied",'success');
    }
    function totext() {
        if (speech === 'Speech to Text') {
            handleListing();
            setspeech('Stop');
            props.showalert("Speech to Text has been started",'success');
        }
        else {
            stopHandle();
            setspeech('Speech to Text');
            props.showalert("Speech to Text has been stopped",'success');
        }
    }
    const speak = () => {
        let msg = new SpeechSynthesisUtterance();
        msg.text = text + transcript;
        window.speechSynthesis.speak(msg);
        props.showalert("Text to Speech has been started",'success');
    }
    const [text, setText] = useState('');
    const [copymessage, setCopyMessage] = useState('Copy');
    const [speech, setspeech] = useState('Speech to Text');
    return (
        <div className = "mb-4"style={(props.mode === 'Light Mode')?{backgroundColor: '#212529', color: 'white'}:{backgroundColor: 'white',color: 'black'}}>
            <div className="container mb-4 pt-4" >
                <div className="mb-2">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label mb-3 h3 d-flex justify-content-center">{props.heading}</label>
                    <textarea className="form-control limitwidth" id="exampleFormControlTextarea1" value={text + transcript} onChange={changehandler} placeholder="Enter your text here..." rows="11" style={(props.mode === 'Light Mode')?{backgroundColor: '#1F1F1F',color: 'white'}:{backgroundColor: 'white',color: 'black'}}></textarea>
                </div>
                <div className="d-flex justify-content-center flex-wrap">
                    <button disabled = {(text.length + transcript.length) === 0} type="button" className="btn btn-primary mx-1 shadow-none mt-2" onClick={upperCaseConverter}>Convert to Uppercase</button>
                    <button disabled = {(text.length + transcript.length) === 0} type="button" className="btn btn-primary mx-2 shadow-none mt-2" onClick={lowerCaseConverter}>Convert to Lowercase</button>
                    <button disabled = {(text.length + transcript.length) === 0} type="button" className="btn btn-primary mx-2 shadow-none mt-2" onClick={removeextraspaces}>Remove extra spaces</button>
                    <button disabled = {(text.length + transcript.length) === 0} type="button" className="btn btn-primary mx-2 shadow-none mt-2" onClick={cleartext}>Clear</button>
                    <button disabled = {(text.length + transcript.length) === 0} type="button" className="btn btn-primary mx-2 shadow-none mt-2" onClick={copytext}>{copymessage}</button>
                    <button disabled = {(text.length + transcript.length) === 0} type="button" className="btn btn-primary mx-2 shadow-none mt-2" onClick={speak}>Text to Speech</button>
                    <button type="button" className="btn btn-primary mx-2 shadow-none mt-2" onClick={totext}>{speech}</button>
                </div>


            </div>
            <div className="container mt-5">
                <h2 className="form-label mt-3 mb-1 h3 d-flex justify-content-center">Your text Summary</h2>
                <div className="d-flex justify-content-center flex-wrap">
                    <button type="button" className="btn btn-primary mx-2 shadow-none special mt-2">
                        Chararcters <span className="badge text-bg-secondary">{(text + transcript).length}</span>
                    </button>
                    <button type="button" className="btn btn-primary mx-2 shadow-none special mt-2">
                        Words <span className="badge text-bg-secondary">{(text + transcript).replace(/\n/g, " ").split(' ').filter(value => value !== "").length}</span>
                    </button>
                    <button type="button" className="btn btn-primary mx-2 shadow-none special mt-2">
                        Sentences <span className="badge text-bg-secondary">{(text + transcript).replace(/\n/g, ".").split('. ').filter(value => (value !== "" && value !== " ")).length}</span>
                    </button>
                    <button type="button" className="btn btn-primary mx-2 shadow-none special mt-2">
                        Paragraphs <span className="badge text-bg-secondary">{(text + transcript).split('.\n').filter(value => value !== "").length}</span>
                    </button>
                    <button type="button" className="btn btn-primary mx-2 shadow-none special mt-2">
                        Reading Time <span className="badge text-bg-secondary">{((text + transcript).replace(/\n/g, " ").split(' ').filter(value => value !== "").length * 0.005).toFixed(2)} min</span>
                    </button>
                </div>
                <div>
                    <h2 className="form-label mt-5 h3 d-flex justify-content-center">Preview</h2>
                    <div className="d-flex justify-content-center" id="preview">
                        <button type="button" className="btn btn-primary mx-2 shadow-none special">
                            {text + transcript}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
