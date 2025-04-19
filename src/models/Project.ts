// src/models/Project.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  title: string;
  slug: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  imageUrls: string[];
  projectUrl?: string;
  githubUrl?: string;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    longDescription: { type: String },
    technologies: { type: [String], required: true },
    imageUrls: { type: [String], default: [] },
    projectUrl: { type: String },
    githubUrl: { type: String },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);
