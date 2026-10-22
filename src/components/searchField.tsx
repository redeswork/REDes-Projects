


export function SearchField({search, updateSearch}: {search: string, updateSearch: (value: string) => void}) {
    

    return (
        <div>
                <input
                className="search-input"
                name="search-field"
                type="search"
                placeholder="Search"
                value={search}
                onChange={(event) => updateSearch(event.target.value)}
                ></input>

        </div>
    )
}
