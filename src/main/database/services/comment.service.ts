import { injectable } from 'inversify';
import { CommentModel, CommentEntity } from '../models/comment.model.js';
import { CommentServiceInterface } from './database-service.interface.js';
import { CreateCommentDto } from '../../../shared/dto/create-comment.dto.js';

@injectable()
export class CommentService implements CommentServiceInterface {
  public async findByOfferId(offerId: string, limit = 50): Promise<CommentModel[]> {
    return CommentEntity.find({ offer: offerId })
      .sort({ createdAt: -1 })
      .limit(limit)
      .populate('author')
      .exec();
  }

  public async create(dto: CreateCommentDto): Promise<CommentModel> {
    const comment = new CommentEntity(dto);
    return comment.save();
  }
}
