'use client';

import {useState, useEffect, useCallback} from 'react';
import {interpretTarotSpread} from '@/ai/flows/interpret-tarot-spread';
import {Button} from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {motion} from 'framer-motion';
import React from 'react';
import {useTranslation} from 'react-i18next';
import i18n from '@/i18n/i18n';
import {useRouter} from 'next/navigation';
import Image from 'next/image';
import {ArrowLeft} from 'lucide-react';
import {ScrollArea} from "@/components/ui/scroll-area";

const cardWidth = 120;
const cardHeight = 205;

const tarotCards = [
  {name: '愚者', meaning: '新的开始、纯真、自发性、自由的精神', image: '/images/waite/cards/RWS_Tarot_00.jpg'},
  {name: '魔术师', meaning: '力量、技巧、专注、行动、足智多谋', image: '/images/waite/cards/RWS_Tarot_01.jpg'},
  {name: '女祭司', meaning: '直觉、神圣的知识、神圣的女性、潜意识', image: '/images/waite/cards/RWS_Tarot_02.jpg'},
  {name: '皇后', meaning: '富饶、养育、生育、生命、美丽、自然', image: '/images/waite/cards/RWS_Tarot_03.jpg'},
  {name: '皇帝', meaning: '权威、结构、控制、领导、稳定', image: '/images/waite/cards/RWS_Tarot_04.jpg'},
  {name: '教皇', meaning: '传统、制度、精神智慧、顺从、道德', image: '/images/waite/cards/RWS_Tarot_05.jpg'},
  {name: '恋人', meaning: '爱、和谐、选择、联合、关系、价值观一致', image: '/images/waite/cards/RWS_Tarot_06.jpg'},
  {name: '战车', meaning: '意志力、控制、成功、行动、自信、克服障碍', image: '/images/waite/cards/RWS_Tarot_07.jpg'},
  {name: '力量', meaning: '勇气、同情、内在力量、影响力、耐心', image: '/images/waite/cards/RWS_Tarot_08.jpg'},
  {name: '隐士', meaning: '内省、孤独、指导、寻找、自我发现', image: '/images/waite/cards/RWS_Tarot_09.jpg'},
  {name: '命运之轮', meaning: '命运、循环、运气、转折点、变化、因果报应', image: '/images/waite/cards/RWS_Tarot_10.jpg'},
  {name: '正义', meaning: '正义、公平、真理、责任、法律、后果', image: '/images/waite/cards/RWS_Tarot_11.jpg'},
  {name: '倒吊人', meaning: '暂停、投降、放手、新的视角、牺牲', image: '/images/waite/cards/RWS_Tarot_12.jpg'},
  {name: '死亡', meaning: '结束、转变、变化、过渡、放手、释放', image: '/images/waite/cards/RWS_Tarot_13.jpg'},
  {name: '节制', meaning: '平衡、适度、耐心、目的、意义、宁静', image: '/images/waite/cards/RWS_Tarot_14.jpg'},
  {name: '恶魔', meaning: '阴影自我、限制、成瘾、恐惧、超然', image: '/images/waite/cards/RWS_Tarot_15.jpg'},
  {name: '塔', meaning: '突变、剧变、混乱、启示、毁灭', image: '/images/waite/cards/RWS_Tarot_16.jpg'},
  {name: '星星', meaning: '希望、信念、复兴、目的、灵感、宁静', image: '/images/waite/cards/RWS_Tarot_17.jpg'},
  {name: '月亮', meaning: '错觉、恐惧、焦虑、潜意识、直觉、欺骗', image: '/images/waite/cards/RWS_Tarot_18.jpg'},
  {name: '太阳', meaning: '欢乐、成功、活力、乐观、自信、自我表达', image: '/images/waite/cards/RWS_Tarot_19.jpg'},
  {name: '审判', meaning: '重生、内在召唤、赦免、更新、果断', image: '/images/waite/cards/RWS_Tarot_20.jpg'},
  {name: '世界', meaning: '完整、融合、成就、旅行、整体性', image: '/images/waite/cards/RWS_Tarot_21.jpg'},

  {name: '圣杯首牌', meaning: '新的爱、同情、创造力', image: '/images/waite/cards/Cups01.jpg'},
  {name: '圣杯二', meaning: '伙伴关系、连接、平衡', image: '/images/waite/cards/Cups02.jpg'},
  {name: '圣杯三', meaning: '庆祝、友谊、社区', image: '/images/waite/cards/Cups03.jpg'},
  {name: '圣杯四', meaning: '沉思、冥想、重新评估', image: '/images/waite/cards/Cups04.jpg'},
  {name: '圣杯五', meaning: '失去、后悔、失望', image: '/images/waite/cards/Cups05.jpg'},
  {name: '圣杯六', meaning: '怀旧、回忆、天真', image: '/images/waite/cards/Cups06.jpg'},
  {name: '圣杯七', meaning: '选择、幻想、机会', image: '/images/waite/cards/Cups07.jpg'},
  {name: '圣杯八', meaning: '失望、放弃、退缩', image: '/images/waite/cards/Cups08.jpg'},
  {name: '圣杯九', meaning: '满足、幸福、梦想成真', image: '/images/waite/cards/Cups09.jpg'},
  {name: '圣杯十', meaning: '和谐、家庭、长期关系', image: '/images/waite/cards/Cups10.jpg'},
  {name: '圣杯侍从', meaning: '创造力、敏感性、灵感', image: '/images/waite/cards/Cups11.jpg'},
  {name: '圣杯骑士', meaning: '浪漫、魅力、想象力', image: '/images/waite/cards/Cups12.jpg'},
  {name: '圣杯皇后', meaning: '同情、养育、直觉', image: '/images/waite/cards/Cups13.jpg'},
  {name: '圣杯国王', meaning: '情感平衡、外交、同情', image: '/images/waite/cards/Cups14.jpg'},

  {name: '宝剑首牌', meaning: '清晰、真理、新想法', image: '/images/waite/cards/Swords01.jpg'},
  {name: '宝剑二', meaning: '艰难的决定、僵局、逃避', image: '/images/waite/cards/Swords02.jpg'},
  {name: '宝剑三', meaning: '心碎、悲伤、悲痛', image: '/images/waite/cards/Swords03.jpg'},
  {name: '宝剑四', meaning: '休息、放松、恢复', image: '/images/waite/cards/Swords04.jpg'},
  {name: '宝剑五', meaning: '冲突、失败、背叛', image: '/images/waite/cards/Swords05.jpg'},
  {name: '宝剑六', meaning: '过渡、变化、前进', image: '/images/waite/cards/Swords06.jpg'},
  {name: '宝剑七', meaning: '欺骗、背叛、盗窃', image: '/images/waite/cards/Swords07.jpg'},
  {name: '宝剑八', meaning: '限制、束缚、无助', image: '/images/waite/cards/Swords08.jpg'},
  {name: '宝剑九', meaning: '焦虑、恐惧、担忧', image: '/images/waite/cards/Swords09.jpg'},
  {name: '宝剑十', meaning: '结束、失败、挫折', image: '/images/waite/cards/Swords10.jpg'},
  {name: '宝剑侍从', meaning: '好奇心、新想法、敏捷', image: '/images/waite/cards/Swords11.jpg'},
  {name: '宝剑骑士', meaning: '行动、野心、仓促', image: '/images/waite/cards/Swords12.jpg'},
  {name: '宝剑皇后', meaning: '独立、公正、明确的界限', image: '/images/waite/cards/Swords13.jpg'},
  {name: '宝剑国王', meaning: '智慧、权威、真理', image: '/images/waite/cards/Swords14.jpg'},

  {name: '星币首牌', meaning: '机会、繁荣、新事业', image: '/images/waite/cards/Pents01.jpg'},
  {name: '星币二', meaning: '平衡、适应性、兼顾优先事项', image: '/images/waite/cards/Pents02.jpg'},
  {name: '星币三', meaning: '合作、团队合作、学习', image: '/images/waite/cards/Pents03.jpg'},
  {name: '星币四', meaning: '安全、控制、保守主义', image: '/images/waite/cards/Pents04.jpg'},
  {name: '星币五', meaning: '艰难、不安全、失去', image: '/images/waite/cards/Pents05.jpg'},
  {name: '星币六', meaning: '慷慨、慈善、分享', image: '/images/waite/cards/Pents06.jpg'},
  {name: '星币七', meaning: '耐心、投资、毅力', image: '/images/waite/cards/Pents07.jpg'},
  {name: '星币八', meaning: '工艺、技能发展、奉献', image: '/images/waite/cards/Pents08.jpg'},
  {name: '星币九', meaning: '独立、奢华、自力更生', image: '/images/waite/cards/Pents09.jpg'},
  {name: '星币十', meaning: '遗产、家庭、继承', image: '/images/waite/cards/Pents10.jpg'},
  {name: '星币侍从', meaning: '实用性、勤奋、学习', image: '/images/waite/cards/Pents11.jpg'},
  {name: '星币骑士', meaning: '效率、例行公事、责任', image: '/images/waite/cards/Pents12.jpg'},
  {name: '星币皇后', meaning: '养育、实用性、安全', image: '/images/waite/cards/Pents13.jpg'},
  {name: '星币国王', meaning: '富裕、安全、领导、实用主义', image: '/images/waite/cards/Pents14.jpg'},

  {name: '权杖首牌', meaning: '新的开始、可能性、灵感', image: '/images/waite/cards/Wands01.jpg'},
  {name: '权杖二', meaning: '计划、决定、方向', image: '/images/waite/cards/Wands02.jpg'},
  {name: '权杖三', meaning: '进步、扩张、远见', image: '/images/waite/cards/Wands03.jpg'},
  {name: '权杖四', meaning: '庆祝、和谐、家', image: '/images/waite/cards/Wands04.jpg'},
  {name: '权杖五', meaning: '冲突、分歧、竞争', image: '/images/waite/cards/Wands05.jpg'},
  {name: '权杖六', meaning: '胜利、成功、公众认可', image: '/images/waite/cards/Wands06.jpg'},
  {name: '权杖七', meaning: '挑战、坚守阵地', image: '/images/waite/cards/Wands07.jpg'},
  {name: '权杖八', meaning: '速度、迅速行动、旅行', image: '/images/waite/cards/Wands08.jpg'},
  {name: '权杖九', meaning: '韧性、毅力、界限', image: '/images/waite/cards/Wands09.jpg'},
  {name: '权杖十', meaning: '负担、责任、完成', image: '/images/waite/cards/Wands10.jpg'},
  {name: '权杖侍从', meaning: '灵感、想法、发现', image: '/images/waite/cards/Wands11.jpg'},
  {name: '权杖骑士', meaning: '冒险、能量、激情', image: '/images/waite/cards/Wands12.jpg'},
  {name: '权杖皇后', meaning: '勇气、自信、独立', image: '/images/waite/cards/Wands13.jpg'},
  {name: '权杖国王', meaning: '领导、远见、魅力', image: '/images/waite/cards/Wands14.jpg'},
];

