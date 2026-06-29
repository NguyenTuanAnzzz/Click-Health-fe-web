export const exercisePrograms = [
  {
    id: "stroke-prevention",
    type: "PREVENTION",
    title: "Giảm nguy cơ đột quỵ",
    subtitle: "Chương trình vận động hằng ngày",
    description:
      "Chuỗi bài tập vận động hằng ngày giúp khởi động cơ thể, duy trì nhịp vận động, hỗ trợ tuần hoàn và hình thành thói quen luyện tập đều đặn.",
    estimatedMinutes: 18,
    videos: [
      {
        id: "prevention-hello",
        title: "Xin chào",
        videoUrl: "https://res.cloudinary.com/dbymvnzxc/video/upload/v1781746119/xinchao_miogj3.mp4",
        order: 1,
      },
      {
        id: "prevention-neck",
        title: "Khởi động khớp cổ",
        videoUrl: "https://res.cloudinary.com/dbymvnzxc/video/upload/v1781746156/xoaykhopco_tdhlys.mp4",
        order: 2,
      },
      {
        id: "prevention-breath",
        title: "Vươn thở",
        videoUrl: "https://res.cloudinary.com/dbymvnzxc/video/upload/v1781746139/vuontho_oobpnq.mp4",
        order: 3,
      },
      {
        id: "prevention-side-stretch",
        title: "Giãn cơ lườn",
        videoUrl: "https://res.cloudinary.com/dbymvnzxc/video/upload/v1781746128/luon_md4eju.mp4",
        order: 4,
      },
      {
        id: "prevention-knee-raise",
        title: "Nâng cao đùi",
        videoUrl: "https://res.cloudinary.com/dbymvnzxc/video/upload/v1781746138/buocchantaicho_ubwdgx.mp4",
        order: 5,
      },
      {
        id: "prevention-jump",
        title: "Bật nhảy tại chỗ",
        videoUrl: "https://res.cloudinary.com/dbymvnzxc/video/upload/v1781746132/nhaybatchan_ky4ttq.mp4",
        order: 6,
      },
      {
        id: "prevention-full-jump",
        title: "Bật nhảy toàn thân",
        videoUrl: "https://res.cloudinary.com/dbymvnzxc/video/upload/v1781746130/nhaybatchanvatay_hm1u7k.mp4",
        order: 7,
      },
      {
        id: "prevention-goodbye",
        title: "Chào và tạm biệt",
        videoUrl: "https://res.cloudinary.com/dbymvnzxc/video/upload/v1781746145/ketthuc_uvzzal.mp4",
        order: 8,
      },
    ],
  },
  {
    id: "post-stroke-recovery",
    type: "RECOVERY",
    title: "Phục hồi sau đột quỵ",
    subtitle: "Chương trình phục hồi chức năng",
    description:
      "Chuỗi bài tập phục hồi chức năng sau đột quỵ, tập trung vào vận động tay, vai, thân dưới và thăng bằng theo trình tự nhẹ nhàng.",
    estimatedMinutes: 25,
    videos: [
      {
        id: "recovery-ball-grip",
        title: "Nắm bóng",
        videoUrl: "https://res.cloudinary.com/dbymvnzxc/video/upload/v1782751728/bopbong_gy5sul.mp4",
        order: 1,
      },
      {
        id: "recovery-wrist-extension",
        title: "Duỗi cổ tay",
        videoUrl: "https://res.cloudinary.com/dbymvnzxc/video/upload/v1782749520/keocangngontay_ml0mll.mp4",
        order: 2,
      },
      {
        id: "recovery-cross-arm-stretch",
        title: "Căng cơ tay chéo",
        videoUrl: "https://res.cloudinary.com/dbymvnzxc/video/upload/v1782749492/epcangtay_2_noodeq.mp4",
        order: 3,
      },
      {
        id: "recovery-shoulder-shrug",
        title: "Nhún vai",
        videoUrl: "https://res.cloudinary.com/dbymvnzxc/video/upload/v1782749628/nhunvaiiii_r0ugnv.mp4",
        order: 4,
      },
      {
        id: "recovery-bridge",
        title: "Bài tập bắc cầu",
        videoUrl: "https://res.cloudinary.com/dbymvnzxc/video/upload/v1782749329/baitapbaccau_f3nsqx.mp4",
        order: 5,
      },
      {
        id: "recovery-hip-flexion-knee-extension",
        title: "Tập gấp háng - duỗi gối",
        videoUrl: "https://res.cloudinary.com/dbymvnzxc/video/upload/v1782750026/t%E1%BA%ADp_du%E1%BB%97i_g%E1%BB%91i_atpw7y.mp4",
        order: 6,
      },
      {
        id: "recovery-balance-standing",
        title: "Bài tập đứng thẳng, giữ thăng bằng",
        videoUrl: "https://res.cloudinary.com/dbymvnzxc/video/upload/v1782749646/nhongotchan_rygus9.mp4",
        order: 7,
      },
      {
        id: "recovery-wall-sit",
        title: "Ngồi dựa tường",
        videoUrl: "https://res.cloudinary.com/dbymvnzxc/video/upload/v1782749361/D%E1%BB%B1a_l%C6%B0ng_v%C3%A0o_t%C6%B0%E1%BB%9Dng_djtrp1.mp4",
        order: 8,
      },
      {
        id: "recovery-single-leg-stand",
        title: "Đứng trên 1 chân",
        videoUrl: "https://res.cloudinary.com/dbymvnzxc/video/upload/v1782750301/%C4%90%E1%BB%A9ng_1_ch%C3%A2n_pli6mc.mp4",
        order: 9,
      },
      {
        id: "recovery-thigh-strength",
        title: "Tập luyện cơ 2 bên đùi",
        videoUrl: "https://res.cloudinary.com/dbymvnzxc/video/upload/v1782750201/t%E1%BA%ADp_luy%E1%BB%87n_c%C6%A1_b%C3%AAn_%C4%91%C3%B9i_h1ruzf.mp4",
        order: 10,
      },
    ],
  },
];

export const getExerciseProgramById = (programId) =>
  exercisePrograms.find((program) => program.id === programId);

export const getSortedProgramVideos = (program) =>
  [...(program?.videos || [])].sort((a, b) => a.order - b.order);
