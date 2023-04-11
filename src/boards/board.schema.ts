import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { BoardStatus } from './board.model';

export type BoardDocument = HydratedDocument<Board>;

@Schema({
    timestamps: true
})
export class Board {
    @Prop()
    title: string;

    @Prop()
    description: string;

    @Prop()
    status: BoardStatus;
}

export const BoardSchema = SchemaFactory.createForClass(Board);
