import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { formatResponse } from 'src/common/utils/response.util';

@Injectable()
export class ContractService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createContractDto: CreateContractDto, creatorId: string) {
    const { contractIdPrefix, ...rest } = createContractDto;

    const user = await this.prisma.user.findUnique({ where: { id: rest.userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${rest.userId} not found`);
    }

    const lastContract = await this.prisma.contract.findFirst({
      where: { appID: { startsWith: contractIdPrefix } },
      orderBy: { createdAt: 'desc' },
    });

    let nextSequence = 1;
    if (lastContract) {
      const lastSequence = parseInt(lastContract.appID.split(' ')[1], 10);
      nextSequence = lastSequence + 1;
    }

    const appID = `${contractIdPrefix} ${nextSequence.toString().padStart(6, '0')}`;

    const creator = await this.prisma.user.findUnique({ where: { id: creatorId } });
    if (!creator) {
      throw new NotFoundException(`Creator with ID ${creatorId} not found`);
    }

    const contract = await this.prisma.contract.create({
      data: {
        ...rest,
        appID,
        createdBy: creator.fullname,
      },
    });

    return formatResponse('Contract created successfully', contract);
  }

  async findAll() {
    const contracts = await this.prisma.contract.findMany({
      where: { deletedAt: null },
    });
    return formatResponse('Contracts retrieved successfully', contracts);
  }

  async findMe(userId: string) {
    const contracts = await this.prisma.contract.findMany({
      where: { userId, deletedAt: null },
    });
    if (contracts.length === 0) {
      throw new NotFoundException(`No contracts found for user ID ${userId}`);
    }
    return formatResponse('User contracts retrieved successfully', contracts);
  }

  async findOne(id: string) {
    const contract = await this.prisma.contract.findUnique({
      where: { id, deletedAt: null },
    });
    if (!contract) {
      throw new NotFoundException(`Contract with ID ${id} not found`);
    }
    return formatResponse('Contract retrieved successfully', contract);
  }

  async update(id: string, updateContractDto: UpdateContractDto) {
    const { contractIdPrefix, ...rest } = updateContractDto;

    const contract = await this.prisma.contract.findUnique({
      where: { id, deletedAt: null },
    });
    if (!contract) {
      throw new NotFoundException(`Contract with ID ${id} not found`);
    }

    const updatedContract = await this.prisma.contract.update({
      where: { id },
      data: {
        ...rest,
      },
    });

    return formatResponse('Contract updated successfully', updatedContract);
  }

  async remove(id: string) {
    const contract = await this.prisma.contract.findUnique({
      where: { id, deletedAt: null },
    });
    if (!contract) {
      throw new NotFoundException(`Contract with ID ${id} not found`);
    }

    await this.prisma.contract.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    return formatResponse('Contract deleted successfully', null);
  }
}
