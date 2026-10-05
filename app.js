/**
 * DSA Tracker — Main Application Logic
 * ─────────────────────────────────────
 * Decoupled UI Renderer with Polish Pass:
 * - Single-row compact TOC strip (Task 1: Slim, horizontally scrollable on mobile)
 * - Vector SVG Icons Library (Task 2: No Emojis, currentColor adaptive, Lucide vectors)
 * - Decoupled content modules (window.LESSONS_CONTENT)
 * - Definition-Style Format & Interactive Big-O Explorer
 * - Concept & Questions Two-Tab Split with URL State Sync
 * - Full-Width Responsive Layout (75ch paragraph readable max-width)
 */

(function () {
  'use strict';

  /* ────────── Vector SVG Icons Library (Task 2 Spec) ────────── */
  const SVG_ICONS = {
    checkCircle: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
    lock: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
    bookOpen: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`,
    helpCircle: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>`,
    eye: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>`,
    eyeOff: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" y1="2" x2="22" y2="22"/></svg>`,
    penTool: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>`,
    alertTriangle: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
    flame: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 3z"/></svg>`,
    sun: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`,
    moon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`,
    bookmark: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m19 21-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>`,
    zap: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
    globe: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
    trendingUp: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>`,
    film: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="2" y1="7" x2="7" y2="7"/><line x1="2" y1="17" x2="7" y2="17"/><line x1="17" y1="17" x2="22" y2="17"/><line x1="17" y1="7" x2="22" y2="7"/></svg>`,
    code: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
    chevronDown: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>`
  };

  const IS_LOCAL_HOST = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  const API_BASE = (window.ENV && window.ENV.API_BASE_URL) 
    ? window.ENV.API_BASE_URL 
    : (IS_LOCAL_HOST ? 'http://localhost:3001/api' : 'https://dsa-be-i1c6.onrender.com/api');
  const GOOGLE_CLIENT_ID = (window.ENV && window.ENV.GOOGLE_CLIENT_ID) || '';
  const TOAST_DURATION = 2400;

  /* ────────── DOM Elements ────────── */
  const $main = document.getElementById('main-content');
  const $progressText = document.getElementById('progress-text');
  const $progressFill = document.getElementById('progress-fill');
  const $progressBar = document.getElementById('progress-bar');
  const $toast = document.getElementById('toast');

  // Sidebar
  const $sidebar = document.getElementById('sidebar');
  const $sidebarNav = document.getElementById('sidebar-nav');
  const $sidebarOverlay = document.getElementById('sidebar-overlay');
  const $btnSidebarToggle = document.getElementById('sidebar-toggle-btn');
  const $btnSidebarClose = document.getElementById('sidebar-close');

  // Theme
  const $btnTheme = document.getElementById('btn-theme');
  const $themeIcon = document.getElementById('theme-icon');

  // Export & Import Modals
  const $btnExport = document.getElementById('btn-export');
  const $modalExport = document.getElementById('modal-export-overlay');
  const $exportTextarea = document.getElementById('export-textarea');
  const $btnExportCopy = document.getElementById('btn-export-copy');
  const $btnExportClose = document.getElementById('btn-export-close');

  const $btnImport = document.getElementById('btn-import');
  const $modalImport = document.getElementById('modal-import-overlay');
  const $importTextarea = document.getElementById('import-textarea');
  const $btnImportApply = document.getElementById('btn-import-apply');
  const $btnImportClose = document.getElementById('btn-import-close');

  // Reset & Header Logo
  const $btnReset = document.getElementById('btn-reset');
  const $headerLogo = document.getElementById('header-logo');

  // Mobile Hamburger
  const $hamburger = document.getElementById('hamburger-btn');
  const $headerActions = document.getElementById('header-actions');

  /* ────────── Auth & Progress Sync State ────────── */
  const _storedToken = localStorage.getItem('dsa_access_token') || sessionStorage.getItem('dsa_access_token');
  const _storedUserRaw = localStorage.getItem('dsa_user');
  let _storedUser = null;
  try {
    if (_storedUserRaw) _storedUser = JSON.parse(_storedUserRaw);
  } catch (e) {}
  const _hasSession = localStorage.getItem('dsa_has_session') === 'true';

  let authState = {
    user: _storedUser,
    accessToken: _storedToken || null,
    isLoggedIn: !!(_storedToken && _hasSession)
  };

  let pendingAction = null;
  let cooldownTimerInterval = null;

  /* ────────── App State ────────── */
  let topicsData = [];
  let progressMap = {};
  let currentView = 'grid'; // 'grid' | 'lesson'
  let currentTopicId = null;
  let activeTab = 'concept'; // 'concept' | 'questions'
  let justUnlockedIds = new Set();
  let activeNotationId = null;
  let scrollObserver = null;

  /* ────────────────────────────────────────────
     AUTHENTICATION & API CLIENT WRAPPER
  ──────────────────────────────────────────── */
  async function fetchWithAuth(url, options = {}) {
    const opts = { ...options };
    opts.headers = opts.headers || {};
    opts.credentials = 'include'; // Include refresh cookie

    if (authState.accessToken) {
      opts.headers['Authorization'] = `Bearer ${authState.accessToken}`;
    }

    if (opts.body && typeof opts.body === 'object' && !(opts.body instanceof FormData)) {
      opts.headers['Content-Type'] = 'application/json';
      opts.body = JSON.stringify(opts.body);
    }

    const res = await fetch(url, opts);

    if (res.status === 401) {
      let body = null;
      try {
        body = await res.clone().json();
      } catch (e) { }

      // Section 3 & 4 contract: AUTH_TOKEN_REQUIRED
      if (body && body.error && body.error.code === 'AUTH_TOKEN_REQUIRED') {
        clearAuthState();
        openLoginModal('Log in to save your progress');
        throw new Error('AUTH_TOKEN_REQUIRED');
      }
    }

    return res;
  }

  function clearAuthState() {
    authState.user = null;
    authState.accessToken = null;
    authState.isLoggedIn = false;
    localStorage.removeItem('dsa_access_token');
    localStorage.removeItem('dsa_user');
    localStorage.removeItem('dsa_has_session');
    sessionStorage.removeItem('dsa_access_token');
    progressMap = {};
    if (topicsData && topicsData.length > 0) {
      topicsData.forEach(t => { progressMap[t.id] = false; });
    }
    saveProgress();
    renderHeaderAuthUI();
    render();
  }

  async function initAuthSession() {
    const hasSessionFlag = localStorage.getItem('dsa_has_session') === 'true';
    const tokenExists = !!(localStorage.getItem('dsa_access_token') || sessionStorage.getItem('dsa_access_token'));

    if (!hasSessionFlag && !tokenExists) {
      clearAuthState();
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/auth/refresh`, {
        method: 'POST',
        credentials: 'include'
      });
      if (res.ok) {
        const data = await res.json();
        authState.accessToken = data.accessToken;
        if (data.user) {
          authState.user = data.user;
          localStorage.setItem('dsa_user', JSON.stringify(data.user));
        }
        authState.isLoggedIn = true;
        localStorage.setItem('dsa_access_token', data.accessToken);
        localStorage.setItem('dsa_has_session', 'true');
        renderHeaderAuthUI();
        await syncProgressWithServer();
      } else if (authState.accessToken) {
        // Access token persists in localStorage, sync progress directly
        await syncProgressWithServer();
      } else {
        clearAuthState();
      }
    } catch (err) {
      if (authState.accessToken) {
        await syncProgressWithServer();
      } else {
        clearAuthState();
      }
    }
  }

  async function syncProgressWithServer() {
    if (!authState.isLoggedIn) return;
    try {
      const res = await fetchWithAuth(`${API_BASE}/progress`);
      const data = await res.json();
      if (data.completedTopicIds && Array.isArray(data.completedTopicIds)) {
        const completedSet = new Set(data.completedTopicIds);
        topicsData.forEach(t => {
          progressMap[t.id] = completedSet.has(t.id);
        });
        saveProgress();
        render();
      }
    } catch (err) {
      console.warn('Could not sync progress with server:', err);
    }
  }

  async function handleTopicCompletionToggle(topicId, forcedState = null) {
    const currentState = isCompleted(topicId);
    const nextState = forcedState !== null ? forcedState : !currentState;

    if (!authState.isLoggedIn) {
      openLoginModal('Log in with Google to save your progress');
      pendingAction = { type: 'toggle_topic', topicId, intendedState: nextState };
      return;
    }

    // Optimistic UI update
    progressMap[topicId] = nextState;
    if (nextState) {
      justUnlockedIds.add(topicId);
    }
    saveProgress();
    render();

    try {
      const res = await fetchWithAuth(`${API_BASE}/progress/${topicId}`, {
        method: 'PATCH',
        body: { completed: nextState }
      });
      if (!res.ok) {
        throw new Error('Failed to save progress');
      }
      showToast(nextState ? 'Progress saved to account!' : 'Topic marked incomplete.');
    } catch (err) {
      // Revert optimistic update if API call failed
      progressMap[topicId] = currentState;
      saveProgress();
      render();
      showToast('Could not save progress to account. Please check network.', 'warning');
    }
  }

  function renderHeaderAuthUI() {
    const $container = document.getElementById('header-auth-container');
    if (!$container) return;

    if (authState.isLoggedIn && !authState.user) {
      // Optimistic state: token exists but refresh not done yet
      $container.innerHTML = `<span style="font-size:0.82rem;color:var(--text-secondary);padding:4px 10px;">Loading...</span>`;
      return;
    }
    if (authState.isLoggedIn && authState.user) {
      $container.innerHTML = `
        <div style="display:flex;align-items:center;gap:8px;padding:4px 10px;border-radius:20px;background:var(--bg-surface-hover);border:1px solid var(--border-default);font-size:0.82rem;">
          <span style="width:24px;height:24px;border-radius:50%;background:var(--accent-gradient);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:0.75rem;">
            ${(authState.user.email || 'U')[0].toUpperCase()}
          </span>
          <span style="font-weight:600;max-width:110px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${escapeHtml(authState.user.email)}</span>
          <button id="btn-logout" class="btn btn--sm" style="padding:2px 8px;font-size:0.75rem;margin-left:4px;" title="Log out">Log out</button>
        </div>
      `;
      const logoutBtn = $container.querySelector('#btn-logout');
      if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
      }
    } else {
      $container.innerHTML = `
        <button id="btn-header-login" class="btn btn--primary" style="padding:6px 14px;font-size:0.84rem;font-weight:600;">Log in</button>
      `;
      const loginBtn = $container.querySelector('#btn-header-login');
      if (loginBtn) {
        loginBtn.addEventListener('click', () => openLoginModal('Log in to save your progress'));
      }
    }
  }

  async function handleLogout() {
    try {
      await fetch(`${API_BASE}/auth/logout`, {
        method: 'POST',
        credentials: 'include'
      });
    } catch (e) { }
    clearAuthState();
    showToast('Logged out successfully.');
    render();
  }

  function openLoginModal(subtext) {
    const $modal = document.getElementById('modal-login-overlay');
    const $subtext = document.getElementById('login-modal-subtext');
    const $banner = document.getElementById('auth-error-banner');

    if (!$modal) return;
    if ($subtext && subtext) $subtext.textContent = subtext;
    if ($banner) $banner.style.display = 'none';

    $modal.classList.add('modal-overlay--visible');

    // Initialize Google GSI SDK once & render official Google button
    initGoogleAuth();
  }

  function closeLoginModal() {
    const $modal = document.getElementById('modal-login-overlay');
    if ($modal) $modal.classList.remove('modal-overlay--visible');
  }

  /* ────────────────────────────────────────────
     BOOT
  ──────────────────────────────────────────── */
  async function loadClientConfig() {
    if (window.ENV && window.ENV.GOOGLE_CLIENT_ID) return;
    try {
      const res = await fetch(`${API_BASE}/config`);
      if (res.ok) {
        const data = await res.json();
        window.ENV = window.ENV || {};
        if (data.googleClientId) window.ENV.GOOGLE_CLIENT_ID = data.googleClientId;
      }
    } catch (e) {
      console.warn('Could not fetch server config:', e.message);
    }
  }

  /* ────────────────────────────────────────────
     CLIENT-SIDE ROUTER & HISTORY STATE
  ──────────────────────────────────────────── */
  function updateRouterState(view, topicId = null, tab = null, pushHistory = true) {
    const url = new URL(window.location.href);
    
    if (view === 'lesson' && topicId) {
      url.searchParams.set('topic', topicId);
      url.searchParams.set('tab', tab || activeTab || 'concept');
    } else {
      url.searchParams.delete('topic');
      url.searchParams.delete('tab');
    }

    const state = { view, topicId, tab: tab || activeTab };
    if (pushHistory) {
      if (window.location.href !== url.toString()) {
        window.history.pushState(state, '', url.toString());
      }
    } else {
      window.history.replaceState(state, '', url.toString());
    }
  }

  function handleRouteFromUrl(pushHistory = false) {
    const params = new URLSearchParams(window.location.search);
    const viewParam = params.get('view');
    const topicParam = params.get('topic');
    const tabParam = params.get('tab');

    if (tabParam === 'questions' || tabParam === 'concept') {
      activeTab = tabParam;
    } else {
      activeTab = 'concept';
    }

    // Explicit request for grid view (e.g., ?view=grid)
    if (viewParam === 'grid') {
      currentView = 'grid';
      currentTopicId = null;
      updateRouterState('grid', null, null, pushHistory);
      return;
    }

    // Explicit topic requested in URL
    if (topicParam && topicsData.some(t => t.id === topicParam)) {
      if (isTopicUnlocked(topicParam)) {
        currentView = 'lesson';
        currentTopicId = topicParam;
        updateRouterState('lesson', topicParam, activeTab, pushHistory);
        return;
      } else {
        const topic = topicsData.find(t => t.id === topicParam);
        showToast(`Topic "${topic ? topic.title : topicParam}" is locked.`);
      }
    }

    // Default: Open the first topic ("What is DSA?") directly
    const defaultTopicId = (topicsData && topicsData.length > 0) ? topicsData[0].id : 'what-is-dsa';
    currentView = 'lesson';
    currentTopicId = defaultTopicId;
    updateRouterState('lesson', defaultTopicId, activeTab, pushHistory);
  }

  function updateUrlTab(tab) {
    activeTab = tab;
    if (currentView === 'lesson' && currentTopicId) {
      updateRouterState('lesson', currentTopicId, tab, false);
    }
  }

  async function boot() {
    initTheme();
    await loadClientConfig();
    await loadTopics();
    loadProgress();
    bindGlobalEvents();
    bindAuthModalEvents();
    renderHeaderAuthUI();
    await initAuthSession();

    // Listen for browser Back & Forward navigation (popstate)
    window.addEventListener('popstate', () => {
      handleRouteFromUrl(false);
      render();
    });

    // Parse route from current URL and render initial view
    handleRouteFromUrl(false);
    render();
  }

  async function loadTopics() {
    try {
      const res = await fetch(`${API_BASE}/topics`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      const rawTopics = json.topics || json.data || json;
      topicsData = Array.isArray(rawTopics) ? rawTopics.sort((a, b) => a.order - b.order) : [];
    } catch (err) {
      console.warn('Backend topics fetch failed, falling back to local topics.json:', err.message);
      try {
        const fallbackRes = await fetch('data/topics.json');
        const fallbackJson = await fallbackRes.json();
        topicsData = fallbackJson.topics.sort((a, b) => a.order - b.order);
      } catch (e) {
        $main.innerHTML = `<p style="color:var(--text-secondary);text-align:center;margin-top:60px;">Could not load topic data.</p>`;
      }
    }
  }

  function loadProgress() {
    localStorage.removeItem('dsa-tracker-progress');
    const stored = localStorage.getItem(STORAGE_KEY_PROGRESS);
    if (stored) {
      try {
        progressMap = JSON.parse(stored);
      } catch {
        progressMap = {};
      }
    }
    topicsData.forEach(t => {
      if (!(t.id in progressMap)) {
        progressMap[t.id] = false;
      }
    });
    saveProgress();
  }

  function saveProgress() {
    localStorage.setItem(STORAGE_KEY_PROGRESS, JSON.stringify(progressMap));
  }

  function isCompleted(topicId) {
    return !!progressMap[topicId];
  }

  function isTopicUnlocked(topicId) {
    const globalIdx = topicsData.findIndex(t => t.id === topicId);
    if (globalIdx <= 0) return true;
    if (isCompleted(topicId)) return true;
    const prevTopic = topicsData[globalIdx - 1];
    return prevTopic ? isCompleted(prevTopic.id) : true;
  }

  function render() {
    renderSidebar();
    renderProgress();

    if (currentView === 'lesson' && currentTopicId) {
      renderLessonPage(currentTopicId);
    } else {
      renderGridView();
    }
  }

  /* ────────────────────────────────────────────
     SIDEBAR RENDER
  ──────────────────────────────────────────── */
  function renderSidebar() {
    $sidebarNav.innerHTML = '';

    const levels = [];
    const levelMap = {};

    topicsData.forEach(t => {
      if (!levelMap[t.level]) {
        levelMap[t.level] = { level: t.level, title: t.levelTitle, topics: [] };
        levels.push(levelMap[t.level]);
      }
      levelMap[t.level].topics.push(t);
    });

    levels.sort((a, b) => a.level - b.level);

    levels.forEach(group => {
      const groupDiv = document.createElement('div');
      groupDiv.className = 'sidebar__group';

      const totalInLevel = group.topics.length;
      const completedInLevel = group.topics.filter(t => isCompleted(t.id)).length;
      const hasUnlocked = completedInLevel > 0;

      const groupHeader = document.createElement('div');
      groupHeader.className = 'sidebar__group-header';
      groupHeader.innerHTML = `
        <div class="sidebar__group-title">Level ${group.level} — ${group.title}</div>
        <div class="sidebar__group-stats">
          <span class="sidebar__group-progress">${completedInLevel}/${totalInLevel}</span>
          <span class="sidebar__group-chevron ${hasUnlocked ? 'expanded' : ''}">${SVG_ICONS.chevronDown}</span>
        </div>
      `;
      groupDiv.appendChild(groupHeader);

      const groupContent = document.createElement('div');
      groupContent.className = 'sidebar__group-content';
      if (!hasUnlocked) {
        groupContent.style.display = 'none';
      }

      groupHeader.addEventListener('click', () => {
        const isExpanded = groupContent.style.display !== 'none';
        groupContent.style.display = isExpanded ? 'none' : 'flex';
        groupHeader.querySelector('.sidebar__group-chevron').classList.toggle('expanded', !isExpanded);
      });

      group.topics.forEach(topic => {
        const completed = isCompleted(topic.id);
        const isActive = currentView === 'lesson' && currentTopicId === topic.id;
        const globalIdx = topicsData.findIndex(t => t.id === topic.id);
        const prevTopic = globalIdx > 0 ? topicsData[globalIdx - 1] : null;
        const isUnlocked = globalIdx === 0 || completed || (prevTopic && isCompleted(prevTopic.id));

        const item = document.createElement('a');
        item.className = 'sidebar__item';
        item.href = '#';

        if (completed) {
          item.classList.add('sidebar__item--completed');
        } else if (isUnlocked) {
          item.classList.add('sidebar__item--unlocked');
        } else {
          item.classList.add('sidebar__item--locked');
        }

        if (isActive) {
          item.classList.add('sidebar__item--active');
        }

        const iconSvg = completed ? SVG_ICONS.checkCircle : (isUnlocked ? SVG_ICONS.bookOpen : SVG_ICONS.lock);

        item.innerHTML = `
          <span class="sidebar__item-label">
            <span class="sidebar__item-order">${topic.order}.</span>
            <span>${escapeHtml(topic.title)}</span>
          </span>
          <span class="sidebar__item-icon">${iconSvg}</span>
        `;

        item.addEventListener('click', (e) => {
          e.preventDefault();
          if (isUnlocked) {
            openLesson(topic.id);
            closeSidebar();
          } else {
            showToast('Locked — complete previous topics first.');
          }
        });

        groupContent.appendChild(item);
      });

      groupDiv.appendChild(groupContent);
      $sidebarNav.appendChild(groupDiv);
    });
  }

  /* ────────────────────────────────────────────
     GRID VIEW RENDER
  ──────────────────────────────────────────── */
  function renderGridView() {
    $main.innerHTML = '';

    const levels = [];
    const levelMap = {};

    topicsData.forEach(t => {
      if (!levelMap[t.level]) {
        levelMap[t.level] = { level: t.level, title: t.levelTitle, topics: [] };
        levels.push(levelMap[t.level]);
      }
      levelMap[t.level].topics.push(t);
    });

    levels.sort((a, b) => a.level - b.level);

    levels.forEach(levelGroup => {
      const section = document.createElement('section');
      section.className = 'level-section';
      section.id = `level-${levelGroup.level}`;

      const totalInLevel = levelGroup.topics.length;
      const completedInLevel = levelGroup.topics.filter(t => isCompleted(t.id)).length;
      const hasUnlocked = levelGroup.level === 1 || completedInLevel > 0;

      const header = document.createElement('div');
      header.className = 'level-header';
      header.innerHTML = `
        <div class="level-header__info">
          <span class="level-badge">Level ${levelGroup.level}</span>
          <h2 class="level-title">${escapeHtml(levelGroup.title)}</h2>
          <span class="level-progress-text">· ${completedInLevel}/${totalInLevel} complete</span>
        </div>
        <span class="level-chevron ${hasUnlocked ? 'expanded' : ''}">${SVG_ICONS.chevronDown}</span>
      `;
      section.appendChild(header);

      const grid = document.createElement('div');
      grid.className = 'topics-grid';
      if (!hasUnlocked) {
        grid.style.display = 'none';
      }

      header.addEventListener('click', () => {
        const isExpanded = grid.style.display !== 'none';
        grid.style.display = isExpanded ? 'none' : 'grid';
        header.querySelector('.level-chevron').classList.toggle('expanded', !isExpanded);
      });

      levelGroup.topics.forEach(topic => {
        const completed = isCompleted(topic.id);
        const justUnlocked = justUnlockedIds.has(topic.id);
        const globalIdx = topicsData.findIndex(t => t.id === topic.id);
        const prevTopic = globalIdx > 0 ? topicsData[globalIdx - 1] : null;
        const isUnlocked = globalIdx === 0 || completed || (prevTopic && isCompleted(prevTopic.id));

        const card = document.createElement('div');
        card.className = 'topic-card';
        card.id = `card-${topic.id}`;
        card.setAttribute('role', isUnlocked ? 'button' : 'presentation');
        card.setAttribute('tabindex', isUnlocked ? '0' : '-1');

        if (completed) {
          card.classList.add('topic-card--completed');
        } else if (isUnlocked) {
          card.classList.add('topic-card--unlocked');
        } else {
          card.classList.add('topic-card--locked');
        }

        if (justUnlocked) {
          card.classList.add('topic-card--just-unlocked');
          card.addEventListener('animationend', () => {
            card.classList.remove('topic-card--just-unlocked');
            justUnlockedIds.delete(topic.id);
          }, { once: true });
        }

        const statusClass = completed ? 'topic-card__status-icon--complete' : (isUnlocked ? 'topic-card__status-icon--unlocked' : 'topic-card__status-icon--locked');
        const iconSvg = completed ? SVG_ICONS.checkCircle : (isUnlocked ? SVG_ICONS.bookOpen : SVG_ICONS.lock);

        card.innerHTML = `
          <div class="topic-card__header">
            <span class="topic-card__order">${topic.order}</span>
            <span class="topic-card__status-icon ${statusClass}" aria-label="${completed ? 'Completed' : (isUnlocked ? 'Unlocked' : 'Locked')}">${iconSvg}</span>
          </div>
          <h3 class="topic-card__title">${escapeHtml(topic.title)}</h3>
          ${renderSubtopics(topic)}
        `;

        if (isUnlocked) {
          card.addEventListener('click', () => openLesson(topic.id));
          card.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLesson(topic.id); }
          });
        } else {
          card.addEventListener('click', () => showToast('Locked — complete previous topics first.'));
        }

        grid.appendChild(card);
      });

      section.appendChild(grid);
      $main.appendChild(section);
    });
  }

  function renderSubtopics(topic) {
    if (!topic.subtopics || topic.subtopics.length === 0) return '';
    const items = topic.subtopics.map(st =>
      `<li class="topic-card__subtopic">${escapeHtml(st.title)}</li>`
    ).join('');
    return `<ul class="topic-card__subtopics">${items}</ul>`;
  }

  function renderProgress() {
    const total = topicsData.length;
    const done = topicsData.filter(t => isCompleted(t.id)).length;
    const pct = total > 0 ? Math.round((done / total) * 100) : 0;

    $progressText.textContent = `${done} / ${total} completed`;
    $progressFill.style.width = `${pct}%`;
    $progressBar.setAttribute('aria-valuenow', pct);
  }

  /* ────────────────────────────────────────────
     LESSON PAGE RENDERER
  ──────────────────────────────────────────── */
  function openLesson(topicId, tab = 'concept') {
    if (!isTopicUnlocked(topicId)) {
      showToast('Locked — complete previous topics first.');
      return;
    }
    currentView = 'lesson';
    currentTopicId = topicId;
    activeTab = tab || 'concept';
    activeNotationId = 'o-1';
    updateRouterState('lesson', topicId, activeTab, true);
    render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function showGridView() {
    currentView = 'grid';
    currentTopicId = null;
    updateRouterState('grid', null, null, true);
    render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function renderLessonPage(topicId) {
    const content = window.LESSONS_CONTENT ? window.LESSONS_CONTENT[topicId] : null;
    const topic = topicsData.find(t => t.id === topicId);

    if (!isTopicUnlocked(topicId)) {
      const globalIdx = topicsData.findIndex(t => t.id === topicId);
      const prevTopic = globalIdx > 0 ? topicsData[globalIdx - 1] : null;
      $main.innerHTML = `
        <div class="lesson-page" style="text-align:center;padding:60px 20px;">
          <div style="font-size:3.5rem;margin-bottom:16px;">🔒</div>
          <h2 style="font-size:1.8rem;margin-bottom:12px;">Topic Locked</h2>
          <p style="color:var(--text-secondary);max-width:500px;margin:0 auto 24px auto;line-height:1.6;">
            "${escapeHtml(topic ? topic.title : 'This topic')}" is locked. Complete ${prevTopic ? `<strong>"${escapeHtml(prevTopic.title)}"</strong>` : 'the previous topic'} first to unlock it.
          </p>
          <button class="btn btn--primary" id="btn-lock-back" style="padding:10px 24px;font-weight:600;border-radius:20px;cursor:pointer;background:var(--accent-primary);color:#fff;border:none;">
            ← Return to Roadmap
          </button>
        </div>
      `;
      const backBtn = document.getElementById('btn-lock-back');
      if (backBtn) {
        backBtn.addEventListener('click', (e) => {
          e.preventDefault();
          showGridView();
        });
      }
      return;
    }

    if (!content || !topic) {
      $main.innerHTML = `
        <div class="lesson-page">
          <div class="lesson-breadcrumb">
            <a href="#" class="lesson-breadcrumb__link" id="bc-back">← Back to Roadmap</a>
          </div>
          <h2>${escapeHtml(topic ? topic.title : 'Topic')}</h2>
          <p style="color:var(--text-secondary);">Lesson content coming soon!</p>
        </div>
      `;
      document.getElementById('bc-back').addEventListener('click', (e) => {
        e.preventDefault();
        showGridView();
      });
      return;
    }

    if (scrollObserver) {
      scrollObserver.disconnect();
    }

    const container = document.createElement('div');
    container.className = 'lesson-page';

    // 1. Breadcrumb
    const breadcrumb = document.createElement('nav');
    breadcrumb.className = 'lesson-breadcrumb';
    breadcrumb.setAttribute('aria-label', 'Breadcrumb');
    breadcrumb.innerHTML = `
      <a href="#" class="lesson-breadcrumb__link" id="bc-grid-link">Roadmap Grid</a>
      <span class="lesson-breadcrumb__separator">/</span>
      <span>${escapeHtml(content.levelTitle)}</span>
      <span class="lesson-breadcrumb__separator">/</span>
      <span class="lesson-breadcrumb__current">${escapeHtml(content.title)}</span>
    `;
    container.appendChild(breadcrumb);

    // 2. Header
    const isTopicDone = isCompleted(topicId);
    const header = document.createElement('header');
    header.className = 'lesson-header';
    header.innerHTML = `
      <div style="display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap;margin-bottom:8px;">
        <h1 class="lesson-header__title" style="margin:0;">${escapeHtml(content.title)}</h1>
        <button id="btn-toggle-completion" class="btn" style="flex-shrink:0;display:inline-flex;align-items:center;gap:8px;padding:9px 22px;font-weight:600;font-size:0.92rem;border-radius:20px;cursor:pointer;background:${isTopicDone ? 'rgba(16,185,129,0.18)' : 'var(--accent-primary)'};color:${isTopicDone ? '#10B981' : '#ffffff'};border:${isTopicDone ? '1px solid #10B981' : 'none'};box-shadow:${isTopicDone ? 'none' : '0 2px 10px rgba(108,99,255,0.35)'};transition:all 0.2s ease;">
          <span style="display:flex;align-items:center;">${SVG_ICONS.checkCircle}</span>
          <span>${isTopicDone ? 'Completed ✓' : 'Mark as Complete'}</span>
        </button>
      </div>
      <p class="lesson-header__summary">${escapeHtml(content.summary)}</p>
    `;
    container.appendChild(header);

    const toggleBtn = header.querySelector('#btn-toggle-completion');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        handleTopicCompletionToggle(topicId);
      });
    }

    // 3. TABS BAR (Task 2 Vector Icons)
    const tabsBar = document.createElement('div');
    tabsBar.className = 'lesson-tabs-bar';
    tabsBar.innerHTML = `
      <button class="tab-btn ${activeTab === 'concept' ? 'tab-btn--active' : ''}" data-tab="concept">
        ${SVG_ICONS.bookOpen} Concept
      </button>
      <button class="tab-btn ${activeTab === 'questions' ? 'tab-btn--active' : ''}" data-tab="questions">
        ${SVG_ICONS.helpCircle} Questions
      </button>
    `;
    container.appendChild(tabsBar);

    // 4. TASK 1: COMPACT SINGLE-ROW MINI TOC STRIP
    const tocContainer = document.createElement('div');
    tocContainer.className = 'lesson-toc';
    tocContainer.id = 'lesson-toc';
    container.appendChild(tocContainer);

    // 5. TAB PANELS CONTAINER
    const panelConcept = document.createElement('div');
    panelConcept.className = `tab-panel ${activeTab === 'concept' ? '' : 'tab-panel--hidden'}`;
    panelConcept.id = 'panel-concept';

    const panelQuestions = document.createElement('div');
    panelQuestions.className = `tab-panel ${activeTab === 'questions' ? '' : 'tab-panel--hidden'}`;
    panelQuestions.id = 'panel-questions';

    // Populate Concept Tab Sections
    renderConceptPanelSections(content, panelConcept, topicId);

    // Populate Questions Tab Sections
    renderQuestionsPanelSections(content, panelQuestions);

    container.appendChild(panelConcept);
    container.appendChild(panelQuestions);

    // 6. LESSON FOOTER (Completion Bar & Prev/Next Navigation)
    const footer = renderLessonFooter(topicId);
    container.appendChild(footer);

    $main.innerHTML = '';
    $main.appendChild(container);

    // Bind Breadcrumb return link
    document.getElementById('bc-grid-link').addEventListener('click', (e) => {
      e.preventDefault();
      showGridView();
    });

    // Bind Tab Switching Events
    tabsBar.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.getAttribute('data-tab');
        if (tab === activeTab) return;

        updateUrlTab(tab);

        tabsBar.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('tab-btn--active'));
        btn.classList.add('tab-btn--active');

        if (tab === 'concept') {
          panelQuestions.classList.add('tab-panel--hidden');
          panelConcept.classList.remove('tab-panel--hidden');
        } else {
          panelConcept.classList.add('tab-panel--hidden');
          panelQuestions.classList.remove('tab-panel--hidden');
        }

        updateMiniToc(content, tab, container);
        setupScrollReveal(container, tab);
      });
    });

    // Initial Mini TOC & Scroll Reveal
    updateMiniToc(content, activeTab, container);
    setupScrollReveal(container, activeTab);

    // Mount Interactive Stack/Queue Widget if present
    if (content.interactiveWidget) {
      mountInteractiveWidget(content);
    }

    // Bind Interactive Big-O Notations if present
    if (content.notations) {
      bindInteractiveNotations(content, container);
    }
  }

  /* ────────────────────────────────────────────
     LESSON FOOTER (Status & Prev/Next Nav)
  ──────────────────────────────────────────── */
  function renderLessonFooter(topicId) {
    const currentIndex = topicsData.findIndex(t => t.id === topicId);
    const currentTopic = topicsData[currentIndex];
    const prevTopic = currentIndex > 0 ? topicsData[currentIndex - 1] : null;
    const nextTopic = currentIndex >= 0 && currentIndex < topicsData.length - 1 ? topicsData[currentIndex + 1] : null;
    const isTopicDone = isCompleted(topicId);
    const isNextUnlocked = nextTopic ? isTopicUnlocked(nextTopic.id) : false;

    const footer = document.createElement('footer');
    footer.className = 'lesson-footer';
    footer.style.cssText = 'margin-top: 40px; padding-top: 24px; border-top: 1px solid var(--border-default); display: flex; flex-direction: column; gap: 20px;';

    footer.innerHTML = `
      <div style="display:flex; align-items:center; justify-content:space-between; gap:16px; flex-wrap:wrap; background:var(--bg-surface); padding:18px 24px; border-radius:14px; border:1px solid var(--border-default); box-shadow:var(--shadow-sm);">
        <div style="display:flex; align-items:center; gap:12px;">
          <span style="font-weight:600; color:var(--text-primary); font-size:0.95rem;">Topic Completion:</span>
          <span class="badge" style="padding:6px 14px; border-radius:20px; font-size:0.88rem; font-weight:600; display:inline-flex; align-items:center; gap:6px; background:${isTopicDone ? 'rgba(16,185,129,0.15)' : 'rgba(234,179,8,0.15)'}; color:${isTopicDone ? '#10B981' : '#EAB308'}; border: 1px solid ${isTopicDone ? 'rgba(16,185,129,0.3)' : 'rgba(234,179,8,0.3)'};">
            ${isTopicDone ? SVG_ICONS.checkCircle + ' Completed' : SVG_ICONS.bookOpen + ' In Progress'}
          </span>
        </div>
        <button id="btn-toggle-completion-bottom" class="btn" style="display:inline-flex; align-items:center; gap:8px; padding:10px 22px; font-weight:600; font-size:0.92rem; border-radius:20px; cursor:pointer; background:${isTopicDone ? 'rgba(16,185,129,0.18)' : 'var(--accent-primary)'}; color:${isTopicDone ? '#10B981' : '#ffffff'}; border:${isTopicDone ? '1px solid #10B981' : 'none'}; box-shadow:${isTopicDone ? 'none' : '0 2px 10px rgba(108,99,255,0.35)'}; transition:all 0.2s ease;">
          <span style="display:flex;align-items:center;">${SVG_ICONS.checkCircle}</span>
          <span>${isTopicDone ? 'Completed ✓ (Click to unmark)' : 'Mark as Complete'}</span>
        </button>
      </div>

      <div style="display:flex; align-items:center; justify-content:space-between; gap:16px; flex-wrap:wrap; margin-bottom:30px;">
        ${prevTopic ? `
          <button id="btn-prev-topic" class="btn" style="display:inline-flex; align-items:center; gap:8px; padding:10px 20px; font-weight:600; border-radius:10px; cursor:pointer; background:var(--bg-surface); color:var(--text-primary); border:1px solid var(--border-default);">
            ← Previous: ${escapeHtml(prevTopic.title)}
          </button>
        ` : '<div></div>'}
        ${nextTopic ? `
          <button id="btn-next-topic" class="btn ${isNextUnlocked ? 'btn--primary' : ''}" style="display:inline-flex; align-items:center; gap:8px; padding:10px 20px; font-weight:600; border-radius:10px; cursor:${isNextUnlocked ? 'pointer' : 'not-allowed'}; background:${isNextUnlocked ? 'var(--accent-primary)' : 'var(--bg-surface)'}; color:${isNextUnlocked ? '#ffffff' : 'var(--text-muted)'}; border:${isNextUnlocked ? 'none' : '1px solid var(--border-default)'}; opacity:${isNextUnlocked ? '1' : '0.65'}; box-shadow:${isNextUnlocked ? '0 2px 8px rgba(108,99,255,0.3)' : 'none'};">
            Next: ${escapeHtml(nextTopic.title)} ${isNextUnlocked ? '→' : '🔒'}
          </button>
        ` : '<div></div>'}
      </div>
    `;

    // Bindings
    const bottomToggle = footer.querySelector('#btn-toggle-completion-bottom');
    if (bottomToggle) {
      bottomToggle.addEventListener('click', () => {
        handleTopicCompletionToggle(topicId);
      });
    }

    const prevBtn = footer.querySelector('#btn-prev-topic');
    if (prevBtn && prevTopic) {
      prevBtn.addEventListener('click', () => {
        openLesson(prevTopic.id);
      });
    }

    const nextBtn = footer.querySelector('#btn-next-topic');
    if (nextBtn && nextTopic) {
      nextBtn.addEventListener('click', () => {
        if (isNextUnlocked) {
          openLesson(nextTopic.id);
        } else {
          showToast(`Locked — complete "${currentTopic ? currentTopic.title : 'this topic'}" first to unlock ${nextTopic.title}.`);
        }
      });
    }

    return footer;
  }

  /* ────────────────────────────────────────────
     CONCEPT PANEL SECTIONS RENDERER
  ──────────────────────────────────────────── */
  /* ────────────────────────────────────────────
     CONCEPT PANEL SECTIONS RENDERER
  ──────────────────────────────────────────── */
  function renderConceptPanelSections(content, panel, topicId) {
    let sectionCount = 1;

    // 0. Why This Actually Matters (Motivation Hook)
    if (content.whyMatters) {
      const whySec = document.createElement('section');
      whySec.className = 'lesson-section reveal-on-scroll';
      whySec.id = 'section-why-matters';
      whySec.innerHTML = `
        <h2 class="lesson-section__title">Why This Actually Matters</h2>
        <div class="lesson-section__body" style="font-size:0.98rem; line-height:1.65; color:var(--text-primary); background:var(--bg-surface); padding:16px 20px; border-radius:10px; border:1px solid var(--border-default); border-left:4px solid var(--accent-primary);">
          <p style="margin:0;">${content.whyMatters}</p>
        </div>
      `;
      panel.appendChild(whySec);
    }

    // 1. Definition-Style List (Task 2 Format)
    if (content.definitions && content.definitions.length > 0) {
      const defSection = document.createElement('section');
      defSection.className = 'lesson-section reveal-on-scroll';
      defSection.id = 'section-definitions';

      const defCards = content.definitions.map(d => `
        <div class="def-card">
          <div class="def-term">${SVG_ICONS.bookmark} ${escapeHtml(d.term)}</div>
          <div class="def-desc">${escapeHtml(d.def)}</div>
        </div>
      `).join('');

      defSection.innerHTML = `
        <h2 class="lesson-section__title">${sectionCount++}. Key Definitions</h2>
        <div class="def-list">${defCards}</div>
        <div class="combined-flow-box">
          <div class="combined-flow-box__title">${SVG_ICONS.zap} How it all works together</div>
          <div>${content.howItWorksTogether}</div>
        </div>
      `;
      panel.appendChild(defSection);
    }

    // 2. Interactive Big-O Explorer
    if (content.notations && content.notations.length > 0) {
      const explorerSection = document.createElement('section');
      explorerSection.className = 'lesson-section reveal-on-scroll';
      explorerSection.id = 'section-interactive-notations';

      explorerSection.innerHTML = `
        <h2 class="lesson-section__title">${sectionCount++}. Interactive Big-O Explorer</h2>
        <p style="color:var(--text-secondary);font-size:0.92rem;">Select a Big-O notation below to explore its basic flow, real-world example, code snippet, growth chart, and visual animation:</p>

        <div class="notation-explorer">
          <div class="notation-chips-bar" id="notation-chips-bar">
            ${content.notations.map(n => `
              <button class="notation-chip ${n.id === activeNotationId ? 'notation-chip--active' : ''}" 
                      data-notation="${n.id}" 
                      style="--chip-color: ${n.color}">
                <span>${escapeHtml(n.label)}</span>
              </button>
            `).join('')}
          </div>

          <div id="notation-detail-card-container">
            ${renderNotationDetailCard(content.notations.find(n => n.id === activeNotationId) || content.notations[0])}
          </div>
        </div>
      `;
      panel.appendChild(explorerSection);
    }

    // 3. Worked Example
    if (content.workedExample) {
      const workedSec = document.createElement('section');
      workedSec.className = 'lesson-section reveal-on-scroll';
      workedSec.id = 'section-worked-example';

      let selfCheckHtml = '';
      if (content.workedExample.selfCheckPrompt) {
        selfCheckHtml = `
          <div class="self-check-card" style="margin-top: 18px; padding: 16px; background: var(--bg-surface); border: 1px solid var(--border-default); border-radius: 10px;">
            <div style="font-weight: 600; margin-bottom: 12px; color: var(--text-primary); font-size: 0.95rem;">
              ${escapeHtml(content.workedExample.selfCheckPrompt)}
            </div>
            <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 12px;">
              <button type="button" class="btn btn--secondary btn-self-check" data-choice="linear" style="font-size: 0.88rem; padding: 6px 14px; cursor: pointer;">Linear Search</button>
              <button type="button" class="btn btn--primary btn-self-check" data-choice="binary" style="font-size: 0.88rem; padding: 6px 14px; cursor: pointer;">Binary Search</button>
            </div>
            <div class="self-check-explanation" style="display: none; padding: 12px 14px; background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 8px; color: var(--text-primary); font-size: 0.9rem; margin-top: 8px;">
              💡 <strong>${content.workedExample.selfCheckExplanation}</strong>
            </div>
          </div>
        `;
      }

      workedSec.innerHTML = `
        <h2 class="lesson-section__title">${sectionCount++}. Worked Example</h2>
        <div class="lesson-section__body">
          <p>${content.workedExample.primitiveText || content.workedExample.title}</p>
          ${content.workedExample.referenceText ? `<p>${content.workedExample.referenceText}</p>` : ''}
          ${selfCheckHtml}
        </div>
      `;
      panel.appendChild(workedSec);

      if (content.workedExample.selfCheckPrompt) {
        setTimeout(() => {
          workedSec.querySelectorAll('.btn-self-check').forEach(btn => {
            btn.addEventListener('click', () => {
              const expEl = workedSec.querySelector('.self-check-explanation');
              if (expEl) {
                expEl.style.display = 'block';
              }
            });
          });
        }, 0);
      }
    }

    // 4. Visual Diagram / Combined Chart
    if (content.visual || content.combinedChartSvg) {
      const visualSec = document.createElement('section');
      visualSec.className = 'lesson-section reveal-on-scroll';
      visualSec.id = 'section-visual-diagram';
      const svgContent = content.visual ? content.visual.diagramSvg : content.combinedChartSvg;
      const captionText = content.visual ? content.visual.caption : "Figure: Combined growth curves for all seven Big-O complexity classes.";
      visualSec.innerHTML = `
        <h2 class="lesson-section__title">${sectionCount++}. Visual Diagram & Comparison</h2>
        <div class="diagram-container">
          ${svgContent}
          <div class="diagram-caption">${escapeHtml(captionText)}</div>
        </div>
      `;
      panel.appendChild(visualSec);
    }

    // 4b. Interactive Widget (Stack / Queue / Algorithm Visualizer)
    if (content.interactiveWidget) {
      const widgetSec = document.createElement('section');
      widgetSec.className = 'lesson-section reveal-on-scroll';
      widgetSec.id = 'section-interactive-widget';
      let widgetTitle = 'Interactive Widget';
      if (content.interactiveWidget === 'stack') widgetTitle = 'Interactive Stack Widget';
      else if (content.interactiveWidget === 'queue') widgetTitle = 'Interactive Queue Widget';
      else widgetTitle = 'Interactive Algorithm Visualizer';

      widgetSec.innerHTML = `
        <h2 class="lesson-section__title">${SVG_ICONS.film} ${widgetTitle}</h2>
        <div id="widget-container" class="widget-container"></div>
      `;
      panel.appendChild(widgetSec);
    }

    // 5. Code Snippet
    if (content.codeSnippet) {
      const codeSec = document.createElement('section');
      codeSec.className = 'lesson-section reveal-on-scroll';
      codeSec.id = 'section-code-snippet';
      codeSec.innerHTML = `
        <h2 class="lesson-section__title">${sectionCount++}. Code Snippet</h2>
        <pre class="code-block"><code>${content.codeSnippet}</code></pre>
      `;
      panel.appendChild(codeSec);
    }

    // 6. Complexity Notes
    if (content.complexityNotes) {
      const compSec = document.createElement('section');
      compSec.className = 'lesson-section reveal-on-scroll';
      compSec.id = 'section-complexity-notes';
      const items = content.complexityNotes.map(n => `<li>${n}</li>`).join('');
      compSec.innerHTML = `
        <h2 class="lesson-section__title">${sectionCount++}. Complexity Notes</h2>
        <div class="lesson-section__body"><ul>${items}</ul></div>
      `;
      panel.appendChild(compSec);
    }

    // 7. Common Mistakes
    if (content.commonMistakes) {
      const mistakesSec = document.createElement('section');
      mistakesSec.className = 'lesson-section reveal-on-scroll';
      mistakesSec.id = 'section-common-mistakes';
      const cards = content.commonMistakes.map(m => `
        <div class="mistake-card">
          <div class="mistake-card__title">${SVG_ICONS.alertTriangle} ${escapeHtml(m.title)}</div>
          <div class="mistake-card__desc">${m.desc}</div>
        </div>
      `).join('');
      mistakesSec.innerHTML = `
        <h2 class="lesson-section__title">${sectionCount++}. Common Mistakes</h2>
        <div class="lesson-section__body">${cards}</div>
      `;
      panel.appendChild(mistakesSec);
    }

    // 8. Real-World DSA You Already Use
    if (content.realWorldDsa && content.realWorldDsa.length > 0) {
      const rwSec = document.createElement('section');
      rwSec.className = 'lesson-section reveal-on-scroll';
      rwSec.id = 'section-real-world-dsa';

      const items = content.realWorldDsa.map(rw => `
        <div class="def-card" style="margin-bottom: 12px;">
          <div class="def-term" style="display:flex; align-items:center; gap:8px;">
            ${SVG_ICONS.zap || ''} <strong>${escapeHtml(rw.item)}</strong> &rarr; <span style="color:var(--accent-primary); font-weight:700;">${escapeHtml(rw.structure)}</span>
          </div>
          <div class="def-desc" style="color:var(--text-secondary); margin-top:4px;">
            ${escapeHtml(rw.note)}
          </div>
        </div>
      `).join('');

      rwSec.innerHTML = `
        <h2 class="lesson-section__title">${sectionCount++}. Real-World DSA You Already Use</h2>
        <p style="color:var(--text-secondary); margin-bottom:14px; font-size:0.92rem;">
          Here is how familiar everyday tools map to data structures and algorithms on your roadmap — you'll build simplified versions of several of these yourself as you go:
        </p>
        <div class="def-list">${items}</div>
      `;
      panel.appendChild(rwSec);
    }

    // 9. A Bit of History
    if (content.historyFact) {
      const histSec = document.createElement('section');
      histSec.className = 'lesson-section reveal-on-scroll';
      histSec.id = 'section-history-fact';
      histSec.innerHTML = `
        <h2 class="lesson-section__title">${sectionCount++}. A Bit of History</h2>
        <div class="combined-flow-box" style="border-left: 4px solid var(--accent-primary);">
          <div class="combined-flow-box__title" style="display:flex; align-items:center; gap:8px;">
            ${SVG_ICONS.bookOpen || ''} <span>Did you know?</span>
          </div>
          <div style="color:var(--text-primary); margin-top:6px; line-height:1.6;">
            ${escapeHtml(content.historyFact)}
          </div>
        </div>
      `;
      panel.appendChild(histSec);
    }
  }

  /* ────────────────────────────────────────────
     QUESTIONS PANEL SECTIONS RENDERER
  ──────────────────────────────────────────── */
  function renderQuestionsPanelSections(content, panel) {
    let sectionNum = 1;
    if (content.practice) {
      const practiceSec = document.createElement('section');
      practiceSec.className = 'lesson-section reveal-on-scroll';
      practiceSec.id = 'section-practice-questions';
      const cards = content.practice.map((q, idx) => `
        <div class="practice-item">
          <div class="practice-question">${escapeHtml(q.q)}</div>
          <button class="btn-reveal-answer" data-target="ans-${idx}">
            ${SVG_ICONS.eye} Reveal Answer
          </button>
          <div class="practice-answer" id="ans-${idx}">${escapeHtml(q.a)}</div>
        </div>
      `).join('');
      practiceSec.innerHTML = `
        <h2 class="lesson-section__title">${sectionNum++}. Practice Questions</h2>
        <div class="lesson-section__body">${cards}</div>
      `;
      panel.appendChild(practiceSec);

      setTimeout(() => {
        practiceSec.querySelectorAll('.btn-reveal-answer').forEach(btn => {
          btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            const ansEl = document.getElementById(targetId);
            if (ansEl) {
              const isVisible = ansEl.classList.toggle('practice-answer--visible');
              btn.innerHTML = isVisible ? `${SVG_ICONS.eyeOff} Hide Answer` : `${SVG_ICONS.eye} Reveal Answer`;
            }
          });
        });
      }, 0);
    }

    if (content.challenge) {
      const challengeSec = document.createElement('section');
      challengeSec.className = 'lesson-section reveal-on-scroll';
      challengeSec.id = 'section-challenge-problem';
      challengeSec.innerHTML = `
        <h2 class="lesson-section__title">${sectionNum++}. Challenge Problem</h2>
        <div class="challenge-card">
          <div class="challenge-card__title">${SVG_ICONS.flame} ${escapeHtml(content.challenge.titleText)}</div>
          <div class="challenge-card__desc">${content.challenge.desc}</div>
        </div>
      `;
      panel.appendChild(challengeSec);
    }

    if (content.leetcodePractice || content.generalSortingPractice) {
      const leetcodeSec = document.createElement('section');
      leetcodeSec.className = 'lesson-section reveal-on-scroll';
      leetcodeSec.id = 'section-leetcode-practice';
      leetcodeSec.innerHTML = `
        <h2 class="lesson-section__title">${sectionNum++}. Practice Problems (LeetCode)</h2>
        ${renderLeetCodePracticeComponent(content.leetcodePractice, content.generalSortingPractice)}
      `;
      panel.appendChild(leetcodeSec);
    }
  }

  /* ────────────────────────────────────────────
     LEETCODE PRACTICE COMPONENT RENDERER
  ──────────────────────────────────────────── */
  function renderLeetCodePracticeComponent(leetcodePractice, generalSortingPractice) {
    if (!leetcodePractice && !generalSortingPractice) return '';

    let html = '';

    // 1. Process Callout
    if (leetcodePractice && leetcodePractice.showProcessCallout) {
      html += `
        <div class="leetcode-process-box">
          <div class="leetcode-process-box__header">
            ${SVG_ICONS.zap || ''} <span>How to Approach Every Problem</span>
          </div>
          <div class="leetcode-process-box__steps">
            <div class="leetcode-process-box__step"><span class="leetcode-process-box__num">1</span> Understand the problem</div>
            <div class="leetcode-process-box__step"><span class="leetcode-process-box__num">2</span> Create an example</div>
            <div class="leetcode-process-box__step"><span class="leetcode-process-box__num">3</span> Think of a brute-force approach</div>
            <div class="leetcode-process-box__step"><span class="leetcode-process-box__num">4</span> Write your own solution</div>
            <div class="leetcode-process-box__step"><span class="leetcode-process-box__num">5</span> Test it</div>
            <div class="leetcode-process-box__step"><span class="leetcode-process-box__num">6</span> Find its time complexity</div>
            <div class="leetcode-process-box__step"><span class="leetcode-process-box__num">7</span> Find its space complexity</div>
            <div class="leetcode-process-box__step"><span class="leetcode-process-box__num">8</span> Only then look at better/alternative solutions</div>
          </div>
          ${leetcodePractice.twoSumNote ? `
            <div class="leetcode-process-box__note">
              💡 <strong>Note on Two Sum:</strong> For Two Sum, first try to solve it yourself using loops. After that, learn why a Map can reduce the solution from O(n²) → O(n).
            </div>
          ` : ''}
        </div>
      `;
    }

    // 2. Caution note (Recursion)
    if (leetcodePractice && leetcodePractice.cautionNote) {
      html += `
        <div class="leetcode-caution-box">
          <div style="font-weight:700;margin-bottom:6px;">⚠️ ${escapeHtml(leetcodePractice.cautionNote)}</div>
          ${leetcodePractice.cautionCode ? `<pre><code>${escapeHtml(leetcodePractice.cautionCode)}</code></pre>` : ''}
          ${leetcodePractice.cautionTrace ? `<div style="font-family:'Fira Code',monospace;font-size:0.85rem;margin-top:6px;color:var(--text-secondary);">${escapeHtml(leetcodePractice.cautionTrace)}</div>` : ''}
        </div>
      `;
    }

    // 3. Solving Order Banner (Linked List)
    if (leetcodePractice && leetcodePractice.solvingOrder) {
      html += `
        <div class="leetcode-order-banner">
          <div class="leetcode-order-banner__title">💡 Suggested Solving Order</div>
          <div style="font-weight:700;font-size:1.05rem;color:var(--text-primary);margin-bottom:6px;letter-spacing:0.5px;">${escapeHtml(leetcodePractice.solvingOrder)}</div>
          ${leetcodePractice.solvingOrderNote ? `<div style="font-size:0.88rem;color:var(--text-secondary);">${leetcodePractice.solvingOrderNote}</div>` : ''}
        </div>
      `;
    }

    // 4. Main LeetCode Problems List
    if (leetcodePractice && leetcodePractice.problems && leetcodePractice.problems.length > 0) {
      html += `<div class="leetcode-practice-list">`;
      html += leetcodePractice.problems.map(p => renderSingleLeetCodeCard(p, leetcodePractice)).join('');
      html += `</div>`;
    }

    // 5. General Sorting Practice Block
    if (generalSortingPractice && generalSortingPractice.problems && generalSortingPractice.problems.length > 0) {
      html += `
        <div style="margin-top: 28px;">
          <h3 style="font-size:1.05rem;font-weight:700;color:var(--text-primary);margin-bottom:14px;display:flex;align-items:center;gap:8px;">
            <span>General sorting practice (not tied to one specific algorithm)</span>
          </h3>
          <div class="leetcode-practice-list">
            ${generalSortingPractice.problems.map(p => renderSingleLeetCodeCard(p)).join('')}
          </div>
        </div>
      `;
    }

    return html;
  }

  function renderSingleLeetCodeCard(p, parentConfig) {
    const externalIcon = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`;

    return `
      <div class="leetcode-card">
        <div class="leetcode-card__main">
          <div class="leetcode-card__title-group">
            <span class="leetcode-card__num">#${p.num}</span>
            <a href="https://leetcode.com/problems/${p.slug}/" target="_blank" rel="noopener noreferrer" class="leetcode-card__link">
              ${escapeHtml(p.title)} ${externalIcon}
            </a>
          </div>
          <div class="leetcode-card__badges">
            ${p.isSuggestedStart ? `<span class="badge-suggested-start">Suggested Start</span>` : ''}
            ${p.difficulty === 'Easy' ? `<span class="badge-diff-easy">Easy</span>` : ''}
            ${p.difficulty === 'Medium' ? `<span class="badge-diff-medium">Medium</span>` : ''}
            ${p.concept ? `<span class="badge-concept">${escapeHtml(p.concept)}</span>` : ''}
            ${p.roadmapStep ? `<span class="badge-roadmap">Roadmap step ${p.roadmapStep} of 15</span>` : ''}
            ${p.isImmediateNext ? `<span class="badge-immediate">Immediate next 5</span>` : ''}
          </div>
        </div>
        ${(p.isSuggestedStart && parentConfig && parentConfig.suggestedStartingNote) ? `
          <div class="leetcode-card__extra-note">💡 ${escapeHtml(parentConfig.suggestedStartingNote)}</div>
        ` : ''}
        ${(p.num === 88 && parentConfig && parentConfig.note) ? `
          <div class="leetcode-card__extra-note">💡 ${escapeHtml(parentConfig.note)}</div>
        ` : ''}
        ${(p.num === 20 && parentConfig && parentConfig.workedTrace) ? `
          <div style="font-size:0.85rem;font-weight:600;color:var(--text-secondary);margin-top:4px;">Worked Trace Example:</div>
          <div class="leetcode-card__trace">${escapeHtml(parentConfig.workedTrace)}</div>
        ` : ''}
      </div>
    `;
  }

  /* ────────────────────────────────────────────
     INTERACTIVE BIG-O NOTATION DETAIL CARD
  ──────────────────────────────────────────── */
  function renderNotationDetailCard(notation) {
    if (!notation) return '';

    return `
      <div class="notation-detail-card" id="notation-detail-card">
        <div class="notation-detail-header">
          <span class="notation-badge" style="background:${notation.color}">${escapeHtml(notation.label)}</span>
          <h3 style="font-size:1.15rem;font-weight:700;color:var(--text-primary);">${escapeHtml(notation.name)}</h3>
        </div>

        <div class="notation-grid">
          <div style="display:flex;flex-direction:column;gap:14px;">
            <div class="notation-box">
              <div class="notation-box__title">${SVG_ICONS.zap} Basic Flow</div>
              <div class="notation-box__content">${escapeHtml(notation.basicFlow)}</div>
            </div>
            <div class="notation-box">
              <div class="notation-box__title">${SVG_ICONS.globe} Real-World Analogy</div>
              <div class="notation-box__content">${escapeHtml(notation.realExample)}</div>
            </div>
          </div>

          <div class="notation-box" style="align-items:center;">
            <div class="notation-box__title" style="align-self:flex-start;">${SVG_ICONS.trendingUp} Growth Chart (${notation.label})</div>
            ${notation.chartSvg}
          </div>
        </div>

        <div style="display:flex;flex-direction:column;gap:14px;">
          <div class="notation-box">
            <div class="notation-box__title">${SVG_ICONS.film} Visual Growth Animation</div>
            <div class="notation-anim-card">
              ${renderNotationAnimation(notation.animType, notation.color)}
            </div>
          </div>

          <div class="notation-box">
            <div class="notation-box__title">${SVG_ICONS.code} JavaScript Implementation</div>
            <pre class="code-block" style="margin:0;"><code>${notation.code}</code></pre>
          </div>
        </div>
      </div>
    `;
  }

  function renderNotationAnimation(animType, color) {
    if (animType === 'single-box') {
      return `
        <div class="anim-boxes-row">
          <div class="anim-box anim-box--active" style="background:${color}!important;border-color:${color}!important;">arr[0]</div>
          <div class="anim-box anim-box--dimmed">arr[1]</div>
          <div class="anim-box anim-box--dimmed">arr[2]</div>
          <div class="anim-box anim-box--dimmed">arr[3]</div>
          <div class="anim-box anim-box--dimmed">arr[4]</div>
        </div>
        <div style="font-size:0.75rem;color:var(--text-muted);margin-top:6px;">1 lookup operation regardless of array length.</div>
      `;
    } else if (animType === 'halving-boxes') {
      return `
        <div class="anim-boxes-row">
          <div class="anim-box anim-box--dimmed">1</div>
          <div class="anim-box anim-box--dimmed">2</div>
          <div class="anim-box anim-box--active" style="background:${color}!important;border-color:${color}!important;">Mid</div>
          <div class="anim-box anim-box--dimmed">4</div>
          <div class="anim-box anim-box--dimmed">5</div>
          <div class="anim-box anim-box--dimmed">6</div>
          <div class="anim-box anim-box--dimmed">7</div>
          <div class="anim-box anim-box--dimmed">8</div>
        </div>
        <div style="font-size:0.75rem;color:var(--text-muted);margin-top:6px;">Halves range every step (8 → 4 → 2 → 1).</div>
      `;
    } else if (animType === 'sequential-boxes') {
      return `
        <div class="anim-boxes-row">
          <div class="anim-box anim-box--active" style="background:${color}!important;">1</div>
          <div class="anim-box anim-box--active" style="background:${color}!important;">2</div>
          <div class="anim-box anim-box--active" style="background:${color}!important;">3</div>
          <div class="anim-box anim-box--active" style="background:${color}!important;">4</div>
          <div class="anim-box anim-box--active" style="background:${color}!important;">5</div>
        </div>
        <div style="font-size:0.75rem;color:var(--text-muted);margin-top:6px;">Scans item-by-item sequentially across all n elements.</div>
      `;
    } else if (animType === 'grid-matrix') {
      return `
        <div class="anim-grid-matrix">
          <div class="anim-box anim-box--active" style="background:${color}!important;">(0,0)</div>
          <div class="anim-box anim-box--active" style="background:${color}!important;">(0,1)</div>
          <div class="anim-box anim-box--active" style="background:${color}!important;">(0,2)</div>
          <div class="anim-box anim-box--active" style="background:${color}!important;">(0,3)</div>
          <div class="anim-box anim-box--active" style="background:${color}!important;">(1,0)</div>
          <div class="anim-box anim-box--active" style="background:${color}!important;">(1,1)</div>
          <div class="anim-box anim-box--active" style="background:${color}!important;">(1,2)</div>
          <div class="anim-box anim-box--active" style="background:${color}!important;">(1,3)</div>
        </div>
        <div style="font-size:0.75rem;color:var(--text-muted);margin-top:6px;">Nested iterations scan n × n pairwise grid items.</div>
      `;
    }

    return `
      <div class="anim-boxes-row">
        <div class="anim-box anim-box--active" style="background:${color}!important;">n</div>
        <div class="anim-box anim-box--active" style="background:${color}!important;">n²</div>
        <div class="anim-box anim-box--active" style="background:${color}!important;">2ⁿ</div>
      </div>
    `;
  }

  function bindInteractiveNotations(content, container) {
    const chipsBar = container.querySelector('#notation-chips-bar');
    const cardContainer = container.querySelector('#notation-detail-card-container');
    if (!chipsBar || !cardContainer) return;

    chipsBar.querySelectorAll('.notation-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const notId = chip.getAttribute('data-notation');
        if (notId === activeNotationId) return;

        activeNotationId = notId;

        chipsBar.querySelectorAll('.notation-chip').forEach(c => c.classList.remove('notation-chip--active'));
        chip.classList.add('notation-chip--active');

        const selectedNot = content.notations.find(n => n.id === notId);
        cardContainer.style.opacity = '0';
        setTimeout(() => {
          cardContainer.innerHTML = renderNotationDetailCard(selectedNot);
          cardContainer.style.opacity = '1';
        }, 150);
      });
    });
  }

  /* ────────────────────────────────────────────
     INTERACTIVE STACK & QUEUE WIDGETS
  ──────────────────────────────────────────── */
  let activeWidgetCleanup = null;

  function mountInteractiveWidget(content) {
    if (activeWidgetCleanup) {
      activeWidgetCleanup();
      activeWidgetCleanup = null;
    }
    if (activeAlgoTimer) {
      clearInterval(activeAlgoTimer);
      activeAlgoTimer = null;
    }
    const container = document.getElementById('widget-container');
    if (!container || !content.interactiveWidget) return;

    const wType = content.interactiveWidget;
    if (wType === 'stack') {
      activeWidgetCleanup = mountStackWidget(container);
    } else if (wType === 'queue') {
      activeWidgetCleanup = mountQueueWidget(container);
    } else if (['linear-search', 'binary-search', 'bubble-sort', 'selection-sort', 'insertion-sort', 'merge-sort', 'quick-sort'].includes(wType)) {
      renderAlgoVisualizer(container, wType);
    }
  }

  function mountStackWidget(container) {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ANIM_MS = reducedMotion ? 0 : 250;
    let stack = [];
    let nextVal = 1;
    let animating = false;

    container.innerHTML = `
      <div class="ds-widget ds-widget--stack">
        <div class="ds-widget__controls">
          <button class="ds-widget__btn ds-widget__btn--push" id="stack-push-btn">Push</button>
          <button class="ds-widget__btn ds-widget__btn--pop" id="stack-pop-btn">Pop</button>
          <span class="ds-widget__state" id="stack-state">[]</span>
        </div>
        <div class="ds-widget__visual ds-widget__visual--stack" id="stack-visual">
          <div class="ds-widget__empty-label" id="stack-empty">Stack is empty — push an item</div>
        </div>
      </div>
    `;

    const visual = container.querySelector('#stack-visual');
    const stateEl = container.querySelector('#stack-state');
    const emptyEl = container.querySelector('#stack-empty');
    const pushBtn = container.querySelector('#stack-push-btn');
    const popBtn = container.querySelector('#stack-pop-btn');

    function updateState() {
      stateEl.textContent = '[' + stack.join(', ') + ']';
      emptyEl.style.display = stack.length === 0 ? 'flex' : 'none';
    }

    function createBoxEl(val, isTop) {
      const box = document.createElement('div');
      box.className = 'ds-widget__box';
      box.setAttribute('data-value', val);
      if (isTop) box.classList.add('ds-widget__box--top');
      box.innerHTML = `<span class="ds-widget__box-val">${val}</span>${isTop ? '<span class="ds-widget__box-label">TOP</span>' : ''}`;
      return box;
    }

    function refreshBoxes() {
      const boxes = visual.querySelectorAll('.ds-widget__box');
      boxes.forEach((b, i) => {
        const isTop = i === boxes.length - 1;
        b.classList.toggle('ds-widget__box--top', isTop);
        const label = b.querySelector('.ds-widget__box-label');
        if (isTop && !label) {
          b.innerHTML = `<span class="ds-widget__box-val">${b.getAttribute('data-value')}</span><span class="ds-widget__box-label">TOP</span>`;
        } else if (!isTop && label) {
          b.innerHTML = `<span class="ds-widget__box-val">${b.getAttribute('data-value')}</span>`;
        }
      });
    }

    pushBtn.addEventListener('click', () => {
      if (animating || stack.length >= 8) return;
      animating = true;
      const val = nextVal++;
      stack.push(val);

      // Remove top from previous
      refreshBoxes();

      const box = createBoxEl(val, true);
      box.style.transform = 'translateY(-60px)';
      box.style.opacity = '0';
      visual.appendChild(box);
      refreshBoxes();

      requestAnimationFrame(() => {
        box.style.transition = `transform ${ANIM_MS}ms cubic-bezier(.4,0,.2,1), opacity ${ANIM_MS}ms ease`;
        box.style.transform = 'translateY(0)';
        box.style.opacity = '1';
      });

      updateState();
      setTimeout(() => {
        box.style.transition = '';
        animating = false;
      }, ANIM_MS + 20);
    });

    popBtn.addEventListener('click', () => {
      if (animating || stack.length === 0) return;
      animating = true;
      stack.pop();

      const boxes = visual.querySelectorAll('.ds-widget__box');
      const topBox = boxes[boxes.length - 1];
      if (topBox) {
        topBox.style.transition = `transform ${ANIM_MS}ms cubic-bezier(.4,0,.2,1), opacity ${ANIM_MS}ms ease`;
        topBox.style.transform = 'translateY(-60px)';
        topBox.style.opacity = '0';
        setTimeout(() => {
          topBox.remove();
          refreshBoxes();
          animating = false;
        }, ANIM_MS + 20);
      } else {
        animating = false;
      }

      updateState();
    });

    updateState();

    return () => {
      container.innerHTML = '';
    };
  }

  function mountQueueWidget(container) {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ANIM_MS = reducedMotion ? 0 : 250;
    let queue = [];
    let nextVal = 1;
    let animating = false;

    container.innerHTML = `
      <div class="ds-widget ds-widget--queue">
        <div class="ds-widget__controls">
          <button class="ds-widget__btn ds-widget__btn--enqueue" id="queue-enq-btn">Enqueue</button>
          <button class="ds-widget__btn ds-widget__btn--dequeue" id="queue-deq-btn">Dequeue</button>
          <span class="ds-widget__state" id="queue-state">[]</span>
        </div>
        <div class="ds-widget__visual ds-widget__visual--queue" id="queue-visual">
          <div class="ds-widget__empty-label" id="queue-empty">Queue is empty — enqueue an item</div>
        </div>
      </div>
    `;

    const visual = container.querySelector('#queue-visual');
    const stateEl = container.querySelector('#queue-state');
    const emptyEl = container.querySelector('#queue-empty');
    const enqBtn = container.querySelector('#queue-enq-btn');
    const deqBtn = container.querySelector('#queue-deq-btn');

    function updateState() {
      stateEl.textContent = '[' + queue.join(', ') + ']';
      emptyEl.style.display = queue.length === 0 ? 'flex' : 'none';
    }

    function createBoxEl(val, isFront, isRear) {
      const box = document.createElement('div');
      box.className = 'ds-widget__box ds-widget__box--queue-item';
      box.setAttribute('data-value', val);
      if (isFront) box.classList.add('ds-widget__box--front');
      if (isRear) box.classList.add('ds-widget__box--rear');
      let label = '';
      if (isFront && isRear) label = 'FRONT & REAR';
      else if (isFront) label = 'FRONT';
      else if (isRear) label = 'REAR';
      box.innerHTML = `<span class="ds-widget__box-val">${val}</span>${label ? '<span class="ds-widget__box-label">' + label + '</span>' : ''}`;
      return box;
    }

    function refreshBoxes() {
      const boxes = visual.querySelectorAll('.ds-widget__box');
      boxes.forEach((b, i) => {
        const isFront = i === 0;
        const isRear = i === boxes.length - 1;
        b.classList.toggle('ds-widget__box--front', isFront);
        b.classList.toggle('ds-widget__box--rear', isRear);
        const val = b.getAttribute('data-value');
        let label = '';
        if (isFront && isRear) label = 'FRONT & REAR';
        else if (isFront) label = 'FRONT';
        else if (isRear) label = 'REAR';
        b.innerHTML = `<span class="ds-widget__box-val">${val}</span>${label ? '<span class="ds-widget__box-label">' + label + '</span>' : ''}`;
      });
    }

    enqBtn.addEventListener('click', () => {
      if (animating || queue.length >= 8) return;
      animating = true;
      const val = nextVal++;
      queue.push(val);

      const box = createBoxEl(val, queue.length === 1, true);
      box.style.transform = 'translateX(60px)';
      box.style.opacity = '0';
      visual.appendChild(box);
      refreshBoxes();

      requestAnimationFrame(() => {
        box.style.transition = `transform ${ANIM_MS}ms cubic-bezier(.4,0,.2,1), opacity ${ANIM_MS}ms ease`;
        box.style.transform = 'translateX(0)';
        box.style.opacity = '1';
      });

      updateState();
      setTimeout(() => {
        box.style.transition = '';
        animating = false;
      }, ANIM_MS + 20);
    });

    deqBtn.addEventListener('click', () => {
      if (animating || queue.length === 0) return;
      animating = true;
      queue.shift();

      const boxes = visual.querySelectorAll('.ds-widget__box');
      const frontBox = boxes[0];
      if (frontBox) {
        frontBox.style.transition = `transform ${ANIM_MS}ms cubic-bezier(.4,0,.2,1), opacity ${ANIM_MS}ms ease`;
        frontBox.style.transform = 'translateX(-60px)';
        frontBox.style.opacity = '0';
        setTimeout(() => {
          frontBox.remove();
          refreshBoxes();
          animating = false;
        }, ANIM_MS + 20);
      } else {
        animating = false;
      }

      updateState();
    });

    updateState();

    return () => {
      container.innerHTML = '';
    };
  }

  /* ────────────────────────────────────────────
     TASK 1: COMPACT SINGLE-ROW MINI TOC STRIP RENDERER
  ──────────────────────────────────────────── */
  function updateMiniToc(content, tab, container) {
    const tocEl = container.querySelector('#lesson-toc');
    if (!tocEl) return;

    // Task 1 Spec: Slim inline label on left + links flowing right on single row
    let tocHTML = `<span class="lesson-toc__title">On this page:</span><ul class="lesson-toc__list">`;

    if (tab === 'concept') {
      tocHTML += `
        ${content.whyMatters ? '<li><a href="#section-why-matters" class="lesson-toc__link">Why This Actually Matters</a></li>' : ''}
        ${content.definitions ? '<li><a href="#section-definitions" class="lesson-toc__link">Key Definitions</a></li>' : ''}
        ${content.notations ? '<li><a href="#section-interactive-notations" class="lesson-toc__link">Big-O Explorer</a></li>' : ''}
        ${content.workedExample ? '<li><a href="#section-worked-example" class="lesson-toc__link">Worked Example</a></li>' : ''}
        ${content.visual || content.combinedChartSvg ? '<li><a href="#section-visual-diagram" class="lesson-toc__link">Visual Diagram</a></li>' : ''}
        ${content.interactiveWidget ? '<li><a href="#section-interactive-widget" class="lesson-toc__link">Interactive Widget</a></li>' : ''}
        ${content.codeSnippet ? '<li><a href="#section-code-snippet" class="lesson-toc__link">Code Snippet</a></li>' : ''}
        ${content.complexityNotes ? '<li><a href="#section-complexity-notes" class="lesson-toc__link">Complexity Notes</a></li>' : ''}
        ${content.commonMistakes ? '<li><a href="#section-common-mistakes" class="lesson-toc__link">Common Mistakes</a></li>' : ''}
        ${content.realWorldDsa ? '<li><a href="#section-real-world-dsa" class="lesson-toc__link">Real-World DSA You Already Use</a></li>' : ''}
        ${content.historyFact ? '<li><a href="#section-history-fact" class="lesson-toc__link">A Bit of History</a></li>' : ''}
      `;
    } else {
      tocHTML += `
        ${content.practice ? '<li><a href="#section-practice-questions" class="lesson-toc__link">Practice Questions</a></li>' : ''}
        ${content.challenge ? '<li><a href="#section-challenge-problem" class="lesson-toc__link">Challenge Problem</a></li>' : ''}
        ${(content.leetcodePractice || content.generalSortingPractice) ? '<li><a href="#section-leetcode-practice" class="lesson-toc__link">LeetCode Practice</a></li>' : ''}
      `;
    }

    tocHTML += `</ul>`;
    tocEl.innerHTML = tocHTML;

    tocEl.querySelectorAll('.lesson-toc__link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  /* ────────────────────────────────────────────
     SCROLL REVEAL ANIMATION
  ──────────────────────────────────────────── */
  function setupScrollReveal(container, tab) {
    if (scrollObserver) {
      scrollObserver.disconnect();
    }

    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const activePanel = container.querySelector(`#panel-${tab}`);
    if (!activePanel) return;

    const elements = activePanel.querySelectorAll('.reveal-on-scroll');

    if (isReducedMotion || !('IntersectionObserver' in window)) {
      elements.forEach(el => el.classList.add('is-revealed'));
      return;
    }

    scrollObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.1
    });

    elements.forEach(el => scrollObserver.observe(el));
  }

  /* ────────────────────────────────────────────
     SIDEBAR DRAWER TOGGLES (Mobile)
  ──────────────────────────────────────────── */
  function openSidebar() {
    $sidebar.classList.add('sidebar--open');
    $sidebarOverlay.classList.add('sidebar-overlay--visible');
    $btnSidebarToggle.setAttribute('aria-expanded', 'true');
  }

  function closeSidebar() {
    $sidebar.classList.remove('sidebar--open');
    $sidebarOverlay.classList.remove('sidebar-overlay--visible');
    $btnSidebarToggle.setAttribute('aria-expanded', 'false');
  }

  /* ────────────────────────────────────────────
     THEME / NOTES / EXPORT / IMPORT / RESET
  ──────────────────────────────────────────── */
  function initTheme() {
    const stored = localStorage.getItem(STORAGE_KEY_THEME);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = stored || (prefersDark ? 'dark' : 'light');
    applyTheme(theme);
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY_THEME, theme);
    $themeIcon.innerHTML = theme === 'dark' ? SVG_ICONS.sun : SVG_ICONS.moon;
    $btnTheme.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`);
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    applyTheme(current === 'dark' ? 'light' : 'dark');
  }

  function openExport() {
    const data = {
      version: 1,
      exportedAt: new Date().toISOString(),
      progress: progressMap
    };
    $exportTextarea.value = JSON.stringify(data, null, 2);
    $modalExport.classList.add('modal-overlay--visible');
  }

  function closeExport() {
    $modalExport.classList.remove('modal-overlay--visible');
  }

  function copyExport() {
    $exportTextarea.select();
    navigator.clipboard.writeText($exportTextarea.value).then(() => {
      showToast('Copied to clipboard!');
    }).catch(() => {
      document.execCommand('copy');
      showToast('Copied!');
    });
  }

  function openImport() {
    $importTextarea.value = '';
    $modalImport.classList.add('modal-overlay--visible');
    $importTextarea.focus();
  }

  function closeImport() {
    $modalImport.classList.remove('modal-overlay--visible');
  }

  function applyImport() {
    const raw = $importTextarea.value.trim();
    if (!raw) { showToast('Paste your JSON first.'); return; }

    try {
      const data = JSON.parse(raw);

      if (data.progress && typeof data.progress === 'object') {
        Object.keys(data.progress).forEach(id => {
          if (data.progress[id] && !progressMap[id]) {
            justUnlockedIds.add(id);
          }
        });

        progressMap = { ...progressMap, ...data.progress };
        saveProgress();
      }

      closeImport();
      render();
      showToast('Progress imported successfully!');
    } catch (e) {
      showToast('Invalid JSON — please check and try again.');
    }
  }

  function resetProgress() {
    if (!confirm('Are you sure you want to reset all progress? This cannot be undone.')) return;

    progressMap = {};
    topicsData.forEach(t => {
      progressMap[t.id] = t.completed;
    });
    saveProgress();
    currentView = 'grid';
    currentTopicId = null;
    render();
    showToast('Progress reset to defaults.');
  }

  /* ────────────────────────────────────────────
     INTERACTIVE WIDGETS & ALGORITHM VISUALIZER
  ──────────────────────────────────────────── */
  let activeAlgoTimer = null;



  function renderAlgoVisualizer(container, algoType) {
    const isSearch = algoType === 'linear-search' || algoType === 'binary-search';
    let currentArray = isSearch
      ? [4, 7, 12, 18, 23, 31, 39, 45, 52, 60, 77, 89]
      : [24, 9, 38, 15, 42, 5, 31, 19, 47, 12, 28, 6];
    let size = currentArray.length;
    let speedMs = 300;
    let searchTarget = 23;
    let currentStepIdx = 0;
    let isPlaying = false;
    let steps = generateSteps();

    function generateSteps() {
      if (algoType === 'linear-search') return generateLinearSearchSteps(currentArray, searchTarget);
      if (algoType === 'binary-search') return generateBinarySearchSteps(currentArray, searchTarget);
      if (algoType === 'bubble-sort') return generateBubbleSortSteps(currentArray);
      if (algoType === 'selection-sort') return generateSelectionSortSteps(currentArray);
      if (algoType === 'insertion-sort') return generateInsertionSortSteps(currentArray);
      if (algoType === 'merge-sort') return generateMergeSortSteps(currentArray);
      if (algoType === 'quick-sort') return generateQuickSortSteps(currentArray);
      return [];
    }

    function generateRandomArray(newSize) {
      const arr = [];
      for (let i = 0; i < newSize; i++) {
        arr.push(Math.floor(Math.random() * 85) + 5);
      }
      return arr;
    }

    container.innerHTML = `
      <div class="interactive-widget algo-visualizer">
        <div class="algo-controls-bar">
          <div class="algo-controls-group">
            <label class="algo-label">
              <span>Size:</span>
              <input type="range" id="algo-size-slider" class="algo-slider" min="5" max="30" value="${size}" style="width:80px" />
              <span id="algo-size-val">${size}</span>
            </label>
            <label class="algo-label">
              <span>Speed:</span>
              <input type="range" id="algo-speed-slider" class="algo-slider" min="50" max="600" value="${650 - speedMs}" style="width:80px" />
            </label>
          </div>

          <div class="algo-controls-group">
            ${isSearch ? `
              <label class="algo-label">
                <span>Target:</span>
                <input type="number" id="algo-target-input" class="widget-input" value="${searchTarget}" style="width:60px" />
              </label>
            ` : ''}
            <input type="text" id="algo-custom-input" class="widget-input" placeholder="e.g. 5,2,4,1,3" style="width:110px" />
            <button class="btn btn--outline" id="btn-algo-apply">Apply</button>
            <button class="btn btn--outline" id="btn-algo-shuffle">🔀 Shuffle</button>
          </div>

          <div class="algo-controls-group">
            <button class="btn btn--primary" id="btn-algo-play">▶ Play</button>
            <button class="btn btn--secondary" id="btn-algo-step">⏭ Step</button>
            <button class="btn btn--outline" id="btn-algo-reset">↺ Reset</button>
          </div>
        </div>

        <div class="algo-metrics-bar">
          <div class="algo-status-text" id="algo-status">Ready.</div>
          <div class="algo-counters">
            <span class="algo-counter-badge" id="algo-cmp-badge">Comparisons: 0</span>
            <span class="algo-counter-badge" id="algo-swap-badge">Swaps/Moves: 0</span>
          </div>
        </div>

        <div id="algo-display-area"></div>
      </div>
    `;

    const $sizeSlider = container.querySelector('#algo-size-slider');
    const $sizeVal = container.querySelector('#algo-size-val');
    const $speedSlider = container.querySelector('#algo-speed-slider');
    const $targetInput = container.querySelector('#algo-target-input');
    const $customInput = container.querySelector('#algo-custom-input');
    const $applyBtn = container.querySelector('#btn-algo-apply');
    const $shuffleBtn = container.querySelector('#btn-algo-shuffle');
    const $playBtn = container.querySelector('#btn-algo-play');
    const $stepBtn = container.querySelector('#btn-algo-step');
    const $resetBtn = container.querySelector('#btn-algo-reset');
    const $status = container.querySelector('#algo-status');
    const $cmpBadge = container.querySelector('#algo-cmp-badge');
    const $swapBadge = container.querySelector('#algo-swap-badge');
    const $displayArea = container.querySelector('#algo-display-area');

    function stopPlayback() {
      isPlaying = false;
      if (activeAlgoTimer) {
        clearInterval(activeAlgoTimer);
        activeAlgoTimer = null;
      }
      $playBtn.innerHTML = '▶ Play';
    }

    function resetSteps() {
      stopPlayback();
      steps = generateSteps();
      currentStepIdx = 0;
      renderCurrentStep();
    }

    function renderCurrentStep() {
      if (!steps || steps.length === 0) return;
      const step = steps[Math.min(currentStepIdx, steps.length - 1)];

      $status.textContent = step.status || '';
      $cmpBadge.textContent = `Comparisons: ${step.comparisons || 0}`;
      $swapBadge.textContent = `Swaps/Moves: ${step.swaps || 0}`;

      const arr = step.arr || currentArray;
      const maxVal = Math.max(...arr, 1);

      if (isSearch) {
        let html = `<div class="algo-boxes-container">`;
        for (let i = 0; i < arr.length; i++) {
          const val = arr[i];
          const isCompare = (step.compareIdx || []).includes(i);
          const isFound = (step.settled || []).includes(i) || step.type === 'found';
          const isFaded = (step.eliminated || []).includes(i);

          let cls = 'algo-box';
          if (isFound && isCompare) cls += ' algo-box--found';
          else if (isCompare) cls += ' algo-box--compare';
          else if (isFound) cls += ' algo-box--found';
          else if (isFaded) cls += ' algo-box--faded';

          html += `
            <div class="${cls}">
              <span>${val}</span>
              <span class="algo-box__idx">[${i}]</span>
            </div>
          `;
        }
        html += `</div>`;
        $displayArea.innerHTML = html;
      } else {
        let html = `<div class="algo-bars-container">`;
        for (let i = 0; i < arr.length; i++) {
          const val = arr[i];
          const hPct = Math.max(10, Math.round((val / maxVal) * 100));
          const isCompare = (step.compareIdx || []).includes(i);
          const isSwap = (step.swapIdx || []).includes(i);
          const isPivot = step.pivotIdx === i;
          const isSettled = (step.settled || []).includes(i);

          let cls = 'algo-bar';
          if (isSwap) cls += ' algo-bar--swap';
          else if (isCompare) cls += ' algo-bar--compare';
          else if (isPivot) cls += ' algo-bar--pivot';
          else if (isSettled) cls += ' algo-bar--settled';

          html += `
            <div class="algo-bar-wrapper">
              <span class="algo-bar__val">${val}</span>
              <div class="algo-bar-track">
                <div class="${cls}" style="height:${hPct}%"></div>
              </div>
              <span class="algo-bar__idx">${i}</span>
            </div>
          `;
        }
        html += `</div>`;
        $displayArea.innerHTML = html;
      }
    }

    $sizeSlider.addEventListener('input', (e) => {
      size = parseInt(e.target.value, 10);
      $sizeVal.textContent = size;
      currentArray = generateRandomArray(size);
      resetSteps();
    });

    $speedSlider.addEventListener('input', (e) => {
      speedMs = 650 - parseInt(e.target.value, 10);
      if (isPlaying) {
        clearInterval(activeAlgoTimer);
        activeAlgoTimer = setInterval(stepNext, speedMs);
      }
    });

    if ($targetInput) {
      $targetInput.addEventListener('change', (e) => {
        searchTarget = parseInt(e.target.value, 10) || 0;
        resetSteps();
      });
    }

    $applyBtn.addEventListener('click', () => {
      const valStr = $customInput.value.trim();
      if (!valStr) return;
      const parsed = valStr.split(',').map(v => parseInt(v.trim(), 10)).filter(v => !isNaN(v));
      if (parsed.length > 0) {
        currentArray = parsed.slice(0, 30);
        size = currentArray.length;
        $sizeSlider.value = size;
        $sizeVal.textContent = size;
        resetSteps();
      }
    });

    $shuffleBtn.addEventListener('click', () => {
      currentArray = generateRandomArray(size);
      resetSteps();
    });

    function stepNext() {
      if (currentStepIdx < steps.length - 1) {
        currentStepIdx++;
        renderCurrentStep();
      } else {
        stopPlayback();
      }
    }

    $playBtn.addEventListener('click', () => {
      if (isPlaying) {
        stopPlayback();
      } else {
        if (currentStepIdx >= steps.length - 1) {
          currentStepIdx = 0;
        }
        isPlaying = true;
        $playBtn.innerHTML = '⏸ Pause';
        activeAlgoTimer = setInterval(stepNext, speedMs);
      }
    });

    $stepBtn.addEventListener('click', () => {
      stopPlayback();
      if (currentStepIdx < steps.length - 1) {
        currentStepIdx++;
        renderCurrentStep();
      }
    });

    $resetBtn.addEventListener('click', () => {
      resetSteps();
    });

    resetSteps();
  }

  /* ────────────────────────────────────────────
     STEP GENERATORS FOR ALGORITHMS
  ──────────────────────────────────────────── */
  function generateLinearSearchSteps(arr, target) {
    const steps = [];
    let comparisons = 0, swaps = 0;
    steps.push({ type: 'start', arr: [...arr], compareIdx: [], settled: [], comparisons, swaps, status: `Linear Search ready. Target = ${target}` });
    let found = false;
    for (let i = 0; i < arr.length; i++) {
      comparisons++;
      if (arr[i] === target) {
        steps.push({ type: 'found', arr: [...arr], compareIdx: [i], settled: [i], comparisons, swaps, status: `Found target ${target} at index [${i}]!` });
        found = true;
        break;
      } else {
        steps.push({ type: 'compare', arr: [...arr], compareIdx: [i], settled: [], comparisons, swaps, status: `Checking index [${i}] (${arr[i]}) ➔ Not target ${target}` });
      }
    }
    if (!found) {
      steps.push({ type: 'not_found', arr: [...arr], compareIdx: [], settled: [], comparisons, swaps, status: `Target ${target} not found in array.` });
    }
    return steps;
  }

  function generateBinarySearchSteps(arr, target) {
    const steps = [];
    const sorted = [...arr].sort((a, b) => a - b);
    let comparisons = 0, swaps = 0;
    let low = 0, high = sorted.length - 1;
    steps.push({ type: 'start', arr: [...sorted], compareIdx: [], eliminated: [], searchBounds: [low, high], settled: [], comparisons, swaps, status: `Binary Search ready on sorted array. Target = ${target}` });
    let found = false;
    while (low <= high) {
      const mid = low + Math.floor((high - low) / 2);
      comparisons++;
      const elim = [];
      for (let k = 0; k < low; k++) elim.push(k);
      for (let k = high + 1; k < sorted.length; k++) elim.push(k);

      if (sorted[mid] === target) {
        steps.push({ type: 'found', arr: [...sorted], compareIdx: [mid], eliminated: elim, searchBounds: [low, high], settled: [mid], comparisons, swaps, status: `Mid index [${mid}] matches target ${target}!` });
        found = true;
        break;
      } else if (sorted[mid] < target) {
        steps.push({ type: 'compare', arr: [...sorted], compareIdx: [mid], eliminated: elim, searchBounds: [low, high], settled: [], comparisons, swaps, status: `Mid index [${mid}] (${sorted[mid]}) < target ${target} ➔ Discard left half [${low}..${mid}]` });
        low = mid + 1;
      } else {
        steps.push({ type: 'compare', arr: [...sorted], compareIdx: [mid], eliminated: elim, searchBounds: [low, high], settled: [], comparisons, swaps, status: `Mid index [${mid}] (${sorted[mid]}) > target ${target} ➔ Discard right half [${mid}..${high}]` });
        high = mid - 1;
      }
    }
    if (!found) {
      const elim = sorted.map((_, idx) => idx);
      steps.push({ type: 'not_found', arr: [...sorted], compareIdx: [], eliminated: elim, searchBounds: [-1, -1], settled: [], comparisons, swaps, status: `Target ${target} not found.` });
    }
    return steps;
  }

  function generateBubbleSortSteps(arr) {
    const steps = [];
    const a = [...arr];
    const n = a.length;
    let comparisons = 0, swaps = 0;
    const settled = [];
    steps.push({ type: 'start', arr: [...a], compareIdx: [], swapIdx: [], settled: [...settled], comparisons, swaps, status: 'Bubble Sort ready.' });
    for (let i = 0; i < n - 1; i++) {
      let swapped = false;
      for (let j = 0; j < n - 1 - i; j++) {
        comparisons++;
        steps.push({ type: 'compare', arr: [...a], compareIdx: [j, j + 1], swapIdx: [], settled: [...settled], comparisons, swaps, status: `Comparing index [${j}] (${a[j]}) and [${j + 1}] (${a[j + 1]})` });
        if (a[j] > a[j + 1]) {
          const temp = a[j]; a[j] = a[j + 1]; a[j + 1] = temp;
          swaps++;
          swapped = true;
          steps.push({ type: 'swap', arr: [...a], compareIdx: [], swapIdx: [j, j + 1], settled: [...settled], comparisons, swaps, status: `Swapped ${a[j + 1]} and ${a[j]}` });
        }
      }
      settled.push(n - 1 - i);
      steps.push({ type: 'pass_done', arr: [...a], compareIdx: [], swapIdx: [], settled: [...settled], comparisons, swaps, status: `Pass ${i + 1} complete. Value ${a[n - 1 - i]} settled at index [${n - 1 - i}].` });
      if (!swapped) break;
    }
    const allSettled = a.map((_, idx) => idx);
    steps.push({ type: 'done', arr: [...a], compareIdx: [], swapIdx: [], settled: allSettled, comparisons, swaps, status: 'Bubble Sort complete!' });
    return steps;
  }

  function generateSelectionSortSteps(arr) {
    const steps = [];
    const a = [...arr];
    const n = a.length;
    let comparisons = 0, swaps = 0;
    const settled = [];
    steps.push({ type: 'start', arr: [...a], compareIdx: [], swapIdx: [], minIdx: -1, settled: [...settled], comparisons, swaps, status: 'Selection Sort ready.' });
    for (let i = 0; i < n - 1; i++) {
      let minIdx = i;
      for (let j = i + 1; j < n; j++) {
        comparisons++;
        if (a[j] < a[minIdx]) minIdx = j;
        steps.push({ type: 'compare', arr: [...a], compareIdx: [j, minIdx], swapIdx: [], minIdx, settled: [...settled], comparisons, swaps, status: `Scanning index [${j}] (${a[j]}). Current min at [${minIdx}] (${a[minIdx]})` });
      }
      if (minIdx !== i) {
        const temp = a[i]; a[i] = a[minIdx]; a[minIdx] = temp;
        swaps++;
        steps.push({ type: 'swap', arr: [...a], compareIdx: [], swapIdx: [i, minIdx], minIdx, settled: [...settled], comparisons, swaps, status: `Swapped min value ${a[i]} to index [${i}]` });
      }
      settled.push(i);
      steps.push({ type: 'pass_done', arr: [...a], compareIdx: [], swapIdx: [], minIdx: -1, settled: [...settled], comparisons, swaps, status: `Index [${i}] settled.` });
    }
    const allSettled = a.map((_, idx) => idx);
    steps.push({ type: 'done', arr: [...a], compareIdx: [], swapIdx: [], settled: allSettled, comparisons, swaps, status: 'Selection Sort complete!' });
    return steps;
  }

  function generateInsertionSortSteps(arr) {
    const steps = [];
    const a = [...arr];
    const n = a.length;
    let comparisons = 0, swaps = 0;
    let settled = [0];
    steps.push({ type: 'start', arr: [...a], compareIdx: [], swapIdx: [], settled: [...settled], comparisons, swaps, status: 'Insertion Sort ready.' });
    for (let i = 1; i < n; i++) {
      const current = a[i];
      let j = i - 1;
      steps.push({ type: 'pick', arr: [...a], compareIdx: [i], swapIdx: [], settled: [...settled], comparisons, swaps, status: `Inserting element ${current} at index [${i}] into sorted portion` });
      while (j >= 0 && a[j] > current) {
        comparisons++;
        a[j + 1] = a[j];
        swaps++;
        steps.push({ type: 'shift', arr: [...a], compareIdx: [j, j + 1], swapIdx: [j + 1], settled: [...settled], comparisons, swaps, status: `Shifted ${a[j]} right to index [${j + 1}]` });
        j--;
      }
      if (j >= 0) comparisons++;
      a[j + 1] = current;
      settled = Array.from({ length: i + 1 }, (_, idx) => idx);
      steps.push({ type: 'insert', arr: [...a], compareIdx: [], swapIdx: [j + 1], settled: [...settled], comparisons, swaps, status: `Inserted ${current} at index [${j + 1}]` });
    }
    const allSettled = a.map((_, idx) => idx);
    steps.push({ type: 'done', arr: [...a], compareIdx: [], swapIdx: [], settled: allSettled, comparisons, swaps, status: 'Insertion Sort complete!' });
    return steps;
  }

  function generateMergeSortSteps(arr) {
    const steps = [];
    const a = [...arr];
    let comparisons = 0, swaps = 0;
    const settled = [];
    steps.push({ type: 'start', arr: [...a], compareIdx: [], swapIdx: [], settled: [...settled], comparisons, swaps, status: 'Merge Sort ready.' });

    function sortRange(start, end) {
      if (start >= end) return;
      const mid = Math.floor((start + end) / 2);
      sortRange(start, mid);
      sortRange(mid + 1, end);
      merge(start, mid, end);
    }

    function merge(start, mid, end) {
      const left = a.slice(start, mid + 1);
      const right = a.slice(mid + 1, end + 1);
      let i = 0, j = 0, k = start;
      while (i < left.length && j < right.length) {
        comparisons++;
        steps.push({ type: 'compare', arr: [...a], compareIdx: [start + i, mid + 1 + j], swapIdx: [], settled: [...settled], comparisons, swaps, status: `Comparing left element ${left[i]} and right element ${right[j]}` });
        if (left[i] <= right[j]) {
          a[k] = left[i]; i++;
        } else {
          a[k] = right[j]; j++;
        }
        swaps++;
        steps.push({ type: 'write', arr: [...a], compareIdx: [], swapIdx: [k], settled: [...settled], comparisons, swaps, status: `Placed ${a[k]} at index [${k}]` });
        k++;
      }
      while (i < left.length) {
        a[k] = left[i]; i++; swaps++;
        steps.push({ type: 'write', arr: [...a], compareIdx: [], swapIdx: [k], settled: [...settled], comparisons, swaps, status: `Placed ${a[k]} at index [${k}]` });
        k++;
      }
      while (j < right.length) {
        a[k] = right[j]; j++; swaps++;
        steps.push({ type: 'write', arr: [...a], compareIdx: [], swapIdx: [k], settled: [...settled], comparisons, swaps, status: `Placed ${a[k]} at index [${k}]` });
        k++;
      }
    }

    sortRange(0, a.length - 1);
    const allSettled = a.map((_, idx) => idx);
    steps.push({ type: 'done', arr: [...a], compareIdx: [], swapIdx: [], settled: allSettled, comparisons, swaps, status: 'Merge Sort complete!' });
    return steps;
  }

  function generateQuickSortSteps(arr) {
    const steps = [];
    const a = [...arr];
    let comparisons = 0, swaps = 0;
    const settled = [];
    steps.push({ type: 'start', arr: [...a], compareIdx: [], swapIdx: [], pivotIdx: -1, settled: [...settled], comparisons, swaps, status: 'Quick Sort ready.' });

    function qSort(low, high) {
      if (low < high) {
        const p = partition(low, high);
        settled.push(p);
        qSort(low, p - 1);
        qSort(p + 1, high);
      } else if (low === high) {
        settled.push(low);
      }
    }

    function partition(low, high) {
      const pivot = a[high];
      steps.push({ type: 'pivot', arr: [...a], compareIdx: [], swapIdx: [], pivotIdx: high, settled: [...settled], comparisons, swaps, status: `Selected pivot ${pivot} at index [${high}]` });
      let i = low - 1;
      for (let j = low; j < high; j++) {
        comparisons++;
        steps.push({ type: 'compare', arr: [...a], compareIdx: [j, high], swapIdx: [], pivotIdx: high, settled: [...settled], comparisons, swaps, status: `Comparing index [${j}] (${a[j]}) against pivot ${pivot}` });
        if (a[j] < pivot) {
          i++;
          const temp = a[i]; a[i] = a[j]; a[j] = temp;
          swaps++;
          steps.push({ type: 'swap', arr: [...a], compareIdx: [], swapIdx: [i, j], pivotIdx: high, settled: [...settled], comparisons, swaps, status: `Swapped ${a[i]} and ${a[j]}` });
        }
      }
      const temp = a[i + 1]; a[i + 1] = a[high]; a[high] = temp;
      swaps++;
      steps.push({ type: 'partition_done', arr: [...a], compareIdx: [], swapIdx: [i + 1, high], pivotIdx: i + 1, settled: [...settled], comparisons, swaps, status: `Placed pivot ${pivot} at its correct position [${i + 1}]` });
      return i + 1;
    }

    qSort(0, a.length - 1);
    const allSettled = a.map((_, idx) => idx);
    steps.push({ type: 'done', arr: [...a], compareIdx: [], swapIdx: [], pivotIdx: -1, settled: allSettled, comparisons, swaps, status: 'Quick Sort complete!' });
    return steps;
  }

  function renderStackWidget(container) {
    let items = ['10', '20', '30'];
    const MAX_CAPACITY = 6;
    let isAnimating = false;

    container.innerHTML = `
      <div class="interactive-widget stack-widget">
        <div class="widget-controls">
          <div class="widget-input-group">
            <input type="text" id="stack-input" class="widget-input" placeholder="Value (e.g. 40)" maxlength="8" />
            <button class="btn btn--primary" id="btn-stack-push">+ Push</button>
          </div>
          <div class="widget-action-btns">
            <button class="btn btn--secondary" id="btn-stack-pop">Pop</button>
            <button class="btn btn--outline" id="btn-stack-peek">Peek Top</button>
            <button class="btn btn--outline" id="btn-stack-clear">Clear</button>
          </div>
        </div>
        <div class="widget-status" id="stack-status">Stack initialized with 3 elements (LIFO order).</div>
        <div class="stack-visual-wrapper">
          <div class="stack-meta">
            <span class="stack-meta__badge" id="stack-size-badge">Size: 3 / ${MAX_CAPACITY}</span>
            <span class="stack-meta__badge stack-meta__badge--top" id="stack-top-badge">TOP ➔ 30</span>
          </div>
          <div class="stack-bucket" id="stack-bucket"></div>
          <div class="stack-bucket-base">STACK BASE (Bottom)</div>
        </div>
      </div>
    `;

    const $input = container.querySelector('#stack-input');
    const $push = container.querySelector('#btn-stack-push');
    const $pop = container.querySelector('#btn-stack-pop');
    const $peek = container.querySelector('#btn-stack-peek');
    const $clear = container.querySelector('#btn-stack-clear');
    const $status = container.querySelector('#stack-status');
    const $bucket = container.querySelector('#stack-bucket');
    const $sizeBadge = container.querySelector('#stack-size-badge');
    const $topBadge = container.querySelector('#stack-top-badge');

    function updateUI(highlightIndex = null, animClass = '') {
      $bucket.innerHTML = '';
      if (items.length === 0) {
        $bucket.innerHTML = `<div class="widget-empty-msg">Stack is empty</div>`;
        $topBadge.textContent = 'TOP ➔ None';
      } else {
        $topBadge.textContent = `TOP ➔ ${items[items.length - 1]}`;
        for (let i = items.length - 1; i >= 0; i--) {
          const val = items[i];
          const isTop = i === items.length - 1;
          const isHighlight = i === highlightIndex;
          const el = document.createElement('div');
          el.className = `stack-element ${isTop ? 'stack-element--top' : ''} ${isHighlight ? 'stack-element--peek' : ''}`;
          if (animClass && i === highlightIndex) {
            el.classList.add(animClass);
          }
          el.innerHTML = `
            <span class="stack-element__val">${escapeHtml(val)}</span>
            <span class="stack-element__idx">[idx: ${i}]</span>
            ${isTop ? '<span class="stack-element__pointer">TOP</span>' : ''}
          `;
          $bucket.appendChild(el);
        }
      }
      $sizeBadge.textContent = `Size: ${items.length} / ${MAX_CAPACITY}`;
    }

    updateUI();

    $push.addEventListener('click', () => {
      if (isAnimating) return;
      const val = $input.value.trim() || String(Math.floor(Math.random() * 90) + 10);
      if (items.length >= MAX_CAPACITY) {
        $status.textContent = '⚠️ Stack Overflow! Max 6 items allowed.';
        $status.classList.add('widget-status--error');
        return;
      }
      $status.classList.remove('widget-status--error');
      items.push(val);
      $input.value = '';
      $status.textContent = `Pushed "${val}" to top of Stack (O(1)).`;
      updateUI(items.length - 1, 'anim-push');
    });

    $pop.addEventListener('click', () => {
      if (isAnimating) return;
      if (items.length === 0) {
        $status.textContent = '⚠️ Stack Underflow! Stack is empty.';
        $status.classList.add('widget-status--error');
        return;
      }
      $status.classList.remove('widget-status--error');
      const poppedVal = items[items.length - 1];
      const topEl = $bucket.querySelector('.stack-element--top');
      if (topEl) {
        isAnimating = true;
        topEl.classList.add('anim-pop');
        $status.textContent = `Popping "${poppedVal}" from top of Stack (O(1))...`;
        setTimeout(() => {
          items.pop();
          isAnimating = false;
          $status.textContent = `Popped "${poppedVal}" from Stack (O(1)).`;
          updateUI();
        }, 280);
      } else {
        items.pop();
        updateUI();
      }
    });

    $peek.addEventListener('click', () => {
      if (items.length === 0) {
        $status.textContent = 'Stack is empty. Nothing to peek.';
        return;
      }
      const topVal = items[items.length - 1];
      $status.textContent = `Peeked Top: "${topVal}" without removing (O(1)).`;
      updateUI(items.length - 1, 'anim-peek');
    });

    $clear.addEventListener('click', () => {
      items = [];
      $status.textContent = 'Stack cleared.';
      updateUI();
    });
  }

  function renderQueueWidget(container) {
    let items = ['100', '200', '300'];
    const MAX_CAPACITY = 6;
    let isAnimating = false;

    container.innerHTML = `
      <div class="interactive-widget queue-widget">
        <div class="widget-controls">
          <div class="widget-input-group">
            <input type="text" id="queue-input" class="widget-input" placeholder="Value (e.g. 400)" maxlength="8" />
            <button class="btn btn--primary" id="btn-queue-enqueue">+ Enqueue</button>
          </div>
          <div class="widget-action-btns">
            <button class="btn btn--secondary" id="btn-queue-dequeue">Dequeue</button>
            <button class="btn btn--outline" id="btn-queue-peek">Peek Front</button>
            <button class="btn btn--outline" id="btn-queue-clear">Clear</button>
          </div>
        </div>
        <div class="widget-status" id="queue-status">Queue initialized with 3 elements (FIFO order).</div>
        <div class="queue-visual-wrapper">
          <div class="queue-meta">
            <span class="queue-meta__badge" id="queue-size-badge">Size: 3 / ${MAX_CAPACITY}</span>
            <span class="queue-meta__badge queue-meta__badge--front" id="queue-front-badge">FRONT ➔ 100</span>
          </div>
          <div class="queue-pointers-bar">
            <span class="queue-pointer queue-pointer--front">FRONT (Exit) ➔</span>
            <span class="queue-pointer queue-pointer--rear">⬯ REAR (Enter)</span>
          </div>
          <div class="queue-pipe" id="queue-pipe"></div>
        </div>
      </div>
    `;

    const $input = container.querySelector('#queue-input');
    const $enqueue = container.querySelector('#btn-queue-enqueue');
    const $dequeue = container.querySelector('#btn-queue-dequeue');
    const $peek = container.querySelector('#btn-queue-peek');
    const $clear = container.querySelector('#btn-queue-clear');
    const $status = container.querySelector('#queue-status');
    const $pipe = container.querySelector('#queue-pipe');
    const $sizeBadge = container.querySelector('#queue-size-badge');
    const $frontBadge = container.querySelector('#queue-front-badge');

    function updateUI(highlightIndex = null, animClass = '') {
      $pipe.innerHTML = '';
      if (items.length === 0) {
        $pipe.innerHTML = `<div class="widget-empty-msg">Queue is empty</div>`;
        $frontBadge.textContent = 'FRONT ➔ None';
      } else {
        $frontBadge.textContent = `FRONT ➔ ${items[0]}`;
        for (let i = 0; i < items.length; i++) {
          const val = items[i];
          const isFront = i === 0;
          const isRear = i === items.length - 1;
          const isHighlight = i === highlightIndex;
          const el = document.createElement('div');
          el.className = `queue-element ${isFront ? 'queue-element--front' : ''} ${isRear ? 'queue-element--rear' : ''} ${isHighlight ? 'queue-element--peek' : ''}`;
          if (animClass && i === highlightIndex) {
            el.classList.add(animClass);
          }
          el.innerHTML = `
            ${isFront ? '<span class="queue-tag queue-tag--front">FRONT</span>' : ''}
            <span class="queue-element__val">${escapeHtml(val)}</span>
            <span class="queue-element__idx">[${i}]</span>
            ${isRear ? '<span class="queue-tag queue-tag--rear">REAR</span>' : ''}
          `;
          $pipe.appendChild(el);
        }
      }
      $sizeBadge.textContent = `Size: ${items.length} / ${MAX_CAPACITY}`;
    }

    updateUI();

    $enqueue.addEventListener('click', () => {
      if (isAnimating) return;
      const val = $input.value.trim() || String(Math.floor(Math.random() * 900) + 100);
      if (items.length >= MAX_CAPACITY) {
        $status.textContent = '⚠️ Queue Overflow! Max 6 items allowed.';
        $status.classList.add('widget-status--error');
        return;
      }
      $status.classList.remove('widget-status--error');
      items.push(val);
      $input.value = '';
      $status.textContent = `Enqueued "${val}" at Rear of Queue (O(1)).`;
      updateUI(items.length - 1, 'anim-enqueue');
    });

    $dequeue.addEventListener('click', () => {
      if (isAnimating) return;
      if (items.length === 0) {
        $status.textContent = '⚠️ Queue Underflow! Queue is empty.';
        $status.classList.add('widget-status--error');
        return;
      }
      $status.classList.remove('widget-status--error');
      const dequeuedVal = items[0];
      const frontEl = $pipe.querySelector('.queue-element--front');
      if (frontEl) {
        isAnimating = true;
        frontEl.classList.add('anim-dequeue');
        $status.textContent = `Dequeuing "${dequeuedVal}" from Front of Queue (O(1))...`;
        setTimeout(() => {
          items.shift();
          isAnimating = false;
          $status.textContent = `Dequeued "${dequeuedVal}" from Queue (O(1)).`;
          updateUI();
        }, 280);
      } else {
        items.shift();
        updateUI();
      }
    });

    $peek.addEventListener('click', () => {
      if (items.length === 0) {
        $status.textContent = 'Queue is empty. Nothing to peek.';
        return;
      }
      const frontVal = items[0];
      $status.textContent = `Peeked Front: "${frontVal}" without removing (O(1)).`;
      updateUI(0, 'anim-peek');
    });

    $clear.addEventListener('click', () => {
      items = [];
      $status.textContent = 'Queue cleared.';
      updateUI();
    });
  }

  /* ────────────────────────────────────────────
     TOAST
  ──────────────────────────────────────────── */
  let toastTimer = null;

  function showToast(message) {
    clearTimeout(toastTimer);
    $toast.textContent = message;
    $toast.classList.add('toast--visible');
    toastTimer = setTimeout(() => {
      $toast.classList.remove('toast--visible');
    }, TOAST_DURATION);
  }

  /* ────────────────────────────────────────────
     GLOBAL EVENT LISTENERS
  ──────────────────────────────────────────── */
  function bindGlobalEvents() {
    $headerLogo.addEventListener('click', (e) => {
      e.preventDefault();
      showGridView();
    });

    $btnSidebarToggle.addEventListener('click', () => {
      if ($sidebar.classList.contains('sidebar--open')) {
        closeSidebar();
      } else {
        openSidebar();
      }
    });

    $btnSidebarClose.addEventListener('click', closeSidebar);
    $sidebarOverlay.addEventListener('click', closeSidebar);

    $btnTheme.addEventListener('click', toggleTheme);

    $hamburger.addEventListener('click', () => {
      const isOpen = $headerActions.classList.toggle('header__actions--open');
      $hamburger.setAttribute('aria-expanded', isOpen);
    });

    document.addEventListener('click', e => {
      const crossLink = e.target.closest('[data-topic]');
      if (crossLink) {
        e.preventDefault();
        const targetTopicId = crossLink.getAttribute('data-topic');
        if (targetTopicId && isCompleted(targetTopicId)) {
          openLesson(targetTopicId);
        } else if (targetTopicId) {
          showToast('Locked — complete previous topics first.');
        }
        return;
      }

      if (!$hamburger.contains(e.target) && !$headerActions.contains(e.target)) {
        $headerActions.classList.remove('header__actions--open');
        $hamburger.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        closeSidebar();
        closeExport();
        closeImport();
        closeLoginModal();
        $headerActions.classList.remove('header__actions--open');
      }
    });
  }

  /* ────────────────────────────────────────────
     AUTH MODAL & GOOGLE OAUTH EVENTS
  ──────────────────────────────────────────── */
  function bindAuthModalEvents() {
    const $btnClose = document.getElementById('btn-login-close');
    const $overlay = document.getElementById('modal-login-overlay');
    const $btnGoogle = document.getElementById('btn-google-login');

    if ($btnClose) $btnClose.addEventListener('click', closeLoginModal);
    if ($overlay) {
      $overlay.addEventListener('click', e => {
        if (e.target === $overlay) closeLoginModal();
      });
    }

    if ($btnGoogle) {
      $btnGoogle.addEventListener('click', handleGoogleSignIn);
    }
  }

  let gIdInitialized = false;

  function getGoogleClientId() {
    return (window.ENV && window.ENV.GOOGLE_CLIENT_ID) || '388160599090-slda0efpv5oo0ejq6vl4foa6hiu03pst.apps.googleusercontent.com';
  }

  function initGoogleAuth() {
    const clientId = getGoogleClientId();
    if (!clientId) return;

    if (window.google && window.google.accounts && window.google.accounts.id) {
      if (!gIdInitialized) {
        try {
          window.google.accounts.id.initialize({
            client_id: clientId,
            callback: async (response) => {
              if (response && response.credential) {
                await processGoogleLogin({ credential: response.credential });
              }
            },
            auto_select: false,
            itp_support: true,
            use_fedcm_for_prompt: false
          });
          gIdInitialized = true;
        } catch (e) {
          console.warn('GSI initialize warning:', e.message);
        }
      }

      // Render standard Google Sign-In button into container for max compatibility (including Incognito)
      const container = document.getElementById('g_id_signin_container');
      if (container && container.children.length === 0) {
        try {
          window.google.accounts.id.renderButton(container, {
            theme: 'outline',
            size: 'large',
            width: 280,
            text: 'continue_with',
            shape: 'rectangular'
          });
        } catch (e) {
          console.warn('Failed to render GSI button:', e.message);
        }
      }
    }
  }

  function handleGoogleSignIn() {
    const $banner = document.getElementById('auth-error-banner');
    if ($banner) $banner.style.display = 'none';

    initGoogleAuth();

    if (window.google && window.google.accounts && window.google.accounts.id) {
      try {
        // 1. First try to trigger the rendered Google Sign-In button if available
        const renderedBtn = document.querySelector('#g_id_signin_container div[role="button"]');
        if (renderedBtn) {
          renderedBtn.click();
          return;
        }

        // 2. Fallback to Google prompt with notification handler
        window.google.accounts.id.prompt((notification) => {
          if (notification.isNotDisplayed() || notification.isSkippedMoment() || notification.isDismissedMoment()) {
            const reason = notification.getNotDisplayedReason ? notification.getNotDisplayedReason() : '';
            console.log('GSI prompt notice:', reason);
          }
        });
      } catch (e) {
        if ($banner) {
          $banner.textContent = 'Could not initiate Google Sign-In. Please click the Google button below.';
          $banner.style.display = 'block';
        }
      }
    } else {
      if ($banner) {
        $banner.textContent = 'Google Sign-In SDK is loading... Please wait a moment and try again.';
        $banner.style.display = 'block';
      }
    }
  }

  window.handleGoogleSignInCallback = async function(response) {
    if (response && response.credential) {
      await processGoogleLogin({ credential: response.credential });
    }
  };

  async function processGoogleLogin(payload) {
    const $banner = document.getElementById('auth-error-banner');
    if ($banner) $banner.style.display = 'none';

    try {
      const res = await fetch(`${API_BASE}/auth/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload)
      });
      const data = await res.json();

      if (!res.ok) {
        const errMsg = data.error ? data.error.message : 'Google authentication failed.';
        if ($banner) {
          $banner.textContent = errMsg;
          $banner.style.display = 'block';
        }
        return;
      }

      // Verification Success
      authState.accessToken = data.accessToken;
      authState.user = data.user;
      authState.isLoggedIn = true;
      localStorage.setItem('dsa_access_token', data.accessToken);
      localStorage.setItem('dsa_user', JSON.stringify(data.user));
      localStorage.setItem('dsa_has_session', 'true');
      sessionStorage.setItem('dsa_access_token', data.accessToken);
      renderHeaderAuthUI();
      closeLoginModal();
      showToast(`Signed in as ${data.user.email}`);

      await syncProgressWithServer();

      if (pendingAction && pendingAction.type === 'toggle_topic') {
        const topicToToggle = pendingAction.topicId;
        const intendedState = pendingAction.intendedState;
        pendingAction = null;
        await handleTopicCompletionToggle(topicToToggle, intendedState);
      }
    } catch (err) {
      if ($banner) {
        $banner.textContent = 'Network error during Google sign-in.';
        $banner.style.display = 'block';
      }
    }
  }

  /* ────────────────────────────────────────────
     UTILS
  ──────────────────────────────────────────── */
  function escapeHtml(str) {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  /* ────────────────────────────────────────────
     INIT
  ──────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', boot);
})();
