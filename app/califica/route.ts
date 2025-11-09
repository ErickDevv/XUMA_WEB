import { NextRequest } from 'next/server';
import { redirect } from 'next/navigation';

export async function GET(request: NextRequest) {

const reviewUrl = 'https://g.page/r/CW17en6_Slf5EAI/review';

  redirect(reviewUrl);
}