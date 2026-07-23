import { Link } from "./Link";

const pages = {
  "/rehber": {
    title: "DirectlyDrop Kullanım Rehberi",
    description:
      "DirectlyDrop ile cihazlar arasında doğrudan dosya göndermek için oda kodu, QR bağlantısı ve güvenli aktarım adımlarını öğrenin.",
    sections: [
      {
        heading: "DirectlyDrop ne işe yarar?",
        body: [
          "DirectlyDrop, iki cihaz arasında tarayıcı üzerinden dosya paylaşmayı kolaylaştıran bir web aracıdır. Amaç, kullanıcıların ek uygulama kurmadan, hesap açmadan ve karmaşık ayarlarla uğraşmadan dosya gönderebilmesidir.",
          "Araç, bağlantı kurmak için oda kodu veya paylaşım bağlantısı kullanır. Dosya aktarımı başladığında veri, desteklenen durumlarda cihazlar arasında WebRTC veri kanalı üzerinden iletilir. Bu yapı özellikle aynı anda hızlıca fotoğraf, video, belge veya arşiv paylaşmak isteyen kullanıcılar için pratik bir deneyim sunar."
        ]
      },
      {
        heading: "Adım adım dosya gönderme",
        body: [
          "Önce gönderici ve alıcı DirectlyDrop sayfasını açar. Gönderici ekranda görünen oda kodunu, QR kodunu veya paylaşım bağlantısını alıcıyla paylaşır. Alıcı bu kodu ya da bağlantıyı kullandığında bağlantı kurulmaya çalışılır.",
          "Bağlantı hazır olduğunda gönderici dosya seçiciyi açar ve göndermek istediği dosyaları seçer. Aktarım süresince iki cihazın da tarayıcı sekmesini açık tutması gerekir. Ağ koşulları, tarayıcı desteği ve cihaz performansı aktarım hızını etkileyebilir."
        ]
      },
      {
        heading: "Sorunsuz aktarım için öneriler",
        body: [
          "Büyük dosyalarda iki cihazın da şarjının yeterli olduğundan ve internet bağlantısının kararlı olduğundan emin olun. Mobil cihazlarda ekranın kapanması veya tarayıcının arka plana alınması aktarımı durdurabilir.",
          "Kurumsal ağlar, VPN bağlantıları veya katı güvenlik duvarları doğrudan bağlantıyı zorlaştırabilir. Böyle bir durumda farklı bir ağ denemek veya iki cihazı daha açık bir internet bağlantısına taşımak sorunu çözebilir."
        ]
      }
    ]
  },
  "/webrtc-nedir": {
    title: "WebRTC Nedir ve Dosya Transferinde Nasıl Kullanılır?",
    description:
      "WebRTC teknolojisinin tarayıcılar arası veri kanallarını, güvenlik modelini ve DirectlyDrop gibi araçlarda nasıl kullanıldığını açıklayan rehber.",
    sections: [
      {
        heading: "WebRTC'nin temel fikri",
        body: [
          "WebRTC, modern tarayıcıların ses, görüntü ve veri iletimi için doğrudan bağlantılar kurmasını sağlayan bir teknolojidir. Video görüşme uygulamalarında sık kullanılır, ancak yalnızca kamera ve mikrofon için değildir; veri kanalları üzerinden dosya parçaları da taşınabilir.",
          "DirectlyDrop gibi araçlarda WebRTC'nin DataChannel özelliği kullanılarak dosyalar küçük parçalara ayrılır ve karşı tarafa sırayla gönderilir. Bu sayede kullanıcı bir dosyayı önce merkezi bir depolama alanına yüklemek zorunda kalmadan paylaşabilir."
        ]
      },
      {
        heading: "Bağlantı kurma süreci",
        body: [
          "İki tarayıcının birbirini bulabilmesi için önce kısa bir eşleşme bilgisi paylaşılır. Oda kodu veya bağlantı bu nedenle kullanılır. Tarayıcılar bağlantı adaylarını değerlendirir ve uygun bir yol bulduklarında veri kanalı açılır.",
          "Her ağ yapısı doğrudan bağlantıya aynı derecede izin vermez. Bazı modemler, şirket ağları veya VPN servisleri bağlantıyı kısıtlayabilir. Bu nedenle DirectlyDrop deneyimi ağ ortamına bağlı olarak değişebilir."
        ]
      },
      {
        heading: "Güvenlik açısından ne sağlar?",
        body: [
          "WebRTC bağlantıları modern tarayıcı güvenlik katmanlarıyla korunur. Dosya içeriği, aktarım sırasında tarayıcıların kurduğu güvenli kanal üzerinden taşınır. DirectlyDrop'un temel yaklaşımı dosyaları kalıcı bir sunucuda saklamamaktır.",
          "Bununla birlikte hiçbir web aracı sınırsız garanti vermez. Kullanıcılar hassas dosyaları yalnızca güvendikleri kişilerle paylaşmalı, doğru alıcıya bağlandıklarından emin olmalı ve aktarım bittikten sonra sekmeyi kapatmalıdır."
        ]
      }
    ]
  },
  "/guvenli-dosya-transferi": {
    title: "Güvenli Dosya Transferi İçin Pratik Kontrol Listesi",
    description:
      "Dosya paylaşırken gizlilik, doğru alıcı, güvenli bağlantı ve tarayıcı kullanımı konusunda dikkat edilmesi gereken temel noktalar.",
    sections: [
      {
        heading: "Doğru alıcıyı doğrulayın",
        body: [
          "Dosya paylaşımında en önemli adım doğru kişiye bağlandığınızdan emin olmaktır. Oda kodunu veya paylaşım bağlantısını yalnızca dosyayı almasını istediğiniz kişiye gönderin. Herkese açık sohbetlere veya sosyal medya yorumlarına bağlantı bırakmayın.",
          "Alıcının adı, cihaz etiketi veya bağlantı bilgisi beklediğiniz kişiyle eşleşmiyorsa aktarımı başlatmadan önce bağlantıyı yenileyin."
        ]
      },
      {
        heading: "Hassas dosyalarda ekstra dikkat",
        body: [
          "Kimlik belgeleri, finansal dosyalar, sözleşmeler veya özel görüntüler gibi hassas içerikleri paylaşırken alıcının güvenilir olduğundan emin olun. Dosya aktarımı aracı güvenli olsa bile yanlış kişiye gönderilen dosya geri alınamaz.",
          "Paylaşım tamamlandıktan sonra indirilen dosyanın alıcı cihazda nasıl saklanacağını da düşünmek gerekir. Ortak kullanılan cihazlarda indirilenler klasörü düzenli kontrol edilmelidir."
        ]
      },
      {
        heading: "Ağ ve tarayıcı önerileri",
        body: [
          "Güncel Chrome, Edge, Firefox veya Safari sürümleri WebRTC desteğini daha kararlı sunar. Eski tarayıcılarda bağlantı kurma veya büyük dosya işleme daha sorunlu olabilir.",
          "Ortak Wi-Fi ağlarında veya kurumsal ağlarda bağlantı daha yavaş olabilir. Mümkünse güvenilir ve kararlı bir internet bağlantısı kullanın."
        ]
      }
    ]
  },
  "/buyuk-dosya-gonderme": {
    title: "Büyük Dosya Gönderirken Nelere Dikkat Edilmeli?",
    description:
      "Büyük video, arşiv ve proje dosyalarını tarayıcı üzerinden paylaşırken bağlantı, cihaz belleği ve aktarım süresi için öneriler.",
    sections: [
      {
        heading: "Büyük dosyalar neden daha hassastır?",
        body: [
          "Dosya boyutu büyüdükçe aktarım süresi uzar ve bağlantı kopması ihtimali daha önemli hale gelir. Tarayıcı tabanlı aktarımda hem gönderen hem alıcı cihazın sekmeyi açık tutması gerekir.",
          "DirectlyDrop dosyaları parçalara ayırarak göndermeye çalışır. Yine de cihaz belleği, tarayıcı sınırları ve internet kalitesi pratik üst sınırı belirler."
        ]
      },
      {
        heading: "Aktarım öncesi hazırlık",
        body: [
          "Çok büyük dosyaları göndermeden önce gereksiz sekmeleri kapatın, cihazı güç kaynağına bağlayın ve uyku modunu kısa süreliğine devre dışı bırakın. Mobil cihazlarda tarayıcıyı arka plana almamaya dikkat edin.",
          "Birden fazla dosya gönderecekseniz önce küçük bir test dosyasıyla bağlantının sağlıklı çalıştığını kontrol etmek iyi bir alışkanlıktır."
        ]
      },
      {
        heading: "Bağlantı koparsa ne yapılmalı?",
        body: [
          "Aktarım yarıda kalırsa iki cihazda da sayfayı yenileyip yeni oda koduyla tekrar bağlanmak çoğu durumda en temiz çözümdür. Aynı ağda sorun devam ediyorsa VPN'i kapatmayı veya farklı bir bağlantı kullanmayı deneyin.",
          "Çok büyük arşivlerde dosyayı daha küçük parçalara bölmek aktarımın yönetilmesini kolaylaştırabilir."
        ]
      }
    ]
  },
  "/sss": {
    title: "DirectlyDrop Sıkça Sorulan Sorular",
    description:
      "DirectlyDrop kullanımı, gizlilik, dosya boyutu, tarayıcı desteği ve bağlantı sorunları hakkında sık sorulan sorular.",
    sections: [
      {
        heading: "Dosyalarım sunucuda saklanıyor mu?",
        body: [
          "DirectlyDrop'un amacı dosyaları kalıcı bir sunucuya yüklemeden cihazlar arasında aktarmaktır. Dosyanın içeriği uygulama tarafından depolanmaz. Bağlantı kurmak ve reklam/analitik hizmetleri için bazı teknik veriler üçüncü taraf servislerle işlenebilir; detaylar gizlilik politikasında açıklanır."
        ]
      },
      {
        heading: "Dosya boyutu sınırı var mı?",
        body: [
          "Uygulama yapay bir dosya boyutu sınırı koymamaya çalışır, ancak tarayıcı, cihaz belleği, disk alanı ve ağ kararlılığı pratik sınırları belirler. Çok büyük dosyalarda aktarım öncesi küçük bir test yapmak önerilir."
        ]
      },
      {
        heading: "Neden bağlantı kurulamıyor?",
        body: [
          "Yanlış oda kodu, kapalı sekme, VPN, kurumsal güvenlik duvarı veya zayıf internet bağlantısı eşleşmeyi engelleyebilir. İki cihazda da sayfayı yenileyip yeni bir kodla tekrar denemek çoğu sorunu çözer."
        ]
      },
      {
        heading: "DirectlyDrop ücretsiz mi?",
        body: [
          "Evet, DirectlyDrop ücretsiz kullanılabilir. Sitenin sürdürülebilmesi için uygun sayfalarda açıkça etiketlenmiş reklam alanları kullanılabilir. Reklamlar dosya seçme, bağlantı kurma ve aktarım kontrolleriyle karıştırılmayacak şekilde yerleştirilmelidir."
        ]
      }
    ]
  }
};

