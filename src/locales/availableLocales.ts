export interface ILocales {
  [key: string]: {
    name: string;
    iso: string;
    flag: string;
  };
}

export const availableLocales: ILocales = {
  en: {
    name: "English",
    iso: "en-US",
    flag: "english",
  },
  tr: {
    name: "Korean",
    iso: "ko-KR",
    flag: "korean",
  },
};
