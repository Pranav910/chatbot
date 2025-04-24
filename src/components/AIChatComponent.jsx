'use client'

import React, { useEffect, useRef, useState, useMemo } from "react"
import Markdown from 'react-markdown'
import remarkGfm from "remark-gfm"
import rehypeHighlight from "rehype-highlight"
import 'highlight.js/styles/github-dark.css';
import './aichat.css'
import Copy from "./Copy"

function AIChatComponent({ chat }) {

    const [aiChat, setAiChat] = useState("")
    const ref = useRef(null)
    const codeRef = useRef(null)

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

    function copyCode(code) {
        codeRef.current = code
        navigator.clipboard.writeText(codeRef.current.innerText)
    }

    const markdownComponents = useMemo(() => ({
        code({ node, inline, className = "blog-code", children, ...props }) {
            const match = /language-(\w+)/.exec(className || '')
            return !inline && match ? (
                <code className={className} {...props} ref={codeRef}>
                    <Copy copyCode={copyCode}/>
                    {children}
                </code>
            ) : (
                <code className={className} {...props}>
                    {children}
                </code>
            )
        }
    }), [])


    return (
        <main className="aichatmain markdown-renderer prose prose-invert max-w-none markdown-body">
            <Markdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
                components={markdownComponents}
            >{aiChat}</Markdown>
            <div ref={ref} />
        </main>
    )
}

export default AIChatComponent;