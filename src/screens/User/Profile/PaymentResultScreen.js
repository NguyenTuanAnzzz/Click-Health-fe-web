import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle, Home, ArrowRight, Loader2 } from 'lucide-react';
import axios from 'axios';
import UserLayout from '../../../layouts/UserLayout';
import API_URL from '../../../constants/apiConfig';

import { useDispatch } from 'react-redux';
import { getInfo } from '../../../store/slices/authSlice';

const PaymentResultScreen = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState(null); // 'success', 'fail', 'error'

    useEffect(() => {
        const verifyPayment = async () => {
            try {
                const token = localStorage.getItem('token') || sessionStorage.getItem('token');
                const response = await axios.get(`${API_URL}/payment/vnpay_return?${searchParams.toString()}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (response.data.code === '00') {
                    setStatus('success');
                    // Fetch fresh user info to update Redux state with VIP status
                    dispatch(getInfo());
                } else {
                    setStatus('fail');
                }
            } catch (err) {
                console.error("Payment verification failed:", err);
                setStatus('error');
            } finally {
                setLoading(false);
            }
        };

        verifyPayment();
    }, [searchParams]);

    return (
        <UserLayout noPaddingTop>
            <div className="min-h-[80vh] flex items-center justify-center px-4 bg-[#f0f1f2]/30">
                <div className="max-w-md w-full bg-white rounded-2xl border border-[#e5e7eb] p-10 text-center relative shadow-md overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#7AB5E9]/5 rounded-full -mr-16 -mt-16 blur-2xl pointer-events-none" />
                    
                    {loading ? (
                        <div className="space-y-6 py-6">
                            <div className="w-16 h-16 bg-[#7AB5E9]/10 rounded-full flex items-center justify-center mx-auto border border-[#7AB5E9]/25 shadow-2xs">
                                <Loader2 size={32} className="text-[#7AB5E9] animate-spin" />
                            </div>
                            <h2 className="text-2xl font-bold text-[#1F75C1] tracking-tight font-inter">Đang xác thực...</h2>
                            <p className="text-xs font-semibold text-[#858585] leading-relaxed">Vui lòng chờ trong giây lát trong khi chúng tôi xác nhận giao dịch của bạn qua cổng PayOS.</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {status === 'success' ? (
                                <>
                                    <div className="w-16 h-16 bg-[#7AB5E9]/15 rounded-full flex items-center justify-center mx-auto border border-[#7AB5E9]/30 shadow-2xs">
                                        <CheckCircle size={32} className="text-[#7AB5E9]" strokeWidth={2.5} />
                                    </div>
                                    <h2 className="text-2xl font-bold text-black tracking-tight font-inter">
                                        Thanh toán <span className="text-[#7AB5E9]">Thành công!</span>
                                    </h2>
                                    <p className="text-sm font-semibold text-[#858585] leading-relaxed">
                                        Chúc mừng! Tài khoản của bạn đã được nâng cấp thành công lên gói <span className="text-[#1F75C1] font-bold">Click VIP</span>. Bạn hiện có quyền sử dụng không giới hạn tất cả các tính năng tầm soát và chẩn đoán đột quỵ AI.
                                    </p>
                                </>
                            ) : (
                                <>
                                    <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto border border-red-200 shadow-2xs">
                                        <XCircle size={32} className="text-red-500" strokeWidth={2.5} />
                                    </div>
                                    <h2 className="text-2xl font-bold text-black tracking-tight font-inter">
                                        Giao dịch <span className="text-red-500">Thất bại</span>
                                    </h2>
                                    <p className="text-sm font-semibold text-[#858585] leading-relaxed">
                                        Rất tiếc, đã có lỗi xảy ra trong quá trình thanh toán hoặc giao dịch đã bị hủy bỏ bởi người dùng.
                                    </p>
                                </>
                            )}

                            <div className="pt-6 border-t border-[#e5e7eb] flex flex-col gap-3">
                                <button 
                                    onClick={() => navigate('/')}
                                    className="btn-activation-filled w-full py-3.5 flex items-center justify-center gap-2 text-sm font-semibold tracking-tight shadow-md hover:shadow-lg transition-all cursor-pointer"
                                >
                                    <Home size={16} /> Về trang chủ
                                </button>
                                <button 
                                    onClick={() => navigate('/profile')}
                                    className="btn-ghost-outline-dark w-full py-3 flex items-center justify-center gap-2 text-sm font-semibold tracking-tight transition-all cursor-pointer"
                                >
                                    Quay lại hồ sơ sức khỏe <ArrowRight size={16} />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </UserLayout>
    );
};

export default PaymentResultScreen;
