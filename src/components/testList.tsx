import { useEffect } from "react"

type testListProps = {
    count: number,
    onLengthChange: (length: number) => void,
    query: string
}

export function TestList({ count, onLengthChange, query }: testListProps) {

    const data = [
    
        { id: 24, name: "John", isInterred: true },
        { id: 65, name: "Matthew", isInterred: false },
        { id: 98, name: "Mark", isInterred: false },
        { id: 0o7, name: "Luke", isInterred: true },

    ]

    
    useEffect(() => {
        onLengthChange(data.length);
    }, [data.length, onLengthChange])


    const filteredData = data.filter((item) => {
        const search = query.trim().toLowerCase();

        let interredText

        if (item.isInterred) {
            interredText = "Yes"    
        } else {
            interredText = "No"
        }

        return (
            String(item.id).includes(search) ||
            item.name.trim().toLowerCase().includes(search) ||
            String(item.isInterred).includes(search)
        );
    });

    const visibleItems = filteredData.slice(0, count + 1)

    const testListItems = visibleItems.map((items) => {

        
        let interredText

        if (items.isInterred) {
            interredText = "Yes"    
        } else {
            interredText = "No"
        }
        
        return (

        <li className="search-list-row" key={items.id}>
            <div className="content">
                <p>ID: {items.id}</p>
                <p>Name: {items.name}</p>
                <p>Currently Interred?: {interredText}</p>
            </div>
        </li>

        )

    })

    return (
        <ul
        className="search-list"
        style={{
                listStyle: "none",
                padding: 0,
                margin: "0px"
        }}>
            
            {testListItems}
        </ul>
    )
}