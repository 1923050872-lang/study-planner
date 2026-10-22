# 📚 Study Planner - Ứng dụng Quản lý Học tập Sinh viên

Ứng dụng giúp sinh viên quản lý từ 5–7 môn học, theo dõi bài tập, hạn nộp (deadline), lịch tuần và thống kê tiến độ học tập.

---

## 🚀 Công nghệ sử dụng
- **Framework:** Expo SDK (React Native)
- **Routing:** Expo Router (File-based Routing)
- **Language:** TypeScript (Strict Mode)
- **Styling:** StyleSheet Native & Tokenized Theme

---

## 📂 Cấu trúc dự án
```text
study-planner/
├── src/
│   ├── app/
│   │   ├── _layout.tsx         # Cấu hình Stack Navigation & Modal
│   │   ├── index.tsx           # Màn hình Trang chủ (Dashboard)
│   │   ├── login.tsx           # Màn hình Đăng nhập
│   │   ├── weekly.tsx          # Lịch tuần & Thống kê tiến độ
│   │   ├── add-assignment.tsx  # Modal thêm bài tập
│   │   ├── assignment/[id].tsx # Chi tiết bài tập (Dynamic Route)
│   │   └── +not-found.tsx      # Màn hình xử lý trang không tồn tại
│   ├── components/             # Reusable UI Components
│   ├── constants/              # Theme, Colors & Mock Data
│   └── hooks/                  # Custom Hooks (usePlannerData)
├── AI_LOG.md                   # Nhật ký sử dụng AI
└── README.md                   # Hướng dẫn chạy dự án