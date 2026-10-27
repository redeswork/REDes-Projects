

export type eventDataType = {

    name: string,
    description: string,
    category: string,

    artUrl: string,

    venue: string,
    date: string,
    id: number

}

export const events: eventDataType[] = [
    {
        name: "Choir of Man",
        description: "Dudes, beers, music",

        category: "Musical",

        artUrl: "https://raw.githubusercontent.com/redeswork/REDes-Assets/refs/heads/main/placeholder.png",

        venue: "Arts at the Marble Arch",
        date: "2026-11-24",
        id: 244
    },
    {
        name: "Traitors Live",
        description: "The deceptive live experience",

        category: "Live Experience",

        artUrl: "https://raw.githubusercontent.com/redeswork/REDes-Assets/refs/heads/main/placeholder.png",

        venue: "Arts at the Marble Arch",
        date: "2026-12-08",
        id: 245

    }
]