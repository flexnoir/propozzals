import { Link } from "react-router-dom";
import { TEMPLATES } from "../lib/templates";

export default function TemplateSelector({ templateId, title }) {
  return (
    <div className="mb-3 sm:mb-4">
      <div className="text-[10px] sm:text-xs uppercase tracking-widest text-[#8b94a3]">
        Template
      </div>
      <div className="mt-1 text-sm lg:text-base text-white font-medium">
        {title || "Proposal"}
      </div>

      <div className="mt-2 sm:mt-3 flex flex-wrap gap-1.5 sm:gap-2">
        {Object.entries(TEMPLATES).map(([id, t]) => (
          <Link
            key={id}
            to={`/editor?t=${id}`}
            className={`text-[10px] sm:text-xs px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-md border text-center whitespace-nowrap ${
              id === templateId
                ? "bg-[#11141a] border-[#2a2f39] text-white"
                : "border-[#2a2f39] text-[#8b94a3] hover:text-[#58e1ff] hover:border-[#58e1ff]"
            }`}
          >
            {t.title || "Template"}
          </Link>
        ))}
      </div>
    </div>
  );
}