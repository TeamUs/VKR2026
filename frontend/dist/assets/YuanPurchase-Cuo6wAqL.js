import{r,j as t,H as o,d as e,m as a}from"./index-N47FKFb6.js";const i=a`
  from { 
    opacity: 0; 
    transform: translateY(8px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
`;a`
  from { 
    transform: translateX(100%); 
    opacity: 0; 
  }
  to { 
    transform: translateX(0); 
    opacity: 1; 
  }
`,a`
  0%, 100% { 
    transform: translateY(0px) rotate(0deg); 
    opacity: 0.1; 
  }
  50% { 
    transform: translateY(-10px) rotate(2deg); 
    opacity: 0.2; 
  }
`;const n=a`
  0% { transform: translate(0px, 0px) rotate(0deg); }
  25% { transform: translate(10px, -5px) rotate(1deg); }
  50% { transform: translate(-5px, -10px) rotate(-1deg); }
  75% { transform: translate(-8px, 5px) rotate(0.5deg); }
  100% { transform: translate(0px, 0px) rotate(0deg); }
`,s=e.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px;
`,d=e.div`
  padding: 0px 16px 100px 16px;
  min-height: 100vh;
  background: transparent;
  color: var(--text-primary);
  position: relative;
  z-index: 1;
  transition: all 0.5s ease;
  animation: ${i} 0.8s ease-out forwards;
`,l=e.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
`,p=e.div`
  position: absolute;
  font-family: 'Noto Sans SC', serif;
  color: var(--pattern-color);
  text-shadow: 
    0 0 6px var(--glow-terracotta),
    0 0 12px var(--glow-terracotta);
  animation: ${n} 25s ease-in-out infinite;
  opacity: 0.5;
  font-weight: 500;
  font-size: 1.4rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 0;
  filter: none;
  
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
`,x=e.div`
  text-align: center;
  margin-top: 0;
  margin-bottom: 24px;
  padding-top: 0;
`,c=e.h1`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 28px;
  font-weight: 700;
  color: var(--text-primary);
  margin-top: 0;
  margin-bottom: 8px;
  text-shadow: ${r=>r.$isDark?"0 0 10px var(--glow-red)":"none"};
`,m=e.div`
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

  &:hover {
    box-shadow:
      0 6px 20px var(--shadow-card),
      0 3px 10px var(--shadow-soft);
  }
`,f=e.div`
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
`,b=e.span`
  opacity: ${r=>r.$isDark?1:0};
  transition: opacity 0.3s ease;
  position: absolute;
  left: 8px;
  font-size: 0.7rem;
  color: var(--text-accent);
`,h=e.span`
  opacity: ${r=>r.$isDark?0:1};
  transition: opacity 0.3s ease;
  position: absolute;
  right: 8px;
  font-size: 0.7rem;
  color: var(--text-accent);
`,g=e.div`
  background: ${r=>r.$isDark?"rgba(42, 42, 42, 0.95)":"rgba(230, 211, 179, 0.95)"};
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 24px;
  box-shadow: 
    0 4px 20px var(--shadow-card),
    0 2px 8px var(--shadow-soft);
  margin: 0 0 24px 0;
  border: 1px solid var(--border-color);
  text-align: center;
  position: relative;
  backdrop-filter: blur(10px);
`,u=e.h3`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 16px;
`,v=e.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 16px;
`,y=e.div`
  background: ${r=>r.$isDark?"rgba(42, 42, 42, 0.95)":"#FFFFFF"};
  border-radius: 12px;
  padding: 16px;
  border: 1px solid var(--border-color);
  backdrop-filter: blur(10px);
`,w=e.div`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 12px;
  color: var(--text-secondary);
  margin-bottom: 8px;
`,j=e.div`
  font-family: 'JetBrains Mono', monospace;
  font-size: 20px;
  font-weight: 700;
  color: var(--matte-red);
