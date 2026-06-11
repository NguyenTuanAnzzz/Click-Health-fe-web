import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';

import LoginScreen from '../screens/Auth/LoginScreen';
import RegisterScreen from '../screens/Auth/RegisterScreen';
import VerifyEmailScreen from '../screens/Auth/VerifyEmailScreen';
import ForgotPasswordScreen from '../screens/Auth/ForgotPasswordScreen';
import ResetPasswordScreen from '../screens/Auth/ResetPasswordScreen';
import HomeScreen from '../screens/User/Home/HomeScreen';
import ProfileScreen from '../screens/User/Profile/ProfileScreen';
import HistoryScreen from '../screens/User/Profile/HistoryScreen';
import PaymentResultScreen from '../screens/User/Profile/PaymentResultScreen';
import RecoveryExerciseScreen from '../screens/User/Features/RecoveryExerciseScreen';
import StrokeRiskScreen from '../screens/User/Features/StrokeRiskScreen';
import KnowledgeScreen from '../screens/User/Features/KnowledgeScreen';
import LandingScreen from '../screens/Public/LandingScreen';
import MRIScreen from '../screens/User/Features/MRIScreen';

import BefastLayout from '../layouts/BefastLayout';
import BalanceScreen from '../screens/User/BeFast/BalanceScreen';
import EyesScreen from '../screens/User/BeFast/EyesScreen';
import FaceScreen from '../screens/User/BeFast/FaceScreen';
import ArmScreen from '../screens/User/BeFast/ArmScreen';
import SpeechScreen from '../screens/User/BeFast/SpeechScreen';
import ResultScreen from '../screens/User/BeFast/ResultScreen';

const AppRouter = () => {
  return (
    <Routes>
      {/* Auth Routes (Public Routes - Only accessible when NOT logged in) */}
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/verify-email" element={<VerifyEmailScreen />} />
        <Route path="/forgot-password" element={<ForgotPasswordScreen />} />
        <Route path="/reset-password" element={<ResetPasswordScreen />} />
        <Route path="/" element={<LandingScreen />} />
      </Route>

      {/* Main Routes (Private Routes - Only accessible when logged in) */}
      <Route element={<PrivateRoute />}>
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/history" element={<HistoryScreen />} />
        <Route path="/payment-result" element={<PaymentResultScreen />} />
        <Route path="/recovery-exercise" element={<RecoveryExerciseScreen />} />
        <Route path="/knowledge" element={<KnowledgeScreen />} />
        <Route path="/stroke-risk-score" element={<StrokeRiskScreen />} />
        <Route path="/mri" element={<MRIScreen />} />
        
        {/* BEFAST AI Check Flow */}
        <Route path="/befast" element={<BefastLayout />}>
          <Route index element={<Navigate to="/befast/balance" replace />} />
          <Route path="balance" element={<BalanceScreen />} />
          <Route path="eyes" element={<EyesScreen />} />
          <Route path="face" element={<FaceScreen />} />
          <Route path="arm" element={<ArmScreen />} />
          <Route path="speech" element={<SpeechScreen />} />
          <Route path="result" element={<ResultScreen />} />
        </Route>
      </Route>
      
      {/* Fallback Route */}
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
};

export default AppRouter;
