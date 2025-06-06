import { Schema } from 'mongoose';

export const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'enseignant', 'etudiant'],
    default: 'etudiant' // Default role is etudiant
  }
});
