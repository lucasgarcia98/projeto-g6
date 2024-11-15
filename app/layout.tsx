'use client';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import type { Branding, Navigation } from '@toolpad/core/AppProvider';
import { AppProvider } from '@toolpad/core/nextjs';
import * as React from 'react';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { ptBR } from 'date-fns/locale';
import Image from 'next/image';

const NAVIGATION: Navigation = [
  {
    kind: 'header',
    title: 'Menus',
  },
  {
    segment: '',
    title: 'Dashboard',
  },
  {
    segment: 'situation',
    title: 'Situação',
  },
  {
    segment: 'category',
    title: 'Categoria',
  },
  {
    segment: 'task',
    title: 'Tarefa',
  },
];

const BRANDING: Branding = {
  title: '',
  logo: (
    <Image
      src="https://www.g6tecnologia.com.br/wp-content/themes/g6-tecnologia/assets/imgs/header/g6-tecnologia.svg"
      alt="G6 Logo"
      width={200}
      height={50}
    />
  ),
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning data-toolpad-mode="dark">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <title>Projeto G6</title>
      </head>
      <body>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
          <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            <AppProvider navigation={NAVIGATION} branding={BRANDING}>
              {props.children}
            </AppProvider>
          </AppRouterCacheProvider>
        </LocalizationProvider>
      </body>
    </html>
  );
}
