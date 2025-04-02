import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Image } from './image.model';

@Table({ tableName: 'folders' })
export class Folder extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  name!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
  })
  order!: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  })
  isOpen!: boolean;

  @HasMany(() => Image, { onDelete: 'CASCADE' ,hooks: true})
  images!: Image[];
}
