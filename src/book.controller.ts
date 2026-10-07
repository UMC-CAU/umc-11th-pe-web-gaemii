// src/book.controller.ts
import { Body, Controller, Get, Param, ParseIntPipe, Post, } from '@nestjs/common';
import { BookService } from './book.service.js';
import { BookResponseDto } from './book-response.dto.js';
import { CreateBookDto } from './create-book.dto.js'; 


@Controller('books') // 이 컨트롤러의 기본 주소: /books
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get() // GET /books 요청이 오면 실행
  async getBooks(): Promise<BookResponseDto[]> {
    return await this.bookService.getAllBooks();
  }
  @Post()
  async createBook(@Body() dto: CreateBookDto): Promise<BookResponseDto> {
    return await this.bookService.createBook(dto);
  }

  @Get('category/:categoryId')
  async getBooksByCategory(
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ): Promise<any> {
    return await this.bookService.getBooksByCategory(categoryId);
  }
}