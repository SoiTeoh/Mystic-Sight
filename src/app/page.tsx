'use client';

import React, {useEffect, useState, useCallback} from 'react';
import {Button} from '@/components/ui/button';
import {useRouter} from 'next/navigation';
import Image from 'next/image';

const tarotCards = [
  // Major Arcana
  {name: 'The Fool', meaning: 'Beginnings, innocence, spontaneity, a free spirit', image: '/images/waite/cards/RWS_Tarot_00.jpg'},
  {name: 'The Magician', meaning: 'Power, skill, concentration, action, resourcefulness', image: '/images/waite/cards/RWS_Tarot_01.jpg'},
  {name: 'The High Priestess', meaning: 'Intuition, sacred knowledge, divine feminine, the subconscious', image: '/images/waite/cards/RWS_Tarot_02.jpg'},
  {name: 'The Empress', meaning: 'Abundance, nurturing, fertility, life, beauty, nature', image: '/images/waite/cards/RWS_Tarot_03.jpg'},
  {name: 'The Emperor', meaning: 'Authority, structure, control, leadership, stability', image: '/images/waite/cards/RWS_Tarot_04.jpg'},
  {name: 'The Hierophant', meaning: 'Tradition, institution, spiritual wisdom, conformity, morality', image: '/images/waite/cards/RWS_Tarot_05.jpg'},
  {name: 'The Lovers', meaning: 'Love, harmony, choices, union, relationships, values alignment', image: '/images/waite/cards/RWS_Tarot_06.jpg'},
  {name: 'The Chariot', meaning: 'Willpower, control, success, action, assertion, overcoming obstacles', image: '/images/waite/cards/RWS_Tarot_07.jpg'},
  {name: 'Strength', meaning: 'Courage, compassion, inner strength, influence, patience', image: '/images/waite/cards/RWS_Tarot_08.jpg'},
  {name: 'The Hermit', meaning: 'Introspection, solitude, guidance, searching, self-discovery', image: '/images/waite/cards/RWS_Tarot_09.jpg'},
  {name: 'Wheel of Fortune', meaning: 'Destiny, cycles, luck, turning points, change, karma', image: '/images/waite/cards/RWS_Tarot_10.jpg'},
  {name: 'Justice', meaning: 'Justice, fairness, truth, accountability, law, consequences', image: '/images/waite/cards/RWS_Tarot_11.jpg'},
  {name: 'The Hanged Man', meaning: 'Pause, surrender, letting go, new perspective, sacrifice', image: '/images/waite/cards/RWS_Tarot_12.jpg'},
  {name: 'Death', meaning: 'Endings, transformation, change, transition, letting go, release', image: '/images/waite/cards/RWS_Tarot_13.jpg'},
  {name: 'Temperance', meaning: 'Balance, moderation, patience, purpose, meaning, serenity', image: '/images/waite/cards/RWS_Tarot_14.jpg'},
  {name: 'The Devil', meaning: 'Shadow self, limitation, addiction, fear, detachment', image: '/images/waite/cards/RWS_Tarot_15.jpg'},
  {name: 'The Tower', meaning: 'Sudden change, upheaval, chaos, revelation, destruction', image: '/images/waite/cards/RWS_Tarot_16.jpg'},
  {name: 'The Star', meaning: 'Hope, faith, renewal, purpose, inspiration, serenity', image: '/images/waite/cards/RWS_Tarot_17.jpg'},
  {name: 'The Moon', meaning: 'Illusion, fear, anxiety, subconscious, intuition, deception', image: '/images/waite/cards/RWS_Tarot_18.jpg'},
  {name: 'The Sun', meaning: 'Joy, success, vitality, optimism, confidence, self-expression', image: '/images/waite/cards/RWS_Tarot_19.jpg'},
  {name: 'Judgment', meaning: 'Rebirth, inner calling, absolution, renewal, decisiveness', image: '/images/waite/cards/RWS_Tarot_20.jpg'},
  {name: 'The World', meaning: 'Completion, integration, accomplishment, travel, wholeness', image: '/images/waite/cards/RWS_Tarot_21.jpg'},

  // Cups
  {name: 'Ace of Cups', meaning: 'New love, compassion, creativity', image: '/images/waite/cards/Cups01.jpg'},
  {name: 'Two of Cups', meaning: 'Partnership, connection, balance', image: '/images/waite/cards/Cups02.jpg'},
  {name: 'Three of Cups', meaning: 'Celebration, friendship, community', image: '/images/waite/cards/Cups03.jpg'},
  {name: 'Four of Cups', meaning: 'Contemplation, meditation, re-evaluation', image: '/images/waite/cards/Cups04.jpg'},
  {name: 'Five of Cups', meaning: 'Loss, regret, disappointment', image: '/images/waite/cards/Cups05.jpg'},
  {name: 'Six of Cups', meaning: 'Nostalgia, memories, innocence', image: '/images/waite/cards/Cups06.jpg'},
  {name: 'Seven of Cups', meaning: 'Choices, illusions, opportunities', image: '/images/waite/cards/Cups07.jpg'},
  {name: 'Eight of Cups', meaning: 'Disappointment, abandonment, withdrawal', image: '/images/waite/cards/Cups08.jpg'},
  {name: 'Nine of Cups', meaning: 'Satisfaction, happiness, dreams coming true', image: '/images/waite/cards/Cups09.jpg'},
  {name: 'Ten of Cups', meaning: 'Harmony, family, long-term relationships', image: '/images/waite/cards/Cups10.jpg'},
  {name: 'Page of Cups', meaning: 'Creativity, sensitivity, inspiration', image: '/images/waite/cards/Cups11.jpg'},
  {name: 'Knight of Cups', meaning: 'Romance, charm, imagination', image: '/images/waite/cards/Cups12.jpg'},
  {name: 'Queen of Cups', meaning: 'Compassion, nurturing, intuition', image: '/images/waite/cards/Cups13.jpg'},
  {name: 'King of Cups', meaning: 'Emotional balance, diplomacy, compassion', image: '/images/waite/cards/Cups14.jpg'},

  // Swords
  {name: 'Ace of Swords', meaning: 'Clarity, truth, new ideas', image: '/images/waite/cards/Swords01.jpg'},
  {name: 'Two of Swords', meaning: 'Difficult decisions, stalemate, avoidance', image: '/images/waite/cards/Swords02.jpg'},
  {name: 'Three of Swords', meaning: 'Heartbreak, grief, sorrow', image: '/images/waite/cards/Swords03.jpg'},
  {name: 'Four of Swords', meaning: 'Rest, relaxation, recovery', image: '/images/waite/cards/Swords04.jpg'},
  {name: 'Five of Swords', meaning: 'Conflict, defeat, betrayal', image: '/images/waite/cards/Swords05.jpg'},
  {name: 'Six of Swords', meaning: 'Transition, change, moving on', image: '/images/waite/cards/Swords06.jpg'},
  {name: 'Seven of Swords', meaning: 'Deception, betrayal, theft', image: '/images/waite/cards/Swords07.jpg'},
  {name: 'Eight of Swords', meaning: 'Restriction, limitation, helplessness', image: '/images/waite/cards/Swords08.jpg'},
  {name: 'Nine of Swords', meaning: 'Anxiety, fear, worry', image: '/images/waite/cards/Swords09.jpg'},
  {name: 'Ten of Swords', meaning: 'Endings, failure, defeat', image: '/images/waite/cards/Swords10.jpg'},
  {name: 'Page of Swords', meaning: 'Curiosity, new ideas, agility', image: '/images/waite/cards/Swords11.jpg'},
  {name: 'Knight of Swords', meaning: 'Action, ambition, haste', image: '/images/waite/cards/Swords12.jpg'},
  {name: 'Queen of Swords', meaning: 'Independent, unbiased, clear boundaries', image: '/images/waite/cards/Swords13.jpg'},
  {name: 'King of Swords', meaning: 'Intellect, authority, truth', image: '/images/waite/cards/Swords14.jpg'},

  // Pentacles
  {name: 'Ace of Pentacles', meaning: 'Opportunity, prosperity, new venture', image: '/images/waite/cards/Pents01.jpg'},
  {name: 'Two of Pentacles', meaning: 'Balance, adaptability, juggling priorities', image: '/images/waite/cards/Pents02.jpg'},
  {name: 'Three of Pentacles', meaning: 'Collaboration, teamwork, learning', image: '/images/waite/cards/Pents03.jpg'},
  {name: 'Four of Pentacles', meaning: 'Security, control, conservatism', image: '/images/waite/cards/Pents04.jpg'},
  {name: 'Five of Pentacles', meaning: 'Hardship, insecurity, loss', image: '/images/waite/cards/Pents05.jpg'},
  {name: 'Six of Pentacles', meaning: 'Generosity, charity, sharing', image: '/images/waite/cards/Pents06.jpg'},
  {name: 'Seven of Pentacles', meaning: 'Patience, investment, perseverance', image: '/images/waite/cards/Pents07.jpg'},
  {name: 'Eight of Pentacles', meaning: 'Craftsmanship, skill development, dedication', image: '/images/waite/cards/Pents08.jpg'},
  {name: 'Nine of Pentacles', meaning: 'Independence, luxury, self-reliance', image: '/images/waite/cards/Pents09.jpg'},
  {name: 'Ten of Pentacles', meaning: 'Legacy, family, inheritance', image: '/images/waite/cards/Pents10.jpg'},
  {name: 'Page of Pentacles', meaning: 'Practicality, diligence, learning', image: '/images/waite/cards/Pents11.jpg'},
  {name: 'Knight of Pentacles', meaning: 'Efficiency, routine, responsibility', image: '/images/waite/cards/Pents12.jpg'},
  {name: 'Queen of Pentacles', meaning: 'Nurturing, practicality, security', image: '/images/waite/cards/Pents13.jpg'},
  {name: 'King of Pentacles', meaning: 'Abundance, security, leadership, pragmatism', image: '/images/waite/cards/Pents14.jpg'},

  // Wands
  {name: 'Ace of Wands', meaning: 'A new start, possibility, inspiration', image: '/images/waite/cards/Wands01.jpg'},
  {name: 'Two of Wands', meaning: 'Planning, decisions, direction', image: '/images/waite/cards/Wands02.jpg'},
  {name: 'Three of Wands', meaning: 'Progress, expansion, foresight', image: '/images/waite/cards/Wands03.jpg'},
  {name: 'Four of Wands', meaning: 'Celebration, harmony, home', image: '/images/waite/cards/Wands04.jpg'},
  {name: 'Five of Wands', meaning: 'Conflict, disagreement, competition', image: '/images/waite/cards/Wands05.jpg'},
  {name: 'Six of Wands', meaning: 'Victory, success, public recognition', image: '/images/waite/cards/Wands06.jpg'},
  {name: 'Seven of Wands', meaning: 'Challenge, standing your ground', image: '/images/waite/cards/Wands07.jpg'},
  {name: 'Eight of Wands', meaning: 'Speed, swift action, travel', image: '/images/waite/cards/Wands08.jpg'},
  {name: 'Nine of Wands', meaning: 'Resilience, perseverance, boundaries', image: '/images/waite/cards/Wands09.jpg'},
  {name: 'Ten of Wands', meaning: 'Burden, responsibility, completion', image: '/images/waite/cards/Wands10.jpg'},
  {name: 'Page of Wands', meaning: 'Inspiration, ideas, discovery', image: '/images/waite/cards/Wands11.jpg'},
  {name: 'Knight of Wands', meaning: 'Adventure, energy, passion', image: '/images/waite/cards/Wands12.jpg'},
  {name: 'Queen of Wands', meaning: 'Courage, confidence, independence', image: '/images/waite/cards/Wands13.jpg'},
  {name: 'King of Wands', meaning: 'Leadership, vision, charisma', image: '/images/waite/cards/Wands14.jpg'},
];

