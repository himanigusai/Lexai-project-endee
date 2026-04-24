const UploadCard = ({ children }) => (
  <section className="glass-panel luxury-border rounded-[32px] p-6 md:p-8">
    <div className="mb-6">
      <p className="text-xs uppercase tracking-[0.34em] text-gold">Ingestion</p>
      <h2 className="mt-3 font-display text-2xl font-semibold text-white">Upload a legal knowledge asset</h2>
      <p className="mt-2 text-sm text-slate-300">
        PDF, DOCX, and TXT files are parsed, chunked, embedded, and indexed inside Endee for retrieval.
      </p>
    </div>
    {children}
  </section>
);

export default UploadCard;