`,k=e.div`
  background: ${r=>r.$isDark?"linear-gradient(135deg, rgba(162, 59, 59, 0.2), rgba(162, 59, 59, 0.1))":"linear-gradient(135deg, rgba(162, 59, 59, 0.15), rgba(162, 59, 59, 0.08))"};
  color: var(--matte-red);
  padding: 12px 20px;
  border: 2px solid var(--matte-red);
  border-radius: 16px;
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 15px;
  font-weight: 700;
  display: inline-block;
  text-align: center;
  backdrop-filter: blur(10px);
  box-shadow: ${r=>r.$isDark?"0 0 15px rgba(162, 59, 59, 0.3), 0 4px 12px rgba(0, 0, 0, 0.1)":"0 0 12px rgba(162, 59, 59, 0.2), 0 4px 8px rgba(0, 0, 0, 0.05)"};
  position: relative;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${r=>r.$isDark?"0 0 20px rgba(162, 59, 59, 0.4), 0 6px 16px rgba(0, 0, 0, 0.15)":"0 0 16px rgba(162, 59, 59, 0.3), 0 6px 12px rgba(0, 0, 0, 0.08)"};
  }
  
  &::before {
    content: '💰';
    margin-right: 8px;
    font-size: 16px;
  }
`,$=e.div`
  background: ${r=>r.$isDark?"rgba(42, 42, 42, 0.95)":"rgba(230, 211, 179, 0.95)"};
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 24px;
  box-shadow: 
    0 4px 20px var(--shadow-card),
    0 2px 8px var(--shadow-soft);
  border: 1px solid var(--border-color);
  backdrop-filter: blur(10px);
`,z=e.h3`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 16px;
  text-align: center;
`,S=e.div`
  margin-bottom: 16px;
`,A=e.label`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 15px;
  font-weight: 600;
  color: var(--text-primary);
  display: block;
  margin-bottom: 8px;
`,D=e.input`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid var(--border-color);
  border-radius: 12px;
  background: ${r=>r.$isDark?"var(--bg-card)":"#FFFFFF"};
  color: var(--text-primary);
  font-family: 'JetBrains Mono', monospace;
  font-size: 16px;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  
  &:focus {
    outline: none;
    border-color: var(--matte-red);
    box-shadow: 0 0 0 3px var(--glow-red);
  }
  
  &::placeholder {
    color: var(--matte-red);
  }
`,C=e.div`
  color: var(--matte-red);
  font-size: 0.9rem;
  margin-top: 8px;
  font-family: 'Inter', Arial, sans-serif;
`,N=e.div`
  background: var(--bg-secondary);
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 20px;
  border: 1px solid var(--border-color);
  margin: 0 0 20px 0;
  position: relative;
  box-shadow: 
    0 4px 20px var(--shadow-card),
    0 2px 8px var(--shadow-soft);
  backdrop-filter: blur(10px);
`,I=e.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  
  &:last-child {
    margin-bottom: 0;
    padding-top: 8px;
    border-top: 1px solid var(--border-color);
    font-weight: 600;
    color: var(--matte-red);
  }
`,F=e.span`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 14px;
  color: var(--text-secondary);
`,Y=e.span`
  font-family: 'JetBrains Mono', monospace;
  font-size: 14px;
  color: var(--text-primary);
  font-weight: 500;
`,B=e.button`
  width: 100%;
  padding: 16px;
  background: #A23B3B;
  border: 1px solid #A23B3B;
  border-radius: 12px;
  color: var(--bg-primary);
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  }
  
  &:active:not(:disabled) {
    transform: translateY(0);
  }
  
  &:disabled {
    background: #A23B3B;
    border: 1px solid #A23B3B;
    cursor: not-allowed;
    box-shadow: none;
  }
`,_=e.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 18px;
  color: var(--text-secondary);
`,P=e.div`
  text-align: center;
  padding: 20px;
  color: var(--matte-red);
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
`,X=e.div`
  text-align: center;
  padding: 20px;
  color: var(--matte-red);
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  background: var(--bg-secondary);
  border-radius: 12px;
  margin-bottom: 16px;
  border: 1px solid var(--border-color);
