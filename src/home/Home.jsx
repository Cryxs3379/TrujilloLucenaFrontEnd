import React from 'react';
import WordFormationAnimation from './WordFormationAnimation';
import WordFormationAnimation2 from './WordFormationAnimation2';
const Home = () => {
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#111',
        color: '#ddd',
        fontFamily: `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`,
      }}
    >
      {/* SECCIÓN PRINCIPAL */}
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '2rem',
          minHeight: 'auto',

          padding: '10px',
          marginBottom: '10px',
        }}
      >
        <div style={{ flex: 1, minWidth: '300px' }}>
          <h1 style={{ fontSize: '3rem', color: '#fff', marginBottom: '1.5rem' }}>
            Bienvenido<span style={{ color: '#f5d76e' }}>.</span>
          </h1>
          <p style={{ lineHeight: '1.6rem', fontSize: '1.1rem', marginBottom: '1.5rem', maxWidth: '600px' }}>
            Mi nombre es <strong>Pedro Trujillo</strong>, soy desarrollador Fullstack con base en España.
          </p>
          <p style={{ color: '#aaa', lineHeight: '1.6rem' }}>
          Profesional en Tecnologías de la Información con un Grado Superior en Administración de Sistemas Informáticos en Red y más de cuatro años de experiencia en el desarrollo de soluciones tecnológicas innovadoras. Especializado en inteligencia artificial, automatización de procesos y desarrollo full-stack, combino una sólida formación técnica con una visión estratégica enfocada en la optimización de recursos y la mejora de la toma de decisiones. Nivel avanzado de inglés (B2) y dominio de herramientas punteras del sector, aportando valor a través de proyectos escalables, eficientes y centrados en el usuario.
          </p>
        </div>

        <div style={{ flex: 1, minWidth: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div
            style={{
              width: '160px',
              height: '160px',
              borderRadius: '50%',
              backgroundColor: '#222',
              border: '2px solid #f5d76e',
              marginBottom: '1.5rem',
            }}
          />
          <span style={{ fontSize: '0.9rem', color: '#666' }}>Tu foto aquí</span>
          <div style={{ marginTop: '2rem', textAlign: 'center' }}>
            <h2 style={{ fontSize: '1.2rem', color: '#f5d76e', marginBottom: '0.5rem' }}>Pedro Trujillo Lucena</h2>
            <p>Málaga, España</p>
            <p>
  📞{' '}
  <a
    href="https://wa.me/34675034328"
    target="_blank"
    rel="noopener noreferrer"
    style={{ color: '#f5d76e', textDecoration: 'none' }}
  >
    +34 675 034 328
  </a>
</p>

<p>
  ✉️{' '}
  <a
    href="mailto:pedrotl3379@gmail.com"
    style={{ color: '#f5d76e', textDecoration: 'none' }}
  >
    pedrotl3379@gmail.com
  </a>
</p>

            <p>
              🔗 <a href="https://linkedin.com/in/pedrotrujillolucena" target="_blank" rel="noopener noreferrer" style={{ color: '#f5d76e' }}>LinkedIn</a>
            </p>
          </div>
        </div>
      </div>

      {/* ANIMACIÓN CON SEMÁNTICA */}
      <section aria-label="Animación de texto Mi Información Personal" style={{ margin: '10px 0' }}>
        <WordFormationAnimation />
      </section>

      {/* CONTENIDO */}

      <section style={{ marginTop: '10px', maxWidth: '900px', marginInline: 'auto' }}>
  <div style={paragraph}>
    <h3 style={{ color: '#f5d76e', marginTop: '1rem' }}>Bases de Datos</h3>
    <p>
      Experiencia sólida en el diseño, modelado y mantenimiento de bases de datos relacionales con MySQL y MariaDB,
      aplicando principios de normalización y optimización de consultas SQL en entornos de alto rendimiento.
      He trabajado en la creación de estructuras de datos escalables para sistemas web de gestión interna,
      desarrollando procedimientos almacenados, triggers y vistas que mejoran significativamente la integridad de los datos y el rendimiento de las aplicaciones.
      Capacidad para realizar auditorías de datos, migraciones entre servidores y tuning de consultas complejas.
    </p>

    <h3 style={{ color: '#f5d76e', marginTop: '1rem' }}>Desarrollo Full-Stack</h3>
    <p>
      Experiencia integral en desarrollo web tanto del lado del cliente como del servidor utilizando React, JavaScript, PHP, y el stack MERN (MongoDB, Express.js, React, Node.js).
      He liderado y colaborado en proyectos completos, desde el prototipado UI/UX hasta la implementación en producción.
      Destaco por crear interfaces reactivas y adaptables, consumo eficiente de APIs RESTful y GraphQL,
      y la implementación de prácticas como lazy loading, SSR y autenticación JWT.
      Trabajo orientado a componentes reutilizables, pruebas unitarias y despliegues en entornos como Heroku y Docker.
    </p>

    <h3 style={{ color: '#f5d76e', marginTop: '1rem' }}>Automatización de Procesos y RPA</h3>
    <p>
      Experiencia avanzada en la automatización de tareas repetitivas y flujos empresariales utilizando UiPath, VBA y modelado con BPMN.
      He desarrollado bots RPA para la extracción automática de datos desde múltiples fuentes (web, Excel, ERP),
      procesamiento masivo de archivos, validación de formularios y generación de reportes en tiempo real.
      Estas soluciones han reducido hasta un 60% el tiempo de tareas administrativas en proyectos internos.
      Familiaridad con el uso de OCR, validación de reglas de negocio y excepciones en procesos automatizados.
    </p>

    <h3 style={{ color: '#f5d76e', marginTop: '1rem' }}>Inteligencia Artificial y Machine Learning</h3>
    <p>
      Implementación práctica de soluciones de IA aplicando modelos generativos como GPT (ChatGPT) y herramientas como TensorFlow y PyTorch.
      He trabajado en la creación de asistentes virtuales personalizados, generación de contenidos automatizados para marketing,
      modelos de análisis predictivo para ventas y segmentación de clientes basada en clustering y regresión.
      Experiencia integrando APIs de IA en plataformas web, gestionando datos para entrenamiento y aplicando técnicas de NLP, computer vision y aprendizaje supervisado.
    </p>

    <h3 style={{ color: '#f5d76e', marginTop: '1rem' }}>Lenguajes de Programación</h3>
    <p>
      <strong>JavaScript:</strong> Desarrollo frontend y backend, integración con librerías modernas, desarrollo de lógica compleja en aplicaciones SPA. <br />
      <strong>C++:</strong> Aplicaciones de alto rendimiento y simulaciones en entornos académicos y de automatización. <br />
      <strong>PHP:</strong> Creación de portales web con sistemas de gestión personalizados y mantenimiento de sistemas legacy.
    </p>

    <h3 style={{ color: '#f5d76e', marginTop: '1rem' }}>Herramientas de Productividad</h3>
    <p>
      Dominio avanzado de herramientas ofimáticas, especialmente Excel, incluyendo el uso de macros, tablas dinámicas, formularios automatizados y VBA para automatización.
      Desarrollo de dashboards interactivos y sistemas de seguimiento automatizado para áreas como compras, finanzas y RRHH.
      Competente en la creación de documentos y plantillas profesionales con Word, orientado a estándares de presentación ejecutiva.
    </p>

    <h3 style={{ color: '#f5d76e', marginTop: '1rem' }}>Control de Versiones</h3>
    <p>
      Gestión eficaz de versiones y colaboración en equipo utilizando GitHub.
      Amplia experiencia en ramas (branching), solicitudes de fusión (pull requests), resolución de conflictos y manejo de workflows CI/CD básicos.
      Participación activa en proyectos colaborativos, realizando revisiones de código y aplicando buenas prácticas de desarrollo ágil con herramientas de integración como GitHub Actions y GitLab CI.
    </p>
  </div>
</section>


      <section style={{ marginTop: '10px', maxWidth: '900px', marginInline: 'auto' }}>
        <h2 style={sectionTitle}>Idiomas</h2>
        <ul style={list}>
          <li>Español: Nativo</li>
          <li>Inglés: Nivel B2</li>
        </ul>
      </section>

      <section aria-label="Proyectos Destacados y Competencias" style={{ margin: '10px 0' }}>
        <WordFormationAnimation2 />
      </section>
      <section style={{ marginTop: '10px', maxWidth: '900px', marginInline: 'auto' }}>
  

  <h3 style={{ color: '#f5d76e', marginTop: '1.5rem' }}>Implementación de Modelos de IA Generativa</h3>
  <ul style={list}>
    <li>Diseño e implementación de soluciones empresariales basadas en modelos como OpenAI GPT, DALL·E y MidJourney.</li>
    <li>Desarrollo de asistentes virtuales con lenguaje natural para soporte técnico, atención al cliente y automatización interna.</li>
    <li>Generación de contenido visual/textual personalizado para campañas de marketing con prompts específicos.</li>
    <li>Integración de modelos en plataformas web mediante APIs REST, con validación y post-procesamiento en tiempo real.</li>
    <li>Colaboración con equipos creativos para reducir tiempos de entrega en más de un 50% mediante IA generativa.</li>
  </ul>

  <h3 style={{ color: '#f5d76e', marginTop: '1.5rem' }}>Automatización Inteligente de Procesos</h3>
  <ul style={list}>
    <li>Soluciones de automatización con UiPath, VBA, Bizagi y herramientas Microsoft Office.</li>
    <li>Desarrollo de bots RPA para generación de reportes, consolidación de datos y procesamiento de documentos.</li>
    <li>Modelado BPMN para optimizar flujos en compras, contabilidad y RRHH.</li>
    <li>Integración con ERP/CRM para seguimiento de tareas y generación de informes automatizados.</li>
    <li>Resultados: reducción del 40-70% en carga operativa manual, aumento de eficiencia y precisión.</li>
  </ul>

  <h3 style={{ color: '#f5d76e', marginTop: '1.5rem' }}>Análisis Predictivo y Data Science</h3>
  <ul style={list}>
    <li>Modelos predictivos con TensorFlow, scikit-learn y PyTorch aplicados a análisis de negocio.</li>
    <li>Predicción de comportamiento del cliente, rotación y oportunidades de venta cruzada.</li>
    <li>Pipeline de procesamiento de datos hasta visualización con Power BI y Excel dinámico.</li>
    <li>Algoritmos de regresión, clasificación, clustering y árboles de decisión aplicados a grandes volúmenes de datos.</li>
    <li>Resultados: decisiones estratégicas basadas en datos y personalización de servicios.</li>
  </ul>
</section>


      <footer
        style={{
          marginTop: '3rem',
          textAlign: 'right',
          fontSize: '0.9rem',
          color: '#666',
          padding: '1rem 2rem',
        }}
      >
        ©2024 pedrotrujillo.dev
      </footer>
    </div>
  );
};

const sectionTitle = {
  color: '#f5d76e',
  fontSize: '1.5rem',
  marginBottom: '1rem',
};

const paragraph = {
  lineHeight: '1.8rem',
  fontSize: '1rem',
  color: '#ccc',
};

const list = {
  listStyle: 'none',
  paddingLeft: 0,
  lineHeight: '1.8rem',
  color: '#ccc',
};

export default Home;
