"use client";

import Image from "next/image";

export default function AboutSection() {
  return (
    <section className="w-full bg-black text-white py-20 relative overflow-hidden">

      {/* BLUE GLOW (subtle) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-[22rem] h-[22rem] bg-blue-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] right-[10%] w-[18rem] h-[18rem] bg-blue-500/10 blur-[140px] rounded-full" />
      </div>

      <div className="relative z-10 container mx-auto px-6 md:px-10">

        {/* IMAGE */}
        <div className="w-full max-w-5xl mx-auto">
          <div className="relative w-full h-[250px] sm:h-[350px] md:h-[420px] rounded-xl overflow-hidden shadow-xl">
            <Image
              src="https://i.pinimg.com/736x/12/ff/17/12ff1770f234e151cc4cee647be60fff.jpg"
              alt="About Banner"
              fill
              className="object-cover brightness-[0.85]"
            />
          </div>
        </div>

        {/* TEXT CONTENT */}
        <div className="max-w-4xl mx-auto mt-12 space-y-6 text-gray-300 text-lg leading-relaxed">

          <p>
            OHAYŌ dibangun sebagai platform bagi para pecinta anime yang menginginkan
            pengalaman eksplorasi yang elegan, cepat, dan terkurasi dengan baik. 
            Fokus kami adalah menciptakan ruang yang modern dan nyaman untuk menemukan, 
            mempelajari, dan menikmati anime tanpa batas.
          </p>

          <p>
            Nama OHAYŌ terinspirasi dari semangat pagi: awal baru, energi baru, dan 
            rasa penasaran yang tidak habis-habisnya. Itulah filosofi kami dalam 
            menghadirkan platform ini—membuka peluang tanpa batas bagi siapa pun 
            untuk menemukan anime yang sesuai dengan selera mereka.
          </p>

          <p>
            Kami memprioritaskan pengalaman pengguna. Mulai dari pencarian yang cepat, 
            informasi anime yang ringkas namun lengkap, hingga tampilan antarmuka yang 
            bersih dan modern. Setiap detail dirancang untuk memudahkan pengguna dalam 
            menjelajahi dunia anime.
          </p>

          <p>
            OHAYŌ juga dibangun dengan fondasi teknologi yang ringan dan efisien.
            Kami mengutamakan performa, stabilitas, dan keamanan demi memberikan 
            perjalanan yang mulus bagi pengguna. Fokus kami bukan hanya menampilkan 
            data, tetapi memastikan semuanya terintegrasi dengan rapi dan menyenangkan.
          </p>

          <p>
            Kami percaya bahwa anime bukan sekadar hiburan—ini adalah bentuk seni,
            cerita, dan inspirasi. OHAYŌ hadir sebagai jembatan antara pengguna 
            dengan dunia anime yang luas, memastikan setiap orang dapat menemukan 
            sesuatu yang mereka cintai.
          </p>

        </div>
      </div>
    </section>
  );
}
