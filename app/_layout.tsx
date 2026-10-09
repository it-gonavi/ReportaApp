import '../global.css';
import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { colors } from '../src/theme/tokens';

export default function RootLayout() {
  return <>
    <StatusBar style="light" backgroundColor={colors.background}/>
    <Stack screenOptions={{ headerShown:false, contentStyle:{backgroundColor:colors.background}, animation:'slide_from_right' }}/>
  </>;
}
