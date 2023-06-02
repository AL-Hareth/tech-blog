/** @jsxImportSource react */
import { qwikify$ } from "@builder.io/qwik-react";
import { Editor } from "@tinymce/tinymce-react";

function TinyMceEditor({ name }: { name: string }) {
  // const [content, setContent] = useState<string>("");

  return <Editor textareaName={name} />;
}

export const QwikEditor = qwikify$(TinyMceEditor, { eagerness: "load" });
