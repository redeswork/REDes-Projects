
import { useState } from 'react'

export function SearchField({
    search,
    updateSearch,
    submittable
}: {
    search: string,
    updateSearch: (value: string) => void,
    submittable: boolean
}) {

    const [inputValue, setInputValue] = useState(search)

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        updateSearch(inputValue)
    }

    return (
        <div>
            <form onSubmit={submittable ? handleSubmit : (event) => event.preventDefault()}>

                <input
                    className="search-input"
                    name="search-field"
                    type="search"
                    placeholder="Search"
                    value={inputValue}
                    onChange={(event) => {
                        setInputValue(event.target.value)

                        if (!submittable) {
                            updateSearch(event.target.value)
                        }
                    }}
                />

                {submittable && (
                    <button type="submit">
                        Search
                    </button>
                )}

            </form>
        </div>
    )
}
