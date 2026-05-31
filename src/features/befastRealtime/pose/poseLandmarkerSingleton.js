import { PoseLandmarker, FilesetResolver } from '@mediapipe/tasks-vision';

const WASM_CDN =
  'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm';
const MODEL_URL =
  'https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task';

let landmarkerPromise = null;

async function createLandmarker(delegate) {
  const vision = await FilesetResolver.forVisionTasks(WASM_CDN);
  return PoseLandmarker.createFromOptions(vision, {
    baseOptions: { modelAssetPath: MODEL_URL, delegate },
    runningMode: 'VIDEO',
    numPoses: 1,
    minPoseDetectionConfidence: 0.5,
    minPosePresenceConfidence: 0.5,
    minTrackingConfidence: 0.5,
  });
}

export function getPoseLandmarker() {
  if (!landmarkerPromise) {
    landmarkerPromise = (async () => {
      try {
        return await createLandmarker('GPU');
      } catch {
        return createLandmarker('CPU');
      }
    })();
  }
  return landmarkerPromise;
}