`,M=e.div`
  background: ${r=>r.$isDark?"rgba(42, 42, 42, 0.95)":"rgba(230, 211, 179, 0.95)"};
  border-radius: 16px;
  padding: 20px;
  margin: 0 0 20px 0;
  margin-bottom: 24px;
  box-shadow: 0 4px 20px var(--shadow-card);
  border: 1px solid var(--border-color);
  backdrop-filter: blur(10px);
`;e.div`
  background: ${r=>r.$isDark?"rgba(42, 42, 42, 0.95)":"rgba(230, 211, 179, 0.95)"};
  border-radius: 16px;
  padding: 20px;
  margin: 0 0 20px 0;
  box-shadow: 0 4px 20px var(--shadow-card);
  border: 1px solid var(--border-color);
  backdrop-filter: blur(10px);
`,e.h3`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 16px;
  text-align: center;
`;const T=e.ol`
  list-style: none;
  counter-reset: step-counter;
  padding: 0;
  margin: 0 0 24px 0;
`,E=e.li`
  counter-increment: step-counter;
  margin-bottom: 20px;
  padding: 16px 20px 16px 60px;
  position: relative;
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 15px;
  line-height: 1.6;
  color: var(--text-primary);
  background: var(--bg-secondary);
  border-radius: 12px;
  border: 1px solid var(--border-color);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  
  &:last-child {
    margin-bottom: 0;
  }
  
  &::before {
    content: counter(step-counter);
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    width: 32px;
    height: 32px;
    background: var(--matte-red);
    color: var(--bg-primary);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    font-weight: 600;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
`,J=e.div`
  margin-top: 24px;
  padding: 20px;
  background: linear-gradient(135deg, 
    ${r=>r.$isDark?"rgba(0, 0, 0, 0.4)":"rgba(255, 255, 255, 0.4)"}, 
    ${r=>r.$isDark?"rgba(0, 0, 0, 0.2)":"rgba(255, 255, 255, 0.2)"}
  );
  border-radius: 16px;
  border: 2px solid var(--border-color);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: 20px;
    right: 20px;
    height: 2px;
    background: linear-gradient(90deg, var(--matte-red), #ff6b6b, var(--matte-red));
    border-radius: 1px;
  }
`,O=e.h4`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 16px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 16px;
  text-align: center;
  letter-spacing: 0.5px;
`,R=e.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  padding: 14px 18px;
  font-size: 15px;
  font-weight: 600;
  color: var(--text-primary);
  background: var(--bg-card);
  border-radius: 12px;
  border: 2px solid var(--border-color);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    border-color: var(--matte-red);
  }
  
  &:last-child {
    margin-bottom: 0;
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  }
`,U=e.span`
  margin-right: 12px;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`,W=e.button`
  background: #A23B3B;
  border: 1px solid #A23B3B;
  border-radius: 16px;
  padding: 20px;
  color: var(--bg-primary);
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  margin: 0 0 20px 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  white-space: nowrap;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  }
  
  &:active {
    transform: translateY(0px);
  }
`,H=e.div`
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
  animation: ${i} 0.3s ease-out;
  padding: 80px 0 0 0;
  box-sizing: border-box;
  overflow-y: auto;
  overflow-x: hidden;
`,L=e.div`
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
`,Q=e.div`
  background: var(--bg-card);
  border-radius: 20px 20px 0 0;
  padding: 16px 20px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
`,V=e.h2`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
  white-space: nowrap;
`,q=e.button`
  background: ${r=>(r.$isDark,"var(--bg-secondary)")};
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
  transition: all 0.3s ease;
  flex-shrink: 0;
  box-sizing: border-box;
  
  &:hover {
    background: var(--matte-red);
    color: white;
  }
`,G=e.h3`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 16px;
  text-align: center;
`,K=e.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 12px;
  margin-bottom: 20px;
`,Z=e.div`
  background: ${r=>r.$active?`linear-gradient(135deg, ${r.$color}, ${r.$color}dd)`:r.$isDark?"rgba(42, 42, 42, 0.95)":"#FFFFFF"};
  border: 2px solid ${r=>r.$active?r.$color:"var(--border-color)"};
  border-radius: 12px;
  padding: 16px;
  text-align: center;
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 
    0 4px 20px var(--shadow-card),
    0 2px 8px var(--shadow-soft);
  backdrop-filter: blur(10px);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px var(--shadow-soft);
  }
