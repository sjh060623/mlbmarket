import './globals.css';
export const viewport={width:'device-width',initialScale:1,viewportFit:'cover',themeColor:'#080a0f'};
export const metadata = { title: 'PLAYER MARKET | 거래소', description: '선수 마켓, 가상 포인트 거래, 스포츠 카드 보관함.', appleWebApp:{capable:true,statusBarStyle:'black-translucent',title:'PLAYER MARKET'} };
export default function RootLayout({ children }) { return <html lang="ko"><body>{children}</body></html>; }
