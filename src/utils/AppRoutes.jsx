import React from 'react'
import BookDashboard from '../books/BookDashboard'
import AddBook from '../books/AddBook'
import EditBook from '../books/EditBook'
import AddingAuthor from '../authors/AddingAuthor'
import AuthorDashboard from '../authors/AuthorDashboard'
import EditingAuthor from '../authors/EditingAuthor'
import { Navigate } from 'react-router-dom'

let AppRoutes=[
    {
        path:'/',
        element:<BookDashboard/>,
        exact:true
    },
    {
        path:'/addBook',
        element:<AddBook/>,
        exact:true
    },
    {
        path:'/editbook/:id',
        element:<EditBook/>,
        exact:true
    },
    {
        path:'/authorDashboard',
        element:<AuthorDashboard/>,
        exact:true
    },
    {
        path:'/addAuthor',
        element:<AddingAuthor/>,
        exact:true
    },
    {
        path:'/editAuthor/:id',
        element:<EditingAuthor/>,
        exact:true
    },
    {
        path:'*',
        element:<Navigate to="/"/>,
        exact:false
    },
]

export default AppRoutes