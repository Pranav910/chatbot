'use client'

import React, { useState, useEffect, useRef } from "react";
import PromptView from "@/components/PromptView.jsx"
import UserChatComponent from "@/components/UserChatComponent";
import AIChatComponent from "@/components/AIChatComponent";
import './page.css'
import Image from "next/image";
import loading from '../../assets/loading.gif'

export default function Home() {

  const [chats, setChats] = useState([
    {
      'type': 'ai', 'chat': `## Hello!, Sir
  How can I assist you today?`}
  ])
  const [loadingState, setLoadingState] = useState(false)
  const loadingRef = useRef(null)

  function setUserChat(userChat) {
    setChats(p => [...p, {
      type: 'user',
      chat: userChat,
    }])

  }

  useEffect(() => {

    if (loadingState == true) {
      loadingRef.current.style.marginBottom = "60px"
      loadingRef.current.scrollIntoView()
    }
      
  }, [loadingState])

  return (
    <main className="relative h-screen w-full">

      <div className="chats">

        {
          chats.map((chat, index) => {
            if (chat.type == 'user')
              return (
                <div className="humanchat" key={index}>
                  <UserChatComponent chat={chat.chat} />
                </div>
              )
            else if (chat.type == 'ai')
              return (
                <div key={index} className="aichat">
                  <AIChatComponent chat={chat.chat} loadingState={loadingState} />
                </div>
              )
          })
        }

        {
          loadingState ?
            <div className="aichat loading" ref={loadingRef}>
              <Image width={50} height={50} alt="loading" src={loading} />
            </div> :
            null
        }

      </div>

      <div className="promptview">
        <PromptView setUserChat={setUserChat} setChats={setChats} setLoadingState={setLoadingState} />
      </div>
    </main>
  );
}
