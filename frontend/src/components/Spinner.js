import React from 'react'
import Loader from "react-spinners/MoonLoader";

export default function Spinner({ loading, children, forceChildren = false }) {
    if (forceChildren) {
        return (
            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                {children}
                <div style={{width: "min-content", height: "min-conent", display: "flex"}}>
                    {
                        loading ?
                            <Loader
                                color={"rgb(0, 163, 136)"}
                                loading={loading}
                                size={30}
                                aria-label="Loading Spinner"
                                data-testid="loader"
                            // speedMultiplier={3}
                            /> : null
                    }
                </div>
            </div>
        )
    } else {
        <div style={{ display: "flex", gap: "1rem" }}>
            {
                loading ?
                    <Loader
                        color={"rgb(0, 163, 136)"}
                        loading={loading}
                        size={50}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                        speedMultiplier={3}

                    /> : children
            }
        </div>
    }

}
