import { Link } from 'react-router-dom';
import { formatDate, truncate } from '../utils/format';

const DocumentTable = ({ documents = [] }) => (
  <div className="glass-panel luxury-border overflow-hidden rounded-3xl">
    <table className="min-w-full text-left text-sm">
      <thead className="bg-white/5 text-slate-400">
        <tr>
          <th className="px-5 py-4 font-medium">Document</th>
          <th className="px-5 py-4 font-medium">Category</th>
          <th className="px-5 py-4 font-medium">Summary</th>
          <th className="px-5 py-4 font-medium">Created</th>
        </tr>
      </thead>
      <tbody>
        {documents.map((doc) => (
          <tr key={doc._id} className="border-t border-white/5">
            <td className="px-5 py-4">
              <Link to={`/documents/${doc._id}`} className="font-semibold text-white hover:text-gold">
                {doc.title}
              </Link>
            </td>
            <td className="px-5 py-4 capitalize text-slate-300">{doc.category}</td>
            <td className="px-5 py-4 text-slate-400">{truncate(doc.summary || 'No summary yet')}</td>
            <td className="px-5 py-4 text-slate-400">{formatDate(doc.createdAt)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default DocumentTable;

