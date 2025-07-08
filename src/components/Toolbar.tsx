import React from 'react'

interface ToolbarProps {
  onInsertText: (text: string, cursorOffset?: number) => void
  onLoadFile: () => void
  onSaveFile: () => void
  onTogglePreview: () => void
  showPreview: boolean
}

export const Toolbar: React.FC<ToolbarProps> = ({
  onInsertText,
  onLoadFile,
  onSaveFile,
  onTogglePreview,
  showPreview
}) => {
  const insertMarkdown = (before: string, after = '', cursorOffset = 0) => {
    onInsertText(before + after, before.length + cursorOffset)
  }

  return (
    <div className="flex items-center gap-2 p-3 bg-white border-b border-gray-200 flex-wrap">
      {/* 檔案操作 */}
      <div className="flex items-center gap-2 border-r border-gray-200 pr-3">
        <button
          onClick={onLoadFile}
          className="px-3 py-1.5 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          title="載入檔案"
        >
          載入
        </button>
        <button
          onClick={onSaveFile}
          className="px-3 py-1.5 text-sm bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
          title="儲存檔案"
        >
          儲存
        </button>
      </div>

      {/* 格式化按鈕 */}
      <div className="flex items-center gap-1 border-r border-gray-200 pr-3">
        <button
          onClick={() => insertMarkdown('**', '**', 0)}
          className="px-2 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200 transition-colors font-bold"
          title="粗體"
        >
          B
        </button>
        <button
          onClick={() => insertMarkdown('*', '*', 0)}
          className="px-2 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200 transition-colors italic"
          title="斜體"
        >
          I
        </button>
        <button
          onClick={() => insertMarkdown('`', '`', 0)}
          className="px-2 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200 transition-colors font-mono"
          title="行內程式碼"
        >
          &lt;&gt;
        </button>
      </div>

      {/* 標題按鈕 */}
      <div className="flex items-center gap-1 border-r border-gray-200 pr-3">
        <button
          onClick={() => insertMarkdown('# ', '')}
          className="px-2 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200 transition-colors"
          title="標題 1"
        >
          H1
        </button>
        <button
          onClick={() => insertMarkdown('## ', '')}
          className="px-2 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200 transition-colors"
          title="標題 2"
        >
          H2
        </button>
        <button
          onClick={() => insertMarkdown('### ', '')}
          className="px-2 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200 transition-colors"
          title="標題 3"
        >
          H3
        </button>
      </div>

      {/* 列表和其他 */}
      <div className="flex items-center gap-1 border-r border-gray-200 pr-3">
        <button
          onClick={() => insertMarkdown('- ', '')}
          className="px-2 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200 transition-colors"
          title="無序列表"
        >
          •
        </button>
        <button
          onClick={() => insertMarkdown('1. ', '')}
          className="px-2 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200 transition-colors"
          title="有序列表"
        >
          1.
        </button>
        <button
          onClick={() => insertMarkdown('> ', '')}
          className="px-2 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200 transition-colors"
          title="引用"
        >
          "
        </button>
        <button
          onClick={() => insertMarkdown('```\n', '\n```', 0)}
          className="px-2 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200 transition-colors"
          title="程式碼區塊"
        >
          { }
        </button>
      </div>

      {/* 預覽切換 */}
      <button
        onClick={onTogglePreview}
        className={`px-3 py-1.5 text-sm rounded transition-colors ${
          showPreview 
            ? 'bg-blue-500 text-white' 
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
        title="切換預覽"
      >
        預覽
      </button>
    </div>
  )
}