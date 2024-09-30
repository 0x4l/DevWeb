import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import './AuthForm.css';

function AuthForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [user] = useAuthState(auth);

  // Manejar el inicio de sesión
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setEmail(''); // Limpiar campos
      setPassword('');
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      alert(error.message);
    }
  };

  // Manejar el registro y guardar perfil en Firestore
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Guardar el perfil del usuario en Firestore
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: user.email,
        createdAt: new Date(),
      });

      setEmail(''); // Limpiar campos
      setPassword('');
    } catch (error) {
      console.error('Error al registrarse:', error);
      alert(error.message);
    }
  };

  // Manejar el cierre de sesión
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      alert(error.message);
    }
  };

  return (
    <div className="auth-container">
      {user ? (
        <div className="auth-logged-in">
          <p>Bienvenido, {user.email}</p>
          <button onClick={handleLogout} className="auth-button">Cerrar sesión</button>
        </div>
      ) : (
        <div className="auth-box">
          <form onSubmit={isRegistering ? handleRegister : handleLogin} className="auth-form">
            <h3>{isRegistering ? 'Registrarse' : 'Iniciar Sesión'}</h3>
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="auth-button">
              {isRegistering ? 'Registrarse' : 'Iniciar sesión'}
            </button>
          </form>
          <button
            onClick={() => setIsRegistering(!isRegistering)}
            className="switch-button"
          >
            {isRegistering ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate'}
          </button>
        </div>
      )}
    </div>
  );
}

export default AuthForm;