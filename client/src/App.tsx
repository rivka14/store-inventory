import { QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { queryClient } from './lib/queryClient';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <h1 className="text-3xl font-bold text-center py-8">
            Store Inventory
          </h1>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
