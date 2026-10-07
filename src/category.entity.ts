// src/category.entity.ts
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import type { Relation } from 'typeorm';
import { Book } from './book.entity.js';

@Entity('category') // 실제 테이블 이름
export class Category {
  @PrimaryGeneratedColumn({ name: 'category_id' })
  categoryId: number;

  @Column({ length: 50 })
  name: string;

  // 카테고리 1개 → 책 여러 권 (1:N)
  @OneToMany(() => Book, (book) => book.category)
  books: Relation<Book[]>;
}