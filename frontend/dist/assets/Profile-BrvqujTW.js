import{R as e,j as t,d as r,r as i,H as n,m as a}from"./index-N47FKFb6.js";var o,s,l,d,c={linear:function(e,t,r,i){return(r-t)*e/i+t},easeInQuad:function(e,t,r,i){return(r-t)*(e/=i)*e+t},easeOutQuad:function(e,t,r,i){return-(r-t)*(e/=i)*(e-2)+t},easeInOutQuad:function(e,t,r,i){var n=r-t;return(e/=i/2)<1?n/2*e*e+t:-n/2*(--e*(e-2)-1)+t},easeInCubic:function(e,t,r,i){return(r-t)*(e/=i)*e*e+t},easeOutCubic:function(e,t,r,i){return(r-t)*((e=e/i-1)*e*e+1)+t},easeInOutCubic:function(e,t,r,i){var n=r-t;return(e/=i/2)<1?n/2*e*e*e+t:n/2*((e-=2)*e*e+2)+t},easeInQuart:function(e,t,r,i){return(r-t)*(e/=i)*e*e*e+t},easeOutQuart:function(e,t,r,i){return-(r-t)*((e=e/i-1)*e*e*e-1)+t},easeInOutQuart:function(e,t,r,i){var n=r-t;return(e/=i/2)<1?n/2*e*e*e*e+t:-n/2*((e-=2)*e*e*e-2)+t},easeInQuint:function(e,t,r,i){return(r-t)*(e/=i)*e*e*e*e+t},easeOutQuint:function(e,t,r,i){return(r-t)*((e=e/i-1)*e*e*e*e+1)+t},easeInOutQuint:function(e,t,r,i){var n=r-t;return(e/=i/2)<1?n/2*e*e*e*e*e+t:n/2*((e-=2)*e*e*e*e+2)+t},easeInSine:function(e,t,r,i){var n=r-t;return-n*Math.cos(e/i*(Math.PI/2))+n+t},easeOutSine:function(e,t,r,i){return(r-t)*Math.sin(e/i*(Math.PI/2))+t},easeInOutSine:function(e,t,r,i){return-(r-t)/2*(Math.cos(Math.PI*e/i)-1)+t},easeInExpo:function(e,t,r,i){return 0==e?t:(r-t)*Math.pow(2,10*(e/i-1))+t},easeOutExpo:function(e,t,r,i){var n=r-t;return e==i?t+n:n*(1-Math.pow(2,-10*e/i))+t},easeInOutExpo:function(e,t,r,i){var n=r-t;return 0===e?t:e===i?t+n:(e/=i/2)<1?n/2*Math.pow(2,10*(e-1))+t:n/2*(2-Math.pow(2,-10*--e))+t},easeInCirc:function(e,t,r,i){return-(r-t)*(Math.sqrt(1-(e/=i)*e)-1)+t},easeOutCirc:function(e,t,r,i){return(r-t)*Math.sqrt(1-(e=e/i-1)*e)+t},easeInOutCirc:function(e,t,r,i){var n=r-t;return(e/=i/2)<1?-n/2*(Math.sqrt(1-e*e)-1)+t:n/2*(Math.sqrt(1-(e-=2)*e)+1)+t},easeInElastic:function(e,t,r,i){var n,a,o,s=r-t;return o=1.70158,0===e?t:1===(e/=i)?t+s:((a=0)||(a=.3*i),(n=s)<Math.abs(s)?(n=s,o=a/4):o=a/(2*Math.PI)*Math.asin(s/n),-n*Math.pow(2,10*(e-=1))*Math.sin((e*i-o)*(2*Math.PI)/a)+t)},easeOutElastic:function(e,t,r,i){var n,a,o,s=r-t;return o=1.70158,0===e?t:1===(e/=i)?t+s:((a=0)||(a=.3*i),(n=s)<Math.abs(s)?(n=s,o=a/4):o=a/(2*Math.PI)*Math.asin(s/n),n*Math.pow(2,-10*e)*Math.sin((e*i-o)*(2*Math.PI)/a)+s+t)},easeInOutElastic:function(e,t,r,i){var n,a,o,s=r-t;return o=1.70158,0===e?t:2==(e/=i/2)?t+s:((a=0)||(a=i*(.3*1.5)),(n=s)<Math.abs(s)?(n=s,o=a/4):o=a/(2*Math.PI)*Math.asin(s/n),e<1?n*Math.pow(2,10*(e-=1))*Math.sin((e*i-o)*(2*Math.PI)/a)*-.5+t:n*Math.pow(2,-10*(e-=1))*Math.sin((e*i-o)*(2*Math.PI)/a)*.5+s+t)},easeInBack:function(e,t,r,i,n){return void 0===n&&(n=1.70158),(r-t)*(e/=i)*e*((n+1)*e-n)+t},easeOutBack:function(e,t,r,i,n){return void 0===n&&(n=1.70158),(r-t)*((e=e/i-1)*e*((n+1)*e+n)+1)+t},easeInOutBack:function(e,t,r,i,n){var a=r-t;return void 0===n&&(n=1.70158),(e/=i/2)<1?a/2*(e*e*((1+(n*=1.525))*e-n))+t:a/2*((e-=2)*e*((1+(n*=1.525))*e+n)+2)+t},easeInBounce:function(e,t,r,i){var n=r-t;return n-c.easeOutBounce(i-e,0,n,i)+t},easeOutBounce:function(e,t,r,i){var n=r-t;return(e/=i)<1/2.75?n*(7.5625*e*e)+t:e<2/2.75?n*(7.5625*(e-=1.5/2.75)*e+.75)+t:e<2.5/2.75?n*(7.5625*(e-=2.25/2.75)*e+.9375)+t:n*(7.5625*(e-=2.625/2.75)*e+.984375)+t},easeInOutBounce:function(e,t,r,i){var n=r-t;return e<i/2?.5*c.easeInBounce(2*e,0,n,i)+t:.5*c.easeOutBounce(2*e-i,0,n,i)+.5*n+t}},p=c;function x(e,t){return e+Math.random()*(t-e)}(s=o||(o={}))[s.Circle=0]="Circle",s[s.Square=1]="Square",s[s.Strip=2]="Strip",(d=l||(l={}))[d.Positive=1]="Positive",d[d.Negative=-1]="Negative";const h=1e3/60;class u{constructor(e,t,r,i){this.getOptions=t;const{colors:n,initialVelocityX:a,initialVelocityY:o}=this.getOptions();var s,d;this.context=e,this.x=r,this.y=i,this.w=x(5,20),this.h=x(5,20),this.radius=x(5,10),this.vx="number"==typeof a?x(-a,a):x(a.min,a.max),this.vy="number"==typeof o?x(-o,0):x(o.min,o.max),this.shape=(s=0,d=2,Math.floor(s+Math.random()*(d-s+1))),this.angle=x(0,360)*Math.PI/180,this.angularSpin=x(-.2,.2),this.color=n[Math.floor(Math.random()*n.length)],this.rotateY=x(0,1),this.rotationDirection=x(0,1)?l.Positive:l.Negative}update(e){const{gravity:t,wind:r,friction:i,opacity:n,drawShape:a}=this.getOptions(),s=e/h;this.x+=this.vx*s,this.y+=this.vy*s,this.vy+=t*s,this.vx+=r*s,this.vx*=i**s,this.vy*=i**s,this.rotateY>=1&&this.rotationDirection===l.Positive?this.rotationDirection=l.Negative:this.rotateY<=-1&&this.rotationDirection===l.Negative&&(this.rotationDirection=l.Positive);const d=.1*this.rotationDirection*s;if(this.rotateY+=d,this.angle+=this.angularSpin,this.context.save(),this.context.translate(this.x,this.y),this.context.rotate(this.angle),this.context.scale(1,this.rotateY),this.context.rotate(this.angle),this.context.beginPath(),this.context.fillStyle=this.color,this.context.strokeStyle=this.color,this.context.globalAlpha=n,this.context.lineCap="round",this.context.lineWidth=2,a&&"function"==typeof a)a.call(this,this.context);else switch(this.shape){case o.Circle:this.context.beginPath(),this.context.arc(0,0,this.radius,0,2*Math.PI),this.context.fill();break;case o.Square:this.context.fillRect(-this.w/2,-this.h/2,this.w,this.h);break;case o.Strip:this.context.fillRect(-this.w/6,-this.h/2,this.w/3,this.h)}this.context.closePath(),this.context.restore()}}class g{constructor(e,t){this.x=0,this.y=0,this.w=0,this.h=0,this.lastNumberOfPieces=0,this.tweenProgress=0,this.tweenFrom=0,this.particles=[],this.particlesGenerated=0,this.removeParticleAt=e=>{this.particles.splice(e,1)},this.getParticle=()=>{const e=x(this.x,this.w+this.x),t=x(this.y,this.h+this.y);return new u(this.context,this.getOptions,e,t)},this.animate=e=>{const{canvas:t,context:r,particlesGenerated:i,lastNumberOfPieces:n}=this,{run:a,recycle:o,numberOfPieces:s,debug:l,tweenFunction:d,tweenDuration:c}=this.getOptions();if(!a)return!1;const p=this.particles.length,x=o?p:i;if(x<s){n!==s&&(this.tweenProgress=0,this.tweenFrom=x,this.lastNumberOfPieces=s),this.tweenProgress=Math.min(c,Math.max(0,this.tweenProgress+e));const t=d(this.tweenProgress,this.tweenFrom,s,c),r=Math.round(t-x);for(let e=0;e<r;e++)this.particles.push(this.getParticle());this.particlesGenerated+=r}l&&(r.font="12px sans-serif",r.fillStyle="#333",r.textAlign="right",r.fillText(`Particles: ${p}`,t.width-10,t.height-20));for(let h=this.particles.length-1;h>=0;h--){const r=this.particles[h];r.update(e),(r.y>t.height||r.y<-100||r.x>t.width+100||r.x<-100)&&(o&&x<=s?this.particles[h]=this.getParticle():this.removeParticleAt(h))}return p>0||x<s},this.canvas=e;const r=this.canvas.getContext("2d");if(!r)throw new Error("Could not get canvas context");this.context=r,this.getOptions=t}}const f={width:"undefined"!=typeof window?window.innerWidth:300,height:"undefined"!=typeof window?window.innerHeight:200,numberOfPieces:200,friction:.99,wind:0,gravity:.1,initialVelocityX:4,initialVelocityY:10,colors:["#f44336","#e91e63","#9c27b0","#673ab7","#3f51b5","#2196f3","#03a9f4","#00bcd4","#009688","#4CAF50","#8BC34A","#CDDC39","#FFEB3B","#FFC107","#FF9800","#FF5722","#795548"],opacity:1,debug:!1,tweenFunction:p.easeInOutQuad,tweenDuration:5e3,recycle:!0,run:!0};class m{constructor(e,t){this.lastFrameTime=0,this.setOptionsWithDefaults=e=>{const t={confettiSource:{x:0,y:0,w:this.canvas.width,h:0}};this._options={...t,...f,...e},Object.assign(this,e.confettiSource)},this.update=(e=0)=>{const{options:{run:t,onConfettiComplete:r,frameRate:i},canvas:n,context:a}=this,o=Math.min(e-this.lastFrameTime,50);i&&o<1e3/i?this.rafId=requestAnimationFrame(this.update):(this.lastFrameTime=e-(i?o%i:0),t&&(a.fillStyle="white",a.clearRect(0,0,n.width,n.height)),this.generator.animate(o)?this.rafId=requestAnimationFrame(this.update):(r&&"function"==typeof r&&this.generator.particlesGenerated>0&&r.call(this,this),this._options.run=!1))},this.reset=()=>{this.generator&&this.generator.particlesGenerated>0&&(this.generator.particlesGenerated=0,this.generator.particles=[],this.generator.lastNumberOfPieces=0)},this.stop=()=>{this.options={run:!1},this.rafId&&(cancelAnimationFrame(this.rafId),this.rafId=void 0)},this.canvas=e;const r=this.canvas.getContext("2d");if(!r)throw new Error("Could not get canvas context");this.context=r,this.generator=new g(this.canvas,()=>this.options),this.options=t,this.update()}get options(){return this._options}set options(e){var t,r;const i=null==(t=this._options)?void 0:t.run,n=null==(r=this._options)?void 0:r.recycle;this.setOptionsWithDefaults(e),this.generator&&(Object.assign(this.generator,this.options.confettiSource),"boolean"==typeof e.recycle&&e.recycle&&!1===n&&(this.generator.lastNumberOfPieces=this.generator.particles.length)),"boolean"==typeof e.run&&e.run&&!1===i&&this.update()}}const b=e.createRef();class v extends e.Component{constructor(t){super(t),this.canvas=e.createRef(),this.canvas=t.canvasRef||b}componentDidMount(){if(this.canvas.current){const e=y(this.props)[0];this.confetti=new m(this.canvas.current,e)}}componentDidUpdate(){const e=y(this.props)[0];this.confetti&&(this.confetti.options=e)}componentWillUnmount(){this.confetti&&this.confetti.stop(),this.confetti=void 0}render(){const[e,r]=y(this.props),i={zIndex:2,position:"absolute",pointerEvents:"none",top:0,left:0,bottom:0,right:0,...r.style};return t.jsx("canvas",{width:e.width,height:e.height,ref:this.canvas,...r,style:i})}}function y(e){const t={},r={},i=[...Object.keys(f),"confettiSource","drawShape","onConfettiComplete","frameRate"],n=["canvasRef"];for(const a in e){const o=e[a];i.includes(a)?t[a]=o:n.includes(a)?n[a]=o:r[a]=o}return[t,r,{}]}v.defaultProps={...f},v.displayName="ReactConfetti";const w=e.forwardRef((e,r)=>t.jsx(v,{canvasRef:r,...e})),k=r.div`
  position: fixed;
  top: -20px;
  left: 0;
  right: 0;
  bottom: -20px;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(2px);
  display: ${e=>e.$isOpen?"flex":"none"};
  align-items: flex-start;
  justify-content: center;
  z-index: 1000;
  padding: 80px 0 0 0;
  box-sizing: border-box;
  overflow-y: auto;
  overflow-x: hidden;
`,$=r.div`
  background: ${e=>(e.$isDark,"var(--bg-card)")};
  border-radius: 24px;
  padding: 0;
  max-width: 95vw;
  max-height: 90vh;
  width: 95vw;
  overflow: hidden;
  box-shadow: 
    0 24px 48px rgba(0, 0, 0, 0.25),
    0 8px 16px rgba(0, 0, 0, 0.15);
  border: 1px solid var(--border-color);
  position: absolute;
  top: 50px;
  left: 50%;
  transform: translateY(var(--scroll-position, 0px)) translateX(-50%);
  display: flex;
  flex-direction: column;
`,j=r.div`
  background: var(--bg-card);
  border-radius: 24px 24px 0 0;
  padding: 24px 28px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  position: relative;
`,S=r.h2`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 24px;
  font-weight: 600;
  letter-spacing: -0.3px;
  color: var(--text-primary);
  margin: 0;
`,D=r.button`
  background: ${e=>e.$isDark?"var(--bg-secondary)":"transparent"};
  border: 1px solid var(--matte-red);
  border-radius: 50%;
  width: 36px;
  height: 36px;
  min-width: 36px;
  min-height: 36px;
  color: var(--matte-red);
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  
  &:hover {
    background: var(--matte-red);
    color: white;
  }
`,C=r.div`
  flex: 1;
  overflow-y: auto;
  padding: 28px;
`,z=r.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`,_=r.div`
  background: ${e=>(e.$isDark,"var(--bg-secondary)")};
  border: ${e=>e.$isCurrent?"2px solid var(--matte-red)":"1px solid var(--border-color)"};
  border-radius: 20px;
  padding: 24px;
  color: ${e=>(e.$isCurrent,"var(--text-primary)")};
  position: relative;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  ${e=>e.$isCurrent&&"\n    box-shadow: \n      0 0 0 4px rgba(220, 38, 38, 0.1),\n      0 8px 24px rgba(220, 38, 38, 0.2),\n      0 4px 12px rgba(220, 38, 38, 0.15);\n  "}
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: ${e=>e.$isCurrent?"0 0 0 4px rgba(220, 38, 38, 0.15), 0 12px 32px rgba(220, 38, 38, 0.3), 0 6px 16px rgba(220, 38, 38, 0.2)":"0 4px 16px rgba(0, 0, 0, 0.1), 0 2px 8px rgba(0, 0, 0, 0.08)"};
  }
