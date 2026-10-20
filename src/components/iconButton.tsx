

type iconButtonData = {

    variant?: string,
    iconImg?: string,

    direction?: string,

    width?: number,
    height?: number,

    isInteractable?: boolean,

    handleClick?: () => void,

}

type iconButtonProps = {
    iconButtonData?: iconButtonData
}

export function IconButton({ iconButtonData = {}}: iconButtonProps) {

    const defaults = {
        variant: "",
        iconImg: "https://raw.githubusercontent.com/redeswork/REDes-Assets/29672528e6aa6fefd3452fed429ab677ef53de15/icons/arrow-left-dark%20(%231f1f1f).svg",
        width: 32,
        height: 32,
        isInteractable: true,
        direction: "left",
        handleClick: () => {},
    }

    const data = {
        ...defaults,
        ...iconButtonData,
    }

    let setClass

    if (data.variant === "solid") {
        setClass = "solid"
    } else if (data.variant === "outline") {
        setClass = "outline"
    } else {
        setClass = ""
    }

    let cursorMode

    if (data.isInteractable) {
        cursorMode = "pointer"
    } else {
        cursorMode = "default"
    }

    let rotation

    if (data.direction === "up") {
        rotation = 90
    } else if (data.direction === "right") {
        rotation = 180
    } else if (data.direction === "down") {
        rotation = 270
    } else {
        rotation = 0
    }



    return (

        <div
        className={`icon-button ${setClass}`}
        onClick={data.handleClick}
        style={{
            width: data.width,
            height: data.height,
            cursor: cursorMode,
            rotate: `${rotation}deg`
        }}>

            <img
            src={data.iconImg}
            style={{
                width: "100%",
                height: "100%"        
            }}></img>
        </div>
    )
}