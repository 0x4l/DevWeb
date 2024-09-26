import React, { useCallback, useEffect, useState } from 'react';
import { collection, addDoc, getDocs, query, orderBy } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

function Comments({ threadId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [user] = useAuthState(auth); // Estado del usuario autenticado

  const loadComments = useCallback(async () => {
    try {
      const q = query(collection(db, 'threads', threadId, 'comments'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const commentsData = querySnapshot.docs.map((doc) => doc.data());
      setComments(commentsData);
    } catch (error) {
      console.error("Error loading comments: ", error);
    }
  }, [threadId]);

  useEffect(() => {
    loadComments();
  }, [loadComments]);

  // Función para agregar un nuevo comentario
  const addComment = async () => {
    if (!newComment) {
      alert('Por favor, escribe un comentario.');
      return;
    }
    if (!user) {
      alert('Debes iniciar sesión para comentar.');
      return;
    }

    try {
      await addDoc(collection(db, 'threads', threadId, 'comments'), {
        text: newComment,
        createdBy: user.displayName || user.email, // Guardamos el nombre del usuario o el correo
        createdAt: new Date(),
      });
      setNewComment('');
      loadComments(); // Recargar los comentarios después de agregar uno nuevo
    } catch (error) {
      console.error('Error adding comment: ', error);
    }
  };

  return (
    <div>
      <h4>Comentarios</h4>
      <ul>
        {comments.map((comment, index) => (
          <li key={index}>
            <p>{comment.text}</p>
            <p><strong>Por:</strong> {comment.createdBy}</p>
          </li>
        ))}
      </ul>

      {user ? (
        <div>
          <textarea
            placeholder="Escribe tu comentario"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button onClick={addComment}>Agregar comentario</button>
        </div>
      ) : (
        <p>Por favor, inicia sesión para agregar un comentario.</p>
      )}
    </div>
  );
}

export default Comments;