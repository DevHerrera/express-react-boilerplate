import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Contact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  photoUrl: string;

  @Column()
  fullName: string;

  @Column()
  phone: string;

  @Column({ nullable: true })
  email: string;
}
