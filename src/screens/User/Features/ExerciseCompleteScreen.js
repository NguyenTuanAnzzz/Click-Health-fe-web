import React, { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import { CheckCircle2, ClipboardList, Home, Loader2, RotateCcw } from "lucide-react";
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import UserLayout from "../../../layouts/UserLayout";
import API_URL from "../../../constants/apiConfig";
import { getExerciseProgramById, getSortedProgramVideos } from "../../../constants/exercisePrograms";

const ExerciseCompleteScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { programId } = useParams();
  const program = getExerciseProgramById(programId);
  const videos = useMemo(() => getSortedProgramVideos(program), [program]);
  const sessionId = location.state?.sessionId;
  const savedRef = useRef(false);
  const [saveState, setSaveState] = useState("saving");

  useEffect(() => {
    if (!program || savedRef.current) return;
    savedRef.current = true;

    const saveHistory = async () => {
      try {
        const token = localStorage.getItem("token") || sessionStorage.getItem("token");
        const measuredDuration = videos.reduce((sum, video) => sum + (video.durationSeconds || 0), 0);

        if (sessionId) {
          await axios.post(
            `${API_URL}/exercises/sessions/${sessionId}/complete`,
            {},
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
        } else {
          await axios.post(
            `${API_URL}/exercises/history`,
            {
              programId: program.id,
              programTitle: program.title,
              programType: program.type,
              completedVideos: location.state?.completedVideos || videos.length,
              totalVideos: videos.length,
              totalDurationSeconds: measuredDuration || (program.estimatedMinutes || 0) * 60,
            },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
        }

        setSaveState("saved");
      } catch {
        setSaveState("failed");
      }
    };

    saveHistory();
  }, [location.state?.completedVideos, program, sessionId, videos]);

  if (!program) {
    return <Navigate to="/daily-exercise" replace />;
  }

  return (
    <UserLayout noPaddingTop={false}>
      <div className="w-full max-w-[900px] mx-auto px-6 mt-12 pb-24 bg-surface font-body">
        <section className="bg-surface-container-lowest border border-outline-variant/60 rounded-[8px] p-8 md:p-10 shadow-sm text-center">
          <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 text-primary flex items-center justify-center mb-5">
            <CheckCircle2 size={34} />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold font-headline text-on-surface mb-3">
            Hoàn thành buổi tập
          </h1>
          <p className="text-on-surface-variant font-medium mb-8">
            Bạn đã hoàn thành chương trình <strong className="text-on-surface">{program.title}</strong>.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 text-left">
            <div className="bg-surface-container-low border border-outline-variant/50 rounded-[8px] p-4">
              <p className="text-[11px] text-on-surface-variant font-bold uppercase tracking-wider">Video hoàn thành</p>
              <p className="text-2xl font-extrabold text-on-surface">{videos.length}/{videos.length}</p>
            </div>
            <div className="bg-surface-container-low border border-outline-variant/50 rounded-[8px] p-4">
              <p className="text-[11px] text-on-surface-variant font-bold uppercase tracking-wider">Lưu lịch sử</p>
              <p className="text-base font-extrabold text-on-surface">
                {saveState === "saving" && <span className="inline-flex items-center gap-2"><Loader2 size={16} className="animate-spin" /> Đang lưu</span>}
                {saveState === "saved" && "Đã lưu"}
                {saveState === "failed" && "Lưu thất bại"}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="px-6 py-3 rounded-full border border-outline-variant text-primary font-extrabold inline-flex items-center justify-center gap-2 hover:bg-surface-container-low transition-colors"
            >
              <Home size={16} />
              Trang chủ
            </button>
            <button
              type="button"
              onClick={() => navigate("/history", { state: { activeTab: "exercise" } })}
              className="px-6 py-3 rounded-full border border-outline-variant text-primary font-extrabold inline-flex items-center justify-center gap-2 hover:bg-surface-container-low transition-colors"
            >
              <ClipboardList size={16} />
              Xem lịch sử
            </button>
            <button
              type="button"
              onClick={() => navigate(`/daily-exercise/${program.id}/session`)}
              className="px-6 py-3 rounded-full bg-primary text-on-primary font-extrabold inline-flex items-center justify-center gap-2 hover:bg-[#5CA5E4] transition-colors"
            >
              <RotateCcw size={16} />
              Tập lại
            </button>
          </div>
        </section>
      </div>
    </UserLayout>
  );
};

export default ExerciseCompleteScreen;
