"use client";
import { cn } from "@/lib/utils";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Bold,
  Italic,
  Strikethrough,
  Code,
  List,
  ListOrdered,
  Braces,
  Highlighter,
  Undo,
  Redo,
  Quote,
  ListMinus,
  Minus,
} from "lucide-react";
import { useEffect, useState } from "react";

const Menu = ({ editor }) => {
  let handleSelect = (value) => {
    if (value === 0) {
      editor.chain().focus().setParagraph().run();
    } else {
      editor.chain().focus().setHeading({ level: value }).run();
    }
  };

  let valueSelect = () => {
    if (editor.isActive("paragraph")) {
      return 0;
    } else if (editor.isActive("heading", { level: 1 })) {
      return 1;
    } else if (editor.isActive("heading", { level: 2 })) {
      return 2;
    } else if (editor.isActive("heading", { level: 3 })) {
      return 3;
    } else if (editor.isActive("heading", { level: 4 })) {
      return 4;
    } else if (editor.isActive("heading", { level: 5 })) {
      return 5;
    } else {
      return 0;
    }
  };
  if (!editor) {
    return null;
  }
  return (
    <div
      id="buttonGroup"
      className="w-full flex flex-row items-center justify-center gap-1 p-1 flex-wrap"
    >
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={cn(
          "rounded-md p-2 bg-slate-100 text-black hover:bg-slate-200",
          editor.isActive("bold") && "bg-black text-white hover:bg-zinc-900"
        )}
      >
        <Bold />
      </button>
      <button
        type="button"
        onClick={() => {
          editor.chain().focus().toggleItalic().run();
        }}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={cn(
          "rounded-md p-2 bg-slate-100 text-black hover:bg-slate-200",
          editor.isActive("italic") && "bg-black text-white hover:bg-zinc-900"
        )}
      >
        <Italic />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={cn(
          "rounded-md p-2 bg-slate-100 text-black hover:bg-slate-200",
          editor.isActive("strike") && "bg-black text-white hover:bg-zinc-900"
        )}
      >
        <Strikethrough />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={cn(
          "rounded-md p-2 bg-slate-100 text-black hover:bg-slate-200",
          editor.isActive("code") && "bg-black text-white hover:bg-zinc-900"
        )}
      >
        <Code />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={cn(
          "rounded-md p-2 bg-slate-100 text-black hover:bg-slate-200",
          editor.isActive("bulletList") &&
            "bg-black text-white hover:bg-zinc-900"
        )}
      >
        <List />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={cn(
          "rounded-md p-2 bg-slate-100 text-black hover:bg-slate-200",
          editor.isActive("orderedList") &&
            "bg-black text-white hover:bg-zinc-900"
        )}
      >
        <ListOrdered />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={cn(
          "rounded-md p-2 bg-slate-100 text-black hover:bg-slate-200",
          editor.isActive("codeBlock") &&
            "bg-black text-white hover:bg-zinc-900"
        )}
      >
        <Braces />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={cn(
          "rounded-md p-2 bg-slate-100 text-black hover:bg-slate-200",
          editor.isActive("blockquote") &&
            "bg-black text-white hover:bg-zinc-900"
        )}
      >
        <Quote />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
        className="rounded-md p-2 bg-slate-100 text-black hover:bg-slate-200"
      >
        <Undo />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
        className="rounded-md p-2 bg-slate-100 text-black hover:bg-slate-200"
      >
        <Redo />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHighlight().run()}
        className={cn(
          "rounded-md p-2 bg-slate-100 text-black hover:bg-slate-200",
          editor.isActive("highlight") &&
            "bg-black text-white hover:bg-zinc-900"
        )}
      >
        <Highlighter />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        className="rounded-md p-2 bg-slate-100 text-black hover:bg-slate-200"
      >
        <Minus />
      </button>

      <Select value={valueSelect()} onValueChange={handleSelect}>
        <SelectTrigger className="w-[70px]  bg-slate-100 text-black hover:bg-slate-200 outline-none border-none">
          <SelectValue placeholder="H" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value={0}>p</SelectItem>
            <SelectItem value={1}>H1</SelectItem>
            <SelectItem value={2}>H2</SelectItem>
            <SelectItem value={3}>H3</SelectItem>
            <SelectItem value={4}>H4</SelectItem>
            <SelectItem value={5}>H5</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

const extensions = [StarterKit, Highlight.configure({ multicolor: true })];
const TipTapEditor = ({ value, onChange, isEdit, entry }) => {
  const [isLoading, setIsLoading] = useState(true);
  const editor = useEditor({
    extensions,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl m-5 focus:outline-none",
      },
    },
    content: value,
    immediatelyRender: false,

    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);
    },
    onCreate: () => {
      setIsLoading(false);
    },
  });
  useEffect(() => {
    if (
      editor &&
      value ===
        "<h4>✨Hello, Write <strong>your</strong> your entry here !✍🏽</h4>"
    ) {
      editor.commands.setContent(value, true, {
        preserveWhitespace: "full",
      });
    }
    if (editor && isEdit && entry && entry?.content === value) {
      editor.commands.setContent(value, true, {
        preserveWhitespace: "full",
      });
    }
  }, [value]);
  const handleEditorClk = () => {
    if (editor && editor.getText().trim() === "") {
      editor?.commands.focus("end");
    }
  };
  if (isLoading) {
    return (
      <div className="w-[600px] h-[150px] animate-pulse bg-slate-200 rounded-sm"></div>
    );
  }
  return (
    <div
      className="flex flex-col items-start justify-start gap-5 border-2 border-black rounded-md w-full"
      onClick={handleEditorClk}
    >
      <Menu editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default TipTapEditor;
