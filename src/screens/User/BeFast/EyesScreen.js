import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { RealtimeEyesTest } from '../../../features/befastRealtime';
import { saveEyesResult } from '../../../store/slices/befastSlice';

const EyesScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleComplete = useCallback(
    (result) => {
      // Save result to Redux
      dispatch(
        saveEyesResult({
          label: result.label,
          level: result.level,
          score_percentage: result.score_percentage,
          correct_count: result.correct_count,
          total_count: result.total_count,
          risk_level: result.risk_level,
          should_see_doctor: result.should_see_doctor,
          message: result.message,
        })
      );

      // Navigate to next test
      navigate('/befast/face');
    },
    [dispatch, navigate]
  );

  return <RealtimeEyesTest onComplete={handleComplete} />;
};

export default EyesScreen;
