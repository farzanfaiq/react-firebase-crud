import React from "react";

export default function MainLayout(props){
    return (
        <div className="container mt-2">
            {props.children}
        </div>
    )
}