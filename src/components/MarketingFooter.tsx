import { useNavigate } from "react-router";
import Divider from "./ui/Divider";
import darkLogo from "../imports/Dark_BG-1.png";

export default function MarketingFooter() {
  const navigate = useNavigate();
  return (
    <footer className="relative z-10 border-t border-white/05 mt-24 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div>
            <img src={darkLogo} alt="Oceanier" className="h-7 w-auto mb-4" />
            <p className="text-sm text-foreground/35 leading-relaxed">The AI workforce platform for modern businesses. Deploy AI crews that work 24/7.</p>
          </div>
          {[
            { title: "Product", links: ["Features", "Pricing", "Solutions", "Roadmap"] },
            { title: "Company", links: ["About", "Blog", "Careers", "Contact"] },
            { title: "Legal", links: ["Privacy", "Terms", "Security", "Cookies"] },
          ].map(col => (
            <div key={col.title}>
              <h4 className="text-xs font-bold uppercase tracking-widest text-foreground/40 mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map(l => (
                  <li key={l}><button className="text-sm text-foreground/35 hover:text-foreground/70 transition-colors">{l}</button></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <Divider />
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 gap-4">
          <p className="text-xs text-foreground/25">© 2026 Oceanier. All rights reserved.</p>
          <div className="flex items-center gap-6">
            {["Twitter", "LinkedIn", "GitHub"].map(s => (
              <button key={s} className="text-xs text-foreground/25 hover:text-foreground/50 transition-colors">{s}</button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
