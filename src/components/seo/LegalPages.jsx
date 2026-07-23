import { useEffect } from "react";
import { Link } from "./Link";

export function LegalPages({ type }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [type]);

  if (type === "gizlilik") {
    return (
      <main className="mx-auto max-w-4xl px-4 py-12 text-[color:var(--text-primary)]">
        <Link href="/" className="mb-6 inline-block">&larr; Ana Sayfaya Dön</Link>
        <h1 className="mb-6 text-3xl font-bold text-cyan-400">Gizlilik Politikası</h1>
        <div className="space-y-4 text-sm leading-relaxed text-[color:var(--text-muted)]">
          <p><strong>Son Güncelleme:</strong> Temmuz 2026</p>
          <p>DirectlyDrop olarak gizliliğinizi önemsiyoruz. Bu metin, dosya aktarımı, çerezler, reklam teknolojileri ve teknik bağlantı süreçlerinde hangi bilgilerin işlenebileceğini açıklar.</p>

          <h2 className="mt-6 text-xl font-semibold text-white">1. Dosya Transferi ve Depolama</h2>
          <p>DirectlyDrop, desteklenen durumlarda WebRTC teknolojisini kullanarak cihazlar arasında doğrudan dosya transferi sağlar. Dosya içerikleri DirectlyDrop tarafından kalıcı bir sunucuda depolanmaz. Bağlantı kurulması, güvenlik, hata ayıklama, reklam ve ölçüm süreçleri için IP adresi, tarayıcı bilgisi, cihaz türü, yaklaşık konum, çerezler veya benzer teknik tanımlayıcılar üçüncü taraf hizmetler tarafından işlenebilir.</p>

          <h2 className="mt-6 text-xl font-semibold text-white">2. Çerezler ve Yerel Depolama</h2>
          <p>Sitemiz; dil tercihlerinizi hatırlamak, bağlantı durumunu yönetmek, temel site performansını ölçmek ve reklam sunumu yapmak amacıyla çerezler ile tarayıcı yerel depolamasını kullanabilir.</p>

          <h2 className="mt-6 text-xl font-semibold text-white">3. Google AdSense ve Reklam Teknolojileri</h2>
          <p>Sitemizde Google AdSense reklamları yayınlanabilir. Google ve iş ortakları, reklam sunmak, reklamları ölçmek ve kötüye kullanımı önlemek için çerezler, web işaretçileri, IP adresleri ve benzer tanımlayıcılar kullanabilir. Google'ın verileri nasıl kullandığı hakkında bilgi almak için <a className="text-cyan-300 hover:underline" href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noreferrer">Google iş ortağı siteleri politikası</a> sayfasını inceleyebilirsiniz.</p>

          <h2 className="mt-6 text-xl font-semibold text-white">4. Analitik ve Teknik Hizmetler</h2>
          <p>Site performansını ve kullanım eğilimlerini anlamak için Google Analytics gibi ölçüm araçları kullanılabilir. Bu araçlar sayfa görüntüleme, cihaz türü, tarayıcı bilgisi ve yaklaşık konum gibi teknik bilgileri işleyebilir.</p>

          <h2 className="mt-6 text-xl font-semibold text-white">5. Kullanıcı Sorumluluğu</h2>
          <p>Dosya içeriklerini yalnızca güvendiğiniz kişilerle paylaşmalısınız. DirectlyDrop dosya içeriğini kalıcı olarak saklamadığı için gönderilen dosyanın içeriğini incelemez ve kullanıcıların paylaştığı dosyalardan kullanıcılar sorumludur.</p>

          <h2 className="mt-6 text-xl font-semibold text-white">6. İletişim</h2>
          <p>Gizlilik politikamızla ilgili sorularınız için <strong>iletisim@directlydrop.com</strong> adresi üzerinden bizimle iletişime geçebilirsiniz.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-12 text-[color:var(--text-primary)]">
      <Link href="/" className="mb-6 inline-block">&larr; Ana Sayfaya Dön</Link>
      <h1 className="mb-6 text-3xl font-bold text-cyan-400">Kullanım Koşulları</h1>
      <div className="space-y-4 text-sm leading-relaxed text-[color:var(--text-muted)]">
        <p><strong>Son Güncelleme:</strong> Temmuz 2026</p>
        <p>DirectlyDrop platformunu kullanarak aşağıdaki koşulları kabul etmiş sayılırsınız.</p>

        <h2 className="mt-6 text-xl font-semibold text-white">1. Hizmetin Doğası</h2>
        <p>DirectlyDrop, cihazlar arasında tarayıcı tabanlı dosya paylaşımı sağlayan ücretsiz bir araçtır. Hizmetin kesintisiz, her ağda çalışır veya tamamen hatasız olacağı garanti edilmez. Aktarımlar tarayıcı desteğine, cihaz kapasitesine ve ağ bağlantı kalitesine bağlıdır.</p>

        <h2 className="mt-6 text-xl font-semibold text-white">2. Yasadışı İçerik ve Kullanım</h2>
        <p>Kullanıcılar bu platformu yasa dışı, telif hakkı ihlali içeren, zararlı yazılım barındıran veya başkalarının haklarını ihlal eden dosyaları paylaşmak için kullanamaz. Dosya içeriklerinden tamamen kullanıcılar sorumludur.</p>

        <h2 className="mt-6 text-xl font-semibold text-white">3. Reklamlar ve Kullanıcı Etkileşimi</h2>
        <p>Siteyi ücretsiz sunabilmek için uygun sayfalarda açıkça etiketlenmiş reklam alanları kullanılabilir. Kullanıcılardan reklamlara tıklamaları istenmez; reklam etkileşimleri yalnızca gerçek kullanıcı ilgisiyle gerçekleşmelidir.</p>

        <h2 className="mt-6 text-xl font-semibold text-white">4. Sorumluluk Reddi</h2>
        <p>DirectlyDrop, dosya aktarımı sırasında oluşabilecek veri kayıplarından, bağlantı kopmalarından, yanlış alıcıya gönderimden veya üçüncü kişilerin oluşturduğu zararlardan sorumlu tutulamaz.</p>

        <h2 className="mt-6 text-xl font-semibold text-white">5. Değişiklikler</h2>
        <p>Bu kullanım koşulları gerektiğinde güncellenebilir. Platformu kullanmaya devam etmeniz, güncel koşulları kabul ettiğiniz anlamına gelir.</p>
      </div>
    </main>
  );
}
