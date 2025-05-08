import React from 'react';


const Home = () => {
  return (
    <div className="min-vh-100 text-light" style={{ backgroundColor: '#111', fontFamily: `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif` }}>
      {/* SECCIÓN PRINCIPAL */}
      <div className="container py-4">
        <div className="row align-items-center g-4">
          <div className="col-12 col-md-6">
            <h1 className="display-4 text-white mb-4">
              Bienvenido<span style={{ color: '#f5d76e' }}>.</span>
            </h1>
            <p className="lead mb-3">
              Mi nombre es <strong>Pedro Trujillo</strong>, soy desarrollador Fullstack con base en España.
            </p>
            <p style={{ color: '#aaa' }}>
              Profesional en Tecnologías de la Información con un Grado Superior en Administración de Sistemas Informáticos en Red y más de cuatro años de experiencia en el desarrollo de soluciones tecnológicas innovadoras. Especializado en inteligencia artificial, automatización de procesos y desarrollo full-stack, combino una sólida formación técnica con una visión estratégica enfocada en la optimización de recursos y la mejora de la toma de decisiones. Nivel avanzado de inglés (B2) y dominio de herramientas punteras del sector, aportando valor a través de proyectos escalables, eficientes y centrados en el usuario.
            </p>
          </div>

          <div className="col-12 col-md-6 text-center">
            <div
              style={{
                width: '160px',
                height: '160px',
                borderRadius: '50%',
                backgroundColor: '#222',
                border: '2px solid #f5d76e',
                margin: '0 auto 1.5rem',
              }}
            />
            <span className="text-muted small d-block mb-3">Tu foto aquí</span>
            <div>
              <h2 className="text-warning mb-1">Pedro Trujillo Lucena</h2>
              <p>Málaga, España</p>
              <p>
                📞 <a href="https://wa.me/34675034328" className="text-warning text-decoration-none" target="_blank" rel="noopener noreferrer">+34 675 034 328</a>
              </p>
              <p>
                ✉️ <a href="mailto:pedrotl3379@gmail.com" className="text-warning text-decoration-none">pedrotl3379@gmail.com</a>
              </p>
              <p>
                🔗 <a href="https://linkedin.com/in/pedrotrujillolucena" target="_blank" rel="noopener noreferrer" className="text-warning">LinkedIn</a>
              </p>
            </div>
          </div>
        </div>
      </div>

    

      {/* CONTENIDO */}
      <section className="container my-4">
        <div style={paragraph}>
          <h3 className="text-warning mt-4">Bases de Datos</h3>
          <p>
            Experiencia sólida en el diseño, modelado y mantenimiento de bases de datos relacionales con MySQL y MariaDB...
          </p>

          <h3 className="text-warning mt-4">Desarrollo Full-Stack</h3>
          <p>
            Experiencia integral en desarrollo web tanto del lado del cliente como del servidor utilizando React, JavaScript, PHP...
          </p>

          <h3 className="text-warning mt-4">Automatización de Procesos y RPA</h3>
          <p>
            Experiencia avanzada en la automatización de tareas repetitivas y flujos empresariales utilizando UiPath, VBA y BPMN...
          </p>

          <h3 className="text-warning mt-4">Inteligencia Artificial y Machine Learning</h3>
          <p>
            Implementación práctica de soluciones de IA aplicando modelos generativos como GPT (ChatGPT), TensorFlow, PyTorch...
          </p>

          <h3 className="text-warning mt-4">Lenguajes de Programación</h3>
          <p>
            <strong>JavaScript:</strong> Desarrollo frontend y backend...<br />
            <strong>C++:</strong> Aplicaciones de alto rendimiento...<br />
            <strong>PHP:</strong> Sistemas de gestión personalizados...
          </p>

          <h3 className="text-warning mt-4">Herramientas de Productividad</h3>
          <p>
            Dominio avanzado de Excel, VBA, dashboards automatizados para compras, finanzas y RRHH...
          </p>

          <h3 className="text-warning mt-4">Control de Versiones</h3>
          <p>
            Gestión eficaz con GitHub, ramas, PRs, integración continua con GitHub Actions y GitLab CI...
          </p>
        </div>
      </section>

      <section className="container my-4">
        <h2 className="text-warning fs-4 mb-3">Idiomas</h2>
        <ul className="list-unstyled" style={list}>
          <li>Español: Nativo</li>
          <li>Inglés: Nivel B2</li>
        </ul>
      </section>

      <section className="container my-4">
        <h3 className="text-warning mt-4">Implementación de Modelos de IA Generativa</h3>
        <ul className="list-unstyled" style={list}>
          <li>Diseño e implementación con OpenAI GPT, DALL·E y MidJourney.</li>
          <li>Asistentes virtuales para soporte técnico y automatización interna.</li>
          <li>Contenido personalizado para campañas de marketing.</li>
          <li>Integración API con validación y post-procesamiento.</li>
          <li>Reducción de más del 50% en tiempos de entrega creativa.</li>
        </ul>

        <h3 className="text-warning mt-4">Automatización Inteligente de Procesos</h3>
        <ul className="list-unstyled" style={list}>
          <li>Automatización con UiPath, VBA, Bizagi y Microsoft Office.</li>
          <li>Bots RPA para reportes, datos y documentos.</li>
          <li>BPMN aplicado a compras, contabilidad y RRHH.</li>
          <li>Integración con ERP/CRM y generación de informes.</li>
          <li>Resultados: 40-70% menos carga operativa manual.</li>
        </ul>

        <h3 className="text-warning mt-4">Análisis Predictivo y Data Science</h3>
        <ul className="list-unstyled" style={list}>
          <li>Modelos predictivos con TensorFlow, scikit-learn y PyTorch.</li>
          <li>Predicción de comportamiento del cliente y oportunidades.</li>
          <li>Procesamiento de datos y visualización con Power BI.</li>
          <li>Regresión, clasificación, clustering, árboles de decisión.</li>
          <li>Resultados: decisiones estratégicas basadas en datos.</li>
        </ul>
      </section>

      <footer className="text-end text-muted small py-4 px-3">
        ©2024 pedrotrujillo.dev
      </footer>
    </div>
  );
};

const paragraph = {
  lineHeight: '1.8rem',
  fontSize: '1rem',
  color: '#ccc',
};

const list = {
  lineHeight: '1.8rem',
  color: '#ccc',
};

export default Home;
