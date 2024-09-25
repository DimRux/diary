import { createContext, useState, Dispatch, SetStateAction } from 'react';

interface Context {
    journalStarted: boolean,
    setJournalStarted: Dispatch<SetStateAction<boolean>>,
  }

export const PageContext = createContext<Context | null>(null);

export const PageProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [journalStarted, setJournalStarted] = useState(false);

  return (
    <PageContext.Provider value={{ journalStarted, setJournalStarted }}>
      {children}
    </PageContext.Provider>
  );
};
