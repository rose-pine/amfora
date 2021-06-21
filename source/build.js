const fs = require("fs");
const path = require("path");
const toml = require("@iarna/toml");

const palette = {
  default: {
    base: "#191724",
    surface: "#1f1d2e",
    overlay: "#26233a",
    inactive: "#555169",
    subtle: "#6e6a86",
    text: "#e0def4",
    love: "#eb6f92",
    gold: "#f6c177",
    rose: "#ebbcba",
    pine: "#31748f",
    foam: "#9ccfd8",
    iris: "#c4a7e7",
  },
  moon: {
    base: "#232136",
    surface: "#2a273f",
    overlay: "#393552",
    inactive: "#59546d",
    subtle: "#817c9c",
    text: "#e0def4",
    love: "#eb6f92",
    gold: "#f6c177",
    rose: "#ea9a97",
    pine: "#3e8fb0",
    foam: "#9ccfd8",
    iris: "#c4a7e7",
  },
  dawn: {
    base: "#faf4ed",
    surface: "#fffaf3",
    overlay: "#f2e9de",
    inactive: "#9893a5",
    subtle: "#6e6a86",
    text: "#575279",
    love: "#b4637a",
    gold: "#ea9d34",
    rose: "#d7827e",
    pine: "#286983",
    foam: "#56949f",
    iris: "#907aa9",
  },
};

const parsed = toml.parse(
  fs.readFileSync(path.join("source", "input.toml"), "utf8")
);

const parsedAsString = JSON.stringify(parsed);


Object.keys(palette).forEach((variant) => {
  let theme = parsedAsString;
  let filename =
    variant == "default" ? "rose-pine.toml" : `rose-pine-${variant}.toml`;

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
