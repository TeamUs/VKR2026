import{j as r,d as e,r as t}from"./index-N47FKFb6.js";const i=e.div`
  padding: ${r=>r.$hideTitle?"0":"20px"};
  background: transparent;
  border-radius: ${r=>r.$hideTitle?"0":"12px"};
  border: none;
  box-shadow: none;
  backdrop-filter: none;
`,a=e.h3`
  margin: 0 0 20px 0;
  color: ${r=>r.$isDark?"#D4C19C":"#1a1a1a"};
  font-size: 1.1rem;
  font-weight: 600;
  text-align: center;
`,o=e.div`
  display: flex;
  flex-direction: column;
`,n=e.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 20px;
  margin-bottom: 16px;
  border-radius: 0 20px 20px 0;
  background: ${r=>r.$isCompleted?r.$isDark?"rgba(39, 174, 96, 0.2)":"rgba(39, 174, 96, 0.1)":r.$isActive?r.$isDark?"rgba(157, 78, 61, 0.2)":"rgba(157, 78, 61, 0.1)":r.$isDark?"rgba(255, 255, 255, 0.05)":"rgba(139, 69, 19, 0.15)"};
  border: 1px solid ${r=>r.$isCompleted?"rgba(39, 174, 96, 0.3)":r.$isActive?"rgba(157, 78, 61, 0.4)":r.$isDark?"rgba(255, 255, 255, 0.1)":"rgba(0, 0, 0, 0.1)"};
  box-shadow: ${r=>r.$isActive||r.$isCompleted?"0 4px 12px rgba(0, 0, 0, 0.1)":"0 2px 6px rgba(0, 0, 0, 0.05)"};
  transition: all 0.3s ease;
  position: relative;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background: ${r=>r.$isCompleted?"linear-gradient(180deg, #27ae60, #2ecc71)":r.$isActive?"linear-gradient(180deg, var(--terracotta), var(--matte-red))":r.$isDark?"rgba(255, 255, 255, 0.2)":"rgba(0, 0, 0, 0.2)"};
    border-radius: 0 2px 2px 0;
    box-shadow: ${r=>r.$isActive||r.$isCompleted?"0 2px 8px rgba(0, 0, 0, 0.2)":"none"};
  }
`,s=e.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  font-weight: bold;
  background: ${r=>r.$isCompleted?"#27ae60":r.$isActive?"var(--terracotta)":"transparent"};
  color: ${r=>r.$isCompleted||r.$isActive?"#ffffff":"var(--text-secondary)"};
  border: 1px solid ${r=>r.$isCompleted?"#27ae60":r.$isActive?"var(--terracotta)":"var(--border-color)"};
  transition: all 0.3s ease;
`,d=e.div`
  flex: 1;
`,l=e.div`
  font-weight: ${r=>r.$isActive||r.$isCompleted?"600":"500"};
  font-size: 0.95rem;
  color: ${r=>r.$isCompleted?"#27ae60":r.$isActive?"var(--terracotta)":r.$isDark?"#D4C19C":"#1a1a1a"};
  margin-bottom: 2px;
  transition: all 0.3s ease;
`,c=e.div`
  font-size: 0.8rem;
  color: ${r=>r.$isCompleted?"rgba(39, 174, 96, 0.8)":r.$isActive?r.$isDark?"#F4E4BC":"#000000":r.$isDark?"rgba(212, 193, 156, 0.8)":"rgba(0, 0, 0, 0.6)"};
  line-height: 1.3;
  transition: all 0.3s ease;
`,p=({currentStatus:e,isDark:t=!1,hideTitle:p=!1})=>{const x=[{id:"Создан",title:"Создан",description:"Заказ создан и ожидает обработки",icon:"📝"},{id:"Доставка внутри Китая",title:"Доставка внутри Китая",description:"Товар доставляется по Китаю",icon:"🚚"},{id:"На складе в Китае",title:"На складе в Китае",description:"Товар прибыл на склад в Китае",icon:"📦"},{id:"Отправлен на таможню",title:"Отправлен на таможню",description:"Товар проходит таможенное оформление",icon:"🏛️"},{id:"Доставка в РФ",title:"Доставка в РФ",description:"Товар доставляется по России",icon:"🇷🇺"},{id:"Доставлен",title:"Доставлен",description:"Товар успешно доставлен",icon:"✅"}],g=x.findIndex(r=>r.id===e),b=g>=0?g:0;return r.jsxs(i,{$isDark:t,$hideTitle:p,children:[!p&&r.jsx(a,{$isDark:t,children:"📦 Статус доставки"}),r.jsx(o,{children:x.map((e,i)=>{const a=i<b,o=i===b;return r.jsxs(n,{$isActive:o,$isCompleted:a,$isDark:t,children:[r.jsx(s,{$isActive:o,$isCompleted:a,children:a?"✓":o?e.icon:i+1}),r.jsxs(d,{$isActive:o,$isCompleted:a,$isDark:t,children:[r.jsx(l,{$isActive:o,$isCompleted:a,$isDark:t,children:e.title}),r.jsx(c,{$isActive:o,$isCompleted:a,$isDark:t,children:e.description})]})]},e.id)})})]})},x=e.div`
  min-height: 100vh;
  background: transparent;
  padding: 0px 0px 100px 0px;
  position: relative;
  z-index: 1;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  
  @media (max-width: 480px) {
    padding: 0px;
  }
`,g=e.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 25px;
  margin-top: 0px;
  padding: 0 16px;
  
  @media (max-width: 480px) {
    margin-top: 0px;
    margin-bottom: 20px;
  }
