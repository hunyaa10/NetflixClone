import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    red: {
      original: string;
      opaciter: string;
    };
    black: {
      veryDark: string;
      darker: string;
      lighter: string;
    };
    white: {
      darker: string;
      lighter: string;
      opaciter: string;
    };
  }
}
