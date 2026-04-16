import { prop, getModelForClass, defaultClasses, modelOptions } from '@typegoose/typegoose';
import { Types } from 'mongoose';
import { UserModel } from './user.model.js';
import { OfferModel } from './offer.model.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
@modelOptions({ options: { allowMixed: 0 } })
export class CommentModel extends defaultClasses.TimeStamps {
  @prop({ required: true, minlength: 5, maxlength: 1024 })
  public text!: string;

  @prop({ required: true })
  public publishDate!: Date;

  @prop({ required: true, min: 1, max: 5 })
  public rating!: number;

  @prop({ required: true, ref: () => UserModel })
  public author!: Types.ObjectId;

  @prop({ required: true, ref: () => OfferModel })
  public offer!: Types.ObjectId;
}

export const CommentEntity = getModelForClass(CommentModel);
