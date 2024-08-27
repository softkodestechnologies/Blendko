import React, { useRef, useEffect, forwardRef, useImperativeHandle, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DecalGeometry } from 'three/examples/jsm/geometries/DecalGeometry';
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
  addImageOverlay: (file: File) => void;
  zoomIn: () => void;
  zoomOut: () => void;
  getCanvasSnapshot: () => Promise<string[]>;
  rotateLeft: () => void;
  rotateRight: () => void;
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
  const [currentRotation, setCurrentRotation] = useState(0);
  const [labels] = useState([
    { id: 1, text: 'Neckline', position: { x: 0, y: 0 } },
    { id: 2, text: 'Length', position: { x: 0, y: 0 } },
  ]);

  useImperativeHandle(ref, () => ({
    rotateLeft: () => rotateView('left'),
    rotateRight: () => rotateView('right'),
    getCanvasSnapshot,
    addImageOverlay,
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
        removeDecals();
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
        removeDecals();
      }
      setZoom(state.zoom);
      updateCameraZoom(state.zoom);
    }
  };

  const saveState = (state: CanvasState) => {
    setHistory(prevHistory => [...prevHistory.slice(0, historyIndex + 1), state]);
    setHistoryIndex(prevIndex => prevIndex + 1);
  };

  const getCanvasSnapshot = async (): Promise<string[]> => {
    if (!sceneRef.current || !cameraRef.current || !rendererRef.current || !modelRef.current) {
      return [];
    }

    const scene = sceneRef.current;
    const camera = cameraRef.current;
    const renderer = rendererRef.current;
    const model = modelRef.current;

    const originalRotation = model.rotation.y;
    const snapshots: string[] = [];

    for (let i = 0; i < 4; i++) {
      model.rotation.y = Math.PI * 0.5 * i;
      renderer.render(scene, camera);
      snapshots.push(renderer.domElement.toDataURL('image/png'));
    }

    model.rotation.y = originalRotation;
    renderer.render(scene, camera);

    return snapshots;
  };

  const rotateView = (direction: 'left' | 'right') => {
    setCurrentRotation((prev) => {
      const newRotation = direction === 'left' ? (prev - 1 + 4) % 4 : (prev + 1) % 4;
      if (modelRef.current) {
        modelRef.current.rotation.y = Math.PI * 0.5 * newRotation;
      }
      return newRotation;
    });
  };

  const addImageOverlay = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target && e.target.result) {
        const texture = new THREE.TextureLoader().load(e.target.result as string);
        applyPrintToModel(texture);
        saveState({ color: getCurrentColor(), designTexture: texture, designPosition: getCurrentDesignPosition(), zoom });
      }
    };
    reader.readAsDataURL(file);
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

  const removeDecals = () => {
    if (sceneRef.current) {
      const decalsToRemove = sceneRef.current.children.filter(child => child.userData.isDecal);
      decalsToRemove.forEach(decal => sceneRef.current?.remove(decal));
    }
  };

  const applyPrintToModel = (texture: THREE.Texture) => {
    if (modelRef.current && sceneRef.current) {
      const decalMaterial = new THREE.MeshPhongMaterial({
        map: texture,
        transparent: true,
        depthTest: true,
        depthWrite: false,
        polygonOffset: true,
        polygonOffsetFactor: -4,
      });

      let targetMesh: THREE.Mesh | null = null;
      modelRef.current.traverse((child) => {
        if (child instanceof THREE.Mesh && child.geometry) {
          targetMesh = child;
        }
      });

      if (targetMesh) {
        const position = new THREE.Vector3(0, 0, 0.01);
        const normal = new THREE.Vector3(0, 0, 1);
        const orientation = new THREE.Euler();
        const size = new THREE.Vector3(0.2, 0.2, 0.1);

        const decalGeometry = new DecalGeometry(targetMesh, position, orientation, size);
        const decalMesh = new THREE.Mesh(decalGeometry, decalMaterial);
        decalMesh.userData.isDecal = true;

        sceneRef.current.add(decalMesh);
      } else {
        console.error('No suitable mesh found for applying decal');
      }
    }
  };

  const getPointOnModel = (labelId: number): THREE.Vector3 => {
    if (!modelRef.current) {
      throw new Error('Model reference is not set');
    }

    let point3D = new THREE.Vector3();

    switch (labelId) {
      case 1: // Neckline
        point3D.set(0, 1.9, 0);
        break;
      case 2: // Length
        point3D.set(0, -1.9, 0);
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
        model.scale.set(3.5, 2.1, 3.5);
        model.position.set(0, 0, 0);
        scene.add(model);
        modelRef.current = model;

        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center);

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
        labels.forEach(label => {
          const point3D = getPointOnModel(label.id);
          const vector = point3D.project(camera);
          label.position.x = (vector.x * 0.5 + 0.5) * canvas.clientWidth;
          label.position.y = (vector.y * -0.5 + 0.5) * canvas.clientHeight;
        });
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
  }, [initialColor, labels]);

  useEffect(() => {
    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
    };

    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      if (e.dataTransfer && e.dataTransfer.files) {
        const file = e.dataTransfer.files[0];
        if (file.type.startsWith('image/')) {
          addImageOverlay(file);
        }
      }
    };

    const canvas = canvasRef.current;
    if (canvas) {
      canvas.addEventListener('dragover', handleDragOver);
      canvas.addEventListener('drop', handleDrop);
    }

    return () => {
      if (canvas) {
        canvas.removeEventListener('dragover', handleDragOver);
        canvas.removeEventListener('drop', handleDrop);
      }
    };
  }, []);

  return (
    <div className={styles.canvasContainer}>
      {loading && (
        <div className={styles.loadingOverlay}>
          <div className={styles.loadingSpinner}></div>
        </div>
      )}
      <canvas ref={canvasRef} className={styles.canvasElement} />
      <button className={styles.rotateButtonL} onClick={() => rotateView('left')}>←</button>
      <button className={styles.rotateButtonR} onClick={() => rotateView('right')}>→</button>
      {labels.map(label => (
        <ProductLabel key={label.id} text={label.text} position={label.position} />
      ))}
      <div className={styles.zoomControls}>
        <button onClick={() => {
          if (ref && 'current' in ref && ref.current) {
            ref.current.zoomOut();
          }
        }}>
          -
        </button>
        <span>{Math.round(zoom * 100)}%</span>
        <button onClick={() => {
          if (ref && 'current' in ref && ref.current) {
            ref.current.zoomIn();
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