'use client';

import React from 'react';
import {Button} from '@/components/ui/button';
import {useRouter} from 'next/navigation';
import Image from 'next/image';

const SpreadSelectionPage = () => {
  const router = useRouter();

  const handleSpreadSelection = (spread: string) => {
    router.push(`/${spread}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
      <header className="text-center pt-12">
        <h1 className="text-4xl font-bold text-black mb-4" style={{ lineHeight: '1.2' }}>
          选择你的
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-purple-700" style={{ fontSize: '2em' }}>
            塔罗牌阵
          </span>
        </h1>
        <p className="text-md text-black" style={{fontSize: '1.2rem'}}>
          请选择一个牌阵开始你的塔罗占卜
        </p>
      </header>

      <main className="flex-grow flex items-center justify-center gap-12">
        {/* Three-Card Spread */}
        <div className="flex flex-col items-center">
          <Image
            src="https://fates.cc/waite/images/forms/%E6%99%82%E9%96%93%E6%B5%81.png"
            alt="Three-Card Spread"
            width={500}
            height={500}
            className="rounded-md shadow-lg"
            priority
            style={{ marginBottom: '0.75rem' }} // 0.75rem = 12px
          />
          <Button
            className="bg-gradient-to-r from-purple-500 to-purple-700 text-white rounded-full px-8 py-3 font-bold hover:shadow-lg transition-all"
            onClick={() => handleSpreadSelection('three-card-spread')}
          >
            三张牌阵
          </Button>
        </div>

        {/* Celtic Cross Spread */}
        <div className="flex flex-col items-center">
          <Image
            src="https://fates.cc/waite/images/forms/%E5%87%B1%E7%88%BE%E7%89%B9%E5%8D%81%E5%AD%97.png"
            alt="Celtic Cross Spread"
            width={500}
            height={500}
            className="rounded-md shadow-lg"
            priority
            style={{ marginBottom: '0.75rem' }} // 0.75rem = 12px
          />
          <Button
            className="bg-gradient-to-r from-purple-500 to-purple-700 text-white rounded-full px-8 py-3 font-bold hover:shadow-lg transition-all"
            onClick={() => handleSpreadSelection('celtic-cross')}
          >
            凯尔特十字牌阵
          </Button>
        </div>
      </main>
    </div>
  );
};

export default SpreadSelectionPage;
