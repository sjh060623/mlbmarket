export const START_BALANCE=1000000;
export const FEE_RATE=0.001;
export const STORAGE_KEY='player-market-v1';
export function initialAccount() { return { version:1, cash:START_BALANCE, holdings:{}, cards:{}, trades:[], favorites:['ohtani','skenes','lee'], notes:{}, tick:0, realized:0 }; }
export function executeTrade(account, {playerId, side, quantity, price, reason='', at, id, cardSnapshot}) {
  if (!['buy','sell'].includes(side)) throw new Error('올바른 거래 유형을 선택해 주세요.');
  if (!Number.isSafeInteger(quantity)||quantity<1||quantity>1000) throw new Error('수량은 1~1,000 사이의 정수로 입력해 주세요.');
  if (!Number.isSafeInteger(price)||price<=0||!playerId) throw new Error('가격 정보를 확인해 주세요.');
  const amount=price*quantity, fee=Math.ceil(amount*FEE_RATE), current=account.holdings[playerId]||{quantity:0,cost:0};
  if(side==='buy'&&account.cash<amount+fee) throw new Error('수수료를 포함한 주문 금액이 보유 포인트를 초과합니다.');
  if(side==='sell'&&current.quantity<quantity) throw new Error('보유 수량보다 많이 매도할 수 없습니다.');
  const holdings={...account.holdings};
  const removedCost=side==='sell'?current.cost*quantity/current.quantity:0;
  const next=side==='buy'?{quantity:current.quantity+quantity,cost:current.cost+amount+fee}:{quantity:current.quantity-quantity,cost:current.cost-removedCost};
  if(next.quantity) holdings[playerId]=next; else delete holdings[playerId];
  const trade={id:id||`${Date.now()}-${Math.random().toString(36).slice(2,9)}`,playerId,side,quantity,price,amount,fee,reason:reason.slice(0,300),at:at||new Date().toISOString(),pnl:side==='sell'?amount-fee-removedCost:null};
  const cards={...(account.cards||{})};
  if(side==='buy'&&!cards[playerId]) cards[playerId]={serial:`PM-${playerId.slice(0,3).toUpperCase()}-${trade.id.replace(/[^a-zA-Z0-9]/g,'').slice(-8).toUpperCase()}`,acquiredAt:trade.at,snapshot:cardSnapshot?structuredClone(cardSnapshot):null};
  if(!next.quantity) delete cards[playerId];
  return {...account,cash:account.cash+(side==='buy'?-amount-fee:amount-fee),holdings,cards,realized:account.realized+(trade.pnl||0),trades:[trade,...account.trades]};
}
export function restoreAccount(raw, allowedIds) {
  const a=JSON.parse(raw);
  if(!a||a.version!==1||!Number.isSafeInteger(a.cash)||a.cash<0||!a.holdings||typeof a.holdings!=='object'||!Array.isArray(a.trades)||!Array.isArray(a.favorites)||!a.notes||typeof a.notes!=='object'||!Number.isSafeInteger(a.tick)||a.tick<0||!Number.isFinite(a.realized)) throw new Error('Invalid account');
  for(const [id,h] of Object.entries(a.holdings)) if(!allowedIds.includes(id)||!Number.isSafeInteger(h.quantity)||h.quantity<1||!Number.isFinite(h.cost)||h.cost<0) throw new Error('Invalid holding');
  if(a.favorites.some(id=>!allowedIds.includes(id))||Object.values(a.notes).some(n=>typeof n!=='string')||a.trades.some(t=>!allowedIds.includes(t.playerId)||!['buy','sell'].includes(t.side)||!Number.isSafeInteger(t.quantity)||t.quantity<1||!Number.isFinite(t.price)||!Number.isFinite(t.amount)||!Number.isFinite(t.fee)||!Number.isFinite(Date.parse(t.at)))) throw new Error('Invalid history');
  if(a.cards!=null&&(!a.cards||typeof a.cards!=='object'||Array.isArray(a.cards))) throw new Error('Invalid cards');
  const cards={};
  for(const id of Object.keys(a.holdings)) {
    const card=a.cards?.[id];
    if(card) {
      if(typeof card.serial!=='string'||card.serial.length>80||!Number.isFinite(Date.parse(card.acquiredAt))||(card.snapshot!=null&&(typeof card.snapshot!=='object'||Array.isArray(card.snapshot))))throw new Error('Invalid card');
      if(card.snapshot){const s=card.snapshot;if(typeof s.name!=='string'||typeof s.english!=='string'||!Number.isFinite(s.value)||!Number.isFinite(s.number)||typeof s.position!=='string'||typeof s.team!=='string'||typeof s.label!=='string'||typeof s.accent!=='string'||!Array.isArray(s.traits)||s.traits.some(t=>typeof t!=='string')||!Array.isArray(s.ratings)||s.ratings.some(r=>!Array.isArray(r)||r.length!==2||typeof r[0]!=='string'||!Number.isFinite(r[1])||r[1]<0||r[1]>100)||!Array.isArray(s.metrics)||s.metrics.some(m=>!Array.isArray(m)||m.length!==2||typeof m[0]!=='string'||!['string','number'].includes(typeof m[1])))throw new Error('Invalid card snapshot');}
      cards[id]=card;
    } else {
      const buys=a.trades.filter(t=>t.playerId===id&&t.side==='buy');
      const first=buys[buys.length-1];
      cards[id]={serial:`PM-${id.slice(0,3).toUpperCase()}-LEGACY`,acquiredAt:first?.at||'2026-10-17T00:00:00.000Z',snapshot:null};
    }
  }
  return {...a,cards};
}
