import React, { useRef, useEffect, forwardRef, useImperativeHandle, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import styles from './customize.module.css';
import ProductLabel from './ProductLabel';

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

interface ThreeCanvasRef {
  undo: () => void;
  redo: () => void;
  reset: () => void;
  changeColor: (color: string) => void;
  addImageToMesh: (file: File) => void;
  zoomIn: () => void;
  zoomOut: () => void;
}

const ThreeCanvas = forwardRef<ThreeCanvasRef, ThreeCanvasProps>(({ productName, initialColor }, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const modelRef = useRef<THREE.Group | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const [history, setHistory] = useState<CanvasState[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [zoom, setZoom] = useState(1);
  const [loading, setLoading] = useState(true);
  const [labels, setLabels] = useState([
    { id: 1, text: 'Neckline', position: { x: 0, y: 0 } },
    { id: 2, text: 'Sleeve', position: { x: 0, y: 0 } },
  ]);

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
      if (modelRef.current) {
        applyColorToModel(initialColor);
        removeTextureFromModel();
        setZoom(1);
        if (cameraRef.current) {
          cameraRef.current.position.set(0, 0, 3);
        }
        saveState({ color: initialColor, designTexture: null, designPosition: new THREE.Vector2(0, 0), zoom: 1 });
      }
    },
    changeColor: (color: string) => {
      if (modelRef.current) {
        applyColorToModel(color);
        saveState({ color, designTexture: getCurrentDesignTexture(), designPosition: getCurrentDesignPosition(), zoom });
      }
    },
    addImageToMesh: (file: File) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && e.target.result) {
          const texture = new THREE.TextureLoader().load(e.target.result as string);
          applyTextureToModel(texture);
          saveState({ color: getCurrentColor(), designTexture: texture, designPosition: getCurrentDesignPosition(), zoom });
        }
      };
      reader.readAsDataURL(file);
    },
    zoomIn: () => {
      setZoom(prevZoom => {
        const newZoom = Math.min(prevZoom + 0.1, 2);
        updateCameraZoom(newZoom);
        saveState({ color: getCurrentColor(), designTexture: getCurrentDesignTexture(), designPosition: getCurrentDesignPosition(), zoom: newZoom });
        return newZoom;
      });
    },
    zoomOut: () => {
      setZoom(prevZoom => {
        const newZoom = Math.max(prevZoom - 0.1, 0.5);
        updateCameraZoom(newZoom);
        saveState({ color: getCurrentColor(), designTexture: getCurrentDesignTexture(), designPosition: getCurrentDesignPosition(), zoom: newZoom });
        return newZoom;
      });
    },
  }));

  const updateCameraZoom = (newZoom: number) => {
    if (cameraRef.current) {
      cameraRef.current.position.z = 3 / newZoom;
      cameraRef.current.updateProjectionMatrix();
    }
  };

  const applyState = (state: CanvasState) => {
    if (modelRef.current) {
      applyColorToModel(state.color);
      if (state.designTexture) {
        applyTextureToModel(state.designTexture, state.designPosition);
      } else {
        removeTextureFromModel();
      }
      setZoom(state.zoom);
      updateCameraZoom(state.zoom);
    }
  };

  const saveState = (state: CanvasState) => {
    setHistory(prevHistory => [...prevHistory.slice(0, historyIndex + 1), state]);
    setHistoryIndex(prevIndex => prevIndex + 1);
  };

  const getCurrentColor = (): string => {
    if (modelRef.current) {
      let color = initialColor;
      modelRef.current.traverse((child) => {
        if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
          color = '#' + child.material.color.getHexString();
          return;
        }
      });
      return color;
    }
    return initialColor;
  };

  const getCurrentDesignTexture = (): THREE.Texture | null => {
    if (modelRef.current) {
      let texture: THREE.Texture | null = null;
      modelRef.current.traverse((child) => {
        if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
          texture = child.material.map;
          return;
        }
      });
      return texture;
    }
    return null;
  };

  const getCurrentDesignPosition = (): THREE.Vector2 => {
    if (modelRef.current) {
      let position = new THREE.Vector2(0, 0);
      modelRef.current.traverse((child) => {
        if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
          if (child.material.map) {
            position = child.material.map.offset.clone();
          }
          return;
        }
      });
      return position;
    }
    return new THREE.Vector2(0, 0);
  };

  const applyColorToModel = (color: string) => {
    if (modelRef.current) {
      modelRef.current.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          (child.material as THREE.MeshStandardMaterial).color.setStyle(color);
        }
      });
    }
  };

  const applyTextureToModel = (texture: THREE.Texture, position: THREE.Vector2 = new THREE.Vector2(0, 0)) => {
    if (modelRef.current) {
      modelRef.current.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          const material = child.material as THREE.MeshStandardMaterial;
          material.map = texture;
          material.map.offset.copy(position);
          material.map.repeat.set(0.5, 0.5); 
          material.needsUpdate = true;
        }
      });
    }
  };

  const removeTextureFromModel = () => {
    if (modelRef.current) {
      modelRef.current.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          const material = child.material as THREE.MeshStandardMaterial;
          material.map = null;
          material.needsUpdate = true;
        }
      });
    }
  };

  // Function to get a point on the model based on a label ID
