import type { BookType } from "./bookData";
import { BookItem } from "./bookItem";



export function BookList(
    { search, resultsAmount, books, maxBooks }:
    { search: string, resultsAmount: number | 0, books: BookType[], maxBooks: number }) {


    const searchValue = search.toLowerCase()

    const filteredBooks = books.filter((book) => (
        book.title.toLowerCase().includes(searchValue) ||
        book.author.toLowerCase().includes(searchValue) ||
        String(book.published).toLowerCase().includes(searchValue)
    ))


    return (


        <div className="content-card">
            <div className="content vertical">

                <p>Results Found: {Math.min(resultsAmount, maxBooks)}</p>
                <div className="cards columns">

                    {filteredBooks.slice(0, maxBooks).map((book) => (
                        <BookItem
                        title={book.title}
                        author={book.author}
                        key={book.key}
                        published={book.published}
                        coverUrl={book.coverUrl}/>
                    ))}

                </div>
            </div>
        </div>
    )
}