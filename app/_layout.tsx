import '~/global.css';

import { Theme, ThemeProvider, DefaultTheme } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Platform, useWindowDimensions } from 'react-native';
import { NAV_THEME } from '~/lib/constants';
import { useColorScheme } from '~/lib/useColorScheme';
import { PortalHost } from '@rn-primitives/portal';
import Tabs from "@/components/tabs/StackTabs";

const LIGHT_THEME: Theme = {
  ...DefaultTheme,
  colors: NAV_THEME.light,
};

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { Stack } from 'expo-router';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

const queryClient = new QueryClient()

export default function RootLayout() {
  const hasMounted = React.useRef(false);
  const { colorScheme, isDarkColorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);
  const { height } = useWindowDimensions()

  useIsomorphicLayoutEffect(() => {
    if (hasMounted.current) {
      return;
    }

    if (Platform.OS === 'web') {
      // Adds the background color to the html element to prevent white background on overscroll.
      document.documentElement.classList.add('bg-background');
    }
    setIsColorSchemeLoaded(true);
    hasMounted.current = true;
  }, []);

  if (!isColorSchemeLoaded) {
    return null;
  }


  const options = {
    headerShown: false,
    presentation: Platform.OS === 'web' ? 'modal' : 'formSheet',
    sheetAllowedDetents: height > 300 ? [0.60] : 'fitToContents',
    sheetGrabberVisible: true,
    sheetCornerRadius: 12,
    animation: 'fade',
    headerBlurEffect: 'dark',
    contentStyle: {
      borderColor: '#ffffff'
    }
  } as any

  return (
    <ThemeProvider value={isDarkColorScheme ? LIGHT_THEME : LIGHT_THEME}>
      <GestureHandlerRootView>
        <QueryClientProvider client={queryClient}>
          <StatusBar style={isDarkColorScheme ? 'light' : 'dark'} />
          <Stack>
            <Stack.Screen name="(tabs)" options={options} />
            <Stack.Screen name="escuela/add" options={options} />
            <Stack.Screen name="escuela/edit/[id]" options={options} />
            <Stack.Screen name="escuela/delete/[id]" options={options} />
            <Stack.Screen name="estudiante/add" options={options} />
            <Stack.Screen name="estudiante/edit/[id]" options={options} />
            <Stack.Screen name="estudiante/delete/[id]" options={options} />
            <Stack.Screen name="estudiante/[id]" options={options} />
            <Stack.Screen name="paquete/add" options={options} />
            <Stack.Screen name="paquete/edit/[id]" options={options} />
            <Stack.Screen name="paquete/delete/[id]" options={options} />
          </Stack>
          <PortalHost />
        </QueryClientProvider>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}

const useIsomorphicLayoutEffect =
  Platform.OS === 'web' && typeof window === 'undefined' ? React.useEffect : React.useLayoutEffect;