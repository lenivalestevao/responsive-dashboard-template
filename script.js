/* Dash Admin: vanilla JavaScript, no dependencies.
   Pages are rendered in the browser and routed with the URL hash (#/orders),
   so the template works on any static host such as GitHub Pages. */
(function () {
  'use strict';

  /* ---------- Icons (Feather-style, inline SVG) ---------- */
  const PATHS = {
    home: '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
    chart: '<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>',
    users: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    cart: '<circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>',
    package: '<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
    bell: '<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>',
    search: '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
    menu: '<line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>',
    moon: '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>',
    sun: '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>',
    user: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
    logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>',
    plus: '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',
    x: '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
    dollar: '<line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>',
    trending: '<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>',
    'chevron-left': '<polyline points="15 18 9 12 15 6"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
    download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>',
    activity: '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>'
  };
  const icon = (name, size) => {
    const s = size || 18;
    return `<svg class="i" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${PATHS[name] || ''}</svg>`;
  };
  const hydrateIcons = (root) => {
    (root || document).querySelectorAll('[data-icon]').forEach((el) => {
      if (!el.firstChild) el.innerHTML = icon(el.dataset.icon, Number(el.dataset.size) || 18);
    });
  };

  /* ---------- Demo data (replace with your API) ---------- */
  const money = (n) => '$' + Number(n).toLocaleString('en-US');
  const fmtDate = (d) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const initials = (name) => name.split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase();
  const TONES = ['primary', 'success', 'danger', 'warning', 'info'];
  const BADGE = { Completed: 'success', Active: 'success', Processing: 'primary', Pending: 'warning', Cancelled: 'danger', Inactive: 'muted', 'In stock': 'success', 'Low stock': 'warning', 'Out of stock': 'danger' };
  const badge = (text) => `<span class="badge badge-${BADGE[text] || 'muted'}">${text}</span>`;

  const COUNTRIES = ['United States', 'Brazil', 'Germany', 'Spain', 'Canada', 'Japan'];
  const customers = ['Emma Smith', 'Max Johnson', 'Sean Bean', 'Brian Cox', 'Mikaela Collins', 'Francis Mitchell', 'Olivia Wild', 'Neil Owen', 'Dan Wilson', 'Ana Crown', 'Robert Doe', 'Sofia Lima'].map((name, i) => ({
    id: i + 1,
    name,
    email: name.toLowerCase().replace(' ', '.') + '@example.com',
    country: COUNTRIES[i % COUNTRIES.length],
    status: i % 5 === 3 ? 'Inactive' : 'Active',
    orders: 3 + ((i * 7) % 19),
    spent: 420 + ((i * 937) % 4800),
    joined: fmtDate(new Date(2025, i % 12, 8 + i))
  }));

  const products = [
    { id: 1, name: 'Aero Wireless Headphones', cat: 'Electronics', price: 129, stock: 84, sold: 412, emoji: '🎧', hue: 210 },
    { id: 2, name: 'Nimbus Running Shoes', cat: 'Fashion', price: 89, stock: 23, sold: 388, emoji: '👟', hue: 350 },
    { id: 3, name: 'Brew Master Coffee Maker', cat: 'Home', price: 149, stock: 41, sold: 260, emoji: '☕', hue: 30 },
    { id: 4, name: 'Pixel Pro Smartwatch', cat: 'Electronics', price: 219, stock: 12, sold: 341, emoji: '⌚', hue: 260 },
    { id: 5, name: 'Urban Leather Backpack', cat: 'Fashion', price: 99, stock: 67, sold: 204, emoji: '🎒', hue: 20 },
    { id: 6, name: 'Lumen Desk Lamp', cat: 'Home', price: 49, stock: 0, sold: 187, emoji: '💡', hue: 50 },
    { id: 7, name: 'Zen Yoga Mat', cat: 'Sports', price: 35, stock: 152, sold: 299, emoji: '🧘', hue: 150 },
    { id: 8, name: 'Trail Water Bottle', cat: 'Sports', price: 24, stock: 310, sold: 521, emoji: '🧴', hue: 190 }
  ];
  const stockLabel = (p) => (p.stock === 0 ? 'Out of stock' : p.stock < 25 ? 'Low stock' : 'In stock');

  const ORDER_STATUS = ['Completed', 'Completed', 'Processing', 'Pending', 'Completed', 'Cancelled', 'Processing'];
  const orders = Array.from({ length: 30 }, (_, i) => {
    const customer = customers[(i * 5) % customers.length];
    const product = products[(i * 3) % products.length];
    const qty = 1 + (i % 3);
    return {
      id: '#' + (10480 - i),
      customer,
      product,
      qty,
      amount: product.price * qty,
      status: ORDER_STATUS[i % ORDER_STATUS.length],
      date: fmtDate(new Date(2026, 10, 18 - Math.floor(i / 2)))
    };
  });

  /* ---------- SVG charts ---------- */
  function lineChart(labels, series, o) {
    o = o || {};
    const W = 640, H = o.h || 280, pl = 46, pr = 12, pt = 16, pb = 30;
    const max = Math.max(...series.flatMap((s) => s.data));
    const top = Math.ceil(max / 10) * 10;
    const x = (i) => pl + (i * (W - pl - pr)) / (labels.length - 1);
    const y = (v) => pt + (H - pt - pb) * (1 - v / top);
    let g = '';
    for (let k = 0; k <= 4; k++) {
      const v = (top * k) / 4, yy = y(v);
      g += `<line x1="${pl}" x2="${W - pr}" y1="${yy}" y2="${yy}" class="grid-line"/><text x="${pl - 8}" y="${yy + 4}" text-anchor="end" class="axis">${(o.prefix || '') + v + (o.suffix || '')}</text>`;
    }
    labels.forEach((l, i) => { g += `<text x="${x(i)}" y="${H - 8}" text-anchor="middle" class="axis">${l}</text>`; });
    series.forEach((s, si) => {
      const d = s.data.map((v, i) => (i ? 'L' : 'M') + x(i).toFixed(1) + ' ' + y(v).toFixed(1)).join(' ');
      if (si === 0) g += `<path d="${d} L${x(labels.length - 1)} ${y(0)} L${x(0)} ${y(0)} Z" style="fill:${s.color}" opacity=".09"/>`;
      g += `<path d="${d}" fill="none" style="stroke:${s.color}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>`;
    });
    return `<svg viewBox="0 0 ${W} ${H}" class="chart" role="img" aria-label="Line chart">${g}</svg>`;
  }

  function barChart(labels, data, color, o) {
    o = o || {};
    const W = 640, H = o.h || 260, pl = 46, pr = 12, pt = 16, pb = 30;
    const top = Math.ceil(Math.max(...data) / 10) * 10;
    const slot = (W - pl - pr) / data.length, bw = Math.min(40, slot * 0.55);
    const y = (v) => pt + (H - pt - pb) * (1 - v / top);
    let g = '';
    for (let k = 0; k <= 4; k++) {
      const v = (top * k) / 4, yy = y(v);
      g += `<line x1="${pl}" x2="${W - pr}" y1="${yy}" y2="${yy}" class="grid-line"/><text x="${pl - 8}" y="${yy + 4}" text-anchor="end" class="axis">${(o.suffix ? v + o.suffix : v)}</text>`;
    }
    data.forEach((v, i) => {
      const cx = pl + slot * i + slot / 2;
      g += `<rect x="${cx - bw / 2}" y="${y(v)}" width="${bw}" height="${y(0) - y(v)}" rx="6" style="fill:${color}"/><text x="${cx}" y="${H - 8}" text-anchor="middle" class="axis">${labels[i]}</text>`;
    });
    return `<svg viewBox="0 0 ${W} ${H}" class="chart" role="img" aria-label="Bar chart">${g}</svg>`;
  }

  function donut(items, centerText, centerSub) {
    const total = items.reduce((a, b) => a + b.value, 0);
    let offset = 25;
    const segs = items.map((it) => {
      const p = (it.value / total) * 100;
      const s = `<circle cx="21" cy="21" r="15.915" fill="none" style="stroke:${it.color}" stroke-width="5" stroke-dasharray="${p - 0.6} ${100 - p + 0.6}" stroke-dashoffset="${offset}"/>`;
      offset -= p;
      return s;
    }).join('');
    const legend = items.map((it) => `<div><i style="background:${it.color}"></i>${it.label}<b>${Math.round((it.value / total) * 100)}%</b></div>`).join('');
    return `<svg viewBox="0 0 42 42" class="donut" role="img" aria-label="Donut chart"><circle cx="21" cy="21" r="15.915" fill="none" style="stroke:var(--hover)" stroke-width="5"/>${segs}<text x="21" y="22" text-anchor="middle" class="donut-total">${centerText}</text><text x="21" y="27" text-anchor="middle" class="donut-sub">${centerSub}</text></svg><div class="legend">${legend}</div>`;
  }

  /* ---------- Reusable pieces ---------- */
  const statCard = (tone, ic, value, label, delta) => `
    <div class="card stat">
      <div class="stat-top"><span class="stat-icon ${tone}">${icon(ic, 22)}</span><span class="delta ${delta >= 0 ? 'up' : 'down'}">${delta >= 0 ? '+' : ''}${delta}%</span></div>
      <div><div class="stat-value">${value}</div><div class="stat-label">${label}</div></div>
    </div>`;

  const userCell = (c) => `<div class="user-cell"><span class="avatar avatar-sm ${TONES[c.id % TONES.length]}">${initials(c.name)}</span><div><b>${c.name}</b><small>${c.email}</small></div></div>`;
  const crumb = (...items) => items;

  const PER_PAGE = 8;
  function paginate(list, page) {
    const pages = Math.max(1, Math.ceil(list.length / PER_PAGE));
    const p = Math.min(Math.max(1, page), pages);
    return { items: list.slice((p - 1) * PER_PAGE, p * PER_PAGE), page: p, pages, total: list.length };
  }
  function pager(key, pg) {
    const from = pg.total ? (pg.page - 1) * PER_PAGE + 1 : 0;
    const to = Math.min(pg.page * PER_PAGE, pg.total);
    let btns = `<button data-action="page" data-key="${key}" data-page="${pg.page - 1}" ${pg.page === 1 ? 'disabled' : ''} aria-label="Previous">‹</button>`;
    for (let i = 1; i <= pg.pages; i++) btns += `<button data-action="page" data-key="${key}" data-page="${i}" class="${i === pg.page ? 'active' : ''}">${i}</button>`;
    btns += `<button data-action="page" data-key="${key}" data-page="${pg.page + 1}" ${pg.page === pg.pages ? 'disabled' : ''} aria-label="Next">›</button>`;
    return `<div class="pager"><span>Showing ${from} to ${to} of ${pg.total}</span><div class="pager-btns">${btns}</div></div>`;
  }

  /* ---------- State ---------- */
  const state = {
    orders: { q: '', status: 'All', page: 1 },
    customers: { q: '', page: 1 },
    products: { cat: 'All' }
  };

  /* ---------- Tables ---------- */
  function ordersTable() {
    const s = state.orders, q = s.q.trim().toLowerCase();
    const list = orders.filter((o) => (s.status === 'All' || o.status === s.status) && (!q || (o.id + o.customer.name + o.product.name).toLowerCase().includes(q)));
    const pg = paginate(list, s.page);
    s.page = pg.page;
    const rows = pg.items.map((o) => `
      <tr class="clickable" data-action="order-view" data-id="${o.id}">
        <td><b>${o.id}</b></td><td>${userCell(o.customer)}</td><td>${o.product.name}</td>
        <td>${o.date}</td><td><b>${money(o.amount)}</b></td><td>${badge(o.status)}</td>
      </tr>`).join('');
    return `<div class="table-wrap"><table><thead><tr><th>Order</th><th>Customer</th><th>Product</th><th>Date</th><th>Amount</th><th>Status</th></tr></thead><tbody>${rows || '<tr><td colspan="6" class="empty">No orders match your filters.</td></tr>'}</tbody></table></div>${pager('orders', pg)}`;
  }

  function customersTable() {
    const s = state.customers, q = s.q.trim().toLowerCase();
    const list = customers.filter((c) => !q || (c.name + c.email + c.country).toLowerCase().includes(q));
    const pg = paginate(list, s.page);
    s.page = pg.page;
    const rows = pg.items.map((c) => `
      <tr><td>${userCell(c)}</td><td>${c.country}</td><td>${badge(c.status)}</td><td>${c.orders}</td><td><b>${money(c.spent)}</b></td><td>${c.joined}</td></tr>`).join('');
    return `<div class="table-wrap"><table><thead><tr><th>Customer</th><th>Country</th><th>Status</th><th>Orders</th><th>Total spent</th><th>Joined</th></tr></thead><tbody>${rows || '<tr><td colspan="6" class="empty">No customers found.</td></tr>'}</tbody></table></div>${pager('customers', pg)}`;
  }

  /* ---------- Pages ---------- */
  const pages = {};

  pages.dashboard = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const recent = orders.slice(0, 6).map((o) => `
      <tr class="clickable" data-action="order-view" data-id="${o.id}"><td><b>${o.id}</b></td><td>${userCell(o.customer)}</td><td><b>${money(o.amount)}</b></td><td>${badge(o.status)}</td></tr>`).join('');
    const activity = [
      ['var(--success)', 'Order #10480 completed', 'Emma Smith · 5 min ago'],
      ['var(--primary)', 'New customer registered', 'Sofia Lima · 40 min ago'],
      ['var(--warning)', 'Low stock: Pixel Pro Smartwatch', '12 units left · 2 h ago'],
      ['var(--danger)', 'Order #10473 cancelled', 'Neil Owen · 5 h ago'],
      ['var(--info)', 'Weekly report generated', 'Yesterday']
    ].map((a) => `<div class="tl-item"><span class="tl-dot" style="background:${a[0]}"></span><div><b>${a[1]}</b><small>${a[2]}</small></div></div>`).join('');
    return `
    <div class="grid cols-4">
      ${statCard('primary', 'dollar', '$48,290', 'Total revenue', 12.5)}
      ${statCard('success', 'cart', '1,284', 'Orders', 8.2)}
      ${statCard('info', 'users', '3,942', 'Customers', 4.1)}
      ${statCard('danger', 'activity', '1.8%', 'Refund rate', -0.6)}
    </div>
    <div class="grid split">
      <div class="card">
        <div class="card-head"><div><h3>Revenue overview</h3><small>Monthly revenue in thousands</small></div>
          <div class="legend-inline"><span><i style="background:var(--primary)"></i>This year</span><span><i style="background:#c2c9d6"></i>Last year</span></div></div>
        <div class="card-body">${lineChart(months, [
          { color: 'var(--primary)', data: [18, 22, 19, 27, 31, 29, 35, 38, 34, 42, 46, 51] },
          { color: '#c2c9d6', data: [14, 16, 17, 19, 22, 24, 25, 28, 27, 31, 33, 36] }
        ], { prefix: '$', suffix: 'k' })}</div>
      </div>
      <div class="card">
        <div class="card-head"><div><h3>Sales by category</h3><small>Last 30 days</small></div></div>
        <div class="card-body">${donut([
          { label: 'Electronics', value: 42, color: 'var(--primary)' },
          { label: 'Fashion', value: 27, color: 'var(--success)' },
          { label: 'Home', value: 19, color: 'var(--warning)' },
          { label: 'Sports', value: 12, color: 'var(--info)' }
        ], '$12.4k', 'this month')}</div>
      </div>
    </div>
    <div class="grid split">
      <div class="card">
        <div class="card-head"><div><h3>Recent orders</h3><small>Latest transactions</small></div><a class="btn btn-light btn-sm" href="#/orders">View all</a></div>
        <div class="table-wrap"><table><thead><tr><th>Order</th><th>Customer</th><th>Amount</th><th>Status</th></tr></thead><tbody>${recent}</tbody></table></div>
      </div>
      <div class="card">
        <div class="card-head"><div><h3>Activity</h3><small>What happened today</small></div></div>
        <div class="card-body"><div class="timeline">${activity}</div></div>
      </div>
    </div>`;
  };

  pages.analytics = () => {
    const sources = [['Organic search', 46, 'var(--primary)'], ['Direct', 24, 'var(--success)'], ['Social media', 18, 'var(--info)'], ['Referral', 12, 'var(--warning)']]
      .map((s) => `<div class="list-row"><div class="grow"><div style="display:flex;justify-content:space-between;margin-bottom:8px"><b>${s[0]}</b><span>${s[1]}%</span></div><div class="progress"><span style="width:${s[1]}%;background:${s[2]}"></span></div></div></div>`).join('');
    const pagesRows = [['/home', '12,480', '28%', '2m 14s'], ['/products', '8,932', '31%', '3m 02s'], ['/pricing', '5,210', '24%', '1m 48s'], ['/blog/launch', '3,764', '38%', '4m 21s'], ['/contact', '1,912', '45%', '0m 52s']]
      .map((r) => `<tr><td><b>${r[0]}</b></td><td>${r[1]}</td><td>${r[2]}</td><td>${r[3]}</td></tr>`).join('');
    return `
    <div class="grid cols-4">
      ${statCard('primary', 'users', '24.8k', 'Visitors', 18.2)}
      ${statCard('warning', 'activity', '32%', 'Bounce rate', -2.4)}
      ${statCard('info', 'trending', '3m 24s', 'Avg. session', 6.7)}
      ${statCard('success', 'cart', '3.6%', 'Conversion', 0.9)}
    </div>
    <div class="grid split">
      <div class="card">
        <div class="card-head"><div><h3>Visits this week</h3><small>Unique visitors per day</small></div></div>
        <div class="card-body">${barChart(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], [32, 41, 38, 52, 47, 29, 24], 'var(--primary)', { suffix: 'k' })}</div>
      </div>
      <div class="card">
        <div class="card-head"><div><h3>Devices</h3><small>Share of sessions</small></div></div>
        <div class="card-body">${donut([
          { label: 'Desktop', value: 54, color: 'var(--primary)' },
          { label: 'Mobile', value: 36, color: 'var(--success)' },
          { label: 'Tablet', value: 10, color: 'var(--warning)' }
        ], '24.8k', 'sessions')}</div>
      </div>
    </div>
    <div class="grid cols-2">
      <div class="card"><div class="card-head"><div><h3>Traffic sources</h3><small>Where visitors come from</small></div></div><div class="card-body">${sources}</div></div>
      <div class="card"><div class="card-head"><div><h3>Top pages</h3><small>Most viewed this month</small></div></div>
        <div class="table-wrap"><table><thead><tr><th>Page</th><th>Views</th><th>Bounce</th><th>Time</th></tr></thead><tbody>${pagesRows}</tbody></table></div></div>
    </div>`;
  };

  pages.orders = () => {
    const opts = ['All', 'Completed', 'Processing', 'Pending', 'Cancelled'].map((s) => `<option ${state.orders.status === s ? 'selected' : ''}>${s}</option>`).join('');
    return `
    <div class="card">
      <div class="card-head">
        <div class="filters">
          <input class="input" type="search" placeholder="Search orders..." value="${state.orders.q}" data-filter="orders-q">
          <select class="input" data-filter="orders-status" style="width:160px">${opts}</select>
        </div>
        <span class="badge badge-primary">${orders.length} orders</span>
      </div>
      <div id="ordersTable">${ordersTable()}</div>
    </div>`;
  };

  pages.customers = () => `
    <div class="card">
      <div class="card-head">
        <div class="filters"><input class="input" type="search" placeholder="Search customers..." value="${state.customers.q}" data-filter="customers-q"></div>
        <span class="badge badge-primary">${customers.length} customers</span>
      </div>
      <div id="customersTable">${customersTable()}</div>
    </div>`;

  pages.products = () => {
    const cats = ['All', ...new Set(products.map((p) => p.cat))];
    const chips = cats.map((c) => `<button class="chip ${state.products.cat === c ? 'active' : ''}" data-action="cat" data-cat="${c}">${c}</button>`).join('');
    const cards = products.filter((p) => state.products.cat === 'All' || p.cat === state.products.cat).map((p) => {
      const pct = Math.min(100, Math.round((p.stock / 150) * 100));
      const tone = p.stock === 0 ? 'var(--danger)' : p.stock < 25 ? 'var(--warning)' : 'var(--success)';
      return `
      <div class="card product">
        <div class="product-img" style="background:hsl(${p.hue} 90% 94%)">${p.emoji}</div>
        <div class="product-body">
          <div style="display:flex;justify-content:space-between;align-items:center"><small>${p.cat}</small>${badge(stockLabel(p))}</div>
          <b>${p.name}</b>
          <div class="progress"><span style="width:${pct}%;background:${tone}"></span></div>
          <small>${p.stock} in stock · ${p.sold} sold</small>
          <div class="product-price">${money(p.price)}</div>
        </div>
      </div>`;
    }).join('');
    return `<div class="chips" style="margin-bottom:24px">${chips}</div><div class="grid cols-4">${cards}</div>`;
  };

  const toggle = (name, title, desc, on) => `
    <div class="setting-row"><div><b>${title}</b><small>${desc}</small></div><label class="switch"><input type="checkbox" name="${name}" ${on ? 'checked' : ''}><span></span></label></div>`;

  pages.settings = (tab) => {
    tab = ['profile', 'security', 'notifications', 'appearance'].includes(tab) ? tab : 'profile';
    const tabs = [['profile', 'Profile'], ['security', 'Security'], ['notifications', 'Notifications'], ['appearance', 'Appearance']]
      .map((t) => `<a href="#/settings/${t[0]}" class="${t[0] === tab ? 'active' : ''}">${t[1]}</a>`).join('');
    const dark = document.documentElement.dataset.theme === 'dark';
    const body = {
      profile: `
        <div class="profile-head"><span class="avatar">LJ</span><div><h3>Leni Junior</h3><span style="color:var(--muted)">Full Stack Developer</span></div></div>
        <form data-form="Profile saved">
          <div class="form-grid">
            <div class="field"><label>First name</label><input class="input" value="Leni"></div>
            <div class="field"><label>Last name</label><input class="input" value="Junior"></div>
            <div class="field"><label>Email</label><input class="input" type="email" value="leni@example.com"></div>
            <div class="field"><label>Company</label><input class="input" value="Dash Admin"></div>
          </div>
          <div class="field"><label>Bio</label><textarea class="input">I build and integrate web systems end to end.</textarea></div>
          <div class="form-actions"><button type="reset" class="btn btn-light">Discard</button><button class="btn btn-primary">Save changes</button></div>
        </form>`,
      security: `
        <form data-form="Password updated">
          <div class="form-grid">
            <div class="field"><label>Current password</label><input class="input" type="password" placeholder="••••••••"></div><div></div>
            <div class="field"><label>New password</label><input class="input" type="password" placeholder="At least 8 characters"></div>
            <div class="field"><label>Confirm new password</label><input class="input" type="password" placeholder="Repeat it"></div>
          </div>
          ${toggle('2fa', 'Two-factor authentication', 'Ask for a code when you sign in on a new device', true)}
          ${toggle('alerts', 'Login alerts', 'Email me when someone signs in to my account', false)}
          <div class="form-actions"><button class="btn btn-primary">Update password</button></div>
        </form>`,
      notifications: `
        <form data-form="Preferences saved">
          ${toggle('n1', 'New orders', 'Get notified when a customer places an order', true)}
          ${toggle('n2', 'Low stock', 'Alert me when a product is almost out of stock', true)}
          ${toggle('n3', 'Weekly report', 'A summary of sales and traffic every Monday', false)}
          ${toggle('n4', 'Product news', 'Tips and updates about new features', false)}
          <div class="form-actions"><button class="btn btn-primary">Save preferences</button></div>
        </form>`,
      appearance: `
        <div class="theme-opts">
          <button class="theme-opt ${dark ? '' : 'active'}" data-action="set-theme" data-theme="light"><div class="theme-prev"><i></i><b></b></div><b>Light</b></button>
          <button class="theme-opt ${dark ? 'active' : ''}" data-action="set-theme" data-theme="dark"><div class="theme-prev dark"><i></i><b></b></div><b>Dark</b></button>
        </div>`
    }[tab];
    return `<div class="card" style="max-width:860px"><div class="tabs">${tabs}</div><div class="card-body pad">${body}</div></div>`;
  };

  pages.notfound = () => `<div class="card"><div class="empty"><h2 style="font-size:48px;color:var(--text)">404</h2><p style="margin:8px 0 18px">This page does not exist.</p><a class="btn btn-primary" href="#/dashboard">Back to dashboard</a></div></div>`;

  /* ---------- Navigation ---------- */
  const NAV = [
    { title: 'Dashboards' },
    { key: 'dashboard', label: 'Overview', icon: 'home' },
    { key: 'analytics', label: 'Analytics', icon: 'chart' },
    { title: 'Apps' },
    { key: 'orders', label: 'Orders', icon: 'cart', badge: orders.filter((o) => o.status === 'Pending').length },
    { key: 'customers', label: 'Customers', icon: 'users' },
    { key: 'products', label: 'Products', icon: 'package' },
    { title: 'Account' },
    { key: 'settings', label: 'Settings', icon: 'settings' }
  ];
  const META = {
    dashboard: ['Overview', ['Dashboards']],
    analytics: ['Analytics', ['Dashboards']],
    orders: ['Orders', ['Apps']],
    customers: ['Customers', ['Apps']],
    products: ['Products', ['Apps']],
    settings: ['Settings', ['Account']],
    notfound: ['Page not found', []]
  };
  const ACTIONS = {
    orders: `<button class="btn btn-light" data-action="export"><span data-icon="download"></span>Export</button>`,
    customers: `<button class="btn btn-primary" data-action="customer-new"><span data-icon="plus"></span>Add customer</button>`,
    products: `<button class="btn btn-primary" data-action="product-new"><span data-icon="plus"></span>Add product</button>`
  };

  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));

  $('#menu').innerHTML = NAV.map((n) => n.title
    ? `<div class="menu-title">${n.title}</div>`
    : `<a class="menu-link" href="#/${n.key}" data-key="${n.key}">${icon(n.icon, 20)}<span class="menu-text">${n.label}</span>${n.badge ? `<span class="badge badge-danger">${n.badge}</span>` : ''}</a>`).join('');

  function render() {
    const parts = (location.hash.replace(/^#\/?/, '') || 'dashboard').split('/');
    const key = pages[parts[0]] ? parts[0] : 'notfound';
    const meta = META[key];
    $('#view').innerHTML = pages[key](parts[1]);
    $('#pageTitle').textContent = meta[0];
    document.title = meta[0] + ' | Dash Admin';
    $('#crumbs').innerHTML = `<li><a href="#/dashboard">Home</a></li>` + meta[1].map((c) => `<li>${c}</li>`).join('') + `<li>${meta[0]}</li>`;
    $('#toolbarActions').innerHTML = ACTIONS[key] || '';
    $$('.menu-link').forEach((a) => a.classList.toggle('active', a.dataset.key === key));
    hydrateIcons();
    document.body.classList.remove('aside-open');
    closeDropdowns();
    window.scrollTo(0, 0);
  }

  /* ---------- Theme ---------- */
  function applyTheme(t) {
    document.documentElement.dataset.theme = t;
    try { localStorage.setItem('dash-theme', t); } catch (e) { /* storage unavailable */ }
    const btn = $('#themeBtn');
    if (btn) btn.innerHTML = icon(t === 'dark' ? 'sun' : 'moon');
  }
  let saved = null;
  try { saved = localStorage.getItem('dash-theme'); } catch (e) { /* ignore */ }
  applyTheme(saved === 'dark' ? 'dark' : 'light');

  /* ---------- Modal, toast, dropdowns ---------- */
  function openModal(title, body, foot) {
    $('#modalTitle').textContent = title;
    $('#modalBody').innerHTML = body;
    $('#modalFoot').innerHTML = foot || '';
    $('#modal').hidden = false;
    hydrateIcons($('#modal'));
    const first = $('#modalBody input, #modalBody select');
    if (first) first.focus();
  }
  const closeModal = () => { $('#modal').hidden = true; };
  function toast(msg) {
    const t = document.createElement('div');
    t.className = 'toast';
    t.textContent = msg;
    $('#toasts').appendChild(t);
    setTimeout(() => t.remove(), 2800);
  }
  function closeDropdowns(except) { $$('.dd.show').forEach((d) => { if (d !== except) d.classList.remove('show'); }); }

  function orderModal(id) {
    const o = orders.find((x) => x.id === id);
    if (!o) return;
    openModal('Order ' + o.id, `
      <div class="detail-grid">
        <div><small>Customer</small><b>${o.customer.name}</b></div><div><small>Email</small><b>${o.customer.email}</b></div>
        <div><small>Product</small><b>${o.product.name}</b></div><div><small>Quantity</small><b>${o.qty}</b></div>
        <div><small>Date</small><b>${o.date}</b></div><div><small>Status</small>${badge(o.status)}</div>
        <div><small>Unit price</small><b>${money(o.product.price)}</b></div><div><small>Total</small><b style="font-size:18px">${money(o.amount)}</b></div>
      </div>`, `<button class="btn btn-light" data-action="modal-close">Close</button>`);
  }

  function customerModal() {
    const opts = COUNTRIES.map((c) => `<option>${c}</option>`).join('');
    openModal('Add customer', `
      <form id="customerForm">
        <div class="field"><label>Full name</label><input class="input" name="name" required placeholder="Jane Doe"></div>
        <div class="field"><label>Email</label><input class="input" name="email" type="email" required placeholder="jane@example.com"></div>
        <div class="field"><label>Country</label><select class="input" name="country">${opts}</select></div>
      </form>`, `<button class="btn btn-light" data-action="modal-close">Cancel</button><button class="btn btn-primary" data-action="customer-save">Save customer</button>`);
  }

  function productModal() {
    openModal('Add product', `
      <form id="productForm">
        <div class="field"><label>Product name</label><input class="input" name="name" required placeholder="Wireless Mouse"></div>
        <div class="form-grid">
          <div class="field"><label>Category</label><select class="input" name="cat"><option>Electronics</option><option>Fashion</option><option>Home</option><option>Sports</option></select></div>
          <div class="field"><label>Price (USD)</label><input class="input" name="price" type="number" min="1" required placeholder="49"></div>
        </div>
        <div class="field"><label>Stock</label><input class="input" name="stock" type="number" min="0" value="50"></div>
      </form>`, `<button class="btn btn-light" data-action="modal-close">Cancel</button><button class="btn btn-primary" data-action="product-save">Save product</button>`);
  }

  /* ---------- Events ---------- */
  const actions = {
    'toggle-aside': () => document.body.classList.toggle('aside-min'),
    'open-drawer': () => (window.innerWidth > 991 ? document.body.classList.toggle('aside-hide') : document.body.classList.add('aside-open')),
    'close-drawer': () => document.body.classList.remove('aside-open'),
    'toggle-theme': () => { applyTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'); closeDropdowns(); if (location.hash.indexOf('appearance') > -1) render(); },
    'set-theme': (el) => { applyTheme(el.dataset.theme); render(); },
    dd: (el) => { const d = el.closest('.dd'); closeDropdowns(d); d.classList.toggle('show'); },
    signout: () => { closeDropdowns(); toast('This is a demo, there is no real session.'); },
    'modal-close': closeModal,
    'order-view': (el) => orderModal(el.dataset.id),
    export: () => toast('Connect your backend to export real data.'),
    page: (el) => {
      const key = el.dataset.key;
      state[key].page = Number(el.dataset.page);
      $('#' + key + 'Table').innerHTML = key === 'orders' ? ordersTable() : customersTable();
    },
    cat: (el) => { state.products.cat = el.dataset.cat; $('#view').innerHTML = pages.products(); },
    'customer-new': customerModal,
    'product-new': productModal,
    'customer-save': () => {
      const f = $('#customerForm');
      if (!f.reportValidity()) return;
      const d = new FormData(f);
      customers.unshift({ id: customers.length + 1, name: d.get('name'), email: d.get('email'), country: d.get('country'), status: 'Active', orders: 0, spent: 0, joined: fmtDate(new Date()) });
      closeModal();
      state.customers = { q: '', page: 1 };
      render();
      toast('Customer added');
    },
    'product-save': () => {
      const f = $('#productForm');
      if (!f.reportValidity()) return;
      const d = new FormData(f);
      products.unshift({ id: products.length + 1, name: d.get('name'), cat: d.get('cat'), price: Number(d.get('price')), stock: Number(d.get('stock')) || 0, sold: 0, emoji: '📦', hue: 220 });
      closeModal();
      state.products.cat = 'All';
      render();
      toast('Product added');
    }
  };

  document.addEventListener('click', (e) => {
    const el = e.target.closest('[data-action]');
    if (el && actions[el.dataset.action]) { e.preventDefault(); actions[el.dataset.action](el, e); }
    if (!e.target.closest('.dd')) closeDropdowns();
    if (e.target.id === 'modal') closeModal();
  });

  document.addEventListener('input', (e) => {
    const f = e.target.dataset && e.target.dataset.filter;
    if (!f) return;
    if (f === 'orders-q') { state.orders.q = e.target.value; state.orders.page = 1; $('#ordersTable').innerHTML = ordersTable(); }
    if (f === 'orders-status') { state.orders.status = e.target.value; state.orders.page = 1; $('#ordersTable').innerHTML = ordersTable(); }
    if (f === 'customers-q') { state.customers.q = e.target.value; state.customers.page = 1; $('#customersTable').innerHTML = customersTable(); }
  });

  document.addEventListener('submit', (e) => {
    const form = e.target.closest('[data-form]');
    if (form) { e.preventDefault(); toast(form.dataset.form); }
  });

  $('#globalSearch').addEventListener('keydown', (e) => {
    if (e.key !== 'Enter') return;
    state.orders = { q: e.target.value, status: 'All', page: 1 };
    e.target.value = '';
    if (location.hash === '#/orders') render(); else location.hash = '#/orders';
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { closeModal(); closeDropdowns(); document.body.classList.remove('aside-open'); }
  });

  window.addEventListener('hashchange', render);
  hydrateIcons();
  render();
})();
/* Dash Admin: vanilla JavaScript, no dependencies.
   Pages are rendered in the browser and routed with the URL hash (#/orders),
   so the template works on any static host such as GitHub Pages. */
(function () {
  'use strict';

  /* ---------- Icons (Feather-style, inline SVG) ---------- */
  const PATHS = {
    home: '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
    chart: '<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>',
    users: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    cart: '<circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>',
    package: '<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
    bell: '<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>',
    search: '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
    menu: '<line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>',
    moon: '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>',
    sun: '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>',
    user: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
    logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>',
    plus: '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',
    x: '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
    dollar: '<line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>',
    trending: '<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>',
    'chevron-left': '<polyline points="15 18 9 12 15 6"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
    download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>',
    activity: '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>'
  };
  const icon = (name, size) => {
    const s = size || 18;
    return `<svg class="i" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${PATHS[name] || ''}</svg>`;
  };
  const hydrateIcons = (root) => {
    (root || document).querySelectorAll('[data-icon]').forEach((el) => {
      if (!el.firstChild) el.innerHTML = icon(el.dataset.icon, Number(el.dataset.size) || 18);
    });
  };

  /* ---------- Demo data (replace with your API) ---------- */
  const money = (n) => '$' + Number(n).toLocaleString('en-US');
  const fmtDate = (d) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const initials = (name) => name.split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase();
  const TONES = ['primary', 'success', 'danger', 'warning', 'info'];
  const BADGE = { Completed: 'success', Active: 'success', Processing: 'primary', Pending: 'warning', Cancelled: 'danger', Inactive: 'muted', 'In stock': 'success', 'Low stock': 'warning', 'Out of stock': 'danger' };
  const badge = (text) => `<span class="badge badge-${BADGE[text] || 'muted'}">${text}</span>`;

  const COUNTRIES = ['United States', 'Brazil', 'Germany', 'Spain', 'Canada', 'Japan'];
  const customers = ['Emma Smith', 'Max Johnson', 'Sean Bean', 'Brian Cox', 'Mikaela Collins', 'Francis Mitchell', 'Olivia Wild', 'Neil Owen', 'Dan Wilson', 'Ana Crown', 'Robert Doe', 'Sofia Lima'].map((name, i) => ({
    id: i + 1,
    name,
    email: name.toLowerCase().replace(' ', '.') + '@example.com',
    country: COUNTRIES[i % COUNTRIES.length],
    status: i % 5 === 3 ? 'Inactive' : 'Active',
    orders: 3 + ((i * 7) % 19),
    spent: 420 + ((i * 937) % 4800),
    joined: fmtDate(new Date(2025, i % 12, 8 + i))
  }));

  const products = [
    { id: 1, name: 'Aero Wireless Headphones', cat: 'Electronics', price: 129, stock: 84, sold: 412, emoji: '🎧', hue: 210 },
    { id: 2, name: 'Nimbus Running Shoes', cat: 'Fashion', price: 89, stock: 23, sold: 388, emoji: '👟', hue: 350 },
    { id: 3, name: 'Brew Master Coffee Maker', cat: 'Home', price: 149, stock: 41, sold: 260, emoji: '☕', hue: 30 },
    { id: 4, name: 'Pixel Pro Smartwatch', cat: 'Electronics', price: 219, stock: 12, sold: 341, emoji: '⌚', hue: 260 },
    { id: 5, name: 'Urban Leather Backpack', cat: 'Fashion', price: 99, stock: 67, sold: 204, emoji: '🎒', hue: 20 },
    { id: 6, name: 'Lumen Desk Lamp', cat: 'Home', price: 49, stock: 0, sold: 187, emoji: '💡', hue: 50 },
    { id: 7, name: 'Zen Yoga Mat', cat: 'Sports', price: 35, stock: 152, sold: 299, emoji: '🧘', hue: 150 },
    { id: 8, name: 'Trail Water Bottle', cat: 'Sports', price: 24, stock: 310, sold: 521, emoji: '🧴', hue: 190 }
  ];
  const stockLabel = (p) => (p.stock === 0 ? 'Out of stock' : p.stock < 25 ? 'Low stock' : 'In stock');

  const ORDER_STATUS = ['Completed', 'Completed', 'Processing', 'Pending', 'Completed', 'Cancelled', 'Processing'];
  const orders = Array.from({ length: 30 }, (_, i) => {
    const customer = customers[(i * 5) % customers.length];
    const product = products[(i * 3) % products.length];
    const qty = 1 + (i % 3);
    return {
      id: '#' + (10480 - i),
      customer,
      product,
      qty,
      amount: product.price * qty,
      status: ORDER_STATUS[i % ORDER_STATUS.length],
      date: fmtDate(new Date(2026, 10, 18 - Math.floor(i / 2)))
    };
  });

  /* ---------- SVG charts ---------- */
  function lineChart(labels, series, o) {
    o = o || {};
    const W = 640, H = o.h || 280, pl = 46, pr = 12, pt = 16, pb = 30;
    const max = Math.max(...series.flatMap((s) => s.data));
    const top = Math.ceil(max / 10) * 10;
    const x = (i) => pl + (i * (W - pl - pr)) / (labels.length - 1);
    const y = (v) => pt + (H - pt - pb) * (1 - v / top);
    let g = '';
    for (let k = 0; k <= 4; k++) {
      const v = (top * k) / 4, yy = y(v);
      g += `<line x1="${pl}" x2="${W - pr}" y1="${yy}" y2="${yy}" class="grid-line"/><text x="${pl - 8}" y="${yy + 4}" text-anchor="end" class="axis">${(o.prefix || '') + v + (o.suffix || '')}</text>`;
    }
    labels.forEach((l, i) => { g += `<text x="${x(i)}" y="${H - 8}" text-anchor="middle" class="axis">${l}</text>`; });
    series.forEach((s, si) => {
      const d = s.data.map((v, i) => (i ? 'L' : 'M') + x(i).toFixed(1) + ' ' + y(v).toFixed(1)).join(' ');
      if (si === 0) g += `<path d="${d} L${x(labels.length - 1)} ${y(0)} L${x(0)} ${y(0)} Z" style="fill:${s.color}" opacity=".09"/>`;
      g += `<path d="${d}" fill="none" style="stroke:${s.color}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>`;
    });
    return `<svg viewBox="0 0 ${W} ${H}" class="chart" role="img" aria-label="Line chart">${g}</svg>`;
  }

  function barChart(labels, data, color, o) {
    o = o || {};
    const W = 640, H = o.h || 260, pl = 46, pr = 12, pt = 16, pb = 30;
    const top = Math.ceil(Math.max(...data) / 10) * 10;
    const slot = (W - pl - pr) / data.length, bw = Math.min(40, slot * 0.55);
    const y = (v) => pt + (H - pt - pb) * (1 - v / top);
    let g = '';
    for (let k = 0; k <= 4; k++) {
      const v = (top * k) / 4, yy = y(v);
      g += `<line x1="${pl}" x2="${W - pr}" y1="${yy}" y2="${yy}" class="grid-line"/><text x="${pl - 8}" y="${yy + 4}" text-anchor="end" class="axis">${(o.suffix ? v + o.suffix : v)}</text>`;
    }
    data.forEach((v, i) => {
      const cx = pl + slot * i + slot / 2;
      g += `<rect x="${cx - bw / 2}" y="${y(v)}" width="${bw}" height="${y(0) - y(v)}" rx="6" style="fill:${color}"/><text x="${cx}" y="${H - 8}" text-anchor="middle" class="axis">${labels[i]}</text>`;
    });
    return `<svg viewBox="0 0 ${W} ${H}" class="chart" role="img" aria-label="Bar chart">${g}</svg>`;
  }

  function donut(items, centerText, centerSub) {
    const total = items.reduce((a, b) => a + b.value, 0);
    let offset = 25;
    const segs = items.map((it) => {
      const p = (it.value / total) * 100;
      const s = `<circle cx="21" cy="21" r="15.915" fill="none" style="stroke:${it.color}" stroke-width="5" stroke-dasharray="${p - 0.6} ${100 - p + 0.6}" stroke-dashoffset="${offset}"/>`;
      offset -= p;
      return s;
    }).join('');
    const legend = items.map((it) => `<div><i style="background:${it.color}"></i>${it.label}<b>${Math.round((it.value / total) * 100)}%</b></div>`).join('');
    return `<svg viewBox="0 0 42 42" class="donut" role="img" aria-label="Donut chart"><circle cx="21" cy="21" r="15.915" fill="none" style="stroke:var(--hover)" stroke-width="5"/>${segs}<text x="21" y="22" text-anchor="middle" class="donut-total">${centerText}</text><text x="21" y="27" text-anchor="middle" class="donut-sub">${centerSub}</text></svg><div class="legend">${legend}</div>`;
  }

  /* ---------- Reusable pieces ---------- */
  const statCard = (tone, ic, value, label, delta) => `
    <div class="card stat">
      <div class="stat-top"><span class="stat-icon ${tone}">${icon(ic, 22)}</span><span class="delta ${delta >= 0 ? 'up' : 'down'}">${delta >= 0 ? '+' : ''}${delta}%</span></div>
      <div><div class="stat-value">${value}</div><div class="stat-label">${label}</div></div>
    </div>`;

  const userCell = (c) => `<div class="user-cell"><span class="avatar avatar-sm ${TONES[c.id % TONES.length]}">${initials(c.name)}</span><div><b>${c.name}</b><small>${c.email}</small></div></div>`;
  const crumb = (...items) => items;

  const PER_PAGE = 8;
  function paginate(list, page) {
    const pages = Math.max(1, Math.ceil(list.length / PER_PAGE));
    const p = Math.min(Math.max(1, page), pages);
    return { items: list.slice((p - 1) * PER_PAGE, p * PER_PAGE), page: p, pages, total: list.length };
  }
  function pager(key, pg) {
    const from = pg.total ? (pg.page - 1) * PER_PAGE + 1 : 0;
    const to = Math.min(pg.page * PER_PAGE, pg.total);
    let btns = `<button data-action="page" data-key="${key}" data-page="${pg.page - 1}" ${pg.page === 1 ? 'disabled' : ''} aria-label="Previous">‹</button>`;
    for (let i = 1; i <= pg.pages; i++) btns += `<button data-action="page" data-key="${key}" data-page="${i}" class="${i === pg.page ? 'active' : ''}">${i}</button>`;
    btns += `<button data-action="page" data-key="${key}" data-page="${pg.page + 1}" ${pg.page === pg.pages ? 'disabled' : ''} aria-label="Next">›</button>`;
    return `<div class="pager"><span>Showing ${from} to ${to} of ${pg.total}</span><div class="pager-btns">${btns}</div></div>`;
  }

  /* ---------- State ---------- */
  const state = {
    orders: { q: '', status: 'All', page: 1 },
    customers: { q: '', page: 1 },
    products: { cat: 'All' }
  };

  /* ---------- Tables ---------- */
  function ordersTable() {
    const s = state.orders, q = s.q.trim().toLowerCase();
    const list = orders.filter((o) => (s.status === 'All' || o.status === s.status) && (!q || (o.id + o.customer.name + o.product.name).toLowerCase().includes(q)));
    const pg = paginate(list, s.page);
    s.page = pg.page;
    const rows = pg.items.map((o) => `
      <tr class="clickable" data-action="order-view" data-id="${o.id}">
        <td><b>${o.id}</b></td><td>${userCell(o.customer)}</td><td>${o.product.name}</td>
        <td>${o.date}</td><td><b>${money(o.amount)}</b></td><td>${badge(o.status)}</td>
      </tr>`).join('');
    return `<div class="table-wrap"><table><thead><tr><th>Order</th><th>Customer</th><th>Product</th><th>Date</th><th>Amount</th><th>Status</th></tr></thead><tbody>${rows || '<tr><td colspan="6" class="empty">No orders match your filters.</td></tr>'}</tbody></table></div>${pager('orders', pg)}`;
  }

  function customersTable() {
    const s = state.customers, q = s.q.trim().toLowerCase();
    const list = customers.filter((c) => !q || (c.name + c.email + c.country).toLowerCase().includes(q));
    const pg = paginate(list, s.page);
    s.page = pg.page;
    const rows = pg.items.map((c) => `
      <tr><td>${userCell(c)}</td><td>${c.country}</td><td>${badge(c.status)}</td><td>${c.orders}</td><td><b>${money(c.spent)}</b></td><td>${c.joined}</td></tr>`).join('');
    return `<div class="table-wrap"><table><thead><tr><th>Customer</th><th>Country</th><th>Status</th><th>Orders</th><th>Total spent</th><th>Joined</th></tr></thead><tbody>${rows || '<tr><td colspan="6" class="empty">No customers found.</td></tr>'}</tbody></table></div>${pager('customers', pg)}`;
  }

  /* ---------- Pages ---------- */
  const pages = {};

  pages.dashboard = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const recent = orders.slice(0, 6).map((o) => `
      <tr class="clickable" data-action="order-view" data-id="${o.id}"><td><b>${o.id}</b></td><td>${userCell(o.customer)}</td><td><b>${money(o.amount)}</b></td><td>${badge(o.status)}</td></tr>`).join('');
    const activity = [
      ['var(--success)', 'Order #10480 completed', 'Emma Smith · 5 min ago'],
      ['var(--primary)', 'New customer registered', 'Sofia Lima · 40 min ago'],
      ['var(--warning)', 'Low stock: Pixel Pro Smartwatch', '12 units left · 2 h ago'],
      ['var(--danger)', 'Order #10473 cancelled', 'Neil Owen · 5 h ago'],
      ['var(--info)', 'Weekly report generated', 'Yesterday']
    ].map((a) => `<div class="tl-item"><span class="tl-dot" style="background:${a[0]}"></span><div><b>${a[1]}</b><small>${a[2]}</small></div></div>`).join('');
    return `
    <div class="grid cols-4">
      ${statCard('primary', 'dollar', '$48,290', 'Total revenue', 12.5)}
      ${statCard('success', 'cart', '1,284', 'Orders', 8.2)}
      ${statCard('info', 'users', '3,942', 'Customers', 4.1)}
      ${statCard('danger', 'activity', '1.8%', 'Refund rate', -0.6)}
    </div>
    <div class="grid split">
      <div class="card">
        <div class="card-head"><div><h3>Revenue overview</h3><small>Monthly revenue in thousands</small></div>
          <div class="legend-inline"><span><i style="background:var(--primary)"></i>This year</span><span><i style="background:#c2c9d6"></i>Last year</span></div></div>
        <div class="card-body">${lineChart(months, [
          { color: 'var(--primary)', data: [18, 22, 19, 27, 31, 29, 35, 38, 34, 42, 46, 51] },
          { color: '#c2c9d6', data: [14, 16, 17, 19, 22, 24, 25, 28, 27, 31, 33, 36] }
        ], { prefix: '$', suffix: 'k' })}</div>
      </div>
      <div class="card">
        <div class="card-head"><div><h3>Sales by category</h3><small>Last 30 days</small></div></div>
        <div class="card-body">${donut([
          { label: 'Electronics', value: 42, color: 'var(--primary)' },
          { label: 'Fashion', value: 27, color: 'var(--success)' },
          { label: 'Home', value: 19, color: 'var(--warning)' },
          { label: 'Sports', value: 12, color: 'var(--info)' }
        ], '$12.4k', 'this month')}</div>
      </div>
    </div>
    <div class="grid split">
      <div class="card">
        <div class="card-head"><div><h3>Recent orders</h3><small>Latest transactions</small></div><a class="btn btn-light btn-sm" href="#/orders">View all</a></div>
        <div class="table-wrap"><table><thead><tr><th>Order</th><th>Customer</th><th>Amount</th><th>Status</th></tr></thead><tbody>${recent}</tbody></table></div>
      </div>
      <div class="card">
        <div class="card-head"><div><h3>Activity</h3><small>What happened today</small></div></div>
        <div class="card-body"><div class="timeline">${activity}</div></div>
      </div>
    </div>`;
  };

  pages.analytics = () => {
    const sources = [['Organic search', 46, 'var(--primary)'], ['Direct', 24, 'var(--success)'], ['Social media', 18, 'var(--info)'], ['Referral', 12, 'var(--warning)']]
      .map((s) => `<div class="list-row"><div class="grow"><div style="display:flex;justify-content:space-between;margin-bottom:8px"><b>${s[0]}</b><span>${s[1]}%</span></div><div class="progress"><span style="width:${s[1]}%;background:${s[2]}"></span></div></div></div>`).join('');
    const pagesRows = [['/home', '12,480', '28%', '2m 14s'], ['/products', '8,932', '31%', '3m 02s'], ['/pricing', '5,210', '24%', '1m 48s'], ['/blog/launch', '3,764', '38%', '4m 21s'], ['/contact', '1,912', '45%', '0m 52s']]
      .map((r) => `<tr><td><b>${r[0]}</b></td><td>${r[1]}</td><td>${r[2]}</td><td>${r[3]}</td></tr>`).join('');
    return `
    <div class="grid cols-4">
      ${statCard('primary', 'users', '24.8k', 'Visitors', 18.2)}
      ${statCard('warning', 'activity', '32%', 'Bounce rate', -2.4)}
      ${statCard('info', 'trending', '3m 24s', 'Avg. session', 6.7)}
      ${statCard('success', 'cart', '3.6%', 'Conversion', 0.9)}
    </div>
    <div class="grid split">
      <div class="card">
        <div class="card-head"><div><h3>Visits this week</h3><small>Unique visitors per day</small></div></div>
        <div class="card-body">${barChart(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], [32, 41, 38, 52, 47, 29, 24], 'var(--primary)', { suffix: 'k' })}</div>
      </div>
      <div class="card">
        <div class="card-head"><div><h3>Devices</h3><small>Share of sessions</small></div></div>
        <div class="card-body">${donut([
          { label: 'Desktop', value: 54, color: 'var(--primary)' },
          { label: 'Mobile', value: 36, color: 'var(--success)' },
          { label: 'Tablet', value: 10, color: 'var(--warning)' }
        ], '24.8k', 'sessions')}</div>
      </div>
    </div>
    <div class="grid cols-2">
      <div class="card"><div class="card-head"><div><h3>Traffic sources</h3><small>Where visitors come from</small></div></div><div class="card-body">${sources}</div></div>
      <div class="card"><div class="card-head"><div><h3>Top pages</h3><small>Most viewed this month</small></div></div>
        <div class="table-wrap"><table><thead><tr><th>Page</th><th>Views</th><th>Bounce</th><th>Time</th></tr></thead><tbody>${pagesRows}</tbody></table></div></div>
    </div>`;
  };

  pages.orders = () => {
    const opts = ['All', 'Completed', 'Processing', 'Pending', 'Cancelled'].map((s) => `<option ${state.orders.status === s ? 'selected' : ''}>${s}</option>`).join('');
    return `
    <div class="card">
      <div class="card-head">
        <div class="filters">
          <input class="input" type="search" placeholder="Search orders..." value="${state.orders.q}" data-filter="orders-q">
          <select class="input" data-filter="orders-status" style="width:160px">${opts}</select>
        </div>
        <span class="badge badge-primary">${orders.length} orders</span>
      </div>
      <div id="ordersTable">${ordersTable()}</div>
    </div>`;
  };

  pages.customers = () => `
    <div class="card">
      <div class="card-head">
        <div class="filters"><input class="input" type="search" placeholder="Search customers..." value="${state.customers.q}" data-filter="customers-q"></div>
        <span class="badge badge-primary">${customers.length} customers</span>
      </div>
      <div id="customersTable">${customersTable()}</div>
    </div>`;

  pages.products = () => {
    const cats = ['All', ...new Set(products.map((p) => p.cat))];
    const chips = cats.map((c) => `<button class="chip ${state.products.cat === c ? 'active' : ''}" data-action="cat" data-cat="${c}">${c}</button>`).join('');
    const cards = products.filter((p) => state.products.cat === 'All' || p.cat === state.products.cat).map((p) => {
      const pct = Math.min(100, Math.round((p.stock / 150) * 100));
      const tone = p.stock === 0 ? 'var(--danger)' : p.stock < 25 ? 'var(--warning)' : 'var(--success)';
      return `
      <div class="card product">
        <div class="product-img" style="background:hsl(${p.hue} 90% 94%)">${p.emoji}</div>
        <div class="product-body">
          <div style="display:flex;justify-content:space-between;align-items:center"><small>${p.cat}</small>${badge(stockLabel(p))}</div>
          <b>${p.name}</b>
          <div class="progress"><span style="width:${pct}%;background:${tone}"></span></div>
          <small>${p.stock} in stock · ${p.sold} sold</small>
          <div class="product-price">${money(p.price)}</div>
        </div>
      </div>`;
    }).join('');
    return `<div class="chips" style="margin-bottom:24px">${chips}</div><div class="grid cols-4">${cards}</div>`;
  };

  const toggle = (name, title, desc, on) => `
    <div class="setting-row"><div><b>${title}</b><small>${desc}</small></div><label class="switch"><input type="checkbox" name="${name}" ${on ? 'checked' : ''}><span></span></label></div>`;

  pages.settings = (tab) => {
    tab = ['profile', 'security', 'notifications', 'appearance'].includes(tab) ? tab : 'profile';
    const tabs = [['profile', 'Profile'], ['security', 'Security'], ['notifications', 'Notifications'], ['appearance', 'Appearance']]
      .map((t) => `<a href="#/settings/${t[0]}" class="${t[0] === tab ? 'active' : ''}">${t[1]}</a>`).join('');
    const dark = document.documentElement.dataset.theme === 'dark';
    const body = {
      profile: `
        <div class="profile-head"><span class="avatar">LJ</span><div><h3>Leni Junior</h3><span style="color:var(--muted)">Full Stack Developer</span></div></div>
        <form data-form="Profile saved">
          <div class="form-grid">
            <div class="field"><label>First name</label><input class="input" value="Leni"></div>
            <div class="field"><label>Last name</label><input class="input" value="Junior"></div>
            <div class="field"><label>Email</label><input class="input" type="email" value="leni@example.com"></div>
            <div class="field"><label>Company</label><input class="input" value="Dash Admin"></div>
          </div>
          <div class="field"><label>Bio</label><textarea class="input">I build and integrate web systems end to end.</textarea></div>
          <div class="form-actions"><button type="reset" class="btn btn-light">Discard</button><button class="btn btn-primary">Save changes</button></div>
        </form>`,
      security: `
        <form data-form="Password updated">
          <div class="form-grid">
            <div class="field"><label>Current password</label><input class="input" type="password" placeholder="••••••••"></div><div></div>
            <div class="field"><label>New password</label><input class="input" type="password" placeholder="At least 8 characters"></div>
            <div class="field"><label>Confirm new password</label><input class="input" type="password" placeholder="Repeat it"></div>
          </div>
          ${toggle('2fa', 'Two-factor authentication', 'Ask for a code when you sign in on a new device', true)}
          ${toggle('alerts', 'Login alerts', 'Email me when someone signs in to my account', false)}
          <div class="form-actions"><button class="btn btn-primary">Update password</button></div>
        </form>`,
      notifications: `
        <form data-form="Preferences saved">
          ${toggle('n1', 'New orders', 'Get notified when a customer places an order', true)}
          ${toggle('n2', 'Low stock', 'Alert me when a product is almost out of stock', true)}
          ${toggle('n3', 'Weekly report', 'A summary of sales and traffic every Monday', false)}
          ${toggle('n4', 'Product news', 'Tips and updates about new features', false)}
          <div class="form-actions"><button class="btn btn-primary">Save preferences</button></div>
        </form>`,
      appearance: `
        <div class="theme-opts">
          <button class="theme-opt ${dark ? '' : 'active'}" data-action="set-theme" data-theme="light"><div class="theme-prev"><i></i><b></b></div><b>Light</b></button>
          <button class="theme-opt ${dark ? 'active' : ''}" data-action="set-theme" data-theme="dark"><div class="theme-prev dark"><i></i><b></b></div><b>Dark</b></button>
        </div>`
    }[tab];
    return `<div class="card" style="max-width:860px"><div class="tabs">${tabs}</div><div class="card-body pad">${body}</div></div>`;
  };

  pages.notfound = () => `<div class="card"><div class="empty"><h2 style="font-size:48px;color:var(--text)">404</h2><p style="margin:8px 0 18px">This page does not exist.</p><a class="btn btn-primary" href="#/dashboard">Back to dashboard</a></div></div>`;

  /* ---------- Navigation ---------- */
  const NAV = [
    { title: 'Dashboards' },
    { key: 'dashboard', label: 'Overview', icon: 'home' },
    { key: 'analytics', label: 'Analytics', icon: 'chart' },
    { title: 'Apps' },
    { key: 'orders', label: 'Orders', icon: 'cart', badge: orders.filter((o) => o.status === 'Pending').length },
    { key: 'customers', label: 'Customers', icon: 'users' },
    { key: 'products', label: 'Products', icon: 'package' },
    { title: 'Account' },
    { key: 'settings', label: 'Settings', icon: 'settings' }
  ];
  const META = {
    dashboard: ['Overview', ['Dashboards']],
    analytics: ['Analytics', ['Dashboards']],
    orders: ['Orders', ['Apps']],
    customers: ['Customers', ['Apps']],
    products: ['Products', ['Apps']],
    settings: ['Settings', ['Account']],
    notfound: ['Page not found', []]
  };
  const ACTIONS = {
    orders: `<button class="btn btn-light" data-action="export"><span data-icon="download"></span>Export</button>`,
    customers: `<button class="btn btn-primary" data-action="customer-new"><span data-icon="plus"></span>Add customer</button>`,
    products: `<button class="btn btn-primary" data-action="product-new"><span data-icon="plus"></span>Add product</button>`
  };

  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));

  $('#menu').innerHTML = NAV.map((n) => n.title
    ? `<div class="menu-title">${n.title}</div>`
    : `<a class="menu-link" href="#/${n.key}" data-key="${n.key}">${icon(n.icon, 20)}<span class="menu-text">${n.label}</span>${n.badge ? `<span class="badge badge-danger">${n.badge}</span>` : ''}</a>`).join('');

  function render() {
    const parts = (location.hash.replace(/^#\/?/, '') || 'dashboard').split('/');
    const key = pages[parts[0]] ? parts[0] : 'notfound';
    const meta = META[key];
    $('#view').innerHTML = pages[key](parts[1]);
    $('#pageTitle').textContent = meta[0];
    document.title = meta[0] + ' | Dash Admin';
    $('#crumbs').innerHTML = `<li><a href="#/dashboard">Home</a></li>` + meta[1].map((c) => `<li>${c}</li>`).join('') + `<li>${meta[0]}</li>`;
    $('#toolbarActions').innerHTML = ACTIONS[key] || '';
    $$('.menu-link').forEach((a) => a.classList.toggle('active', a.dataset.key === key));
    hydrateIcons();
    document.body.classList.remove('aside-open');
    closeDropdowns();
    window.scrollTo(0, 0);
  }

  /* ---------- Theme ---------- */
  function applyTheme(t) {
    document.documentElement.dataset.theme = t;
    try { localStorage.setItem('dash-theme', t); } catch (e) { /* storage unavailable */ }
    const btn = $('#themeBtn');
    if (btn) btn.innerHTML = icon(t === 'dark' ? 'sun' : 'moon');
  }
  let saved = null;
  try { saved = localStorage.getItem('dash-theme'); } catch (e) { /* ignore */ }
  applyTheme(saved === 'dark' ? 'dark' : 'light');

  /* ---------- Modal, toast, dropdowns ---------- */
  function openModal(title, body, foot) {
    $('#modalTitle').textContent = title;
    $('#modalBody').innerHTML = body;
    $('#modalFoot').innerHTML = foot || '';
    $('#modal').hidden = false;
    hydrateIcons($('#modal'));
    const first = $('#modalBody input, #modalBody select');
    if (first) first.focus();
  }
  const closeModal = () => { $('#modal').hidden = true; };
  function toast(msg) {
    const t = document.createElement('div');
    t.className = 'toast';
    t.textContent = msg;
    $('#toasts').appendChild(t);
    setTimeout(() => t.remove(), 2800);
  }
  function closeDropdowns(except) { $$('.dd.show').forEach((d) => { if (d !== except) d.classList.remove('show'); }); }

  function orderModal(id) {
    const o = orders.find((x) => x.id === id);
    if (!o) return;
    openModal('Order ' + o.id, `
      <div class="detail-grid">
        <div><small>Customer</small><b>${o.customer.name}</b></div><div><small>Email</small><b>${o.customer.email}</b></div>
        <div><small>Product</small><b>${o.product.name}</b></div><div><small>Quantity</small><b>${o.qty}</b></div>
        <div><small>Date</small><b>${o.date}</b></div><div><small>Status</small>${badge(o.status)}</div>
        <div><small>Unit price</small><b>${money(o.product.price)}</b></div><div><small>Total</small><b style="font-size:18px">${money(o.amount)}</b></div>
      </div>`, `<button class="btn btn-light" data-action="modal-close">Close</button>`);
  }

  function customerModal() {
    const opts = COUNTRIES.map((c) => `<option>${c}</option>`).join('');
    openModal('Add customer', `
      <form id="customerForm">
        <div class="field"><label>Full name</label><input class="input" name="name" required placeholder="Jane Doe"></div>
        <div class="field"><label>Email</label><input class="input" name="email" type="email" required placeholder="jane@example.com"></div>
        <div class="field"><label>Country</label><select class="input" name="country">${opts}</select></div>
      </form>`, `<button class="btn btn-light" data-action="modal-close">Cancel</button><button class="btn btn-primary" data-action="customer-save">Save customer</button>`);
  }

  function productModal() {
    openModal('Add product', `
      <form id="productForm">
        <div class="field"><label>Product name</label><input class="input" name="name" required placeholder="Wireless Mouse"></div>
        <div class="form-grid">
          <div class="field"><label>Category</label><select class="input" name="cat"><option>Electronics</option><option>Fashion</option><option>Home</option><option>Sports</option></select></div>
          <div class="field"><label>Price (USD)</label><input class="input" name="price" type="number" min="1" required placeholder="49"></div>
        </div>
        <div class="field"><label>Stock</label><input class="input" name="stock" type="number" min="0" value="50"></div>
      </form>`, `<button class="btn btn-light" data-action="modal-close">Cancel</button><button class="btn btn-primary" data-action="product-save">Save product</button>`);
  }

  /* ---------- Events ---------- */
  const actions = {
    'toggle-aside': () => document.body.classList.toggle('aside-min'),
    'open-drawer': () => document.body.classList.add('aside-open'),
    'close-drawer': () => document.body.classList.remove('aside-open'),
    'toggle-theme': () => { applyTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'); closeDropdowns(); if (location.hash.indexOf('appearance') > -1) render(); },
    'set-theme': (el) => { applyTheme(el.dataset.theme); render(); },
    dd: (el) => { const d = el.closest('.dd'); closeDropdowns(d); d.classList.toggle('show'); },
    signout: () => { closeDropdowns(); toast('This is a demo, there is no real session.'); },
    'modal-close': closeModal,
    'order-view': (el) => orderModal(el.dataset.id),
    export: () => toast('Connect your backend to export real data.'),
    page: (el) => {
      const key = el.dataset.key;
      state[key].page = Number(el.dataset.page);
      $('#' + key + 'Table').innerHTML = key === 'orders' ? ordersTable() : customersTable();
    },
    cat: (el) => { state.products.cat = el.dataset.cat; $('#view').innerHTML = pages.products(); },
    'customer-new': customerModal,
    'product-new': productModal,
    'customer-save': () => {
      const f = $('#customerForm');
      if (!f.reportValidity()) return;
      const d = new FormData(f);
      customers.unshift({ id: customers.length + 1, name: d.get('name'), email: d.get('email'), country: d.get('country'), status: 'Active', orders: 0, spent: 0, joined: fmtDate(new Date()) });
      closeModal();
      state.customers = { q: '', page: 1 };
      render();
      toast('Customer added');
    },
    'product-save': () => {
      const f = $('#productForm');
      if (!f.reportValidity()) return;
      const d = new FormData(f);
      products.unshift({ id: products.length + 1, name: d.get('name'), cat: d.get('cat'), price: Number(d.get('price')), stock: Number(d.get('stock')) || 0, sold: 0, emoji: '📦', hue: 220 });
      closeModal();
      state.products.cat = 'All';
      render();
      toast('Product added');
    }
  };

  document.addEventListener('click', (e) => {
    const el = e.target.closest('[data-action]');
    if (el && actions[el.dataset.action]) { e.preventDefault(); actions[el.dataset.action](el, e); }
    if (!e.target.closest('.dd')) closeDropdowns();
    if (e.target.id === 'modal') closeModal();
  });

  document.addEventListener('input', (e) => {
    const f = e.target.dataset && e.target.dataset.filter;
    if (!f) return;
    if (f === 'orders-q') { state.orders.q = e.target.value; state.orders.page = 1; $('#ordersTable').innerHTML = ordersTable(); }
    if (f === 'orders-status') { state.orders.status = e.target.value; state.orders.page = 1; $('#ordersTable').innerHTML = ordersTable(); }
    if (f === 'customers-q') { state.customers.q = e.target.value; state.customers.page = 1; $('#customersTable').innerHTML = customersTable(); }
  });

  document.addEventListener('submit', (e) => {
    const form = e.target.closest('[data-form]');
    if (form) { e.preventDefault(); toast(form.dataset.form); }
  });

  $('#globalSearch').addEventListener('keydown', (e) => {
    if (e.key !== 'Enter') return;
    state.orders = { q: e.target.value, status: 'All', page: 1 };
    e.target.value = '';
    if (location.hash === '#/orders') render(); else location.hash = '#/orders';
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { closeModal(); closeDropdowns(); document.body.classList.remove('aside-open'); }
  });

  window.addEventListener('hashchange', render);
  hydrateIcons();
  render();
})();
