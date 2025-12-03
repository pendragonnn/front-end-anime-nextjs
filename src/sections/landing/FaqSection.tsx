"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FaqSection() {
  return (
    <section className="w-full bg-black text-white py-20 px-6 md:px-10">
      <div className="max-w-3xl mx-auto">

        {/* TITLE */}
        <h2 className="text-3xl md:text-4xl font-bold text-center tracking-wide">
          Frequently Asked <span className="text-blue-400">Questions</span>
        </h2>

        <p className="text-gray-400 text-center mt-3 mb-10">
          Temukan jawaban dari pertanyaan yang sering diajukan.
        </p>

        {/* ACCORDION */}
        <Accordion type="single" collapsible className="space-y-4">

          <AccordionItem value="item-1" className="border border-white/10 rounded-xl">
            <AccordionTrigger className="px-4 text-lg">
              Apa itu OHAYŌ?
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4 text-gray-300">
              OHAYŌ adalah platform eksplorasi anime yang dirancang untuk memberikan
              pengalaman modern, cepat, dan elegan bagi para pecinta anime.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2" className="border border-white/10 rounded-xl">
            <AccordionTrigger className="px-4 text-lg">
              Apakah OHAYŌ gratis digunakan?
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4 text-gray-300">
              Ya, semua fitur inti OHAYŌ dapat digunakan secara gratis.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3" className="border border-white/10 rounded-xl">
            <AccordionTrigger className="px-4 text-lg">
              Dari mana data anime diambil?
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4 text-gray-300">
              OHAYŌ menggunakan API terpercaya dan aman untuk menampilkan data anime
              terbaru dan akurat.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4" className="border border-white/10 rounded-xl">
            <AccordionTrigger className="px-4 text-lg">
              Apakah akan ada fitur komunitas?
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4 text-gray-300">
              Ya! Fitur komunitas seperti komentar, daftar favorit, dan profil pengguna
              sudah dalam perencanaan.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5" className="border border-white/10 rounded-xl">
            <AccordionTrigger className="px-4 text-lg">
              Bagaimana cara menghubungi tim OHAYŌ?
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4 text-gray-300">
              Kamu bisa menghubungi kami melalui halaman Contact atau sosial media resmi
              OHAYŌ.
            </AccordionContent>
          </AccordionItem>

        </Accordion>
      </div>
    </section>
  );
}
