import fs from "fs";
import path from "path";
import toml from "@iarna/toml";
import palette from "@rose-pine/palette";

const variants = ["core", "moon", "dawn"];

const parsed = toml.parse(
  fs.readFileSync(path.join("source", "input.toml"), "utf8")
);

const parsedAsString = JSON.stringify(parsed);

variants.forEach((variant) => {
  let theme = parsedAsString;
  let filename =
    variant == "core" ? "rose-pine.toml" : `rose-pine-${variant}.toml`;

  Object.keys(palette[variant]).forEach((color) => {
    theme = theme.replaceAll(`\$${color}`, palette[variant][color]);
  });

  fs.writeFileSync(
    filename,
    toml.stringify(JSON.parse(theme)),
    function (error) {
      if (error) return console.error(error);
    }
  );
});
