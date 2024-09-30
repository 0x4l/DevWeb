import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, query, onSnapshot, orderBy } from 'firebase/firestore';
import './Comments.css';

function Comments({ threadId, user }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  // Cargar comentarios de un hilo específico
  useEffect(() => {
    const q = query(
      collection(db, 'threads', threadId, 'comments'),
      orderBy('createdAt', 'asc')
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const commentsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setComments(commentsData);
    });

    return () => unsubscribe();
  }, [threadId]);

  // Manejar la adición de un nuevo comentario
  const handleAddComment = async (e) => {
    e.preventDefault();
    if (newComment.trim() === '') {
      alert('Por favor, escribe un comentario.');
      return;
    }

    try {
      await addDoc(collection(db, 'threads', threadId, 'comments'), {
        text: newComment,
        user: user ? user.email : 'Anon',
        createdAt: new Date(),
      });
      setNewComment('');
    } catch (error) {
      console.error('Error al agregar comentario:', error);
      alert(error.message);
    }
  };

  return (
    <div className="comments">
      <h4>Comentarios</h4>
      {comments.length === 0 ? (
        <p>No hay comentarios aún.</p>
      ) : (
        comments.map((comment) => (
          <div className="comment-card" key={comment.id}>
            <p>{comment.text}</p>
            <small>Por: {comment.user}</small>
          </div>
        ))
      )}

      {user ? (
        <form onSubmit={handleAddComment} className="comment-form">
          <textarea
            placeholder="Escribe tu comentario..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            required
          ></textarea>
          <button type="submit" className="comment-button">Agregar Comentario</button>
        </form>
      ) : (
        <p>Inicia sesión para agregar comentarios.</p>
      )}
    </div>
  );
}

export default Comments;