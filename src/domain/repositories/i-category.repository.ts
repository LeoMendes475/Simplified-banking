import { ICreateCategoryDTO } from '../../application/dto/category.dto';
import { CategoryEntity } from '../entities/category.entity';

export interface ICategoryRepository {
  create(data: ICreateCategoryDTO): Promise<CategoryEntity>;
}
