import React, { Suspense, useRef, useCallback, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { useHistoryManager } from '@/utils/hooks/useHistoryManager';
import styles from './customize.module.css';


const SceneContainer = React.forwardRef(({ color, texture }: { color: string; texture: THREE.Texture | null }, ref) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { scene, gl: renderer, camera } = useThree();
  
  React.useImperativeHandle(ref, () => ({
    scene,
    renderer,
    camera,
    mesh: meshRef.current
  }));

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
    }
  });

  const material = React.useMemo(() => {
    const mat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(color || '#ffffff'),
      metalness: 0.0,
      roughness: 0.95,
      envMapIntensity: 0.2,
    });

    if (texture) {
      texture.colorSpace = THREE.SRGBColorSpace;
      mat.map = texture;
      mat.normalScale = new THREE.Vector2(0.5, 0.5);
      mat.needsUpdate = true;
    }

    return mat;
  }, [color, texture]);

  return (
    <>
      <ambientLight intensity={1.2} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} castShadow />
      <directionalLight position={[-5, -5, -5]} intensity={0.4} />
      <hemisphereLight intensity={0.3} groundColor={new THREE.Color(color).multiplyScalar(0.5)} />

      <mesh ref={meshRef} material={material} castShadow receiveShadow>
        <boxGeometry args={[2, 2, 2]} />
      </mesh>

      <ContactShadows
        position={[0, -2, 0]}
        opacity={0.4}
        scale={10}
        blur={3}
        far={4}
        resolution={256}
        color="#000000"
      />
    </>
  );
});

SceneContainer.displayName = 'SceneContainer';

const ThreeCanvas = React.forwardRef<any, { productName?: string; initialColor?: string }>(
  ({ productName, initialColor }, ref) => {
    const sceneRef = useRef<any>(null);
    const controlsRef = useRef<any>();
    const [loading, setLoading] = useState(false);

    const initialState = React.useMemo(() => ({
      color: initialColor || '#ffffff',
      texture: null,
      zoom: 5,
    }), [initialColor]);

    const {
      state,
      pushState,
      undo,
      redo,
      reset: resetHistory,
      canUndo,
      canRedo,
    } = useHistoryManager(initialState);

      const handleFileUpload = useCallback((file: File) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const textureLoader = new THREE.TextureLoader();
          textureLoader.load(e.target?.result as string, (newTexture) => {
            newTexture.wrapS = THREE.RepeatWrapping;
            newTexture.wrapT = THREE.RepeatWrapping;
            newTexture.repeat.set(1, 1);
            newTexture.anisotropy = 16;
            pushState({
              ...state,
              texture: e.target?.result as string,
            });
          });
        };
        reader.readAsDataURL(file);
      }, [state, pushState]);

      const handleZoom = useCallback((delta: number) => {
        if (controlsRef.current) {
          const newZoom = state.zoom + delta;
          if (newZoom >= 3 && newZoom <= 10) {
            pushState({
              ...state,
              zoom: newZoom,
            });
            controlsRef.current.object.position.setLength(newZoom);
            controlsRef.current.update();
          }
        }
      }, [state, pushState]);

      const handleReset = useCallback(() => {
        resetHistory(initialState);
        if (controlsRef.current) {
          controlsRef.current.reset();
        }
      }, [initialState, resetHistory]);


    React.useImperativeHandle(ref, () => ({
      changeColor: (newColor: string) => {
        pushState({
          ...state,
          color: newColor,
        });
      },
      addImageToMesh: handleFileUpload,
      reset: handleReset,
      undo,
      redo,
      canUndo,
      canRedo,
      zoomIn: () => handleZoom(-1),
      zoomOut: () => handleZoom(1),

      getSceneElements: () => ({
        scene: sceneRef.current?.scene,
        renderer: sceneRef.current?.renderer,
        camera: sceneRef.current?.camera,
      }),
    }));

    return (
      <div className={styles.canvasContainer}>
        {loading && (
          <div className={styles.loadingOverlay}>
            <div className={styles.loadingSpinner}></div>
          </div>
        )}

        <Canvas
          shadows
          camera={{ position: [0, 0, state.zoom], fov: 75 }}
          gl={{ preserveDrawingBuffer: true }}
          className={styles.canvasElement}
        >
          <Suspense fallback={null}>
            <SceneContainer
              ref={sceneRef}
              color={state.color}
              texture={state.texture ? new THREE.TextureLoader().load(state.texture) : null}
            />
            <OrbitControls
              ref={controlsRef}
              enableZoom={true}
              enablePan={true}
              minPolarAngle={Math.PI / 4}
              maxPolarAngle={Math.PI / 1.5}
              minDistance={3}
              maxDistance={10}
            />
            <Environment preset="studio" />
          </Suspense>
        </Canvas>

        <div className={styles.zoomControls}>
          <button className={styles.zoomButton} onClick={() => handleZoom(1)}>
            -
          </button>
          <span className={styles.zoomLevel}>{Math.round((10 - state.zoom) * 20)}%</span>
          <button className={styles.zoomButton} onClick={() => handleZoom(-1)}>
            +
          </button>
        </div>
      </div>
    );
  }
);

ThreeCanvas.displayName = 'ThreeCanvas';
  
export default ThreeCanvas;  