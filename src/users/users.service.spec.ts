import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { User } from './schema/user.schema';
import { Book } from '../books/schema/book.schema';
import { Model } from 'mongoose';

describe('UsersService', () => {
  let usersService: UsersService;
  let userModel: Model<User>;
  let bookModel: Model<Book>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User.name),
          useValue: jest.fn().mockImplementation(() => ({
            save: jest.fn(),
          })),
        },
        {
          provide: getModelToken(Book.name),
          useValue: {},
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    userModel = module.get<Model<User>>(getModelToken(User.name));
    bookModel = module.get<Model<Book>>(getModelToken(Book.name));
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  describe('registerUser', () => {
    it('should create and save a new user', async () => {
      const username = 'testuser';
      const email = 'testuser@example.com';
      const password = 'password123';

      const mockUser = {
        username,
        email,
        password,
        borrowedBooks: [],
        save: jest.fn().mockResolvedValue({
          username,
          email,
          password,
          borrowedBooks: [],
        }),
      };
      (userModel as any).mockImplementation(() => mockUser);

      const result = await usersService.registerUser(username, email, password);

      expect(mockUser.save).toHaveBeenCalled();
    });
  });
     
});
