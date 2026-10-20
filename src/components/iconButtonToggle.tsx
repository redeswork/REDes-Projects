
type iconButtonToggleData = {

    iconImg?: string,

    direction?: string,

    width?: number,
    height?: number,

    isInteractable?: boolean,
    isEnabled?: boolean

    handleClick?: () => void,

}

type iconButtonToggleProps = {
    iconButtonToggleData?: iconButtonToggleData
}

export function IconButtonToggle({ iconButtonToggleData = {}}: iconButtonToggleProps,) {

    
    const defaults = {
        iconImg: "https://raw.githubusercontent.com/redeswork/REDes-Assets/29672528e6aa6fefd3452fed429ab677ef53de15/icons/arrow-left-dark%20(%231f1f1f).svg",
        width: 32,
        height: 32,
        isInteractable: true,
        isEnabled: false,
        direction: "left",
        handleClick: () => {},
    }
    
    const data = {
        ...defaults,
        ...iconButtonToggleData,
    }
    
    
    // const [isEnabled, setIsEnabled] = useState(data.isEnabled)


    function handleToggle() {

        // setIsEnabled(!isEnabled)
        data.handleClick()
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
        className="icon-button solid"
        onClick={handleToggle}
        style={{
            width: data.width,
            height: data.height,
            cursor: cursorMode,
            rotate: `${rotation}deg`,
            backgroundColor: data.isEnabled ? "#1f1f1f" : "#1f1f1f00"
        }}>

            <img
            src={data.iconImg}
            style={{
                width: "100%",
                height: "100%",
                opacity: data.isEnabled ? 1 : 0        
            }}></img>
        </div>
    )
}