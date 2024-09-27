import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { getModelToken } from '@nestjs/mongoose';
import { Book } from '../books/schema/book.schema';
import { User } from '../users/schema/user.schema';
import { Model } from 'mongoose';

describe('BooksService', () => {
  let service: BooksService;
  let bookModel: Model<Book>;
  let userModel: Model<User>;

  
  const mockBookModel = jest.fn().mockImplementation(() => ({
    save: jest.fn().mockResolvedValue({
      title: 'Test Book',
      author: 'Test Author',
      count: 5,
      isAvailable: true,
    }),
  }));

  const mockUserModel = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: getModelToken(Book.name),
          useValue: mockBookModel,
        },
        {
          provide: getModelToken(User.name),
          useValue: mockUserModel, 
        },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
    bookModel = module.get<Model<Book>>(getModelToken(Book.name));
    userModel = module.get<Model<User>>(getModelToken(User.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('addBook', () => {
    it('should create and save a new book', async () => {
      const title = 'Test Book';
      const author = 'Test Author';
      const count = 5;

      const result = await service.addBook(title, author, count);

  
      expect(mockBookModel).toHaveBeenCalledWith({
        title,
        author,
        count,
        isAvailable: true,
      }); 

      expect(result).toEqual({
        title: 'Test Book',
        author: 'Test Author',
        count: 5,
        isAvailable: true,
      });
    });
  });
});
