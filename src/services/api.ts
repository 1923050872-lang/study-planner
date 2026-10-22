// src/services/api.ts
import { INITIAL_ASSIGNMENTS, INITIAL_COURSES } from '../constants/mockData';
import { Assignment, Course } from '../types';

let courses = [...INITIAL_COURSES];
let assignments = [...INITIAL_ASSIGNMENTS];

export const mockApi = {
  // Lấy danh sách Môn học
  getCourses: async (): Promise<Course[]> => {
    return new Promise((resolve) => setTimeout(() => resolve([...courses]), 300));
  },

  // Lấy danh sách Bài tập
  getAssignments: async (): Promise<Assignment[]> => {
    return new Promise((resolve) => setTimeout(() => resolve([...assignments]), 300));
  },

  // Cập nhật trạng thái bài tập (Hoàn thành / Chưa hoàn thành)
  toggleAssignmentStatus: async (id: string): Promise<Assignment | null> => {
    const item = assignments.find((a) => a.id === id);
    if (item) {
      item.status = item.status === 'completed' ? 'pending' : 'completed';
      return { ...item };
    }
    return null;
  },

  // Thêm bài tập mới
  addAssignment: async (newAssignment: Omit<Assignment, 'id'>): Promise<Assignment> => {
    const created: Assignment = {
      ...newAssignment,
      id: Date.now().toString(),
    };
    assignments.push(created);
    return created;
  },
};