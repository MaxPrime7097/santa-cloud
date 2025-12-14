// SantaCloud Mock API Service
// Ready for AWS API Gateway + Lambda integration

export interface Child {
  id: string;
  name: string;
  age: number;
  country: string;
  status: 'nice' | 'naughty';
  wishlist: string[];
  niceScore: number;
}

export interface Gift {
  id: string;
  childId: string;
  childName: string;
  giftName: string;
  status: 'manufacturing' | 'wrapping' | 'ready' | 'delivered';
  priority: 'low' | 'medium' | 'high';
}

export interface Reindeer {
  id: string;
  name: string;
  status: 'resting' | 'training' | 'flying';
  location: string;
  energyLevel: number;
}

export interface Letter {
  id: string;
  childName: string;
  message: string;
  receivedDate: string;
  replied: boolean;
}

export interface DashboardStats {
  totalChildren: number;
  niceChildren: number;
  naughtyChildren: number;
  giftsReady: number;
  giftsInProgress: number;
  activeReindeers: number;
  unreadLetters: number;
}

// Mock Data
const mockChildren: Child[] = [
  { id: '1', name: 'Emma Thompson', age: 7, country: 'USA', status: 'nice', wishlist: ['Teddy Bear', 'Art Set'], niceScore: 95 },
  { id: '2', name: 'Lucas Martin', age: 9, country: 'France', status: 'nice', wishlist: ['Lego Set', 'Soccer Ball'], niceScore: 88 },
  { id: '3', name: 'Sofia Garcia', age: 6, country: 'Spain', status: 'nice', wishlist: ['Doll House', 'Books'], niceScore: 92 },
  { id: '4', name: 'Oliver Brown', age: 8, country: 'UK', status: 'naughty', wishlist: ['Video Game', 'Skateboard'], niceScore: 45 },
  { id: '5', name: 'Yuki Tanaka', age: 5, country: 'Japan', status: 'nice', wishlist: ['Plushie', 'Puzzle'], niceScore: 98 },
  { id: '6', name: 'Ahmed Hassan', age: 10, country: 'Egypt', status: 'nice', wishlist: ['Telescope', 'Science Kit'], niceScore: 90 },
  { id: '7', name: 'Mia Anderson', age: 7, country: 'Sweden', status: 'naughty', wishlist: ['Tablet', 'Headphones'], niceScore: 38 },
  { id: '8', name: 'Noah Kim', age: 8, country: 'South Korea', status: 'nice', wishlist: ['Robot Kit', 'Books'], niceScore: 85 },
];

const mockGifts: Gift[] = [
  { id: '1', childId: '1', childName: 'Emma Thompson', giftName: 'Teddy Bear Deluxe', status: 'ready', priority: 'high' },
  { id: '2', childId: '2', childName: 'Lucas Martin', giftName: 'Lego City Set', status: 'wrapping', priority: 'high' },
  { id: '3', childId: '3', childName: 'Sofia Garcia', giftName: 'Victorian Doll House', status: 'manufacturing', priority: 'medium' },
  { id: '4', childId: '5', childName: 'Yuki Tanaka', giftName: 'Giant Totoro Plushie', status: 'ready', priority: 'high' },
  { id: '5', childId: '6', childName: 'Ahmed Hassan', giftName: 'Explorer Telescope', status: 'wrapping', priority: 'medium' },
  { id: '6', childId: '8', childName: 'Noah Kim', giftName: 'AI Robot Kit Pro', status: 'manufacturing', priority: 'medium' },
];

const mockReindeers: Reindeer[] = [
  { id: '1', name: 'Rudolph', status: 'resting', location: 'North Pole Stable', energyLevel: 100 },
  { id: '2', name: 'Dasher', status: 'training', location: 'Training Grounds', energyLevel: 85 },
  { id: '3', name: 'Dancer', status: 'training', location: 'Training Grounds', energyLevel: 90 },
  { id: '4', name: 'Prancer', status: 'resting', location: 'North Pole Stable', energyLevel: 75 },
  { id: '5', name: 'Vixen', status: 'flying', location: 'Test Route Alpha', energyLevel: 60 },
  { id: '6', name: 'Comet', status: 'resting', location: 'North Pole Stable', energyLevel: 95 },
  { id: '7', name: 'Cupid', status: 'training', location: 'Obstacle Course', energyLevel: 80 },
  { id: '8', name: 'Donner', status: 'resting', location: 'North Pole Stable', energyLevel: 88 },
  { id: '9', name: 'Blitzen', status: 'flying', location: 'Speed Test Track', energyLevel: 55 },
];

