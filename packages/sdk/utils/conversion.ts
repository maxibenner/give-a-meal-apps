export const kilometersToMiles = (value: number) => {
  return value * 0.621371;
};
/**
 * Turns meters into prettified miles
 * Example:
 * 20.000 Meters -> 12 Miles
 * 3000 Meters -> 1.8 Miles
 * 800m -> 0.49 Miles
 * @param value Meter value
 */
export const prettifyMeters = (value: number) => {
  const kilometers = value / 1000;
  const miles = kilometersToMiles(kilometers);
  const feet = miles * 5280;

  if (miles < 0.1) return `${feet.toFixed(0)} feet away`;
  if (miles <= 10) return miles.toFixed(1) + " miles away";
  if (miles > 10) return miles.toFixed(0) + " miles away";
  else return miles.toFixed(2);
};
