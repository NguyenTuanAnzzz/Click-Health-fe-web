import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  vi: {
    translation: {
      profile: "Hồ sơ",
      manageAccount: "Quản lý tài khoản & cài đặt",
      unnamed: "Chưa có tên",
      editProfile: "Chỉnh sửa hồ sơ",
      appSettings: "Cài đặt ứng dụng",
      darkMode: "Chế độ tối",
      language: "Ngôn ngữ",
      upgradePack: "Gói nâng cấp",
      upgradeVip: "Nâng cấp VIP",
      unlockFeatures: "Mở khóa toàn bộ tính năng cao cấp",
      monthly: "Hàng tháng",
      yearly: "Hàng năm",
      upgradeNow: "Nâng cấp ngay",
      infoSupport: "Thông báo & hỗ trợ",
      terms: "Điều khoản dịch vụ",
      privacy: "Chính sách bảo mật",
      about: "Về Click Health",
      logout: "Đăng xuất",
      version: "PHIÊN BẢN",
      
      vipFeatures: {
        feature1: "Kiểm tra sức khỏe không giới hạn",
        feature2: "Báo cáo chi tiết & phân tích chuyên sâu",
        feature3: "Ưu tiên tư vấn trực tuyến với bác sĩ"
      },
      
      alerts: {
        editProfileMsg: "Chức năng chỉnh sửa hồ sơ sẽ được phát triển sau.",
        upgradeMonthlyMsg: "Bạn đã chọn gói hàng tháng 49,000₫.",
        upgradeYearlyMsg: "Bạn đã chọn gói hàng năm 490,000₫.",
        logoutConfirm: "Bạn có chắc chắn muốn đăng xuất không?",
        featureDevMsg: "Tính năng này sẽ được phát triển sau."
      }
    }
  },
  en: {
    translation: {
      profile: "Profile",
      manageAccount: "Manage account & settings",
      unnamed: "Unnamed",
      editProfile: "Edit Profile",
      appSettings: "App Settings",
      darkMode: "Dark Mode",
      language: "Language",
      upgradePack: "Upgrade Plan",
      upgradeVip: "Upgrade to VIP",
      unlockFeatures: "Unlock all premium features",
      monthly: "Monthly",
      yearly: "Yearly",
      upgradeNow: "Upgrade Now",
      infoSupport: "Info & Support",
      terms: "Terms of Service",
      privacy: "Privacy Policy",
      about: "About Click Health",
      logout: "Logout",
      version: "VERSION",
      
      vipFeatures: {
        feature1: "Unlimited health checks",
        feature2: "Detailed reports & deep analysis",
        feature3: "Priority online doctor consultation"
      },
      
      alerts: {
        editProfileMsg: "Edit profile feature will be developed later.",
        upgradeMonthlyMsg: "You have selected the monthly plan at 49,000₫.",
        upgradeYearlyMsg: "You have selected the yearly plan at 490,000₫.",
        logoutConfirm: "Are you sure you want to log out?",
        featureDevMsg: "This feature will be developed later."
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('language') || 'vi',
    fallbackLng: 'vi',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
