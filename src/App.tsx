import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { RootStateProvider } from './common/utils/RootStateContext';
import { AppRoutes } from './routes';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <RootStateProvider>
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        rtl={false}
        draggable
        pauseOnHover
        limit={2}
      />
      <Router>
        <AppRoutes />
      </Router>
    </RootStateProvider>
  );
}

export default App;
