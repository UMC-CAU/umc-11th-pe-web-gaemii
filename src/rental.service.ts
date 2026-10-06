import { Injectable, NotFoundException } from '@nestjs/common';
import { RentalRepository } from './rental.repository.js';


@Injectable()
export class RentalService {
  constructor(private readonly rentalRepository: RentalRepository) {}

  async createRental(body: Record<string, any>): Promise<string> {
    await this.rentalRepository.create(body);
    return '도서 대여가 완료되었습니다!';
  }
  async returnRental(rentalId: number): Promise<string> {
    const result = await this.rentalRepository.returnRental(rentalId);
    if (result.affectedRows === 0) {
      throw new NotFoundException('반납할 대여 기록이 없거나 이미 반납된 도서입니다.');
    }
    return '도서 반납이 완료되었습니다!';
  }
}