
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ImpersonatedAgent {
  id: string;
  name: string;
  email: string;
}

interface ImpersonationContextType {
  isImpersonating: boolean;
  impersonatedAgent: ImpersonatedAgent | null;
  startImpersonation: (agent: ImpersonatedAgent) => void;
  exitImpersonation: () => void;
}

const ImpersonationContext = createContext<ImpersonationContextType | undefined>(undefined);

export const useImpersonation = () => {
  const context = useContext(ImpersonationContext);
  if (!context) {
    throw new Error('useImpersonation must be used within an ImpersonationProvider');
  }
  return context;
};

interface ImpersonationProviderProps {
  children: ReactNode;
}

export const ImpersonationProvider = ({ children }: ImpersonationProviderProps) => {
  const [isImpersonating, setIsImpersonating] = useState(false);
  const [impersonatedAgent, setImpersonatedAgent] = useState<ImpersonatedAgent | null>(null);

  const startImpersonation = (agent: ImpersonatedAgent) => {
    setImpersonatedAgent(agent);
    setIsImpersonating(true);
    console.log(`Started impersonating agent: ${agent.name} (${agent.id})`);
  };

  const exitImpersonation = () => {
    setImpersonatedAgent(null);
    setIsImpersonating(false);
    console.log('Exited impersonation mode');
  };

  return (
    <ImpersonationContext.Provider
      value={{
        isImpersonating,
        impersonatedAgent,
        startImpersonation,
        exitImpersonation,
      }}
    >
      {children}
    </ImpersonationContext.Provider>
  );
};
