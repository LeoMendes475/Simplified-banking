import { CategoryEntity } from '../../../domain/entities/category.entity';
import { ICategoryRepository } from '../../../domain/repositories/i-category.repository';
import { ICreateCategoryDTO } from '../../dto/category.dto';

export class CreateCategoryUseCase {
  constructor(private categoryRepository: ICategoryRepository) {}

  async execute(data: ICreateCategoryDTO): Promise<CategoryEntity> {
    return await this.categoryRepository.create(data);
  }
}
