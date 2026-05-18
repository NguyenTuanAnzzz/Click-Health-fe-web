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
            <div className="min-h-[80vh] flex items-center justify-center px-4">
                <div className="max-w-md w-full game-card p-10 text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full -mr-16 -mt-16 blur-2xl" />
                    
                    {loading ? (
                        <div className="space-y-6 py-10">
                            <div className="w-20 h-20 bg-accent/20 rounded-3xl flex items-center justify-center mx-auto border-4 border-accent animate-spin-slow">
                                <Loader2 size={40} className="text-accent animate-spin" />
                            </div>
                            <h2 className="text-3xl font-black text-main uppercase italic">Đang xác thực...</h2>
                            <p className="text-main/60 font-bold italic">Vui lòng chờ trong giây lát trong khi chúng tôi kiểm tra giao dịch của bạn.</p>
                        </div>
                    ) : (
                        <div className="space-y-8 animate-float-in">
                            {status === 'success' ? (
                                <>
                                    <div className="w-24 h-24 bg-green-500 rounded-[2rem] flex items-center justify-center mx-auto border-4 border-primary-dark shadow-teal-glow rotate-6">
                                        <CheckCircle size={48} className="text-white" strokeWidth={3} />
                                    </div>
                                    <h2 className="text-4xl font-black text-green-500 uppercase italic leading-none">
                                        Thanh toán <br/> <span className="text-accent">Thành công!</span>
                                    </h2>
                                    <p className="text-main/70 font-bold italic text-lg">
                                        Chúc mừng! Tài khoản của bạn đã được nâng cấp lên VIP. Tận hưởng mọi tính năng cao cấp ngay bây giờ.
                                    </p>
                                </>
                            ) : (
                                <>
                                    <div className="w-24 h-24 bg-danger rounded-[2rem] flex items-center justify-center mx-auto border-4 border-primary-dark shadow-danger-glow -rotate-6">
                                        <XCircle size={48} className="text-white" strokeWidth={3} />
                                    </div>
                                    <h2 className="text-4xl font-black text-danger uppercase italic leading-none">
                                        Giao dịch <br/> <span className="text-accent">Thất bại</span>
                                    </h2>
                                    <p className="text-main/70 font-bold italic text-lg">
                                        Rất tiếc, đã có lỗi xảy ra trong quá trình thanh toán hoặc giao dịch bị hủy bỏ.
                                    </p>
                                </>
                            )}

                            <div className="pt-8 border-t-4 border-dashed border-border flex flex-col gap-4">
                                <button 
                                    onClick={() => navigate('/')}
                                    className="btn-primary-game w-full text-lg py-5"
                                >
                                    <Home size={20} /> Về trang chủ
                                </button>
                                <button 
                                    onClick={() => navigate('/profile')}
                                    className="text-main/60 font-black uppercase tracking-widest text-sm hover:text-accent transition-colors flex items-center justify-center gap-2"
                                >
                                    Quay lại hồ sơ <ArrowRight size={16} />
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
