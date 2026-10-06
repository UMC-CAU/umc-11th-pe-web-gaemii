// src/book.controller.ts
import { Body, Controller, Get, Param, ParseIntPipe, Post, } from '@nestjs/common';
import { BookService } from './book.service.js';

@Controller('books') // 이 컨트롤러의 기본 주소: /books
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get() // GET /books 요청이 오면 실행
  async getBooks(): Promise<any> {
    return await this.bookService.getAllBooks();
  }
  @Post()
  async createBook(@Body() body: Record<string, any>): Promise<string> {
    return await this.bookService.createBook(body);
  }

  @Get('category/:categoryId')
  async getBooksByCategory(
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ): Promise<any> {
    return await this.bookService.getBooksByCategory(categoryId);
  }
}