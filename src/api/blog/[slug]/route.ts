// app/api/blog/[slug]/route.ts
import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/mongodb';
import BlogPost from '../../../models/BlogPost';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const slug = params.slug;
  await dbConnect();

  try {
    const post = await BlogPost.findOne({ slug, published: true });
    
    if (!post) {
      return NextResponse.json(
        { message: 'Blog post not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json(
      { message: 'Error fetching blog post', error },
      { status: 500 }
    );
  }
}