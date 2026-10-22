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

  // Tính toán phần trăm tiến độ hoàn thành theo từng môn học (Computed Progress)
  const getCourseProgress = (courseId: string) => {
    const courseAssignments = assignments.filter((a) => a.courseId === courseId);
    if (courseAssignments.length === 0) return 0;
    const completed = courseAssignments.filter((a) => a.status === 'completed').length;
    return Math.round((completed / courseAssignments.length) * 100);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header với các nút chuyển trang */}
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.headerTitle}>Study Planner 📚</Text>
          <Text style={styles.headerSubtitle}>Quản lý môn học & bài tập</Text>
        </View>

        <View style={styles.actionButtons}>
          {/* Nút Xem Lịch tuần */}
          <TouchableOpacity
            style={styles.weeklyBtn}
            onPress={() => router.push('/weekly')}
          >
            <Text style={styles.weeklyBtnText}>📅 Lịch tuần</Text>
          </TouchableOpacity>

          {/* Nút Đăng nhập */}
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={() => router.push('/login')}
          >
            <Text style={styles.loginBtnText}>Đăng nhập</Text>
          </TouchableOpacity>

          {/* Nút Đăng xuất */}
          <TouchableOpacity
            style={styles.logoutBtn}
            onPress={() => router.replace('/login')}
          >
            <Text style={styles.logoutBtnText}>Đăng xuất</Text>
          </TouchableOpacity>

          {/* Nút Thêm mới bài tập */}
          <TouchableOpacity
            style={styles.addBtn}
            onPress={() => router.push('/add-assignment')}
          >
            <Text style={styles.addBtnText}>+ Thêm mới</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Mục Thống kê Tiến độ Môn học (% Hoàn thành) */}
      <Text style={styles.sectionTitle}>Thống kê tiến độ môn học ({courses.length})</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.coursesScroll}>
        {courses.map((course) => {
          const progress = getCourseProgress(course.id);
          return (
            <View key={course.id} style={[styles.courseCard, { borderLeftColor: course.colour }]}>
              <Text style={styles.courseCode}>{course.code}</Text>
              <Text style={styles.courseName}>{course.name}</Text>
              
              {/* Thanh hiển thị phần trăm */}
              <View style={styles.progressContainer}>
                <View style={styles.progressBarBackground}>
                  <View style={[styles.progressBarFill, { width: `${progress}%`, backgroundColor: course.colour }]} />
                </View>
                <Text style={styles.progressText}>{progress}% hoàn thành</Text>
              </View>
            </View>
          );
        })}
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
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  weeklyBtn: {
    backgroundColor: '#059669',
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    borderRadius: 8,
  },
  weeklyBtnText: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '600',
  },
  loginBtn: {
    backgroundColor: '#E0E7FF',
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    borderRadius: 8,
  },
  loginBtnText: {
    color: '#4338CA',
    fontSize: 13,
    fontWeight: '600',
  },
  logoutBtn: {
    backgroundColor: '#FEE2E2',
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    borderRadius: 8,
  },
  logoutBtnText: {
    color: '#DC2626',
    fontSize: 13,
    fontWeight: '600',
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
    width: 170,
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
  progressContainer: {
    marginTop: Spacing.three,
  },
  progressBarBackground: {
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 4,
    fontWeight: '500',
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