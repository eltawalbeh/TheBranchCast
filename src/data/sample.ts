export const org = {
  name: 'Luma Coffee Co.',
  type: 'Multi-location specialty coffee brand',
  region: 'Jordan',
  timezone: 'Asia/Amman',
  activeLocations: 6,
  audioZones: 10,
  playersPaired: 10,
  playersOnline: 9,
  playerNeedsAttention: 1,
  unpairedZones: 1,
};

export const currentUser = {
  name: 'Amina Khalil',
  initials: 'AK',
  role: 'Organization Owner',
  email: 'amina@lumacoffee.example',
  scope: 'All locations',
};

export type PlayerStatus = 'Online' | 'Offline' | 'Not Paired' | 'Syncing';

export interface Zone {
  location: string;
  zone: string;
  player: string;
  status: PlayerStatus;
  nowPlaying: string;
  campaign: string | null;
  lastSeen: string;
}

export const zones: Zone[] = [
  { location: 'Luma Coffee — Abdali', zone: 'Main Floor', player: 'BC-ABD-01', status: 'Online', nowPlaying: 'Morning Rhythm Playlist', campaign: 'Autumn Iced Latte', lastSeen: '2 min ago' },
  { location: 'Luma Coffee — Abdali', zone: 'Terrace', player: 'Not paired', status: 'Not Paired', nowPlaying: 'No schedule', campaign: null, lastSeen: '—' },
  { location: 'Luma Coffee — Sweifieh', zone: 'Main Floor', player: 'BC-SWF-01', status: 'Offline', nowPlaying: 'Unknown', campaign: null, lastSeen: '18 min ago' },
  { location: 'Luma Coffee — Sweifieh', zone: 'Counter', player: 'BC-SWF-02', status: 'Online', nowPlaying: 'Calm Focus Playlist', campaign: null, lastSeen: '3 min ago' },
  { location: 'Luma Coffee — Khalda', zone: 'Main Floor', player: 'BC-KHD-01', status: 'Online', nowPlaying: 'Morning Rhythm Playlist', campaign: 'Autumn Iced Latte', lastSeen: '1 min ago' },
  { location: 'Luma Coffee — Jabal Amman', zone: 'Main Floor', player: 'BC-JAM-01', status: 'Online', nowPlaying: 'Afternoon Lift Playlist', campaign: 'Autumn Iced Latte', lastSeen: '4 min ago' },
  { location: 'Luma Coffee — Dabouq', zone: 'Main Floor', player: 'BC-DBQ-01', status: 'Online', nowPlaying: 'Calm Focus Playlist', campaign: 'Autumn Iced Latte', lastSeen: '2 min ago' },
  { location: 'Luma Coffee — Irbid', zone: 'Main Floor', player: 'BC-IRB-01', status: 'Online', nowPlaying: 'Morning Rhythm Playlist', campaign: null, lastSeen: '2 min ago' },
  { location: 'Luma Coffee — Irbid', zone: 'Terrace', player: 'BC-IRB-02', status: 'Online', nowPlaying: 'Afternoon Lift Playlist', campaign: null, lastSeen: '5 min ago' },
  { location: 'Luma Coffee — Abdoun', zone: 'Main Floor', player: 'BC-ABD-02', status: 'Online', nowPlaying: 'Morning Rhythm Playlist', campaign: null, lastSeen: '1 min ago' },
];

export const nowPlayingRows = zones.slice(0, 5);

export const playlists = [
  { name: 'Morning Rhythm Playlist', status: 'Approved', usage: '4 zones' },
  { name: 'Calm Focus Playlist', status: 'Approved', usage: '2 zones' },
  { name: 'Afternoon Lift Playlist', status: 'Approved', usage: '2 zones' },
  { name: 'Evening Wind Down Playlist', status: 'Draft', usage: 'Not scheduled' },
];

export interface Campaign {
  name: string;
  status: string;
  dateRange: string;
  target: string;
  zones: string;
  scheduleState: string;
  cta: string;
  ctaRoute: string;
}

export const campaigns: Campaign[] = [
  {
    name: 'Autumn Iced Latte',
    status: 'Active',
    dateRange: '20–30 Sep 2026',
    target: '4 locations',
    zones: '6 zones',
    scheduleState: 'Scheduled in 6 zones',
    cta: 'View campaign',
    ctaRoute: '/campaigns/autumn-iced-latte',
  },
  {
    name: 'Weekend Brunch Reminder',
    status: 'Ready to schedule',
    dateRange: '27–29 Sep 2026',
    target: '2 locations',
    zones: '3 zones',
    scheduleState: 'Not yet scheduled',
    cta: 'Review schedule',
    ctaRoute: '/campaigns/weekend-brunch-reminder',
  },
];

export const alerts = [
  {
    id: 1,
    priority: 'High' as const,
    location: 'Sweifieh',
    zone: 'Main Floor',
    problem: 'Player is offline. Last seen 18 min ago.',
    nextAction: 'View player',
    nextActionRoute: '/locations/sweifieh/player',
  },
  {
    id: 2,
    priority: 'Medium' as const,
    location: 'Abdali',
    zone: 'Terrace',
    problem: 'No player paired to this zone.',
    nextAction: 'Pair player',
    nextActionRoute: '/locations/abdali/pair',
  },
];

export const activityTimeline = [
  { id: 1, time: '12 min ago', event: 'Amina Khalil created Weekend Brunch Reminder.' },
  { id: 2, time: '18 min ago', event: 'Sweifieh Main Floor Player reported offline.' },
  { id: 3, time: '1 hr ago', event: 'Operations updated Abdali Main Floor schedule.' },
  { id: 4, time: 'Yesterday', event: 'Terrace Zone was added to Abdali.' },
  { id: 5, time: 'Yesterday', event: 'Morning Rhythm Playlist was updated.' },
];

export const networkMetrics = [
  { label: 'Active locations', metric: '6 of 6', context: 'All locations configured', status: 'neutral' as const },
  { label: 'Players online', metric: '9 of 10', context: 'One requires attention', status: 'warning' as const },
  { label: 'Active campaigns', metric: '2', context: 'One starts tomorrow', status: 'info' as const },
  { label: 'Playback coverage', metric: '96%', context: 'Last 7 days, simulated', status: 'success' as const },
];
