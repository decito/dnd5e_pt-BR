Hooks.on("init", () => {
  if (typeof Babele !== "undefined") {
    Babele.get().register({
      module: "dnd5e_2024_pt-BR",
      lang: "pt-BR",
      dir: "compendium",
    });
  }
});
