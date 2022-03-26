import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserModelModule } from '../../models/user.model';

@Module({
    imports: [UserModelModule],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule {}
