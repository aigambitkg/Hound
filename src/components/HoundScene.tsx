import { useEffect, useRef, type RefObject } from 'react';
import * as THREE from 'three';
import { COLORS } from '../constants/theme';
import { ASSETS, assetUrl } from '../utils/assets';

interface HoundSceneProps {
  /**
   * Ref auf das scrollbare HTML-Overlay. Die Szene reagiert auf dessen
   * Scroll-Position, um sich durch den 3D-Raum zu bewegen.
   */
  scrollContainerRef: RefObject<HTMLDivElement>;
}

/**
 * Three.js 3D Hintergrund-Szene.
 *
 * Architektur:
 * - Mountet einen WebGL-Canvas in den eigenen Container-Div.
 * - Liest die Scroll-Position aus dem uebergebenen `scrollContainerRef`.
 * - Reagiert auf Mausbewegungen fuer Parallax-Effekt.
 * - Raeumt beim Unmount alle Listener + WebGL-Resources sauber auf.
 */
export default function HoundScene({ scrollContainerRef }: HoundSceneProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const scrollEl = scrollContainerRef.current;
    if (!container) return;

    // ---------- 1. Scene Setup ----------
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(COLORS.wineRed);
    scene.fog = new THREE.FogExp2(COLORS.wineRed, 0.03);

    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      150,
    );
    camera.position.set(0, 0, 5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    // ---------- 2. Lighting ----------
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(COLORS.gold, 3);
    dirLight.position.set(5, 10, 5);
    scene.add(dirLight);

    const pointLight1 = new THREE.PointLight(COLORS.gold, 8, 30);
    const pointLight2 = new THREE.PointLight(0xffffff, 5, 30);
    const pointLight3 = new THREE.PointLight('#ff8888', 5, 30);
    group.add(pointLight1);
    group.add(pointLight2);
    group.add(pointLight3);

    // ---------- 3. Asset Helpers ----------
    const textureLoader = new THREE.TextureLoader();

    const createImage = (
      url: string,
      pos: [number, number, number],
      scale: [number, number],
    ): THREE.Mesh => {
      const material = new THREE.MeshBasicMaterial({
        transparent: true,
        opacity: 1,
        depthWrite: false,
        side: THREE.DoubleSide,
      });
      textureLoader.load(url, (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        material.map = texture;
        material.needsUpdate = true;
      });
      const mesh = new THREE.Mesh(
        new THREE.PlaneGeometry(scale[0], scale[1]),
        material,
      );
      mesh.position.set(...pos);
      return mesh;
    };

    const createGlassSlab = (
      pos: [number, number, number],
      rot: [number, number, number],
      scale: [number, number],
    ): THREE.Mesh => {
      const material = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        transmission: 0.9,
        opacity: 1,
        metalness: 0.1,
        roughness: 0.1,
        ior: 1.5,
        thickness: 1.5,
        specularIntensity: 2,
        clearcoat: 1,
        clearcoatRoughness: 0.1,
        side: THREE.DoubleSide,
      });
      const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(scale[0], scale[1], 0.2),
        material,
      );
      mesh.position.set(...pos);
      mesh.rotation.set(...rot);
      return mesh;
    };

    // ---------- 4. Szenen-Objekte ----------
    // HERO Sektion (Z = -2)
    const logoMesh = createImage(assetUrl(ASSETS.logoTransparent), [0, 1.5, -2], [7, 3]);
    group.add(logoMesh);

    // SEKTION 1: Mandanten (Z = -15) -> Glas-Objekte rechts
    const slab1 = createGlassSlab([4, 0, -15], [0.1, -0.3, 0.1], [4, 5]);
    const slab2 = createGlassSlab([3, -1.5, -16], [0, -0.1, 0.2], [2.5, 3.5]);
    group.add(slab1);
    group.add(slab2);

    // SEKTION 2: Talente (Z = -30) -> Jo + Glas links
    const joMesh = createImage(assetUrl(ASSETS.jo), [-4, 0, -32], [5, 5]);
    const slab3 = createGlassSlab([-3.5, 0, -30], [0.1, 0.2, -0.1], [6, 6]);
    group.add(joMesh);
    group.add(slab3);

    // SEKTION 3: Call to Action (Z = -45)
    const endMesh = createImage(assetUrl(ASSETS.cta), [0, 1.5, -45], [7, 4]);
    group.add(endMesh);

    // ---------- 5. Partikel-Tunnel (Lebendige Faehrte) ----------
    const particleCount = 4000;
    const pointsGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const phases = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const z = Math.random() * 70 - 60;
      const radius = Math.random() * 6 + 1.5;
      const angle = Math.random() * Math.PI * 2;

      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = Math.sin(angle) * radius;
      positions[i * 3 + 2] = z;
      phases[i] = Math.random() * Math.PI * 2;
    }
    pointsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Runde Partikel-Textur via Canvas erzeugen
    const circleCanvas = document.createElement('canvas');
    circleCanvas.width = 64;
    circleCanvas.height = 64;
    const ctx = circleCanvas.getContext('2d');
    if (ctx) {
      ctx.beginPath();
      ctx.arc(32, 32, 28, 0, 2 * Math.PI);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
    }
    const circleTexture = new THREE.CanvasTexture(circleCanvas);

    const pointsMaterial = new THREE.PointsMaterial({
      size: 0.08,
      color: new THREE.Color(COLORS.gold),
      transparent: true,
      opacity: 0.35,
      map: circleTexture,
      alphaTest: 0.01,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const points = new THREE.Points(pointsGeometry, pointsMaterial);
    group.add(points);

    // ---------- 6. Interaction State ----------
    let targetZ = 0;
    let mouseX = 0;
    let mouseY = 0;
    let targetCameraX = 0;
    let targetCameraY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMouseMove);

    const onScroll = () => {
      if (!scrollEl) return;
      const { scrollTop, scrollHeight, clientHeight } = scrollEl;
      const denom = scrollHeight - clientHeight;
      const progress = denom > 0 ? scrollTop / denom : 0;
      targetZ = progress * 45;
    };
    scrollEl?.addEventListener('scroll', onScroll, { passive: true });

    // ---------- 7. Animation Loop ----------
    const clock = new THREE.Clock();
    const floatObjects: Array<{
      obj: THREE.Object3D;
      speed: number;
      offset: number;
    }> = [
      { obj: logoMesh, speed: 1.5, offset: 0 },
      { obj: slab1, speed: 1.0, offset: 1 },
      { obj: slab2, speed: 1.2, offset: 2 },
      { obj: joMesh, speed: 2.0, offset: 3 },
      { obj: slab3, speed: 1.5, offset: 4 },
      { obj: endMesh, speed: 1.0, offset: 5 },
    ];

    let animationFrameId = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Scroll-Bewegung: Szene fliegt auf Kamera zu
      group.position.z += (targetZ - group.position.z) * 0.08;

      // Maus-Parallax
      targetCameraX = mouseX * 2;
      targetCameraY = mouseY * 2;
      camera.position.x += (targetCameraX - camera.position.x) * 0.05;
      camera.position.y += (targetCameraY - camera.position.y) * 0.05;
      camera.lookAt(0, 0, -targetZ - 10);

      // Lichter dynamisch durch den Tunnel
      pointLight1.position.set(Math.sin(time) * 4, Math.cos(time) * 4, -group.position.z - 15);
      pointLight2.position.set(Math.cos(time * 0.8) * -5, Math.sin(time * 0.8) * 3, -group.position.z - 30);
      pointLight3.position.set(Math.sin(time * 1.2) * 3, Math.cos(time * 1.5) * -4, -group.position.z - 45);

      // Schwebende Bilder & Glas
      floatObjects.forEach(({ obj, speed, offset }) => {
        if (obj) {
          obj.position.y += Math.sin(time * speed + offset) * 0.002;
          obj.rotation.x += Math.cos(time * speed * 0.5 + offset) * 0.001;
          obj.rotation.y += Math.sin(time * speed * 0.5 + offset) * 0.001;
        }
      });

      // Partikel-Animation
      const posAttr = points.geometry.attributes.position as THREE.BufferAttribute;
      const arr = posAttr.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const z = arr[i3 + 2];
        const phase = phases[i];

        const waveX = Math.sin(time * 0.2 + z * 0.05 + phase) * 1.2;
        const waveY = Math.cos(time * 0.15 + z * 0.05 + phase) * 1.2;

        let mouseOffsetX = 0;
        let mouseOffsetY = 0;

        if (z > -group.position.z - 10 && z < -group.position.z + 10) {
          const dx = arr[i3] - camera.position.x;
          const dy = arr[i3 + 1] - camera.position.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 4) {
            mouseOffsetX = (dx / dist) * 0.8;
            mouseOffsetY = (dy / dist) * 0.8;
          }
        }

        const originalX = Math.cos(phase) * (Math.sin(z * 0.08) * 2 + 1);
        const originalY = Math.sin(phase) * (Math.cos(z * 0.08) * 2 + 1);

        arr[i3] += (originalX + waveX + mouseOffsetX - arr[i3]) * 0.015;
        arr[i3 + 1] += (originalY + waveY + mouseOffsetY - arr[i3 + 1]) * 0.015;
        arr[i3 + 2] += 0.02;

        // Endlos-Loop wenn Partikel hinter der Kamera
        if (arr[i3 + 2] > -group.position.z + 5) {
          arr[i3 + 2] = -group.position.z - 65;
        }
      }
      posAttr.needsUpdate = true;

      renderer.render(scene, camera);
    };
    animate();

    // ---------- 8. Resize ----------
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    // ---------- 9. Cleanup ----------
    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
      scrollEl?.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(animationFrameId);

      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }

      // WebGL Resources freigeben
      pointsGeometry.dispose();
      pointsMaterial.dispose();
      circleTexture.dispose();
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry?.dispose();
          const mat = obj.material;
          if (Array.isArray(mat)) {
            mat.forEach((m) => m.dispose());
          } else {
            mat?.dispose();
          }
        }
      });
      renderer.dispose();
    };
  }, [scrollContainerRef]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}
