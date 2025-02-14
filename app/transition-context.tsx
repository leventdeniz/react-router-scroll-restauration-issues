import React, { useContext, useRef } from 'react';

export const TransitionContext = React.createContext<({ setTransition: (transition: string) => void; transition: string }) | null>(null);

export const useTransitionContext = () => useContext(TransitionContext);

const TransitionContextProvider = ({ children, handler }:{ children: React.ReactNode}) => {
  const transitionRef = useRef('');

  const setTransition = (value: string) => {
    console.log('setTransition', value);
    handler(value);
    // transitionRef.current = value;
  }


  return(
    <TransitionContext.Provider value={{ setTransition, transition: transitionRef.current }}>
      {children}
    </TransitionContext.Provider>
  )
}

export default TransitionContextProvider;
