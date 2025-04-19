// app/api/blog/route.ts
import { NextResponse } from 'next/server';
import dbConnect from '../../lib/mongodb';
import BlogPost from '../../models/BlogPost';

export async function GET() {
  await dbConnect();

  try {
    const posts = await BlogPost.find({ published: true })
      .sort({ publishedAt: -1 })
      .select('title slug excerpt coverImage tags category publishedAt');
    
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json(
      { message: 'Error fetching blog posts', error },
      { status: 500 }
    );
  }
}