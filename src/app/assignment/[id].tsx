// src/app/assignment/[id].tsx
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { Colors, Spacing } from '../../constants/theme';
import { mockApi } from '../../services/api';
import { Assignment, Course } from '../../types';

export default function AssignmentDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const [aList, cList] = await Promise.all([
        mockApi.getAssignments(),
        mockApi.getCourses(),
      ]);
      const foundAssignment = aList.find((a) => a.id === id);
      if (foundAssignment) {
        setAssignment(foundAssignment);
        const foundCourse = cList.find((c) => c.id === foundAssignment.courseId);
        setCourse(foundCourse || null);
      }
      setLoading(false);
    }
    fetchData();
  }, [id]);

  const handleToggleStatus = async () => {
    if (!assignment) return;
    const updated = await mockApi.toggleAssignmentStatus(assignment.id);
    if (updated) {
      setAssignment(updated);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={Colors.light.tint} />
      </View>
    );
  }

  if (!assignment) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Không tìm thấy bài tập!</Text>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backBtnText}>Quay lại</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const isCompleted = assignment.status === 'completed';

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <TouchableOpacity style={styles.backLink} onPress={() => router.back()}>
        <Text style={styles.backLinkText}>← Quay lại trang chủ</Text>
      </TouchableOpacity>

      {/* Badge Môn học */}
      {course && (
        <View style={[styles.courseBadge, { backgroundColor: course.colour }]}>
          <Text style={styles.courseBadgeText}>{course.code} - {course.name}</Text>
        </View>
      )}

      {/* Tiêu đề */}
      <Text style={styles.title}>{assignment.title}</Text>

      {/* Hạn chót & Trạng thái */}
      <View style={styles.metaRow}>
        <Text style={styles.dueDate}>
          📅 Hạn chót: {new Date(assignment.dueAt).toLocaleDateString('vi-VN')}
        </Text>
        <View style={[styles.statusBadge, isCompleted ? styles.statusSuccess : styles.statusPending]}>
          <Text style={styles.statusText}>{isCompleted ? 'Đã hoàn thành' : 'Đang chờ'}</Text>
        </View>
      </View>

      {/* Ghi chú */}
      <Text style={styles.sectionHeader}>Ghi chú:</Text>
      <View style={styles.notesBox}>
        <Text style={styles.notesText}>
          {assignment.notes || 'Không có ghi chú nào cho bài tập này.'}
        </Text>
      </View>

      {/* Nút Đổi trạng thái */}
      <TouchableOpacity
        style={[styles.actionBtn, isCompleted ? styles.btnUndo : styles.btnComplete]}
        onPress={handleToggleStatus}
      >
        <Text style={styles.actionBtnText}>
          {isCompleted ? 'Đánh dấu chưa xong' : 'Đánh dấu hoàn thành ✓'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.light.background },
  content: { padding: Spacing.four, paddingTop: Spacing.six },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  backLink: { marginBottom: Spacing.four },
  backLinkText: { color: Colors.light.tint, fontSize: 15, fontWeight: '600' },
  courseBadge: { alignSelf: 'flex-start', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12, marginBottom: Spacing.two },
  courseBadgeText: { color: '#FFF', fontSize: 13, fontWeight: 'bold' },
  title: { fontSize: 24, fontWeight: 'bold', color: Colors.light.text, marginBottom: Spacing.three },
  metaRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing.four },
  dueDate: { fontSize: 14, color: '#666' },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 },
  statusPending: { backgroundColor: '#FEF3C7' },
  statusSuccess: { backgroundColor: '#DCFCE7' },
  statusText: { fontSize: 13, fontWeight: 'bold' },
  sectionHeader: { fontSize: 16, fontWeight: '600', color: Colors.light.text, marginBottom: Spacing.two },
  notesBox: { backgroundColor: Colors.light.card, padding: Spacing.four, borderRadius: 8, marginBottom: Spacing.six },
  notesText: { fontSize: 15, color: Colors.light.text, lineHeight: 22 },
  actionBtn: { padding: Spacing.four, borderRadius: 8, alignItems: 'center' },
  btnComplete: { backgroundColor: Colors.light.success },
  btnUndo: { backgroundColor: '#6B7280' },
  actionBtnText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  errorText: { fontSize: 16, color: Colors.light.error, marginBottom: Spacing.four },
  backBtn: { backgroundColor: Colors.light.tint, padding: Spacing.three, borderRadius: 6 },
  backBtnText: { color: '#FFF', fontWeight: 'bold' },
});