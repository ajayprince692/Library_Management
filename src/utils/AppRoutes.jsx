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
        Element:<BookDashboard/>,
        exact:true
    },
    {
        path:'/addBook',
        Element:<AddBook/>,
        exact:true
    },
    {
        path:'/editbook/:id',
        Element:<EditBook/>,
        exact:true
    },
    {
        path:'/authorDashboard',
        Element:<AuthorDashboard/>,
        exact:true
    },
    {
        path:'/addAuthor',
        Element:<AddingAuthor/>,
        exact:true
    },
    {
        path:'/editAuthor/:id',
        Element:<EditingAuthor/>,
        exact:true
    },
    {
        path:'*',
        Element:<Navigate to="/"/>,
        exact:false
    },
]

export default AppRoutes