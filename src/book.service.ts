// src/book.service.ts
import { Injectable, NotFoundException } from '@nestjs/common'; 
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './book.entity.js';
import { Category } from './category.entity.js';                
import { BookResponseDto } from './book-response.dto.js';
import { CreateBookDto } from './create-book.dto.js';           
import { BookRepository } from './book.repository.js';

@Injectable()
export class BookService {
  constructor(
    private readonly rawBookRepository: BookRepository,

    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,

    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async getAllBooks(): Promise<BookResponseDto[]> {
    const books = await this.bookRepository.find({
      relations: { category: true },
      order: { bookId: 'DESC' },
    });
    return books.map((book) => BookResponseDto.from(book));
  }

  async createBook(dto: CreateBookDto): Promise<BookResponseDto> {
    const category = await this.categoryRepository.findOneBy({
      categoryId: dto.categoryId,
    });
    if (!category) {
      throw new NotFoundException('존재하지 않는 카테고리입니다.');
    }

    const book = this.bookRepository.create({
      category,
      title: dto.title,
      description: dto.description ?? null,
    });

    const savedBook = await this.bookRepository.save(book);

    return BookResponseDto.from(savedBook);
  }
  async getBooksByCategory(categoryId: number): Promise<any> {
    return await this.rawBookRepository.findByCategoryId(categoryId);
  }
}