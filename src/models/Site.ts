// src/models/Site.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface ISite extends Document {
  owner: mongoose.Types.ObjectId;
  type: 'portfolio' | 'blog' | 'resume' | 'business';
  title: string;
  description: string;
  template: string;
  customization: {
    colors: {
      primary: string;
      secondary: string;
      background: string;
      text: string;
    };
    fonts: {
      heading: string;
      body: string;
    };
    logo?: string;
  };
  domain?: string;
  subdomain: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const SiteSchema = new Schema<ISite>(
  {
    owner: { 
      type: Schema.Types.ObjectId, 
      ref: 'User',
      required: true 
    },
    type: { 
      type: String, 
      enum: ['portfolio', 'blog', 'resume', 'business'],
      required: true 
    },
    title: { 
      type: String, 
      required: true 
    },
    description: { 
      type: String, 
      required: true 
    },
    template: { 
      type: String, 
      required: true 
    },
    customization: {
      colors: {
        primary: { type: String, default: '#3b82f6' },
        secondary: { type: String, default: '#10b981' },
        background: { type: String, default: '#1a1a1a' },
        text: { type: String, default: '#f1f1f1' }
      },
      fonts: {
        heading: { type: String, default: 'Poppins' },
        body: { type: String, default: 'Inter' }
      },
      logo: { type: String }
    },
    domain: { 
      type: String 
    },
    subdomain: { 
      type: String,
      required: true,
      unique: true
    },
    published: { 
      type: Boolean, 
      default: false 
    }
  },
  { timestamps: true }
);

export default mongoose.models.Site || mongoose.model<ISite>('Site', SiteSchema);