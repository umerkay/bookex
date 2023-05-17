import React from 'react'
import "./FillerText.scss";

export default function FillerText({large}) {
    return (
        <span className={"filler" + (large ? " large" : "")}>
            <span></span>
        </span>
    )
}
