"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Placeholder from "@tiptap/extension-placeholder"
import { useEffect } from "react"

export default function BlogEditor({setEditorContent}:any) {
  const editor = useEditor({
  extensions: [StarterKit, Placeholder.configure({ placeholder: "Start writing..." })],
  content: "",
  injectCSS: false,
   onUpdate: ({ editor }) => {
    console.log("Current HTML content:", editor.getHTML())
   setEditorContent(editor.getHTML()) 
  },
  editorProps: {
    attributes: {
      class: "min-h-[200px] outline-none",
    },
  },
})


  return (
    <div className="space-y-2 cursor-text">
     

      <div className="min-h-[250px] rounded-lg border border-purple-600 bg-black/30 p-4 focus-within:ring-2 focus-within:ring-purple-500">
        <EditorContent
          editor={editor}
          className="min-h-[200px] text-white outline-none focus:outline-none"
        />
      </div>
    </div>
  )
}
