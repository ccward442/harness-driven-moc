/* work-log mockup seed data
 * 各画面共通で参照する基準値。日付は固定 (2026-05-27) で全画面整合性を保つ。
 */
window.MOCK_SEED = {
  product: 'work-log',
  version: '0.1 (Draft)',
  today: '2026-05-27',
  todayLabel: '2026年5月27日 (水)',
  currentUser: {
    id: 'usr-001',
    name: 'Taro Nakamura',
    shortName: 'Taro',
    initials: 'TN',
    email: 'taro@example.co.jp',
    role: 'user',
    avatarColor: 'linear-gradient(135deg, #5D87FF, #49BEFF)',
    timezone: 'Asia/Tokyo',
    theme: 'system',
  },
  notifications: 3,
  llm: {
    production: 'Gemini 3.5 Flash',
    development: 'Gemini 3.1 Flash-Lite',
  },
};
