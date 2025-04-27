import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const WordFormationAnimation2 = () => {
  const canvasRef = useRef(null);
  const textCanvasRef = useRef(null);
  const particles = useRef([]);
  const coords = useRef([]);
  const width = useRef(window.innerWidth);
  const height = 200;

  const createParticles = () => {
    const canvas = canvasRef.current;
    const textCanvas = textCanvasRef.current;

    width.current = window.innerWidth;

    canvas.width = width.current;
    canvas.height = height;
    textCanvas.width = width.current;
    textCanvas.height = height;

    const ctx = canvas.getContext('2d');
    const textCtx = textCanvas.getContext('2d', { willReadFrequently: true });

    textCtx.clearRect(0, 0, width.current, height);
    textCtx.fillStyle = '#fff';
    textCtx.font = 'bold 60px Segoe UI';
    textCtx.textAlign = 'center';
    textCtx.textBaseline = 'middle';

    // ✅ Frase completa centrada
    const phrase = 'Proyectos Destacados y Competencias';
    textCtx.fillText(phrase, width.current / 2, height / 2);

    const imageData = textCtx.getImageData(0, 0, width.current, height).data;
    const gap = 3;
    coords.current = [];

    for (let y = 0; y < height; y += gap) {
      for (let x = 0; x < width.current; x += gap) {
        const i = (y * width.current + x) * 4;
        if (imageData[i + 3] > 128) {
          coords.current.push({ x, y });
        }
      }
    }

    particles.current = coords.current.map(({ x, y }) => ({
      x: (Math.random() - 0.5) * width.current,
      y: (Math.random() - 0.5) * height,
      tx: x,
      ty: y,
      visible: false,
    }));
  };

  const animateIn = () => {
    particles.current.forEach((p) => {
      p.visible = true;
      gsap.to(p, {
        x: p.tx - width.current / 2,
        y: p.ty - height / 2,
        duration: 1.5,
        delay: Math.random() * 0.5,
        ease: 'power3.out',
      });
    });
  };

  const animateOut = () => {
    particles.current.forEach((p) => {
      gsap.to(p, {
        x: (Math.random() - 0.5) * width.current,
        y: (Math.random() - 0.5) * height,
        duration: 1,
        ease: 'power1.inOut',
      });
    });
  };

  const draw = () => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, width.current, height);
    ctx.save();
    ctx.translate(width.current / 2, height / 2);
    particles.current.forEach((p) => {
      if (p.visible) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = '#f5d76e';
        ctx.fill();
      }
    });
    ctx.restore();
    requestAnimationFrame(draw);
  };

  useEffect(() => {
    createParticles();
    animateIn();
    draw();

    const handleResize = () => {
      createParticles();
      animateIn();
    };

    window.addEventListener('resize', handleResize);

    const canvasEl = canvasRef.current;
    canvasEl.addEventListener('mouseenter', animateOut);
    canvasEl.addEventListener('mouseleave', animateIn);

    return () => {
      window.removeEventListener('resize', handleResize);
      canvasEl.removeEventListener('mouseenter', animateOut);
      canvasEl.removeEventListener('mouseleave', animateIn);
    };
  }, []);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: `${height}px`,
        margin: '10px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <canvas ref={canvasRef} style={{ width: '100%' }} />
      <canvas ref={textCanvasRef} style={{ display: 'none' }} />
    </div>
  );
};

export default WordFormationAnimation2;
