
import React, { useState, useEffect, useRef } from 'react'; 
import { db, storage } from '../firebase';
import { collection, addDoc, query, onSnapshot, orderBy, updateDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import './Forum.css';
import Comments from './Comments';

function Forum({ user }) {
  const [title, setTitle] = useState('');
  const [thread, setThread] = useState('');
  const [threads, setThreads] = useState([]);
  const [image, setImage] = useState(null); 
  const [loading, setLoading] = useState(false); 
  const fileInputRef = useRef(); 

  
  useEffect(() => {
    const q = query(collection(db, 'threads'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const threadsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setThreads(threadsData);
    });

    return () => unsubscribe();
  }, []);

  
  const handleAddThread = async (e) => {
    e.preventDefault();
    if (title.trim() === '' || thread.trim() === '') {
      alert('Por favor, llena todos los campos.');
      return;
    }

    setLoading(true); 
    let imageUrl = null;

    if (image) {
      try {
        
        const imageRef = ref(storage, `images/${image.name}-${Date.now()}`);
        await uploadBytes(imageRef, image);
        imageUrl = await getDownloadURL(imageRef); 
      } catch (error) {
        console.error('Error al subir la imagen:', error);
        setLoading(false); 
        return;
      }
    }

    try {
      
      await addDoc(collection(db, 'threads'), {
        title,
        thread,
        imageUrl, 
        user: user ? user.email : 'Anon',
        createdAt: new Date(),
        likes: 0, 
      });

      setTitle('');
      setThread('');
      setImage(null); 
      fileInputRef.current.value = ''; 
      setLoading(false); 
    } catch (error) {
      console.error('Error al crear el hilo:', error);
      setLoading(false); 
    }
  };

 
  const handleLikeThread = async (threadId, currentLikes) => {
    const threadRef = doc(db, 'threads', threadId);
    await updateDoc(threadRef, { likes: currentLikes + 1 });
  };

  const handleFileInputClick = () => {
    fileInputRef.current.click(); 
  };

  return (
    <div className="forum">
      {user && (
        <div className="new-thread-form">
          <h2>Crear un nuevo hilo</h2>
          <form onSubmit={handleAddThread}>
            <input
              type="text"
              placeholder="Título del hilo"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <textarea
              placeholder="Escribe tu hilo aquí..."
              value={thread}
              onChange={(e) => setThread(e.target.value)}
              required
            ></textarea>
            
            {}
            <div className="image-upload-container">
              <button
                type="button"
                className="image-upload-button"
                onClick={handleFileInputClick}
              >
                Seleccionar imagen
              </button>
              <span className="image-upload-filename">
                {image ? image.name : 'Ninguna imagen seleccionada'}
              </span>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={(e) => setImage(e.target.files[0])}
                accept="image/*"
              />
            </div>

            <button className="submit-button" type="submit" disabled={loading}>
              {loading ? 'Subiendo...' : 'Publicar hilo'}
            </button>
          </form>
        </div>
      )}

      <div className="thread-list">
        <h2>Foro</h2>
        {threads.length === 0 ? (
          <p>No hay hilos disponibles.</p>
        ) : (
          threads.map((thread) => (
            <div className="thread-card" key={thread.id}>
              <h3>{thread.title}</h3>
              <p>{thread.thread}</p>
              {thread.imageUrl && <img src={thread.imageUrl} alt="Contenido del hilo" className="thread-image" />}
              <small>Por: {thread.user}</small>

              {}
              <div className="like-button-container">
                <button
                  className="like-button"
                  onClick={() => handleLikeThread(thread.id, thread.likes || 0)}
                >
                  {thread.likes || 0} ❤️
                </button>
              </div>

              <Comments threadId={thread.id} user={user} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Forum;
