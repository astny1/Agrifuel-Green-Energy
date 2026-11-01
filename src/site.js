// Public contact. Fill these in when the lines are ready.
// WhatsApp: country code + number, digits only, no plus. Example: "260977000000"
import solution from "../picture/web/solution.jpg";
import glow from "../picture/web/glow.jpg";
import pigs from "../picture/web/pigs.jpg";
import plant from "../picture/web/plant.jpg";
import chicks from "../picture/web/chicks.jpg";
import kitchen from "../picture/web/kitchen.jpg";
import sustain from "../picture/web/sustain.jpg";
import contactLandscape from "../picture/web/contact.jpg";
import voicesBg from "../picture/web/voices.jpg";
import who from "../picture/web/who.jpg";
import remigious from "../picture/web/remigious.jpg";
import george from "../picture/web/george.jpg";
import ruth from "../picture/web/ruth.svg";
import numbersBg from "../picture/01-165341686_2878754835669771_7733354894474268300_n.jpg";
import forest from "../picture/winding-road-through-dense-green-forest_917088-1531.jpg";
import pen from "../picture/web/pen.jpg";

export const contact = {
  whatsapp: "260965127193",
  email: "customercare@agrifuelenergy.com",
  phoneDisplay: "0965 127 193",
  location: "Kafue Industrial Yard, Lusaka",
  address: [
    "Kafue Industrial Yard",
    "Lusaka South Multi-Facility Economic Zone",
    "New Kasama, Lusaka 10101",
    "Zambia",
  ],
  profile: "https://drive.google.com/file/d/1RqH-tRtuDx5vmC7aVhrXtx_GuwVpaS6S/view?usp=sharing",
};

export const pages = ["home", "about", "products", "solutions", "projects", "sustainability", "media", "contact"];

export const nav = [
  { id: "home", label: "Home", href: "#home", match: ["home"] },
  {
    id: "about",
    label: "About us",
    href: "#about",
    match: ["about"],
    blurb: "A Lusaka clean-tech company turning agricultural residue into thermal fuel.",
    children: [
      { href: "#about", label: "About the company" },
      { href: "#about/work", label: "How we work" },
    ],
  },
  {
    id: "products",
    label: "Products & solutions",
    href: "#products",
    match: ["products", "solutions"],
    blurb: "Domestic packs and industrial logs, made to fire the equipment you already run.",
    children: [
      { href: "#products", label: "The briquette" },
      { href: "#solutions", label: "Where it is used" },
    ],
  },
  { id: "projects", label: "Projects", href: "#projects", match: ["projects"] },
  { id: "sustainability", label: "Sustainability", href: "#sustainability", match: ["sustainability"] },
  {
    id: "media",
    label: "Media",
    href: "#media",
    match: ["media", "story", "news"],
    blurb: "Stories that matter. Watch our impact.",
    children: [
      { href: "#media", label: "Stories" },
      { href: "#media/news", label: "News impact" },
    ],
  },
  {
    id: "contact",
    label: "Contact",
    href: "#contact",
    match: ["contact"],
    blurb: "Bulk supply, farm logistics, or retail packs. Send a fuel order request.",
    children: [
      { href: "#contact", label: "Talk to us" },
      { href: "#products", label: "The briquette" },
      { href: "#contact/supply", label: "Offer crop residue" },
    ],
  },
];

export const slides = [
  {
    image: contactLandscape,
    alt: "Green hills and trees beside the water under a wide sky",
    title: "Trees give us life.",
    text: "We save them, one briquette at a time.",
    focus: "center 42%",
  },
  {
    image: chicks,
    alt: "Chicks in a brooder around a stove of glowing briquettes",
    title: "Warmth for the chicks.",
    text: "A smokeless fire that stays with the brooder.",
    focus: "42% 68%",
    fade: true,
  },
  {
    image: plant,
    alt: "Industrial briquettes for a boiler already running",
    title: "Logs for the boiler already running.",
    text: "Industrial fuel, fed straight into the fire. No new machine to buy.",
    focus: "center 50%",
    fade: true,
  },
];

export const pillars = [
  { id: "air", title: "100% Smokeless" },
  { id: "hours", title: "4–5 Hours Sustained Burn" },
  { id: "waste", title: "0% Forest Destruction" },
  { id: "heat", title: "Integrity" },
  { id: "results", title: "Results driven", mobile: true },
  { id: "sustain", title: "Sustainability", mobile: true },
];

export const figures = [
  { value: "Households", label: "A clean fire for the pot already in the home." },
  { value: "Farmers", label: "Warmth for chicks and piglets, and heat to dry the harvest." },
  { value: "Kitchens", label: "A steady burn for hotels, lodges and the day’s bake." },
  { value: "Industry", label: "Logs for boilers, kilns and steam, in the plant already running." },
];

export const sectors = [
  {
    id: "poultry",
    title: "Livestock & poultry brooding",
    kicker: "Farms",
    text: "Overnight warmth for chicks and piglets. Smokeless heat, without extra electricity.",
    image: chicks,
    alt: "Briquettes glowing in a brooder among chicks",
    focus: "center 45%",
  },
  {
    id: "kitchens",
    title: "Commercial kitchens & bakeries",
    kicker: "Hospitality",
    text: "High heat for ovens, hotels and lodges. A steady burn, with no smoke in the kitchen.",
    image: kitchen,
    alt: "A large pot cooking on briquettes in an outdoor kitchen",
    focus: "center 58%",
  },
  {
    id: "drying",
    title: "Crop curing & grain drying",
    kicker: "Harvest",
    text: "Heat for maize, cassava, tobacco and tea. The crop is dried before it is lost.",
    image: glow,
    alt: "Briquettes glowing with a steady heat",
    focus: "center 46%",
  },
  {
    id: "industry",
    title: "Industrial boilers & manufacturing",
    kicker: "Industry",
    text: "Logs for steam boilers, kilns and processing plants. The equipment already in place takes the fuel.",
    image: plant,
    alt: "Industrial fuel for boilers and kilns",
    focus: "center 50%",
  },
];