const getPointOnModel = (labelId: number): THREE.Vector3 => {
  if (!modelRef.current) {
    throw new Error('Model reference is not set');
  }

  let point3D = new THREE.Vector3();


  switch (labelId) {
    //These coordinates should be updating as he 3d canvas pans through
    case 1: // Neckline
      point3D.set(0, 1.9, 0); 
      break;
    case 2: // Sleeve
      point3D.set(-0.35, 1.9, 0); 
      break;
    default:
      point3D.set(0, 0, 0); 
  }

  modelRef.current.localToWorld(point3D);

  return point3D;
};


  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xF7F7F7);
    sceneRef.current = scene;

    const aspect = window.innerWidth / window.innerHeight;
    const camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
    camera.position.set(0, 0, 3);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    rendererRef.current = renderer;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;
    controls.minDistance = 1.5;
    controls.maxDistance = 4;
    controls.minPolarAngle = Math.PI / 4;
    controls.maxPolarAngle = Math.PI / 1.75;
    controls.enablePan = false;
    controlsRef.current = controls;

    const loader = new GLTFLoader();
    loader.load(
      '/models/tshirt/T_shirt_gltf.zip.gltf',
      (gltf) => {
        const model = gltf.scene;
        model.scale.set(2.5, 1.5, 2.5);
        model.position.set(0, -1.5, 0);
        scene.add(model);
        modelRef.current = model;

        applyColorToModel(initialColor);
        saveState({ color: initialColor, designTexture: null, designPosition: new THREE.Vector2(0, 0), zoom: 1 });

        setLoading(false);
      },
      (progress) => {
        console.log(`Loading model: ${progress.loaded / progress.total * 100}%`);
      },
      (error) => {
        console.error('An error occurred while loading the model:', error);
        setLoading(false);
      }
    );

    const updateLabelPositions = () => {
      if (modelRef.current && cameraRef.current && canvasRef.current) {
        const canvas = canvasRef.current;
        const camera = cameraRef.current;
        const newLabels = labels.map(label => {
          const point3D = getPointOnModel(label.id);
          const vector = point3D.project(camera);
          const x = (vector.x * 0.5 + 0.5) * canvas.clientWidth;
          const y = (vector.y * -0.5 + 0.5) * canvas.clientHeight;
          return { ...label, position: { x, y } };
        });
        setLabels(newLabels);
      }
    };
    
    

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      updateLabelPositions();
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (canvasRef.current) {
        const width = canvasRef.current.clientWidth;
        const height = canvasRef.current.clientHeight;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, [initialColor]);

  return (
    <div className={styles.canvasContainer}>
      {loading && (
        <div className={styles.loadingOverlay}>
          <div className={styles.loadingSpinner}></div>
        </div>
      )}
      <canvas ref={canvasRef} className={styles.canvasElement} />
      {labels.map(label => (
      <ProductLabel key={label.id} text={label.text} position={label.position} />
    ))}
      <div className={styles.zoomControls}>
          <button onClick={() => {
                if (ref && 'current' in ref) {
                  ref.current?.zoomOut();
                }
              }}>
                -
          </button>
          <span>{Math.round(zoom * 100)}%</span>
          <button onClick={() => {
            if (ref && 'current' in ref) {
              ref.current?.zoomIn();
            }
          }}>
            +
          </button>
      </div>
    </div>
  );
});

ThreeCanvas.displayName = 'ThreeCanvas';

export default ThreeCanvas;

