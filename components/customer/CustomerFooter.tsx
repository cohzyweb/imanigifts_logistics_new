export default function CustomerFooter() {
  return (
    <footer className="bg-[#00442d] text-[#fff9eb] px-8 md:px-12 py-16 grid grid-cols-1 md:grid-cols-2 gap-10">
      <div className="space-y-5">
        <div className="text-xl font-bold" style={{fontFamily:"Manrope,sans-serif"}}>Imanigifts</div>
        <p className="text-emerald-100/60 max-w-xs text-sm leading-relaxed">A new era of logistics, defined by precision, heritage, and sustainable innovation.</p>
        <div className="flex gap-4">
          {["public","mail","call"].map(i => <span key={i} className="material-symbols-outlined text-emerald-100/50 hover:text-white cursor-pointer transition-colors">{i}</span>)}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-8">
        {[{t:"Logistics",l:["Services","Carrier Portal","Fleet"]},{t:"Company",l:["About Us","Sustainability","Contact"]},{t:"Legal",l:["Privacy","Terms","Insurance"]}].map(c => (
          <div key={c.t} className="space-y-3">
            <div className="font-bold uppercase tracking-widest text-xs">{c.t}</div>
            <ul className="space-y-2">{c.l.map(l => <li key={l}><a href="#" className="text-emerald-100/55 hover:text-white transition-colors text-sm">{l}</a></li>)}</ul>
          </div>
        ))}
      </div>
      <div className="md:col-span-2 pt-8 border-t border-emerald-900/50 text-emerald-100/40 text-sm">© 2026 Imanigifts Logistics. All rights reserved.</div>
    </footer>
  );
}
