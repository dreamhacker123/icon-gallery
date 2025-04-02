import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  BeforeCreate,
} from 'sequelize-typescript';
import { Folder } from './folder.model';

@Table
export class Image extends Model {
  @Column(DataType.STRING)
  title!: string;

  @Column(DataType.STRING)
  imageUrl!: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  isVisible!: boolean;

  @ForeignKey(() => Folder)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    onDelete: 'CASCADE',
  })
  folderId!: number;

  @BelongsTo(() => Folder, {
    onDelete: 'CASCADE',
  })
  folder!: Folder;

  @Column({ type: DataType.INTEGER, allowNull: true})
  order!: number;

  @BeforeCreate
  static async setDefaultOrder(instance: Image) {
    const maxOrder = await Image.max('order');
    instance.order = (typeof maxOrder === 'number' ? maxOrder + 1 : 0);
  }
}

