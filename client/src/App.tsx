import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { WizardPage } from './pages/WizardPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WizardPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
