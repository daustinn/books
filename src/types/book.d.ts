export interface BookApi {
  library?: LibraryEntity[] | null
}
export interface LibraryEntity {
  book: Book
}
export interface Book {
  title: string
  pages: number
  genre: string
  cover: string
  synopsis: string
  year: number
  ISBN: string
  author: Author
}
export interface Author {
  name: string
  otherBooks?: Array<string | null> | null
}
