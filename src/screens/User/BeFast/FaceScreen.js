import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { RealtimeFaceTest } from '../../../features/befastRealtime';
import { saveBefastRealtimeResult } from '../../../store/slices/befastSlice';

const FaceScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <RealtimeFaceTest
      onComplete={(result) => {
        dispatch(saveBefastRealtimeResult({ testKey: 'face', result }));
        navigate('/befast/arm');
      }}
    />
  );
};

export default FaceScreen;
