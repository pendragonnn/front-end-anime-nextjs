interface MenuItem {
  title: string;
  links: { text: string; url: string }[];
}

interface FooterProps {
  tagline?: string;
}

const Footer = ({
  tagline = "Temukan anime favoritmu dan eksplor dunia tanpa batas.",
}: FooterProps) => {
  const menuItems: MenuItem[] = [
    {
      title: "Community",
      links: [
        { text: "Forum", url: "/community/forum" },
        { text: "Events", url: "/community/events" },
        { text: "Leaderboard", url: "/community/leaderboard" },
      ],
    },
    {
      title: "About",
      links: [
        { text: "About Us", url: "/about" },
        { text: "Contact", url: "/contact" },
        { text: "FAQ", url: "/faq" },
        { text: "Terms", url: "/terms" },
        { text: "Privacy", url: "/privacy" },
      ],
    },
  ];

  return (
    <section className="py-16 bg-black text-white">
      <div className="container px-6 sm:px-8 lg:px-10 mx-auto">
        <footer>
          {/* WRAPPER AGAR GRID TEPAT DI TENGAH */}
          <div className="flex justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 max-w-5xl w-full">
              {/* LOGO + TAGLINE */}
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-widest">
                  OHAYŌ
                </h1>
                <p className="mt-4 text-gray-300 leading-relaxed">{tagline}</p>
              </div>

              {/* COMMUNITY & ABOUT */}
              {menuItems.map((section, idx) => (
                <div key={idx}>
                  <h3 className="mb-4 font-semibold text-white text-lg">
                    {section.title}
                  </h3>

                  <ul className="text-gray-400 space-y-2 sm:space-y-3">
                    {section.links.map((link, linkIdx) => (
                      <li
                        key={linkIdx}
                        className="hover:text-white transition font-medium text-sm sm:text-base"
                      >
                        <a href={link.url}>{link.text}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* COPYRIGHT */}
          <div className="text-gray-500 mt-12 border-t border-white/10 pt-5 text-sm font-medium text-center">
            <p>
              OHAYŌ — All rights reserved. Supported by{" "}
              <span className="text-white font-semibold">SABAKO</span>.
            </p>
          </div>
        </footer>
      </div>
    </section>
  );
};

export default Footer;