`,rr=e.div`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: ${r=>r.$active?"white":"var(--text-primary)"};
  margin-bottom: 4px;
`,tr=e.div`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 14px;
  color: ${r=>r.$active?"rgba(255,255,255,0.95)":"var(--text-secondary)"};
`,or=e.div`
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  color: ${r=>r.$active?"rgba(255,255,255,0.9)":"var(--matte-red)"};
  margin-top: 4px;
  font-weight: 500;
`,er=e.div`
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
  animation: ${i} 0.3s ease-out;
  padding: 80px 0 0 0;
  box-sizing: border-box;
  overflow-y: auto;
  overflow-x: hidden;
`,ar=e.div`
  background: var(--bg-card);
  border-radius: 20px;
  padding: 0;
  max-width: 95vw;
  max-height: 90vh;
  width: 90%;
  text-align: center;
  border: 1px solid var(--border-color);
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.3),
    0 10px 20px var(--shadow-card);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: ${r=>r.$modalPosition.top};
  left: 50%;
  transform: ${r=>r.$modalPosition.transform} translateX(-50%);
  
  /* Плавная анимация появления */
  animation: successModalSlideIn 0.4s ease-out;
  
  @keyframes successModalSlideIn {
    from {
      opacity: 0;
      transform: ${r=>r.$modalPosition.transform} translateX(-50%) scale(0.95);
    }
    to {
      opacity: 1;
      transform: ${r=>r.$modalPosition.transform} translateX(-50%) scale(1);
    }
  }
`,ir=e.div`
  background: var(--bg-card);
  border-radius: 20px 20px 0 0;
  padding: 20px 24px;
  border-bottom: 1px solid var(--border-color);
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`,nr=e.h2`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 15px;
  background: linear-gradient(135deg, var(--matte-red), var(--terracotta));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`,sr=e.div`
  flex: 1;
  overflow-y: auto;
  padding: 24px;
`,dr=e.div`
  font-size: 4rem;
  margin-bottom: 20px;
  animation: ${i} 0.6s ease-out 0.2s both;
`,lr=e.p`
  font-family: 'Inter', Arial, sans-serif;
  font-size: 1rem;
  color: var(--text-secondary);
  line-height: 1.5;
  margin-bottom: 25px;
`,pr=e.button`
  background: var(--matte-red);
  color: var(--bg-primary);
  border: none;
  border-radius: 12px;
  padding: 12px 30px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px var(--shadow-soft);
  
  &:hover {
    background: var(--terracotta);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px var(--shadow-card);
  }
