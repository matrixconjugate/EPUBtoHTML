# epub_converter.py
import os
from ebooklib import epub
from bs4 import BeautifulSoup

def epub_to_html(epub_path, output_dir):
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    book = epub.read_epub(epub_path)

    # Process each item in the EPUB
    for item in book.get_items():
        if item.get_type() == epub.ITEM_DOCUMENT:
            # Parse the HTML content
            soup = BeautifulSoup(item.content, 'html.parser')

            # Create a filename for the HTML file
            # Use the item id or create a unique identifier as needed
            filename = f"{item.get_id()}.html"
            file_path = os.path.join(output_dir, filename)

            # Save the HTML content to a file
            with open(file_path, 'w', encoding='utf-8') as html_file:
                html_file.write(str(soup))
