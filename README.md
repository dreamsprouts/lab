# Markdown 編輯器

一個功能完整的 Markdown 即時編輯器，使用 React + TypeScript + Tailwind CSS 建立。

## 功能特色

- 📝 **即時預覽** - 支援分割視窗顯示編輯器和預覽
- 🎨 **語法高亮** - 程式碼區塊支援語法高亮
- 💾 **自動保存** - 內容自動保存到瀏覽器本地儲存
- 📂 **檔案操作** - 載入和匯出 Markdown 檔案
- 🛠️ **格式化工具** - 提供常用的 Markdown 格式化按鈕
- ⌨️ **快捷鍵** - 支援 Tab 鍵縮排等快捷操作
- 📱 **響應式設計** - 適配不同螢幕尺寸

## 支援的 Markdown 功能

- 標題 (H1-H6)
- **粗體** 和 *斜體* 文字
- `行內程式碼` 和程式碼區塊
- 有序和無序列表
- 引用區塊
- 表格 (GitHub Flavored Markdown)
- 連結和圖片
- 水平分隔線

## 安裝與運行

1. 安裝依賴項：
```bash
npm install
```

2. 啟動開發伺服器：
```bash
npm run dev
```

3. 在瀏覽器中打開 http://localhost:3000

## 建置

建置生產版本：
```bash
npm run build
```

預覽生產版本：
```bash
npm run preview
```

## 工具列功能

- **載入** - 從本地檔案載入 Markdown 內容
- **儲存** - 將當前內容匯出為 .md 檔案
- **B** - 插入粗體格式
- **I** - 插入斜體格式
- **<>** - 插入行內程式碼
- **H1/H2/H3** - 插入對應級別的標題
- **•** - 插入無序列表項目
- **1.** - 插入有序列表項目
- **"** - 插入引用區塊
- **{}** - 插入程式碼區塊
- **預覽** - 切換預覽模式

## 技術架構

- **React 18** - 使用函數式組件和 Hooks
- **TypeScript** - 型別安全的 JavaScript
- **Vite** - 快速的建置工具
- **Tailwind CSS** - 實用優先的 CSS 框架
- **react-markdown** - Markdown 渲染引擎
- **react-syntax-highlighter** - 程式碼語法高亮
- **date-fns** - 日期處理函式庫

## 授權

MIT License
