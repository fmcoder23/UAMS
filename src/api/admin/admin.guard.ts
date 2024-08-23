import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../../common/decorators/role.decorator';
import { Role } from '../../common/enums/role.enum';
import { Request } from 'express';

interface CustomRequest extends Request {
    user?: {
        roles: Role[];
        [key: string]: any;
    };
}

@Injectable()
export class AdminGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (!requiredRoles || requiredRoles.length === 0) {
            return true;
        }

        const request = context.switchToHttp().getRequest<CustomRequest>();
        const user = request.user;

        if (!user || !requiredRoles.some(role => user.roles.includes(role))) {
            throw new ForbiddenException('Access to this resource is forbidden');
        }

        return true;
    }
}
