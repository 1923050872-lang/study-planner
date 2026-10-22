// src/app/add-assignment.tsx
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { Colors, Spacing } from '../constants/theme';
import { mockApi } from '../services/api';
import { Course } from '../types';

export default function AddAssignmentScreen() {
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState<string>('');
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [days, setDays] = useState('2'); // Mặc định deadline sau 2 ngày

  useEffect(() => {
    mockApi.getCourses().then((data) => {
      setCourses(data);
      if (data.length > 0) setSelectedCourseId(data[0].id);
    });
  }, []);

  const handleSave = async () => {
    if (!title.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập tiêu đề bài tập!');
      return;
    }

    const dueAt = new Date(Date.now() + Number(days) * 86400000).toISOString();

    await mockApi.addAssignment({
      courseId: selectedCourseId,
      title,
      notes,
      dueAt,
      status: 'pending',
    });

    router.back(); // Quay lại trang chủ sau khi thêm thành công
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.headerTitle}>Thêm bài tập mới 📝</Text>

      {/* Chọn Môn học */}
      <Text style={styles.label}>Chọn môn học:</Text>
      <View style={styles.courseRow}>
        {courses.map((course) => {
          const isSelected = course.id === selectedCourseId;
          return (
            <TouchableOpacity
              key={course.id}
              style={[
                styles.courseChip,
                isSelected && { backgroundColor: course.colour, borderColor: course.colour },
              ]}
              onPress={() => setSelectedCourseId(course.id)}
            >
              <Text style={[styles.courseChipText, isSelected && styles.selectedChipText]}>
                {course.code}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Tên bài tập */}
      <Text style={styles.label}>Tên bài tập / Deadline:</Text>
      <TextInput
        style={styles.input}
        placeholder="Nộp bài thu hoạch, Làm bài tập 2..."
        placeholderTextColor="#888"
        value={title}
        onChangeText={setTitle}
      />

      {/* Hạn chót (Số ngày tính từ hôm nay) */}
      <Text style={styles.label}>Hạn chót (sau bao nhiêu ngày):</Text>
      <TextInput
        style={styles.input}
        placeholder="2"
        keyboardType="numeric"
        value={days}
        onChangeText={setDays}
      />

      {/* Ghi chú */}
      <Text style={styles.label}>Ghi chú thêm:</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Chi tiết bài tập, link tài liệu..."
        placeholderTextColor="#888"
        multiline
        numberOfLines={3}
        value={notes}
        onChangeText={setNotes}
      />

      {/* Nút Lưu */}
      <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
        <Text style={styles.saveBtnText}>Lưu bài tập</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.light.background },
  content: { padding: Spacing.four },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: Colors.light.text, marginBottom: Spacing.four },
  label: { fontSize: 14, fontWeight: '600', color: Colors.light.text, marginTop: Spacing.three, marginBottom: Spacing.one },
  input: {
    backgroundColor: Colors.light.card,
    padding: Spacing.three,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.light.border,
    fontSize: 15,
    color: Colors.light.text,
  },
  textArea: { height: 80, textAlignVertical: 'top' },
  courseRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: Spacing.two },
  courseChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#CCC',
    backgroundColor: Colors.light.card,
  },
  courseChipText: { fontSize: 13, fontWeight: '600', color: Colors.light.text },
  selectedChipText: { color: '#FFF' },
  saveBtn: {
    backgroundColor: Colors.light.tint,
    padding: Spacing.four,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: Spacing.six,
  },
  saveBtnText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
});