`,I=r.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`,P=r.div`
  font-size: 36px;
  margin-right: 16px;
  filter: ${e=>e.$isCurrent?"none":"grayscale(60%)"};
  opacity: ${e=>e.$isCurrent?1:.7};
  transition: all 0.3s ease;
`,A=r.div`
  flex: 1;
`,E=r.h3`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 26px;
  font-weight: 600;
  letter-spacing: -0.5px;
  margin: 0 0 6px 0;
  color: ${e=>e.$isCurrent?"var(--matte-red)":"var(--text-primary)"};
  transition: color 0.3s ease;
`,M=r.p`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 15px;
  line-height: 1.5;
  margin: 0;
  color: var(--text-secondary);
  opacity: 0.85;
`,O=r.div`
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--border-color);
`,N=r.h4`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.2px;
  margin: 0 0 12px 0;
  color: var(--text-primary);
  opacity: 0.9;
`,F=r.div`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 8px;
  color: var(--text-secondary);
  padding-left: 4px;
  
  &:last-child {
    margin-bottom: 0;
  }
`,T=r.div`
  margin-bottom: 0;
`,B=r.h4`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.2px;
  margin: 0 0 12px 0;
  color: var(--text-primary);
  opacity: 0.9;
`,R=r.div`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 10px;
  color: var(--text-secondary);
  display: flex;
  align-items: flex-start;
  
  &:last-child {
    margin-bottom: 0;
  }
`,L=r.span`
  margin-right: 10px;
  font-size: 16px;
  margin-top: 2px;
  flex-shrink: 0;
`,Y=r.div`
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 20px;
  padding: 24px;
  margin-bottom: 28px;
  color: var(--text-primary);
`,W=r.h3`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 18px;
  font-weight: 600;
  letter-spacing: -0.2px;
  margin: 0 0 16px 0;
  color: var(--text-primary);
`,q=r.div`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 10px;
  color: var(--text-secondary);
  display: flex;
  align-items: flex-start;
  
  &:last-child {
    margin-bottom: 0;
  }
`,U=r.span`
  margin-right: 10px;
  font-size: 16px;
  margin-top: 2px;
  flex-shrink: 0;
`,X=({isOpen:e,onClose:r,currentLevel:i,isDarkTheme:n,modalPosition:a,onModalStateChange:o})=>{if(!e)return null;return t.jsx(k,{$isOpen:e,$modalPosition:a,onClick:()=>{r(),null==o||o(!1)},children:t.jsxs($,{$isDark:n,$modalPosition:a,style:{"--scroll-position":`${window.pageYOffset||document.documentElement.scrollTop}px`},onClick:e=>e.stopPropagation(),children:[t.jsxs(j,{children:[t.jsx(S,{children:"🏅 Система уровней"}),t.jsx(D,{$isDark:n,onClick:()=>{r(),null==o||o(!1)},children:"×"})]}),t.jsxs(C,{children:[t.jsxs(Y,{$isDark:n,children:[t.jsx(W,{children:"💡 Как получать XP:"}),t.jsxs(q,{children:[t.jsx(U,{children:"✅"}),"100 XP за подтвержденный заказ"]}),t.jsxs(q,{children:[t.jsx(U,{children:"✅"}),"50 XP за приведенного реферала"]}),t.jsxs(q,{children:[t.jsx(U,{children:"✅"}),"1 XP за каждые 100₽ потраченных на юани"]})]}),t.jsx(z,{children:[{id:"bronze",name:"Bronze",description:"Начинающий покупатель",icon:"🥉",color:"#CD7F32",xpRequired:0,rewards:["Первый заказ без комиссии за оформление"]},{id:"silver",name:"Silver",description:"Постоянный клиент",icon:"🥈",color:"#C0C0C0",xpRequired:1e3,rewards:["Комиссия 900₽ навсегда (вместо 1000₽)"]},{id:"gold",name:"Gold",description:"VIP клиент",icon:"🥇",color:"#FFD700",xpRequired:5e3,rewards:["Комиссия 700₽ навсегда (вместо 1000₽)"]},{id:"platinum",name:"Platinum",description:"Премиум клиент",icon:"💎",color:"#E5E4E2",xpRequired:25e3,rewards:["Комиссия 400₽ навсегда (вместо 1000₽)"]},{id:"diamond",name:"Diamond",description:"Легендарный клиент",icon:"💠",color:"#B9F2FF",xpRequired:1e5,rewards:["Комиссия 0₽ навсегда","Специальные предложения на покупку юаней","Рефералы получают заказы без комиссии (0₽) на 14 дней при активации реферальной ссылки"]}].map(e=>t.jsxs(_,{$isDark:n,$isCurrent:e.id===i.toLowerCase(),$color:e.color,children:[t.jsxs(I,{children:[t.jsx(P,{$isCurrent:e.id===i.toLowerCase(),children:e.icon}),t.jsxs(A,{children:[t.jsx(E,{$isCurrent:e.id===i.toLowerCase(),children:e.name}),t.jsx(M,{$isCurrent:e.id===i.toLowerCase(),children:e.description})]})]}),t.jsxs(O,{$isCurrent:e.id===i.toLowerCase(),children:[t.jsx(N,{$isCurrent:e.id===i.toLowerCase(),children:"📋 Требования:"}),t.jsxs(F,{$isCurrent:e.id===i.toLowerCase(),children:["• ",e.xpRequired.toLocaleString()," XP"]})]}),t.jsxs(T,{$isCurrent:e.id===i.toLowerCase(),children:[t.jsx(B,{$isCurrent:e.id===i.toLowerCase(),children:"🎁 Награды:"}),e.rewards.map((r,n)=>t.jsxs(R,{$isCurrent:e.id===i.toLowerCase(),children:[t.jsx(L,{children:"✨"}),r]},n))]})]},e.id))})]})]})})},G=a`
  from { 
    opacity: 0; 
    transform: translateY(8px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
`;a`
  0%, 100% { 
    transform: translateY(0px) rotate(0deg); 
    opacity: 0.1; 
  }
  50% { 
    transform: translateY(-10px) rotate(2deg); 
    opacity: 0.2; 
  }
`;const Q=a`
  0% { transform: translate(0px, 0px) rotate(0deg); }
  25% { transform: translate(10px, -5px) rotate(1deg); }
  50% { transform: translate(-5px, -10px) rotate(-1deg); }
  75% { transform: translate(-8px, 5px) rotate(0.5deg); }
  100% { transform: translate(0px, 0px) rotate(0deg); }
`,H=r.div`
  padding: 0px 0px 100px 0px;
  min-height: 100vh;
  background: transparent;
  color: var(--text-primary);
  position: relative;
  z-index: 1;
  transition: all 0.5s ease;
  animation: ${G} 0.8s ease-out forwards;
  isolation: isolate;
`,V=r.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
  transform: translateZ(0);
