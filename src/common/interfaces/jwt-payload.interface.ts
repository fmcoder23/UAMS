import { Role } from '../enums/role.enum';

export interface JwtPayload {
  id: string;
  role: Role;
  iat?: number;
  exp?: number;
}
