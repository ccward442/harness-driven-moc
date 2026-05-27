/* work-log mockup runtime
 * Toast / Modal / Sidebar drawer / フォーム submit / 削除確認 / 行クリック遷移 / 未実装 / 絞り込み
 * 任意のHTMLが <script src="_shared.js"></script> を読むだけで利用可能。
 */
(function () {
  'use strict';

  // ===== Auth (mock) =====
  // localStorage に擬似セッションを保存。本番では Supabase Auth に置き換わる箇所。
  const AUTH_KEY = 'work_log_mock_session';
  // ログイン不要で見られるページ (ファイル名から .html を除いた値)
  const PUBLIC_PAGES = new Set(['s-01-login', 'index']);

  function currentScreen() {
    return (location.pathname.split('/').pop() || 'index.html').replace(/\.html$/, '');
  }
  function getSession() {
    try { return JSON.parse(localStorage.getItem(AUTH_KEY) || 'null'); } catch (_) { return null; }
  }
  function setSession(user) {
    localStorage.setItem(AUTH_KEY, JSON.stringify({
      user: user || { name: 'Taro Nakamura', initials: 'TN', email: 'taro@example.co.jp' },
      loggedInAt: new Date().toISOString(),
    }));
  }
  function clearSession() { localStorage.removeItem(AUTH_KEY); }

  window.Auth = {
    isLoggedIn: () => !!getSession(),
    getUser: () => (getSession() || {}).user || null,
    login(user) {
      setSession(user);
      window.toast && toast.success('サインインしました');
      setTimeout(() => location.href = 's-02-dashboard.html', 600);
    },
    logout() {
      clearSession();
      window.toast && toast.info('ログアウトしました');
      setTimeout(() => location.href = 's-01-login.html', 500);
    },
  };

  // 認証ガード (即時、DOMContentLoadedを待たない)
  (function guard() {
    const screen = currentScreen();
    const logged = !!getSession();
    if (screen === 's-01-login' && logged) {
      location.replace('s-02-dashboard.html'); // ログイン済みでログイン画面 → ダッシュへ
    } else if (!PUBLIC_PAGES.has(screen) && !logged) {
      location.replace('s-01-login.html');     // 未ログインで保護画面 → ログインへ
    }
  })();

  // ===== Toast =====
  function showToast(message, kind) {
    const root = document.getElementById('toastContainer');
    if (!root) return;
    const icon = kind === 'success' ? 'ti-circle-check'
               : kind === 'error'   ? 'ti-alert-circle'
               : kind === 'info'    ? 'ti-info-circle' : 'ti-info-circle';
    const el = document.createElement('div');
    el.className = 'toast toast-' + (kind || 'info');
    el.innerHTML = `<i class="ti ${icon}"></i><span>${message}</span>`;
    root.appendChild(el);
    setTimeout(() => {
      el.style.transition = 'opacity 0.3s, transform 0.3s';
      el.style.opacity = 0;
      el.style.transform = 'translateX(20px)';
      setTimeout(() => el.remove(), 320);
    }, 3000);
  }
  window.toast = {
    success: (m) => showToast(m, 'success'),
    error:   (m) => showToast(m, 'error'),
    info:    (m) => showToast(m, 'info'),
  };

  // ===== Modal =====
  window.Modal = {
    open(html, opts) {
      opts = opts || {};
      let root = document.getElementById('modalRoot');
      if (!root) {
        root = document.createElement('div');
        root.id = 'modalRoot';
        root.className = 'modal-root';
        document.body.appendChild(root);
      }
      root.className = 'modal-root';
      root.innerHTML = `
        <div class="modal-card" role="dialog" aria-modal="true">
          ${opts.title ? `<header>${opts.icon ? `<i class="ti ${opts.icon}"></i>` : ''}<span>${opts.title}</span></header>` : ''}
          <div class="modal-body">${html}</div>
          <footer>
            <button class="btn ghost" onclick="Modal.close()">${opts.cancelLabel || 'キャンセル'}</button>
            <button class="btn ${opts.confirmClass || 'primary'}" id="modalConfirmBtn">${opts.confirmLabel || 'OK'}</button>
          </footer>
        </div>`;
      const btn = root.querySelector('#modalConfirmBtn');
      if (btn && typeof opts.onConfirm === 'function') {
        btn.addEventListener('click', () => {
          opts.onConfirm();
          if (opts.autoClose !== false) Modal.close();
        });
      } else if (btn) {
        btn.addEventListener('click', () => Modal.close());
      }
      root.style.display = 'grid';
      root.onclick = (e) => { if (e.target === root) Modal.close(); };
      document.addEventListener('keydown', Modal._esc);
    },
    close() {
      const root = document.getElementById('modalRoot');
      if (!root) return;
      root.style.display = 'none';
      root.innerHTML = '';
      document.removeEventListener('keydown', Modal._esc);
    },
    confirm(message, onYes, opts) {
      opts = opts || {};
      this.open(`<p style="margin:0; color:var(--text);">${message}</p>`, {
        title: opts.title || '確認',
        icon: opts.icon || 'ti-help-circle',
        confirmLabel: opts.confirmLabel || 'はい',
        cancelLabel: opts.cancelLabel || 'いいえ',
        confirmClass: opts.confirmClass || 'primary',
        onConfirm: onYes,
      });
    },
    _esc(e) { if (e.key === 'Escape') Modal.close(); },
  };

  // ===== Sidebar drawer =====
  window.toggleSidebar = function () {
    const sb = document.getElementById('sidebar');
    const ov = document.getElementById('drawerOverlay');
    if (!sb) return;
    sb.classList.toggle('open');
    if (ov) ov.classList.toggle('open');
  };

  // ===== Page init =====
  document.addEventListener('DOMContentLoaded', () => {

    // (1) フォーム submit インターセプタ
    // <form data-mock-submit="保存しました" data-mock-redirect="dashboard.html">
    document.querySelectorAll('form[data-mock-submit]').forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!form.checkValidity()) { form.reportValidity(); return; }
        toast.success(form.dataset.mockSubmit || '保存しました');
        const redirect = form.dataset.mockRedirect;
        if (redirect) setTimeout(() => location.href = redirect, 700);
      });
    });

    // (2) 「未実装」 — クリックでInfoトースト
    document.querySelectorAll('[data-action="not-implemented"]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        toast.info('プロトタイプでは未実装の機能です');
      });
    });

    // (3) 削除確認 — Modalで確認後、行削除+toast
    // <button data-action="delete" data-target="タスク名" data-redirect="list.html">削除</button>
    document.querySelectorAll('[data-action="delete"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const name = btn.dataset.target || 'この項目';
        Modal.confirm(`「${name}」を削除します。よろしいですか?`, () => {
          toast.success('削除しました');
          const row = btn.closest('tr, .task-card, .diary-item, .list-row');
          if (row) row.remove();
          const redirect = btn.dataset.redirect;
          if (redirect) setTimeout(() => location.href = redirect, 600);
        }, { confirmLabel: '削除', confirmClass: 'danger', icon: 'ti-alert-triangle', title: '削除確認' });
      });
    });

    // (4) Success アクション — トースト + 任意遷移
    // <button data-action="save" data-message="保存しました" data-redirect="next.html">
    document.querySelectorAll('[data-action="save"], [data-action="success"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        toast.success(btn.dataset.message || '保存しました');
        const redirect = btn.dataset.redirect;
        if (redirect) setTimeout(() => location.href = redirect, 700);
      });
    });

    // (5) Info アクション
    document.querySelectorAll('[data-action="info"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        toast.info(btn.dataset.message || '実行しました');
      });
    });

    // (6) 行クリック遷移
    // <tr data-href="detail.html"> / .task-card[data-href]
    document.querySelectorAll('[data-href]').forEach(row => {
      row.style.cursor = 'pointer';
      row.addEventListener('click', (e) => {
        if (e.target.closest('button, a, input, select, textarea, label')) return;
        location.href = row.dataset.href;
      });
    });

    // (7) テーブル/リスト絞り込み
    // <input data-filter-target="#diaryList" data-filter-item=".diary-item">
    document.querySelectorAll('input[data-filter-target]').forEach(input => {
      const target = document.querySelector(input.dataset.filterTarget);
      const itemSel = input.dataset.filterItem || 'tbody tr';
      if (!target) return;
      input.addEventListener('input', () => {
        const q = input.value.toLowerCase();
        target.querySelectorAll(itemSel).forEach(it => {
          it.style.display = it.textContent.toLowerCase().includes(q) ? '' : 'none';
        });
      });
    });

    // (8) ESC でドロワ閉じる
    document.addEventListener('keydown', (e) => {
      if (e.key !== 'Escape') return;
      const sb = document.getElementById('sidebar');
      if (sb && sb.classList.contains('open')) toggleSidebar();
    });

    // (9) サイドバ内リンククリック (モバイル時にドロワを閉じる)
    document.querySelectorAll('.sidebar .nav-item').forEach(a => {
      a.addEventListener('click', () => {
        if (window.innerWidth < 1024) {
          const sb = document.getElementById('sidebar');
          if (sb && sb.classList.contains('open')) {
            // 遷移を視覚的にスムーズに
            toggleSidebar();
          }
        }
      });
    });

    // (10) 「日報作る」CTA(work-log 固有)— チャット画面へ遷移
    document.querySelectorAll('[data-action="start-diary"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        toast.info('当日のタスクを集計しています...');
        setTimeout(() => location.href = btn.dataset.redirect || 's-06-chat.html', 700);
      });
    });

    // (11) ログイン
    document.querySelectorAll('[data-action="login"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        Auth.login();
      });
    });

    // (12) ログアウト (確認モーダル付き)
    document.querySelectorAll('[data-action="logout"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        Modal.confirm('ログアウトしますか?', () => Auth.logout(), {
          title: 'ログアウト確認', icon: 'ti-logout',
          confirmLabel: 'ログアウト', confirmClass: 'danger',
        });
      });
    });

    // (13) アバタークリック → ユーザメニュー (ログアウト含む)
    document.querySelectorAll('.avatar[data-action="info"]').forEach(av => {
      // 既存の info ハンドラを上書きするため、cloneして再バインド
      const fresh = av.cloneNode(true);
      av.parentNode.replaceChild(fresh, av);
      fresh.addEventListener('click', (e) => {
        e.preventDefault();
        const user = Auth.getUser() || { name: 'ゲスト', email: '' };
        Modal.open(`
          <div style="display:flex; align-items:center; gap:12px; margin-bottom:8px;">
            <div class="avatar lg">${user.initials || 'U'}</div>
            <div>
              <div style="font-weight:700;">${user.name}</div>
              <div style="font-size:12px; color:var(--text-muted);">${user.email || ''}</div>
            </div>
          </div>
          <hr style="border:none; border-top:1px solid var(--border); margin:12px 0;" />
          <a href="s-10-settings.html" style="display:block; padding:8px 0; color:var(--text);"><i class="ti ti-settings"></i> 設定</a>
          <a href="#" id="userMenuLogout" style="display:block; padding:8px 0; color:var(--error);"><i class="ti ti-logout"></i> ログアウト</a>
        `, {
          title: 'アカウント', icon: 'ti-user-circle',
          confirmLabel: '閉じる', cancelLabel: null,
        });
        // 「キャンセル」ボタンを隠して「閉じる」だけに
        const root = document.getElementById('modalRoot');
        const cancelBtn = root && root.querySelector('footer .btn.ghost');
        if (cancelBtn) cancelBtn.style.display = 'none';
        const lo = document.getElementById('userMenuLogout');
        if (lo) lo.addEventListener('click', (ev) => {
          ev.preventDefault();
          Modal.close();
          setTimeout(() => Auth.logout(), 80);
        });
      });
    });
  });

  // ===== Mock data ローダ =====
  window.MockData = {
    seed: window.MOCK_SEED || null,
    tasks: window.MOCK_TASKS || null,
    projects: window.MOCK_PROJECTS || null,
    diaryEntries: window.MOCK_DIARY_ENTRIES || null,
    chatMessages: window.MOCK_CHAT_MESSAGES || null,
    comments: window.MOCK_COMMENTS || null,
  };
})();