`,J=r.div`
  position: fixed;
  font-family: 'Noto Sans SC', serif;
  color: var(--pattern-color);
  text-shadow: 
    0 0 6px var(--glow-terracotta),
    0 0 12px var(--glow-terracotta);
  animation: ${Q} 25s ease-in-out infinite;
  opacity: 0.5;
  font-weight: 500;
  font-size: 1.4rem;
  transition: none;
  z-index: 0;
  transform: translateZ(0);
  
  &:nth-child(1) { top: 10%; left: 5%; font-size: 2rem; animation-delay: 0s; }
  &:nth-child(2) { top: 20%; left: 15%; font-size: 1.5rem; animation-delay: 2s; }
  &:nth-child(3) { top: 30%; left: 8%; font-size: 1.8rem; animation-delay: 4s; }
  &:nth-child(4) { top: 15%; left: 25%; font-size: 1.2rem; animation-delay: 6s; }
  &:nth-child(5) { top: 25%; left: 35%; font-size: 1.6rem; animation-delay: 8s; }
  &:nth-child(6) { top: 40%; left: 12%; font-size: 1.4rem; animation-delay: 10s; }
  &:nth-child(7) { top: 50%; left: 28%; font-size: 1.7rem; animation-delay: 12s; }
  &:nth-child(8) { top: 60%; left: 18%; font-size: 1.3rem; animation-delay: 14s; }
  &:nth-child(9) { top: 70%; left: 32%; font-size: 1.5rem; animation-delay: 16s; }
  &:nth-child(10) { top: 80%; left: 22%; font-size: 1.1rem; animation-delay: 18s; }
  &:nth-child(11) { top: 5%; right: 10%; font-size: 1.8rem; animation-delay: 3s; }
  &:nth-child(12) { top: 18%; right: 20%; font-size: 1.4rem; animation-delay: 5s; }
  &:nth-child(13) { top: 35%; right: 15%; font-size: 1.6rem; animation-delay: 7s; }
  &:nth-child(14) { top: 45%; right: 25%; font-size: 1.2rem; animation-delay: 9s; }
  &:nth-child(15) { top: 55%; right: 12%; font-size: 1.7rem; animation-delay: 11s; }
  &:nth-child(16) { top: 65%; right: 22%; font-size: 1.3rem; animation-delay: 13s; }
  &:nth-child(17) { top: 75%; right: 18%; font-size: 1.5rem; animation-delay: 15s; }
  &:nth-child(18) { top: 85%; right: 28%; font-size: 1.1rem; animation-delay: 17s; }
