import {Stack} from 'expo-router';

import '../global.css';

/**
 * Root layout component for the Expo application.
 *
 * @returns The main stack navigation component.
 */
export default function RootLayout() {
  return <Stack screenOptions={{headerShown: false}} />;
}
