import { ConflictException, Injectable, NotFoundException, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { hash } from 'bcrypt';
import { formatResponse } from 'src/common/utils/response.util';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    await this.ensureEmailDoesNotExist(createUserDto.email);

    const hashedPassword = await hash(createUserDto.password, 12);
    const newUser = await this.prisma.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
      },
    });

    this.logger.log(`User with email ${createUserDto.email} created successfully`);
    return formatResponse('User created successfully', newUser);
  }

  async findAll() {
    const users = await this.prisma.user.findMany({
      where: { deletedAt: null },
      include: this.getUserRelations(),
    });

    this.logger.log('Retrieved all users');
    return formatResponse('Users retrieved successfully', users);
  }

  async findOne(id: string) {
    const user = await this.findUserById(id);

    this.logger.log(`User with ID ${id} retrieved successfully`);
    return formatResponse('User retrieved successfully', user);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findUserById(id);

    if (updateUserDto.email && updateUserDto.email !== user.email) {
      await this.ensureEmailDoesNotExist(updateUserDto.email);
    }

    const hashedPassword = updateUserDto.password
      ? await hash(updateUserDto.password, 12)
      : user.password;

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        ...updateUserDto,
        password: hashedPassword,
      },
    });

    this.logger.log(`User with ID ${id} updated successfully`);
    return formatResponse('User updated successfully', updatedUser);
  }

  async remove(id: string) {
    const user = await this.findUserById(id);

    const deletedUser = await this.prisma.user.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    this.logger.log(`User with ID ${id} deleted (soft delete)`);
    return formatResponse('User deleted successfully', deletedUser);
  }

  // Private helper methods

  private async ensureEmailDoesNotExist(email: string) {
    const existingUser = await this.prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      this.logger.warn(`Attempt to create user with existing email: ${email}`);
      throw new ConflictException('Email already exists');
    }
  }

  private async findUserById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id, deletedAt: null },
      include: this.getUserRelations(),
    });
    if (!user) {
      this.logger.warn(`User with ID ${id} not found`);
      throw new NotFoundException('User not found');
    }
    return user;
  }

  private getUserRelations() {
    return {
      _count: true,
      profile: true,
      family: true,
      applications: true,
      documents: true,
      education: true,
      testScores: true,
      contracts: true,
      translations: true,
      visa: true,
    };
  }
}
