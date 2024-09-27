import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { BooksService } from './books.service';


@Controller('books')
export class BooksController {
    constructor(private readonly booksService: BooksService) {}
    
    @Post('add')
  async addBook(
    @Body('title') title: string,
    @Body('author') author: string,
    @Body('count') count: number
  ) {
    return this.booksService.addBook(title, author, count);
  }
  
  @Post('borrow/:id')
  async borrowBook(@Param('id') bookId: string) {
    return this.booksService.borrowBook(bookId);
  }
  
}
