import { useState } from "react";
import "./App.css";

export default function App() {
  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="logo">
          <div className="logo-box">MIR</div>
          <span>Simulador MIR</span>
        </div>

        <nav className="menu">
          <div className="menu-item active">Mi Perfil</div>
          <div className="menu-item">Preferencias</div>
          <div className="menu-item">Simulación</div>
        </nav>
      </aside>

      <main className="main">
        <div className="card">
          <h1>Iniciar sesión</h1>

          <div className="features">
            <span>💾 Guarda tu lista de preferencias</span>
            <span>📱 Accede desde cualquier dispositivo</span>
            <span>👥 Contribuye a simulaciones más precisas</span>
          </div>

          <button className="google-btn">
            Iniciar sesión con Google
          </button>

          <div className="divider">O usa email</div>

          <label>CORREO ELECTRÓNICO</label>
          <input type="email" placeholder="tu@correo.com" />

          <label>CONTRASEÑA</label>
          <input type="password" placeholder="Tu contraseña" />

          <div className="buttons">
            <button className="primary">Iniciar sesión</button>
            <button className="secondary">Registrarse</button>
          </div>

          <p className="forgot">¿Olvidaste tu contraseña?</p>
        </div>
      </main>
    </div>
  );
}