export const productStory = {
  band: {
    image: pen,
    focus: "32% center",
    title: "One briquette. Two forms.",
    text: "Domestic packs for the home and the stall. Industrial logs for the boiler, the kiln and the steam line. Both take the place of charcoal and firewood in the fire already burning.",
  },
  story: {
    title: "Built for the fire you have",
    image: solution,
    alt: "A woman holding a cooking briquette beside a lit mbaula",
    focus: "68% 40%",
    paragraphs: [
      "Micro and domestic packs come in pillow and hexagonal form, for households and stalls. The burn holds for 4–5 hours, 100% smokeless and ash-reduced, in K10 micro-packs and 25kg bags.",
      "Heavy industrial logs carry a central air hole, for boilers, kilns and steam. They stand in for industrial coal and firewood, and the plant does not buy a new machine to make the change.",
    ],
  },
  close: {
    image: kitchen,
    focus: "center 58%",
    title: "Ready for a bulk load.",
    href: "#contact",
    label: "Get a quote",
  },
};

export const work = [
  {
    title: "We aggregate the residue",
    text: "Maize cobs and other crop waste are collected from farms instead of being burned in the open or thrown away.",
    value: "Local farm waste becomes the feedstock.",
  },
  {
    title: "We supply the fuel",
    text: "Domestic packs and industrial logs, ready for the stove, brooder, kiln or boiler already in use.",
    value: "One fuel, from a micro-pack to a bulk load.",
  },
  {
    title: "The fire stays theirs",
    text: "Households, poultry farms, commercial kitchens and industrial boilers take the same clean fuel, at the scale the fire requires.",
    value: "No new machine to buy.",
  },
];

export const voices = [
  {
    quote: "AgriFuel briquettes have been a steady hand on my farm here in Lusaka. The fire stays with the work, the burn is completely smokeless and affordable, and crop waste carries the heat the trees once had to give.",
    who: "Remigious Mwansa",
    role: "Human Resource Manager",
    company: "Kabula Mines",
    image: remigious,
  },
  {
    quote: "Keeping chicks warm used to drain our profits and fill brooders with harsh smoke. AgriFuel changed that—it's affordable, 100% smokeless, and holds heat for 4–5 hours straight. Mortality went down, and margins went up.",
    who: "George Mwape",
    role: "Poultry Producer",
    company: "Lusaka",
    image: george,
  },
  {
    quote: "In a busy kitchen, heat consistency is everything. AgriFuel gives us an affordable, 100% smokeless burn that keeps our grills at peak performance for 4–5 hours. We cut fuel overhead significantly without smoke affecting our dining area.",
    who: "Ruth Muzanga",
    role: "Restaurant Owner",
    company: "Lusaka",
    image: ruth,
  },
];

export const media = [
  {
    id: "media-kitchen",
    image: kitchen,
    alt: "A large pot cooking on briquettes in an outdoor kitchen",
    title: "In the kitchen",
    text: "The briquette under a pot, doing the job charcoal has long been asked to do.",
    focus: "center 58%",
  },
  {
    id: "media-farm",
    image: chicks,
    alt: "Briquettes glowing in a brooder among chicks",
    title: "On the farm",
    text: "The same fire, moved from the cooking stand to a brooder.",
    focus: "center 45%",
  },
  {
    id: "media-stock",
    image: pigs,
    alt: "Briquettes burning beside a sow and piglets",
    title: "Beside the litter",
    text: "Warmth for piglets, kept simple enough for a stockman to run.",
    focus: "center 62%",
  },
];

export const photos = {
  about: {
    src: solution,
    alt: "A woman holding a cooking briquette beside a lit mbaula",
    focus: "68% 40%",
  },
  who: {
    src: who,
    alt: "An AgriFuel worker holding a briquette in the plant",
    focus: "center center",
  },
  numbers: numbersBg,
  forest,
  work: {
    src: glow,
    alt: "AgriFuel briquettes glowing in a metal mbaula",
    focus: "center 46%",
  },
  pageAbout: solution,
  pageProduct: glow,
  pageSolutions: kitchen,
  pageProjects: pigs,
  pageSustain: sustain,
  pageMedia: chicks,
  pageContact: contactLandscape,
  voices: voicesBg,
};

export const interests = [
  "Poultry / Farming",
  "Industrial / Manufacturing",
  "Hospitality / Restaurant",
  "Retail / Distribution",
];

export function parseHash() {
  const raw = (window.location.hash || "#home").replace(/^#/, "");
  const [head, anchor] = raw.split("/");
  if (head === "order") return { page: "contact", anchor: "" };
  if (head === "supply") return { page: "contact", anchor: "supply" };
  if (head === "work") return { page: "about", anchor: "work" };
  if (head === "story" || head === "news") return { page: "news", anchor: anchor || "" };
  if (head === "media" && anchor === "pictures") return { page: "media", anchor: "news" };
  if (head === "top" || head === "") return { page: "home", anchor: "" };
  if (!pages.includes(head)) return { page: "home", anchor: "" };
  return { page: head, anchor: anchor || "" };
}
