import { useEffect, useState } from "react";
import { CROPS, buildOrderMessage, buildSupplyMessage, hasPhone, orderCode } from "./fuel.js";
import { projects } from "./projects.js";
import { videos, formatStoryDate, formatStoryCardDate } from "./stories.js";
import { news } from "./news.js";
import { partners } from "./partners.js";
import logo from "../picture/web/logo.png";
import logoFoot from "../picture/web/logo-footer.png";
import {
  contact,
  figures,
  interests,
  productStory,
  sectors,
  nav,
  parseHash,
  photos,
  pillars,
  slides,
  voices,
  work,
} from "./site.js";

const EMPTY_ORDER = {
  name: "",
  phone: "",
  area: "",
  when: "This week",
  interest: interests[0],
  note: "",
};

const EMPTY_SUPPLY = {
  name: "",
  phone: "",
  area: "",
  crop: CROPS[0],
  volume: "",
  note: "",
};

export default function App() {
  const [{ page, anchor }, setRoute] = useState(parseHash);
  const [menuOpen, setMenuOpen] = useState(false);
  const [sheet, setSheet] = useState("");
  const [openMenu, setOpenMenu] = useState("");
  const [slide, setSlide] = useState(0);
  const [orderForm, setOrderForm] = useState(EMPTY_ORDER);
  const [orderError, setOrderError] = useState("");
  const [slip, setSlip] = useState(null);
  const [copied, setCopied] = useState("");
  const [supplyForm, setSupplyForm] = useState(EMPTY_SUPPLY);
  const [supplyError, setSupplyError] = useState("");
  const [supplySlip, setSupplySlip] = useState(null);

  useEffect(() => {
    const onHash = () => setRoute(parseHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    const place = "Kafue Industrial Yard, Lusaka South Multi-Facility Economic Zone, New Kasama, Lusaka 10101, Zambia.";
    const pages = {
      home: {
        title: "AgriFuel Green Energy | Lusaka, Zambia",
        description: `AgriFuel Green Energy, also known as AgriFuel Energy, supplies smokeless briquettes from crop residue in Lusaka, Zambia. ${place}`,
      },
      about: {
        title: "About AgriFuel Green Energy | Lusaka",
        description: `AgriFuel Green Energy is a Lusaka company turning crop residue into smokeless briquettes for homes, farms, and industry. ${place}`,
      },
      products: {
        title: "The briquette | AgriFuel Green Energy",
        description: `The AgriFuel briquette is a smokeless solid fuel made from crop residue for homes and industry in Zambia. ${place}`,
      },
      solutions: {
        title: "Where AgriFuel is used | Lusaka",
        description: `AgriFuel Green Energy supplies smokeless briquettes for boilers, farms, kitchens, and households in Zambia. ${place}`,
      },
      projects: {
        title: "Projects | AgriFuel Green Energy",
        description: `Field use of AgriFuel Green Energy briquettes in Zambia. ${place}`,
      },
      sustainability: {
        title: "Sustainability | AgriFuel Green Energy",
        description: `AgriFuel Green Energy turns crop residue into fuel and keeps forest wood out of the fire. ${place}`,
      },
      media: {
        title: "Stories and news | AgriFuel Green Energy",
        description: `Stories and news from AgriFuel Green Energy in Lusaka, Zambia. ${place}`,
      },
      contact: {
        title: "Contact AgriFuel Green Energy | Lusaka",
        description: `Contact AgriFuel Green Energy on 0965 127 193 or customercare@agrifuelenergy.com. ${place}`,
      },
    };
    let entry = pages[page] || pages.home;
    if (page === "news" && anchor) {
      const item = news.find((story) => story.slug === anchor);
      if (item) {
        entry = {
          title: `${item.title} | AgriFuel Green Energy`,
          description: item.summary || pages.media.description,
        };
      }
    }
    document.title = entry.title;
    const tag = document.querySelector('meta[name="description"]');
    if (tag) tag.setAttribute("content", entry.description);
  }, [page, anchor]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches || page !== "home") return undefined;
    const timer = window.setInterval(() => {
      setSlide((current) => (current + 1) % slides.length);
    }, 6500);
    return () => window.clearInterval(timer);
  }, [page]);

  useEffect(() => {
    document.body.classList.toggle("nav-open", menuOpen);
    return () => document.body.classList.remove("nav-open");
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
    setSheet("");
    setOpenMenu("");
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
    if (anchor) {
      const node = document.getElementById(anchor);
      if (node) {
        node.scrollIntoView({ behavior, block: "start" });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior });
  }, [page, anchor]);

  function closeMenu() {
    setMenuOpen(false);
    setSheet("");
  }

  function moveSlide(step) {
    setSlide((current) => (current + step + slides.length) % slides.length);
  }

  async function copyText(text, which) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(which);
    } catch {
      setCopied("");
    }
  }

  function submitOrder(event) {
    event.preventDefault();
    if (orderForm.name.trim().length < 2) {
      setOrderError("Add your name.");
      return;
    }
    if (!hasPhone(orderForm.phone) && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(orderForm.phone.trim())) {
      setOrderError("Add an email or a WhatsApp number we can reach.");
      return;
    }
    if (orderForm.note.trim().length < 2) {
      setOrderError("Add the fuel you need, in tons or bags.");
      return;
    }
    const code = orderCode("AF");
    const message = buildOrderMessage({ code, form: orderForm });
    setOrderError("");
    setSlip({ code, message });
    setCopied("");
    copyText(message, "order");
  }

  function submitSupply(event) {
    event.preventDefault();
    if (supplyForm.name.trim().length < 2) {
      setSupplyError("Add your name.");
      return;
    }
    if (!hasPhone(supplyForm.phone)) {
      setSupplyError("Add a phone number we can reach.");
      return;
    }
    if (supplyForm.area.trim().length < 2) {
      setSupplyError("Tell us where the residue is.");
      return;
    }
    const code = orderCode("RS");
    const message = buildSupplyMessage({ code, form: supplyForm });
    setSupplyError("");
    setSupplySlip({ code, message });
    setCopied("");
    copyText(message, "supply");
  }

  function whatsappHref(message) {
    if (!contact.whatsapp) return "";
    return `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(message)}`;
  }

  return (
    <>
      <a className="skip" href="#contact">
        Skip to contact
      </a>
      <div className="util">
        <div className="wrap util-inner">
          <span>{contact.location}</span>
          {contact.phoneDisplay ? <span>{contact.phoneDisplay}</span> : null}
          {contact.email ? <a href={`mailto:${contact.email}`}>{contact.email}</a> : <span>Fuel from crop residue</span>}
          <a className="util-cta" href="#contact">
            Get a quote for bulk order
          </a>
        </div>
      </div>
      <div className="site-head">
        <header className="bar" onMouseLeave={() => setOpenMenu("")}>
          <div className="wrap bar-inner">
            <a className="brand" href="#home" onClick={closeMenu}>
              <img className="logo" src={logo} alt="AgriFuel Green Energy" />
            </a>
            <nav className="desk-nav" aria-label="Primary">
              {nav.map((item) => {
                const current = item.match.includes(page);
                const opened = openMenu === item.id;
                return (
                  <div
                    className={opened ? "nav-item is-open" : "nav-item"}
                    key={item.id}
                    onMouseEnter={() => setOpenMenu(item.children ? item.id : "")}
                  >
                    <a
                      className="top-link"
                      href={item.href}
                      aria-current={current ? "page" : undefined}
                      aria-expanded={item.children ? opened : undefined}
                    >
                      {item.label}
                    </a>
                    {item.children && (
                      <div className="drop">
                        <div className="wrap drop-inner">
                          <div className="drop-lead">
                            <p>{item.label}</p>
                            <span>{item.blurb}</span>
                          </div>
                          <div className="drop-links">
                            {item.children.map((child) => (
                              <a key={child.href + child.label} href={child.href}>
                                {child.label}
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
            <a className="head-profile" href={contact.profile} target="_blank" rel="noreferrer">
              Company profile
            </a>
            <button
              className="menu-btn"
              type="button"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span className="sr">{menuOpen ? "Close menu" : "Open menu"}</span>
              <i />
              <i />
              <i />
            </button>
          </div>
        </header>
        {menuOpen && (
          <>
            <button className="sheet-backdrop" type="button" aria-label="Close menu" onClick={closeMenu} />
            <nav id="mobile-nav" className={sheet ? "sheet-nav is-sub" : "sheet-nav"} aria-label="Mobile">
              <div className="sheet-stage">
                <div className="sheet-panel">
                  <div className="sheet-bar">
                    <strong>Menu</strong>
                    <button type="button" onClick={closeMenu} aria-label="Close menu">
                      ×
                    </button>
                  </div>
                  {nav.map((item) => (
                    <div className="sheet-row" key={item.id}>
                      <a href={item.href} onClick={closeMenu}>
                        {item.label}
                      </a>
                      {item.children ? (
                        <button
                          className="sheet-next"
                          type="button"
                          aria-label={`Open ${item.label}`}
                          onClick={() => setSheet(item.id)}
                        >
                          <Chevron dir="next" />
                        </button>
                      ) : null}
                    </div>
                  ))}
                  <a className="sheet-quote sheet-profile" href={contact.profile} target="_blank" rel="noreferrer" onClick={closeMenu}>
                    Company profile
                  </a>
                  <a className="sheet-quote" href="#contact" onClick={closeMenu}>
                    Get a quote for bulk order
                  </a>
                </div>
                <div className="sheet-panel">
                  {nav
                    .filter((item) => item.id === sheet)
                    .map((item) => (
                      <div key={item.id}>
                        <div className="sheet-bar is-back">
                          <button className="sheet-back" type="button" onClick={() => setSheet("")} aria-label="Back">
                            <Chevron dir="prev" />
                          </button>
                          <strong>{item.label}</strong>
                          <span className="sheet-bar-gap" />
                        </div>
                        {item.children.map((child) => (
                          <a key={child.href + child.label} href={child.href} onClick={closeMenu}>
                            {child.label}
                          </a>
                        ))}
                      </div>
                    ))}
                </div>
              </div>
            </nav>
          </>
        )}
      </div>

      <main>
        {page === "home" && <Home slide={slide} moveSlide={moveSlide} />}
        {page === "about" && <AboutPage />}
        {page === "products" && <ProductsPage />}
        {page === "solutions" && <SolutionsPage />}
        {page === "projects" && <ProjectsPage />}
        {page === "sustainability" && <SustainPage />}
        {page === "media" && <MediaPage />}
        {page === "news" && <NewsPage slug={anchor} />}
        {page === "contact" && (
          <ContactPage
            orderForm={orderForm}
            setOrderForm={setOrderForm}
            orderError={orderError}
            submitOrder={submitOrder}
            slip={slip}
            supplyForm={supplyForm}
            setSupplyForm={setSupplyForm}
            supplyError={supplyError}
            submitSupply={submitSupply}
            supplySlip={supplySlip}
            copied={copied}
            copyText={copyText}
            whatsappHref={whatsappHref}
          />
        )}
      </main>

      <footer className="foot">
        <div className="wrap foot-grid">
          <div>
            <a className="brand" href="#home">
              <img className="logo" src={logoFoot} alt="AgriFuel Green Energy" />
            </a>
            <p className="foot-tag">High-performance clean fuel powering homes, agriculture, and industry across Zambia.</p>
          </div>
          <div className="foot-links">
            <h2>Company</h2>
            <ul>
              {nav.map((item) => (
                <li key={item.id}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Contact</h2>
            <Address />
            <dl className="reach">
              {contact.phoneDisplay ? (
                <div>
                  <dt>Phone</dt>
                  <dd>
                    <a href={`tel:${contact.phoneDisplay.replace(/\s/g, "")}`}>{contact.phoneDisplay}</a>
                  </dd>
                </div>
              ) : null}
              {contact.email ? (
                <div>
                  <dt>Email</dt>
                  <dd>
                    <a href={`mailto:${contact.email}`}>
                      {contact.email.split("@")[0]}@<wbr />
                      {contact.email.split("@")[1]}
                    </a>
                  </dd>
                </div>
              ) : null}
            </dl>
            <p>
              <a href={contact.profile} target="_blank" rel="noreferrer">
                Company profile
              </a>
            </p>
          </div>
          <p className="legal">
            <span>All rights reserved. © 2026 AgriFuel Green Energy.</span>
            <a href="https://www.growhivemedea.com" target="_blank" rel="noreferrer">Designed by Grohive Media</a>
          </p>
        </div>
      </footer>
    </>
  );
}

function Home({ slide, moveSlide }) {
  const current = slides[slide];
  const [figure, setFigure] = useState(0);
  const [touchX, setTouchX] = useState(null);
  const [voice, setVoice] = useState(0);
  const moveFigure = (step) => setFigure((index) => (index + step + figures.length) % figures.length);
  const moveVoice = (step) => setVoice((index) => (index + step + voices.length) % voices.length);
  return (
    <>
      <section className="hero" id="top" aria-roledescription="carousel" aria-label="AgriFuel">
        {slides.map((item, index) => (
          <article
            key={item.title}
            className={`${index === slide ? "slide on" : "slide"}${item.fade ? " fade" : ""}`}
            aria-hidden={index !== slide}
          >
            <img src={item.image} alt={index === slide ? item.alt : ""} style={{ objectPosition: item.focus }} />
            <div className="hero-shade" />
            <div className="wrap hero-copy">
              <p className="kicker">AgriFuel Green Energy</p>
              <h1>{item.title}</h1>
              <p className="lede">{item.text}</p>
            </div>
          </article>
        ))}
        <button className="hero-arrow prev" type="button" onClick={() => moveSlide(-1)} aria-label="Previous">
          <Chevron dir="prev" />
        </button>
        <button className="hero-arrow next" type="button" onClick={() => moveSlide(1)} aria-label="Next">
          <Chevron dir="next" />
        </button>
        <p className="sr" aria-live="polite">
          {current.title}
        </p>
      </section>

      <section className="pillars" aria-label="What AgriFuel stands for">
        <div className="wrap">
          <div className="pillar-grid">
            {pillars.map((item) => (
              <article key={item.id} className={item.mobile ? "mobile-only" : undefined}>
                <ValueIcon name={item.id} />
                <h2>{item.title}</h2>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="who-home" id="about">
        <div className="wrap about-grid who-grid">
          <img className="who-photo" src={photos.who.src} alt={photos.who.alt} />
          <div className="who-copy">
            <h2>Who we are</h2>
            <div className="who-desc">
              <p>Industrial and domestic thermal energy, upcycled from agricultural waste.</p>
              <p>
                AgriFuel Green Energy engineers high-density, 100% smokeless eco-briquettes from crop waste. They replace coal and wood charcoal for industrial boilers, livestock brooding, commercial kitchens, and households across Zambia.
              </p>
              <p>
                Headquartered in Lusaka, AgriFuel is a clean-tech enterprise turning agricultural residue into high-caloric thermal fuel.
              </p>
              <p>
                Every year, thousands of tons of crop waste are burned openly or discarded across Zambia, while industries and households face rising fuel costs, energy load-shedding, and deforestation. AgriFuel turns that farm waste into briquettes for the stoves, brooders, kilns, and steam boilers already in use.
              </p>
            </div>
            <a className="learn-more" href="#about">
              <span>Learn more</span>
              <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
                <path d="M2.5 8h10M8.5 4.2 12.3 8 8.5 11.8" fill="none" stroke="currentColor" strokeWidth="1.4" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      <section className="figures" style={{ backgroundImage: `url(${photos.numbers})` }}>
        <div className="wrap">
          <h2 className="figures-title">Who we serve</h2>
          <div
            className="figure-grid"
            onTouchStart={(event) => setTouchX(event.changedTouches[0].clientX)}
            onTouchEnd={(event) => {
              if (touchX == null) return;
              const move = event.changedTouches[0].clientX - touchX;
              if (move > 40) moveFigure(-1);
              if (move < -40) moveFigure(1);
              setTouchX(null);
            }}
          >
            {figures.map((item, index) => (
              <article key={item.value} className={index === figure ? "on" : ""}>
                <FigureIcon name={item.value} />
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </article>
            ))}
          </div>
          <div className="figure-dots">
            {figures.map((item, index) => (
              <button
                key={item.value}
                type="button"
                className={index === figure ? "on" : ""}
                aria-label={item.value}
                onClick={() => setFigure(index)}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="wrap about-grid">
          <img src={photos.about.src} alt={photos.about.alt} style={{ objectPosition: photos.about.focus }} />
          <div>
            <p className="kicker dark">The product</p>
            <h2>Engineered for maximum thermal efficiency.</h2>
            <div className="prose">
              <p>No equipment retrofitting required. Built to drop directly into your existing combustion systems.</p>
              <p>
                Micro and domestic packs, in pillow and hexagonal form, are for households and stalls. A load is made to burn for 4–5 hours, smokeless and ash-reduced, in K10 micro-packs and 25kg bags.
              </p>
              <p>
                Heavy industrial logs, with a central air hole, are for boilers, kilns and steam, as a direct replacement for industrial coal and firewood.
              </p>
            </div>
            <p>
              <a className="text-link" href="#products">
                See the briquette
              </a>
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="bands">
          <a className="band" href="#projects">
            <img src={photos.work.src} alt="" style={{ objectPosition: photos.work.focus }} />
            <span>
              <strong>Projects</strong>
              <em>Proven in the field. Engineered for scale.</em>
            </span>
          </a>
          <a className="band" href="#sustainability">
            <img src={photos.pageSustain} alt="" style={{ objectPosition: "68% 48%" }} />
            <span>
              <strong>Sustainability</strong>
              <em>0% forest destruction. Crop waste becomes the fuel. Standing trees stay standing.</em>
            </span>
          </a>
        </div>
      </section>

      <section className="voices-band">
        <img src={photos.voices} alt="" />
        <div className="wrap">
          <div className="section-head">
            <h2>What our people say about us.</h2>
          </div>
          <ul
            className="voices"
            onTouchStart={(event) => setTouchX(event.changedTouches[0].clientX)}
            onTouchEnd={(event) => {
              if (touchX == null) return;
              const move = event.changedTouches[0].clientX - touchX;
              if (move > 40) moveVoice(-1);
              if (move < -40) moveVoice(1);
              setTouchX(null);
            }}
          >
            {voices.map((item, index) => (
              <li key={item.who} className={index === voice ? "on" : ""}>
                <div className="voice-stars" aria-hidden="true">
                  {Array.from({ length: 5 }, (_, index) => (
                    <svg key={index} viewBox="0 0 20 20">
                      <path d="M10 1.6l2.2 4.6 5.1.7-3.7 3.6.9 5.1L10 13.2 5.5 15.6l.9-5.1L2.7 6.9l5.1-.7z" />
                    </svg>
                  ))}
                </div>
                <blockquote>
                  <p>&ldquo;{item.quote}&rdquo;</p>
                </blockquote>
                <div className="voice-person">
                  <div className="voice-photo">
                    {item.image ? (
                      <img src={item.image} alt="" />
                    ) : (
                      <span className="voice-initials" aria-hidden="true">
                        {item.who
                          .split(/\s+/)
                          .slice(0, 2)
                          .map((part) => part[0])
                          .join("")
                          .toUpperCase()}
                      </span>
                    )}
                    <svg viewBox="0 0 77 77" aria-hidden="true">
                      <ellipse cx="38.5" cy="38.5" rx="37.5" ry="37.5" />
                    </svg>
                  </div>
                  <div>
                    <strong>{item.who}</strong>
                    <span>{item.role}</span>
                    <span>{item.company}</span>
                  </div>
                  <svg className="voice-mark" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M9.2 6.2H5.4C4.1 6.2 3 7.3 3 8.6V12h3.6v3.4H4.2C3.1 15.4 2.2 14.5 2.2 13.4V8.4C2.2 6.5 3.7 5 5.6 5h3.6v1.2zm11.2 0h-3.8c-1.3 0-2.4 1.1-2.4 2.4V12H18v3.4h-2.4c-1.1 0-2-.9-2-2V8.4C13.6 6.5 15.1 5 17 5h3.4v1.2z" />
                  </svg>
                </div>
              </li>
            ))}
          </ul>
          <div className="voice-nav">
            <button type="button" className="voice-arrow" aria-label="Previous" onClick={() => moveVoice(-1)}>
              <Chevron dir="prev" />
            </button>
            <div className="voice-bars">
              {voices.map((item, index) => (
                <button
                  key={item.who}
                  type="button"
                  className={index === voice ? "on" : ""}
                  aria-label={item.who}
                  onClick={() => setVoice(index)}
                />
              ))}
            </div>
            <button type="button" className="voice-arrow" aria-label="Next" onClick={() => moveVoice(1)}>
              <Chevron dir="next" />
            </button>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head media-head">
            <div>
              <p className="kicker dark">Media</p>
              <p>Stories that matter. Watch our impact.</p>
            </div>
            {videos.length > 0 && (
              <a className="btn btn-line" href="#media">
                View all
              </a>
            )}
          </div>
          <VideoList items={videos.slice(0, 3)} />
        </div>
      </section>

      <section className="section section-alt partners" aria-label="Our partners">
        <div className="wrap">
          <div className="section-head">
            <p className="kicker dark">Partners</p>
            <h2>Our partners.</h2>
          </div>
          {partners.length ? (
            <ul className="partner-logos">
              {partners.map((item) => (
                <li key={item.src}>
                  <img src={item.src} alt={item.name} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="partner-empty">Partner logos will appear here.</p>
          )}
        </div>
      </section>

      <section className="partner-band">
        <div className="wrap partner-inner">
          <div>
            <p className="kicker">Fuel supply</p>
            <h2>Ready to lower your fuel costs?</h2>
            <p>
              Whether you require bulk industrial supply for steam boilers, multi-ton logistics for poultry farms, or retail micro-packs for local distribution, our team is ready to deliver.
            </p>
          </div>
          <a className="btn btn-light" href="#contact">
            Get a quote for bulk order
          </a>
        </div>
      </section>
    </>
  );
}

function AboutPage() {
  return (
    <>
      <PageHero image={photos.pageAbout} title="About the company" focus="68% 40%" />
      <section className="section">
        <div className="wrap about-grid who-grid who-grid-end">
          <div>
            <p className="kicker dark">About us</p>
            <h2>Industrial and domestic thermal energy, upcycled from agricultural waste.</h2>
            <div className="prose">
              <p>
                AgriFuel Green Energy engineers high-density, 100% smokeless eco-briquettes from crop waste. They replace coal and wood charcoal for industrial boilers, livestock brooding, commercial kitchens, and households across Zambia.
              </p>
              <p>
                Headquartered in Lusaka, AgriFuel is a clean-tech enterprise turning agricultural residue into high-caloric thermal fuel.
              </p>
              <p>
                Every year, thousands of tons of crop waste are burned openly or discarded across Zambia, while industries and households face rising fuel costs, energy load-shedding, and deforestation. AgriFuel turns that farm waste into briquettes for the stoves, brooders, kilns, and steam boilers already in use.
              </p>
              <p>
                <a className="btn btn-line" href={contact.profile} target="_blank" rel="noreferrer">
                  Company profile
                </a>
              </p>
            </div>
          </div>
          <img className="who-photo" src={photos.who.src} alt={photos.who.alt} />
        </div>
      </section>
      <section className="section section-alt" id="work">
        <div className="wrap work-grid">
          <img src={photos.work.src} alt={photos.work.alt} style={{ objectPosition: photos.work.focus }} />
          <div>
            <p className="kicker dark">How we work</p>
            <h2>From farm waste to a fuel that fits the fire you have.</h2>
            <div className="work-list">
              {work.map((item) => (
                <article key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                  <p className="value">{item.value}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ProductsPage() {
  const { band, story, close } = productStory;
  return (
    <>
      <PageHero image={photos.pageProduct} title="The briquette" focus="center 46%" />
      <div className="sol-page">
        <section className="sol-band" style={{ backgroundImage: `url(${band.image})`, backgroundPosition: band.focus }}>
          <div className="wrap sol-band-inner">
            <div className="sol-panel">
              <h2 className="sol-title">
                <span>{band.title}</span>
              </h2>
              <p>{band.text}</p>
            </div>
          </div>
        </section>
        <section className="sol-story">
          <div className="wrap sol-story-grid">
            <div>
              <h2 className="sol-title">
                <span>{story.title}</span>
              </h2>
              {story.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <img src={story.image} alt={story.alt} style={{ objectPosition: story.focus }} />
          </div>
        </section>
        <section className="sol-close" style={{ backgroundImage: `url(${close.image})`, backgroundPosition: close.focus }}>
          <div className="wrap">
            <h2>{close.title}</h2>
            <a href={close.href}>
              {close.label}
              <Chevron dir="next" />
            </a>
          </div>
        </section>
      </div>
    </>
  );
}

function SolutionsPage() {
  return (
    <>
      <PageHero image={photos.pageSolutions} title="Where it is used" focus="center 58%" />
      <section className="prod-page">
        <div className="wrap">
          {sectors.map((item) => (
            <article className="prod-row" key={item.id} id={item.id}>
              <div className="prod-copy">
                <div>
                  <h2>{item.title}</h2>
                  <p>{item.text}</p>
                </div>
                <a className="prod-ask" href="#contact" aria-label={`Get a quote for ${item.title}`}>
                  <Chevron dir="next" />
                </a>
              </div>
              <div className="prod-photo">
                <img src={item.image} alt={item.alt} style={{ objectPosition: item.focus }} />
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

function ProjectsPage() {
  const count = projects.length;
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (!count) return undefined;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return undefined;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % count);
    }, 8000);
    return () => window.clearInterval(timer);
  }, [count]);
  if (!count) {
    return (
      <section className="project-page">
        <div className="wrap">
          <h1 className="project-title">
            <span>Projects & Field Deployments</span>
          </h1>
          <p className="story-empty">Projects will appear here once they are published.</p>
        </div>
      </section>
    );
  }
  const safeIndex = index % count;
  const go = (step) => setIndex((current) => (current + step + count) % count);
  const current = projects[safeIndex];
  return (
    <section className="project-page">
      <div className="wrap">
        <h1 className="project-title">
          <span>Projects & Field Deployments</span>
        </h1>
        <div className="project-stage">
          <div
            key={current.slug}
            className="project-bg"
            style={{ backgroundImage: current.image ? `url(${current.image})` : "none", backgroundPosition: current.focus }}
          />
          <div key={`copy-${current.slug}`} className="project-copy">
            <h2>{current.title}</h2>
            <p>{current.text}</p>
          </div>
          <div className="project-thumbs">
            <div className="project-thumb-row">
              {projects.map((item, itemIndex) => (
                <button
                  key={item.slug}
                  type="button"
                  className={itemIndex === safeIndex ? "is-on" : ""}
                  onClick={() => setIndex(itemIndex)}
                  aria-label={item.title}
                >
                  <img src={item.image} alt="" style={{ objectPosition: item.focus }} />
                </button>
              ))}
            </div>
            <div className="project-controls">
              <button type="button" onClick={() => go(-1)} aria-label="Previous project">
                <Chevron dir="prev" />
              </button>
              <button type="button" onClick={() => go(1)} aria-label="Next project">
                <Chevron dir="next" />
              </button>
              <span className="project-line" />
              <div className="project-nums" aria-hidden="true">
                {projects.map((item, itemIndex) => {
                  let difference = itemIndex - safeIndex;
                  const half = Math.floor(count / 2);
                  if (difference > half) difference -= count;
                  if (difference < -half) difference += count;
                  return (
                    <span
                      key={item.slug}
                      style={{
                        transform: `rotateX(${difference * 30}deg) translate3d(0, ${difference * 30}px, 0)`,
                        opacity: 1 - Math.abs(difference),
                      }}
                    >
                      {itemIndex + 1}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="project-cards">
          {projects.map((item) => (
            <article key={item.slug}>
              <div className="project-card">
                <div className="project-card-pic">
                  <img src={item.image} alt="" style={{ objectPosition: item.focus }} />
                </div>
                <div>
                  <h2>{item.title}</h2>
                  <p>{item.text}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const SDGS = [
  {
    n: "3",
    name: "Good health and well-being",
    text: "A 100% smokeless burn for kitchens, brooders and boiler houses, with ash kept down.",
    tone: "health",
  },
  {
    n: "7",
    name: "Affordable and clean energy",
    text: "Solid fuel for the fire already running, in place of coal and wood charcoal.",
    tone: "energy",
  },
  {
    n: "12",
    name: "Responsible consumption and production",
    text: "Crop waste that would be burned in the open becomes the fuel.",
    tone: "consume",
  },
  {
    n: "13",
    name: "Climate action",
    text: "Coal and wood charcoal are what the briquette is built to replace.",
    tone: "climate",
  },
  {
    n: "15",
    name: "Life on land",
    text: "0% forest destruction. The briquette does not begin with a felled tree.",
    tone: "land",
  },
];

function SustainPage() {
  return (
    <>
      <PageHero className="hands" image={photos.pageSustain} title="Sustainability" focus="68% 48%" />
      <section className="section sustain-vision">
        <div className="wrap">
          <p className="kicker dark">Vision</p>
          <h2>Powering growth. Preserving forests.</h2>
          <p className="sustain-lead">
            Homes, farms and boilers in Zambia running on crop residue, with the forest left standing.
          </p>
          <p className="prose-line">
            Crop waste that would be burned in the open becomes the fuel. Coal and wood charcoal are what the briquette is built to replace. The claim on the forest is simple: 0% forest destruction.
          </p>
        </div>
      </section>

      <section className="section section-alt">
        <div className="wrap">
          <div className="section-head">
            <p className="kicker dark">The product</p>
            <h2>How the briquette supports sustainability.</h2>
          </div>
          <div className="sustain-ways">
            <article>
              <h3>Agricultural waste, not standing timber</h3>
              <p>Crop waste is the feedstock. The briquette does not begin with a felled tree.</p>
            </article>
            <article>
              <h3>100% smokeless</h3>
              <p>A cleaner burn for kitchens, brooders and boiler houses, with ash kept down.</p>
            </article>
            <article>
              <h3>The equipment stays</h3>
              <p>Stoves, brooders, kilns and high-pressure steam boilers already in use take the fuel. No retrofitting is required.</p>
            </article>
            <article>
              <h3>SIA Zambia 2026</h3>
              <p>Social Impact Award winner, after field trials that held a full meal on one load and cut indoor smoke against wood charcoal.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <p className="kicker dark">SDG alignment</p>
            <h2>Five goals the fuel lines up with.</h2>
          </div>
          <ul className="sdg-row">
            {SDGS.map((item) => (
              <li key={item.n} className={`sdg sdg-${item.tone}`}>
                <strong>{item.n}</strong>
                <em>{item.name}</em>
                <span>{item.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="sustain-impact">
        <div className="wrap">
          <p className="kicker">Impact</p>
          <h2>Placed where the fuel is used.</h2>
          <div className="impact-grid">
            <article>
              <h3>On the forest</h3>
              <p>0% forest destruction. Standing trees stay standing.</p>
            </article>
            <article>
              <h3>In the air</h3>
              <p>100% smokeless, with indoor smoke cut against wood charcoal.</p>
            </article>
            <article>
              <h3>In the waste</h3>
              <p>Maize cobs, shells, husks, peels and stalks become the load.</p>
            </article>
            <article>
              <h3>In the field</h3>
              <p>SIA Zambia 2026. One load held a full meal in the trials.</p>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}

function MediaPage() {
  return (
    <>
      <PageHero image={photos.pageMedia} title="Media" focus="center 45%" />
      <section className="section">
        <div className="wrap">
          <div className="section-head" id="stories">
            <p className="kicker dark">Stories</p>
            <p>Stories that matter. Watch our impact.</p>
          </div>
          <VideoList items={videos} />
        </div>
      </section>
      <section className="section section-alt" id="news">
        <div className="wrap">
          <div className="section-head">
            <p className="kicker dark">News impact</p>
            <p>Our growth.</p>
          </div>
          <StoryList items={news} />
        </div>
      </section>
    </>
  );
}

function NewsPage({ slug }) {
  const item = news.find((entry) => entry.slug === slug);
  if (!item) {
    return (
      <section className="section">
        <div className="wrap section-head">
          <p className="kicker dark">News impact</p>
          <h2>That story is not on the site.</h2>
          <p>
            <a className="text-link" href="#media/news">
              Back to news
            </a>
          </p>
        </div>
      </section>
    );
  }
  return (
    <>
      <PageHero image={item.image || photos.pageMedia} title={item.title} focus="center 45%" />
      <section className="section">
        <div className="wrap story-body">
          <p className="kicker dark">{item.kind}</p>
          <p className="story-date">{formatStoryDate(item.date)}</p>
          {item.summary ? <p className="lede-dark">{item.summary}</p> : null}
          <StoryBody text={item.body} />
          <p>
            <a className="text-link" href="#media/news">
              All news
            </a>
          </p>
        </div>
      </section>
    </>
  );
}

function StoryList({ items }) {
  if (!items.length) {
    return <p className="story-empty">Coming soon</p>;
  }
  return (
    <ul className="story-cards">
      {items.map((item) => (
        <li key={item.slug}>
          <a className="story-card" href={`#news/${item.slug}`}>
            <div className="story-card-pic">
              {item.image ? <img src={item.image} alt="" /> : <div className="story-fallback" />}
            </div>
            <div className="story-card-text">
              {item.date ? (
                <span className="story-card-date">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <rect x="3.5" y="5" width="17" height="15.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
                    <path d="M3.5 10h17M8 3v4M16 3v4" fill="none" stroke="currentColor" strokeWidth="1.6" />
                  </svg>
                  <span>{formatStoryCardDate(item.date)}</span>
                </span>
              ) : null}
              <p className="story-card-kind">{item.kind || "Story"}</p>
              <h3>{item.title}</h3>
              <span className="story-card-more">
                Read More
                <svg viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M2 8h11M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.4" />
                </svg>
              </span>
            </div>
          </a>
        </li>
      ))}
    </ul>
  );
}

function VideoList({ items }) {
  const [playing, setPlaying] = useState("");
  if (!items.length) {
    return <p className="story-empty">Coming soon</p>;
  }
  return (
    <ul className="story-cards">
      {items.map((item) => {
        const on = playing === item.slug;
        return (
          <li key={item.slug}>
            <article className={`story-card video-card${on ? " playing" : ""}`}>
              <div className="story-card-pic">
                {on ? (
                  <iframe
                    src={`${item.embed}&autoplay=1`}
                    title={item.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                ) : (
                  <>
                    <img src={item.thumb} alt="" />
                    <button type="button" className="video-play" aria-label={`Play ${item.title}`} onClick={() => setPlaying(item.slug)}>
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M9 7.5v9l8-4.5-8-4.5z" />
                      </svg>
                    </button>
                  </>
                )}
              </div>
              <div className="story-card-text">
                {item.date ? (
                  <span className="story-card-date">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <rect x="3.5" y="5" width="17" height="15.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
                      <path d="M3.5 10h17M8 3v4M16 3v4" fill="none" stroke="currentColor" strokeWidth="1.6" />
                    </svg>
                    <span>{formatStoryCardDate(item.date)}</span>
                  </span>
                ) : null}
                <p className="story-card-kind">Video</p>
                <h3>{item.title}</h3>
                {on ? (
                  <a className="story-card-more" href={item.watch} target="_blank" rel="noreferrer">
                    YouTube
                    <svg viewBox="0 0 16 16" aria-hidden="true">
                      <path d="M2 8h11M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.4" />
                    </svg>
                  </a>
                ) : (
                  <button type="button" className="story-card-more" onClick={() => setPlaying(item.slug)}>
                    Watch
                    <svg viewBox="0 0 16 16" aria-hidden="true">
                      <path d="M2 8h11M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.4" />
                    </svg>
                  </button>
                )}
              </div>
            </article>
          </li>
        );
      })}
    </ul>
  );
}

function StoryBody({ text }) {
  const blocks = text.split(/\n{2,}/).map((block) => block.trim()).filter(Boolean);
  return (
    <div className="prose">
      {blocks.map((block) => (
        <p key={block.slice(0, 48)}>{block}</p>
      ))}
    </div>
  );
}

function ContactPage({
  orderForm,
  setOrderForm,
  orderError,
  submitOrder,
  slip,
  supplyForm,
  setSupplyForm,
  supplyError,
  submitSupply,
  supplySlip,
  copied,
  copyText,
  whatsappHref,
}) {
  return (
    <>
      <PageHero className="contact-hero" image={photos.pageContact} title="Saving the forest, one briquette at a time." focus="center 40%" />
      <section className="section supply-section" id="talk">
        <div className="wrap supply-card">
          <div className="supply-intro">
            <p className="kicker dark">Fuel supply</p>
            <h2>Ready to lower your fuel costs?</h2>
            <p>
              Whether you require bulk industrial supply for steam boilers, multi-ton logistics for poultry farms, or retail micro-packs for local distribution, our team is ready to deliver.
            </p>
            <p className="quote-aside">Tell us the sector and the fuel you need. We reply to arrange supply.</p>
            <Address className="address quote-aside" />
            <dl className="reach reach-card">
              <div>
                <dt>Phone</dt>
                <dd>
                  <a href={`tel:${contact.phoneDisplay.replace(/\s/g, "")}`}>{contact.phoneDisplay}</a>
                </dd>
              </div>
              <div>
                <dt>Email</dt>
                <dd>
                  <a href={`mailto:${contact.email}`}>
                    {contact.email.split("@")[0]}@<wbr />
                    {contact.email.split("@")[1]}
                  </a>
                </dd>
              </div>
            </dl>
          </div>
          <form className="supply-form" onSubmit={submitOrder}>
            <div className="supply-fields">
              <label>
                Name / Business name
                <input
                  value={orderForm.name}
                  onChange={(event) => setOrderForm({ ...orderForm, name: event.target.value })}
                  autoComplete="name"
                />
              </label>
              <label>
                Sector
                <select
                  value={orderForm.interest}
                  onChange={(event) => setOrderForm({ ...orderForm, interest: event.target.value })}
                >
                  {interests.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </label>
              <label>
                Estimated fuel requirement (tons or bags)
                <input
                  value={orderForm.note}
                  onChange={(event) => setOrderForm({ ...orderForm, note: event.target.value })}
                  placeholder="Tons or bags"
                />
              </label>
              <label>
                Email / WhatsApp number
                <input
                  value={orderForm.phone}
                  onChange={(event) => setOrderForm({ ...orderForm, phone: event.target.value })}
                  autoComplete="email"
                  placeholder="Email or 09…"
                />
              </label>
            </div>
            {orderError && (
              <p className="form-error" role="alert">
                {orderError}
              </p>
            )}
            <button className="btn" type="submit">
              Get a quote for bulk order
            </button>
            {slip && (
              <Slip
                title={slip.code}
                message={slip.message}
                copied={copied === "order"}
                onCopy={() => copyText(slip.message, "order")}
                href={whatsappHref(slip.message)}
              />
            )}
          </form>
        </div>
      </section>

      <section className="partner-band forest-band" style={{ backgroundImage: `url(${photos.forest})` }}>
        <div className="wrap partner-inner">
          <div>
            <p className="kicker">The briquette</p>
            <h2>The fuel is ready to talk about.</h2>
            <p>See what we sell, then send a note if it fits the fire you run.</p>
          </div>
          <a className="btn btn-light" href="#products">
            See the briquette
          </a>
        </div>
      </section>

      <section className="section section-alt supply-section" id="supply">
        <div className="wrap supply-card">
          <div className="supply-intro">
            <p className="kicker dark">Crop residue</p>
            <h2>If you have a leftover, we want to hear about it.</h2>
            <p>
              Farms and yards with maize cobs, shells, husks, peels or stalks can offer that material. It is the start of the fuel.
            </p>
            <ul className="ticks">
              {CROPS.map((crop) => (
                <li key={crop}>{crop}</li>
              ))}
            </ul>
          </div>
          <form className="supply-form" onSubmit={submitSupply}>
            <div className="supply-fields">
              <label>
                Name
                <input
                  value={supplyForm.name}
                  onChange={(event) => setSupplyForm({ ...supplyForm, name: event.target.value })}
                  autoComplete="name"
                />
              </label>
              <label>
                Phone
                <input
                  value={supplyForm.phone}
                  onChange={(event) => setSupplyForm({ ...supplyForm, phone: event.target.value })}
                  autoComplete="tel"
                  inputMode="tel"
                  placeholder="09…"
                />
              </label>
              <label>
                Location
                <input
                  value={supplyForm.area}
                  onChange={(event) => setSupplyForm({ ...supplyForm, area: event.target.value })}
                  placeholder="Farm, yard, or area"
                />
              </label>
              <label>
                Residue
                <select
                  value={supplyForm.crop}
                  onChange={(event) => setSupplyForm({ ...supplyForm, crop: event.target.value })}
                >
                  {CROPS.map((crop) => (
                    <option key={crop}>{crop}</option>
                  ))}
                </select>
              </label>
              <label className="wide">
                Rough amount
                <input
                  value={supplyForm.volume}
                  onChange={(event) => setSupplyForm({ ...supplyForm, volume: event.target.value })}
                  placeholder="A heap, a store, or a short description"
                />
              </label>
              <label className="wide">
                Note
                <textarea
                  rows="2"
                  value={supplyForm.note}
                  onChange={(event) => setSupplyForm({ ...supplyForm, note: event.target.value })}
                />
              </label>
            </div>
            {supplyError && (
              <p className="form-error" role="alert">
                {supplyError}
              </p>
            )}
            <button className="btn" type="submit">
              Prepare supply note
            </button>
            {supplySlip && (
              <Slip
                title={supplySlip.code}
                message={supplySlip.message}
                copied={copied === "supply"}
                onCopy={() => copyText(supplySlip.message, "supply")}
                href={whatsappHref(supplySlip.message)}
              />
            )}
          </form>
        </div>
      </section>
    </>
  );
}

function Address({ className = "address" }) {
  const query = encodeURIComponent(contact.address.join(", "));
  return (
    <address className={className}>
      <a
        href={`https://www.google.com/maps/search/?api=1&query=${query}`}
        target="_blank"
        rel="noreferrer"
      >
        {contact.address.map((line) => (
          <span key={line}>{line}</span>
        ))}
      </a>
    </address>
  );
}

function PageHero({ image, title, focus, className = "" }) {
  return (
    <section className={className ? `page-hero ${className}` : "page-hero"}>
      <img src={image} alt="" style={{ objectPosition: focus }} />
      <div className="wrap">
        <h1>{title}</h1>
      </div>
    </section>
  );
}

function Slip({ title, message, copied, onCopy, href }) {
  return (
    <div className="slip">
      <p>
        Ready to send · <strong>{title}</strong>
      </p>
      <textarea readOnly value={message} aria-label="Message to send AgriFuel" />
      <div className="slip-actions">
        <button type="button" className="btn btn-line" onClick={onCopy}>
          {copied ? "Copied" : "Copy"}
        </button>
        {href ? (
          <a className="btn" href={href} target="_blank" rel="noreferrer">
            Send on WhatsApp
          </a>
        ) : (
          <p>Copy this and send it to AgriFuel. We will reply to take the next step.</p>
        )}
      </div>
    </div>
  );
}

function ValueIcon({ name }) {
  const paths = {
    air: "M4 15c2.2-1.2 3.4-1.2 5.2.2 1.6 1.2 2.8 1.2 4.4-.2 1.8-1.6 3-1.6 5.2.2M4 10.2c2.2-1.2 3.4-1.2 5.2.2 1.6 1.2 2.8 1.2 4.4-.2 1.8-1.6 3-1.6 5.2.2",
    waste: "M12 19.5c3.6-1.8 5.4-4.6 5.4-7.6C17.4 7.6 14.8 5.2 12 3.8 9.2 5.2 6.6 7.6 6.6 11.9c0 3 1.8 5.8 5.4 7.6z",
    uses: "M7.5 13.2h9l-.7 5.2H8.2l-.7-5.2zM8.6 13.2c.3-2.2 1.6-3.6 3.4-3.6s3.1 1.4 3.4 3.6",
    heat: "M11 17l2 2a1 1 0 1 0 3-3M14 14l2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4M21 3l1 11h-2M3 3L2 14l6.5 6.5a1 1 0 1 0 3-3M3 4h8",
    local: "M12 4.5 14.2 9l4.8.4-3.7 3.1 1.2 4.7L12 15.2 7.5 17.2 8.7 12.5 5 9.4 9.8 9 12 4.5z",
    hours: "M12 5.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM12 8.2V12l2.6 1.6",
    results: "M5 16.8 9.4 12l2.5 2.3L19 7.4M14.5 7.4H19v4.4",
    sustain: "M12 19.6c-2.8 0-5.4-2-5.4-5.6 0-3 2.2-4.8 3.8-6.2.4 1.8 1.4 2.8 1.6 4 .6-1.4 1.8-2.8 3.6-3.6-.8 2-.2 3.6.2 4.8 1.4 3.2-.4 6.6-3.8 6.6z",
  };
  return (
    <svg className="value-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d={paths[name]} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FigureIcon({ name }) {
  const paths = {
    Households: "M4 11.2 12 4.8l8 6.4V19a1 1 0 0 1-1 1h-5.2v-4.6H10.2V20H5a1 1 0 0 1-1-1v-7.8z",
    Farmers: "M12 20.2c-3.4 0-6-2.4-6-6.2 0-3.2 2.4-5.4 4.2-7 .4 2 1.5 3 1.8 4.4.8-1.6 2-3.2 4-4.2-1 2.4-.4 4.2.2 5.6 1.6 3.8-.6 7.4-4.2 7.4z",
    Kitchens: "M8 4.5v6.2a2.2 2.2 0 0 0 4.4 0V4.5M10.2 10.7V19M15.2 4.8v14.2M17.6 7.2h-2.4",
    Industry: "M3.5 19.5h17M5 19.5V9.2L10.2 12V9.2L15.4 12V8.2L20.5 11v8.5",
  };
  return (
    <svg className="figure-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d={paths[name]} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function Chevron({ dir }) {
  const path = dir === "prev" ? "M14.5 5.5 8 12l6.5 6.5" : "M9.5 5.5 16 12l-6.5 6.5";
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
      <path d={path} fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

