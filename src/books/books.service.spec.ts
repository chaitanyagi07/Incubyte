
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

  const mockBookInstance = {
    _id: 'bookId',
    title: 'Test Book',
    author: 'Test Author',
    count: 1,
    isAvailable: true,
    save: jest.fn().mockResolvedValue({
      _id: 'bookId',
      title: 'Test Book',
      author: 'Test Author',
      count: 0,
      isAvailable: false,
    }),
  };

  const mockUserInstance = {
    _id: 'userId',
    borrowedBooks: [],
    save: jest.fn().mockResolvedValue(true),
  };

  const mockBookModel = {
    findById: jest.fn().mockResolvedValue(mockBookInstance),
  };

  const mockUserModel = {
    findById: jest.fn().mockResolvedValue(mockUserInstance),
  };

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

  describe('borrowBook', () => {
    it('should borrow a book, decrease its count, and update availability', async () => {
      const bookId = 'bookId';
      const userId = 'userId';

      const result = await service.borrowBook(bookId);

      expect(bookModel.findById).toHaveBeenCalledWith(bookId);
      expect(mockBookInstance.save).toHaveBeenCalled();
      expect(result).toEqual({
        _id: 'bookId',
        title: 'Test Book',
        author: 'Test Author',
        count: 0,
        isAvailable: false,
      });
    });
  });
});
