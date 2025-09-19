
// components/OCRTab.js
import { useEffect, useState } from 'react';
import Tesseract from 'tesseract.js';

export default function OCRTab({ images }) {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    async function processImages() {
      const results = [];
      for (let img of images) {
        const {  { text } } = await Tesseract.recognize(
          window.location.origin + img,
          'eng'
        );
        results.push({ img, text });
      }
      setNotes(results);
    }
    if (images.length) processImages();
  }, [images]);

  return (
    <div>
      {notes.map(({ img, text }) => (
        <div key={img}>
          <img src={img} alt="img" width={120} />
          <pre>{text}</pre>
        </div>
      ))}
    </div>
  );
}