`,Z=r.div`
  text-align: center;
  margin-top: 0;
  margin-bottom: 24px;
  padding-top: 0;
  padding: 0 16px;
  position: relative;
`,K=r.button`
  position: absolute;
  top: 0;
  left: 16px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: 2px solid var(--border-color);
  background: var(--bg-card);
  color: var(--text-primary);
  font-size: 24px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;

  &:hover {
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
    background: var(--bg-secondary);
  }

  &:active {
    transform: translateY(0) scale(1);
  }
`,ee=r.h1`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 28px;
  font-weight: 700;
  color: var(--text-primary);
  margin-top: 0;
  margin-bottom: 8px;
  text-shadow: ${e=>e.$isDark?"0 0 10px var(--glow-red)":"none"};
`,te=r.div`
  position: fixed;
  top: 10px;
  right: 20px;
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
  z-index: 1000;

  &:hover {
    box-shadow:
      0 6px 20px var(--shadow-card),
      0 3px 10px var(--shadow-soft);
  }
`,re=r.div`
  width: 24px;
  height: 24px;
  background: ${e=>e.$isDark?"var(--matte-red)":"var(--terracotta)"};
  border-radius: 50%;
  transition: all 0.3s ease;
  transform: ${e=>e.$isDark?"translateX(30px)":"translateX(0px)"};
  box-shadow: 0 2px 6px var(--shadow-soft);
  display: flex;
  align-items: center;
  justify-content: center;
`,ie=r.span`
  opacity: ${e=>e.$isDark?1:0};
  transition: opacity 0.3s ease;
  position: absolute;
  left: 8px;
  font-size: 0.7rem;
  color: var(--text-accent);
`,ne=r.span`
  opacity: ${e=>e.$isDark?0:1};
  transition: opacity 0.3s ease;
  position: absolute;
  right: 8px;
  font-size: 0.7rem;
  color: var(--text-accent);
`,ae=r.div`
  background: ${e=>e.$isDark?"rgba(42, 42, 42, 0.95)":"rgba(230, 211, 179, 0.95)"};
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 4px 20px var(--shadow-card);
  margin: 0 16px 20px 16px;
  border: 1px solid var(--border-color);
  position: relative;
  backdrop-filter: blur(10px);
`,oe=r.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`,se=r.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--matte-red), var(--terracotta));
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  margin-right: 16px;
  box-shadow: 0 4px 12px var(--shadow-soft);
`,le=r.div`
  flex: 1;
`,de=r.h3`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 4px;
`;r.p`
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  color: ${e=>e.$isDark?"var(--text-accent)":"var(--text-secondary)"};
  margin-bottom: 8px;
`;const ce=r.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-top: 16px;
`,pe=r.div`
  text-align: center;
  padding: 12px;
  background: ${e=>e.$isDark?"rgba(42, 42, 42, 0.95)":"rgba(230, 211, 179, 0.95)"};
  border-radius: 12px;
  border: 1px solid var(--border-color);
  backdrop-filter: blur(10px);
`,xe=r.div`
  font-family: 'JetBrains Mono', monospace;
  font-size: 20px;
  font-weight: 700;
  color: var(--matte-red);
  margin-bottom: 4px;
`,he=r.div`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 12px;
  color: var(--text-primary);
`,ue=r.div`
  background: ${e=>e.$isDark?"rgba(42, 42, 42, 0.95)":"rgba(230, 211, 179, 0.95)"};
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 4px 20px var(--shadow-card);
  margin: 0 16px 20px 16px;
  border: 1px solid var(--border-color);
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
`,ge=r.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`,fe=r.div`
  display: flex;
  align-items: center;
`,me=r.div`
  font-size: 32px;
  margin-right: 12px;
  ${e=>{switch(e.$level){case"Bronze":return"color: #CD7F32;";case"Silver":return"color: #C0C0C0;";case"Gold":return"color: #FFD700;";default:return"color: var(--matte-red);"}}}
`,be=r.div`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
`,ve=r.h3`
  font-size: 18px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 4px;
`,ye=r.div`
  font-size: 14px;
  color: var(--text-secondary);
`,we=r.div`
  background: ${e=>e.$isDark?"rgba(42, 42, 42, 0.95)":"rgba(230, 211, 179, 0.95)"};
  border-radius: 16px;
  padding: 20px;
  margin: 0 16px 20px 16px;
  margin-bottom: 20px;
  box-shadow: 0 4px 20px var(--shadow-card);
  border: 1px solid var(--border-color);
  backdrop-filter: blur(10px);
`,ke=r.h3`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`;r.div`
  background: ${e=>e.$isDark?"#2a2a2a":"#ffffff"};
  border: 1px solid ${e=>e.$isDark?"#444":"#e0e0e0"};
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;const $e=r.div`
  background: ${e=>e.$isDark?"rgba(42, 42, 42, 0.95)":"rgba(230, 211, 179, 0.95)"};
  border-radius: 8px;
  padding: 8px;
  text-align: center;
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  width: 100px;
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px var(--shadow-soft);
  }
`,je=r.div`
  background: ${e=>e.$isDark?"rgba(42, 42, 42, 0.95)":"rgba(230, 211, 179, 0.95)"};
  border-radius: 16px;
  padding: 20px;
  margin: 0 16px 20px 16px;
  border: 1px solid var(--border-color);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 20px var(--shadow-card);
`,Se=r.div`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
`,De=r.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 6px;
  background: var(--matte-red);
  color: white;
  font-size: 14px;
  font-weight: bold;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  transform: ${e=>e.$isExpanded?"rotate(180deg)":"rotate(0deg)"};
  box-shadow: 0 2px 8px rgba(162, 59, 59, 0.3);
  position: absolute;
  right: 0;
`,Ce=r.div`
  max-height: ${e=>e.$isExpanded?"400px":"0"};
  overflow: ${e=>e.$isExpanded?"auto":"hidden"};
  transition: max-height 0.3s ease;
  padding-right: 8px;
  margin-right: -8px;
  
  /* Стилизация скроллбара */
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.3);
  }
`,ze=r.div`
  background: ${e=>e.$isDark?"rgba(35, 35, 35, 0.8)":"rgba(255, 255, 255, 0.7)"};
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 12px;
  border: 1px solid ${e=>e.$isDark?"rgba(255, 255, 255, 0.1)":"rgba(0, 0, 0, 0.1)"};
  box-shadow: 
    0 2px 8px rgba(0, 0, 0, 0.15),
    0 1px 3px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
`,_e=r.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`,Ie=r.div`
  font-family: 'Inter', Arial, sans-serif;
  font-size: 12px;
  color: ${e=>e.$isDark?"var(--text-primary)":"#999999"};
  font-weight: 400;
`,Pe=r.div`
  background: #5cb85c;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-family: 'Inter', Arial, sans-serif;
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,Ae=r.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 8px;
  
  .type-icon {
    font-size: 14px;
  }
  
  .type-text {
    font-family: 'Inter', Arial, sans-serif;
    font-size: 12px;
    color: ${e=>e.$isDark?"var(--text-primary)":"#666666"};
    font-weight: 500;
  }
`,Ee=r.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`,Me=r.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: 'Inter', Arial, sans-serif;
  font-size: 13px;
  
  span:first-child {
    color: ${e=>e.$isDark?"var(--text-primary)":"#666666"};
    font-weight: 400;
    font-size: 13px;
  }
  
  span:last-child {
    color: ${e=>e.$isDark?"var(--text-primary)":"#333333"};
    font-weight: 500;
    font-size: 13px;
  }
`,Oe=r.button`
  background: var(--matte-red);
  color: ${e=>e.$isDark?"black":"white"};
  border: none;
  border-radius: 12px;
  padding: 12px 24px;
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 16px;
  width: 100%;
  
  &:hover {
    background: var(--terracotta);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px var(--shadow-soft);
  }
  
  &:active {
    transform: translateY(0);
  }
`;r.button`
  background: linear-gradient(135deg, #A23B3B, #8B2A2A);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 600;
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
`,r.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 16px;
`;const Ne=r.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 18px;
  color: var(--text-secondary);
`,Fe=r.div`
  text-align: center;
  padding: 20px;
  color: var(--matte-red);
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
`,Te=r.div`
  position: fixed;
  top: -20px;
  left: 0;
  right: 0;
  bottom: -20px;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(2px);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  z-index: 1000;
  animation: ${G} 0.3s ease-out;
  padding: 80px 0 0 0;
  box-sizing: border-box;
  overflow-y: auto;
  overflow-x: hidden;
`,Be=r.div`
  background: var(--bg-card);
  border-radius: 20px;
  padding: 0;
  max-width: 95vw;
  max-height: 90vh;
  width: 95vw;
  text-align: center;
  border: 1px solid var(--border-color);
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.3),
    0 10px 20px var(--shadow-card);
  overflow: hidden;
  position: absolute;
  top: 50px;
  left: 50%;
  transform: translateY(var(--scroll-position, 0px)) translateX(-50%);
  display: flex;
  flex-direction: column;
  
  /* Плавная анимация появления */
  animation: modalSlideIn 0.4s ease-out;
  
  @keyframes modalSlideIn {
    from {
      opacity: 0;
      transform: translateY(var(--scroll-position, 0px)) translateX(-50%) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(var(--scroll-position, 0px)) translateX(-50%) scale(1);
    }
  }
`,Re=r.div`
  background: var(--bg-card);
  border-radius: 20px 20px 0 0;
  padding: 20px 24px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
`,Le=r.h3`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 22px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
`,Ye=r.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px 24px;
`,We=r.button`
  background: ${e=>e.$isDark?"var(--bg-secondary)":"transparent"};
  border: 1px solid var(--matte-red);
  border-radius: 50%;
  width: 36px;
  height: 36px;
  min-width: 36px;
  min-height: 36px;
  color: var(--matte-red);
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  flex-shrink: 0;

  &:hover {
    background: var(--matte-red);
    color: white;
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`,qe=r.div`
  margin-bottom: 20px;
  padding: 0;
  width: 100%;
`,Ue=r.h3`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0;
  text-align: center;
  letter-spacing: 0.03em;
  position: relative;
  padding: 16px 8px;
  width: 100%;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--matte-red), transparent);
    border-radius: 1px;
    margin: 0 20px;
  }
