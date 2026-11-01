export const PACKS = [
  {
    id: "table",
    name: "Table",
    kg: 2.5,
    blurb: "A first bag, light enough to carry and big enough to learn the fire.",
    fits: "A first order or a small kitchen",
    note: "The bag we suggest when you are still deciding.",
  },
  {
    id: "hearth",
    name: "Hearth",
    kg: 10,
    blurb: "The family bag. A run of everyday meals, stacked and easy to store.",
    fits: "Daily cooking at home",
    note: "The reorder most homes settle into.",
  },
  {
    id: "yard",
    name: "Yard",
    kg: 25,
    blurb: "For a busy home and for a kitchen that cooks for paying customers.",
    fits: "Busy homes and food businesses",
    note: "Fewer trips back for fuel.",
  },
  {
    id: "kiln",
    name: "Kiln",
    kg: 50,
    blurb: "Bulk briquettes for kitchens that cannot afford to run out.",
    fits: "Restaurants, schools and lodges",
    note: "Ask for a standing weekly drop.",
  },
];

export const KITCHENS = [
  {
    id: "family",
    label: "Family kitchen",
    kgPerSession: 0.4,
    hint: "A pot or two on a mbaula",
  },
  {
    id: "business",
    label: "Food business",
    kgPerSession: 1.1,
    hint: "A stall, takeaway, or small restaurant",
  },
  {
    id: "institution",
    label: "Big kitchen",
    kgPerSession: 3.5,
    hint: "A school, lodge, or busy dining room",
  },
];

export const AREAS = [
  "Avondale",
  "Chalala",
  "Chelstone",
  "Chilenje",
  "Garden",
  "Ibex Hill",
  "Kabulonga",
  "Kabwata",
  "Kalingalinga",
  "Kamwala",
  "Libala",
  "Lilayi",
  "Longacres",
  "Makeni",
  "Matero",
  "Meanwood",
  "Ng'ombe",
  "Northmead",
  "Olympia",
  "Rhodes Park",
  "Roma",
  "Woodlands",
  "Somewhere else in Lusaka",
];

export const WHEN = [
  "As soon as you can",
  "This week",
  "Next week",
  "A standing order",
];

export const CROPS = [
  "Maize cobs",
  "Groundnut shells",
  "Rice husks",
  "Cassava peels",
  "Stover or stalks",
  "Mixed crop residue",
];

export const RESIDUE_PER_KG = 1.35;

export function planFuel({ kitchenId, sessionsPerDay, daysPerWeek }) {
  const kitchen = KITCHENS.find((item) => item.id === kitchenId) ?? KITCHENS[0];
  const sessions = clamp(Number(sessionsPerDay) || 1, 1, 12);
  const days = clamp(Number(daysPerWeek) || 1, 1, 7);
  const sessionsMonth = sessions * days * 4.345;
  const kgMonth = sessionsMonth * kitchen.kgPerSession;
  const residueKg = kgMonth * RESIDUE_PER_KG;
  const pack = recommendPack(kgMonth);
  const bags = Math.max(1, Math.ceil(kgMonth / pack.kg));
  return {
    kitchen,
    sessionsPerDay: sessions,
    daysPerWeek: days,
    sessionsMonth,
    kgMonth,
    residueKg,
    pack,
    bags,
  };
}

export function recommendPack(kgMonth) {
  let best = PACKS[0];
  let bestScore = Infinity;
  for (const pack of PACKS) {
    const bags = Math.max(1, Math.ceil(kgMonth / pack.kg));
    const distance = Math.abs(bags - 3);
    const overflow = bags > 8 ? bags : 0;
    const score = distance + overflow;
    if (score < bestScore) {
      best = pack;
      bestScore = score;
    }
  }
  return best;
}

export function buildOrderMessage({ code, form }) {
  return [
    `AgriFuel fuel order ${code}`,
    `Name / Business: ${form.name.trim()}`,
    `Sector: ${form.interest}`,
    `Estimated fuel requirement: ${form.note.trim() || "—"}`,
    `Email / WhatsApp: ${form.phone.trim()}`,
    "Please reply so we can take the next step.",
  ].join("\n");
}

export function buildSupplyMessage({ code, form }) {
  return [
    `AgriFuel residue supply ${code}`,
    `Name: ${form.name.trim()}`,
    `Phone: ${form.phone.trim()}`,
    `Area: ${form.area.trim()}`,
    `Residue: ${form.crop}`,
    form.volume.trim() ? `Rough amount: ${form.volume.trim()}` : "Rough amount: to discuss",
    form.note.trim() ? `Note: ${form.note.trim()}` : "Note: —",
    "I have agricultural residue that could become cooking fuel.",
  ].join("\n");
}

export function orderCode(prefix) {
  const stamp = Date.now().toString(36).toUpperCase().slice(-6);
  return `${prefix}-${stamp}`;
}

export function hasPhone(value) {
  const digits = String(value || "").replace(/\D/g, "");
  return digits.length >= 9 && digits.length <= 15;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function round1(value) {
  return Math.round(value * 10) / 10;
}

export function formatKg(value) {
  const rounded = value >= 10 ? Math.round(value) : Math.round(value * 10) / 10;
  return `${rounded} kg`;
}
