import { Controller, Get, Post, Body, Param, Delete, Patch, UsePipes, ValidationPipe } from '@nestjs/common';
import { BoardsService } from './boards.service'
import { BoardInterface, BoardStatus } from './board.model';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';

// 게시물에 관한 로직을 처리하는 곳은 Service이다.
// 그래서 먼저 Service에서 로직을 처리해준 후에
// Controller에서 서비스를 불러오게 된다.

@Controller('boards')
export class BoardsController {
    constructor(private boardsService: BoardsService) {}

    @Get('/') 
    getAllBoard(): Promise<BoardInterface[]> {
        return this.boardsService.getAllBoards();
    }
    
    // @Body('title') title: string,
    // @Body('description') description: string,
    @Post()
    @UsePipes(ValidationPipe)
    createBoard(@Body() createBoardDto: CreateBoardDto): Promise<BoardInterface> {
        return this.boardsService.createBoard(createBoardDto);
    }
    
    @Get('/:id')
    getBoardById(@Param('id') id: string): Promise<BoardInterface> {
        return this.boardsService.getBoardById(id);
    }

    @Delete('/:id')
    deleteBoard(@Param('id') id: string): void {
        this.boardsService.deleteBoard(id);
    }

    @Patch('/:id/status')
    updateBoardStatus(
        @Param('id') id: string,
        @Body('status', BoardStatusValidationPipe) status: BoardStatus
    ) {
        return this.boardsService.updateBoardStatus(id, status);
    }
}
