
import '../../style.css'

import { BookList } from './bookList'
import type { BookType, openBookType } from './bookData'

import { useState, useEffect } from 'react'
import { SearchField } from '../../components/searchField'

import { useNavigate } from 'react-router'


export default function App() {

    const navigate = useNavigate()

    const [books, setBooks] = useState<BookType[]>([])

    const [loading, isLoading] = useState(true)

    const [search, updateSearch] = useState("")

    const [resultAmount, setResultAmount] = useState<number | 0>(0)

    const [booksInView, setBooksInView] = useState(0)

    const maxBooks = 36;

    const booksPerView = 9;
    
    useEffect(() => {

        async function fetchBooks() {

            const url = `https://openlibrary.org/search.json?q=${search || "book"}${search ? "" : "&sort=random"}&limit=${maxBooks}`

            isLoading(true)

            try {

                console.log("Search changed:", search)
                console.log("Search state:", search)
                console.log("Fetch URL:", url)
                const doFetch = await fetch(url)

                if (!doFetch.ok) {
                    throw new Error ("Fetch Error")
                }

                const result = await doFetch.json()

                const mappedBooks: BookType[] = result.docs.map(
                    (book: openBookType) => ({
                        key: book.key,
                        title: book.title,
                        author: book.author_name?.join(', ') ?? "Unknown Author",
                        published: book.first_publish_year,
                        coverUrl: book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : null,
                        bookUrl: book.key ? `https://openlibrary.org${book.key}` : null
                    })
                )

                console.log(mappedBooks)
                console.log(result.docs)
                setBooks(mappedBooks)
                setResultAmount(result.numFound)

            } catch (error) {

                console.error("Error fetching books:", error)
            
            } finally {

                isLoading(false)

            }

        }

        fetchBooks()

    }, [search])


    return (
        
        <section className="section">

            <div className="wrapper">

                <button onClick={() => navigate("/")}>Back</button>

                <h1 className='section-heading'>RE Design Book Search</h1>

                <SearchField search={search} updateSearch={updateSearch} submittable={true}/>

                <div className='content-card'>

                    <div className='content vertical'>


                    {loading ? (
                        
                        <p>Loading Books...</p>
                        
                    ) : (
                        
                        <BookList resultsAmount={resultAmount} books={books} maxBooks={maxBooks} booksPerView={booksPerView} booksInView={booksInView} setBooksInView={setBooksInView}/>
                        
                    )}

                    
                    </div>
                </div>
            </div>
        </section>
    )
}
