// src/app/weekly.tsx
import { useRouter } from 'expo-router';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Colors } from '../constants/theme';
import { usePlannerData } from '../hooks/usePlannerData';

export default function WeeklyScreen() {
  const router = useRouter();
  const { courses, assignments } = usePlannerData();

  // Đếm số bài đã xong và tính phần trăm đồng bộ với index.tsx
  const getCourseStats = (courseId: string) => {
    const courseAssignments = assignments.filter((a) => a.courseId === courseId);
    if (courseAssignments.length === 0) return { completed: 0, total: 0, percent: 0 };
    
    const completed = courseAssignments.filter((a) => a.status === 'completed').length;
    
    const percent = Math.round((completed / courseAssignments.length) * 100);
    return { completed, total: courseAssignments.length, percent };
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Nút quay lại */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backBtnText}>← Lịch tuần & Thống kê</Text>
        </TouchableOpacity>
      </View>

      {/* Phần Thống kê tiến độ */}
      <Text style={styles.sectionTitle}>Thống kê tiến độ môn học</Text>
      {courses.map((course) => {
        const stats = getCourseStats(course.id);
        return (
          <View key={course.id} style={[styles.courseCard, { borderLeftColor: course.colour }]}>
            <Text style={styles.courseCode}>{course.code}</Text>
            <Text style={styles.courseName}>{course.name}</Text>
            
            <View style={styles.progressRow}>
              <View style={styles.progressBarBg}>
                <View
                  style={[
                    styles.progressBarFill,
                    { width: `${stats.percent}%`, backgroundColor: course.colour },
                  ]}
                />
              </View>
              <Text style={styles.statsText}>
                Đã xong: {stats.completed}/{stats.total} ({stats.percent}%)
              </Text>
            </View>
          </View>
        );
      })}

      {/* Lịch học & Bài tập trong tuần */}
      <Text style={styles.sectionTitle}>Lịch học & Bài tập trong tuần</Text>
      {assignments.map((item) => {
        const isCompleted = item.status === 'completed';
        return (
          <TouchableOpacity
            key={item.id}
            style={[styles.assignmentCard, isCompleted && styles.completedCard]}
            onPress={() => router.push(('/assignment/' + item.id) as any)}
          >
            <View style={styles.assignmentInfo}>
              <Text style={styles.courseCodeTag}>{courses.find(c => c.id === item.courseId)?.code}</Text>
              <Text style={[styles.assignmentTitle, isCompleted && styles.completedText]}>
                {item.title}
              </Text>
              <Text style={styles.assignmentDate}>
                Hạn chót: {item.dueAt}
              </Text>
            </View>
            <View style={[styles.badge, isCompleted ? styles.badgeSuccess : styles.badgePending]}>
              <Text style={styles.badgeText}>{isCompleted ? 'Đã xong' : 'Đang chờ'}</Text>
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
    padding: 16,
  },
  header: {
    marginBottom: 16,
  },
  backBtn: {
    paddingVertical: 8,
  },
  backBtnText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.light.text,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.light.text,
    marginVertical: 12,
  },
  courseCard: {
    backgroundColor: Colors.light.card,
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderLeftWidth: 4,
  },
  courseCode: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#666',
  },
  courseName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.text,
    marginTop: 2,
  },
  progressRow: {
    marginTop: 8,
  },
  progressBarBg: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 4,
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  statsText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  assignmentCard: {
    backgroundColor: Colors.light.card,
    padding: 16,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  completedCard: {
    opacity: 0.6,
  },
  assignmentInfo: {
    flex: 1,
  },
  courseCodeTag: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.light.tint,
  },
  assignmentTitle: {
    fontSize: 15,
    fontWeight: '500',
    color: Colors.light.text,
    marginTop: 2,
  },
  completedText: {
    textDecorationLine: 'line-through',
  },
  assignmentDate: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
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