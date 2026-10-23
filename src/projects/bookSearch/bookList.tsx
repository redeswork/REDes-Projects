import type { BookType } from "./bookData";
import { BookItem } from "./bookItem";
import { IconButton } from "../../components/iconButton";



export function BookList(
    { resultsAmount, books, maxBooks, booksPerView, booksInView, setBooksInView }:
    { resultsAmount: number | 0, books: BookType[], maxBooks: number, booksPerView: number, booksInView: number, setBooksInView: (booksInView: number) => void }) {


    // const searchValue = search.toLowerCase()

    // const filteredBooks = books.filter((book) => (
    //     book.title.toLowerCase().includes(searchValue) ||
    //     book.author.toLowerCase().includes(searchValue) ||
    //     String(book.published).toLowerCase().includes(searchValue)
    // ))

    
    function incrementView(direction: string) {

        if (direction === "up") {
            setBooksInView(
                Math.min(
                    booksInView + booksPerView,
                    Math.max(0, books.length - booksPerView)
                )
            )
        }

        if (direction === "down") {
            setBooksInView(
                Math.max(booksInView - booksPerView, 0)
            )
        }
    }

    return (


            <div className="content vertical">

                <p>Results Found: {Math.min(resultsAmount, maxBooks)}</p>
                <div className="content">
                    <IconButton iconButtonData={{handleClick: () => incrementView("down")}}/>
                    <p>{booksInView} - {booksInView + booksPerView}</p>
                    <IconButton iconButtonData={{direction: "right", handleClick: () => incrementView("up")}}/>
                </div>

                <div className="cards columns">

                    {books.slice(booksInView, (booksInView + booksPerView)).map((book) => (
                        <BookItem
                        title={book.title}
                        author={book.author}
                        key={book.key}
                        published={book.published}
                        coverUrl={book.coverUrl}
                        bookUrl={book.bookUrl}/>
                    ))}

                </div>
            </div>
    )
}