export default function CelticCrossPage() {
  const [cards, setCards] = useState(Array(10).fill(null));
  const [interpretation, setInterpretation] = useState('');
  const [isInterpreting, setIsInterpreting] = useState(false);
  const [drawnCardCount, setDrawnCardCount] = useState(0);
  const {t, i18n} = useTranslation();
  const router = useRouter();
  const [showMore, setShowMore] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    if (i18n && i18n.changeLanguage) {
      i18n.changeLanguage(i18n.language);
    }
  }, [i18n]);

  const drawCardSound = useCallback(() => {
    const audio = new Audio('/sounds/magic-chime-143234.mp3');
    audio.play().catch(error => console.error("Failed to play sound:", error));
  }, []);

  const drawCard = useCallback((index: number) => {
    const randomCard = tarotCards[Math.floor(Math.random() * tarotCards.length)];
    // Randomly determine if the card is reversed
    const isReversed = Math.random() < 0.5;
    setCards(prev => {
      const newCards = [...prev];
      newCards[index] = {...randomCard, isReversed: isReversed}; // Store the orientation
      return newCards;
    });
    setDrawnCardCount(prevCount => prevCount + 1);
    drawCardSound();
  }, [tarotCards, drawCardSound]);

  const shuffleCards = () => {
    setCards(Array(10).fill(null));
    setInterpretation('');
    setDrawnCardCount(0);
    setShowMore(false);
    setIsDialogOpen(false);
  };

  const handleReading = async () => {
    if (!cards || cards.filter(card => card !== null).length !== 10) {
      alert(t('Please draw cards.'));
      return;
    }
    const readingCards = cards.filter(card => card !== null);
    if (readingCards.length === 0) {
      alert(t('Please draw cards.'));
      return;
    }

    setIsInterpreting(true);
    setShowMore(false);
    setIsDialogOpen(true);

    try {
      const result = await interpretTarotSpread({
        spreadType: 'Celtic Cross Spread',
        cards: readingCards.map(card => ({name: card.name, meaning: card.meaning})),
        userQuery: t('Please provide the interpretation in {{lng}}', {lng: i18n.language}),
      });
      setInterpretation(result.interpretation);
    } catch (error) {
      console.error('AI Interpretation Error:', error);
      setInterpretation(t('Error fetching interpretation. Please try again.'));
    } finally {
      setIsInterpreting(false);
    }
  };

  const canDrawCard = (index: number) => cards[index] === null && drawnCardCount < 10;

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground starry-background">
      <header className="text-center pt-12">
        <Button variant="ghost" onClick={handleGoBack} style={{position: 'absolute', top: '10px', left: '10px'}}>
          <ArrowLeft className="mr-2 h-4 w-4"/>
        </Button>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center gap-4">
        <div className="relative flex justify-center">
          <div className="grid grid-cols-2 sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-5 gap-12">
            {cards.map((card, index) => (
              <div key={index} className="relative">
                <motion.div
                  className="border-2 border-purple-500 rounded-lg flex items-center justify-center bg-muted cursor-pointer flex-col overflow-hidden"
                  style={{width: cardWidth, height: cardHeight}}
                  initial={{opacity: 0, scale: 0.5}}
                  animate={{opacity: 1, scale: 1}}
                  transition={{duration: 0.5}}
                  onClick={() => {
                    if (canDrawCard(index)) {
                      drawCard(index);
                    }
                  }}
                >
                  {card ? (
                    <div className="p-2 flex flex-col items-center">
                      <Image
                        src={card.image}
                        alt={card.name}
                        width={cardWidth - 30}
                        height={cardHeight - 50}
                        style={{ borderRadius: '8px', marginBottom: '8px', transform: card.isReversed ? 'rotate(180deg)' : 'rotate(0deg)' }}
                      />
                      {/*<div className="text-md font-semibold">{card.name}</div>*/}
                      {/*<div className="text-xs text-muted-foreground mt-1">{card.meaning}</div>*/}
                    </div>
                  ) : (
                    <Image
                      src="/images/background.png" // Replace with your actual background image path
                      alt="Card Back"
                      width={cardWidth - 30}
                      height={cardHeight - 50}
                      style={{ borderRadius: '8px', marginBottom: '8px' }}
                    />
                  )}
                </motion.div>
                {!card && (
                  <Button
                    onClick={() => drawCard(index)}
                    className="bg-gradient-to-r from-purple-500 to-purple-700 text-white rounded-full px-8 py-3 font-bold hover:shadow-lg transition-all absolute bottom-[-50px] left-1/2 transform -translate-x-1/2 mt-2"
                    disabled={drawnCardCount >= 10}
                  >
                    {t('翻牌')}
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-16">
          
          <Button variant="outline" className="bg-gradient-to-r from-purple-500 to-purple-700 text-white rounded-full px-8 py-3 font-bold hover:shadow-lg transition-all" disabled={cards.filter(card => card !== null).length !== 10} onClick={handleReading}>
            {t('获取解读')}
          </Button>
          
        </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="sm:max-w-[825px]" onOpenAutoFocus={() => {}}>
              <DialogHeader>
                <DialogTitle>{t('解读')}</DialogTitle>
              </DialogHeader>
              <DialogDescription asChild>
                <ScrollArea className="text-sm text-muted-foreground max-h-[80vh] overflow-y-auto">
                  {isInterpreting ? (
                    <div>{t('加载中...')}</div>
                  ) : (
                    <div>
                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                        {cards.map((card, index) => (
                          card && (
                            <div key={card.id || index} className="flex flex-col items-center">
                              <Image
                                src={card.image}
                                alt={card.name}
                                width={cardWidth - 30}
                                height={cardHeight - 50}
                                style={{ borderRadius: '8px', marginBottom: '8px', transform: card.isReversed ? 'rotate(180deg)' : 'rotate(0deg)' }}
                              />
                              <div className="text-md font-semibold">{card.name}</div>
                              <div className="text-xs text-muted-foreground mt-1">{card.meaning}</div>
                            </div>
                          )
                        ))}
                      </div>
                      <div className="mt-4">{interpretation}</div>
                      <Button
                          onClick={shuffleCards}
                          className="bg-gradient-to-r from-purple-500 to-purple-700 text-white rounded-full px-8 py-3 font-bold hover:shadow-lg transition-all mt-4"
                      >
                        {t('重新翻牌')}
                      </Button>
                    </div>
                  )}
                </ScrollArea>
              </DialogDescription>
            </DialogContent>
          </Dialog>
      </main>

      <footer className="p-6 text-center border-t border-border text-muted-foreground">
        <p>© 2024 Mystic Sight</p>
      </footer>
    </div>
  );
}


