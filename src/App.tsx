import { Route, Routes } from 'react-router-dom';
import Index from './pages/Index';
import StudioPage from './pages/StudioPage'; // <-- Add this import
import NotFound from './pages/NotFound';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/studio" element={<StudioPage />} /> {/* <-- Add this new route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;