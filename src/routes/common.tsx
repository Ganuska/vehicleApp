import { App } from './App';
import { lazyImport } from '../common/utils/lazyImport';

const { Home } = lazyImport(() => import('../Pages/Home'), 'Home');

export const commonRoutes = [
  {
    path: '',
    element: <App />,
    children: [{ path: '/', element: <Home /> }]
  }
];
