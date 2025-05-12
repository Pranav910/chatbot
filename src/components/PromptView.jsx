"use client"

import React, { useEffect, useRef } from "react";
import { useState } from "react";
import Image from "next/image";
import './prompt_view.css'
import up_arrow from '../../assets/up-arrow.svg'
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import mic from "../../assets/mic.svg"
import tick from "../../assets/tick.svg"
import add from "../../assets/add.svg"

function PromptView({ setUserChat, setChats, setLoadingState, setPromptViewWidth, showToast }) {

    const [userInput, setUserInput] = useState("")
    const { transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition } = useSpeechRecognition()
    const [speechState, setSpeechState] = useState(false)
    const [file, setFile] = useState(null)
    const [fileURL, setFileURL] = useState(null)
    const imageFormats = ['png', 'jpg', 'jpeg', 'img']
    const userInputRef = useRef(null)

    // if (!browserSupportsSpeechRecognition)
    //     console.log("Your browser doesn't support speech recognitionl")
    // else
    //     console.log("Your broser supports speech recognition.")
    
    function updateUserInput(e) {
        setUserInput(e.target.value || transcript)
    }
    
    function sendUserInput(e) {
        if (e.key === "Enter") {
            if (!file && userInput.length)
                get_model_response()
            else if (userInput.length)
                get_model_response_with_file()
        }
    }

    async function get_model_response() {

        setUserChat(userInput)
        setUserInput("")
        setLoadingState(true)
        console.log(window.location.origin)

        // const response = await fetch(`${window.location.origin}/api/v1/api/v1/response`, {
        const response = await fetch("http://localhost:8000/api/v1/response", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ type: 'user', prompt: userInput })
        })

        const data = await response.json()

        setChats(p => [...p, {
            type: 'ai',
            chat: data?.result
        }])

        setLoadingState(false)
    }

    async function startSpeechRecognition() {
        if (!speechState) {
            setSpeechState(true)
            await SpeechRecognition.startListening({ continuous: true })
        } else {
            setSpeechState(false)
            setUserInput(transcript)
            await SpeechRecognition.stopListening()
            resetTranscript()
        }
    }

    function setInputFile(e) {
        e.preventDefault()
        setFile({
            type: e.target.files[0].name.split('.').pop(),
            file: e.target.files[0]
        })

        setFileURL(URL.createObjectURL(e.target.files[0]))
    }

    async function get_model_response_with_file() {

        setUserChat(userInput, fileURL)
        setUserInput("")
        setLoadingState(true)

        const formData = new FormData()
        formData.append('file', file.file)
        formData.append('user_prompt', userInput)

        try {

            const res = await fetch(!imageFormats.includes(file.type) ? "http://localhost:80/api/v1/file_response" : "http://localhost:80/api/v1/image_response", {
            // const res = await fetch(!imageFormats.includes(file.type) ? "https://ff78-103-107-150-234.ngrok-free.app/api/v1/api/v1/file_response" : "https://ff78-103-107-150-234.ngrok-free.app/api/v1/api/v1/image_response", {
                method: 'POST',
                body: formData
            })

            const data = await res.json()

            setChats(p => [...p, {
                type: 'ai',
                chat: data?.result
            }])

            setLoadingState(false)
        } catch (err) {

            showToast("Unable to proceed your request due to rate limiting! Please try after some time.")
            setLoadingState(false)
        }

    }


    useEffect(() => {

        if (userInput.length > 90)
            setPromptViewWidth(userInput.length)
    }, [userInput])

    return (
        <main className="promptmain">
            <div className="promptsub">
                <textarea ref={userInputRef} className="promptinput" placeholder="Enter Prompt" onKeyDown={sendUserInput} value={userInput} onChange={updateUserInput}/>
                <div className="up-arrow-main">
                    {
                        userInput.length || transcript.length ?
                            <Image className="up-arrow" width={30} height={30} alt="up-arrow" src={up_arrow} onClick={file ? get_model_response_with_file : get_model_response} /> :
                            null
                    }
                </div>

                <Image height={30} width={30} alt="mic" src={speechState ? tick : mic} className="up-arrow" onClick={startSpeechRecognition} />
                <input type="file" id="file_input" onChange={setInputFile} />
                <label htmlFor="file_input">
                    <Image height={30} width={30} alt="mic" src={add} className="up-arrow" />
                </label>
            </div>
        </main>
    )
}

export default PromptView;