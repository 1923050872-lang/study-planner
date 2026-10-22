// src/app/weekly.tsx
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../constants/theme';
import { usePlannerData } from '../hooks/usePlannerData';

export default function WeeklyScreen() {
  const router = useRouter();
  const { courses = [], assignments = [] } = usePlannerData();
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);

  // Thống kê tiến độ theo môn học
  const statsPerCourse = useMemo(() => {
    return (courses as any[]).map((course: any) => {
      const courseAssignments = (assignments as any[]).filter((a: any) => a.courseId === course.id);
      const total = courseAssignments.length;
      const completed = courseAssignments.filter((a: any) => a.status === 'COMPLETED').length;
      const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
      return {
        ...course,
        total,
        completed,
        percentage,
      };
    });
  }, [courses, assignments]);

  // Lọc bài tập theo môn
  const filteredAssignments = useMemo(() => {
    if (!selectedCourseId) return assignments as any[];
    return (assignments as any[]).filter((a: any) => a.courseId === selectedCourseId);
  }, [assignments, selectedCourseId]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.sectionTitle}>Thống kê tiến độ môn học</Text>

      {/* Thống kê từng môn */}
      <View style={styles.statsContainer}>
        {statsPerCourse.map((course: any) => (
          <TouchableOpacity
            key={course.id}
            style={[
              styles.statCard,
              selectedCourseId === course.id && styles.selectedCard,
            ]}
            onPress={() =>
              setSelectedCourseId(selectedCourseId === course.id ? null : course.id)
            }
          >
            <View
              style={[
                styles.colorBar,
                { backgroundColor: course.colour || course.color || Colors.light.tint },
              ]}
            />
            <View style={styles.statInfo}>
              <Text style={styles.courseCode}>{course.code}</Text>
              <Text style={styles.courseName}>{course.name}</Text>
              <Text style={styles.statText}>
                Đã xong: {course.completed}/{course.total} ({course.percentage}%)
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.headerRow}>
        <Text style={styles.sectionTitle}>Lịch học & Bài tập trong tuần</Text>
        {selectedCourseId && (
          <TouchableOpacity onPress={() => setSelectedCourseId(null)}>
            <Text style={styles.resetFilterText}>Xem tất cả</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Danh sách bài tập */}
      {filteredAssignments.length === 0 ? (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyText}>Không có bài tập nào cho môn này!</Text>
        </View>
      ) : (
        filteredAssignments.map((item: any) => {
          const course = (courses as any[]).find((c: any) => c.id === item.courseId);
          const isDone = item.status === 'COMPLETED';
          return (
            <TouchableOpacity
              key={item.id}
              style={styles.assignmentCard}
              onPress={() => router.push(`/assignment/${item.id}` as any)}
            >
              <View style={styles.assignmentHeader}>
                <Text style={styles.assignmentCourse}>{course?.code || 'Môn học'}</Text>
                <Text
                  style={[
                    styles.statusBadge,
                    {
                      backgroundColor: isDone ? '#E6F4EA' : '#FEF7E0',
                      color: isDone ? '#137333' : '#B06000',
                    } as any,
                  ]}
                >
                  {isDone ? 'Hoàn thành' : 'Đang chờ'}
                </Text>
              </View>
              <Text style={styles.assignmentTitle}>{item.title}</Text>
              <Text style={styles.dueDateText}>Hạn chót: {item.dueAt}</Text>
            </TouchableOpacity>
          );
        })
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  contentContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.light.text,
    marginBottom: 12,
  },
  statsContainer: {
    marginBottom: 16,
  },
  statCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#EEE',
    alignItems: 'center',
  },
  selectedCard: {
    borderColor: Colors.light.tint,
    borderWidth: 2,
  },
  colorBar: {
    width: 6,
    height: '100%',
    borderRadius: 3,
    marginRight: 12,
  },
  statInfo: {
    flex: 1,
  },
  courseCode: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#888',
  },
  courseName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.text,
  },
  statText: {
    fontSize: 13,
    color: '#555',
    marginTop: 2,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  resetFilterText: {
    fontSize: 14,
    color: Colors.light.tint,
    fontWeight: '600',
  },
  assignmentCard: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#EEE',
  },
  assignmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  assignmentCourse: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.light.tint,
  },
  statusBadge: {
    fontSize: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    overflow: 'hidden',
    fontWeight: '600',
  },
  assignmentTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 4,
  },
  dueDateText: {
    fontSize: 12,
    color: '#888',
  },
  emptyBox: {
    padding: 16,
    alignItems: 'center',
  },
  emptyText: {
    color: '#888',
  },
});