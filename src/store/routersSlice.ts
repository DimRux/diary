import { PagePaths, routePatterns } from "@data/pagePaths";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface RouteState {
  path: string;
}

const initialPath = window.location.pathname;

const initialState: RouteState = {
  path: (Object.values(PagePaths) as unknown as string[]).includes(initialPath) ? initialPath : PagePaths.Home,
};

export const routerSlice = createSlice({
  name: "routers",
  initialState,
  reducers: {
    navigateTo: (state, action: PayloadAction<string>) => {
      const newPath = action.payload;
      window.history.pushState({}, "", newPath);

      const isValidPath = (path: string): boolean => {
        const staticPaths = Object.values(PagePaths) as string[];
        const dynamicPaths = Object.values(routePatterns);
        
        return staticPaths.includes(path) || dynamicPaths.some(regex => regex.test(path));
      };

      state.path = isValidPath(newPath) ? newPath : PagePaths.Home;
    },
  },
});

export const { navigateTo } = routerSlice.actions;
export default routerSlice.reducer;