const mockLetters: Letter[] = [
  { id: '1', childName: 'Emma Thompson', message: 'Dear Santa, I have been very good this year! I helped my mom with chores every day and shared my toys with my little brother. I would love a teddy bear and art supplies. Thank you! Love, Emma', receivedDate: '2024-12-01', replied: true },
  { id: '2', childName: 'Lucas Martin', message: 'Cher Père Noël, Je voudrais un set Lego et un ballon de foot. Merci beaucoup!', receivedDate: '2024-12-05', replied: false },
  { id: '3', childName: 'Yuki Tanaka', message: 'Dear Santa-san, I wish for a big plushie and puzzles. I will leave cookies for you!', receivedDate: '2024-12-08', replied: false },
];

// Simulated API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// API Functions
export const api = {
  // Dashboard
  async getDashboardStats(): Promise<DashboardStats> {
    await delay(500);
    const niceCount = mockChildren.filter(c => c.status === 'nice').length;
    const readyGifts = mockGifts.filter(g => g.status === 'ready').length;
    const activeReindeers = mockReindeers.filter(r => r.status !== 'resting').length;
    const unreadLetters = mockLetters.filter(l => !l.replied).length;
    
    return {
      totalChildren: mockChildren.length,
      niceChildren: niceCount,
      naughtyChildren: mockChildren.length - niceCount,
      giftsReady: readyGifts,
      giftsInProgress: mockGifts.length - readyGifts,
      activeReindeers,
      unreadLetters,
    };
  },

  // Children
  async getChildren(): Promise<Child[]> {
    await delay(400);
    return [...mockChildren];
  },

  async getChild(id: string): Promise<Child | undefined> {
    await delay(300);
    return mockChildren.find(c => c.id === id);
  },

  async searchChildren(query: string): Promise<Child[]> {
    await delay(300);
    const lowerQuery = query.toLowerCase();
    return mockChildren.filter(c => 
      c.name.toLowerCase().includes(lowerQuery) ||
      c.country.toLowerCase().includes(lowerQuery)
    );
  },

  // Gifts
  async getGifts(): Promise<Gift[]> {
    await delay(400);
    return [...mockGifts];
  },

  async updateGiftStatus(id: string, status: Gift['status']): Promise<Gift | undefined> {
    await delay(300);
    const gift = mockGifts.find(g => g.id === id);
    if (gift) {
      gift.status = status;
    }
    return gift;
  },

  // Reindeers
  async getReindeers(): Promise<Reindeer[]> {
    await delay(400);
    return [...mockReindeers];
  },

  async updateReindeerStatus(id: string, status: Reindeer['status']): Promise<Reindeer | undefined> {
    await delay(300);
    const reindeer = mockReindeers.find(r => r.id === id);
    if (reindeer) {
      reindeer.status = status;
    }
    return reindeer;
  },

  // Letters
  async getLetters(): Promise<Letter[]> {
    await delay(400);
    return [...mockLetters];
  },

  async generateMagicReply(childName: string, originalMessage: string): Promise<string> {
    await delay(1500); // Simulate AI processing
    
    const replies = [
      `Ho Ho Ho, dear ${childName}! 🎅\n\nThank you so much for your wonderful letter! Mrs. Claus and I read every word, and the elves were so happy to hear from you.\n\nI've noted your wishes in my special book, and I can see you've been working very hard to be on the Nice List. Keep up the wonderful work!\n\nRemember to leave out some cookies and milk on Christmas Eve, and don't forget the carrots for my reindeer - especially Rudolph, he loves them!\n\nWith lots of Christmas magic and joy,\n🎄 Santa Claus`,
      
      `Dear ${childName}, Ho Ho Ho! 🎁\n\nWhat a lovely letter you've sent to the North Pole! It made its way through the magical mailbox just perfectly.\n\nI've been watching, and I must say - you've been doing a fantastic job this year! The elves are already working on something very special for you.\n\nDon't forget to dream of sugarplums and be kind to everyone around you. That's the true Christmas spirit!\n\nSending you warm hugs from the North Pole,\n🦌 Santa & the Reindeer Team`,
    ];
    
    return replies[Math.floor(Math.random() * replies.length)];
  },

  // Gift Progress Stats
  async getGiftProgressStats(): Promise<{ label: string; value: number; color: string }[]> {
    await delay(300);
    const stats = {
      manufacturing: mockGifts.filter(g => g.status === 'manufacturing').length,
      wrapping: mockGifts.filter(g => g.status === 'wrapping').length,
      ready: mockGifts.filter(g => g.status === 'ready').length,
      delivered: mockGifts.filter(g => g.status === 'delivered').length,
    };
    
    return [
      { label: 'Manufacturing', value: stats.manufacturing, color: 'hsl(38 92% 50%)' },
      { label: 'Wrapping', value: stats.wrapping, color: 'hsl(0 76% 42%)' },
      { label: 'Ready', value: stats.ready, color: 'hsl(144 61% 20%)' },
      { label: 'Delivered', value: stats.delivered, color: 'hsl(142 76% 36%)' },
    ];
  },
};
