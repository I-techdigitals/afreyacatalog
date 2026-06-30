import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const supabase = createClient(
  'https://yabopycjkeedkdfupuiw.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlhYm9weWNqa2VlZGtkZnVwdWl3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MjgwNzAzNywiZXhwIjoyMDk4MzgzMDM3fQ.0ejYr-Gb0_g8ZoSiILRt33U92D013UoHImPBv9tD2Z4'
);

const upload = async () => {
  try {
    const filePath = 'public/images/Beige Neutral Minimalist Furniture Catalog Presentation.pdf';
    const fileContent = fs.readFileSync(filePath);
    
    console.log('Uploading PDF to Supabase...');
    const { data, error } = await supabase.storage
      .from('catalogpdf')
      .upload('catalog.pdf', fileContent, {
        contentType: 'application/pdf',
        upsert: true
      });

    if (error) {
      console.error('Upload failed:', error);
    } else {
      console.log('Upload success:', data);
    }
  } catch (err) {
    console.error('Error:', err);
  }
};

upload();
