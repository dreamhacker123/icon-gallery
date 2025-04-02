import { Sequelize } from 'sequelize-typescript';
import configRaw from "./config";
import { Image } from '../models/image.model';
import  {Folder}  from '../models/folder.model';

const env = process.env.NODE_ENV || 'development';
const config = (configRaw as any)[env];

export const sequelize = new Sequelize({
  ...config,
  models:[Image,Folder],
  logging: false,
});
