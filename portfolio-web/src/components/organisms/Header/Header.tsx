'use client'
import { LanguageSwitcher, ThemeToggle } from "@/components/atoms";
import MainImage from "@/components/atoms/MainImage/MainImage";
import { PortfolioHomeTemplateContent } from "@/components/templates";
import { useState, useRef, useEffect } from "react";
interface HeaderProps {
  avatarUrl: string;
  content: PortfolioHomeTemplateContent;
}

export function Header(data: HeaderProps) {
  const { avatarUrl, content } = data;
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  

  useEffect(() => {
    const handleCLickOutside = (event: MouseEvent) => {
        if(isOpen && menuRef.current && !menuRef.current.contains(event.target as Node))
            setIsOpen(false)
    }
    document.addEventListener("mousedown", handleCLickOutside);
    return () => {
        document.removeEventListener("mousedown", handleCLickOutside);
    }
  }, [isOpen])

  return (
    <header className="pointer-events-none fixed inset-x-0 top-3 z-50 ">
      <div 
      ref={menuRef}
      className="mx-auto flex w-full max-w-6xl justify-end px-6 md:px-12 group">
        <button
          className={`w-9 h-6 mt-4 lg:hidden block justify-around pointer-events-auto p-1 bg-transparent rounded-xl shadow-2xl text-2xl font-extrabold ${isOpen ? "text-error text-md": "text-muted"}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "✕" : (<div className="flex flex-col gap-1.5 justify-center items-center w-full h-full font-extrabold">
          <hr className="w-full"/>
          <hr className="w-full"/>
          <hr className="w-full"/>
          </div>)}
        </button>
        <section
          className={`
            /* Base: Interacción y Flex */
            pointer-events-auto flex items-center gap-3 transition-all duration-300
            
            /* Móvil: Posicionamiento y Visibilidad dinámica */
            ${isOpen ? "flex opacity-100 translate-y-0 flex-col" : "hidden lg:flex opacity-0 lg:opacity-100 -translate-y-4 lg:translate-y-0"}
            
            /* Estética de la tira (Control Strip) */
            control-strip w-fit rounded-2xl lg:rounded-full px-4 py-6 lg:py-3 shadow-2xl
            bg-white/80 dark:bg-black/80 backdrop-blur-xl
            
            /* Escritorio (lg: 1024px+) */
            lg:flex  lg:static lg:pointer-events-auto
          `}
        >
          <MainImage imageUrl={avatarUrl} />
          <a href="#certifications" className="chip chip-small" onClick={() => setIsOpen(false)}>
            {content.navCertifications}
          </a>
          <a href="#trayectoria" className="chip chip-small" onClick={() => setIsOpen(false)}>
            {content.navExperience}
          </a>
          <a href="#historia" className="chip chip-small" onClick={() => setIsOpen(false)}>
            {content.navStory}
          </a>
          <p className="text-xs uppercase tracking-[0.16em] text-muted">
            {content.controlsLanguage}
          </p>
          <LanguageSwitcher />
          <p className="text-xs uppercase tracking-[0.16em] text-muted">
            {content.controlsTheme}
          </p>
          <ThemeToggle
            darkLabel={content.themeDark}
            lightLabel={content.themeLight}
          />
        </section>
      </div>
    </header>
  );
}
