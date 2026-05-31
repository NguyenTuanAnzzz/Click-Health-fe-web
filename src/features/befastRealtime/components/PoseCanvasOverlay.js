import { useEffect, useRef } from 'react';
import { POSE_LANDMARK } from '../constants';

const CONNECTIONS = [
  [POSE_LANDMARK.LEFT_SHOULDER, POSE_LANDMARK.RIGHT_SHOULDER],
  [POSE_LANDMARK.LEFT_SHOULDER, POSE_LANDMARK.LEFT_ELBOW],
  [POSE_LANDMARK.LEFT_ELBOW, POSE_LANDMARK.LEFT_WRIST],
  [POSE_LANDMARK.RIGHT_SHOULDER, POSE_LANDMARK.RIGHT_ELBOW],
  [POSE_LANDMARK.RIGHT_ELBOW, POSE_LANDMARK.RIGHT_WRIST],
  [POSE_LANDMARK.LEFT_SHOULDER, POSE_LANDMARK.LEFT_HIP],
  [POSE_LANDMARK.RIGHT_SHOULDER, POSE_LANDMARK.RIGHT_HIP],
];

export default function PoseCanvasOverlay({ landmarks, width, height, mirrored = true, highlightArms }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !width || !height) return;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, width, height);
    if (!landmarks?.length) return;

    const tx = (x) => (mirrored ? (1 - x) * width : x * width);
    const ty = (y) => y * height;

    CONNECTIONS.forEach(([a, b]) => {
      const la = landmarks[a];
      const lb = landmarks[b];
      if (!la || !lb) return;
      const arm =
        highlightArms &&
        ([POSE_LANDMARK.LEFT_WRIST, POSE_LANDMARK.RIGHT_WRIST].includes(a) ||
          [POSE_LANDMARK.LEFT_WRIST, POSE_LANDMARK.RIGHT_WRIST].includes(b));
      ctx.strokeStyle = arm ? 'rgba(46,206,160,0.95)' : 'rgba(36,77,84,0.45)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(tx(la.x), ty(la.y));
      ctx.lineTo(tx(lb.x), ty(lb.y));
      ctx.stroke();
    });
  }, [landmarks, width, height, mirrored, highlightArms]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-10" aria-hidden />;
}
