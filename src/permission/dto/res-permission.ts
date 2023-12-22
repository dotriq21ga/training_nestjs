import { PartialType } from "@nestjs/mapped-types";
import { ChangePermissionDto } from "./change-permission";

export class PermissionResultDto extends PartialType(ChangePermissionDto) { }
