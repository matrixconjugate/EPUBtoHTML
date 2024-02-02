// convertEpub.js
import { execSync } from 'child_process';
import { createWriteStream, existsSync, mkdirSync } from 'fs';
import fsPromises from 'fs/promises';
import path from 'path';

const handler = async (req, res) => {
  try {
    if (req.method === 'POST') {
      // Save the uploaded EPUB file
      const epubPath = 'uploaded.epub';
      const fileStream = createWriteStream(epubPath);
      await new Promise((resolve, reject) => {
        req.pipe(fileStream);
        fileStream.on('finish', resolve);
        fileStream.on('error', reject);
      });

      // Run the Python script
      const pythonScriptPath = './scripts/epub_converter.py';
      const outputPath = './public/converted_output';

      // Create the 'converted_output' directory if it doesn't exist
      if (!existsSync(outputPath)) {
        mkdirSync(outputPath);
      }

      execSync(`python ${pythonScriptPath} ${epubPath} ${outputPath}`);

      // Get the list of filenames without the .html extension
      const filenames = await fsPromises.readdir(path.join(process.cwd(), 'public', 'converted_output'))
        .then(files => files.filter(file => file.endsWith('.html'))
        .map(file => path.parse(file).name));

      res.status(200).json({ filenames });
    } else {
      res.status(405).end(); // Method Not Allowed
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default handler;
