// models/SeoMeta.js
import mongoose from 'mongoose';

const seoMetaSchema = new mongoose.Schema({
  pagePath: { type: String, required: true, unique: true, index: true },
  title: { type: String, default: '' },
  description: { type: String, default: '' },
  keywords: { type: String, default: '' },
  canonical: { type: String, default: '' },
  og_url: { type: String, default: '' },
  publisher: { type: String, default: '' },
  robots: { type: String, default: 'index, follow' }
}, { timestamps: true });

export default mongoose.models.SeoMeta || mongoose.model('SeoMeta', seoMetaSchema);
