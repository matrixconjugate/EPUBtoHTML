// epubConversionLogic.js
import fs from 'fs';
import path from 'path';
import { Epub } from 'epub-gen';

export const epubToHtml = async (epubPath, outputDir) => {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }

  const book = await new Epub({
    title: 'Converted Book',
    author: 'Author Name',
    output: path.join(outputDir, 'converted-book.epub'),
  });

  // Process each item in the EPUB
  for (const item of book.get_items()) {
    if (item.get_type() === Epub.ITEM_DOCUMENT) {
      // Parse the HTML content
      // Modify this part based on how you want to extract content from the EPUB item
      const content = item.get_content();

      // Create a filename for the HTML file
      // Use the item id or create a unique identifier as needed
      const filename = `${item.get_id()}.html`;
      const filePath = path.join(outputDir, filename);

      // Save the HTML content to a file
      fs.writeFileSync(filePath, content);
    }
  }
};
