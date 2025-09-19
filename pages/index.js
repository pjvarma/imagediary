
// pages/index.js
import { useState, useRef } from 'react';
import OCRTab from '../components/OCRTab';

export default function Home() {
  const [tab, setTab] = useState('images');
  const [images, setImages] = useState([]);
  const fileRef = useRef();

  const fetchImages = async () => {
    // You'd fetch the images from /public/uploads directory, using a server endpoint or a static list
    // For demo, use mock data or read from the folder in getServerSideProps
  };

  // ...add image fetching logic here (see advanced Next.js docs for folder listing)

  const handleUpload = async (e) => {
    e.preventDefault();
    const file = fileRef.current.files[0];
    const formData = new FormData();
    formData.append('image', file);

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });
    if (res.ok) {
      const data = await res.json();
      setImages([...images, data.url]);
    }
  };

  return (
    <div>
      <button onClick={() => setTab('images')}>Uploaded Images</button>
      <button onClick={() => setTab('ocr')}>Extracted Notes</button>
      <form onSubmit={handleUpload}>
        <input type="file" ref={fileRef} />
        <button type="submit">Upload Image</button>
      </form>
      {tab === 'images' && (
        <div>
          {images.map(img => <img src={img} alt="uploaded" key={img} width={120} />)}
        </div>
      )}
      {tab === 'ocr' && <OCRTab images={images} />}
    </div>
  );
}
