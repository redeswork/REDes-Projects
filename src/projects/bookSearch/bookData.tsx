


export type BookType = {

    key: string,
    title: string,
    author: string,
    published: number,
    coverUrl: string | null,
    authorKey: string,
    bookUrl:string
}

export type openBookType = {

    key: string,
    title: string,
    author_name: string[],
    first_publish_year: number,
    cover_i: string,
    author_key: string

}