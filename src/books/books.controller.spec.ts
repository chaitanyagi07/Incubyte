import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';

describe('BooksController', () => {
  let controller: BooksController;
  let booksService: BooksService;

  const mockBooksService = {
    addBook: jest.fn((title: string, author: string, count: number) => {
      return { title, author, count, isAvailable: count > 0 };
    }),
    borrowBook: jest.fn((bookId: string) => {
      return {
        _id: bookId,
        title: 'Test Book',
        author: 'Test Author',
        count: 0,
        isAvailable: false,
      };
    }),
    returnBook: jest.fn((bookId: string) => {
      return {
        _id: bookId,
        title: 'Test Book',
        author: 'Test Author',
        count: 1,
        isAvailable: true,
      };
    }),
    getAvailableBooks: jest.fn(() => [
      { title: 'Available Book 1', author: 'Author 1', count: 5, isAvailable: true },
      { title: 'Available Book 2', author: 'Author 2', count: 2, isAvailable: true },
    ]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [
        {
          provide: BooksService,
          useValue: mockBooksService,
        },
      ],
    }).compile();

    controller = module.get<BooksController>(BooksController);
    booksService = module.get<BooksService>(BooksService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('addBook', () => {
    it('should add a book and return the result', async () => {
      const bookData = { title: 'Test Book', author: 'Test Author', count: 5 };
      const result = await controller.addBook(bookData.title, bookData.author, bookData.count);

      expect(booksService.addBook).toHaveBeenCalledWith(bookData.title, bookData.author, bookData.count);
      expect(result).toEqual({
        title: 'Test Book',
        author: 'Test Author',
        count: 5,
        isAvailable: true,
      });
    });
  });

  describe('borrowBook', () => {
    it('should borrow a book and return the updated book', async () => {
      const bookId = '12345';
      const result = await controller.borrowBook(bookId);

      expect(booksService.borrowBook).toHaveBeenCalledWith(bookId);
      expect(result).toEqual({
        _id: bookId,
        title: 'Test Book',
        author: 'Test Author',
        count: 0,
        isAvailable: false,
      });
    });
  });
  describe('returnBook', () => {
    it('should return a book and increase its count', async () => {
      const bookId = '12345';
      const result = await controller.returnBook(bookId);

      expect(booksService.returnBook).toHaveBeenCalledWith(bookId);
      expect(result).toEqual({
        _id: bookId,
        title: 'Test Book',
        author: 'Test Author',
        count: 1,
        isAvailable: true,
      });
    });
  });
  describe('getAvailableBooks', () => {
    it('should return a list of available books', async () => {
      const result = await controller.getAvailableBooks();

      expect(booksService.getAvailableBooks).toHaveBeenCalled();
      expect(result).toEqual([
        { title: 'Available Book 1', author: 'Author 1', count: 5, isAvailable: true },
        { title: 'Available Book 2', author: 'Author 2', count: 2, isAvailable: true },
      ]);
    });
  });
});

