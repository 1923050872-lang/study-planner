// src/app/_layout.tsx
import { Stack } from 'expo-router';
import { Colors } from '../constants/theme';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.light.background,
        },
        headerTintColor: Colors.light.text,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen name="login" options={{ headerShown: false, title: 'Đăng nhập' }} />
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="weekly" options={{ title: 'Lịch tuần & Thống kê' }} />
      <Stack.Screen
        name="add-assignment"
        options={{
          presentation: 'modal',
          title: 'Thêm bài tập mới',
        }}
      />
      <Stack.Screen
        name="assignment/[id]"
        options={{
          title: 'Chi tiết bài tập',
        }}
      />
      <Stack.Screen
        name="explore"
        options={{
          title: 'Khám phá môn học',
        }}
      />
      <Stack.Screen name="+not-found" options={{ title: 'Lỗi' }} />
    </Stack>
  );
}