// app/api/projects/[slug]/route.ts
import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/mongodb';
import Project from '../../../models/Project';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const slug = params.slug;
  await dbConnect();

  try {
    const project = await Project.findOne({ slug });
    
    if (!project) {
      return NextResponse.json(
        { message: 'Project not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(project);
  } catch (error) {
    return NextResponse.json(
      { message: 'Error fetching project', error },
      { status: 500 }
    );
  }
}