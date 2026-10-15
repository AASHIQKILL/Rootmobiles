/* Root Mobiles ebook store — renders the store page and every book page from books.js.
   You normally don't need to edit this file. */
(function () {
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const rupee = n => "₹" + Number(n).toLocaleString("en-IN");
  const page = document.body.dataset.page;
  const root = document.body.dataset.root || "./";           // path back to /ebook/
  const app = document.getElementById("app");
  const asset = u => !u ? "" : (/^(https?:|data:|\/)/.test(u) ? u : root + u);
  const wa = msg => `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(msg)}`;
  const isLive = b => b.status === "live";
  const canBuy = b => isLive(b) && !!b.buyLink;
  const ready = b => (b.languages || []).filter(l => l.ready);
  const covers = b => { const c = (b.languages || []).filter(l => l.cover).map(l => ({ img: asset(l.cover), name: l.name, ready: l.ready })); return c.length ? c : (b.coverImage ? [{ img: asset(b.coverImage), name: "", ready: true }] : []); };
  const offerOn = b => b.offerEnds && (b.bonuses || []).length && new Date(b.offerEnds) > new Date();
  const fmtEnd = iso => new Date(iso).toLocaleString("en-IN", { day: "numeric", month: "short", hour: "numeric", minute: "2-digit", timeZone: "Asia/Kolkata" }) + " IST";

  /* buy target + label for a book */
  // Live books: BUY NOW always goes to the Cashfree Payment Form in books.js (buyLink).
  const buy = b => isLive(b)
    ? { href: b.buyLink ? esc(b.buyLink) : "#buy", ext: !!b.buyLink, label: `BUY NOW – ${rupee(b.price)}`, short: "BUY NOW" }
    : { href: wa(`Hi, please notify me when "${b.title}" is released`), ext: true, label: "COMING SOON – NOTIFY ME", short: "NOTIFY ME" };
  const tgt = x => x.ext ? ` target="_blank" rel="noopener"` : "";
  const buyBtn = (b, cls = "") => { const x = buy(b); return `<a class="btn btn-buy ${cls}" href="${x.href}"${tgt(x)}>${x.label} <span class="arrow">→</span></a>`; };
  const ctaStrip = (b, line) => isLive(b) ? `<div class="cta-strip"><div><b>${line}</b><span>${rupee(b.price)} · all ${ready(b).length} language editions · instant download</span></div>${buyBtn(b)}</div>` : "";

  /* fan of language covers */
  const fan = (b, max = 5) => {
    const c = covers(b).slice(0, max); if (!c.length) return "";
    const mid = (c.length - 1) / 2;
    return `<div class="fan" aria-hidden="true">${c.map((x, i) => {
      const d = i - mid;
      return `<img src="${esc(x.img)}" alt="" loading="lazy" style="transform:translateX(calc(-50% + ${d * 52}px)) rotate(${d * 7}deg) translateY(${Math.abs(d) * 12}px);z-index:${10 - Math.round(Math.abs(d) * 2)}">`;
    }).join("")}</div>`;
  };

  /* ---------- shared pieces ---------- */
  const urgencyBar = b => offerOn(b) ? `<div class="urgency">🎁 Launch bonuses close in <span class="t" data-cd="inline">--</span> <a href="#buy">Get them →</a></div>` : "";
  const header = (b) => `<header class="top"><div class="wrap">
      <a class="brand" href="${root}"><span class="dot">R</span>ROOT <i>MOBILES</i></a>
      <nav class="links">${page === "book" ? `<a href="#inside">Inside</a><a href="#languages">Languages</a><a href="#faq">FAQ</a>` : ""}<a href="${root}">All books</a>${b && isLive(b) ? `<a class="btn btn-buy" href="${buy(b).href}"${tgt(buy(b))}>BUY NOW</a>` : ""}</nav>
    </div></header>`;
  const contact = () => `<section id="contact" class="soft"><div class="wrap">
    <span class="kicker">Support</span><h2>Questions? Talk to us.</h2>
    <p class="lead">Ask anything before you buy, or message us if a download doesn't work. We reply ${esc(SITE.hours)}.</p>
    <div class="contact">
      <a href="${wa("Hi, I have a question about your ebooks")}" target="_blank" rel="noopener"><b>WhatsApp</b><span>+${esc(SITE.whatsapp)}</span></a>
      <a href="mailto:${esc(SITE.email)}"><b>Email</b><span>${esc(SITE.email)}</span></a>
      <a href="https://instagram.com/${esc(SITE.instagram)}" target="_blank" rel="noopener"><b>Instagram</b><span>@${esc(SITE.instagram)}</span></a>
      <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE.business + ", " + SITE.address)}" target="_blank" rel="noopener"><b>Showroom</b><span>${esc(SITE.address)}</span><small>Get directions →</small></a>
    </div></div></section>`;
  const policies = () => `<div class="policies" id="policies"><div class="wrap">
    <details id="terms"><summary>Terms &amp; Conditions</summary><p>Each purchase gives you a personal, non-transferable licence to read the ebook. Copying, reselling or sharing the files or the WhatsApp community link is not permitted. Content is for educational purposes; repair work is done at your own risk. Seller: ${esc(SITE.business)}, ${esc(SITE.address)}.</p></details>
    <details id="privacy"><summary>Privacy Policy</summary><p>We collect only your name, email and phone number to deliver your purchase, add you to the buyers' WhatsApp community and provide support. Payments are processed by Cashfree Payments; we never see or store your card or bank details. We do not sell your data.</p></details>
    <details id="refund"><summary>Refund &amp; Cancellation Policy</summary><p>Ebooks are digital products delivered instantly, so orders can't be cancelled after payment. If a file fails to download, is corrupted, or you were charged twice, contact us within 7 days and we will resend the file or refund you to your original payment method within 5–7 working days.</p></details>
    <details id="delivery"><summary>Shipping &amp; Delivery Policy</summary><p>No physical shipping. Right after successful payment you are taken to a download page with your ebook and the WhatsApp community link. If anything goes wrong, we send them on WhatsApp or email within 24 hours.</p></details>
  </div></div>`;
  const footer = () => `<footer><div class="wrap"><div>© ${new Date().getFullYear()} ${esc(SITE.business)} · Sold only at rootmobiles.in/ebook</div><div style="margin-top:8px"><a href="#terms">Terms</a><a href="#privacy">Privacy</a><a href="#refund">Refunds</a><a href="#delivery">Delivery</a><a href="#contact">Contact</a></div></div></footer>`;
  const cdBoxes = () => `<div class="countdown" data-cd="boxes"><div><b>--</b><span>days</span></div><div><b>--</b><span>hrs</span></div><div><b>--</b><span>min</span></div><div><b>--</b><span>sec</span></div></div>`;

  /* ---------- countdown ---------- */
  function startCountdown(endISO) {
    const end = new Date(endISO).getTime();
    const p = n => String(n).padStart(2, "0");
    const tick = () => {
      let s = Math.max(0, Math.floor((end - Date.now()) / 1000));
      const d = Math.floor(s / 86400); s %= 86400; const h = Math.floor(s / 3600); s %= 3600; const m = Math.floor(s / 60); s %= 60;
      document.querySelectorAll("[data-cd]").forEach(el => {
        if (el.dataset.cd === "inline") el.textContent = `${d}d ${p(h)}h ${p(m)}m ${p(s)}s`;
        else el.querySelectorAll("b").forEach((b, i) => b.textContent = p([d, h, m, s][i]));
      });
      if (end <= Date.now()) { clearInterval(t); setTimeout(() => location.reload(), 1500); }
    };
    const t = setInterval(tick, 1000); tick();
  }

  /* ---------- STORE PAGE ---------- */
  function renderStore() {
    document.title = "Ebooks for Mobile Repair Technicians — Root Mobiles";
    const live = BOOKS.filter(isLive), soon = BOOKS.filter(b => !isLive(b));
    const firstOffer = live.find(offerOn);
    const card = (b, wide) => {
      const detail = b.page !== false ? `${root}${esc(b.slug)}/` : "";
      const c = covers(b);
      const art = c.length > 1 ? fan(b) : c.length ? `<img class="single" src="${esc(c[0].img)}" alt="${esc(b.title)} cover" loading="lazy">` : "";
      const r = ready(b).length;
      return `<article class="bcard ${wide ? "wide" : ""}">
        <div class="art"><span class="ribbon ${isLive(b) ? "" : "soon"}">${isLive(b) ? "AVAILABLE NOW" : "COMING SOON"}</span>${detail ? `<a href="${detail}" style="display:contents">${art}</a>` : art}</div>
        <div class="body">
          <span class="kicker" style="margin:0">Root Mobiles Technical Training</span>
          <h3>${esc(b.title)}</h3><div class="s">${esc(b.subtitle || "")}</div>
          ${(b.stats || []).length ? `<div class="mini-stats">${b.stats.map(x => `<span>${esc(x.n)} ${esc(x.l)}</span>`).join("")}</div>` : ""}
          <div class="chips">${(b.languages || []).map(l => `<span class="chip ${l.ready ? "" : "soon"}">${esc(l.name)}</span>`).join("")}</div>
          ${isLive(b) && r > 1 ? `<div class="all-lang">✓ One purchase = real access to all ${r} language editions</div>` : ""}
          ${isLive(b) ? `<div class="pline"><span class="price">${rupee(b.price)}</span>${offerOn(b) ? `<span class="cd-inline">● Launch bonuses close in <b data-cd="inline">--</b></span>` : ""}</div>` : `<p class="soon-note">Being written now. Get a WhatsApp message the day it launches.</p>`}
          <div class="actions">${buyBtn(b, isLive(b) ? "pulse" : "")}${detail && isLive(b) ? `<a class="btn btn-ghost" href="${detail}">See inside</a>` : ""}</div>
        </div></article>`;
    };
    app.innerHTML = header() + `
      <div class="store-hero"><div class="wrap">
        <span class="kicker">Root Mobiles · Technical Training Series</span>
        <h1>Learn phone repair <em>from a working bench</em></h1>
        <p>Board-level diagnosis ebooks written by the Root Mobiles chief technician. Instant download in your language, plus a buyers-only WhatsApp community.</p>
        ${firstOffer ? `<div class="urg"><span>🎁 Launch bonuses close in</span><span class="t" data-cd="inline">--</span></div>` : ""}
      </div></div>
      <section><div class="wrap"><div class="grid">${live.map((b, i) => card(b, i === 0)).join("")}${soon.map(b => card(b, false)).join("")}</div></div></section>` + contact() + policies() + footer();
    if (firstOffer) startCountdown(firstOffer.offerEnds);
  }

  /* ---------- BOOK PAGE ---------- */
  function renderBook(slug) {
    const b = BOOKS.find(x => x.slug === slug);
    if (!b) { app.innerHTML = header() + `<section><div class="wrap"><h2>Book not found</h2><p class="lead">Check that data-slug in this folder's index.html matches books.js.</p></div></section>`; return; }
    document.title = `${b.title} — Ebook by Root Mobiles`;
    const on = offerOn(b), c = covers(b), r = ready(b), x = buy(b);
    const words = b.title.trim().split(/\s+/), last = words.pop();
    let h = urgencyBar(b) + header(b);

    // HERO
    h += `<section class="hero"><div class="wrap hero-grid">
      <div class="intro">
        <span class="series">Root Mobiles Technical Training Series${b.subtitle ? " · " + esc(b.subtitle) : ""}</span>
        <h1>${esc(words.join(" "))}<em>${esc(last)}</em></h1>
        ${b.support ? `<p class="tag">${esc(b.support.split(/(?<=\.)\s/)[0]).replace("evidence", "<b>evidence</b>")}</p><p class="support">${esc(b.support.split(/(?<=\.)\s/).slice(1).join(" "))}</p>` : ""}
        ${(b.stats || []).length ? `<div class="stats">${b.stats.map(s => `<div><b>${esc(s.n)}</b><span>${esc(s.l)}</span></div>`).join("")}</div>` : ""}
      </div>
        <div class="buybox" id="buy">
          <div class="row"><span class="price">${rupee(b.price)}<small>one-time</small></span></div>${r.length > 1 ? `<div class="incl" style="margin-top:10px">✓ Real access to all ${r.length} language editions — download every one</div>` : ""}
          ${on ? `<div class="cd-label"><span class="live"></span>Launch bonuses close in</div>${cdBoxes()}` : ""}
          ${buyBtn(b, "pulse")}
          <div class="trust"><span>Instant download</span><span>UPI · cards · net banking</span><span>Buyers-only WhatsApp community</span></div>
        </div>
      ${c.length ? `<div class="showcase">
        <div class="stage"><div class="book3d"><img id="hero-cover" src="${esc(c[0].img)}" alt="${esc(b.title)} cover"></div><div class="glow"></div></div>
        ${c.length > 1 ? `<div class="lang-pick" role="group" aria-label="Preview cover by language">${c.map((x, i) => `<button type="button" data-img="${esc(x.img)}" aria-pressed="${i === 0}">${esc(x.name)}</button>`).join("")}</div><p class="lang-note">Tap a language to see its edition</p>` : ""}
      </div>` : ""}
    </div></section>`;

    // LANGUAGES
    if (c.length > 1) h += `<section id="languages" class="soft"><div class="wrap center">
      <span class="kicker">${r.length} language editions</span><h2>Read it in your language</h2>
      <p class="lead">Each edition is the complete book written in that language. When you buy, you get real access to <b>all ${r.length} editions</b>, not just one. Download every language, learn in yours, and check terms in English.</p>
      <div class="langs-grid" style="--n:${c.length}">${c.map(l => `<div class="lcard"><div class="im"><img src="${esc(l.img)}" alt="${esc(b.title)} — ${esc(l.name)} edition cover" loading="lazy"></div><div class="nm">${esc(l.name)}</div><div class="st ${l.ready ? "" : "soon"}">${l.ready ? "✓ Included" : "Coming soon"}</div></div>`).join("")}</div>
      <div class="langs-banner"><b>Buy once. <em>Get all ${r.length} languages for ${rupee(b.price)}.</em></b>${buyBtn(b)}</div>
    </div></section>`;

    // METHOD
    if ((b.method || []).length) h += `<section class="dark"><div class="wrap">
      <span class="kicker">The method</span><h2>Every fault, the same six steps</h2>
      <p class="lead">No guessing and no random part swaps. Each lesson and each fault entry moves through the same order, so you always know the next test.</p>
      <div class="method">${b.method.map((m, i) => `<div><i>STEP ${i + 1}</i><b>${esc(m)}</b></div>`).join("")}</div>
    </div></section>`;

    // VOLUMES
    if ((b.volumes || []).length) h += `<section id="inside"><div class="wrap">
      <span class="kicker">What's inside</span><h2>${esc(b.chaptersTitle || "What you'll learn")}</h2>
      <p class="lead">From basic electricity to board-level diagnosis, with worked examples on a real Redmi Note 7 Pro schematic.</p>
      <div class="vols">${b.volumes.map(v => `<div class="vol"><div class="vh"><span class="vn">VOL ${esc(v.n)}</span><span class="pg">pp. ${esc(v.pages)}</span></div><h3>${esc(v.title)}</h3><ul>${v.items.map(i => `<li>${esc(i)}</li>`).join("")}</ul></div>`).join("")}</div>
      ${b.learnHighlight ? `<div class="highlight"><b>${esc(b.learnHighlight)}</b><code>PWR · BAT · DSP · NET · AUD · BTN · BOOT · LIQ</code></div>` : ""}
      ${ctaStrip(b, "Get all 6 volumes today")}
    </div></section>`;

    // PREVIEW
    if ((b.screenshots || []).length) h += `<section class="soft"><div class="wrap">
      <span class="kicker">Look inside</span><h2>Real pages from the book</h2>
      <div class="shots">${b.screenshots.map(s => `<figure class="shot"><div class="frame"><img src="${esc(asset(s.img))}" alt="${esc(s.caption)}" loading="lazy"></div><p>${esc(s.caption)}</p></figure>`).join("")}</div>
      ${ctaStrip(b, "Read all 237 pages now")}
    </div></section>`;

    // PROBLEMS
    if ((b.problems || []).length) h += `<section><div class="wrap">
      <span class="kicker">Why technicians buy it</span><h2>The problems it solves</h2>
      <div class="probs">${b.problems.map(p => `<div class="prob"><div class="q">"${esc(p.q)}"</div><div class="a"><b>Solved:</b> ${esc(p.a)}</div></div>`).join("")}</div>
      ${ctaStrip(b, "Fix your next dead phone with a method")}
    </div></section>`;

    // WHO
    if ((b.whoFor || []).length) h += `<section class="soft"><div class="wrap">
      <span class="kicker">Is this for you?</span><h2>Who it's for</h2>
      <div class="two"><div class="card"><h3>Made for</h3><ul class="ticks">${b.whoFor.map(x => `<li>${esc(x)}</li>`).join("")}</ul></div>
      ${(b.notFor || []).length ? `<div class="card"><h3>Not covered</h3><ul class="ticks no">${b.notFor.map(x => `<li>${esc(x)}</li>`).join("")}</ul></div>` : ""}</div>
    </div></section>`;

    // BONUSES
    if ((b.bonuses || []).length) h += `<section class="dark"><div class="wrap">
      <div class="bonus-head"><div><span class="kicker">${on ? "Launch offer" : "Launch bonuses"}</span><h2>${on ? "Free launch bonuses" : "Launch bonuses have ended"}</h2>
      <p class="lead">${on ? `Included free with every order placed before ${fmtEnd(b.offerEnds)}. After that, new orders get the book only.` : "These were included with launch orders."}</p></div>
      ${on ? `<div class="cdwrap"><div class="cd-label"><span class="live"></span>Closes in</div>${cdBoxes()}</div>` : ""}</div>
      <div class="bonuses">${b.bonuses.map((x, i) => `<div class="bonus"><span class="tagb">BONUS ${i + 1}</span><h3>${esc(x.title)}</h3><p>${esc(x.desc)}</p></div>`).join("")}</div>
      ${on ? `<div style="margin-top:28px;text-align:center">${buyBtn(b, "pulse")}</div>` : ""}
    </div></section>`;

    // AFTER PAYMENT
    h += `<section><div class="wrap">
      <span class="kicker">How it works</span><h2>What happens after you pay</h2>
      <div class="steps">
        <div class="step"><div class="n">1</div><h3>Pay securely</h3><p>UPI, card or net banking through Cashfree. Pick your preferred language at checkout.</p></div>
        <div class="step"><div class="n">2</div><h3>Download instantly</h3><p>You land on your download page with ${r.length > 1 ? `all ${r.length} language editions` : "the ebook"}${on ? " and your launch bonuses" : ""}.</p></div>
        <div class="step"><div class="n">3</div><h3>Join the community</h3><p>Get the invite to our buyers-only WhatsApp community to discuss repairs and ask doubts.</p></div>
      </div>
      <div style="margin-top:28px;text-align:center">${buyBtn(b)}</div>
    </div></section>`;

    // PRICE
    h += `<section class="soft" id="price"><div class="wrap">
      <div class="pricing">
        <div>${fan(b)}</div>
        <div class="pcard">
          <span class="kicker">One-time payment</span>
          <h2 style="font-size:28px">${esc(b.title)}</h2>
          <div class="price" style="margin-top:12px">${rupee(b.price)}</div>
          <div class="note">Instant access · lifetime licence for personal use</div>
          <ul>
            <li>${esc(b.subtitle || "Complete ebook")} (PDF)</li>
            ${r.length > 1 ? `<li>Real access to all ${r.length} language editions</li>` : ""}
            ${(b.bonuses || []).map(x => `<li class="${on ? "" : "off"}">${esc(x.title)}${on ? `<span class="b">LAUNCH BONUS</span>` : ""}</li>`).join("")}
            <li>Buyers-only WhatsApp community</li>
            <li>WhatsApp and email support</li>
          </ul>
          ${buyBtn(b, "pulse")}
          <div class="pay"><span>UPI</span><span>GPay</span><span>PhonePe</span><span>Paytm</span><span>Cards</span><span>Net Banking</span></div>
          <div class="secure">🔒 Secure checkout by Cashfree Payments</div>
        </div>
      </div></div></section>`;

    // AUTHOR
    if (b.author) h += `<section><div class="wrap">
      <div class="author"><div class="av">${esc(b.author.name.split(" ").map(w => w[0]).slice(0, 2).join(""))}</div>
      <div><span class="kicker" style="margin-bottom:6px">About the author</span><h3>${esc(b.author.name)}</h3><div class="role">${esc(b.author.role)}</div><p>${esc(b.author.bio)}</p></div></div>
      ${ctaStrip(b, "Learn the method from the bench")}
    </div></section>`;

    // FAQ
    const faq = [...(b.faq || []),
      { q: "How will I receive the ebook?", a: "Right after payment you're taken to your download page. If anything goes wrong, message us with your Cashfree payment ID and we'll send it on WhatsApp or email." },
      { q: "How do I join the WhatsApp community?", a: "The invite link is on your download page. Join with the same phone number you paid with; we approve requests by matching it to your order." },
      { q: "Can I get a refund?", a: "Ebooks are delivered instantly, so sales are final. If your file doesn't download or is corrupted, contact us and we'll fix it or refund you." }];
    h += `<section class="soft" id="faq"><div class="wrap center"><span class="kicker">Questions</span><h2>Frequently asked</h2>
      <div class="faq" style="text-align:left">${faq.map(f => `<details><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join("")}</div>
      <div style="margin-top:30px">${buyBtn(b, "pulse")}</div></div></section>`;

    // FINAL
    h += `<section class="final"><div class="wrap">
      <h2>Stop guessing.<br><em>Start diagnosing with evidence.</em></h2>
      <p class="lead">${esc(b.valueLine || "")}</p>
      ${buyBtn(b, "pulse")}
      ${on ? `<p class="small">Launch bonuses close in <b data-cd="inline">--</b></p>` : ""}
    </div></section>`;

    h += contact() + policies() + footer();
    h += `<div class="sticky"><div><div class="p">${rupee(b.price)}</div>${on ? `<small>Bonuses end <span data-cd="inline">--</span></small>` : `<small>${r.length > 1 ? `${r.length} languages included` : "Instant download"}</small>`}</div><a class="btn btn-buy" href="${x.href}"${tgt(x)}>${x.short}</a></div>`;
    app.innerHTML = h;
    document.body.classList.add("has-sticky");

    // language picker swaps the hero cover
    const img = document.getElementById("hero-cover");
    document.querySelectorAll(".lang-pick button").forEach(btn => btn.addEventListener("click", () => {
      document.querySelectorAll(".lang-pick button").forEach(o => o.setAttribute("aria-pressed", "false"));
      btn.setAttribute("aria-pressed", "true");
      img.style.opacity = 0; setTimeout(() => { img.src = btn.dataset.img; img.style.opacity = 1; }, 180);
    }));
    if (on) startCountdown(b.offerEnds);
  }

  /* footer links open the matching policy */
  document.addEventListener("click", e => {
    const a = e.target.closest('a[href^="#"]'); if (!a) return;
    const d = document.querySelector(a.getAttribute("href")); if (d && d.tagName === "DETAILS") d.open = true;
  });

  if (page === "store") renderStore();
  else if (page === "book") renderBook(document.body.dataset.slug);
})();
