import { createBrowserRouter } from 'react-router-dom';
import { Error404Page, HomePage } from '../pages';
// eslint-disable-next-line import/named
import { Router } from '@remix-run/router/dist/router';

const router: Router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <Error404Page />,
  },
]);

export default router;
