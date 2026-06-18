import React, { useEffect, useState } from "react";
import axios from "axios";
import { ArrowLeft, Clock3, ListVideo, Play, RotateCcw, VideoOff } from "lucide-react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import UserLayout from "../../../layouts/UserLayout";
import API_URL from "../../../constants/apiConfig";
import { getExerciseProgramById, getSortedProgramVideos } from "../../../constants/exercisePrograms";

const ExerciseProgramDetailScreen = () => {
  const navigate = useNavigate();
  const { programId } = useParams();
  const program = getExerciseProgramById(programId);
  const [activeSession, setActiveSession] = useState(null);
  const [sessionLoading, setSessionLoading] = useState(false);

  useEffect(() => {
    if (!program) return;

    const fetchActiveSession = async () => {
      setSessionLoading(true);
      try {
        const token = localStorage.getItem("token") || sessionStorage.getItem("token");
        const res = await axios.get(`${API_URL}/exercises/sessions/active/${program.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setActiveSession(res.data?.session || null);
      } catch {
        setActiveSession(null);
      } finally {
        setSessionLoading(false);
      }
    };

    fetchActiveSession();
  }, [program]);

  if (!program) {
    return <Navigate to="/daily-exercise" replace />;
  }

  const videos = getSortedProgramVideos(program);
  const hasVideos = videos.length > 0;

  return (
    <UserLayout noPaddingTop={false}>
      <div className="w-full max-w-[1200px] mx-auto px-6 mt-8 pb-24 bg-surface font-body">
        <button
          type="button"
          onClick={() => navigate("/daily-exercise")}
          className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors mb-8 font-bold text-xs uppercase tracking-wider"
        >
          <ArrowLeft size={14} />
          Bài tập hằng ngày
        </button>

        <section className="bg-surface-container-lowest border border-outline-variant/60 rounded-[8px] p-6 md:p-8 shadow-sm mb-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div>
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-extrabold uppercase tracking-wider mb-4">
                {program.type === "PREVENTION" ? "Phòng ngừa" : "Phục hồi"}
              </span>
              <h1 className="text-3xl md:text-5xl font-extrabold font-headline text-on-surface mb-3">
                {program.title}
              </h1>
              <p className="text-on-surface text-[16px] font-extrabold mb-4">
                {program.subtitle}
              </p>
              <p className="text-on-surface-variant text-[15px] font-medium leading-relaxed max-w-3xl">
                {program.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 min-w-full md:min-w-[260px]">
              <div className="bg-surface-container-low border border-outline-variant/50 rounded-[8px] p-4">
                <ListVideo size={18} className="text-primary mb-2" />
                <p className="text-[11px] text-on-surface-variant font-bold uppercase tracking-wider">Số video</p>
                <p className="text-xl font-extrabold text-on-surface">{videos.length}</p>
              </div>
              <div className="bg-surface-container-low border border-outline-variant/50 rounded-[8px] p-4">
                <Clock3 size={18} className="text-primary mb-2" />
                <p className="text-[11px] text-on-surface-variant font-bold uppercase tracking-wider">Dự kiến</p>
                <p className="text-xl font-extrabold text-on-surface">{program.estimatedMinutes || "--"} phút</p>
              </div>
            </div>
          </div>

          {activeSession && hasVideos && (
            <div className="mt-8 bg-primary/10 border border-primary/20 rounded-[8px] p-4">
              <p className="text-primary font-extrabold text-[13px] mb-1">
                Bạn có buổi tập đang dở
              </p>
              <p className="text-on-surface-variant text-[13px] font-medium">
                Đang ở video {Math.min((activeSession.currentVideoIndex || 0) + 1, videos.length)}/{videos.length}.
              </p>
            </div>
          )}

          <div className="mt-8 flex flex-col md:flex-row gap-3">
            {activeSession && hasVideos && (
              <button
                type="button"
                onClick={() => navigate(`/daily-exercise/${program.id}/session`)}
                className="w-full md:w-auto px-8 py-4 rounded-full font-extrabold transition-all duration-300 inline-flex items-center justify-center gap-2 text-[14px] shadow-sm bg-primary text-on-primary hover:bg-[#5CA5E4] hover:shadow-md"
              >
                <Play size={16} className="fill-white" />
                Tiếp tục
              </button>
            )}

            <button
              type="button"
              disabled={!hasVideos || sessionLoading}
              onClick={() => navigate(`/daily-exercise/${program.id}/session?restart=1`)}
              className={`w-full md:w-auto px-8 py-4 rounded-full font-extrabold transition-all duration-300 inline-flex items-center justify-center gap-2 text-[14px] shadow-sm ${
                hasVideos
                  ? activeSession
                    ? "border border-primary text-primary hover:bg-primary/10"
                    : "bg-primary text-on-primary hover:bg-[#5CA5E4] hover:shadow-md"
                  : "bg-surface-container-high text-on-surface-variant cursor-not-allowed"
              }`}
            >
              {!hasVideos ? <VideoOff size={16} /> : activeSession ? <RotateCcw size={16} /> : <Play size={16} className="fill-current" />}
              {!hasVideos ? "Chưa có video" : activeSession ? "Bắt đầu lại" : "Bắt đầu buổi tập"}
            </button>
          </div>
        </section>

        <section className="bg-surface-container-lowest border border-outline-variant/60 rounded-[8px] p-6 md:p-8 shadow-sm">
          <h2 className="text-xl font-extrabold font-headline text-on-surface mb-5">
            Danh sách video
          </h2>

          {hasVideos ? (
            <div className="space-y-3">
              {videos.map((video, index) => (
                <div
                  key={video.id}
                  className="flex items-center gap-4 bg-surface-container-low border border-outline-variant/50 rounded-[8px] px-4 py-3"
                >
                  <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[13px] font-extrabold shrink-0">
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-on-surface font-extrabold">{video.title}</p>
                    <p className="text-on-surface-variant text-[12px] font-medium">Video {index + 1}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-surface-container-low border border-outline-variant/50 rounded-[8px] p-5 text-on-surface-variant font-medium">
              Chương trình này hiện chưa có video. Bạn có thể bổ sung URL sau.
            </div>
          )}
        </section>
      </div>
    </UserLayout>
  );
};

export default ExerciseProgramDetailScreen;
