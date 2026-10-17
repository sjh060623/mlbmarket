'use client';
import {cardSVG,PROFILES} from '../lib/cards';
export default function SportsCard({player,card,quantity=0,back=false,onClick,mini=false}){
  const Tag=onClick?'button':'div';
  function tilt(e){if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;const r=e.currentTarget.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;e.currentTarget.style.setProperty('--rx',`${(y-.5)*-9}deg`);e.currentTarget.style.setProperty('--ry',`${(x-.5)*12}deg`);e.currentTarget.style.setProperty('--mx',`${x*100}%`);e.currentTarget.style.setProperty('--my',`${y*100}%`);}
  return <Tag type={onClick?'button':undefined} onClick={onClick} className={`sports-card ${mini?'mini':''}`} style={{'--card-accent':PROFILES[player.id].accent}} onPointerMove={tilt} onPointerLeave={e=>{e.currentTarget.style.setProperty('--rx','0deg');e.currentTarget.style.setProperty('--ry','0deg');}} aria-label={onClick?`${player.name} 카드 상세 보기`:undefined}><img draggable="false" src={`data:image/svg+xml;charset=utf-8,${encodeURIComponent(cardSVG(player,card,quantity,back))}`} alt={`${player.name} ${back?'뒷면 스탯':'선수'} 카드${quantity?`, ${quantity}개 보유`:', 미리보기'}`}/><span className="card-gloss" aria-hidden="true"/></Tag>;
}