`,b=e.button`
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: var(--text-primary);
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 
    0 4px 12px var(--shadow-card),
    0 2px 6px var(--shadow-soft);
  backdrop-filter: blur(10px);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 
      0 6px 20px var(--shadow-card),
      0 3px 10px var(--shadow-soft);
    border-color: var(--matte-red);
  }

  &:active {
    transform: translateY(0);
  }
`,h=e.h1`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--text-primary);
  text-align: center;
  flex: 1;
  
  @media (max-width: 480px) {
    font-size: 1.4rem;
  }
`,m=e.div`
  width: 60px;
  height: 30px;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 15px;
  cursor: pointer;
  box-shadow: 
    0 4px 12px var(--shadow-card),
    0 2px 6px var(--shadow-soft);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  padding: 2px;
  margin-right: 0px;
  
  @media (max-width: 480px) {
    margin-right: 0px;
  }

  &:hover {
    box-shadow: 
      0 6px 20px var(--shadow-card),
      0 3px 10px var(--shadow-soft);
  }
`,u=e.div`
  width: 24px;
  height: 24px;
  background: ${r=>r.$isDark?"var(--matte-red)":"var(--terracotta)"};
  border-radius: 50%;
  transition: all 0.3s ease;
  transform: ${r=>r.$isDark?"translateX(30px)":"translateX(0px)"};
  box-shadow: 0 2px 6px var(--shadow-soft);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  color: var(--bg-primary);
`,v=e.span`
  opacity: ${r=>r.$isDark?1:0};
  transition: opacity 0.3s ease;
  position: absolute;
  left: 8px;
  font-size: 0.7rem;
  color: var(--text-accent);
`,f=e.span`
  opacity: ${r=>r.$isDark?0:1};
  transition: opacity 0.3s ease;
  position: absolute;
  right: 8px;
  font-size: 0.7rem;
  color: var(--text-accent);
`,$=e.div`
  padding: 20px;
  background: transparent;
  border: none;
  box-shadow: none;
  margin-bottom: 20px;
`,k=e.div`
  margin-bottom: 16px;
`,w=e.label`
  display: block;
  margin-bottom: 8px;
  color: ${r=>r.$isDark?"var(--text-secondary-dark)":"var(--text-secondary)"};
  font-size: 1rem;
  font-weight: 700;
