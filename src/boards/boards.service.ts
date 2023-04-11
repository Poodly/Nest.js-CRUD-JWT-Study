import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { BoardInterface, BoardStatus } from './board.model';
// import { v1 as uuid } from 'uuid'; // 유니크한 id만들어주는 라이브러리 // as는 이름을 uuid로 쓰겠다 라는거
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './board.schema'

@Injectable()
export class BoardsService {
    constructor(@InjectModel(Board.name) 
    private boardModel: mongoose.Model<Board>
    ) {}
    
    // private boards: BoardInterface[] = [];

    // private boards: Board[] = []; 배열이기 때문에
    // : Board[]  배열로 해줘야 에러가 안남
    async getAllBoards(): Promise<BoardInterface[]> {
        const boards = await this.boardModel.find();
        return boards;
    }

    // createBoard(title: string, description: string) {
    async createBoard(createBoardDto: CreateBoardDto): Promise<BoardInterface> {
        const { title, description } = createBoardDto;

        const board: BoardInterface = {
            title,
            description,
            status: BoardStatus.PUBLIC
        }

        await this.boardModel.create(board);
        return board;
    }

    async getBoardById(id: string): Promise<BoardInterface> {
        const foundBoard = await this.boardModel.findById(id);
        if (!foundBoard) {
            throw new NotFoundException(`Can't find Board with id ${id}`); // NotFoundException => 찾는것이 없으면 에러를 던져줌
        }
        return foundBoard
    }

    async deleteBoard(id: string): Promise<void> { //void는 return값 없을때
        // const boardId = await this.getBoardById(id);
        // await this.boardModel.deleteOne(boardId);
        await this.boardModel.findByIdAndDelete(id);
    }

    async updateBoardStatus(id: string, status: BoardStatus) {
        return await this.boardModel.findByIdAndUpdate(id, { status }, { new: true });
    }
}
