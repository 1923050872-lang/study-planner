// src/types/index.ts

export type Course = {
  id: string;
  code: string;       // Ví dụ: 'TH7011101'
  name: string;       // Ví dụ: 'Lập trình Mobile'
  colour: string;     // Mã màu nhận diện môn học
};

export type AssignmentStatus = 'pending' | 'completed';

export type Assignment = {
  id: string;
  courseId: string;   // Liên kết tới Course.id
  title: string;      // Tên bài tập / deadline
  dueAt: string;      // Thời gian hết hạn (dạng ISO string)
  status: AssignmentStatus;
  notes?: string;     // Ghi chú thêm (không bắt buộc)
  photoUri?: string;  // Đường dẫn ảnh đính kèm (không bắt buộc)
};

export type User = {
  id: string;
  name: string;
  email: string;
};