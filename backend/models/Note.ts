import mongoose, { Schema, Document, Model, Types } from 'mongoose';

// Define the interface for the Note document
interface INote extends Document {
  user: Types.ObjectId;
  content: string;
  createdAt: Date;
}

const NoteSchema: Schema<INote> = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Note: Model<INote> = mongoose.model<INote>('Note', NoteSchema);

export default Note;