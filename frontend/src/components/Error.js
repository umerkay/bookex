import React from 'react'
import { FaExclamationTriangle } from 'react-icons/fa'

export default function Error({ children }) {
    return (
        <span style={{ display: "flex", gap: "1rem", alignItems: "center" }} className="text-danger">
            <FaExclamationTriangle></FaExclamationTriangle>
            {children}
        </span>
    )
}
