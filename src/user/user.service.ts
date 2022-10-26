import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartService } from 'src/cart/cart.service';
import { Cart } from 'src/cart/entities/cart.entity';
import { Repository } from 'typeorm';
import { AuthHelper } from './auth.helper';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @Inject(AuthHelper)
    private readonly helper: AuthHelper,

    @Inject(forwardRef(() => CartService))
    private cartService: CartService,
  ) {}

  private logger = new Logger('UserService');

  async create(createUserDto: CreateUserDto) {
    const user: User = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });
    if (user) {
      throw new HttpException(
        'This user already exists in the system',
        HttpStatus.CONFLICT,
      );
    }

    createUserDto.password = this.helper.encodePassword(createUserDto.password);

    const cart = new Cart();
    this.cartService.createWithoutDto(cart);
    createUserDto.cart = cart;
    return this.userRepository.save(createUserDto);
  }

  findAll() {
    return this.userRepository.findAndCount({});
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new HttpException('Not found user', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new HttpException('Not found user', HttpStatus.NOT_FOUND);
    }
    await this.userRepository.update({ id }, updateUserDto);
    return `update successfully`;
  }

  async remove(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new HttpException('Not found user', HttpStatus.NOT_FOUND);
    }
    await this.userRepository.delete(id);
    return `delete successfully`;
  }
}
