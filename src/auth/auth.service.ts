import { Injectable } from '@nestjs/common';


@Injectable()
export class AuthService {
  create() {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update() {
    return ;
  }

  remove(id: number) {
    return ;
  }
}
