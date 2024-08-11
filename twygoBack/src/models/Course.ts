import mongoose, { Document, Schema } from 'mongoose';

interface IVideo {
  title: string;
  size: number; // MB
}

export interface ICourse extends Document {
  title: string;
  description: string;
  endDate: Date;
  videos: IVideo[];
}

const VideoSchema: Schema = new Schema({
  title: { type: String, required: [true, 'O título do vídeo é obrigatório'] },
  size: { type: Number, required: [true, 'O tamanho do vídeo é obrigatório'] },
});

const CourseSchema: Schema = new Schema({
  title: { type: String, required: [true, 'O título do curso é obrigatório'] },
  description: { type: String, required: [true, 'A descrição do curso é obrigatória'] },
  endDate: { type: Date, required: [true, 'A data de término é obrigatória'] },
  videos: {
    type: [VideoSchema],
    required: [true, 'Os vídeos do curso são obrigatórios'],
    validate: {
      validator: function(v: IVideo[]) {
        return v.length > 0;
      },
      message: 'O curso deve ter pelo menos um vídeo'
    }
  },
});

export default mongoose.model<ICourse>('Course', CourseSchema);
