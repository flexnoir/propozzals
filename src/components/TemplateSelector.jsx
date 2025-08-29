import { useNavigate } from "react-router-dom";
import TemplateDropdown from "./TemplateDropdown";

export default function TemplateSelector({ templateId, title }) {
  const navigate = useNavigate();

  const handleTemplateChange = (newTemplateId) => {
    navigate(`/editor?t=${newTemplateId}`);
  };

  return (
    <div className="mb-6 pb-4 border-b border-[#1a1f27] bg-gradient-to-r from-[#58e1ff]/5 to-transparent p-4 rounded-lg -m-1">
      <div className="mb-3">
        <div className="text-base lg:text-lg text-[#58e1ff] font-semibold">
          {title || "Proposal"}
        </div>
      </div>
      
      <TemplateDropdown
        templateId={templateId}
        onTemplateChange={handleTemplateChange}
        showLabel={true}
        size="normal"
      />
    </div>
  );
}