const HomePage = () => {
  const router = useRouter();
  const [randomCard, setRandomCard] = useState(null);

  useEffect(() => {
    // Select a random card on initial load
    setRandomCard(tarotCards[Math.floor(Math.random() * tarotCards.length)]);
  }, []);

  const drawCardSound = useCallback(() => {
    const audio = new Audio('/sounds/magic-chime-143234.mp3');
    audio.play().catch(error => console.error("Failed to play sound:", error));
  }, []);

  const handleStartReading = () => {
    drawCardSound();
    router.push('/select-spread');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
      <header className="text-center pt-12">
        <h1 className="text-4xl font-bold text-black mb-4" style={{ lineHeight: '1.2' }}>
          免费在线
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-purple-700">
             AI塔罗牌占卜
          </span>
        </h1>
        <p className="text-md text-black max-w-md mb-3" style={{ whiteSpace: 'pre-line', marginTop: '1.5rem', marginBottom: '1.25rem' }}>
          2025年在线  AI塔罗牌占卜
          超准AI塔罗牌占卜解读您的爱情事业学业运势
        </p>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center gap-8">
        {randomCard && (
          <Image
            src={randomCard.image}
            alt={randomCard.name}
            width={200}
            height={342}
            className="rounded-md shadow-lg"
            priority
            style={{ marginBottom: '0.75rem' }} // 0.75rem = 12px
          />
        )}
        <Button
          className="bg-gradient-to-r from-purple-500 to-purple-700 text-white rounded-full px-8 py-3 font-bold hover:shadow-lg transition-all"
          onClick={handleStartReading}
        >
          开始塔罗占卜 ✨
        </Button>
      </main>
    </div>
  );
};

export default HomePage;
