// app/api/projects/route.ts
import { NextResponse } from 'next/server';
import dbConnect from '../../lib/mongodb';
import Project from '../../models/Project';

export async function GET(request: Request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured') === 'true';
    const query = featured ? { featured: true } : {};
    
    const projects = await Project.find(query).sort({ createdAt: -1 });
    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.json(
      { message: 'Error fetching projects', error },
      { status: 500 }
    );
  }
}