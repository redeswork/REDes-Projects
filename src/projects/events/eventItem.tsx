


export function EventItem(
    {name, date, category, venue, artUrl}:
    {name: string, date: string, category: string, venue: string, artUrl: string}
) {


    return (

        <div className="card no-corner" style={{gap: "0.5rem"}}>
            <h3>{name}</h3>
            <img src={artUrl}></img>
            <div className="content left-aligned">
                <p className="pill">{category}</p>
            </div>
            <p style={{fontSize: "var(--text-P)"}}>{venue}</p>
            <p style={{fontSize: "var(--text-P)"}}>{date}</p>
            <button>Book Now</button>
        </div>
    )
}