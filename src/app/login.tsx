// src/app/login.tsx
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Colors, Spacing } from '../constants/theme';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ Email và Mật khẩu!');
      return;
    }
    // Giả lập đăng nhập thành công và chuyển về trang chủ
    Alert.alert('Thành công', 'Đăng nhập thành công!', [
      { text: 'OK', onPress: () => router.replace('/') }
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Study Planner</Text>
      <Text style={styles.subtitle}>Đăng nhập để quản lý lịch học</Text>

      <TextInput
        style={styles.input}
        placeholder="Email sinh viên"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Mật khẩu"
        placeholderTextColor="#888"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Đăng nhập</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: Spacing.four,
    backgroundColor: Colors.light.background,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.light.tint,
    textAlign: 'center',
    marginBottom: Spacing.one,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: Spacing.four,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    padding: Spacing.three,
    marginBottom: Spacing.three,
    backgroundColor: '#FFF',
    fontSize: 16,
  },
  button: {
    backgroundColor: Colors.light.tint,
    padding: Spacing.three,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: Spacing.two,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});