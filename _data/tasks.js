/* work-log tasks (24件) — 要件書 7.2 の Task エンティティ
 * status: todo | doing | done
 * 期日は seed.today (2026-05-27) を基準
 */
window.MOCK_TASKS = [
  // === work-log MVP 開発 (pj-001) ===
  { id: 't-001', projectId: 'pj-001', title: 'ER 図を Mermaid 化して要件書に貼る', status: 'done', due: null, completedAt: '2026-05-27 16:42', comments: 4, history: 3 },
  { id: 't-002', projectId: 'pj-001', title: 'Supabase RLS ポリシー方針を整理', status: 'done', due: null, completedAt: '2026-05-27 15:10', comments: 2, history: 2 },
  { id: 't-003', projectId: 'pj-001', title: '8エンティティの確定とドキュメント化', status: 'done', due: null, completedAt: '2026-05-26', comments: 5, history: 4 },
  { id: 't-004', projectId: 'pj-001', title: '画面一覧 S-01〜S-10 の洗い出し', status: 'done', due: null, completedAt: '2026-05-25', comments: 1, history: 2 },
  { id: 't-005', projectId: 'pj-001', title: 'ヒアリングシート完成', status: 'done', due: null, completedAt: '2026-05-25', comments: 0, history: 1 },
  { id: 't-006', projectId: 'pj-001', title: '画面遷移図のレビュー依頼を出す', status: 'todo', due: '2026-05-28', comments: 2, history: 1 },
  { id: 't-007', projectId: 'pj-001', title: 'DiaryEntry のスキーマ確定 (UNIQUE 制約含む)', status: 'todo', due: '2026-06-02', comments: 0, history: 0 },
  { id: 't-008', projectId: 'pj-001', title: 'Vercel 環境変数の整理 (Gemini API キー)', status: 'todo', due: '2026-06-05', comments: 1, history: 0 },

  // === UI 検証 (pj-004) ===
  { id: 't-009', projectId: 'pj-004', title: 'Modernize テンプレのレイアウト調査', status: 'doing', due: '2026-05-27 18:00', dueSoon: true, comments: 3, history: 2 },
  { id: 't-010', projectId: 'pj-004', title: 'Tabler Icons を採用しサイドバを再設計', status: 'done', due: null, completedAt: '2026-05-24', comments: 1, history: 1 },

  // === AI 基盤 (pj-002 / pj-003) ===
  { id: 't-011', projectId: 'pj-002', title: 'Gemini API のレート制限を一覧化', status: 'doing', due: '2026-05-27 17:00', overdue: true, comments: 1, history: 1 },
  { id: 't-012', projectId: 'pj-002', title: 'Claude Code ハーネスの README 更新', status: 'todo', due: '2026-06-02', comments: 0, history: 0 },
  { id: 't-013', projectId: 'pj-003', title: 'Claude API のキャッシュ機構を検証', status: 'todo', due: '2026-06-08', comments: 0, history: 0 },

  // === 過去 ===
  { id: 't-014', projectId: 'pj-001', title: 'ヒアリング第2回 (主に画面要件)', status: 'done', due: null, completedAt: '2026-05-23', comments: 3, history: 2 },
  { id: 't-015', projectId: 'pj-002', title: 'init-project.sh の動作確認', status: 'done', due: null, completedAt: '2026-05-22', comments: 2, history: 1 },
];
