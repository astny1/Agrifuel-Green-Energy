const files = import.meta.glob("../content/stories/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

export function readPosts(source) {
  return Object.entries(source)
    .map(([path, raw]) => {
      const slug = path.split("/").pop().replace(/\.md$/, "");
      const { data, body } = parseFrontmatter(String(raw));
      return {
        slug,
        title: data.title || "Untitled",
        date: data.date || "",
        kind: data.kind || "News",
        summary: data.summary || "",
        image: data.image || "",
        youtube: data.youtube || "",
        body,
      };
    })
    .sort((a, b) => String(b.date).localeCompare(String(a.date)));
}

export function youtubeId(url) {
  const value = String(url || "").trim();
  if (!value) return "";
  const match = value.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/|live\/))([\w-]{11})/);
  if (match) return match[1];
  try {
    const fromQuery = new URL(value).searchParams.get("v") || "";
    if (/^[\w-]{11}$/.test(fromQuery)) return fromQuery;
  } catch {
    /* A pasted id is handled below. */
  }
  return /^[\w-]{11}$/.test(value) ? value : "";
}

export const videos = readPosts(files)
  .map((item) => {
    const id = youtubeId(item.youtube);
    if (!id) return null;
    return {
      ...item,
      youtubeId: id,
      thumb: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
      watch: `https://www.youtube.com/watch?v=${id}`,
      embed: `https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1`,
    };
  })
  .filter(Boolean);

function parseStoryDate(value) {
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(String(value).trim());
  if (match) return new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

export function formatStoryDate(value) {
  const date = parseStoryDate(value);
  if (!date) return "";
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

export function formatStoryCardDate(value) {
  const date = parseStoryDate(value);
  if (!date) return "";
  const month = date.toLocaleDateString("en-GB", { month: "long" });
  return `${month} ${date.getDate()},${date.getFullYear()}`;
}

function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { data: {}, body: raw.trim() };
  const data = {};
  for (const line of match[1].split(/\r?\n/)) {
    const cut = line.indexOf(":");
    if (cut === -1) continue;
    const key = line.slice(0, cut).trim();
    let value = line.slice(cut + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    data[key] = value;
  }
  return { data, body: match[2].trim() };
}
