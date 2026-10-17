'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface UniverseGradientProps {
  className?: string;
}

export const UniverseGradient: React.FC<UniverseGradientProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Инициализация Three.js сцены и камеры
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    // 2. Создание WebGLRenderer
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
    } catch (e) {
      console.error('WebGL initialization error in UniverseGradient:', e);
      return;
    }

    const getWidth = () => container.clientWidth || window.innerWidth || 800;
    const getHeight = () => container.clientHeight || window.innerHeight || 600;

    const width = getWidth();
    const height = getHeight();

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    const domElement = renderer.domElement;
    domElement.style.position = 'absolute';
    domElement.style.top = '0';
    domElement.style.left = '0';
    domElement.style.width = '100%';
    domElement.style.height = '100%';
    domElement.style.display = 'block';
    domElement.style.pointerEvents = 'none';

    container.appendChild(domElement);

    // 3. GLSL Шейдер Universe 06 (3D Fluid Mesh Perlin Noise)
    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position.xy, 0.0, 1.0);
      }
    `;

    const fragmentShader = `
      uniform float uTime;
      uniform vec2 uResolution;
      varying vec2 vUv;

      // Simplex / Perlin noise helpers
      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
      vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

      float snoise(vec3 v) {
        const vec2 C = vec2(1.0/6.0, 1.0/3.0);
        const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
        vec3 i  = floor(v + dot(v, C.yyy));
        vec3 x0 = v - i + dot(i, C.xxx);
        vec3 g = step(x0.yzx, x0.xyz);
        vec3 l = 1.0 - g;
        vec3 i1 = min(g.xyz, l.zxy);
        vec3 i2 = max(g.xyz, l.zxy);
        vec3 x1 = x0 - i1 + C.xxx;
        vec3 x2 = x0 - i2 + C.yyy;
        vec3 x3 = x0 - D.yyy;
        i = mod289(i);
        vec4 p = permute(permute(permute(
                  i.z + vec4(0.0, i1.z, i2.z, 1.0))
                + i.y + vec4(0.0, i1.y, i2.y, 1.0))
                + i.x + vec4(0.0, i1.x, i2.x, 1.0));
        float n_ = 0.142857142857;
        vec3  ns = n_ * D.wyz - D.xzx;
        vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
        vec4 x_ = floor(j * ns.z);
        vec4 y_ = floor(j - 7.0 * x_);
        vec4 x = x_ *ns.x + ns.yyyy;
        vec4 y = y_ *ns.x + ns.yyyy;
        vec4 h = 1.0 - abs(x) - abs(y);
        vec4 b0 = vec4(x.xy, y.xy);
        vec4 b1 = vec4(x.zw, y.zw);
        vec4 s0 = floor(b0)*2.0 + 1.0;
        vec4 s1 = floor(b1)*2.0 + 1.0;
        vec4 sh = -step(h, vec4(0.0));
        vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
        vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
        vec3 p0 = vec3(a0.xy, h.x);
        vec3 p1 = vec3(a0.zw, h.y);
        vec3 p2 = vec3(a1.xy, h.z);
        vec3 p3 = vec3(a1.zw, h.w);
        vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
        p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
        vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
        m = m * m;
        return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
      }

      void main() {
        vec2 uv = vUv;
        float t = uTime * 0.15;

        // Палитра ShaderGradient 06 Universe
        vec3 cDeepSpace = vec3(0.012, 0.0, 0.078);     // #030014
        vec3 cUltramarine = vec3(0.117, 0.105, 0.294); // #1e1b4b
        vec3 cNeonIndigo = vec3(0.262, 0.219, 0.792);  // #4338ca
        vec3 cMagenta = vec3(0.85, 0.274, 0.937);      // #d946ef
        vec3 cCyan = vec3(0.023, 0.713, 0.831);        // #06b6d4

        // 3D-шум перетекания волн
        float n1 = snoise(vec3(uv * 1.8, t));
        float n2 = snoise(vec3(uv * 2.2 + vec2(n1 * 0.5), t * 1.2));
        float n3 = snoise(vec3(uv * 3.0 - vec2(n2 * 0.4), t * 0.8));

        // Смешивание градиентных слоев
        vec3 col = mix(cDeepSpace, cUltramarine, smoothstep(-0.6, 0.4, n1));
        col = mix(col, cNeonIndigo, smoothstep(-0.2, 0.7, n2));
        col = mix(col, cMagenta, smoothstep(0.3, 0.95, n3 * n1));
        col = mix(col, cCyan, smoothstep(0.6, 1.0, n2 * 0.8));

        gl_FragColor = vec4(col, 1.0);
      }
    `;

    const uniforms = {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(width, height) },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      depthWrite: false,
      depthTest: false,
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // 4. Полнокадровый цикл анимации WebGL
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      uniforms.uTime.value = clock.getElapsedTime();
      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animate();

    // 5. Обработка ресайза окна и контейнера
    const handleResize = () => {
      if (!container || !renderer) return;
      const w = getWidth();
      const h = getHeight();
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      uniforms.uResolution.value.set(w, h);
    };

    window.addEventListener('resize', handleResize);

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        handleResize();
      });
      resizeObserver.observe(container);
    }

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (container.contains(domElement)) {
        container.removeChild(domElement);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`overflow-hidden pointer-events-none select-none ${className}`}
    />
  );
};