`,Xe=r.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
`;r.div`
  background: ${e=>e.$unlocked?(e.$isDark,"var(--bg-secondary)"):"var(--bg-secondary)"};
  border: 2px solid ${e=>e.$unlocked?"var(--matte-red)":"var(--border-color)"};
  border-radius: 12px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  opacity: ${e=>e.$unlocked?1:.6};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px var(--shadow-soft);
  }
`,r.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  gap: 16px;
`;const Ge=r.div`
  font-size: 32px;
  margin-bottom: 4px;
  filter: none;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  text-shadow: 0 0 8px rgba(255, 215, 0, 0.4);
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
    text-shadow: 0 0 12px rgba(255, 215, 0, 0.6);
  }
`;r.div`
  flex: 1;
`;const Qe=r.div`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 0.7rem;
  font-weight: 600;
  color: ${e=>e.$unlocked?"var(--text-primary)":"var(--text-secondary)"};
  margin-bottom: 2px;
  line-height: 1.1;
  text-align: center;
  word-wrap: break-word;
  overflow: hidden;
`;r.div`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 0.6rem;
  color: var(--text-secondary);
  line-height: 1.2;
  text-align: center;
  word-wrap: break-word;
  overflow: hidden;
  margin-bottom: 2px;
`,r.div`
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  color: var(--text-accent);
  background: var(--bg-primary);
  padding: 4px 8px;
  border-radius: 6px;
  display: inline-block;
`;const He=r.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 20px;
  padding: 0;
  width: 100%;
`,Ve=r.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  width: 100%;
`,Je=r.div`
  font-size: 32px;
  filter: ${e=>e.$unlocked?"none":"grayscale(100%)"};
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  flex-shrink: 0;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: ${e=>e.$unlocked?"linear-gradient(135deg, rgba(220, 38, 38, 0.15), rgba(220, 38, 38, 0.05))":"rgba(128, 128, 128, 0.08)"};
  border: 2px solid ${e=>e.$unlocked?"rgba(220, 38, 38, 0.3)":"rgba(128, 128, 128, 0.15)"};
  opacity: ${e=>e.$unlocked?1:.6};
  transition: all 0.3s ease;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    border-radius: 50%;
    background: ${e=>e.$unlocked?"linear-gradient(135deg, var(--matte-red), transparent)":"transparent"};
    opacity: ${e=>e.$unlocked?.2:0};
    z-index: -1;
    transition: opacity 0.3s ease;
  }
  
  &:hover {
    transform: scale(1.08);
    background: ${e=>e.$unlocked?"linear-gradient(135deg, rgba(220, 38, 38, 0.2), rgba(220, 38, 38, 0.1))":"rgba(128, 128, 128, 0.12)"};
    border-color: ${e=>e.$unlocked?"rgba(220, 38, 38, 0.4)":"rgba(128, 128, 128, 0.2)"};
    
    &::before {
      opacity: ${e=>e.$unlocked?.3:0};
    }
  }
`,Ze=r.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
`,Ke=r.div`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 1.1rem;
  font-weight: 600;
  color: ${e=>e.$unlocked?"var(--text-primary)":"var(--text-secondary)"};
  margin-bottom: 8px;
  line-height: 1.4;
  text-align: left;
  word-wrap: break-word;
  word-break: keep-all;
  hyphens: auto;
  letter-spacing: 0.01em;
`,et=r.div`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 0.95rem;
  color: var(--text-secondary);
  line-height: 1.5;
  text-align: left;
  word-wrap: break-word;
  word-break: keep-all;
  hyphens: auto;
  opacity: 0.8;
  letter-spacing: 0.01em;
  font-weight: 500;
`,tt=r.div`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 0.9rem;
  color: var(--matte-red);
  background: rgba(162, 59, 59, 0.1);
  border: 1px solid rgba(162, 59, 59, 0.3);
  padding: 10px 18px;
  border-radius: 12px;
  display: inline-block;
  font-weight: 600;
  letter-spacing: 0.01em;
  transition: all 0.2s ease;
  align-self: center;
  text-align: center;
  
  &:hover {
    background: rgba(162, 59, 59, 0.15);
    border-color: rgba(162, 59, 59, 0.4);
  }
`,rt=r.div`
  background: ${e=>e.$isDark?"rgba(255, 255, 255, 0.08)":"rgba(255, 255, 255, 0.9)"};
  border: 2px solid ${e=>e.$unlocked?"var(--matte-red)":"var(--border-color)"};
  border-radius: 16px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  opacity: ${e=>e.$unlocked?1:.7};
  margin-bottom: 4px;
  position: relative;
  backdrop-filter: blur(10px);
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-shadow: ${e=>e.$unlocked?"0 0 15px rgba(162, 59, 59, 0.2), 0 4px 12px rgba(0, 0, 0, 0.1)":"0 2px 8px rgba(0, 0, 0, 0.05)"};
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 20px;
    background: ${e=>e.$unlocked?"linear-gradient(135deg, rgba(220, 38, 38, 0.05), transparent)":"transparent"};
    opacity: ${e=>e.$unlocked?1:0};
    transition: opacity 0.3s ease;
  }
  
  &:hover {
    background: ${e=>e.$isDark?"rgba(255, 255, 255, 0.12)":"rgba(255, 255, 255, 0.95)"};
    border-color: ${e=>(e.$unlocked,"var(--matte-red)")};
    transform: translateY(-3px);
    box-shadow: ${e=>e.$unlocked?"0 0 20px rgba(162, 59, 59, 0.3), 0 6px 16px rgba(0, 0, 0, 0.15)":"0 0 12px rgba(162, 59, 59, 0.2), 0 4px 12px rgba(0, 0, 0, 0.1)"};
    
    &::before {
      opacity: ${e=>e.$unlocked?1:.3};
    }
  }
`,it=r.div`
  width: 100%;
  height: 6px;
  background: ${e=>(e.$isDark,"var(--bg-primary)")};
  border-radius: 3px;
  overflow: hidden;
  margin-top: 8px;
`,nt=r.div`
  height: 100%;
  width: ${e=>e.$progress}%;
  background: linear-gradient(90deg, var(--matte-red), var(--terracotta));
  border-radius: 3px;
  transition: width 0.3s ease;
`,at=r.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  text-align: center;
  margin: 20px 0;
`,ot=r.div`
  font-size: 48px;
  margin-bottom: 16px;
  opacity: 0.7;
`,st=r.div`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: ${e=>(e.$isDark,"var(--text-primary)")};
  margin-bottom: 8px;
`,lt=r.div`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 14px;
  color: ${e=>(e.$isDark,"var(--text-secondary)")};
  line-height: 1.4;
