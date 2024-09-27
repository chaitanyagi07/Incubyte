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
});
