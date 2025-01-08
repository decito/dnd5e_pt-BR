export function feetToMeters(feet) {
  if (!feet) {
    return feet;
  }

  return parseInt(feet) * 0.3;
}

export function mileToKilometers(mile) {
  if (!mile) {
    return mile;
  }

  return parseInt(mile) * 1.5;
}

export function poundsToKilograms(pounds) {
  if (!pounds) {
    return pounds;
  }

  return parseInt(pounds) / 2;
}
