

// src/components/Comments.js
import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, updateDoc, doc, query, onSnapshot, orderBy } from 'firebase/firestore';
import './Comments.css';

function Comments({ threadId, user }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [showComments, setShowComments] = useState(false);
  const [mostLikedComment, setMostLikedComment] = useState(null);

  // Cargar los comentarios de un hilo específico
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

      // Calcular el comentario con más corazones
      const mostLiked = commentsData.reduce((prev, curr) => {
        return (prev.likes || 0) > (curr.likes || 0) ? prev : curr;
      }, {});
      setMostLikedComment(mostLiked.likes > 0 ? mostLiked : null);
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
        likes: 0,
        user: user ? user.email : 'Anon',
        createdAt: new Date(),
      });
      setNewComment('');
    } catch (error) {
      console.error('Error al agregar comentario:', error);
    }
  };

  // Manejar el aumento de "me gusta" (corazones)
  const handleLike = async (commentId, currentLikes) => {
    const commentRef = doc(db, 'threads', threadId, 'comments', commentId);
    await updateDoc(commentRef, { likes: currentLikes + 1 });
  };

  return (
    <div className="comments">
      <h4>Comentarios</h4>
      {!showComments && mostLikedComment ? (
        // Mostrar solo el comentario con más corazones si no se han desplegado los comentarios
        <div className="comment-card">
          <p>{mostLikedComment.text}</p>
          <small>Por: {mostLikedComment.user}</small>
          <span>{mostLikedComment.likes} ❤️</span>
        </div>
      ) : null}

      {showComments && comments.length > 0 ? (
        comments.map((comment) => (
          <div className="comment-card" key={comment.id}>
            <p>{comment.text}</p>
            <small>Por: {comment.user}</small>
            <button onClick={() => handleLike(comment.id, comment.likes || 0)}>
              {comment.likes || 0} ❤️
            </button>
          </div>
        ))
      ) : null}

      {comments.length === 0 ? (
        <p>No hay comentarios aún.</p>
      ) : (
        <button onClick={() => setShowComments(!showComments)} className="toggle-comments">
          {showComments ? 'Ocultar comentarios' : 'Ver todos los comentarios'}
        </button>
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
