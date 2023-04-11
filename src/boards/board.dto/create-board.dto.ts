import { IsNotEmpty } from "class-validator";

export class CreateBoardDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;
}

// DTO는 프로퍼티를 미리 넣어넣고 쓸수있어서 재사용에 유리함
// DTO를 Controller와 Service에 적용해야한다.

// PIPE는 약간 미들웨어?
// npm i class-validator class-transformer --save
// https://github.com/typestack/class-validator#manual-validation