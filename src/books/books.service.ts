import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book, BookDocument } from '../books/schema/book.schema';  
import { User, UserDocument } from '../users/schema/user.schema';

@Injectable()
export class BooksService {
    constructor(
        @InjectModel(Book.name) private bookModel: Model<BookDocument>,  
        @InjectModel(User.name) private userModel:Model<UserDocument>
      ) {}

      async addBook(title: string, author: string, count: number = 1): Promise<Book> {
        const newBook = new this.bookModel({ title, author, count, isAvailable: count > 0 });
        return newBook.save();
      }

}
