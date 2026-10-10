'use client'

// import { useState } from 'react'
// import { ArrowRight, Check, ChevronRight, Clock3, Home, Leaf, Menu, Play, ShieldCheck, Sparkles, Star, X } from 'lucide-react'
import PageShell from '@/components/PageShell'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import SubHero from '@/components/SubHero'

// const sourceImage = 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=85'

// const services = [
//   { title: 'Standard Cleaning', text: 'From basic to deep clean, our trusted team makes your home shine.', image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=700&q=80', icon: <Home size={18} /> },
//   { title: 'Move In / Move Out', text: 'Leave your old space fresh or start your new one spotless.', image: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=700&q=80', icon: <Sparkles size={18} /> },
//   { title: 'Deep Cleaning', text: 'A detailed refresh for every corner, surface, and hidden spot.', image: 'https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?auto=format&fit=crop&w=700&q=80', icon: <Leaf size={18} /> },
//   { title: 'Office Cleaning', text: 'A healthier, happier workplace your team can feel good in.', image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=700&q=80', icon: <ShieldCheck size={18} /> },
// ]

const locations = ['Spintex', 'Nungua', 'Klagon', 'Lashibi', 'Tema']

export default function Page() {
  // const [menuOpen, setMenuOpen] = useState(false)

  return (
    <main className="">
      <PageShell>
        {/* <Hero /> */}
        <SubHero />
      </PageShell>
      {/* <header className="topbar bg-black text-red-100">
        <a href="#top" className="brand" aria-label="getFitaa home"><span className="brand-mark"><Leaf size={20} fill="currentColor" /></span><span>get<span>Fitaa</span></span></a>
        <button className="menu-toggle" aria-label="Toggle menu" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
        <nav className={menuOpen ? 'nav-links open' : 'nav-links'}>
          <a className="active" href="#top">Home</a><a href="#services">Services</a><a href="#about">About</a><a href="#how">How it works</a><a href="#pricing">Pricing</a>
        </nav>
        <div className="top-actions"><a href="#login" className="login">Login</a><a href="#book" className="button small">Book a Clean <ArrowRight size={13} /></a></div>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy"><p className="eyebrow">ON-DEMAND CLEANING SERVICE</p><h1>A Cleaner Home,<br /><em>Made Easy.</em></h1><p className="hero-text">From deep order to detail, we make every corner feel fresh, welcoming, and truly yours.</p><div className="hero-actions"><a href="#book" className="button">Book a Clean <ArrowRight size={14} /></a><a href="#how" className="play-link"><span><Play size={12} fill="currentColor" /></span>How it works</a></div><div className="hero-features"><span><Check /> Vetted cleaners</span><span><Check /> Flexible booking</span><span><Check /> 100% happiness</span></div></div>
        <div className="hero-image" style={{ backgroundImage: `url(${sourceImage})` }} aria-label="Cleaner making a home sparkle" />
      </section>

      <section className="areas"><div className="area-label"><span>⌖</span> Service Areas</div>{locations.map((location) => <span key={location}>{location}</span>)}</section>

      <section className="section" id="services"><div className="section-heading"><div><p className="eyebrow">OUR SERVICES</p><h2>Choose The Right Clean For You</h2></div><a href="#services" className="text-link">View all services <ChevronRight size={15} /></a></div><div className="service-grid">{services.map((service) => <article className="service-card" key={service.title}><div className="service-image" style={{ backgroundImage: `url(${service.image})` }}><span>{service.icon}</span></div><h3>{service.title}</h3><p>{service.text}</p><a href="#book">Book Now <ArrowRight size={12} /></a></article>)}</div></section>

      <section className="feature section" id="about"><div className="feature-copy"><p className="eyebrow">WHAT WE DO</p><h2>What We Do</h2><p>Whether you need a quick refresh or a total reset, our professional team brings care, consistency, and a little extra sparkle to every visit.</p><a href="#book" className="button light">About Us <ArrowRight size={14} /></a></div><div className="feature-photo" style={{ backgroundImage: `url(${sourceImage})` }} /></section>

      <section className="testimonials section"><div className="section-heading centered"><div><p className="eyebrow">INSPIRING CLIENT EXPERIENCES</p><h2>Inspiring Client Experiences</h2><p>Love your space again, without the work.</p></div></div><div className="quote-grid">{[['“It’s so lovely to get home to a clean space. The whole process was seamless.”','Ama Serwaa'],['“Professional, thoughtful, and so easy to book. I’m already recommending getFitaa.”','Jane Doe'],['“Our office has never felt this fresh. The team is punctual and wonderful.”','John Doe']].map(([quote, name]) => <div className="quote" key={name}><p>{quote}</p><div className="stars">★★★★★</div><strong>- {name}</strong></div>)}</div><div className="dots"><b /><span /><span /></div></section>

      <section className="how" id="how"><p className="eyebrow">HOW IT WORKS</p><h2>How It Works</h2><p>Book in only simple steps and enjoy a spotless space.</p><div className="steps">{[['1', 'Choose your clean', 'Tell us what your space needs'], ['2', 'Pick a time', 'Choose a convenient date'], ['3', 'Relax', 'We bring the sparkle'], ['4', 'Love your space', 'Enjoy a cleaner home']].map(([number, title, text], index) => <div className="step" key={number}><div className="step-icon">{index === 0 ? <Leaf /> : index === 1 ? <Clock3 /> : index === 2 ? <Home /> : <Check />}</div><b>{number}. {title}</b><span>{text}</span>{index < 3 && <ArrowRight className="step-arrow" />}</div>)}</div></section>

      <section className="price section" id="pricing"><div className="price-image" style={{ backgroundImage: `url(${sourceImage})` }} /><div className="price-copy"><p className="eyebrow">FAIR PRICES</p><h2>Fair Prices No Surprises</h2><p>Simple, transparent pricing, and dependable cleaning that fits your lifestyle.</p><a href="#book" className="button">View Pricing <ArrowRight size={14} /></a></div></section>

      <footer><div className="footer-brand"><a className="brand" href="#top"><span className="brand-mark"><Leaf size={20} fill="currentColor" /></span><span>get<span>Fitaa</span></span></a><p>A cleaner home, a clearer mind.<br />Simple, fresh, reliable care.</p></div><div><h4>Navigation</h4><a href="#services">Services</a><a href="#about">About us</a><a href="#how">How it works</a><a href="#pricing">Pricing</a></div><div><h4>Contact</h4><a href="tel:+233000000000">+233 00 000 0000</a><a href="mailto:hello@getfitaa.com">hello@getfitaa.com</a></div><div><h4>Address</h4><p>Accra, Ghana<br />Serving your neighborhood, one clean at a time.</p></div><div className="footer-bottom"><span>© 2026 getFitaa. All Rights Reserved</span><span>Terms of Service &nbsp;&nbsp; Privacy Policy</span></div></footer>
    </main> */}
    </main>
  )
}