`,xr=({telegramId:e,isDarkTheme:a,toggleTheme:i,onModalStateChange:n})=>{var xr;const[cr,mr]=r.useState(null),[fr,br]=r.useState([]),[hr,gr]=r.useState(""),[ur,vr]=r.useState("basic"),[yr,wr]=r.useState(!0),[jr,kr]=r.useState(!1),[$r,zr]=r.useState(null),[Sr,Ar]=r.useState(null),[Dr,Cr]=r.useState(!1),[Nr,Ir]=r.useState(!1),[Fr,Yr]=r.useState(!1),[Br,_r]=r.useState({top:"50%",transform:"translateY(-50%)"}),[Pr,Xr]=r.useState(!1),[Mr,Tr]=r.useState({top:"50%",transform:"translateY(-50%)"}),[Er,Jr]=r.useState(null),Or=[{id:"basic",name:"Базовый",minAmount:200,discount:0,description:"200+ юаней",color:"#A23B3B"},{id:"premium",name:"Премиум",minAmount:1e3,discount:.15,description:"1000+ юаней",color:"#A23B3B"},{id:"vip",name:"VIP",minAmount:3e3,discount:.3,description:"3000+ юаней",color:"#8B1A1A"},{id:"ultimate",name:"Ultimate",minAmount:5e3,discount:.5,description:"5000+ юаней",color:"#5C1A1A"}];r.useEffect(()=>{Rr(),Ur()},[e]),r.useEffect(()=>{Dr&&Nr&&wr(!1)},[Dr,Nr]),r.useEffect(()=>{if(hr){const r=parseFloat(hr);if(!isNaN(r)&&r>0){let t="basic";for(const o of Or)r>=o.minAmount&&(t=o.id);vr(t)}}},[hr]);const Rr=async()=>{try{const r=await fetch("/api/exchange-rate");if(r.ok){const t=await r.json();mr({base_rate:t.rate,favorable_rate:t.rate,savings_percent:0,last_updated:(new Date).toISOString()})}else console.error("Ошибка получения курса валют:",r.status)}catch(r){console.error("Ошибка загрузки курса:",r)}finally{Cr(!0)}},Ur=async()=>{try{if(!e||"0"===e||"undefined"===e)return br([]),void Ir(!0);if("demo"===e)return br([]),void Ir(!0);const r=await fetch(`/api/yuan-purchases?telegram_id=${e}`);if(r.ok){const t=await r.json();br(t.purchases||[])}else console.error("Ошибка получения истории покупок:",r.status),br([])}catch(r){console.error("Ошибка загрузки истории:",r),br([])}finally{Ir(!0)}},Wr=r=>new Intl.NumberFormat("ru-RU",{style:"currency",currency:"RUB"}).format(r),Hr=r=>{gr(r),(r=>{if(""===r.trim())return void Jr(null);const t=parseFloat(r);!isNaN(t)&&t>=200&&t<=1e4&&Jr(null)})(r)},Lr=(r,t)=>{switch(r){case"basic":default:return t;case"premium":return t-.48;case"vip":return t-.58;case"ultimate":return t-.78}},Qr=(()=>{if(!hr)return null;const r=parseFloat(hr);if(isNaN(r)||r<200)return null;let t=Or[0];for(const a of Or)r>=a.minAmount&&(t=a);const o=null==cr?void 0:cr.favorable_rate;if(!o)return null;const e=Lr(t.id,o);return{cny:r,rub:r*e,savings:e<o?r*(o-e):0,tariff:t,rate:e}})();return yr?t.jsx(d,{$isDark:a,children:t.jsx(_,{children:"Загрузка..."})}):t.jsxs(d,{$isDark:a,children:[t.jsxs(l,{children:[t.jsx(p,{children:"龍"}),t.jsx(p,{children:"福"}),t.jsx(p,{children:"壽"}),t.jsx(p,{children:"喜"}),t.jsx(p,{children:"財"}),t.jsx(p,{children:"吉"}),t.jsx(p,{children:"祥"}),t.jsx(p,{children:"安"}),t.jsx(p,{children:"康"}),t.jsx(p,{children:"樂"}),t.jsx(p,{children:"智"}),t.jsx(p,{children:"德"}),t.jsx(p,{children:"義"}),t.jsx(p,{children:"和"}),t.jsx(p,{children:"信"}),t.jsx(p,{children:"禮"}),t.jsx(p,{children:"仁"}),t.jsx(p,{children:"勇"})]}),t.jsx(x,{children:t.jsx(c,{$isDark:a,children:"Купить юань"})}),t.jsxs(m,{onClick:i,children:[t.jsx(b,{$isDark:a,children:"🌙"}),t.jsx(h,{$isDark:a,children:"☀️"}),t.jsx(f,{$isDark:a})]}),t.jsxs($,{$isDark:a,children:[t.jsx(z,{children:"Покупка юаня"}),$r&&t.jsx(P,{style:{marginBottom:"16px",padding:"12px",background:"rgba(162, 59, 59, 0.1)",borderRadius:"8px"},children:$r}),Sr&&t.jsxs(X,{children:["✅ ",Sr]}),t.jsxs(S,{children:[t.jsx(A,{children:"Количество юаней"}),t.jsx(D,{type:"number",value:hr,onChange:r=>Hr(r.target.value),placeholder:"Введите количество (от 200 ¥)",min:"200",max:"10000",$isDark:a}),Er&&t.jsx(C,{children:Er})]}),Qr&&t.jsxs(N,{$isDark:a,children:[t.jsxs(I,{children:[t.jsx(F,{children:"Количество юаней:"}),t.jsxs(Y,{children:[Qr.cny.toFixed(2)," ¥"]})]}),t.jsxs(I,{children:[t.jsx(F,{children:"Курс:"}),t.jsxs(Y,{children:[Qr.rate.toFixed(2)," ₽ за юань"]})]}),t.jsxs(I,{children:[t.jsx(F,{children:"Тариф:"}),t.jsx(Y,{children:Qr.tariff.name})]}),Qr.savings>0&&t.jsxs(I,{children:[t.jsx(F,{children:"Экономия:"}),t.jsx(Y,{children:Wr(Qr.savings)})]}),t.jsxs(I,{children:[t.jsx(F,{children:"Сумма к оплате:"}),t.jsx(Y,{children:Wr(Qr.rub)})]})]}),t.jsx(B,{onClick:async()=>{var r,t,a;if((r=>{if(!r||""===r.trim())return Jr("Введите количество юаней"),!1;const t=parseFloat(r);return isNaN(t)||t<200?(Jr("Количество юаней должно быть от 200"),!1):t>1e4?(Jr("Максимальное количество: 10,000 юаней"),!1):(Jr(null),!0)})(hr))if(Qr){kr(!0),zr(null),Ar(null),Jr(null);try{o.medium();const i=null==(r=window.Telegram)?void 0:r.WebApp,s=null==(t=null==i?void 0:i.initDataUnsafe)?void 0:t.user,d={telegramId:(null==(a=null==s?void 0:s.id)?void 0:a.toString())||e||"unknown",username:(null==s?void 0:s.username)||"unknown",firstName:(null==s?void 0:s.first_name)||"unknown",lastName:(null==s?void 0:s.last_name)||"",amountCny:Qr.cny,amountRub:Qr.rub,tariff:Qr.tariff.name,rate:Qr.rate,savings:Qr.savings,userLink:(null==s?void 0:s.username)?`@${s.username}`:`tg://user?id=${(null==s?void 0:s.id)||e}`};if(!(await fetch("/api/yuan-purchase",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(d)})).ok)throw new Error("Ошибка при отправке заказа");{o.success();const r=window.pageYOffset||document.documentElement.scrollTop,t=window.innerHeight;Tr({top:`${r+t/2}px`,transform:"translateY(-50%)"}),Xr(!0),null==n||n(!0),gr(""),document.body.style.overflow="hidden",document.body.style.position="fixed",document.body.style.width="100%"}}catch(i){console.error("Ошибка покупки:",i),zr("Произошла ошибка при отправке заказа. Попробуйте еще раз.")}finally{kr(!1)}}else zr("Ошибка расчета стоимости")},disabled:jr,$isDark:a,$disabled:jr,children:jr?"Отправка...":"Заказать юань"})]}),t.jsxs(M,{$isDark:a,children:[t.jsx(G,{children:"Наши тарифы"}),t.jsx(K,{children:Or.map(r=>t.jsxs(Z,{$isDark:a,$active:ur===r.id,$color:r.color,children:[t.jsx(rr,{$active:ur===r.id,children:r.name}),t.jsx(tr,{$active:ur===r.id,children:r.description}),t.jsx(or,{$active:ur===r.id,children:(null==cr?void 0:cr.favorable_rate)?`${Lr(r.id,cr.favorable_rate).toFixed(2)} ₽ за юань`:"Загрузка..."})]},r.id))})]}),t.jsx(W,{$isDark:a,onClick:()=>{o.selection(),_r({top:"50%",transform:"translateY(-50%)"}),Yr(!0),null==n||n(!0),document.body.style.overflow="hidden",document.body.style.position="fixed",document.body.style.width="100%"},children:"Инструкция по покупке юаней"}),cr&&t.jsxs(g,{$isDark:a,children:[t.jsx(u,{children:"Текущий курс"}),t.jsxs(v,{children:[t.jsxs(y,{$isDark:a,children:[t.jsx(w,{children:"Обычный курс"}),t.jsxs(j,{children:[null==(xr=cr.base_rate)?void 0:xr.toFixed(2)," ₽"]})]}),t.jsxs(y,{$isDark:a,children:[t.jsx(w,{children:"Наш курс"}),t.jsxs(j,{children:[Lr("ultimate",cr.favorable_rate).toFixed(2)," ₽"]})]})]}),t.jsxs(k,{$isDark:a,children:["Экономия до ",((cr.base_rate-Lr("ultimate",cr.favorable_rate))/cr.base_rate*100).toFixed(1),"%"]})]}),Fr&&t.jsx(H,{$modalPosition:Br,onClick:()=>{o.light(),Yr(!1),null==n||n(!1),document.body.style.overflow="",document.body.style.position="",document.body.style.width=""},children:t.jsxs(L,{$isDark:a,$modalPosition:Br,onClick:r=>r.stopPropagation(),style:{"--scroll-position":`${window.pageYOffset||document.documentElement.scrollTop}px`},children:[t.jsxs(Q,{children:[t.jsx(V,{children:"Инструкция по покупке юаней"}),t.jsx(q,{$isDark:a,onClick:()=>{o.light(),Yr(!1),null==n||n(!1),document.body.style.overflow="",document.body.style.position="",document.body.style.width=""},children:"×"})]}),t.jsxs(s,{children:[t.jsxs(T,{children:[t.jsx(E,{children:"Введите количество юаней, которое хотите купить, в поле выше"}),t.jsx(E,{children:'Нажмите кнопку "Заказать юани" - сообщение с информацией автоматически отправится менеджеру'}),t.jsx(E,{children:"Отправьте менеджеру QR-код Alipay или WeChat с указанием ФИО и номера телефона, на который зарегистрирован аккаунт"}),t.jsx(E,{children:"Менеджер отправит вам реквизиты для оплаты"}),t.jsx(E,{children:"Произведите оплату по полученным реквизитам"}),t.jsx(E,{children:"Мы отправим юани на ваши реквизиты в течение 24 часов"})]}),t.jsxs(J,{$isDark:a,children:[t.jsx(O,{children:"💳 Варианты получения юаней"}),t.jsxs(R,{children:[t.jsx(U,{children:"💙"}),"Alipay"]}),t.jsxs(R,{children:[t.jsx(U,{children:"💚"}),"WeChat Pay"]})]})]})]})}),Pr&&t.jsx(er,{$modalPosition:Mr,onClick:()=>{Xr(!1),null==n||n(!1),document.body.style.overflow="",document.body.style.position="",document.body.style.width=""},children:t.jsxs(ar,{$modalPosition:Mr,onClick:r=>r.stopPropagation(),children:[t.jsx(ir,{children:t.jsx(nr,{children:"Заказ отправлен!"})}),t.jsxs(sr,{children:[t.jsx(dr,{children:"🎉"}),t.jsxs(lr,{children:["Ваш заказ на покупку юаней успешно отправлен менеджеру.",t.jsx("br",{}),"Ожидайте ответа в течение 24 часов."]}),t.jsx(pr,{onClick:()=>{Xr(!1),null==n||n(!1),document.body.style.overflow="",document.body.style.position="",document.body.style.width=""},children:"Супер!"})]})]})})]})};export{xr as default};
