import React, { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import { ArrowLeft, CheckCircle2, ChevronRight, Pause, Play } from "lucide-react";
import { Navigate, useNavigate, useParams, useSearchParams } from "react-router-dom";
import UserLayout from "../../../layouts/UserLayout";
import API_URL from "../../../constants/apiConfig";
import { getExerciseProgramById, getSortedProgramVideos } from "../../../constants/exercisePrograms";

const REST_SECONDS = 15;

const ExerciseSessionScreen = () => {
  const navigate = useNavigate();
  const { programId } = useParams();
  const [searchParams] = useSearchParams();
  const videoRef = useRef(null);
  const program = getExerciseProgramById(programId);
  const videos = useMemo(() => getSortedProgramVideos(program), [program]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [session, setSession] = useState(null);
  const [sessionLoading, setSessionLoading] = useState(true);
  const [sessionError, setSessionError] = useState(null);
  const [isResting, setIsResting] = useState(false);
  const [restCountdown, setRestCountdown] = useState(REST_SECONDS);
  const initializedRef = useRef(false);
  const currentVideo = videos[currentIndex];
  const progress = Math.round(((currentIndex + 1) / videos.length) * 100);
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  const totalDurationSeconds = (program?.estimatedMinutes || 0) * 60;

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !currentVideo || sessionLoading || isResting) return;

    const playNextVideo = async () => {
      try {
        await video.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
    };

    playNextVideo();
  }, [currentIndex, currentVideo, isResting, sessionLoading]);

  useEffect(() => {
    if (!isResting) return undefined;

    if (restCountdown <= 0) {
      setIsResting(false);
      setRestCountdown(REST_SECONDS);
      setCurrentIndex((index) => Math.min(index + 1, videos.length - 1));
      setIsPlaying(false);
      return undefined;
    }

    const timer = setTimeout(() => {
      setRestCountdown((countdown) => countdown - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [isResting, restCountdown, videos.length]);

  useEffect(() => {
    if (!program || videos.length === 0 || initializedRef.current) return;
    initializedRef.current = true;

    const startSession = async () => {
      setSessionLoading(true);
      setSessionError(null);

      try {
        const res = await axios.post(
          `${API_URL}/exercises/sessions/start`,
          {
            programId: program.id,
            programTitle: program.title,
            programType: program.type,
            totalVideos: videos.length,
            totalDurationSeconds,
            restart: searchParams.get("restart") === "1",
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const activeSession = res.data?.session;
        setSession(activeSession);
        setCurrentIndex(Math.min(activeSession?.currentVideoIndex || 0, videos.length - 1));
      } catch {
        setSessionError("Không thể khởi tạo buổi tập. Vui lòng thử lại.");
      } finally {
        setSessionLoading(false);
      }
    };

    startSession();
  }, [program, searchParams, token, totalDurationSeconds, videos.length]);

  useEffect(() => {
    if (!session?._id || sessionLoading) return;

    const updateProgress = async () => {
      try {
        await axios.patch(
          `${API_URL}/exercises/sessions/${session._id}/progress`,
          {
            currentVideoIndex: currentIndex,
            completedVideos: currentIndex,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      } catch {
        // Progress sync failure should not interrupt the exercise player.
      }
    };

    updateProgress();
  }, [currentIndex, session?._id, sessionLoading, token]);

  if (!program) {
    return <Navigate to="/daily-exercise" replace />;
  }

  if (videos.length === 0) {
    return <Navigate to={`/daily-exercise/${program.id}`} replace />;
  }

  const finishSession = () => {
    navigate(`/daily-exercise/${program.id}/complete`, {
      state: {
        sessionId: session?._id,
        programId: program.id,
        startedAt: new Date().toISOString(),
        completedVideos: videos.length,
      },
      replace: true,
    });
  };

  const goNext = () => {
    if (currentIndex >= videos.length - 1) {
      finishSession();
      return;
    }

    setIsResting(false);
    setRestCountdown(REST_SECONDS);
    setCurrentIndex((index) => index + 1);
    setIsPlaying(false);
  };

  const startRest = () => {
    if (currentIndex >= videos.length - 1) {
      finishSession();
      return;
    }

    setIsPlaying(false);
    setRestCountdown(REST_SECONDS);
    setIsResting(true);
  };

  const skipRest = () => {
    setIsResting(false);
    setRestCountdown(REST_SECONDS);
    setCurrentIndex((index) => Math.min(index + 1, videos.length - 1));
    setIsPlaying(false);
  };

  const togglePlay = async () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      await video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  return (
    <UserLayout noPaddingTop={false}>
      <div className="w-full max-w-[1200px] mx-auto px-6 mt-8 pb-24 bg-surface font-body">
        <button
          type="button"
          onClick={() => navigate(`/daily-exercise/${program.id}`)}
          className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors mb-8 font-bold text-xs uppercase tracking-wider"
        >
          <ArrowLeft size={14} />
          Thông tin chương trình
        </button>

        {sessionLoading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-surface-container-lowest border border-outline-variant/60 rounded-[8px]">
            <div className="w-10 h-10 border-2 border-primary/20 border-t-primary rounded-full animate-spin mb-4" />
            <p className="text-on-surface-variant font-bold text-[13px]">Đang chuẩn bị buổi tập...</p>
          </div>
        ) : sessionError ? (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-[8px] p-5 font-bold">
            {sessionError}
          </div>
        ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <section className="lg:col-span-8 bg-surface-container-lowest border border-outline-variant/60 rounded-[8px] p-4 md:p-6 shadow-sm">
            <div className="relative w-full aspect-video bg-black rounded-[8px] overflow-hidden mb-5">
              <video
                key={currentVideo.id}
                ref={videoRef}
                src={currentVideo.videoUrl}
                controls
                autoPlay
                playsInline
                className="w-full h-full"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={startRest}
              />
              {isResting && (
                <div className="absolute inset-0 z-10 bg-black/80 flex flex-col items-center justify-center text-center px-6">
                  <p className="text-primary-light text-[12px] font-extrabold uppercase tracking-wider mb-3">
                    Nghỉ giữa bài
                  </p>
                  <div className="w-24 h-24 rounded-full border-4 border-primary text-primary-light flex items-center justify-center text-4xl font-extrabold mb-5">
                    {restCountdown}
                  </div>
                  <h2 className="text-white text-2xl md:text-3xl font-extrabold font-headline mb-2">
                    Nghỉ ngơi một chút
                  </h2>
                  <p className="text-white/70 text-[14px] font-medium mb-6">
                    Bài tiếp theo: {videos[currentIndex + 1]?.title}
                  </p>
                  <button
                    type="button"
                    onClick={skipRest}
                    className="px-6 py-3 rounded-full bg-primary text-on-primary font-extrabold hover:bg-[#5CA5E4] transition-colors"
                  >
                    Bỏ qua nghỉ
                  </button>
                </div>
              )}
            </div>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <p className="text-primary text-[11px] font-extrabold uppercase tracking-wider mb-2">
                  {isResting ? "Đang nghỉ" : `Video ${currentIndex + 1}/${videos.length}`}
                </p>
                <h1 className="text-2xl md:text-3xl font-extrabold font-headline text-on-surface">
                  {isResting ? `Bài tiếp theo: ${videos[currentIndex + 1]?.title}` : currentVideo.title}
                </h1>
              </div>

              <div className="flex items-center gap-3">
                {!isResting && (
                  <button
                    type="button"
                    onClick={togglePlay}
                    className="px-5 py-3 rounded-full border border-primary text-primary font-extrabold inline-flex items-center gap-2 hover:bg-primary/10 transition-colors"
                  >
                    {isPlaying ? <Pause size={16} /> : <Play size={16} className="fill-current" />}
                    {isPlaying ? "Tạm dừng" : "Phát"}
                  </button>
                )}
                <button
                  type="button"
                  onClick={isResting ? skipRest : goNext}
                  className="px-5 py-3 rounded-full bg-primary text-on-primary font-extrabold inline-flex items-center gap-2 hover:bg-[#5CA5E4] transition-colors"
                >
                  {isResting ? "Bỏ qua nghỉ" : currentIndex >= videos.length - 1 ? "Hoàn thành" : "Tiếp theo"}
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            <div className="mt-6 h-2 bg-surface-container-high rounded-full overflow-hidden">
              <div className="h-full bg-primary" style={{ width: `${progress}%` }} />
            </div>
          </section>

          <aside className="lg:col-span-4 bg-surface-container-lowest border border-outline-variant/60 rounded-[8px] p-5 shadow-sm">
            <h2 className="text-lg font-extrabold font-headline text-on-surface mb-4">
              Tiến trình buổi tập
            </h2>
            <div className="space-y-3">
              {videos.map((video, index) => {
                const isDone = index < currentIndex;
                const isCurrent = index === currentIndex;

                return (
                  <div
                    key={video.id}
                    className={`flex items-center gap-3 rounded-[8px] border px-3 py-3 ${
                      isCurrent
                        ? "border-primary bg-primary/10"
                        : "border-outline-variant/50 bg-surface-container-low"
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-[12px] font-extrabold ${
                      isDone ? "bg-primary text-on-primary" : "bg-white text-primary"
                    }`}>
                      {isDone ? <CheckCircle2 size={16} /> : index + 1}
                    </div>
                    <p className="text-on-surface text-[13px] font-extrabold leading-snug">
                      {video.title}
                    </p>
                  </div>
                );
              })}
            </div>
          </aside>
        </div>
        )}
      </div>
    </UserLayout>
  );
};

export default ExerciseSessionScreen;
