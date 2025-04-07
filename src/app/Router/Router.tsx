import { AddNote } from "@components/AddNote/addNote"
import { Content } from "@components/Content/Content"
import { Notes } from "@components/Notes/Notes"
import { PagePaths, routePatterns } from "@data/pagePaths"
import { useAppDispatch, useAppSelector } from "@slices/index"
import { navigateTo } from "@slices/routersSlice"
import { useEffect } from "react"

const pages ={
  [PagePaths.Home]: <Content />,
  [PagePaths.AddNote]: <AddNote />,
  [PagePaths.Notes]: <Notes />,
};

export const Router = () => {
  const path = useAppSelector(state => state.routersSlice.path) as PagePaths;
  const dispatch = useAppDispatch();

  useEffect(() => {
    const updatePath = () => dispatch(navigateTo(window.location.pathname));

    window.addEventListener('popstate', updatePath);
    return () => {
      window.removeEventListener('popstate', updatePath);
    }
  }, [dispatch])

  const renderComponent = () => {
    for (const [routePath, regex] of Object.entries(routePatterns)) {
      if (regex.test(path)) {

        switch (routePath) {
          case PagePaths.AddNote:
            return <AddNote />;
          case PagePaths.Notes:
            return <Notes />;
          default:
            return <Content />;
        }
      }
    }

    return pages[path];
  };

  return renderComponent();
}
