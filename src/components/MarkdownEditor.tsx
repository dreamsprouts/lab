import React, { useState, useRef, useCallback } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { downloadMarkdown, readFileAsText } from '../utils/fileOperations'
import { Toolbar } from './Toolbar'
import { format } from 'date-fns'

export const MarkdownEditor: React.FC = () => {
  const [markdown, setMarkdown] = useLocalStorage('markdown-content', '# 歡迎使用 Markdown 編輯器\n\n開始輸入您的內容...')
  const [showPreview, setShowPreview] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdown(e.target.value)
  }

  const insertTextAtCursor = useCallback((text: string, cursorOffset = 0) => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const currentValue = textarea.value

    const newValue = currentValue.slice(0, start) + text + currentValue.slice(end)
    setMarkdown(newValue)

    // 設置光標位置
    setTimeout(() => {
      textarea.focus()
      const newCursorPos = start + cursorOffset
      textarea.setSelectionRange(newCursorPos, newCursorPos)
    }, 0)
  }, [setMarkdown])

  const handleLoadFile = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      try {
        const content = await readFileAsText(file)
        setMarkdown(content)
      } catch (error) {
        console.error('Error reading file:', error)
        alert('讀取檔案時發生錯誤')
      }
    }
    // 重置 input
    e.target.value = ''
  }

  const handleSaveFile = () => {
    const timestamp = format(new Date(), 'yyyy-MM-dd_HH-mm-ss')
    downloadMarkdown(markdown, `markdown_${timestamp}.md`)
  }

  const handleTogglePreview = () => {
    setShowPreview(!showPreview)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault()
      insertTextAtCursor('  ', 2)
    }
  }

  return (
    <div className="h-screen flex flex-col">
      {/* 工具列 */}
      <Toolbar
        onInsertText={insertTextAtCursor}
        onLoadFile={handleLoadFile}
        onSaveFile={handleSaveFile}
        onTogglePreview={handleTogglePreview}
        showPreview={showPreview}
      />

      {/* 隱藏的檔案輸入 */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".md,.markdown,.txt"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* 編輯器主體 */}
      <div className="flex-1 flex">
        {/* 編輯區域 */}
        <div className={`${showPreview ? 'w-1/2' : 'w-full'} flex flex-col`}>
          <div className="bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 border-b">
            編輯器
          </div>
          <textarea
            ref={textareaRef}
            value={markdown}
            onChange={handleTextareaChange}
            onKeyDown={handleKeyDown}
            className="flex-1 p-4 font-mono text-sm border-none outline-none resize-none bg-white"
            placeholder="在這裡輸入 Markdown 內容..."
            spellCheck={false}
          />
        </div>

        {/* 預覽區域 */}
        {showPreview && (
          <div className="w-1/2 flex flex-col border-l border-gray-200">
            <div className="bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 border-b">
              預覽
            </div>
            <div className="flex-1 overflow-auto p-4 bg-white">
              <div className="markdown-content">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    code({ inline, className, children, ...props }) {
                      const match = /language-(\w+)/.exec(className || '')
                      return !inline && match ? (
                        <SyntaxHighlighter
                          style={tomorrow}
                          language={match[1]}
                          PreTag="div"
                          {...props}
                        >
                          {String(children).replace(/\n$/, '')}
                        </SyntaxHighlighter>
                      ) : (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      )
                    }
                  }}
                >
                  {markdown}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}