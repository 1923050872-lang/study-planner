// src/hooks/usePlannerData.ts
import { useEffect, useState } from 'react';
import { mockApi } from '../services/api';
import { Assignment, Course } from '../types';

export function usePlannerData() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const loadData = async () => {
    setLoading(true);
    const [cList, aList] = await Promise.all([
      mockApi.getCourses(),
      mockApi.getAssignments(),
    ]);
    setCourses(cList);
    setAssignments(aList);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const toggleStatus = async (id: string) => {
    await mockApi.toggleAssignmentStatus(id);
    const updated = await mockApi.getAssignments();
    setAssignments(updated);
  };

  return { courses, assignments, loading, toggleStatus, refetch: loadData };
}