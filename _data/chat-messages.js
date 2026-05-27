/* work-log AI 壁打ちチャットメッセージ サンプル */
window.MOCK_CHAT_MESSAGES = [
  { id: 'm-001', sessionId: 'cs-001', role: 'assistant', content: 'お疲れさまでした。今日完了したタスクが 5 件、進行中が 2 件、コメントが 12 件ありますね。まずは「やったこと(Y)」から聞かせてください。今日一番進捗を感じた仕事はなんですか?', createdAt: '2026-05-27 17:31' },
  { id: 'm-002', sessionId: 'cs-001', role: 'user', content: '要件定義書 v0.1 のドラフトが書き終わったこと。ER 図と画面遷移を Mermaid で描いたのも大きい。', createdAt: '2026-05-27 17:33' },
  { id: 'm-003', sessionId: 'cs-001', role: 'assistant', content: '要件書のドラフト完了、お疲れさまでした。ちなみに Supabase RLS のコメント (タスク t-002) も今日終わってますね。これは要件書の中で言及されましたか? — 次に「わかったこと(W)」を伺います。今日の作業で「あ、これはこういうことだったのか」と気づいたことはありますか?', createdAt: '2026-05-27 17:34' },
  { id: 'm-004', sessionId: 'cs-001', role: 'user', content: 'RLS は auth.uid() を user_id に縛れば全テーブルほぼ一律でいける、というのが大きい気づき。あと TaskHistory を Audit Log の代替にする設計判断もできた。', createdAt: '2026-05-27 17:36' },
  { id: 'm-005', sessionId: 'cs-001', role: 'assistant', content: '良い気づきですね。RLS の auth.uid 縛りは初期コストを下げる重要判断です。TaskHistory の件は、admin ロール導入時にも引き継げますか? — 最後に「つぎやること(T)」。明日以降のアクションは?', createdAt: '2026-05-27 17:37' },
  { id: 'm-006', sessionId: 'cs-001', role: 'user', content: 'PM レビュー依頼を出す、ハーネスのモック生成スクリプトを動かす、Gemini API のレート制限調査を続ける、の 3 つ。', createdAt: '2026-05-27 17:39' },
  { id: 'm-007', sessionId: 'cs-001', role: 'assistant', content: '日報案ができました。Y/W/T の 3 セクションで以下のとおりまとめました。内容を確認していただき、編集 → 確定 を押すと DiaryEntry に保存されます。', createdAt: '2026-05-27 17:40' },
];
