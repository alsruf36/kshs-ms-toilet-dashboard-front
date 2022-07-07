import { IntlifyModuleOptions } from "@intlify/nuxt3";

import ko from "./src/locales/ko-KR.json";

declare module "@nuxt/schema" {
  interface NuxtConfig {
    intlify?: IntlifyModuleOptions;
  }
}

type MessageSchema = typeof ko;

declare module "vue-i18n" {
  export interface DefineLocaleMessage extends MessageSchema {}
}
