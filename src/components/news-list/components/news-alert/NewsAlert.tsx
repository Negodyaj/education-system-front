import React from "react";

const closeAlert = (e: React.MouseEvent) => {
    const currentElem = e.target as HTMLElement;
    currentElem.parentElement?.classList.toggle('alert-closed');
}

function NewsAlert(props: {text: string}) {
    return (
        <div className="alert">
            <span>{props.text}</span>
                <button onClick={(e) => closeAlert(e)} type="button" className="btn-close">X</button>
        </div>
    )
}

export default NewsAlert;