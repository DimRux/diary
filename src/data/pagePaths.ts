export enum PagePaths {
  Home = "/",
  AddNote = "/addNote",
  Notes = "/notes",
}

export const routePatterns = {
  [PagePaths.AddNote]: /^\/addNote\/(.+)$/,
  [PagePaths.Notes]: /^\/notes\/(.+)$/,
};