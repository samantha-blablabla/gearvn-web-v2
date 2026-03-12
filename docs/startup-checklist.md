# Startup Checklist — GearvnWebV2

Thực hiện các bước này **mỗi khi bắt đầu session làm việc mới** (dev hoặc AI agent).

---

## 1. Figma MCP

**Mục đích**: Lấy đúng measurements, màu sắc, spacing từ Figma thay vì ước lượng.

**Kiểm tra:**
```bash
curl -s --max-time 5 http://127.0.0.1:3845/mcp -o /dev/null -w "%{http_code}"
# Kết quả 400 = đang chạy ✓
# Kết quả 000 hoặc lỗi = chưa chạy ✗
```

**Nếu chưa chạy:**
1. Mở VSCode
2. Cài extension **Figma for VS Code** (nếu chưa có)
3. Đăng nhập Figma trong extension
4. Bật **Dev Mode** trong Figma file
5. MCP server tự khởi động tại `http://127.0.0.1:3845/mcp`

**Figma file:** `https://www.figma.com/file/Ny81e1RasD47Ifn7GHDVIj`

---

## 2. Dev Server (localhost)

**Mục đích**: Preview thay đổi realtime, không cần build.

**Khởi động:**
```bash
cd "d:/test/OneDrive/Documents/Máy tính/GearvnWebV2"
npm run dev
# → http://localhost:3000
```

**Kiểm tra nhanh:**
```bash
curl -s --max-time 5 http://localhost:3000 -o /dev/null -w "%{http_code}"
# 200 = đang chạy ✓
```

---

## 3. Git Status

**Mục đích**: Biết đang đứng ở đâu, tránh build đè lên work dở.

```bash
git status
git log --oneline -5
```

**Rules:**
- Luôn làm việc trên branch `master` (hiện tại chỉ có 1 branch)
- Commit trước khi bắt đầu task lớn mới
- Không commit `.env`, `.next/`, `node_modules/`

---

## 4. Design Tokens

**Mục đích**: Đảm bảo mọi màu/spacing mới đều được khai báo trước khi dùng.

**Kiểm tra file:**
```
src/styles/design-tokens.css
```

**Rule:** Trước khi viết bất kỳ giá trị màu hoặc spacing nào, mở file này kiểm tra token đã có chưa. Nếu chưa — thêm vào đây trước.

---

## 5. Context files (dành cho AI agent)

Khi bắt đầu session mới, AI agent cần đọc:

| File | Nội dung |
|------|---------|
| `CLAUDE.md` | Rules bắt buộc (tự động load) |
| `docs/image-guide.md` | Tên file + kích thước ảnh |
| `docs/product-api-sync.md` | Mapping API → Product type |
| `src/styles/design-tokens.css` | Tất cả CSS variables hiện có |
| `src/types/index.ts` | Type definitions |

---

## Checklist nhanh (copy-paste)

```
[ ] Figma MCP đang chạy (curl → 400)
[ ] localhost:3000 đang chạy
[ ] git status sạch hoặc biết rõ đang có gì uncommitted
[ ] Đã đọc spec file của task sắp làm (docs/specs/...)
[ ] Design tokens đã có đủ cho task
```

---

## Lỗi thường gặp khi bỏ qua checklist

| Bỏ qua bước | Hậu quả |
|-------------|---------|
| Không check Figma MCP | Build sai kích thước, màu sắc không khớp Figma |
| Không check localhost | Không biết component có lỗi render không |
| Không check git status | Overwrite work dở, khó rollback |
| Không check design tokens | Dùng hardcode hex → vi phạm CLAUDE.md rule |
