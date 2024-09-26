import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            registerUser: jest.fn(), 
          },
        },
      ],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });

  describe('registerUser', () => {
    it('should call UsersService.registerUser with the correct parameters', async () => {
      const username = 'testuser';
      const email = 'testuser@example.com';
      const password = 'password123';
  
      const result = { id: '1', username, email, password, borrowedBooks: [] };
      jest.spyOn(usersService, 'registerUser').mockResolvedValue(result as any);  // Cast to 'any' to bypass strict typing for now
  
      const response = await usersController.registerUser(username, email, password);
  
      expect(usersService.registerUser).toHaveBeenCalledWith(username, email, password);
      expect(response).toEqual(result);
    });
  });
  
});
