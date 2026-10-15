/* =====================================================================
   ROOT MOBILES — BOOK CATALOG
   This is the ONLY file you edit to add books, change prices,
   add languages or paste Cashfree buy links.
   ⚠️ Never put Google Drive download links or the WhatsApp community
      link in this file — anyone can open it. Those go in the hidden
      thank-you page of each book.
   ===================================================================== */

const SITE = {
  whatsapp:  "916262090959",               // country code + number, no + or spaces
  email:     "rootmobilescoimbatore@gmail.com",
  instagram: "rootronics.official",
  business:  "Root Mobiles",
  address:   "No. 338, 7th Street, Gandhipuram, Coimbatore, Tamil Nadu – 641012",
  hours:     "10:00 AM – 9:00 PM, all days"
};

const BOOKS = [

  /* ------------------------------------------------------------------ */
  {
    slug: "master-mobile-diagnostics",            // must match the folder name
    status: "live",                               // "live" or "coming-soon"
    page: true,                                   // has its own detail page folder
    title: "Master Mobile Diagnostics",
    subtitle: "Complete Edition · Volumes 1–6",
    support: "Stop guessing — repair phones with evidence. From basic electricity to board-level diagnosis: power, display, camera, network, audio, boot and liquid damage.",
    valueLine: "Board-level training that repair institutes charge ₹25,000 for — yours for ₹999.",
    price: 999,
    buyLink: "https://payments.cashfree.com/forms/rootmobilesmmd",   // Cashfree Payment Form
    coverColor: "#111111",
    coverImage: "covers/mmd/english.jpg",
    stats: [
      { n: "6", l: "volumes" }, { n: "237", l: "pages" },
      { n: "145", l: "illustrations" }, { n: "85", l: "fault entries" }
    ],

    languages: [
      // ready:false shows "Coming soon". cover = that language's cover image.
      { name: "English", ready: true, cover: "covers/mmd/english.jpg" },
      { name: "தமிழ் Tamil", ready: true, cover: "covers/mmd/tamil.jpg" },
      { name: "മലയാളം Malayalam", ready: true, cover: "covers/mmd/malayalam.jpg" },
      { name: "हिन्दी Hindi", ready: true, cover: "covers/mmd/hindi.jpg" },
      { name: "मराठी Marathi", ready: true, cover: "covers/mmd/marathi.jpg" },
      { name: "ಕನ್ನಡ Kannada", ready: true, cover: "covers/mmd/kannada.jpg" },
      { name: "తెలుగు Telugu", ready: true, cover: "covers/mmd/telugu.jpg" },
      { name: "اردو Urdu", ready: true, cover: "covers/mmd/urdu.jpg" },
      { name: "বাংলা Bengali", ready: true, cover: "covers/mmd/bengali.jpg" },
      { name: "ગુજરાતી Gujarati", ready: true, cover: "covers/mmd/gujarati.jpg" }
    ],

    /* Launch offer: price stays ₹999, launch bonuses end at this time */
    offerEnds: "2026-10-31T23:59:00+05:30",
    bonuses: [
      // ⚠️ Only list bonuses you will actually deliver on the thank-you page.
      { title: "Current-draw cheat sheet", desc: "One-page chart of what to watch on your DC bench supply at each boot stage. Print it for your bench." },
      { title: "Fault-finding checklists", desc: "Printable checklists for no power, no charging, no display and no network." },
      { title: "Free future updates", desc: "New fault entries and volumes added to this edition are sent to you free." }
    ],

    learn: [
      "Safety & the workbench", "Basic electricity", "Components: symbol to function",
      "Multimeter skills", "DC bench supply & USB meter", "Reading schematics & locating parts",
      "Power, charging & battery faults", "Display, touch & camera faults",
      "Network, SIM, Wi-Fi, Bluetooth & GPS", "Audio, sensors, buttons & port",
      "Boot, storage & software faults", "Liquid & physical damage"
    ],
    learnHighlight: "85 fault entries — symptom → test order → decision guide → verification",

    screenshots: [
      { img: "screens/mmd-lcd-vs-oled.jpg", caption: "145 illustrations placed right beside the text" },
      { img: "screens/mmd-fault-entry.jpg", caption: "Every fault entry: symptom, test order, decision guide" },
      { img: "screens/mmd-boot-modes.jpg", caption: "Boot, storage & software — explained visually" }
    ],
    method: ["Understand", "Locate", "Measure", "Interpret", "Next step", "Verify"],
    volumes: [
      { n: "1", title: "Foundations", pages: "4–53", items: ["Safety and the workbench", "Basic electricity", "Components: symbol to function", "Multimeter skills", "DC bench supply & USB meter", "Reading schematics & locating parts", "The diagnostic method"] },
      { n: "2", title: "Power, Charging & Battery", pages: "53–99", items: ["How a phone's power system works", "Redmi Note 7 Pro power schematic", "Ports, input protection & fault history", "Fault entries PWR-0002 – PWR-0018", "Fault entries BAT-0001 – BAT-0006"] },
      { n: "3", title: "Display, Touch & Camera", pages: "99–135", items: ["How display and touch work", "How the camera works", "Worked example: Redmi Note 7 Pro", "Display, touch and camera fault entries"] },
      { n: "4", title: "Network & Wireless", pages: "135–160", items: ["SIM, IMEI and cellular basics", "RF, antennas, Wi-Fi, Bluetooth, GPS", "Worked example: Redmi Note 7 Pro", "Network and wireless fault entries"] },
      { n: "5", title: "Audio, Sensors, Buttons & Port", pages: "160–194", items: ["The audio system", "Sensors, side keys, vibration, sub-board", "Worked example: Redmi Note 7 Pro", "Audio, sensor, key and port fault entries"] },
      { n: "6", title: "Boot, Storage, Software, Liquid & Physical Damage", pages: "194–228", items: ["Boot sequence, boot modes and storage", "Liquid and physical damage", "Worked example: Redmi Note 7 Pro", "Boot, storage and damage fault entries"] }
    ],
    author: { name: "Mohammed Aashiq", role: "Author & Chief Technician, Root Mobiles", bio: "Written at the Root Mobiles repair bench in Gandhipuram, Coimbatore. Every fault entry follows the same evidence-first method used on customer phones every day." },
    chaptersTitle: "6 volumes in one book",
    chapters: [
      "Vol 1 — Foundations: safety, electricity, components, multimeter, bench supply, schematics, the diagnostic method",
      "Vol 2 — Power, Charging & Battery",
      "Vol 3 — Display, Touch & Camera",
      "Vol 4 — Network & Wireless",
      "Vol 5 — Audio, Sensors, Buttons & Port",
      "Vol 6 — Boot, Storage, Software, Liquid & Physical Damage",
      "Exercises with answers, fault-entry index and topic index"
    ],

    whoFor: [
      "Beginners — read Volume 1 fully, then the theory chapters of Volumes 2–6",
      "Working technicians — look up the symptom in the fault-entry index and follow its test order",
      "Shop owners who want to stop sending boards outside",
      "Electronics / ITI / diploma students"
    ],
    notFor: [
      "FRP / Google / Mi / iCloud account-lock or screen-lock bypass (not covered)",
      "Changing IMEI — the book covers verifying only; changing it is illegal",
      "People who want results without practising on real boards"
    ],
    problems: [
      { q: "A dead phone comes in and I don't know where to start.", a: "One method for every fault: Understand → Locate → Measure → Interpret → Next step → Verify." },
      { q: "I replace parts, but the fault comes back.", a: "Each fault entry gives a test order and a decision guide, so you prove the fault before replacing anything." },
      { q: "Schematics look like a foreign language.", a: "A full chapter on reading schematics, plus worked examples on a real Redmi Note 7 Pro schematic." },
      { q: "I waste time searching for the right fix.", a: "Look up the symptom in the fault-entry index and follow that entry's test order." }
    ],
    faq: [
      { q: "Which languages is it available in?", a: "English, Tamil, Malayalam, Hindi, Marathi, Kannada, Telugu, Urdu, Bengali and Gujarati. Each edition is the complete book in that language, and one purchase gives you real access to all 10 — you can download every edition." },
      { q: "Is it a printed book?", a: "No. It's a digital ebook (PDF), formatted for reading on your phone. Nothing is shipped." },
      { q: "I'm a complete beginner. Will I understand it?", a: "Yes. The book has a beginner path: read Volume 1 (safety, electricity, multimeter, schematics, the method) before the fault entries." },
      { q: "Which phone models does it cover?", a: "Worked examples use one reference model — the Redmi Note 7 Pro — with its real schematic. The diagnostic method you learn applies to every model." },
      { q: "What tools do I need?", a: "A digital multimeter, a DC bench power supply and a USB meter. Volume 1 teaches how to use each one." }
    ]
  },

  /* ------------------------------------------------------------------
     COPY THIS BLOCK FOR EACH NEW BOOK (paste it above this comment)
  {
    slug: "book-name-here",          // short name, lowercase, dashes
    status: "live",                  // "live" or "coming-soon"
    page: false,                     // true only if you made a detail-page folder for it
    title: "Book Title",
    subtitle: "Short subtitle",
    price: 999,
    buyLink: "",                     // Cashfree Payment Form link
    coverImage: "covers/book-name-here.jpg",   // upload the cover into ebook/covers/
    coverColor: "#111111",
    languages: [
      { name: "English", ready: true },
      { name: "தமிழ் Tamil", ready: true }
    ]
  },
  ------------------------------------------------------------------ */

];
