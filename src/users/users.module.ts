import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { BooksModule } from '../books/books.module';  
import { BooksService } from 'src/books/books.service';
import { User, UserSchema } from './schema/user.schema';
import { Book, BookSchema } from 'src/books/schema/book.schema';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema },{name:Book.name, schema:BookSchema}]),
    BooksModule,
  ],
  controllers: [UsersController],
  providers: [UsersService,BooksService]
})
export class UsersModule {}