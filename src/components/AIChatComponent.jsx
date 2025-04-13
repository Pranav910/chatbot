'use client'

import React, { useEffect, useRef, useState } from "react"
import ReactMarkdown from 'react-markdown'
import remarkGfm from "remark-gfm"
import rehypeHighlight from "rehype-highlight"
import 'highlight.js/styles/github-dark.css';
import './aichat.css'

function AIChatComponent({ chat }) {

    const [aiChat, setAiChat] = useState("")
    const ref = useRef(null)

    useEffect(() => {
        const words = chat.split(" ")

        const timeouts = []

        words.forEach((word, index) => {
            const timeout = setTimeout(() => {
                setAiChat(p => p + " " + word)
            }, index * 30);

            timeouts.push(timeout)
        })

        return () => {
            timeouts.forEach((t) => clearTimeout(t))
        }
    }, [])

    useEffect(() => {
        if (ref.current) {
            ref.current.scrollIntoView()
        }
    }, [aiChat])

    return (
        <main className="aichatmain markdown-renderer prose prose-invert max-w-none markdown-body">
            <ReactMarkdown
                children={aiChat}
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
            />
            <div ref={ref} />
        </main>
    )
}

export default AIChatComponent;