`,y=e.input`
  width: 100%;
  padding: 14px 16px;
  border-radius: 12px;
  border: 2px solid ${r=>r.$isDark?"var(--border-color-dark)":"var(--border-color)"};
  background: ${r=>r.$isDark?"rgba(45, 55, 72, 0.8)":"rgba(255, 255, 255, 0.9)"};
  color: ${r=>r.$isDark?"var(--text-primary-dark)":"var(--text-primary)"};
  font-size: 1rem;
  font-family: 'JetBrains Mono', monospace;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 2px;
  outline: none;
  transition: all 0.3s ease;
  box-sizing: border-box;
  backdrop-filter: blur(10px);

  &:focus {
    border-color: var(--matte-red);
    box-shadow: 0 0 0 3px rgba(162, 59, 59, 0.1);
    background: ${r=>r.$isDark?"rgba(45, 55, 72, 0.95)":"rgba(255, 255, 255, 0.95)"};
  }

  &::placeholder {
    text-transform: none;
    letter-spacing: normal;
  }
`,j=e.button`
  width: 100%;
  padding: 14px 20px;
  border-radius: 12px;
  border: none;
  background: var(--matte-red);
  color: ${r=>r.$isDark?"#000000":"#FFFFFF"};
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(162, 59, 59, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(162, 59, 59, 0.4);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`,D=e.div`
  padding: 12px 16px;
  margin-top: 16px;
  background: rgba(231, 76, 60, 0.1);
  border: 1px solid #e74c3c;
  border-radius: 12px;
  color: #e74c3c;
  text-align: center;
  font-size: 0.9rem;
`,T=e.div`
  padding: 12px 16px;
  margin-top: 16px;
  background: rgba(52, 152, 219, 0.1);
  border: 1px solid #3498db;
  border-radius: 12px;
  color: #3498db;
  text-align: center;
  font-size: 0.9rem;
`,C=e.div`
  margin-top: 20px;
  padding: 16px;
  background: ${r=>r.$isDark?"rgba(255, 255, 255, 0.1)":"rgba(139, 69, 19, 0.15)"};
  border-radius: 12px;
  border: 1px solid ${r=>r.$isDark?"var(--border-color-dark)":"var(--border-color)"};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
`,z=e.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 8px 0;
  color: ${r=>r.$isDark?"var(--text-primary-dark)":"var(--text-primary)"};
  font-size: 0.9rem;

  span:first-child {
    color: ${r=>r.$isDark?"var(--text-secondary-dark)":"var(--text-secondary)"};
    flex-shrink: 0;
  }

  span:last-child {
    font-weight: bold;
    text-align: right;
    flex: 1;
    margin-left: 16px;
  }
`,A=({isDark:e=!1,onNavigate:i,toggleTheme:a})=>{const[o,n]=t.useState(""),[s,d]=t.useState(null),[l,c]=t.useState(!1),[A,B]=t.useState(""),[I,R]=t.useState([]),[H,U]=t.useState(!1),[Y,N]=t.useState(null);t.useEffect(()=>{O()},[]);const O=async()=>{var r,e,t,i;U(!0);try{const a=!(null==(e=null==(r=window.Telegram)?void 0:r.WebApp)?void 0:e.initData),o=a?"/api/test-user-orders":"/api/user/orders",n=a?{}:{"x-telegram-init-data":(null==(i=null==(t=window.Telegram)?void 0:t.WebApp)?void 0:i.initData)||""},s=await fetch(o,{headers:n});if(s.ok){const r=await s.json();R(r.orders||[])}}catch(a){console.error("Ошибка загрузки заказов:",a)}finally{U(!1)}},L=async()=>{var r,e,t,i,a,n,s,l,p,x;if(o.trim()){c(!0),B(""),d(null);try{const c=!(null==(e=null==(r=window.Telegram)?void 0:r.WebApp)?void 0:e.initData),p=c?`/api/test-tracking/${o.trim()}`:`/api/tracking/${o.trim()}`,x=c?{}:{"x-telegram-init-data":(null==(i=null==(t=window.Telegram)?void 0:t.WebApp)?void 0:i.initData)||""},g=await fetch(p,{headers:x}),b=await g.json();g.ok&&b.success?(d(b),setTimeout(()=>{const r=document.querySelector("[data-tracking-results]");r&&r.scrollIntoView({behavior:"smooth",block:"start"})},100),(null==(n=null==(a=window.Telegram)?void 0:a.WebApp)?void 0:n.HapticFeedback)&&window.Telegram.WebApp.HapticFeedback.notificationOccurred("success")):(B(b.error||"Заказ не найден"),(null==(l=null==(s=window.Telegram)?void 0:s.WebApp)?void 0:l.HapticFeedback)&&window.Telegram.WebApp.HapticFeedback.notificationOccurred("error"))}catch(g){console.error("Ошибка отслеживания:",g),B("Ошибка подключения к серверу"),(null==(x=null==(p=window.Telegram)?void 0:p.WebApp)?void 0:x.HapticFeedback)&&window.Telegram.WebApp.HapticFeedback.notificationOccurred("error")}finally{c(!1)}}else B("Введите номер отслеживания")};return r.jsxs(x,{children:[r.jsxs(g,{children:[r.jsx(b,{onClick:()=>null==i?void 0:i("main"),children:"‹"}),r.jsx(h,{children:"Отследить заказ"}),r.jsxs(m,{onClick:a,children:[r.jsx(v,{$isDark:e,children:"🌙"}),r.jsx(f,{$isDark:e,children:"☀️"}),r.jsx(u,{$isDark:e})]})]}),r.jsxs($,{$isDark:e,children:[r.jsxs(k,{children:[r.jsx(w,{$isDark:e,children:"Введите номер отслеживания:"}),r.jsx(y,{type:"text",value:o,onChange:r=>n(r.target.value.toUpperCase()),onKeyPress:r=>{"Enter"!==r.key||l||L()},placeholder:"POIZONIC-000001",maxLength:15,$isDark:e})]}),r.jsx(j,{onClick:L,disabled:l,$isDark:e,children:l?"⏳ Поиск...":"Отследить"}),A&&r.jsxs(D,{$isDark:e,children:["❌ ",A]}),l&&r.jsx(T,{$isDark:e,children:"⏳ Загрузка информации о доставке..."})]}),I.length>0&&r.jsxs($,{$isDark:e,children:[r.jsx("div",{style:{fontSize:"1.3rem",fontWeight:"bold",color:"var(--text-primary)",marginBottom:"16px",textAlign:"center"},children:"📦 Ваши заказы"}),r.jsx("div",{style:{display:"grid",gap:"12px"},children:I.map(t=>r.jsxs("div",{style:{padding:"12px",backgroundColor:e?"rgba(255, 255, 255, 0.1)":"rgba(139, 69, 19, 0.15)",borderRadius:"8px",border:"1px solid var(--border-color)",cursor:"pointer",transition:"all 0.3s ease",backdropFilter:"blur(10px)"},onClick:()=>N(Y===t.order_id?null:t.order_id),children:[r.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[r.jsxs("div",{children:[r.jsxs("div",{style:{fontSize:"0.9rem",fontWeight:"bold",color:"var(--text-primary)"},children:["Заказ #",t.order_id]}),r.jsx("div",{style:{fontSize:"0.8rem",color:"var(--text-secondary)",fontFamily:"JetBrains Mono, monospace"},children:t.internal_tracking_number||"Нет трек-номера"})]}),r.jsxs("div",{style:{padding:"4px 8px",borderRadius:"6px",background:S(t.delivery_status),color:"white",fontSize:"0.7rem",fontWeight:"bold"},children:[_(t.delivery_status)," ",t.delivery_status||"Создан"]})]}),Y===t.order_id&&r.jsxs("div",{style:{marginTop:"12px",paddingTop:"12px",borderTop:"1px solid var(--border-color)"},children:[r.jsxs("div",{style:{marginBottom:"8px"},children:[r.jsx("strong",{children:"👤 Клиент:"})," ",t.full_name||"Не указано"]}),r.jsxs("div",{style:{marginBottom:"8px"},children:[r.jsx("strong",{children:"📱 Телефон:"})," ",t.phone_number||"Не указан"]}),r.jsxs("div",{style:{marginBottom:"8px"},children:[r.jsx("strong",{children:"📍 ПВЗ:"})," ",t.pickup_point||"Не указан"]}),r.jsxs("div",{style:{marginBottom:"8px"},children:[r.jsx("strong",{children:"📅 Создан:"})," ",new Date(t.created_at).toLocaleDateString("ru-RU")]}),t.last_updated&&r.jsxs("div",{style:{marginBottom:"12px"},children:[r.jsx("strong",{children:"⏰ Обновлен:"})," ",new Date(t.last_updated).toLocaleString("ru-RU")]}),r.jsx("button",{onClick:r=>{r.stopPropagation(),n(t.internal_tracking_number),d({trackingNumber:t.internal_tracking_number,status:t.delivery_status,lastUpdated:t.last_updated,orderId:t.order_id}),N(null),setTimeout(()=>{const r=document.querySelector("[data-tracking-results]");r&&r.scrollIntoView({behavior:"smooth",block:"start"})},100)},style:{width:"100%",padding:"8px 12px",borderRadius:"6px",border:"none",background:"var(--matte-red)",color:e?"#000000":"#FFFFFF",fontSize:"0.9rem",fontWeight:"bold",cursor:"pointer",transition:"all 0.3s ease",boxShadow:"0 4px 12px rgba(162, 59, 59, 0.3)"},children:"Отследить этот заказ"})]})]},t.order_id))})]}),s&&!l&&r.jsxs("div",{"data-tracking-results":!0,style:{margin:"20px 16px",padding:"20px",background:"transparent",borderRadius:"0",border:"none",boxShadow:"none",position:"relative"},children:[r.jsxs("div",{style:{textAlign:"center",marginBottom:"20px"},children:[r.jsx("div",{style:{fontSize:"1.3rem",fontWeight:"600",color:e?"#D4C19C":"#1a1a1a",marginBottom:"6px"},children:"Статус доставки"}),r.jsxs("div",{style:{fontSize:"1rem",color:e?"#D4C19C":"rgba(0, 0, 0, 0.6)",fontWeight:"400"},children:["Текущий этап: ",r.jsx("span",{style:{color:"var(--terracotta)",fontWeight:"600"},children:s.status})]})]}),r.jsxs(C,{$isDark:e,children:[r.jsxs(z,{$isDark:e,children:[r.jsx("span",{children:"📦 Номер заказа:"}),r.jsxs("span",{children:["#",s.orderId]})]}),r.jsxs(z,{$isDark:e,children:[r.jsx("span",{children:"🔍 Трек-номер:"}),r.jsx("span",{children:s.trackingNumber})]}),r.jsxs(z,{$isDark:e,children:[r.jsx("span",{children:"⏰ Последнее обновление:"}),r.jsx("span",{children:new Date(s.lastUpdated).toLocaleString("ru-RU")})]})]}),r.jsxs("div",{style:{position:"relative",height:"50px",margin:"20px 0",padding:"0 10px"},children:[r.jsx("div",{style:{position:"absolute",top:"50%",left:"0",right:"0",height:"2px",backgroundColor:e?"rgba(255, 255, 255, 0.1)":"rgba(0, 0, 0, 0.1)",borderRadius:"1px",transform:"translateY(-50%)"}}),r.jsx("div",{style:{position:"absolute",top:"50%",left:"0",width:`${W(s.status)}%`,height:"2px",background:"var(--matte-red)",borderRadius:"1px",transform:"translateY(-50%)",transition:"width 0.6s ease"}}),[{id:"Создан",icon:"📝",shortTitle:"Создан"},{id:"Доставка внутри Китая",icon:"🚚",shortTitle:"Китай"},{id:"На складе в Китае",icon:"📦",shortTitle:"Склад"},{id:"Отправлен на таможню",icon:"🏛️",shortTitle:"Таможня"},{id:"Доставка в РФ",icon:"🇷🇺",shortTitle:"РФ"},{id:"Доставлен",icon:"✅",shortTitle:"Готово"}].map((t,i)=>{const a=i<F(s.status),o=i===F(s.status);W(s.status);const n=2+i/5*96,d="Доставка в РФ"===t.id,l=d?"🇷🇺":a?"✓":t.icon;return r.jsx("div",{style:{position:"absolute",top:"50%",left:`${n}%`,transform:"translate(-50%, -50%)",width:d?"36px":"32px",height:d?"36px":"32px",borderRadius:d?"6px":"50%",background:a?"#27ae60":o?"var(--terracotta)":e?"rgba(255, 255, 255, 0.1)":"rgba(0, 0, 0, 0.1)",border:a||o?"2px solid white":"1px solid "+(e?"rgba(255, 255, 255, 0.2)":"rgba(0, 0, 0, 0.2)"),display:"flex",alignItems:"center",justifyContent:"center",fontSize:d?"1.2rem":"0.9rem",color:a||o?"white":e?"rgba(255, 255, 255, 0.6)":"rgba(0, 0, 0, 0.6)",boxShadow:o?"0 0 0 4px rgba(157, 78, 61, 0.2)":"none",transition:"all 0.3s ease",zIndex:2},children:l},t.id)})]}),r.jsx("div",{style:{position:"relative",height:"15px",marginTop:"-5px",marginBottom:"20px",fontSize:"0.85rem"},children:[{id:"Создан",icon:"📝",shortTitle:"Создан"},{id:"Доставка внутри Китая",icon:"🚚",shortTitle:"Китай"},{id:"На складе в Китае",icon:"📦",shortTitle:"Склад"},{id:"Отправлен на таможню",icon:"🏛️",shortTitle:"Таможня"},{id:"Доставка в РФ",icon:"🇷🇺",shortTitle:"РФ"},{id:"Доставлен",icon:"✅",shortTitle:"Готово"}].map((t,i)=>{const a=i===F(s.status),o=i<F(s.status),n=2+i/5*96;return r.jsx("div",{style:{position:"absolute",left:`${n}%`,transform:"translateX(-50%)",top:"-2px",textAlign:"center",width:"70px",color:a?"var(--terracotta)":o?"#27ae60":e?"rgba(255, 255, 255, 0.5)":"rgba(0, 0, 0, 0.5)",fontWeight:a?"600":o?"500":"400",fontSize:"0.85rem",transition:"all 0.3s ease"},children:t.shortTitle},t.id)})}),r.jsx("div",{style:{borderTop:"1px solid "+(e?"rgba(255, 255, 255, 0.1)":"rgba(0, 0, 0, 0.1)"),paddingTop:"20px"},children:r.jsx(p,{currentStatus:s.status,isDark:e,hideTitle:!0})})]})]})};function S(r){switch(r){case"Создан":default:return"linear-gradient(135deg, #95a5a6, #7f8c8d)";case"Доставка внутри Китая":return"linear-gradient(135deg, #3498db, #2980b9)";case"На складе в Китае":return"linear-gradient(135deg, #f39c12, #e67e22)";case"Отправлен на таможню":return"linear-gradient(135deg, #9b59b6, #8e44ad)";case"Доставка в РФ":return"linear-gradient(135deg, #e74c3c, #c0392b)";case"Доставлен":return"linear-gradient(135deg, #27ae60, #229954)"}}function _(r){switch(r){case"Создан":default:return"📝";case"Доставка внутри Китая":return"🚚";case"На складе в Китае":return"📦";case"Отправлен на таможню":return"🏛️";case"Доставка в РФ":return"🇷🇺";case"Доставлен":return"✅"}}function F(r){const e=[{id:"Создан",icon:"📝",shortTitle:"Создан"},{id:"Доставка внутри Китая",icon:"🚚",shortTitle:"Китай"},{id:"На складе в Китае",icon:"📦",shortTitle:"Склад"},{id:"Отправлен на таможню",icon:"🏛️",shortTitle:"Таможня"},{id:"Доставка в РФ",icon:"🇷🇺",shortTitle:"РФ"},{id:"Доставлен",icon:"✅",shortTitle:"Готово"}].findIndex(e=>e.id===r);return e>=0?e:0}function W(r){const e=[{id:"Создан",icon:"📝",shortTitle:"Создан"},{id:"Доставка внутри Китая",icon:"🚚",shortTitle:"Китай"},{id:"На складе в Китае",icon:"📦",shortTitle:"Склад"},{id:"Отправлен на таможню",icon:"🏛️",shortTitle:"Таможня"},{id:"Доставка в РФ",icon:"🇷🇺",shortTitle:"РФ"},{id:"Доставлен",icon:"✅",shortTitle:"Готово"}];return F(r)/(e.length-1)*100}export{A as default};
