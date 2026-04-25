import { useEffect } from "react";

export function LegalPages({ type }) {
  // Sayfa açıldığında otomatik en üste kaydır
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [type]);

  const goBack = () => {
    window.location.hash = ""; // Ana sayfaya dön
  };

  if (type === "gizlilik") {
    return (
      <div className="mx-auto max-w-4xl px-4 py-12 text-[color:var(--text-primary)]">
        <button onClick={goBack} className="mb-6 text-cyan-400 hover:underline transition">&larr; Ana Sayfaya Dön</button>
        <h1 className="mb-6 text-3xl font-bold text-cyan-400">Gizlilik Politikası</h1>
        <div className="space-y-4 text-sm leading-relaxed text-[color:var(--text-muted)]">
          <p><strong>Son Güncelleme:</strong> Nisan 2026</p>
          <p>DirectlyDrop olarak gizliliğinize en üst düzeyde önem veriyoruz. Bu metin, sistemimizin nasıl çalıştığını ve verilerinizin nasıl (kaydedilmediğini) açıklar.</p>
          <h2 className="mt-6 text-xl font-semibold text-white">1. Veri Transferi ve Depolama</h2>
          <p>DirectlyDrop, WebRTC teknolojisini kullanarak cihazlar arası uçtan uca (P2P) dosya transferi sağlar. Dosyalarınız hiçbir zaman sunucularımıza yüklenmez, depolanmaz veya tarafımızca erişilemez. Aktarım tamamen sizin ve alıcının tarayıcısı arasında gerçekleşir.</p>
          <h2 className="mt-6 text-xl font-semibold text-white">2. Çerezler (Cookies) ve Yerel Depolama</h2>
          <p>Sitemiz; dil tercihlerinizi hatırlamak, bağlantı durumunu korumak ve Google AdSense aracılığıyla reklamlar sunmak amacıyla tarayıcınızın yerel depolama özelliklerini ve çerezleri kullanabilir.</p>
          <h2 className="mt-6 text-xl font-semibold text-white">3. Üçüncü Taraf Reklamları (Google AdSense)</h2>
          <p>Sitemizde Google AdSense reklamları yayınlanmaktadır. Google, size ilgi alanlarınıza göre reklamlar göstermek için çerezleri kullanabilir. Kullanıcılar, Google Reklam Ayarları'nı ziyaret ederek kişiselleştirilmiş reklamları devre dışı bırakabilirler.</p>
          <h2 className="mt-6 text-xl font-semibold text-white">4. İletişim</h2>
          <p>Gizlilik politikamızla ilgili her türlü soru ve öneriniz için <strong>iletisim@directlydrop.com</strong> adresi üzerinden bizimle iletişime geçebilirsiniz.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 text-[color:var(--text-primary)]">
      <button onClick={goBack} className="mb-6 text-cyan-400 hover:underline transition">&larr; Ana Sayfaya Dön</button>
      <h1 className="mb-6 text-3xl font-bold text-cyan-400">Kullanım Koşulları</h1>
      <div className="space-y-4 text-sm leading-relaxed text-[color:var(--text-muted)]">
        <p><strong>Son Güncelleme:</strong> Nisan 2026</p>
        <p>DirectlyDrop platformunu kullanarak aşağıdaki koşulları kabul etmiş sayılırsınız:</p>
        <h2 className="mt-6 text-xl font-semibold text-white">1. Hizmetin Doğası</h2>
        <p>DirectlyDrop, cihazlar arasında doğrudan dosya paylaşımı sağlayan ücretsiz bir araçtır. Hizmetin kesintisiz veya %100 hatasız çalışacağı garanti edilmez. Aktarımlar cihazların ağ bağlantı kalitesine bağlıdır.</p>
        <h2 className="mt-6 text-xl font-semibold text-white">2. Yasadışı İçerik ve Kullanım</h2>
        <p>Kullanıcılar, bu platformu yasadışı, telif hakkı ihlali içeren veya zararlı yazılımlar barındıran dosyaları paylaşmak için kullanamazlar. Dosya içeriklerinden tamamen kullanıcılar sorumludur, DirectlyDrop dosyaları barındırmadığı için içerik denetimi yapmaz.</p>
        <h2 className="mt-6 text-xl font-semibold text-white">3. Sorumluluk Reddi</h2>
        <p>DirectlyDrop, dosya aktarımı sırasında oluşabilecek veri kayıplarından, bağlantı kopmalarından veya üçüncü şahısların oluşturduğu zararlardan sorumlu tutulamaz.</p>
        <h2 className="mt-6 text-xl font-semibold text-white">4. Değişiklikler</h2>
        <p>Bu kullanım koşulları önceden haber verilmeksizin güncellenebilir. Platformu kullanmaya devam etmeniz, değişiklikleri kabul ettiğiniz anlamına gelir.</p>
      </div>
    </div>
  );
}