import { createBrowserRouter } from 'react-router'

import BookSearch from './projects/bookSearch/bookSearch'
import HomePage from './homePage'
import TaskList from './projects/taskManager Database Auth/taskManagerApp'
import Events from './projects/events/eventApp'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />
    },
    {
        path: '/books',
        element: <BookSearch />
    },
    {
        path: '/tasks',
        element: <TaskList />
    },
    {
        path: '/events',
        element: <Events />
    }
])


export const projects = [
    { name: "Books", path: "/books"},
    { name: "Tasks", path: "/tasks"},
    { name: "Events", path: "/events"}
]