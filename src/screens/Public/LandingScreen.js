import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-surface text-on-surface antialiased min-h-screen">
      <nav className="fixed top-0 w-full z-50 bg-surface/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm">
        <div className="flex justify-between items-center px-8 h-20 max-w-7xl mx-auto">
          <div className="text-2xl font-bold tracking-tight text-blue-800 dark:text-blue-300">
            Click Health
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a className="text-blue-700 dark:text-blue-400 font-bold border-b-2 border-blue-600 font-be-vietnam text-sm" href="#">Trang chủ</a>
            <a className="text-slate-600 dark:text-slate-400 hover:text-blue-600 font-be-vietnam text-sm hover:bg-blue-50/50 transition-all duration-300 px-2 py-1 rounded" href="#">Tính năng</a>
            <a className="text-slate-600 dark:text-slate-400 hover:text-blue-600 font-be-vietnam text-sm hover:bg-blue-50/50 transition-all duration-300 px-2 py-1 rounded" href="#">Bảng giá</a>
            <a className="text-slate-600 dark:text-slate-400 hover:text-blue-600 font-be-vietnam text-sm hover:bg-blue-50/50 transition-all duration-300 px-2 py-1 rounded" href="#">Kiến thức</a>
            <a className="text-slate-600 dark:text-slate-400 hover:text-blue-600 font-be-vietnam text-sm hover:bg-blue-50/50 transition-all duration-300 px-2 py-1 rounded" href="#">Hỗ trợ</a>
          </div>
          <div className="flex gap-4 items-center">
            <button 
              onClick={() => navigate('/login')}
              className="text-[#1F75C1] font-semibold text-sm hover:text-[#7AB5E9] transition-colors"
            >
              Đăng nhập
            </button>
            <button 
              onClick={() => navigate('/register')}
              className="bg-primary text-on-primary px-6 py-2.5 rounded-full font-bold text-sm scale-95 active:scale-90 transition-all soft-glow-primary hover:bg-[#155A96]"
            >
              Tải ứng dụng ngay
            </button>
          </div>
        </div>
      </nav>

      <main className="pt-20">
        <section className="relative min-h-[921px] flex items-center overflow-hidden px-8 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center w-full">
            <div className="z-10">
              <div className="inline-flex items-center gap-2 bg-error-container text-on-error-container px-4 py-2 rounded-full mb-6 font-semibold text-sm">
                <span className="material-symbols-outlined text-sm">emergency</span>
                Cảnh báo đột quỵ 24/7
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold text-on-surface leading-[1.1] tracking-tight mb-6">
                Bảo vệ <span className="text-primary">Não Bộ</span> &amp; Sức Khỏe
              </h1>
              <p className="text-on-surface-variant text-lg md:text-xl leading-relaxed mb-10 max-w-lg">
                Nền tảng AI tiên phong giúp phát hiện sớm dấu hiệu đột quỵ và hỗ trợ cấp cứu tức thì. Vì mỗi giây đều là kim cương.
              </p>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => navigate('/register')}
                  className="bg-primary text-on-primary px-8 py-4 rounded-full font-bold text-lg flex items-center gap-3 soft-glow-primary transition-all hover:translate-y-[-2px]"
                >
                  Tải ứng dụng ngay
                  <span className="material-symbols-outlined">arrow_forward</span>
                </button>
                <button className="bg-surface-container-highest/30 text-on-surface px-8 py-4 rounded-full font-bold text-lg border border-outline-variant hover:bg-surface-container transition-all">
                  Tìm hiểu thêm
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-gradient-to-tr from-primary/10 to-transparent rounded-full blur-3xl"></div>
              <div className="relative rounded-xl overflow-hidden shadow-2xl">
                <img alt="Y tế thông minh" className="w-full object-cover aspect-[4/5]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAIgQ9YSUwWdUbnqq2f02XACBKGZglZzkSTCKtJ6iJ-7bJ6cOVdSAUcV7Lgo6I0xGDuO-Z0cmV6nEw8_WAOLKt7qN9TcDoBV8SHXUjkobVIA9prdib-R_vJfXFCYruDX69KIJ_PscfS7eCV3uG15OCKPN-Z57UhNnjysi5Au5mYPoorn9sPWseElUpzkyX30Xyu-0Yslkc46u16Irddzxu4m0DphpY6p_j7ZSm-dUtpf2VaRUiCxqz8wnsdFtLRnD6lhOAY1CzBwD37" />
                <div className="absolute bottom-6 left-6 right-6 bg-surface-container-lowest/90 backdrop-blur shadow-xl rounded-xl p-4 flex items-center gap-4">
                  <div className="w-12 h-12 bg-error rounded-full flex items-center justify-center text-white soft-glow-error">
                    <span className="material-symbols-outlined">warning</span>
                  </div>
                  <div>
                    <p className="text-xs text-on-surface-variant font-medium">Cảnh báo khẩn cấp</p>
                    <p className="font-bold text-on-surface">Dấu hiệu bất thường được phát hiện</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-surface-container-low overflow-hidden">
          <div className="max-w-7xl mx-auto px-8">
            <p className="text-center text-on-surface-variant font-medium text-sm mb-10 uppercase tracking-widest">Được tin dùng bởi các tổ chức y tế hàng đầu</p>
            <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all">
              <div className="h-8 w-32 bg-on-surface-variant/20 rounded"></div>
              <div className="h-8 w-28 bg-on-surface-variant/20 rounded"></div>
              <div className="h-8 w-40 bg-on-surface-variant/20 rounded"></div>
              <div className="h-8 w-24 bg-on-surface-variant/20 rounded"></div>
              <div className="h-8 w-36 bg-on-surface-variant/20 rounded"></div>
            </div>
          </div>
        </section>

        <section className="py-24 px-8 max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Công nghệ bảo vệ sự sống</h2>
            <p className="text-on-surface-variant max-w-2xl mx-auto">Click Health kết hợp sức mạnh của trí tuệ nhân tạo và chuyên môn y tế để đưa ra những phân tích chính xác nhất.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-surface-container-lowest rounded-xl hover:shadow-xl transition-all border border-transparent hover:border-primary/10 group">
              <div className="w-14 h-14 bg-secondary-container rounded-lg flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-3xl">psychology</span>
              </div>
              <h3 className="text-xl font-bold mb-3">AI Nhận diện khuôn mặt</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">Phân tích sự lệch cơ mặt và thay đổi nụ cười - một trong những dấu hiệu đột quỵ sớm nhất.</p>
            </div>
            <div className="p-8 bg-surface-container-lowest rounded-xl hover:shadow-xl transition-all border border-transparent hover:border-primary/10 group">
              <div className="w-14 h-14 bg-secondary-container rounded-lg flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-3xl">ecg_heart</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Chỉ số rủi ro thời gian thực</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">Kết nối dữ liệu từ thiết bị đeo để tính toán điểm rủi ro tim mạch mỗi giờ.</p>
            </div>
            <div className="p-8 bg-surface-container-lowest rounded-xl hover:shadow-xl transition-all border border-transparent hover:border-primary/10 group">
              <div className="w-14 h-14 bg-secondary-container rounded-lg flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-3xl">location_on</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Định vị cấp cứu</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">Tự động gửi vị trí và hồ sơ y tế cho cơ sở y tế gần nhất khi phát hiện sự cố.</p>
            </div>
          </div>
        </section>

        <section className="py-24 bg-primary text-on-primary">
          <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-16 items-center">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4 pt-12">
                <div className="bg-surface-container-lowest/10 backdrop-blur p-6 rounded-xl aspect-square flex flex-col justify-end">
                  <p className="text-4xl font-extrabold mb-2">98%</p>
                  <p className="text-sm opacity-80">Độ chính xác AI</p>
                </div>
                <div className="bg-surface-container-lowest/10 backdrop-blur p-6 rounded-xl aspect-square flex flex-col justify-end">
                  <p className="text-4xl font-extrabold mb-2">&lt; 5s</p>
                  <p className="text-sm opacity-80">Thời gian phản ứng</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-surface-container-lowest/10 backdrop-blur p-6 rounded-xl aspect-square flex flex-col justify-end">
                  <p className="text-4xl font-extrabold mb-2">24/7</p>
                  <p className="text-sm opacity-80">Giám sát liên tục</p>
                </div>
                <div className="bg-surface-container-lowest/10 backdrop-blur p-6 rounded-xl aspect-square flex flex-col justify-end">
                  <p className="text-4xl font-extrabold mb-2">10k+</p>
                  <p className="text-sm opacity-80">Người dùng tin tưởng</p>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-4xl font-extrabold mb-8">Quy trình vận hành thông minh</h2>
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-full bg-on-primary/20 flex items-center justify-center shrink-0 font-bold">1</div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Tải ứng dụng &amp; Kết nối</h4>
                    <p className="opacity-70">Cài đặt ứng dụng và đồng bộ hóa với Smartwatch hoặc dữ liệu sức khỏe từ điện thoại.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-full bg-on-primary/20 flex items-center justify-center shrink-0 font-bold">2</div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Giám sát thụ động</h4>
                    <p className="opacity-70">AI của chúng tôi chạy ngầm để theo dõi các chỉ số sinh tồn và thói quen vận động.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-full bg-on-primary/20 flex items-center justify-center shrink-0 font-bold">3</div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Cảnh báo &amp; Hành động</h4>
                    <p className="opacity-70">Ngay khi có dấu hiệu, ứng dụng sẽ thực hiện chuỗi BEFAST và thông báo cho người thân.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 px-8 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-12 items-center bg-surface-container rounded-3xl p-8 md:p-16 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="flex-1">
              <span className="text-primary font-bold tracking-widest uppercase text-xs mb-4 block">Tính năng đặc biệt</span>
              <h2 className="text-4xl font-extrabold mb-6 leading-tight">Giao thức BEFAST: <br/>Phản ứng nhanh trong giây lát</h2>
              <p className="text-on-surface-variant mb-8">BEFAST là tiêu chuẩn vàng trong nhận diện đột quỵ. Ứng dụng Click Health hướng dẫn bạn thực hiện kiểm tra này một cách tự động và trực quan.</p>
              <ul className="grid grid-cols-2 gap-4">
                <li className="flex items-center gap-3 font-medium">
                  <span className="w-2 h-2 rounded-full bg-primary"></span> Thăng bằng (Balance)
                </li>
                <li className="flex items-center gap-3 font-medium">
                  <span className="w-2 h-2 rounded-full bg-primary"></span> Thị lực (Eyes)
                </li>
                <li className="flex items-center gap-3 font-medium">
                  <span className="w-2 h-2 rounded-full bg-primary"></span> Khuôn mặt (Face)
                </li>
                <li className="flex items-center gap-3 font-medium">
                  <span className="w-2 h-2 rounded-full bg-primary"></span> Cánh tay (Arms)
                </li>
                <li className="flex items-center gap-3 font-medium">
                  <span className="w-2 h-2 rounded-full bg-primary"></span> Ngôn ngữ (Speech)
                </li>
                <li className="flex items-center gap-3 font-medium">
                  <span className="w-2 h-2 rounded-full bg-primary"></span> Thời gian (Time)
                </li>
              </ul>
            </div>
            <div className="flex-1 w-full max-w-md">
              <img alt="BEFAST UI" className="w-full drop-shadow-2xl rounded-2xl" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB7m28BL3KzVuNrlODQzAMKGm44IhsQkwypQSgua5m_g9VG6gBx8881IUcJY_NRIsjbjQ3H_dtR2_pXreFjTJH8balIGMeb7T2K6t__tAL4yHjYTqzL9DXzxRv-74UKzwPUOSdYpCIUVlKd8qzDfyp9q3kPD-n_V-t5I3ajASS_DR8baAgEhkKPErP6GuyuRF3TZPWna_4wpGvMg3_N2E6mIJqmYftV7Thy0yosem40qnoGd6kIGpA9prtbzqlEm21hkIws4K9ynkE0" />
            </div>
          </div>
        </section>

        <section className="py-24 bg-surface">
          <div className="max-w-7xl mx-auto px-8">
            <div className="grid md:grid-cols-2 gap-20 items-center">
              <div className="order-2 md:order-1">
                <div className="relative">
                  <img alt="Chăm sóc cha mẹ" className="rounded-xl shadow-lg w-full aspect-video object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAjS0hSu_6FDJ1mWJDp9qJWhmu2lEJpB5DVVUnN47OzjLcvmDSqglPNwUHJvNFyvIn0UzyrxxCjGWGG7ObVMOoBBiL5GRnF6udLGU45k3115XnrC6MIZ4QGmw3Mj3gF0lFWIZX0sFdmie8b7cZNtamTCK1Oc0_uGBB8LNN_MgHdB1Dbt3mYdifpfmVyPlq1HFVh4ejBqfEK7RIQhVC9BzSnVLCI8vcdx90uBrcSu9kaxu0J7VrzC7RB__n71GIS5srOjRAj1dptHcnd" />
                  <div className="absolute -bottom-10 -right-10 hidden lg:block w-48 h-48 bg-white p-4 rounded-xl shadow-2xl border border-slate-50">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-2">
                        <span className="material-symbols-outlined">check_circle</span>
                      </div>
                      <p className="text-xs font-bold">Mẹ đang an toàn</p>
                      <p className="text-[10px] text-slate-400">Cập nhật 2 phút trước</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <h2 className="text-4xl font-extrabold mb-6 leading-tight">Yên tâm tuyệt đối <br/>khi ở xa cha mẹ</h2>
                <p className="text-on-surface-variant mb-8 text-lg">Bạn không thể ở bên cha mẹ 24/7, nhưng Click Health có thể. Tính năng "Family Connect" cho phép bạn nhận thông báo tức thì về tình trạng sức khỏe của người thân dù ở bất cứ đâu.</p>
                <div className="space-y-6">
                  <div className="flex gap-4 p-4 bg-surface-container-lowest rounded-xl">
                    <span className="material-symbols-outlined text-primary">notifications_active</span>
                    <div>
                      <h4 className="font-bold">Thông báo đa kênh</h4>
                      <p className="text-sm text-on-surface-variant">Nhận cảnh báo qua App, SMS và cuộc gọi thoại khẩn cấp.</p>
                    </div>
                  </div>
                  <div className="flex gap-4 p-4 bg-surface-container-lowest rounded-xl">
                    <span className="material-symbols-outlined text-primary">share_location</span>
                    <div>
                      <h4 className="font-bold">Bản đồ y tế gia đình</h4>
                      <p className="text-sm text-on-surface-variant">Xem vị trí và trạng thái của tất cả thành viên trên một màn hình.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 px-8 max-w-7xl mx-auto">
          <div className="bg-gradient-to-br from-primary-container to-primary rounded-[2.5rem] p-12 md:p-24 text-center text-on-primary relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_70%)]"></div>
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-8 leading-tight">Đừng chờ đợi đến khi quá muộn</h2>
              <p className="text-xl opacity-90 mb-12">Sức khỏe là tài sản quý giá nhất. Hãy để công nghệ đồng hành cùng gia đình bạn trong việc phòng ngừa và bảo vệ.</p>
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <button 
                  onClick={() => navigate('/register')}
                  className="bg-surface-container-lowest text-primary px-10 py-5 rounded-full font-bold text-xl hover:bg-on-primary-container transition-all shadow-xl"
                >
                  Tải ứng dụng ngay
                </button>
                <button className="bg-transparent border-2 border-on-primary text-on-primary px-10 py-5 rounded-full font-bold text-xl hover:bg-on-primary/10 transition-all">
                  Liên hệ tư vấn
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-slate-50 dark:bg-slate-950 w-full py-12 border-t border-slate-100 dark:border-slate-800">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-8 max-w-7xl mx-auto">
          <div className="space-y-4">
            <div className="text-lg font-bold text-blue-800">Click Health</div>
            <p className="font-be-vietnam text-xs text-slate-500">
              © 2024 Click Health. Chăm sóc sức khỏe bằng cả trái tim.
            </p>
            <div className="flex gap-4">
              <a className="opacity-80 hover:opacity-100 text-blue-700" href="#">
                <span className="material-symbols-outlined">public</span>
              </a>
              <a className="opacity-80 hover:opacity-100 text-blue-700" href="#">
                <span className="material-symbols-outlined">share</span>
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-sm mb-4">Sản phẩm</h4>
            <ul className="space-y-2">
              <li><a className="font-be-vietnam text-xs text-slate-500 hover:text-blue-500 underline underline-offset-4 opacity-80 hover:opacity-100" href="#">Tính năng</a></li>
              <li><a className="font-be-vietnam text-xs text-slate-500 hover:text-blue-500 underline underline-offset-4 opacity-80 hover:opacity-100" href="#">Bảng giá</a></li>
              <li><a className="font-be-vietnam text-xs text-slate-500 hover:text-blue-500 underline underline-offset-4 opacity-80 hover:opacity-100" href="#">Tải ứng dụng</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-sm mb-4">Hỗ trợ</h4>
            <ul className="space-y-2">
              <li><a className="font-be-vietnam text-xs text-slate-500 hover:text-blue-500 underline underline-offset-4 opacity-80 hover:opacity-100" href="#">Trung tâm trợ giúp</a></li>
              <li><a className="font-be-vietnam text-xs text-slate-500 hover:text-blue-500 underline underline-offset-4 opacity-80 hover:opacity-100" href="#">Điều khoản</a></li>
              <li><a className="font-be-vietnam text-xs text-slate-500 hover:text-blue-500 underline underline-offset-4 opacity-80 hover:opacity-100" href="#">Bảo mật</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-sm mb-4">Công ty</h4>
            <ul className="space-y-2">
              <li><a className="font-be-vietnam text-xs text-slate-500 hover:text-blue-500 underline underline-offset-4 opacity-80 hover:opacity-100" href="#">Về chúng tôi</a></li>
              <li><a className="font-be-vietnam text-xs text-slate-500 hover:text-blue-500 underline underline-offset-4 opacity-80 hover:opacity-100" href="#">Liên hệ</a></li>
              <li><a className="font-be-vietnam text-xs text-slate-500 hover:text-blue-500 underline underline-offset-4 opacity-80 hover:opacity-100" href="#">Tuyển dụng</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800 text-center">
          <p className="font-be-vietnam text-[10px] text-slate-400 max-w-2xl mx-auto px-8">
            Tuyên bố miễn trừ trách nhiệm: Click Health là công cụ hỗ trợ theo dõi sức khỏe và không thay thế cho chẩn đoán y tế chuyên nghiệp. Luôn tham khảo ý kiến bác sĩ trong mọi trường hợp khẩn cấp.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingScreen;
