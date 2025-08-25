import ValidatedField from "./ValidatedField.jsx";

export default function EditorForm({ schema, register, errors, watch, hash }) {
  return (
    <form className="space-y-3 sm:space-y-4">
      {schema.fields.map((f) => (
        <ValidatedField 
          key={f.key} 
          f={f} 
          register={register} 
          errors={errors}
          watch={watch}
        />
      ))}

      <p className="text-[10px] sm:text-[11px] text-[#8b94a3] pt-1">
        doc hash: {hash.slice(0, 8)}…
      </p>
    </form>
  );
}