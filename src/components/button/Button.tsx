//atributos do bottao do html
import { ButtonHTMLAttributes } from "react"

import '../button/buttonStyles.scss'

//atribui o tipo ButtonHTMLAttributes ao tipo ButtonPRops
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;


export function Button(props: ButtonProps) {
    return (
        //props recebe todos parametros que um botão pode receber
        //spread operator
        <button className="button" {...props} />
    )
}