import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { RealtimeSpeechTest } from '../../../features/befastRealtime';
import { saveBefastRealtimeResult } from '../../../store/slices/befastSlice';

const SpeechScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <RealtimeSpeechTest
      onComplete={(result) => {
        dispatch(saveBefastRealtimeResult({ testKey: 'speech', result }));
        navigate('/befast/result');
      }}
    />
  );
};

export default SpeechScreen;
