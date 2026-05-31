import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Activity } from 'lucide-react';
import {
  RealtimePoseTest,
  BALANCE_TEST,
} from '../../../features/befastRealtime';
import { extractBalanceFrame } from '../../../features/befastRealtime/pose/poseFrameUtils';
import { analyzeBalanceMotion } from '../../../features/befastRealtime/engines/balanceMotionAnalyzer';
import { hybridAnalyze, analyzeBalanceOnServer } from '../../../features/befastRealtime/api/befastAiApi';
import BalanceResultsPanel from '../../../features/befastRealtime/components/results/BalanceResultsPanel';
import { saveBefastRealtimeResult } from '../../../store/slices/befastSlice';

const BalanceScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <RealtimePoseTest
      config={BALANCE_TEST}
      icon={Activity}
      extractFrame={extractBalanceFrame}
      analyzeFrames={(frames, min) =>
        hybridAnalyze(analyzeBalanceMotion, analyzeBalanceOnServer, frames, min)
      }
      getLiveMetrics={(frame) => ({
        label: `Thăng bằng ~${Math.round(100 - frame.shoulderTilt * 200)}%`,
      })}
      ResultsPanel={BalanceResultsPanel}
      onComplete={(result) => {
        dispatch(saveBefastRealtimeResult({ testKey: 'balance', result }));
        navigate('/befast/eyes');
      }}
    />
  );
};

export default BalanceScreen;
