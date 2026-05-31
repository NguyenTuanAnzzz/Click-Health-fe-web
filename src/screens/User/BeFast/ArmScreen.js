import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { UserCircle2 } from 'lucide-react';
import {
  RealtimePoseTest,
  ARM_TEST,
} from '../../../features/befastRealtime';
import { extractArmFrame } from '../../../features/befastRealtime/pose/poseFrameUtils';
import { analyzeArmMotion } from '../../../features/befastRealtime/engines/armMotionAnalyzer';
import { hybridAnalyze, analyzeArmOnServer } from '../../../features/befastRealtime/api/befastAiApi';
import ArmResultsPanel from '../../../features/befastRealtime/components/results/ArmResultsPanel';
import { saveBefastRealtimeResult } from '../../../store/slices/befastSlice';

const ArmScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <RealtimePoseTest
      config={ARM_TEST}
      icon={UserCircle2}
      extractFrame={extractArmFrame}
      analyzeFrames={(frames, min) =>
        hybridAnalyze(analyzeArmMotion, analyzeArmOnServer, frames, min)
      }
      getLiveMetrics={(frame) => {
        const sym = 100 - Math.abs(frame.lWristY - frame.rWristY) * 200;
        return { label: `Cân đối ~${Math.round(Math.max(0, Math.min(100, sym)))}%` };
      }}
      ResultsPanel={ArmResultsPanel}
      onComplete={(result) => {
        dispatch(saveBefastRealtimeResult({ testKey: 'arm', result }));
        navigate('/befast/speech');
      }}
    />
  );
};

export default ArmScreen;
