import { Link } from "react-router-dom";

// TemplateCard.jsx
export default function TemplateCard({ id, title, preview }) {
  return (
    <Link
      to={`/editor?t=${id}`}
      className="group relative rounded-xl bg-[#11141a] ring-1 ring-[#222835] p-4 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(0,0,0,.45)] transition block"
    >
      <div className="h-32 sm:h-40 rounded-lg bg-[#0f1115] ring-1 ring-[#1a1f27] grid place-items-center text-[#475064] text-sm">
        {preview || title}
      </div>
      <div className="mt-3 flex items-center justify-between">
        <div className="text-sm text-white font-medium">{title}</div>
        <span className="text-xs text-[#8b94a3] group-hover:text-[#58e1ff]">Use →</span>
      </div>
    </Link>
  );
}
