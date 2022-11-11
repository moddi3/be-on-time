'use client'

import { signIn, signOut,  } from "next-auth/react"
import { Button, ButtonProps } from "./Button"


export type AuthButtonProps = {
    action: "signIn" | "signOut"
    children: React.ReactNode
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const ActionsMap = {
    'signIn': signIn,
    'signOut': signOut,
}

export const AuthButton: React.FC<AuthButtonProps> = ({ action, children, ...props}) => {
    const clickAction = ActionsMap[action];

    return (
        <Button click={clickAction} {...props}>
            {children}
        </Button>
    );
}