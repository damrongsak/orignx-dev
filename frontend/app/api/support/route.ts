import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Here you would typically send an email or save to database
    // For now, we'll just return a success message
    console.log('Support request received:', { name, email, message });

    return NextResponse.json({ 
      message: 'Support request submitted successfully! We will get back to you soon.' 
    });
  } catch (error) {
    console.error('Support API error:', error);
    return NextResponse.json(
      { error: 'Failed to submit support request' },
      { status: 500 }
    );
  }
}
