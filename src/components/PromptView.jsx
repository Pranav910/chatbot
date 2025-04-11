"use client"

import React from "react";
import { useState } from "react";
import './prompt_view.css'

function PromptView({ setUserChat, setChats }) {

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
        const response = await fetch("http://localhost:8000/api/v1/response", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ type: 'user', prompt: userInput })
        })

        const data = await response.json()

        setChats(p => [...p, {
            type : 'ai',
            chat : data.result
        }])
    }

    return (
        <main className="promptmain">
            <div className="promptsub">
                <input onChange={updateUserInput} onKeyDown={sendUserInput} value={userInput} type="text" placeholder="Enter Prompt" className="promptinput" />
            </div>
        </main>
    )
}

export default PromptView;