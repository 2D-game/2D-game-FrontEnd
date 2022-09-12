import React, { Suspense } from 'react';
import Display2DGame from './Components/Display2DGame/Display2DGame';

function App() {
  return (
    <Suspense fallback={<div>Loading... </div>}>
      <Display2DGame />
    </Suspense>
  );
}

export default App;
