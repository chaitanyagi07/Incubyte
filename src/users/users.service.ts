import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../users/schema/user.schema';
import { Book, BookDocument } from '../books/schema/book.schema';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        @InjectModel(Book.name) private bookModel: Model<BookDocument>,
      ) {}

    async registerUser(username: string, email: string, password: string): Promise<User> {
        const newUser = new this.userModel({ username, email, password, borrowedBooks: [] });
        return await newUser.save(); 
    }
    
    
    async borrowBook(userId: string, bookId: string): Promise<User> {
        const user = await this.userModel.findById(userId).populate('borrowedBooks');
        const book = await this.bookModel.findById(bookId);
    
        if (book.count <= 0) {
            throw new Error('No copies available for this book');
        }
    
        // Update book count and availability
        book.count -= 1;
        if (book.count === 0) {
            book.isAvailable = false;
        }
        await book.save();
    
        // Add the book to the user's borrowedBooks list
        user.borrowedBooks.push(book);
        await user.save(); // Ensure you await the save operation here
    
        return user; // Make sure to return the updated user instance
    }
}
