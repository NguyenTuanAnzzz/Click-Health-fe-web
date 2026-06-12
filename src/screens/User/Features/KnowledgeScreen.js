import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, BookOpen, AlertTriangle, Clock, ShieldCheck, HeartPulse, Info, Activity, Layers, PhoneCall } from "lucide-react";
import UserLayout from "../../../layouts/UserLayout";

const REFERENCE_LINKS = [
  {
    id: "who",
    label: "WHO — Stroke (fact sheet)",
    url: "https://www.who.int/news-room/fact-sheets/detail/stroke",
  },
  {
    id: "cdc",
    label: "CDC — Stroke",
    url: "https://www.cdc.gov/stroke/index.html",
  },
  {
    id: "nhs",
    label: "NHS (UK) — Stroke",
    url: "https://www.nhs.uk/conditions/stroke/",
  },
  {
    id: "asa",
    label: "American Stroke Association",
    url: "https://www.stroke.org/en/about-stroke",
  },
];

const THEORY_CARDS = [
  {
    id: 1,
    icon: BookOpen,
    iconColor: "text-secondary-container",
    title: "Đột quỵ là gì?",
    summary: "Cấp cứu: máu não bị gián đoạn do tắc hoặc chảy máu.",
    content:
      "Theo WHO, đột quỵ là tình trạng cấp cứu xảy ra khi dòng máu lên não bị gián đoạn do tắc mạch hoặc chảy máu. Thiếu máu nuôi não có thể dẫn tới tổn thương tế bào não và biến chứng nặng. Đột quỵ có thể đe dọa tính mạng và cần được xử trí ngay.\n\n" +
      "WHO cũng nhấn mạnh gánh nặng bệnh đột quỵ toàn cầu lớn; phần lớn gánh nặng liên quan tới các yếu tố nguy cơ có thể can thiệp (ví dụ tăng huyết áp, hút thuốc, cholesterol LDL cao, chế độ ăn nhiều muối, đường huyết lúc đói cao, thừa cân, ít vận động, rượu có hại, ô nhiễm không khí, v.v.).",
  },
  {
    id: 2,
    icon: Layers,
    iconColor: "text-primary",
    title: "Các dạng đột quỵ",
    summary: "Nhồi máu não, xuất huyết não và cơn thiếu máu não thoáng qua.",
    content:
      "WHO phân loại chính:\n\n" +
      "• Đột quỵ thiếu máu não (ischaemic): cục máu đông chặn mạch máu trong não, làm mất dòng máu tới vùng não tương ứng. Đây là dạng phổ biến nhất.\n\n" +
      "• Đột quỵ xuất huyết não (haemorrhagic): vỡ mạch máu trong não gây chảy máu nhu mô não.\n\n" +
      "• Cơn thiếu máu não thoáng qua (TIA): triệu chứng giống đột quỵ nhưng do tắc máu ngắn; thường chỉ vài phút và không để lại tổn thương kéo dài theo định nghĩa lâm sàng. TIA vẫn là cảnh báo quan trọng: cần được đánh giá y tế vì nguy cơ đột quỵ thật sau đó cao.",
  },
  {
    id: 3,
    icon: AlertTriangle,
    iconColor: "text-error",
    title: "Triệu chứng & ghi nhớ FAST/BE-FAST",
    summary: "Mặt, cánh tay, lời nói, thời gian; thêm thăng bằng và thị lực.",
    content:
      "WHO liệt kê các dấu hiệu có thể gặp: mất thăng bằng hoặc phối hợp đột ngột; mất thị lực đột ngột; mặt xệ một bên; yếu một hoặc hai cánh tay; nói khó hoặc lời nói bất thường.\n\n" +
      "NHS và American Stroke Association thường dùng FAST để ghi nhớ:\n" +
      "• F (Face): méo miệng / xệ một bên mặt.\n" +
      "• A (Arms): yếu hoặc tê một cánh tay (hoặc cả hai).\n" +
      "• S (Speech): nói khó, nói không rõ hoặc không hiểu lời nói.\n" +
      "• T (Time): ghi nhận thời điểm triệu chứng bắt đầu và gọi cấp cứu ngay — thời gian quyết định điều trị.\n\n" +
      "Một số tài liệu mở rộng thêm B (Balance — chóng mặt, đi loạng) và E (Eyes — nhìn đôi hoặc mất một phần thị trường).",
  },
  {
    id: 4,
    icon: Clock,
    iconColor: "text-error",
    title: "Vì sao cần vào viện ngay?",
    summary: "Chẩn đoán sớm, điều trị tái thông có hạn thời gian.",
    content:
      "WHO nêu rõ: khi nghi đột quỵ phải coi là cấp cứu y tế; cần chẩn đoán hình ảnh (CT hoặc MRI) càng sớm càng tốt.\n\n" +
      "Với đột quỵ thiếu máu não, điều trị dùng thuốc tiêu sợi huyết (ví dụ tPA) phải được cân nhắc và thực hiện trong giới hạn thời gian từ lúc khởi phát triệu chứng (thường được mô tả là trong vài giờ đầu, tùy quy định từng cơ sở và chỉ định lâm sàng). Nội soi lấy huyết khối (thrombectomy) có thể được chỉ định tùy mức độ nặng và vị trí tổn thương.\n\n" +
      "Với xuất huyết não: kiểm soát huyết áp, chăm sóc đặc biệt và có thể phẫu thuật tùy trường hợp.\n\n" +
      "Theo WHO, điều trị trong đơn vị đột quỵ chuyên biệt kèm phục hồi chức năng giúp cải thiện kết cục và giảm tử vong / di chứng.",
  },
  {
    id: 5,
    icon: ShieldCheck,
    iconColor: "text-green-600",
    title: "Yếu tố nguy cơ",
    summary: "Nguy cơ có thể can thiệp và nguy cơ không thay đổi.",
    content:
      "Theo WHO, các yếu tố có thể can thiệp gồm: tăng huyết áp; dùng thuốc lá; cholesterol máu cao; đái tháo đường; LDL cao; thừa cân / béo phì; ít vận động; chế độ ăn không lành mạnh (nhiều muối, ít rau quả); uống rượu có hại; ma túy; ô nhiễm không khí; đường huyết lúc đói cao; suy thận mạn.\n\n" +
      "Yếu tố khó thay đổi: tuổi; đã từng đột quỵ; bệnh tim sẵn có (ví dụ rung nhĩ, suy tim); bệnh thận mạn.",
  },
  {
    id: 6,
    icon: HeartPulse,
    iconColor: "text-pink-600",
    title: "Phòng ngừa đột quỵ",
    summary: "Kiểm soát huyết áp, bỏ thuốc lá, ăn uống và vận động.",
    content:
      "WHO khuyến nghị mọi người có thể giảm nguy cơ bằng cách: \n\n" +
      "• Kiểm soát huyết áp cao: lối sống lành mạnh và điều trị thuốc.\n" +
      "• Giảm / bỏ thuốc lá; tránh hít khói thụ động.\n" +
      "• Ăn uống cân bằng: ít nhất 5 khẩu phần rau quả mỗi ngày; giảm muối, chất béo bão hòa và đường.\n" +
      "• Vận động: khoảng 150 phút/tuần cường độ vừa.\n" +
      "• Quản lý bệnh đi kèm: đái tháo đường, rối loạn lipid, rung nhĩ, v.v.\n" +
      "• Hạn chế rượu có hại.\n" +
      "• Cải thiện chất lượng không khí trong nhà và ngoài trời khi có thể.\n\n" +
      "Với người có nguy cơ cao, WHO còn nêu các biện pháp như dùng thuốc chống kết tập / kháng đông khi có chỉ định, điều trị hạ lipid, đánh giá hẹp động mạch cảnh và can thiệp tái thông khi chỉ định — tất cả phải do bác sĩ quyết định.",
  },
  {
    id: 7,
    icon: Info,
    iconColor: "text-yellow-600",
    title: "Biến chứng có thể gặp",
    summary: "Phù não, khó nuốt, suy giảm nhận thức và đau mạn tính.",
    content:
      "WHO ghi nhận đột quỵ có thể gây nhiều biến chứng trên não, tim và cơ thể.\n\n" +
      "Ví dụ biến chứng cấp: phù não; rối loạn ngôn ngữ / khó nuốt; viêm phổi hít sặc; co giật; trầm cảm; loét tì đè; co cứng cơ; đau vai; huyết khối tĩnh mạch sâu.\n\n" +
      "Biến chứng lâu dài: yếu vận động, đi khó; đau và co cứng mạn tính; suy giảm nhận thức / trí nhớ; trầm cảm, lo âu; động kinh sau đột quỵ; tiểu không tự chủ; giảm khả năng tự phục vụ.",
  },
  {
    id: 8,
    icon: PhoneCall,
    iconColor: "text-blue-600",
    title: "Xử trí khi nghi ngờ đột quỵ",
    summary: "Gọi cấp cứu ngay, không tự lái xe và không dùng thuốc tự ý.",
    content:
      "CDC và NHS nhấn mạnh: gọi ngay số cấp cứu tại địa phương (ở Việt Nam thường là 115). Không lái xe tự đến bệnh viện nếu đang có triệu chứng; không chờ triệu chứng tự hết.\n\n" +
      "Ghi lại thời điểm bắt đầu triệu chứng (hoặc lần cuối còn bình thường) — thông tin này quan trọng cho điều trị tái thông.\n\n" +
      "Không cho ăn, uống hay dùng thuốc tự ý (tránh sặc, tránh làm phức tạp xử trí). Giữ người bệnh an toàn (nằm nghiêng nếu nôn, bảo vệ đầu) theo hướng dẫn của tổng đài cấp cứu khi được yêu cầu.",
  },
];

