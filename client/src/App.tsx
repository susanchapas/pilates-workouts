import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { WizardPage } from './pages/WizardPage';
import { LoaderPage } from './pages/LoaderPage';
import { OverviewPage } from './pages/OverviewPage';
import { PlayerPage } from './pages/PlayerPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WizardPage />} />
        <Route path="/loading" element={<LoaderPage />} />
        <Route path="/overview" element={<OverviewPage />} />
        <Route path="/player" element={<PlayerPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
