import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import { comparePassword } from 'src/utils/utils.Helpers';
import { AUTH_INTERNAL_SERVER_ERROR, LOGIN_FAILED, TOKEN_INFOR_RESULT, USER_INFOR_RESULT } from './constant/auth-res-constant';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { TOKEN_EXPIRE } from 'src/config/constant/token-res-constant';
import { BaseResponse } from 'src/config/constant/res-constant';
import { IUser } from 'src/users/dto/user-res.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>, private jwtService: JwtService
    ) { }

    async login(data: LoginDto, response: Response) {
        const user = await this.userRepository.findOne({
            where: [
                { emailAddress: data.userNameOrEmailAddress },
                { userName: data.userNameOrEmailAddress }
            ],
        });
        try {
            if (!user) return response.status(HttpStatus.BAD_REQUEST).json(LOGIN_FAILED);
            const isPasswordValid = await comparePassword(data.password, user.password);
            if (!isPasswordValid) {
                return response.status(HttpStatus.BAD_REQUEST).json(LOGIN_FAILED);
            }
            const accessToken = this.jwtService.sign({ email: user.emailAddress }, { expiresIn: TOKEN_EXPIRE });
            return response.status(200).json({
                ...BaseResponse,
                result: {
                    ...TOKEN_INFOR_RESULT,
                    accessToken,
                    userId: user.id,
                },
            });
        } catch (error) {
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(AUTH_INTERNAL_SERVER_ERROR);
        }
    }

    async userInfor(user: IUser, response: Response) {
        return response.status(HttpStatus.OK).send({
            ...BaseResponse,
            result: {
                ...USER_INFOR_RESULT,
                user,
            },
        })
    }
}