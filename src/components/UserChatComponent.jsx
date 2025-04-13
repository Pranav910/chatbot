"use client"

import React from "react"
import './userchat.css'

function UserChatComponent({chat}) {

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