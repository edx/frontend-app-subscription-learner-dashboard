import React from 'react';
import { ProgramProgressContextProvider } from './ProgramProgressProvider';
import ProgramProgress from './ProgramProgress';

const ProgramProgressWithProvider = () => (
  <ProgramProgressContextProvider>
    <ProgramProgress />
  </ProgramProgressContextProvider>
);

export default ProgramProgressWithProvider;
