"use client"

import React from "react"
import './userchat.css'

function UserChatComponent({id, chat}) {

    console.log(id)

    return (
        <main className="userchatmain">
            <div className="userchatsub">
                <p >
                    {chat}
                </p>
            </div>
        </main>
    )
}

export default UserChatComponent;