export default function Icon({name,size=18,...props}){
  const p={
    chart:<><path d="M4 4v16h17M8 14l4-5 4 3 5-7"/></>,
    cards:<><rect x="7" y="3" width="13" height="17" rx="2"/><path d="m7 6-4 1v14l11 1 1-2M11 8h5m-5 4h5m-5 4h2"/></>,
    clock:<><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    star:<path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9Z"/>,
    search:<><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4 4"/></>,
    arrow:<path d="M5 12h14m-5-5 5 5-5 5"/>,
    up:<path d="M5 15 15 5M6 5h9v9"/>,
    close:<path d="m6 6 12 12M18 6 6 18"/>,
    check:<path d="m5 12 4 4L19 6"/>,
    refresh:<><path d="M20 10a8 8 0 0 0-14-5L3 8m0-5v5h5M4 14a8 8 0 0 0 14 5l3-3m0 5v-5h-5"/></>,
    help:<><circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 0 1 5 .5c0 1.5-2.5 1.5-2.5 3M12 16h.01"/></>,
    wallet:<><rect x="3" y="5" width="18" height="15" rx="3"/><path d="M3 8h18m0 4h-6v4h6M7 5V3h11v2"/></>,
    download:<><path d="M12 3v12m-5-5 5 5 5-5M4 17v4h16v-4"/></>,
    flip:<><rect x="6" y="3" width="12" height="18" rx="2"/><path d="M2 10 5 7l3 3m-3-3v8m17-1-3 3-3-3m3 3V9"/></>,
    candle:<><path d="M6 3v4m0 10v4M4 7h4v10H4zM17 3v8m0 6v4m-2-10h4v6h-4z"/></>,
    line:<path d="m3 17 5-7 5 3 8-9"/>,
    down:<path d="m7 9 5 5 5-5"/>,
    grid:<><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,
    list:<><path d="M8 5h13M8 12h13M8 19h13M3 5h.01M3 12h.01M3 19h.01"/></>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{p[name]||p.chart}</svg>;
}
