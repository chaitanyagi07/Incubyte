import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'; 
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { User, UserSchema } from 'src/users/schema/user.schema';
import { Book, BookSchema } from './schema/book.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Book.name, schema: BookSchema },{name:User.name,schema:UserSchema}])  // Register Book schema
  ],
  controllers: [BooksController],
  providers: [BooksService],
  exports: [BooksService],  
})
export class BooksModule {}
