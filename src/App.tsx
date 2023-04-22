import { RouterProvider } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import LatoFont from './fonts/lato';
import { myTheme } from './theme';
import routes from './routes';

import './App.css';

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={myTheme}>
      <RouterProvider router={routes} />
      <LatoFont />
    </MantineProvider>
  );
}

export default App;