export function ContentPages({ path }) {
  const page = pages[path] || pages["/rehber"];

  return (
    <main className="px-4 pb-16 pt-8 sm:px-6 lg:px-8">
      <article className="mx-auto max-w-3xl text-[color:var(--text-primary)]">
        <p className="mb-4 text-sm text-cyan-300">
          <Link href="/">DirectlyDrop</Link> / Rehber
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-cyan-300 sm:text-4xl">
          {page.title}
        </h1>
        <p className="mt-4 text-base leading-7 text-[color:var(--text-muted)]">
          {page.description}
        </p>

        <div className="mt-10 grid gap-9">
          {page.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-2xl font-semibold text-white">{section.heading}</h2>
              <div className="mt-4 grid gap-4 text-base leading-8 text-[color:var(--text-muted)]">
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <nav className="mt-12 grid gap-3 border-t border-white/10 pt-8 text-sm sm:grid-cols-2">
          <Link href="/webrtc-nedir">WebRTC rehberi</Link>
          <Link href="/guvenli-dosya-transferi">Güvenli transfer önerileri</Link>
          <Link href="/buyuk-dosya-gonderme">Büyük dosya gönderme</Link>
          <Link href="/sss">Sıkça sorulan sorular</Link>
        </nav>
      </article>
    </main>
  );
}