const KnowledgeScreen = () => {
  const navigate = useNavigate();
  const [openCard, setOpenCard] = useState(1);

  return (
    <UserLayout>
      <div className="w-full max-w-[1200px] mx-auto px-6 mt-8 pb-24 font-body">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-on-surface-variant hover:text-on-surface transition-colors mb-8 text-xs uppercase tracking-wider font-extrabold cursor-pointer"
        >
          <ArrowLeft size={16} /> Quay lại
        </button>

        <div className="rounded-[32px] bg-surface border border-outline-variant/60 p-8 md:p-12 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10 mb-12">
            <div className="flex-1">
              <p className="text-secondary-container font-extrabold text-[12px] uppercase tracking-[0.3em] mb-4">
                Thư viện Y khoa
              </p>
              <h1 className="text-4xl md:text-5xl font-extrabold text-on-surface leading-tight tracking-tight mb-5 font-headline">
                Kiến thức đột quỵ
              </h1>
              <p className="text-on-surface-variant text-[16px] leading-relaxed max-w-2xl font-medium">
                Tổng hợp nội dung giáo dục sức khỏe về đột quỵ, bao gồm định nghĩa, triệu chứng, cấp cứu, phòng ngừa và phục hồi, theo các nguồn y tế tiêu chuẩn thế giới.
              </p>
            </div>
            <div className="rounded-[24px] bg-surface-container-low p-8 border border-outline-variant/50 shadow-sm w-full lg:w-[350px] shrink-0">
              <div className="text-[11px] uppercase tracking-[0.25em] text-primary font-extrabold mb-5 flex items-center gap-2">
                <Info size={16} /> Nguồn tham khảo
              </div>
              <div className="space-y-4">
                {REFERENCE_LINKS.map((item) => (
                  <a
                    key={item.id}
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="block text-primary font-bold text-[14px] hover:text-secondary-container transition-colors hover:translate-x-1 duration-300"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1fr_350px]">
            <div className="space-y-6">
              {THEORY_CARDS.map((card) => {
                const Icon = card.icon;
                const isOpen = openCard === card.id;

                return (
                  <div key={card.id} className="rounded-[24px] border border-outline-variant/60 overflow-hidden shadow-sm transition-all duration-300">
                    <button
                      type="button"
                      onClick={() => setOpenCard(isOpen ? null : card.id)}
                      className="w-full flex items-center justify-between gap-4 px-6 md:px-8 py-6 bg-surface hover:bg-surface-container-lowest transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-5">
                        <div className={`w-14 h-14 rounded-2xl bg-surface-container-low border border-outline-variant/50 flex items-center justify-center shadow-sm ${card.iconColor}`}>
                          <Icon size={24} />
                        </div>
                        <div className="text-left">
                          <h2 className="text-xl font-extrabold text-on-surface font-headline">{card.title}</h2>
                          <p className="text-[14px] font-medium text-on-surface-variant mt-1.5">{card.summary}</p>
                        </div>
                      </div>
                      <span className={`text-[13px] font-extrabold uppercase tracking-widest ${isOpen ? 'text-primary' : 'text-on-surface-variant'}`}>
                        {isOpen ? 'Thu gọn' : 'Xem thêm'}
                      </span>
                    </button>

                    {isOpen && (
                      <div className="px-6 md:px-8 pb-8 pt-2 text-[15px] font-medium leading-relaxed text-on-surface-variant whitespace-pre-line bg-surface">
                        <div className="p-6 rounded-[20px] bg-surface-container-lowest border border-outline-variant/40">
                          {card.content}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="space-y-6">
              <div className="rounded-[32px] bg-primary text-white p-10 shadow-xl border border-primary/20 relative overflow-hidden">
                <div className="absolute inset-0 pattern-grid-lg opacity-10" />
                <div className="relative z-10">
                  <div className="text-[11px] uppercase tracking-[0.3em] font-extrabold text-white/70 mb-6">Mục lục nội dung</div>
                  <ul className="space-y-4 text-[14px] leading-relaxed font-bold">
                    {THEORY_CARDS.map((card) => (
                      <li key={card.id} className="flex items-start gap-4 hover:text-white/80 transition-colors cursor-pointer" onClick={() => setOpenCard(card.id)}>
                        <span className={`mt-1.5 inline-flex h-2 w-2 rounded-full ${openCard === card.id ? 'bg-secondary-container' : 'bg-white/40'}`} />
                        <span className={openCard === card.id ? 'text-secondary-container' : 'text-white'}>{card.title}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="rounded-[32px] bg-surface-container-low border border-outline-variant/50 p-8 shadow-sm">
                <h3 className="text-xl font-extrabold text-on-surface mb-4 font-headline flex items-center gap-2">
                  <AlertTriangle size={20} className="text-amber-500" />
                  Lưu ý quan trọng
                </h3>
                <p className="text-on-surface-variant text-[14px] font-medium leading-relaxed">
                  Thông tin trong ứng dụng chỉ nhằm mục đích giáo dục sức khỏe cộng đồng. Mọi quyết định chẩn đoán, điều trị và dùng thuốc phải dựa trên khám trực tiếp và chỉ định của bác sĩ.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default KnowledgeScreen;
