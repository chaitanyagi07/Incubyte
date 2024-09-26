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
    
}
