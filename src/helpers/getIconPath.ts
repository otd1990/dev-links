const getIconPath = (icon: string) =>
  new URL(`../assets/images/icon-${icon}.svg`, import.meta.url).href;

export default getIconPath;
