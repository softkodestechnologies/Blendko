import React, { useRef, useEffect, forwardRef, useImperativeHandle, useState } from 'react';
import * as THREE from 'three';
import styles from './customize.module.css';

interface ThreeCanvasProps {
  productName: string;
  initialColor: string;
}

interface CanvasState {
  color: string;
  designTexture: THREE.Texture | null;
  designPosition: THREE.Vector2;
  zoom: number;
}

const ThreeCanvas = forwardRef(({ productName, initialColor }: ThreeCanvasProps, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);
  const [history, setHistory] = useState<CanvasState[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [zoom, setZoom] = useState(1);

  useImperativeHandle(ref, () => ({
    undo: () => {
      if (historyIndex > 0) {
        setHistoryIndex(historyIndex - 1);
        applyState(history[historyIndex - 1]);
      }
    },
    redo: () => {
      if (historyIndex < history.length - 1) {
        setHistoryIndex(historyIndex + 1);
        applyState(history[historyIndex + 1]);
      }
    },
    reset: () => {
      if (meshRef.current) {
        (meshRef.current.material as THREE.MeshBasicMaterial).color.setHex(parseInt(initialColor.replace('#', '0x'), 16));
        removeTextureFromMesh();
        setZoom(1);
        if (cameraRef.current) {
          updateCameraFrustum(cameraRef.current, 1);
        }
        saveState({ color: initialColor, designTexture: null, designPosition: new THREE.Vector2(0, 0), zoom: 1 });
      }
    },
    changeColor: (color: string) => {
      if (meshRef.current) {
        (meshRef.current.material as THREE.MeshBasicMaterial).color.setHex(parseInt(color.replace('#', '0x'), 16));
        saveState({ color, designTexture: getCurrentDesignTexture(), designPosition: getCurrentDesignPosition(), zoom });
      }
    },
    addImageToMesh: (file: File) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && e.target.result) {
          const texture = new THREE.TextureLoader().load(e.target.result as string);
          applyTextureToMesh(texture);
          saveState({ color: getCurrentColor(), designTexture: texture, designPosition: getCurrentDesignPosition(), zoom });
        }
      };
      reader.readAsDataURL(file);
    },
    zoomIn: () => {
      setZoom(prevZoom => {
        const newZoom = Math.min(prevZoom + 0.1, 2);
        if (cameraRef.current) {
          updateCameraFrustum(cameraRef.current, newZoom);
        }
        saveState({ color: getCurrentColor(), designTexture: getCurrentDesignTexture(), designPosition: getCurrentDesignPosition(), zoom: newZoom });
        return newZoom;
      });
    },
    zoomOut: () => {
      setZoom(prevZoom => {
        const newZoom = Math.max(prevZoom - 0.1, 0.5);
        if (cameraRef.current) {
          updateCameraFrustum(cameraRef.current, newZoom);
        }
        saveState({ color: getCurrentColor(), designTexture: getCurrentDesignTexture(), designPosition: getCurrentDesignPosition(), zoom: newZoom });
        return newZoom;
      });
    },
  }));

  const updateCameraFrustum = (camera: THREE.OrthographicCamera, newZoom: number) => {
    const aspect = window.innerWidth / window.innerHeight;
    const frustumSize = 2;
    camera.left = -frustumSize * aspect / 2 / newZoom;
    camera.right = frustumSize * aspect / 2 / newZoom;
    camera.top = frustumSize / 2 / newZoom;
    camera.bottom = -frustumSize / 2 / newZoom;
    camera.updateProjectionMatrix();
  };

  const applyState = (state: CanvasState) => {
    if (meshRef.current) {
      (meshRef.current.material as THREE.MeshBasicMaterial).color.setHex(parseInt(state.color.replace('#', '0x'), 16));
      if (state.designTexture) {
        applyTextureToMesh(state.designTexture, state.designPosition);
      } else {
        removeTextureFromMesh();
      }
      setZoom(state.zoom);
      if (cameraRef.current) {
        updateCameraFrustum(cameraRef.current, state.zoom);
      }
    }
  };

  const saveState = (state: CanvasState) => {
    setHistory(prevHistory => [...prevHistory.slice(0, historyIndex + 1), state]);
    setHistoryIndex(prevIndex => prevIndex + 1);
  };

  const getCurrentColor = (): string => {
    if (meshRef.current) {
      return '#' + (meshRef.current.material as THREE.MeshBasicMaterial).color.getHexString();
    }
    return initialColor;
  };

  const getCurrentDesignTexture = (): THREE.Texture | null => {
    if (meshRef.current) {
      return (meshRef.current.material as THREE.MeshBasicMaterial).map;
    }
    return null;
  };

  const getCurrentDesignPosition = (): THREE.Vector2 => {
    if (meshRef.current && (meshRef.current.material as THREE.MeshBasicMaterial).map) {
      return ((meshRef.current.material as THREE.MeshBasicMaterial).map as THREE.Texture).offset.clone();
    }
    return new THREE.Vector2(0, 0);
  };

  const applyTextureToMesh = (texture: THREE.Texture, position: THREE.Vector2 = new THREE.Vector2(0, 0)) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.MeshBasicMaterial;
      material.map = texture;
      material.map.offset.copy(position);
      material.needsUpdate = true;
    }
  };

  const removeTextureFromMesh = () => {
    if (meshRef.current) {
      (meshRef.current.material as THREE.MeshBasicMaterial).map = null;
      (meshRef.current.material as THREE.MeshBasicMaterial).needsUpdate = true;
    }
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xF7F7F7);
    sceneRef.current = scene;

    const aspect = window.innerWidth / window.innerHeight;
    const frustumSize = 2;
    const camera = new THREE.OrthographicCamera(
      frustumSize * aspect / -2,
      frustumSize * aspect / 2,
      frustumSize / 2,
      frustumSize / -2,
      0.1,
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    rendererRef.current = renderer;

    const geometry = new THREE.PlaneGeometry(1.5, 2);
    const material = new THREE.MeshBasicMaterial({ color: initialColor });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    meshRef.current = mesh;

    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!canvasRef.current || !cameraRef.current) return;
      const width = canvasRef.current.clientWidth;
      const height = canvasRef.current.clientHeight;
      renderer.setSize(width, height);
      updateCameraFrustum(cameraRef.current, zoom);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    saveState({ color: initialColor, designTexture: null, designPosition: new THREE.Vector2(0, 0), zoom: 1 });

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, [initialColor, zoom]);

  return (
    <div className={styles.canvasContainer}>
      <canvas ref={canvasRef} className={styles.canvasElement} />
      <div className={styles.zoomControls}>
        <button onClick={() => (ref as any).current.zoomOut()}>-</button>
        <span>{Math.round(zoom * 100)}%</span>
        <button onClick={() => (ref as any).current.zoomIn()}>+</button>
      </div>
    </div>
  );
});

ThreeCanvas.displayName = 'ThreeCanvas';

export default ThreeCanvas;