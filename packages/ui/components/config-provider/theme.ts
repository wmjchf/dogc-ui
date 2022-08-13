export type IThemeData = {
  [themeKey: string]: string;
};

export type ITheme = {
  primaryColor?: string;
};

export function setThemeData(theme: IThemeData) {
  Object.keys(theme).forEach((themeKey) => {
    document.documentElement.style.setProperty(themeKey, theme[themeKey]);
  });
}
