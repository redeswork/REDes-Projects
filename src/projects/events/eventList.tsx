import { events } from "./sampleEvents"
import { EventItem } from "./eventItem"

export function EventList() {


    return (

        <div className="cards">
            {events.map((event) => (
                <EventItem
                key={event.id}
                name={event.name}
                category={event.category}
                date={event.date}
                venue={event.venue}
                artUrl={event.artUrl}/>
            ))}
        </div>
    )
}