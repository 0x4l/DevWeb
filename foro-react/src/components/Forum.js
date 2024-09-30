import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, query, onSnapshot, orderBy } from 'firebase/firestore';
import Comments from './Comments';
import './Forum.css';

function Forum({ user }) {
  const [title, setTitle] = useState('');
  const [thread, setThread] = useState('');
  const [threads, setThreads] = useState([]);

 
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
      alert('Por favor, llena ambos campos para crear un nuevo hilo.');
      return;
    }

    try {
      await addDoc(collection(db, 'threads'), {
        title: title,
        thread: thread,
        user: user ? user.email : 'Anon',
        createdAt: new Date(),
      });
      setTitle('');
      setThread('');
    } catch (error) {
      console.error('Error al crear hilo:', error);
      alert(error.message);
    }
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
            <button className="submit-button" type="submit">Publicar hilo</button>
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
              <small>Por: {thread.user}</small>
              {/* Integrar el componente de comentarios */}
              <Comments threadId={thread.id} user={user} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Forum;