`,dt=({telegramId:e,isDarkTheme:r,toggleTheme:a,onNavigate:o,onModalStateChange:s})=>{var l;const[d,c]=i.useState(null),[p,x]=i.useState(!0),[h,u]=i.useState(null),[g,f]=i.useState(!1),[m,b]=i.useState([]),[v,y]=i.useState(!1),[k,$]=i.useState(null),[j,S]=i.useState({top:"50%",transform:"translateY(-50%)"}),[D,C]=i.useState({top:"50%",transform:"translateY(-50%)"}),[z,_]=i.useState([]),[I,P]=i.useState([]),[A,E]=i.useState(!1),[M,O]=i.useState(["#A23B3B","#D2691E","#E6D3B3"]),[N,F]=i.useState(""),[T,B]=i.useState(!1),[R,L]=i.useState([]),[Y,W]=i.useState(!1),[q,U]=i.useState(!1),[G,Q]=i.useState(""),[dt,xt]=i.useState(""),[ht,ut]=i.useState({top:"50%",left:"50%"}),[gt,ft]=i.useState(!1),[mt,bt]=i.useState([]),[vt,yt]=i.useState(!1),wt={Bronze:["#CD7F32","#A0522D","#8B4513"],Silver:["#C0C0C0","#A9A9A9","#D3D3D3"],Gold:["#FFD700","#FFA500","#FF8C00"],Platinum:["#E5E4E2","#C0C0C0","#B0E0E6"],Diamond:["#B9F2FF","#4169E1","#1E90FF"]};i.useEffect(()=>{W((()=>{var e,t,r;const i=null==(e=window.Telegram)?void 0:e.WebApp,n=null==(t=null==i?void 0:i.initDataUnsafe)?void 0:t.user;return null==(r=null==n?void 0:n.id)||r.toString(),!0})())},[]),i.useEffect(()=>{var t,r,i;(null==(i=null==(r=null==(t=window.Telegram)?void 0:t.WebApp)?void 0:r.initDataUnsafe)?void 0:i.user)&&$(window.Telegram.WebApp.initDataUnsafe.user),St(),kt(e),$t(e),jt();(async()=>{try{const t=await fetch("/api/gamification/daily-login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({telegramId:e})});if(t.ok){const e=await t.json();console.log("✅ Ежедневный логин обновлен:",e)}}catch(t){console.error("❌ Ошибка обновления ежедневного логина:",t)}})()},[e]),i.useEffect(()=>{const e=[...z.map(e=>({...e,type:"yuan",sortDate:new Date(e.created_at)})),...I.map(e=>({...e,type:"order",sortDate:new Date(e.created_at)}))].sort((e,t)=>{const r=new Date(e.created_at);return new Date(t.created_at).getTime()-r.getTime()});L(e)},[z,I]);const kt=async t=>{const r=t||e;try{const e=await fetch(`/api/yuan-purchases?telegram_id=${r}`);if(e.ok){const t=await e.json();_(t.purchases||[])}}catch(i){console.error("Ошибка загрузки истории покупок юаней:",i)}},$t=async t=>{const r=t||e;try{const e=await fetch(`/api/orders-history?telegram_id=${r}`);if(e.ok){const t=await e.json();P(t.orders||[])}}catch(i){console.error("Ошибка загрузки истории заказов:",i)}},jt=async e=>{var t,r;yt(!0);try{const e=await fetch("/api/user/orders",{headers:{"x-telegram-init-data":(null==(r=null==(t=window.Telegram)?void 0:t.WebApp)?void 0:r.initData)||""}});if(e.ok){const t=await e.json();bt(t.orders||[])}}catch(i){console.error("Ошибка загрузки заказов:",i)}finally{yt(!1)}},St=async t=>{var r,i,n,a,o;const s=e||"demo";try{x(!0);const e=await fetch("/api/profile",{headers:{"x-telegram-init-data":(null==(i=null==(r=window.Telegram)?void 0:r.WebApp)?void 0:i.initData)||""}});if(!e.ok){if(404===e.status){const e={user:{telegram_id:"demo",full_name:"Демо Пользователь",phone_number:"+7 (999) 123-45-67",preferred_currency:"RUB",commission:1e3,created_at:(new Date).toISOString()},statistics:{orders:{total_orders:0,completed_orders:0},referrals:{total_referrals:0,total_clicks:0},yuan_purchases:{total_purchases:0,total_spent_rub:0,total_bought_cny:0,total_savings:0},total_savings:{total:0}},gamification:{level:"Bronze",levelProgress:0,nextLevel:"Silver",ordersToNext:1e3,xp:0,xpToNext:1e3,achievements:[]}};return c(e),void x(!1)}throw new Error("Ошибка загрузки профиля")}const t=await e.json(),h=(l=t.statistics.orders.total_orders,d=t.statistics.yuan_purchases.total_savings,5e3*l+d);t.statistics.total_savings={total:h};try{const e=null==(n=window.Telegram)?void 0:n.WebApp,r=null==(a=null==e?void 0:e.initDataUnsafe)?void 0:a.user,i=(null==(o=null==r?void 0:r.id)?void 0:o.toString())||s||"demo",l=await fetch(`/api/gamification/${i}`);if(l.ok){const e=await l.json(),r=async()=>{try{const t=await fetch(`/api/gamification/${s}/level-history`);if(t.ok){const r=await t.json();if(r.history&&r.history.length>0){const t=r.history[0],i=new Date(t.created_at).getTime();if(Date.now()-i<1e4){const r=t.new_level;wt[r]&&((e=wt[r])&&O(e),E(!0),setTimeout(()=>{E(!1)},5e3))}}}}catch(t){console.log("Не удалось проверить историю уровней")}var e};t.gamification={level:e.currentLevel,levelProgress:e.levelProgress.progress,nextLevel:e.nextLevel||"Diamond",ordersToNext:e.xpToNext,xp:e.xp,xpToNext:e.xpToNext,achievements:e.achievements.slice(0,6)};const n=await fetch(`/api/gamification/${i}/achievements-by-category`);if(n.ok){const e=await n.json(),t=[];Object.values(e.achievementsByCategory||{}).forEach(e=>{e.forEach(e=>{t.push({id:e.id?e.id.toString():`achievement_${t.length}`,key:e.achievement_key||e.key||"",name:e.name||`Достижение ${t.length+1}`,description:e.description||"",icon:e.icon||"🏆",category:e.category||"Общие",requirement:e.requirement||"",unlocked:Boolean(e.unlocked),unlockedAt:e.unlocked_at||null,xpReward:e.xp_reward||0})})}),b(t)}else b(e.achievements.map((e,t)=>({id:e.id?e.id.toString():`achievement_${t}`,key:e.key||e.achievement_key||"",name:e.name||`Достижение ${t+1}`,description:e.description||"",icon:e.icon||"🏆",category:e.category||"Общие",requirement:e.requirement||"",unlocked:Boolean(e.unlocked),unlockedAt:e.unlocked_at||null,xpReward:e.xp_reward||0})));await r(),console.log("✅ Данные геймификации загружены:",e)}}catch(p){console.error("❌ Ошибка загрузки геймификации:",p)}c(t)}catch(h){console.error("Ошибка загрузки профиля:",h),u(h instanceof Error?h.message:"Неизвестная ошибка")}finally{x(!1)}var l,d};i.useEffect(()=>{const e=()=>{ft(window.innerWidth<=480)};return e(),window.addEventListener("resize",e),()=>{window.removeEventListener("resize",e)}},[]),i.useEffect(()=>()=>{document.body.style.overflow="",document.body.style.position="",document.body.style.width=""},[]),i.useEffect(()=>{const e=()=>{const e=window.scrollY||document.documentElement.scrollTop,t=window.innerHeight||document.documentElement.clientHeight,r=window.innerWidth||document.documentElement.clientWidth;ut({top:`${e+t/2}px`,left:`${r/2}px`})};return q&&(e(),window.addEventListener("scroll",e),window.addEventListener("resize",e)),()=>{window.removeEventListener("scroll",e),window.removeEventListener("resize",e)}},[q]);const Dt=async()=>{if(!G.trim())return void xt("Введите пароль");await(async e=>{try{const t=(new TextEncoder).encode(e),r=await crypto.subtle.digest("SHA-256",t);return"4813494d137e1631bba301d5acab6e7bb7aa74ce1185d456565ef51d737677b2"===Array.from(new Uint8Array(r)).map(e=>e.toString(16).padStart(2,"0")).join("")}catch(t){return console.error("Ошибка проверки пароля:",t),!1}})(G)?(U(!1),Q(""),xt(""),o("admin")):(xt("Неверный пароль"),n.error())},Ct=()=>{U(!1),Q(""),xt("")};return p?t.jsx(H,{$isDark:r,children:t.jsx(Ne,{children:"Загрузка профиля..."})}):h?t.jsx(H,{$isDark:r,children:t.jsx(Fe,{children:h})}):d?t.jsxs(H,{$isDark:r,children:[A&&t.jsx(w,{width:window.innerWidth,height:window.innerHeight,recycle:!1,numberOfPieces:window.innerWidth<768?100:200,colors:M,gravity:.3}),t.jsxs(V,{children:[t.jsx(J,{children:"龍"}),t.jsx(J,{children:"福"}),t.jsx(J,{children:"壽"}),t.jsx(J,{children:"喜"}),t.jsx(J,{children:"財"}),t.jsx(J,{children:"吉"}),t.jsx(J,{children:"祥"}),t.jsx(J,{children:"安"}),t.jsx(J,{children:"康"}),t.jsx(J,{children:"樂"}),t.jsx(J,{children:"智"}),t.jsx(J,{children:"德"}),t.jsx(J,{children:"義"}),t.jsx(J,{children:"和"}),t.jsx(J,{children:"信"}),t.jsx(J,{children:"禮"}),t.jsx(J,{children:"仁"}),t.jsx(J,{children:"勇"})]}),t.jsxs(Z,{children:[Y&&t.jsx(K,{$isDark:r,onClick:()=>{n.medium(),U(!0),Q(""),xt("")},title:"Админка",children:"👨🏻‍💻"}),t.jsx(ee,{$isDark:r,children:"Профиль"})]}),t.jsxs(te,{onClick:a,children:[t.jsx(ie,{$isDark:r,children:"🌙"}),t.jsx(ne,{$isDark:r,children:"☀️"}),t.jsx(re,{$isDark:r})]}),t.jsxs(ae,{$isDark:r,children:[t.jsxs(oe,{children:[t.jsx(se,{$isDark:r,children:d.user.avatar_url||(null==k?void 0:k.photo_url)?t.jsx("img",{src:d.user.avatar_url||(null==k?void 0:k.photo_url),alt:"Avatar",style:{width:"100%",height:"100%",borderRadius:"50%",objectFit:"cover"},onError:e=>{e.currentTarget.style.display="none";const t=e.currentTarget.parentElement;if(t){const e=d.user.full_name||(null==k?void 0:k.first_name)||"П";t.textContent=e.charAt(0).toUpperCase()}}}):(d.user.full_name||(null==k?void 0:k.first_name)||"П").charAt(0).toUpperCase()}),t.jsxs(le,{children:[t.jsx(de,{children:(null==k?void 0:k.first_name)&&(null==k?void 0:k.last_name)?`${k.first_name} ${k.last_name}`:(null==k?void 0:k.first_name)||d.user.full_name||"Пользователь"}),t.jsxs("div",{style:{fontSize:"12px",color:r?"var(--text-accent)":"var(--text-secondary)"},children:["Участник с ",(_t=d.user.created_at,new Date(_t).toLocaleDateString("ru-RU",{year:"numeric",month:"long",day:"numeric"}))]})]})]}),t.jsxs(ce,{children:[t.jsxs(pe,{$isDark:r,children:[t.jsx(xe,{children:d.statistics.orders.total_orders}),t.jsx(he,{children:"Заказов"})]}),t.jsxs(pe,{$isDark:r,children:[t.jsx(xe,{children:d.statistics.referrals.total_referrals}),t.jsx(he,{children:"Приглашено"})]}),t.jsxs(pe,{$isDark:r,children:[t.jsx(xe,{children:d.statistics.yuan_purchases.total_purchases}),t.jsx(he,{children:"Покупок юаня"})]}),t.jsxs(pe,{$isDark:r,children:[t.jsx(xe,{children:(zt=(null==(l=d.statistics.total_savings)?void 0:l.total)||0,new Intl.NumberFormat("ru-RU",{style:"currency",currency:"RUB"}).format(zt))}),t.jsx(he,{children:"Сэкономлено"})]})]})]}),t.jsxs(ue,{$isDark:r,children:[t.jsx(ge,{onClick:()=>{const e=window.pageYOffset||document.documentElement.scrollTop,t=window.innerHeight;C({top:`${e+t/2+50}px`,transform:"translateY(-50%)"}),y(!0),null==s||s(!0),document.body.style.overflow="hidden",document.body.style.position="fixed",document.body.style.width="100%"},style:{cursor:"pointer"},children:t.jsxs(fe,{children:[t.jsx(me,{$level:d.gamification.level,children:(e=>{switch(e){case"Bronze":return"🥉";case"Silver":return"🥈";case"Gold":return"🥇";default:return"🏆"}})(d.gamification.level)}),t.jsxs(be,{children:[t.jsxs(ve,{children:[d.gamification.level," Уровень"]}),t.jsxs(ye,{children:[(100-d.gamification.levelProgress).toFixed(0),"% до ",d.gamification.nextLevel]})]})]})}),t.jsx(it,{$isDark:r,children:t.jsx(nt,{$progress:d.gamification.levelProgress})}),t.jsx("div",{style:{marginTop:"12px",display:"flex",flexDirection:"column",gap:"8px"},children:t.jsxs("div",{style:{fontSize:"14px",color:"var(--text-primary)",textAlign:"center",fontWeight:"600"},children:["✨ ",d.gamification.xp||0," XP",d.gamification.xpToNext&&d.gamification.xpToNext>0&&t.jsxs("span",{style:{color:"var(--text-secondary)",fontWeight:"400",marginLeft:"8px"},children:["(+",d.gamification.xpToNext," XP до ",d.gamification.nextLevel,")"]})]})})]}),t.jsxs(we,{$isDark:r,children:[t.jsx(ke,{children:"🏆 Достижения"}),(()=>{const e=d.gamification.achievements.filter(e=>e.unlocked);return 0===e.length?t.jsxs(at,{$isDark:r,children:[t.jsx(ot,{children:"🎯"}),t.jsx(st,{$isDark:r,children:"Получите свое первое достижение!"}),t.jsx(lt,{$isDark:r,children:"Сделайте заказ или приведите реферала, чтобы разблокировать достижения"})]}):t.jsx(Xe,{children:e.map((e,i)=>t.jsxs($e,{$isDark:r,children:[t.jsx(Ge,{$unlocked:e.unlocked,children:e.icon}),t.jsx(Qe,{$unlocked:e.unlocked,children:e.name})]},e.id||e.name||i))})})(),t.jsx(Oe,{$isDark:r,onClick:()=>{S({top:"50%",transform:"translateY(-50%)"}),f(!0),null==s||s(!0),document.body.style.overflow="hidden",document.body.style.position="fixed",document.body.style.width="100%"},children:"Посмотреть все достижения"})]}),mt&&mt.length>0&&t.jsxs(je,{$isDark:r,children:[t.jsx(Se,{$isDark:r,children:"📦 Заказы в пути"}),t.jsx(Ce,{$isExpanded:!0,children:mt.filter(e=>"Доставлен"!==e.delivery_status).map((e,i)=>t.jsxs(ze,{$isDark:r,children:[t.jsxs(_e,{children:[t.jsxs(Ie,{$isDark:r,children:["Заказ #",e.order_id]}),t.jsxs(Pe,{$status:ct(e.delivery_status),children:[pt(e.delivery_status)," ",e.delivery_status||"Создан"]})]}),t.jsxs("div",{style:{marginTop:"12px"},children:[t.jsxs("div",{style:{marginBottom:"8px"},children:[t.jsx("strong",{children:"🔍 Трек-номер:"})," ",e.internal_tracking_number||"Не назначен"]}),t.jsxs("div",{style:{marginBottom:"8px"},children:[t.jsx("strong",{children:"📍 ПВЗ:"})," ",e.pickup_point||"Не указан"]}),t.jsxs("div",{style:{marginBottom:"8px"},children:[t.jsx("strong",{children:"📅 Создан:"})," ",new Date(e.created_at).toLocaleDateString("ru-RU")]}),e.last_updated&&t.jsxs("div",{style:{marginBottom:"8px"},children:[t.jsx("strong",{children:"⏰ Обновлен:"})," ",new Date(e.last_updated).toLocaleString("ru-RU")]}),t.jsx("div",{style:{marginTop:"12px",padding:"8px 12px",background:"linear-gradient(135deg, rgba(162, 59, 59, 0.1), rgba(157, 78, 61, 0.05))",borderRadius:"8px",border:"1px solid var(--matte-red)",fontSize:"0.85rem",color:"var(--text-secondary)"},children:'💡 Используйте трек-номер для отслеживания в разделе "Отследить заказ"'})]})]},`order-${e.order_id}-${i}`))})]}),R&&R.length>0&&t.jsxs(je,{$isDark:r,children:[t.jsxs(Se,{$isDark:r,onClick:()=>B(!T),children:["История заказов",t.jsx(De,{$isExpanded:T,children:"▼"})]}),t.jsx(Ce,{$isExpanded:T,children:R.map((e,i)=>{var n;return t.jsxs(ze,{$isDark:r,children:[t.jsxs(_e,{children:[t.jsxs(Ie,{$isDark:r,children:[new Date(e.created_at).toLocaleDateString("ru-RU",{day:"2-digit",month:"2-digit",year:"numeric"}),", ",new Date(e.created_at).toLocaleTimeString("ru-RU",{hour:"2-digit",minute:"2-digit"})]}),t.jsx(Pe,{$status:e.status||"completed",children:"ЗАВЕРШЕНО"})]}),t.jsxs(Ae,{$isDark:r,children:[t.jsx("span",{className:"type-icon",children:"order"===e.type?"📦":"💰"}),t.jsx("span",{className:"type-text",children:"order"===e.type?"Оформление заказа":"Покупка юаней"})]}),t.jsx(Ee,{children:"order"===e.type?t.jsxs(t.Fragment,{children:[t.jsxs(Me,{$isDark:r,children:[t.jsx("span",{children:"Размер:"}),t.jsx("span",{children:e.product_size})]}),t.jsxs(Me,{$isDark:r,children:[t.jsx("span",{children:"Получатель:"}),t.jsx("span",{children:e.full_name})]}),t.jsxs(Me,{$isDark:r,children:[t.jsx("span",{children:"Телефон:"}),t.jsx("span",{children:e.phone_number})]}),t.jsxs(Me,{$isDark:r,children:[t.jsx("span",{children:"Пункт выдачи:"}),t.jsx("span",{children:e.pickup_point_address})]}),t.jsxs(Me,{$isDark:r,children:[t.jsx("span",{children:"Ссылка:"}),t.jsxs("span",{style:{fontSize:"12px",wordBreak:"break-all"},children:[null==(n=e.product_link)?void 0:n.substring(0,50),"..."]})]})]}):t.jsxs(t.Fragment,{children:[t.jsxs(Me,{$isDark:r,children:[t.jsx("span",{children:"Потрачено:"}),t.jsxs("span",{children:[e.amount_rub.toLocaleString("ru-RU",{minimumFractionDigits:2})," ₽"]})]}),t.jsxs(Me,{$isDark:r,children:[t.jsx("span",{children:"Получено:"}),t.jsxs("span",{children:[e.amount_cny.toLocaleString("ru-RU",{minimumFractionDigits:2})," ¥"]})]}),t.jsxs(Me,{$isDark:r,children:[t.jsx("span",{children:"Курс:"}),t.jsxs("span",{children:[e.favorable_rate," ₽"]})]}),t.jsxs(Me,{$isDark:r,children:[t.jsx("span",{children:"Экономия:"}),t.jsxs("span",{children:[e.savings.toLocaleString("ru-RU",{minimumFractionDigits:2})," ₽"]})]})]})})]},`${e.type}-${e.id||e.order_id}-${i}`)})})]}),g&&t.jsx(Te,{$modalPosition:j,onClick:()=>{n.light(),f(!1),null==s||s(!1),document.body.style.overflow="",document.body.style.position="",document.body.style.width=""},children:t.jsxs(Be,{$modalPosition:j,style:{"--scroll-position":`${window.pageYOffset||document.documentElement.scrollTop}px`},onClick:e=>e.stopPropagation(),children:[t.jsxs(Re,{children:[t.jsx(Le,{children:"🏆 Достижения"}),t.jsx(We,{$isDark:r,onClick:()=>{n.light(),f(!1),null==s||s(!1),document.body.style.overflow="",document.body.style.position="",document.body.style.width=""},children:"×"})]}),t.jsx(Ye,{children:(()=>{const e=m.reduce((e,t)=>(e[t.category]||(e[t.category]=[]),e[t.category].push(t),e),{});return t.jsx(t.Fragment,{children:Object.entries(e).map(([e,i])=>t.jsxs(qe,{children:[t.jsx(Ue,{children:e}),t.jsx(He,{children:i.map((e,i)=>t.jsxs(rt,{$isDark:r,$unlocked:e.unlocked,onClick:()=>{n.light()},children:[t.jsxs(Ve,{children:[t.jsx(Je,{$unlocked:e.unlocked,children:e.icon}),t.jsxs(Ze,{children:[t.jsx(Ke,{$unlocked:e.unlocked,children:e.name}),t.jsx(et,{children:e.description})]})]}),t.jsx(tt,{children:e.unlocked?`✅ Разблокировано! +${e.xpReward||0} XP`:`${e.requirement} (+${e.xpReward||0} XP)`})]},e.id||e.name||i))})]},e))})})()})]})}),t.jsx(X,{isOpen:v,onClose:()=>{y(!1),document.body.style.overflow="",document.body.style.position="",document.body.style.width=""},currentLevel:(null==d?void 0:d.gamification.level)||"Bronze",isDarkTheme:r,modalPosition:D,onModalStateChange:s}),q&&t.jsx("div",{style:{position:"fixed",top:0,left:0,right:0,bottom:0,backgroundColor:"rgba(0, 0, 0, 0.5)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1e3,padding:"20px"},onClick:Ct,children:t.jsxs("div",{style:{position:"absolute",top:ht.top,left:ht.left,transform:"translate(-50%, -50%)",backgroundColor:"var(--bg-card)",borderRadius:"16px",padding:gt?"20px":"24px",width:gt?"95%":"90%",maxWidth:"400px",minWidth:gt?"260px":"280px",border:"1px solid var(--border-color)",boxShadow:"0 20px 40px rgba(0, 0, 0, 0.3)",maxHeight:"90vh",overflow:"auto"},onClick:e=>e.stopPropagation(),children:[t.jsx("h3",{style:{color:"var(--text-primary)",marginBottom:"20px",fontSize:"1.3rem",fontWeight:"bold",textAlign:"center"},children:"🔐 Введите пароль"}),t.jsxs("div",{style:{marginBottom:"20px"},children:[t.jsx("input",{type:"password",value:G,onChange:e=>Q(e.target.value),placeholder:"Пароль для доступа к админке",style:{width:"100%",padding:"12px",borderRadius:"8px",border:"1px solid var(--border-color)",backgroundColor:"var(--bg-secondary)",color:"var(--text-primary)",fontSize:"1rem",outline:"none"},onKeyPress:e=>{"Enter"===e.key&&Dt()},autoFocus:!0}),dt&&t.jsx("p",{style:{color:"var(--matte-red)",fontSize:"0.9rem",marginTop:"8px",textAlign:"center",fontWeight:"bold"},children:dt})]}),t.jsxs("div",{style:{display:"flex",gap:"12px"},children:[t.jsx("button",{onClick:Ct,style:{flex:1,padding:"12px",borderRadius:"8px",border:"1px solid var(--border-color)",backgroundColor:"var(--bg-secondary)",color:"var(--text-primary)",fontSize:"1rem",cursor:"pointer",transition:"all 0.3s ease"},children:"Отмена"}),t.jsx("button",{onClick:Dt,style:{flex:1,padding:"12px",borderRadius:"8px",border:"none",background:"linear-gradient(135deg, var(--matte-red), var(--terracotta))",color:"white",fontSize:"1rem",fontWeight:"bold",cursor:"pointer",transition:"all 0.3s ease",boxShadow:"0 4px 12px rgba(162, 59, 59, 0.3)"},onMouseEnter:e=>{e.currentTarget.style.transform="translateY(-2px)",e.currentTarget.style.boxShadow="0 6px 16px rgba(162, 59, 59, 0.4)"},onMouseLeave:e=>{e.currentTarget.style.transform="translateY(0)",e.currentTarget.style.boxShadow="0 4px 12px rgba(162, 59, 59, 0.3)"},children:"Войти"})]})]})})]}):t.jsx(H,{$isDark:r,children:t.jsx(Fe,{children:"Данные профиля не найдены"})});var zt,_t};function ct(e){switch(e){case"Создан":default:return"linear-gradient(135deg, #95a5a6, #7f8c8d)";case"Доставка внутри Китая":return"linear-gradient(135deg, #3498db, #2980b9)";case"На складе в Китае":return"linear-gradient(135deg, #f39c12, #e67e22)";case"Отправлен на таможню":return"linear-gradient(135deg, #9b59b6, #8e44ad)";case"Доставка в РФ":return"linear-gradient(135deg, #e74c3c, #c0392b)";case"Доставлен":return"linear-gradient(135deg, #27ae60, #229954)"}}function pt(e){switch(e){case"Создан":default:return"📝";case"Доставка внутри Китая":return"🚚";case"На складе в Китае":return"📦";case"Отправлен на таможню":return"🏛️";case"Доставка в РФ":return"🇷🇺";case"Доставлен":return"✅"}}export{dt as default};
