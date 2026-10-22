# AI LOG - DỰ ÁN STUDY PLANNER

**Môn học:** Lập trình Mobile (Mobile App Development)  
**Mã lớp:** TH7011101 (23DTH1)  
**Đồ án:** Topic 01 — Study Planner  

---

## 1. Nhật ký tương tác với trợ lý AI (Gemini / Copilot)

### Lần 1: Cấu hình Navigation & Sửa lỗi Route
* **Câu hỏi / Prompt:** "Xử lý lỗi TypeScript và route trong `index.tsx` và cấu hình Modal navigation trong `_layout.tsx` cho Expo Router."
* **Nội dung AI đề xuất:** Sử dụng `<Stack>` từ `expo-router` và khai báo `presentation: 'modal'` cho màn hình `add-assignment`.
* **Kết quả:** **Chấp nhận (Accepted)**.
* **Lý do:** Giúp giao diện thêm bài tập hiển thị dạng popup chuẩn UX/UI trên thiết bị di động.

---

### Lần 2: Xây dựng màn hình xem Lịch tuần & Thống kê tiến độ
* **Câu hỏi / Prompt:** "Tạo màn hình `weekly.tsx` hiển thị thống kê % hoàn thành bài tập theo từng môn học (computed) và bộ lọc danh sách bài tập."
* **Nội dung AI đề xuất:** Dùng `useMemo` để tính tỉ lệ phần trăm bài tập đã hoàn thành động từ mảng `courses` và `assignments`.
* **Kết quả:** **Chấp nhận (Accepted)**.
* **Lý do:** Đáp ứng đúng yêu cầu "Progress statistics: completed versus outstanding per course, computed, never stored" của đề bài.

---

### Lần 3: Sửa lỗi Import Spacing trong Theme
* **Câu hỏi / Prompt:** "Sửa lỗi thuộc tính Spacing không tồn tại trong `theme.ts` khi chạy `weekly.tsx`."
* **Nội dung AI đề xuất:** Thay thế `Spacing.three`, `Spacing.four` bằng các giá trị số nguyên trực tiếp (8, 12, 16).
* **Kết quả:** **Chấp nhận (Accepted)**.
* **Lý do:** Tránh xung đột kiểu dữ liệu TypeScript và làm code gọn gàng, ổn định hơn.

---

### Lần 4: Tạo cấu hình đẩy Code lên GitHub
* **Câu hỏi / Prompt:** "Hướng dẫn tạo kho chứa GitHub và xử lý lỗi `fatal: unable to auto-detect email address` khi git commit."
* **Nội dung AI đề xuất:** Chạy lệnh `git config --global user.email` và `git config --global user.name` trước khi commit.
* **Kết quả:** **Chấp nhận (Accepted)**.
* **Lý do:** Giải quyết triệt để lỗi định danh người dùng trong Git.

---

## 2. Bài học kinh nghiệm & Đánh giá AI
* **Điểm phát hiện AI làm chưa đúng:** Ban đầu AI tạo kiểu dữ liệu `Spacing` ở file `weekly.tsx` nhưng chưa khai báo đồng bộ trong `theme.ts`, dẫn đến lỗi TypeScript (`Problems 3`). Nhóm đã tự phát hiện và yêu cầu AI sửa lại bằng cách truyền số nguyên trực tiếp (`padding: 16`).
* **Đánh giá tổng quan:** Trợ lý AI giúp đẩy nhanh tốc độ viết UI/UX, tuy nhiên thành viên nhóm vẫn cần nắm vững cấu trúc Expo Router và Git để kiểm soát mã nguồn.