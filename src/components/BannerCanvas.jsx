import { useEffect, useRef } from "react";

export function BannerCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId;
    let width = (canvas.width = canvas.offsetWidth * window.devicePixelRatio);
    let height = (canvas.height = canvas.offsetHeight * window.devicePixelRatio);
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    let mouseX = -1000;
    let mouseY = -1000;
    let time = 0;

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      height = canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const onMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    window.addEventListener("resize", onResize);
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);

    const render = () => {
      time += 0.015;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      const isDark = document.documentElement.classList.contains("dark");
      const baseAlpha = isDark ? 0.35 : 0.25;
      const lineColor = isDark ? "255, 255, 255" : "0, 0, 0";

      // Draw subtle undulating wave lines
      const lines = 7;
      for (let i = 0; i < lines; i++) {
        ctx.beginPath();
        const yOffset = (h / (lines + 1)) * (i + 1);
        ctx.strokeStyle = `rgba(${lineColor}, ${baseAlpha * (0.3 + (i / lines) * 0.7)})`;
        ctx.lineWidth = 1;

        for (let x = 0; x <= w; x += 4) {
          const distToMouse = Math.hypot(x - mouseX, yOffset - mouseY);
          const mouseInfluence = Math.max(0, 1 - distToMouse / 120) * 16;

          const y =
            yOffset +
            Math.sin(x * 0.012 + time + i * 0.5) * (6 + i * 2) +
            Math.cos(x * 0.02 - time * 0.8) * 4 -
            mouseInfluence;

          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", onResize);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="relative mb-10 h-32 sm:h-44 w-full overflow-hidden rounded-xl border border-black/[0.06] dark:border-white/[0.06] bg-black/[0.01] dark:bg-white/[0.01]"
    >
      <canvas
        ref={canvasRef}
        className="h-full w-full cursor-crosshair"
      />
      {/* Subtle fade overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--background)] via-transparent to-transparent opacity-80" />
    </div>
  );
}
