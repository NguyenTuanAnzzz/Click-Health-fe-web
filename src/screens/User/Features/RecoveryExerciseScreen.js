import React from "react";
import {
  ArrowLeft,
  CalendarCheck2,
  Dumbbell,
  HeartPulse,
  Play,
  ShieldCheck,
  Trophy,
  Zap,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import UserLayout from "../../../layouts/UserLayout";
import { exercisePrograms } from "../../../constants/exercisePrograms";

const programVisuals = {
  "stroke-prevention": {
    icon: ShieldCheck,
    iconStyle: "bg-primary-fixed text-primary border-primary/20",
    accentStyle: "bg-primary text-on-primary",
    bullets: ["Khởi động nhẹ nhàng", "Duy trì vận động hằng ngày", "Hỗ trợ tuần hoàn cơ thể"],
  },
  "post-stroke-recovery": {
    icon: HeartPulse,
    iconStyle: "bg-error-container text-error border-error/20",
    accentStyle: "bg-error text-on-error",
    bullets: ["Phục hồi chức năng", "Theo nhịp tập an toàn", "Rèn vận động và thăng bằng"],
  },
};

const RecoveryExerciseScreen = () => {
  const navigate = useNavigate();

  return (
    <UserLayout noPaddingTop={false}>
      <main className="w-full bg-background font-body">
        <div className="w-full max-w-[1120px] mx-auto px-5 md:px-8 pt-6 pb-24">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors mb-6 font-extrabold text-[11px] uppercase tracking-wider"
          >
            <ArrowLeft size={14} strokeWidth={3} />
            Quay lại trang chủ
          </button>

          <section className="relative overflow-hidden rounded-[8px] bg-primary shadow-lg shadow-primary/20 px-6 py-8 md:px-10 md:py-10 mb-12">
            <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.08),transparent_48%)] pointer-events-none" />
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-white mb-5">
                  <Dumbbell size={13} />
                  Chương trình tập luyện hằng ngày
                </div>

                <h1 className="font-headline text-3xl md:text-5xl font-extrabold leading-tight text-white mb-4">
                  Luyện tập chủ động
                  <span className="block text-secondary-container">cho sức khỏe mỗi ngày</span>
                </h1>

                <p className="max-w-2xl text-[14px] md:text-[15px] leading-relaxed font-semibold text-white/80">
                  Chọn chương trình phù hợp, xem thông tin buổi tập và bắt đầu chuỗi video theo thứ tự.
                  Hệ thống sẽ tự lưu lịch sử khi bạn hoàn thành.
                </p>
              </div>

              <div className="relative rounded-[8px] border border-white/20 bg-white/10 p-5 text-white">
                <div className="absolute -top-3 -right-3 h-10 w-10 rounded-full bg-secondary-container text-primary flex items-center justify-center shadow-md">
                  <Zap size={20} fill="currentColor" />
                </div>

                <div className="flex items-start gap-4 pb-5 border-b border-white/15">
                  <div className="h-10 w-10 rounded-[8px] bg-white/12 border border-white/15 flex items-center justify-center shrink-0">
                    <Trophy size={19} />
                  </div>
                  <div>
                    <p className="text-[10px] font-extrabold uppercase tracking-wider text-white/70 mb-1">
                      Mục tiêu hôm nay
                    </p>
                    <p className="text-[13px] md:text-[14px] font-extrabold leading-snug">
                      Hoàn thành 1 chương trình tập luyện
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 pt-5">
                  <div className="h-10 w-10 rounded-[8px] bg-white/12 border border-white/15 flex items-center justify-center shrink-0">
                    <CalendarCheck2 size={19} />
                  </div>
                  <div>
                    <p className="text-[10px] font-extrabold uppercase tracking-wider text-white/70 mb-1">
                      Theo dõi tiến độ
                    </p>
                    <p className="text-[13px] md:text-[14px] font-extrabold leading-snug">
                      Lưu lịch sử sau mỗi buổi tập hoàn thành
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <div className="text-center mb-8">
              <h2 className="font-headline text-2xl md:text-3xl font-extrabold text-on-surface">
                Lựa chọn chương trình rèn luyện
              </h2>
              <div className="w-12 h-1 bg-primary rounded-full mx-auto mt-3" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {exercisePrograms.map((program) => {
                const visual = programVisuals[program.id];
                const Icon = visual.icon;
                const videoCount = program.videos.length;

                return (
                  <article
                    key={program.id}
                    className="group min-h-[338px] rounded-[8px] border border-outline-variant bg-surface-container-lowest p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-md flex flex-col"
                  >
                    <div
                      className={`mb-5 h-12 w-12 rounded-[8px] border flex items-center justify-center ${visual.iconStyle}`}
                    >
                      <Icon size={24} strokeWidth={2.4} />
                    </div>

                    <h3 className="font-headline text-xl font-extrabold text-on-surface mb-2">
                      {program.title}
                    </h3>
                    <p className="text-[14px] font-extrabold text-primary mb-3">
                      {program.subtitle}
                    </p>
                    <p className="text-[13px] leading-relaxed font-medium text-on-surface-variant mb-5">
                      {program.description}
                    </p>

                    <div className="space-y-3 mb-6">
                      {visual.bullets.map((bullet) => (
                        <div
                          key={bullet}
                          className="flex items-center gap-3 rounded-full border border-outline-variant bg-surface px-4 py-2 text-[12px] font-extrabold text-on-surface"
                        >
                          <span className="h-2 w-2 rounded-full bg-primary shrink-0" />
                          <span>{bullet}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-auto flex items-center justify-between gap-4">
                      <div className="text-[12px] font-extrabold text-on-surface-variant">
                        {videoCount > 0 ? `${videoCount} video` : "Chưa có video"}
                      </div>

                      <button
                        type="button"
                        onClick={() => navigate(`/daily-exercise/${program.id}`)}
                        className={`min-w-[148px] rounded-full px-5 py-3 text-[13px] font-extrabold shadow-sm transition-all duration-300 flex items-center justify-center gap-2 ${visual.accentStyle} group-hover:shadow-md`}
                      >
                        <Play size={14} fill="currentColor" />
                        Bắt đầu
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        </div>
      </main>
    </UserLayout>
  );
};

export default RecoveryExerciseScreen;
