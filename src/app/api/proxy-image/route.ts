import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const imageUrl = searchParams.get('imageUrl');

  if (!imageUrl) {
    return new NextResponse('Missing imageUrl parameter', { status: 400 });
  }

  try {
    const response = await fetch(imageUrl, {
      headers: {
        'authority': 't.8s8s.com',
        'method': 'GET',
        'path': new URL(imageUrl).pathname,
        'scheme': 'https',
        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'accept-encoding': 'gzip, deflate, br, zstd',
        'accept-language': 'zh-CN,zh;q=0.9',
        'sec-ch-ua': '"Chromium";v="136", "Microsoft Edge";v="136", "Not.A/Brand";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'document',
        'sec-fetch-mode': 'navigate',
        'sec-fetch-site': 'none',
        'sec-fetch-user': '?1',
        'upgrade-insecure-requests': '1',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36',
        'referer': 'https://t.8s8s.com/photo/tarot/tarot_177_1.htm',
      },
    });

    if (!response.ok) {
      console.error(`Error fetching image: ${response.status} ${response.statusText}`);
      return new NextResponse(`Failed to fetch image: ${response.status} ${response.statusText}`, { status: 500 });
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': response.headers.get('Content-Type') || 'image/jpeg',
      },
    });
  } catch (error) {
    console.error('Error fetching image:', error);
    return new NextResponse('Failed to fetch image', { status: 500 });
  }
}
