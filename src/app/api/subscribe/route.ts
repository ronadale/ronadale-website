import { NextRequest, NextResponse } from 'next/server';
import mailchimp from '@mailchimp/mailchimp_marketing';

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: 'us16',
});

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    const response = await mailchimp.lists.addListMember(
      process.env.MAILCHIMP_AUDIENCE_ID!,
      {
        email_address: email,
        status: 'subscribed',
      }
    );

    return NextResponse.json(
      { message: 'Successfully subscribed!' },
      { status: 200 }
    );

  } catch (error: any) {
    console.error('Mailchimp error:', error);
    console.error('Error response:', error.response?.body);
    
    if (error.status === 400 && error.response?.body?.title === 'Member Exists') {
      return NextResponse.json(
        { message: 'Email already subscribed!' },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to subscribe. Please try again.' },
      { status: 500 }
    );
  }
}