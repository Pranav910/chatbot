'use client'

import React, { useState, useEffect } from "react";
import PromptView from "@/components/PromptView.jsx"
import UserChatComponent from "@/components/UserChatComponent";
import AIChatComponent from "@/components/AIChatComponent";
import './page.css'

export default function Home() {

  const [chats, setChats] = useState([])

  function setUserChat(userChat) {
    setChats(p => [...p, {
      type: 'user',
      chat: userChat
    }])
  }


  return (
    <main className="relative h-screen w-full">

      <div className="chats">

        {
          chats.map((chat, index) => {
            if (chat.type == 'user')
              return (
                <div className="humanchat" key={index}>
                  <UserChatComponent id={'human'} chat={chat.chat} />
                </div>
              )
            else if (chat.type == 'ai')
              return (
                <div key={index} className="aichat">
                  <AIChatComponent id={'ai'} chat={chat.chat} />
                </div>
              )
          })
        }

      </div>

      <div className="promptview">
        <PromptView setUserChat={setUserChat} setChats={setChats} />
      </div>
    </main>
  );
}
