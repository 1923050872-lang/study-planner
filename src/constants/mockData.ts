// src/constants/mockData.ts
import { Assignment, Course } from '../types';

export const INITIAL_COURSES: Course[] = [
  { id: '1', code: 'TH7011', name: 'Lập trình Mobile', colour: '#2563EB' },
  { id: '2', code: 'TH7022', name: 'Công nghệ Web', colour: '#10B981' },
  { id: '3', code: 'TH7033', name: 'Cơ sở dữ liệu', colour: '#F59E0B' },
];

export const INITIAL_ASSIGNMENTS: Assignment[] = [
  {
    id: '101',
    courseId: '1',
    title: 'Nộp đồ án giữa kỳ Expo Router',
    dueAt: new Date(Date.now() + 86400000 * 2).toISOString(), // 2 ngày tới
    status: 'pending',
    notes: 'Hoàn thiện giao diện 5 màn hình chính.',
  },
  {
    id: '102',
    courseId: '2',
    title: 'Làm bài tập REST API',
    dueAt: new Date(Date.now() + 86400000 * 5).toISOString(), // 5 ngày tới
    status: 'pending',
  },
  {
    id: '103',
    courseId: '3',
    title: 'Thực hành SQL Queries',
    dueAt: new Date(Date.now() - 86400000).toISOString(), // Đã quá hạn
    status: 'completed',
  },
];