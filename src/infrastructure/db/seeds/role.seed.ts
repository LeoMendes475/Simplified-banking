import { DataSource } from 'typeorm';
import { RoleEntity } from '../../../domain/entities/role.entity';
import { RoleEnum } from '../../../application/enum/role.enum';

export const seedRoles = async (dataSource: DataSource) => {
  const roleRepository = dataSource.getRepository(RoleEntity);

  const roles = [{ name: RoleEnum.ADMIN }, { name: RoleEnum.COSTUMER }];

  for (const roleData of roles) {
    const exists = await roleRepository.findOneBy({ name: roleData.name });

    if (!exists) {
      const role = roleRepository.create(roleData);
      await roleRepository.save(role);
      console.log(`Seed: Role ${roleData.name} criada com sucesso.`);
    }
  }
};
