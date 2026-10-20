


export function RadioButton({
    label, radioGroup, currentVal, onChange }:
    {label: string, radioGroup:string, currentVal: string, onChange: (value: string) => void}) {

    let labelText

    if (label === "") { labelText = "checkbox" } else { labelText = label }

    const checked = currentVal === label


    return(
        <div className="button-wrap"> 
            <label className="toggle-button-wrap">
                <input
                className="toggle-button"
                type="radio"
                name={radioGroup}
                checked={checked}
                value={label}
                onChange={(event) => {
                    onChange(event.target.value)}}>

                </input>
                <span className="toggle-button-content">{labelText}</span>
            </label>
        </div>
    )
}