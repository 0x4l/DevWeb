import React, { useEffect, useState } from 'react';
import { collection, addDoc, getDocs, orderBy, query } from 'firebase/firestore';
import { auth, db } from '../firebase'; 
import { useAuthState } from 'react-firebase-hooks/auth'; 
import Comments from './Comments';

function Forum() {
  const [threads, setThreads] = useState([]);
  const [newThreadTitle, setNewThreadTitle] = useState('');
  const [newThreadContent, setNewThreadContent] = useState('');
  const [user] = useAuthState(auth); 

 
  const loadThreads = async () => {
    try {
      const q = query(collection(db, 'threads'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const threadsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setThreads(threadsData);
    } catch (error) {
      console.error('Error loading threads: ', error);
    }
  };

  useEffect(() => {
    loadThreads(); 
  }, []);

  
  const createThread = async () => {
    if (!newThreadTitle || !newThreadContent) {
      alert('Por favor, llena ambos campos para crear un nuevo hilo.');
      return;
    }
    if (!user) {
      alert('Debes iniciar sesión para crear un hilo.');
      return;
    }

    try {
      await addDoc(collection(db, 'threads'), {
        title: newThreadTitle,
        content: newThreadContent,
        createdBy: user.displayName || user.email, 
        createdAt: new Date(),
      });
      setNewThreadTitle('');
      setNewThreadContent('');
      loadThreads(); 
    } catch (error) {
      console.error('Error creating thread: ', error);
    }
  };

  return (
    <div>
      <h2>Foro</h2>

      {user ? (
        <div>
          <input
            type="text"
            placeholder="Título del hilo"
            value={newThreadTitle}
            onChange={(e) => setNewThreadTitle(e.target.value)}
          />
          <textarea
            placeholder="Contenido del hilo"
            value={newThreadContent}
            onChange={(e) => setNewThreadContent(e.target.value)}
          />
          <button onClick={createThread}>Crear hilo</button>
        </div>
      ) : (
        <p>Por favor, inicia sesión para crear un nuevo hilo.</p>
      )}

      <div>
        <h3>Hilos</h3>
        {threads.length > 0 ? (
          <ul>
            {threads.map((thread) => (
              <li key={thread.id}>
                <h4>{thread.title}</h4>
                <p>{thread.content}</p>
                <p><strong>Creado por:</strong> {thread.createdBy}</p>
                {}
                <Comments threadId={thread.id} />
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay hilos en el foro todavía.</p>
        )}
      </div>
    </div>
  );
}

export default Forum;
