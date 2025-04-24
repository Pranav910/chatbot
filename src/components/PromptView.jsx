"use client"

import React, { useEffect } from "react";
import { useState } from "react";
import Image from "next/image";
import './prompt_view.css'
import up_arrow from '../../assets/up-arrow.svg'
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import mic from "../../assets/mic.svg"
import tick from "../../assets/tick.svg"
import add from "../../assets/add.svg"

function PromptView({ setUserChat, setChats, setLoadingState, setPromptViewWidth }) {

    const [userInput, setUserInput] = useState("")
    const { transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition } = useSpeechRecognition()
    const [speechState, setSpeechState] = useState(false)
    const [file, setFile] = useState(null)

    // if (!browserSupportsSpeechRecognition)
    //     console.log("Your browser doesn't support speech recognitionl")
    // else
    //     console.log("Your broser supports speech recognition.")

    function updateUserInput(e) {
        setUserInput(e.target.value || transcript)
    }

    function sendUserInput(e) {
        if (e.key === "Enter") {
            get_model_response()
            e.target.innerText = ""
        }
    }

    async function get_model_response() {

        setUserChat(userInput)
        setUserInput("")
        setLoadingState(true)

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
        setFile(e.target.files[0])
    }

    async function get_model_response_with_file() {

        setUserChat(userInput)
        setUserInput("")
        setLoadingState(true)

        const formData = new FormData()
        formData.append('file', file)
        formData.append('user_prompt', userInput)

        const res = await fetch("http://localhost:8000/api/v1/file_response", {
            method: 'POST',
            'Content-Type': 'multipart/formdata',
            body: formData
        })

        const data = await res.json()


        setChats(p => [...p, {
            type : 'ai',
            chat : data?.result
        }])

        setLoadingState(false)
    }


    useEffect(() => {

        if (userInput.length > 90)
            setPromptViewWidth(userInput.length)
    }, [userInput])

    return (
        <main className="promptmain">
            <div className="promptsub">
                <textarea className="promptinput" placeholder="Enter Prompt" onChange={updateUserInput} onKeyDown={sendUserInput} value={userInput || transcript} />
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