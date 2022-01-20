import fs from "node:fs";
import path from "node:path";
import toml from "@iarna/toml";
import { variants } from "@rose-pine/palette";

const source = JSON.stringify(
  toml.parse(fs.readFileSync("source.toml", "utf8"))
);

Object.keys(variants).forEach((variant) => {
  let theme = source;
  let filename =
    variant === "main" ? "rose-pine.toml" : `rose-pine-${variant}.toml`;

  Object.keys(variants[variant]).forEach((color) => {
    theme = theme.replaceAll(`\$${color}`, variants[variant][color].hex);
  });

  fs.mkdirSync("./themes", { recursive: true });
  fs.writeFileSync(
    path.join("themes", filename),
    toml.stringify(JSON.parse(theme))
  );
});
