// Drop a partner logo into picture/partners (png, jpg, svg or webp).
// The file name is the name shown to screen readers. Example: "Farmers-Union.png".
const files = import.meta.glob("../picture/partners/*.{png,jpg,jpeg,svg,webp}", {
  eager: true,
  import: "default",
});

export const partners = Object.entries(files)
  .map(([path, src]) => {
    const file = path.split("/").pop() || "Partner";
    const name = file.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ");
    return { src, name };
  })
  .sort((a, b) => a.name.localeCompare(b.name));
