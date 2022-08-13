export type IThemeData = {
  [themeKey: string]: string;
};

export type ITheme = {
  primaryColor?: string;
};

const hyphenateRE = /([^-])([A-Z])/g;

export function setThemeData(theme: IThemeData) {
  Object.keys(theme).forEach((themeKey) => {
    const _themeKey = themeKey
      .replace(hyphenateRE, "$1-$2")
      .replace(hyphenateRE, "$1-$2")
      .toLowerCase();
    document.documentElement.style.setProperty(
      `--${_themeKey}`,
      theme[themeKey]
    );
  });
}
