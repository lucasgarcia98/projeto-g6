import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import type { Branding, Navigation } from '@toolpad/core/AppProvider';
import { AppProvider } from '@toolpad/core/nextjs';
import * as React from 'react';

import { Home } from '@mui/icons-material';

const NAVIGATION: Navigation = [
  {
    kind: 'header',
    title: 'Menus',
  },
  {
    segment: '',
    title: 'Dashboard',
    icon: <Home />,
  },
  {
    segment: 'situation',
    title: 'Situação',
    icon: <ShoppingCartIcon />,
  },
  {
    segment: 'category',
    title: 'Categoria',
    icon: <ShoppingCartIcon />,
  },
  {
    segment: 'task',
    title: 'Tarefa',
    icon: <ShoppingCartIcon />,
  },
];

const BRANDING: Branding = {
  title: '',
  logo: (
    <img
      src="https://www.g6tecnologia.com.br/wp-content/themes/g6-tecnologia/assets/imgs/header/g6-tecnologia.svg"
      alt="G6 Logo"
    />
  ),
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning data-toolpad-mode="dark">
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <AppProvider navigation={NAVIGATION} branding={BRANDING}>
            {props.children}
          </AppProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
