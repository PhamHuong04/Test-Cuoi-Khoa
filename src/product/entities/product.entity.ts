import { Cart } from 'src/cart/entities/cart.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  quantily: string;

  @Column()
  price: number;

  @ManyToOne(() => User, (user) => user.products)
  user: User;

  @ManyToMany(() => Cart)
  @JoinTable()
  categories: Cart[];
}
