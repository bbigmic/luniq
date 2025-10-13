import { NextRequest, NextResponse } from 'next/server';
import { testEmailConnection } from '@/lib/email';

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const result = await testEmailConnection();
    
    if (result.success) {
      return NextResponse.json({
        message: 'Email server connection successful',
        success: true,
      });
    } else {
      return NextResponse.json({
        error: result.error,
        success: false,
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Error testing email connection:', error);
    return NextResponse.json(
      { error: 'Failed to test email connection' },
      { status: 500 }
    );
  }
}
