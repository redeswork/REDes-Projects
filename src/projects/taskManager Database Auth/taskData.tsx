


export type taskDataType = {
    id: number,
    order: number,
    title: string,
    complete: boolean
}


export const taskData: taskDataType[] = [

    {
        id: 0,
        order: 1,
        title: "Study",
        complete: false
    },
    {
        id: 1,
        order: 2,
        title: "Tidy",
        complete: true
    },
    {
        id: 2,
        order: 3,
        title: "Eat",
        complete: false
    },

]