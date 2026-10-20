


export function ToggleButton({label, toggleFilter}: {label: string, toggleFilter: (filter: string) => void}) {

    let labelText

    if (label === "") { labelText = "checkbox" } else { labelText = label }

    // let isChecked

    // if (currentCat === value) {
    //     isChecked = true
    // }

    return(
        <div> 
            <label className="toggle-button-wrap">
                <input
                className="toggle-button"
                type="checkbox"
                name=""
                value={label}
                // checked={false}
                onChange={(event) => toggleFilter(event.target.value)}></input>
                <span className="toggle-button-content">{labelText}</span>
            </label>
        </div>
    )
}