const files = import.meta.glob("../content/projects/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

export const projects = Object.entries(files)
  .map(([path, raw]) => {
    const slug = path.split("/").pop().replace(/\.md$/, "");
    const { data, body } = parseFrontmatter(String(raw));
    const order = Number(data.order);
    return {
      slug,
      title: data.title || "Untitled",
      text: body,
      image: data.image || "",
      focus: data.focus || "center",
      order: Number.isFinite(order) ? order : 999,
    };
  })
  .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));

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
