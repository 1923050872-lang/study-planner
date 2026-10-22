// src/app/index.tsx
import { useRouter } from 'expo-router';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Colors, Spacing } from '../constants/theme';
import { usePlannerData } from '../hooks/usePlannerData';

export default function HomeScreen() {
  const router = useRouter();
  const { courses, assignments, loading } = usePlannerData();

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={Colors.light.tint} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header với nút Thêm mới */}
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.headerTitle}>Study Planner 📚</Text>
          <Text style={styles.headerSubtitle}>Quản lý môn học & bài tập</Text>
        </View>
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => router.push('/add-assignment')}
        >
          <Text style={styles.addBtnText}>+ Thêm mới</Text>
        </TouchableOpacity>
      </View>

      {/* Danh sách Môn học */}
      <Text style={styles.sectionTitle}>Môn học gần đây ({courses.length})</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.coursesScroll}>
        {courses.map((course) => (
          <View key={course.id} style={[styles.courseCard, { borderLeftColor: course.colour }]}>
            <Text style={styles.courseCode}>{course.code}</Text>
            <Text style={styles.courseName}>{course.name}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Danh sách Bài tập / Deadline */}
      <Text style={styles.sectionTitle}>Deadline sắp tới ({assignments.length})</Text>
      {assignments.map((item) => {
        const isCompleted = item.status === 'completed';
        return (
          <TouchableOpacity
            key={item.id}
            style={[styles.assignmentCard, isCompleted && styles.completedCard]}
            onPress={() => router.push(('/assignment/' + item.id) as any)}
          >
            <View style={styles.assignmentInfo}>
              <Text style={[styles.assignmentTitle, isCompleted && styles.completedText]}>
                {item.title}
              </Text>
              <Text style={styles.assignmentDate}>
                Hạn chót: {new Date(item.dueAt).toLocaleDateString('vi-VN')}
              </Text>
            </View>
            <View style={[styles.badge, isCompleted ? styles.badgeSuccess : styles.badgePending]}>
              <Text style={styles.badgeText}>{isCompleted ? 'Xong' : 'Chờ'}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  content: {
    padding: Spacing.four,
    paddingTop: Spacing.six,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.six,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.light.text,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: Spacing.one,
  },
  addBtn: {
    backgroundColor: Colors.light.tint,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    borderRadius: 8,
  },
  addBtnText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.light.text,
    marginVertical: Spacing.three,
  },
  coursesScroll: {
    marginBottom: Spacing.four,
  },
  courseCard: {
    backgroundColor: Colors.light.card,
    padding: Spacing.four,
    borderRadius: 8,
    marginRight: Spacing.three,
    width: 140,
    borderLeftWidth: 4,
  },
  courseCode: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#666',
  },
  courseName: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.light.text,
    marginTop: Spacing.one,
  },
  assignmentCard: {
    backgroundColor: Colors.light.card,
    padding: Spacing.four,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.two,
  },
  completedCard: {
    opacity: 0.6,
  },
  assignmentInfo: {
    flex: 1,
    marginRight: Spacing.two,
  },
  assignmentTitle: {
    fontSize: 15,
    fontWeight: '500',
    color: Colors.light.text,
  },
  completedText: {
    textDecorationLine: 'line-through',
  },
  assignmentDate: {
    fontSize: 12,
    color: '#888',
    marginTop: Spacing.one,
  },
  badge: {
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.one,
    borderRadius: 4,
  },
  badgePending: {
    backgroundColor: '#FEF3C7',
  },
  badgeSuccess: {
    backgroundColor: '#DCFCE7',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});