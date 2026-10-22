import { createBrowserRouter } from 'react-router'

import BookSearch from './projects/bookSearch/bookSearch'
import HomePage from './homePage'
import TaskList from './projects/taskManager Database Auth/taskManagerApp'

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
    }
])


export const projects = [
    { name: "Books", path: "/books"},
    { name: "Tasks", path: "/tasks"},
]