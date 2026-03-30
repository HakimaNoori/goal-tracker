import { BrowserRouter as Router } from 'react-router-dom';

// Providers
import { LanguageProvider } from './contexts/LanguageContext';
import { ThemeProviderWrapper } from './contexts/ThemeContext';
import { GoalProvider } from './contexts/GoalContext'; // ← این خیلی مهم است

import RouterConfig from './router';

function App() {
  return (
    <LanguageProvider>
      <ThemeProviderWrapper>
        <GoalProvider>
          {' '}
          <Router>
            <RouterConfig />
          </Router>
        </GoalProvider>
      </ThemeProviderWrapper>
    </LanguageProvider>
  );
}

export default App;
