'use client'

import { useState } from "react"

export default function AssetsList() {
    const [click, setClick] = useState(false)
    const handleClick = () => {
        console.log("CLICK : ", click)
        setClick(!click)
    }
    return (
        <>
            <div>
                <h1>Clips List</h1>
                <button onClick={handleClick}>Click me!</button>
            </div>
            <div>
                <h1>Clips List</h1>
                <button onClick={handleClick}>Click me!</button>
            </div>
            <div>
                <h1>Clips List</h1>
                <button onClick={handleClick}>Click me!</button>
            </div>
            <div>
                <h1>Clips List</h1>
                <button onClick={handleClick}>Click me!</button>
            </div>
        </>
    )
}