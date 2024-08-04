import React from "react"
import { LogoutModal } from "../modal/LogoutModal.tsx"
import { LoginSessionExtend } from "../modal/LoginSessionExtend.tsx"

export const PopupDialog = () => {
    
    return (
        <div>
            <LogoutModal></LogoutModal>
            <LoginSessionExtend></LoginSessionExtend>
        </div>
    )
}