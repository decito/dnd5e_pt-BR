import {
  feetToMeters,
  mileToKilometers,
  poundsToKilograms,
} from "./src/converters.js";

function enableConverters() {
  game.settings.set("dnd5e", "metricWeightUnits", isEnabled());
  window.location.reload();
}

function isEnabled() {
  return game.settings.get("dnd5e_2024_pt-BR", "converters");
}

Hooks.once("init", () => {
  game.settings.register("dnd5e_2024_pt-BR", "converters", {
    name: "Conversão de medidas",
    hint: "Ativa a conversão de pés, milhas e libras para metros, quilômetros e quilogramas. Alterar essa opção ira recarregar a aplicação.",
    scope: "world",
    type: Boolean,
    config: true,
    default: false,
    onChange: () => enableConverters(),
  });

  if (typeof Babele !== "undefined") {
    Babele.get().register({
      module: "dnd5e_2024_pt-BR",
      lang: "pt-BR",
      dir: "compendium",
    });
  }

  Babele.get().registerConverters({
    range: (range) => {
      if (range) {
        if (!isEnabled()) {
          return range;
        }

        if (range.units === "ft") {
          return mergeObject(range, {
            value: feetToMeters(range.value),
            long: feetToMeters(range.long),
            units: "m",
          });
        }

        if (range.units === "mi") {
          return mergeObject(range, {
            value: mileToKilometers(range.value),
            long: mileToKilometers(range.long),
            units: "km",
          });
        }
      }
    },
    target: (target) => {
      if (target) {
        if (!isEnabled()) {
          return target;
        }

        if (target.units === "ft") {
          return mergeObject(target, {
            value: feetToMeters(target.value),
            units: "m",
          });
        }

        if (target.units === "mi") {
          return mergeObject(target, {
            value: mileToKilometers(target.value),
            units: "km",
          });
        }
      }
    },
    weight: (value) => {
      if (!isEnabled()) {
        return value;
      }

      return poundsToKilograms(value);
    },
  });
});

Hooks.on("createScene", (scene) => {
  if (isEnabled()) {
    scene.update({ gridUnits: "m", gridDistance: 2 });
  }
});
