"use client"

import React from "react";
import { useState } from "react";
import Image from "next/image";
import './prompt_view.css'
import up_arrow from '../../assets/up-arrow.svg'

function PromptView({ setUserChat, setChats, setLoadingState }) {

    const [userInput, setUserInput] = useState("")

    function updateUserInput(e) {
        setUserInput(e.target.value)
    }

    function sendUserInput(e) {
        if (e.key === "Enter") {
            setUserChat(userInput)
            setUserInput("")
            get_model_response()
        }
    }

    async function get_model_response() {

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

    return (
        <main className="promptmain">
            <div className="promptsub">
                <input onChange={updateUserInput} onKeyDown={sendUserInput} value={userInput} type="text" placeholder="Enter Prompt" className="promptinput" />
                {
                    userInput.length ?
                        <Image width={30} height={30} alt="up-arrow" src={up_arrow} className="up-arrow" onClick={get_model_response} /> :
                        null
                }
            </div>
        </main>
    )
}

export default PromptView;