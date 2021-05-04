import { MouseEventHandler } from "react";

function HomeworkBaseButton(props: { child: JSX.Element}) {
    type NewType = MouseEventHandler;

    const baseButtonOnClick: NewType = (e) => {
        e.stopPropagation();
    }
    return (
        <div onClick={e => baseButtonOnClick(e)}>
            {props.child}
        </div>
    )
}

export default HomeworkBaseButton;