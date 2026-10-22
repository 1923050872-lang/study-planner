// src/app/_layout.tsx
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // Tắt thanh tiêu đề mặc định để không bị che chữ
      }}
    />
  );
}