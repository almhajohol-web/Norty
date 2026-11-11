const $=s=>document.querySelector(s),v=$('#v'),S=[];let cur=0,ver=0;
const h=(t,c,x)=>{const e=document.createElement(t);if(c)e.className=c;if(x!=null)e.innerHTML=x;return e};
const sleep=ms=>new Promise(r=>setTimeout(r,ms)),alive=k=>k===ver;
const ls=(k,x)=>{try{return x===undefined?localStorage.getItem(k):localStorage.setItem(k,x)}catch(e){}};
async function type(el,t,k,ms=45){el.textContent='';for(const ch of t){if(!alive(k))return;el.textContent+=ch;await sleep(ms)}}
async function words(el,t,k){for(const w of t.split(' ')){if(!alive(k))return;el.append(h('span','w',w+' '));await sleep(300)}}
function go(i){cur=i;ver++;v.innerHTML='';v.scrollTop=0;const s=h('div','sc');v.append(s);S[i](s,ver)}
const nx=(s,l='كمّلي')=>{const b=h('button','btn',l);b.onclick=()=>go(cur+1);s.append(b)};
const ttl=(s,t)=>s.append(h('h3','ttl',t));
/* music */
let ac,mu=0,tm;const sq=[261.6,329.6,392,523.3,392,329.6,293.7,349.2,440,587.3,440,349.2];
function note(f,t){const o=ac.createOscillator(),g=ac.createGain();o.type='triangle';o.frequency.value=f;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.07,t+.03);g.gain.exponentialRampToValueAtTime(.001,t+2.4);o.connect(g);g.connect(ac.destination);o.start(t);o.stop(t+2.5)}
const chime=()=>{if(mu)note(880,ac.currentTime)};
$('#mb').onclick=()=>{if(!ac)ac=new(window.AudioContext||window.webkitAudioContext)();mu=!mu;$('#mb').textContent=mu?'♪ إيقاف الموسيقى':'♪ تشغيل الموسيقى';clearInterval(tm);if(mu){ac.resume();let k=0;const p=()=>note(sq[k++%sq.length],ac.currentTime);p();tm=setInterval(p,950)}};
/* dust */
const dc=$('#d'),dx=dc.getContext('2d'),P=[];const rs=()=>{dc.width=innerWidth;dc.height=innerHeight};rs();addEventListener('resize',rs);
for(let i=0;i<40;i++)P.push({x:Math.random(),y:Math.random(),r:Math.random()*1.4+.4,s:Math.random()*.0004+.0001});
(function f(){dx.clearRect(0,0,dc.width,dc.height);dx.fillStyle='rgba(212,175,100,.4)';for(const p of P){p.y-=p.s;if(p.y<0)p.y=1;dx.beginPath();dx.arc(p.x*dc.width,p.y*dc.height,p.r,0,7);dx.fill()}requestAnimationFrame(f)})();
/* envelope */
function env(s,m,k,done){const e=h('div','env','<div class=bk></div><div class=ltr></div><div class=fl></div><div class=ft></div>'),p=h('div','paper');p.style.cssText='margin-top:30px;display:none';s.append(e,p);
e.onclick=async()=>{if(e.classList.contains('o'))return;e.classList.add('o');chime();await sleep(1600);if(!alive(k))return;p.style.display='block';await type(p,m,k,38);done&&done()}}
/* 0 intro */
S[0]=async(s,k)=>{const p=h('div','paper','<div class=hw></div><p></p>');s.append(p);
await type(p.firstChild,'من أحمد إلى نورا...',k,70);await sleep(500);
await type(p.lastChild,'كان نفسي أقولك كلام كتير، فقررت أعملك عالم كامل جواه كل الكلام اللي معرفتش أقوله.',k,40);if(!alive(k))return;
const b=h('button','btn','ابدئي الحكاية يا نورا ♡');b.onclick=()=>{p.classList.add('out');b.disabled=1;setTimeout(()=>go(1),1000)};s.append(b)};
/* letters */
S[1]=async(s,k)=>{ttl(s,'رسالة مخصوص ليكي');const p=h('div','paper');s.append(p);await type(p,'يا نورا، يمكن مش بعرف أعبّر عن كل اللي جوايا، بس حبيت أعملك حاجة مختلفة، حاجة كل تفصيلة فيها تفكرك إنك شخص مميز جدًا.',k,42);if(alive(k))nx(s)};
S[2]=(s,k)=>{ttl(s,'رسالة من غير ميعاد');s.append(h('p','hint','اضغطي على الظرف'));env(s,'عارفة إيه الحلو في وجودك؟ إن حتى التفاصيل العادية بتبقى ليها طعم مختلف.',k,()=>nx(s))};
S[3]=async(s,k)=>{s.classList.add('dk');ttl(s,'إنتِ مش شبه حد');const p=h('p','big');s.append(p);await words(p,'مش لازم تكوني مثالية عشان تكوني مميزة، إنتِ مميزة بطريقتك، بتفاصيلك، وبكل حاجة بتخليكي إنتِ.',k);if(alive(k))nx(s)};
S[4]=async(s,k)=>{ttl(s,'لو يومك كان صعب');const c=h('div','fc','لو يومك كان صعب، افتكري إنك تستاهلي أيام حلوة كتير، وإن مفيش يوم وحش يقلل من جمالك أو قيمتك.');s.append(c);await sleep(2500);if(alive(k))nx(s)};
S[5]=(s,k)=>{ttl(s,'حاجة نفسي تعرفيها');const b=h('div','book','<div class=pg></div><div class=cv>كتاب صغير<small style="font-size:13px">اضغطي لتفتحيه</small></div>');s.append(b);
b.onclick=async()=>{if(b.classList.contains('o'))return;b.classList.add('o');await sleep(900);await type(b.firstChild,'أنا مش محتاج مناسبة عشان أقولك إنك تستاهلي كلام حلو، بس يمكن المناسبة دي كانت فرصة أقولك جزء من اللي جوايا.',k,40);if(alive(k))nx(s)}};
S[6]=(s,k)=>{ttl(s,'رسالة مخفية');s.append(h('p','hint','في حاجة صغيرة مستخبية هنا... دوري عليها'));const f=h('div','field'),z=h('button','hh','♡');z.setAttribute('aria-label','قلب مخفي');z.style.cssText=`left:${10+Math.random()*75}%;top:${10+Math.random()*75}%`;f.append(z);s.append(f);
z.onclick=async()=>{f.remove();const p=h('div','paper');s.append(p);await type(p,'في حاجات حلوة مش محتاجة شرح، كفاية إنها موجودة... ووجودك من الحاجات دي.',k,45);if(alive(k))nx(s,'معرض الرسائل')}};
/* gallery */
const M=['إنتِ من التفاصيل اللي بتخلي اليوم أحلى.','ضحكتك تستاهل يوم كامل من السعادة.','في كلام كتير، بس وجودك لوحده كفاية.','يا بخت الأيام اللي بتكوني فيها مبسوطة.','أتمنى أشوفك دايمًا في أحسن حال.','في ناس بتعدي، وفي ناس وجودها بيفضل.','يمكن الرسالة صغيرة، بس اللي وراها أكبر بكتير.','إنتِ تستاهلي كل حاجة جميلة في الدنيا.','كل مرة أفتكر إني عملت حاجة حلوة، أتمنى تكوني جزء منها.','لو الجمال كان إحساس، كان هيبقى شبه وجودك.','هدوءك بيطمّن أكتر من ألف كلمة.','طيبتك حاجة نادرة، خليكي محافظة عليها.','اليوم اللي فيه ابتسامتك بيبقى أحسن من غيره.','إنتِ أحلى خبر ممكن يوصلني.','مفيش حد زيك، وده أجمل ما فيكي.','اسمك لوحده بيفكرني بحاجات حلوة.','تستاهلي حد يشوف قيمتك كل يوم.','خدي نفسك بالراحة، إنتِ بتعملي أكتر مما تتخيلي.','الدنيا أهدى لما تكوني مبسوطة.','مش محتاجة تثبتي حاجة لحد، إنتِ كفاية.','في كل حاجة حلوة بشوفها، بفتكر إنك تستاهليها.','كلامك بيفضل في بالي حتى بعد ما ينتهي.','وجودك نعمة، وأنا شاكر إني شفتها.','لو الأيام كانت ورق، كنت كتبت عنك أحلى صفحة.','إنتِ بتفرقي كتير حتى لو مش واخدة بالك.','أحلى حاجة فيكي إنك مش بتحاولي تكوني حد تاني.','اللي بيعرفك بيحس إن الدنيا لسه فيها خير.','أتمنى كل أحلامك تلاقي طريقها ليكي.','ابتسمي، الدنيا بتحلو بيكي.','ممكن الكلام يخلص، بس إحساسي مش هيخلص.','إنتِ الجزء الهادي والجميل في أي يوم.','فخور بيكي أكتر مما تتخيلي.','كل تعب بيعدي، وإنتِ أقوى منه.','يا رب أيامك كلها تبقى بنفس جمالك.','في عيني، إنتِ مميزة من غير ما تعملي حاجة.','خليكي دايمًا زي ما إنتِ.','بسيطة وجميلة، وده أصعب توليفة.','وجودك بيدي لليوم معنى.','كل صباح أحلى لما تكوني فيه.','الكلام ده قليل، بس نيتي فيه كبيرة.'];
S[7]=(s,k)=>{let i=0,fv=new Set(JSON.parse(ls('nf')||'[]'));ttl(s,'معرض الكلام الحلو');
s.insertAdjacentHTML('beforeend','<div class=gal></div><div class=row><button class=btn>التالية</button><button class=btn>عشوائية</button><button class=btn></button><button class=btn></button></div><div class=fl2 style="max-width:420px"></div>');
const g=s.querySelector('.gal'),[bn,br,bf,bl]=s.querySelectorAll('.row .btn'),fl=s.querySelector('.fl2');
const up=()=>{bf.textContent=fv.has(i)?'♥ محفوظة':'♡ احفظيها';bl.textContent='المفضلة ('+fv.size+')'};
const sh=n=>{i=n;g.innerHTML='';const c=h('div','gc g'+n%6+' a'+n%4,'<p style="margin:0">'+M[n]+'</p><small>'+(n+1)+' / 40</small>');g.append(c);up()};
bn.onclick=()=>sh((i+1)%40);br.onclick=()=>sh(Math.floor(Math.random()*40));
bf.onclick=()=>{fv.has(i)?fv.delete(i):fv.add(i);ls('nf',JSON.stringify([...fv]));up()};
bl.onclick=()=>{fl.innerHTML=fl.innerHTML?'':([...fv].map(n=>'<div class=ac>'+M[n]+'</div>').join('')||'<p class=hint>لسه مفيش رسائل محفوظة.</p>')};
sh(0);nx(s,'أظرف لوقت ما تحتاجي')};
/* envelopes */
const EV=[['افتحي لما تكوني زعلانة','زعلك مش هيدوم يا نورا، وإنتِ أغلى من أي حاجة ضايقتك. خدي نفس عميق، وافتكري إن في ناس بتحبك.'],['افتحي لما تكوني مبسوطة','الله على الفرحة اللي في قلبك! خليكي كده، لأن سعادتك بتفرّح كل اللي حواليكي.'],['افتحي لما تفتقديني','حتى لو بعيد، كلامي معاكي. افتكري إن في حد بيفتكرك بابتسامة.'],['افتحي لما تحتاجي ابتسامة','ابتسمي دلوقتي... أيوه كده! الدنيا بقت أحلى.'],['افتحي لما تكوني محتاجة تشجيع','إنتِ قادرة، وأقوى مما تفتكري. خطوة صغيرة النهارده كفاية، وأنا واثق فيكي.'],['افتحي لما تحسي إنك مش كفاية','الإحساس ده غلط. إنتِ كفاية، وأكتر من كفاية، بكل حاجة فيكي.'],['افتحي لما يومك يكون صعب','اليوم الصعب بيعدي. اشربي حاجة دافية، ريّحي نفسك، وبكرة أحلى إن شاء الله.'],['افتحي لما تحبي تسمعي كلام حلو','صوتك حلو، وكلامك حلو، ووجودك أحلى. وأنا عمري ما هزهق من قول كده.'],['افتحي لما تكوني محتاجة تطمني','كل حاجة هتبقى كويسة، ومهما حصل إنتِ مش لوحدك.'],['افتحي لما تحبي تعرفي إنتِ مميزة قد إيه','قد الدنيا وأكتر. ومهما قلت، هيفضل في حاجات جوايا مش بتتقال.']];
S[8]=(s,k)=>{ttl(s,'أظرف افتحيها وقت ما تحتاجي');const g=h('div','eg');EV.forEach(([t,m],i)=>{const b=h('button','eb','✉<br>'+t);b.onclick=()=>{b.classList.add('d');const o=h('div','ov'),w=h('div','sc');o.append(w);document.body.append(o);w.append(h('p','hint',t));env(w,m,k);const c=h('button','btn','اقفلي الظرف');c.onclick=()=>o.remove();w.append(c)};g.append(b)});s.append(g);nx(s,'عالم نورا')};
/* world */
const A=[['ضحكتك','بتفرق في اليوم كله.'],['هدوءك','بيدي الدنيا سلام.'],['طيبتك','حاجة مش بتتنسي.'],['وجودك','بيخلي التفاصيل أحلى.'],['اسمك','بيفكرني بحاجات جميلة.']],
ST=['إنتِ نجمة في يوم أي حد بيشوفك.','تمنيت لك يوم هادي ومليان فرحة.','الأمنيات الحلوة بتبتدي بناس حلوة زيك.','ضحكتك بتنوّر أكتر من أي نجمة.','كل نجمة هنا بتقولك: إنتِ تستاهلي.','تمنيت إنك دايمًا تفضلي مبسوطة.'],
FL=['زي الورد، إنتِ بتفرّحي من غير ما تحاولي.','في كل مكان فيه ورد، بفتكرك.','الحاجات الحلوة بتفتح بهدوء... زيك.','كلمة حلوة تفتح قلب، وإنتِ تستاهلي ألف.','خليكي زي الورد، حتى في الأيام الصعبة.'],
BP=['الصفحة الأولى: إنتِ بداية كل كلام حلو.','الصفحة التانية: ضحكتك أجمل علامة ترقيم في يومي.','الصفحة التالتة: مهما اتأخرت الأيام الحلوة، هتيجي.','الصفحة الأخيرة: وإنتِ أجمل ما فيها.'];
const WR=[
wp=>{wp.innerHTML=A.map(([a,b],i)=>`<div class=ac style="--i:${i}"><b>${a}</b>${b}</div>`).join('')},
wp=>{wp.innerHTML='<div class=sky></div><p class=sm>اضغطي على نجمة</p>';const sk=wp.firstChild,sm=wp.lastChild;ST.forEach((m,i)=>{const b=h('button','st','✦');b.style.cssText=`left:${8+Math.random()*80}%;top:${8+Math.random()*75}%;animation-delay:${i*.5}s`;b.onclick=()=>{b.classList.add('on');sm.textContent=m};sk.append(b)})},
wp=>{wp.innerHTML='<div class=gd></div><p class=sm>اضغطي على زهرة</p>';const gd=wp.firstChild,sm=wp.lastChild;FL.forEach(m=>{const f=h('button','fw');for(let j=0;j<8;j++){const p=h('i');p.dataset.r=j*45;p.style.transform=`rotate(${j*45}deg) translateY(-15px) scale(.1)`;f.append(p)}f.onclick=()=>{f.querySelectorAll('i').forEach(p=>p.style.transform=`rotate(${p.dataset.r}deg) translateY(-15px) scale(1)`);sm.textContent=m};gd.append(f)})},
wp=>{let n=0;wp.innerHTML='<div class=pg2></div><div class=row><button class=btn>السابقة</button><button class=btn>التالية</button></div>';const pg=wp.firstChild,[a,b]=wp.querySelectorAll('.btn');const sh=()=>{pg.style.animation='none';pg.offsetWidth;pg.style.animation='fp .8s';pg.textContent=BP[n]};a.onclick=()=>{n=(n+3)%4;sh()};b.onclick=()=>{n=(n+1)%4;sh()};sh()},
wp=>{wp.innerHTML='<div style="perspective:600px"><div class=cube></div></div><p class=sm>اضغطي على الصندوق</p>';const cb=wp.querySelector('.cube'),sm=wp.lastChild,T=['rotateY(0)','rotateY(90deg)','rotateY(180deg)','rotateY(270deg)','rotateX(90deg)','rotateX(-90deg)'];T.forEach(t=>{const f=h('i',0,'✦');f.dataset.t=t;f.style.transform=t+' translateZ(55px)';cb.append(f)});
cb.onclick=()=>{cb.querySelectorAll('i').forEach(f=>{f.style.transform=f.dataset.t+' translateZ(200px)';f.style.opacity=0});sm.textContent='الصندوق ده فيه أغلى حاجة عندي: دعوة إنك تفضلي دايمًا مبسوطة، وإن أي وقت تحتاجي فيه كلمة، هتلاقيها هنا.'}},
wp=>{wp.innerHTML='<div class=paper style="text-align:right">نورا، لو رجعتي للرسالة دي بعد أيام أو شهور أو سنين، أنا عايزك تعرفي إن الكلام ده كان طالع من قلب صادق. أتمنى تكوني دلوقتي أقوى وأسعد، وتفتكري إنك كنتِ دايمًا تستاهلي الأحسن. ولو يوم حسيتي إن الدنيا تقيلة، ارجعي هنا، هتلاقي حد بيقولك: إنتِ كفاية.<div class=hw style="margin-top:12px">أحمد</div></div>'}];
S[9]=(s,k)=>{s.innerHTML='<h3 class=ttl>عالم نورا</h3><div class=tabs></div><div class=wp></div>';const tb=s.querySelector('.tabs'),wp=s.querySelector('.wp');
['أرشيف المشاعر','سماء الأمنيات','حديقة الكلام الحلو','كتاب صغير','الصندوق السري','رسالة للمستقبل'].forEach((n,i)=>{const b=h('button','tab',n);b.onclick=()=>{tb.querySelectorAll('.tab').forEach(x=>x.classList.remove('on'));b.classList.add('on');wp.innerHTML='';WR[i](wp)};tb.append(b)});tb.firstChild.click();nx(s,'رسالة أحمد الطويلة')};
/* long letter */
S[10]=async(s,k)=>{const p=h('div','paper','<div class=hw style="font-size:21px;line-height:2.3;min-height:14em;text-align:right"></div><div class=hw style="text-align:left;margin-top:14px;opacity:0;transition:opacity 2s">من أحمد ليكي ♡</div>');p.style.maxWidth='480px';s.append(p);
await type(p.firstChild,'نورا، أنا مش عارف إذا كان الكلام هيقدر يوصل كل اللي جوايا ولا لأ، بس حبيت أعملك حاجة مختلفة عن أي رسالة عادية. حبيت كل تفصيلة هنا تكون جميلة، وكل كلمة تكون طالعة من قلبي. أتمنى تفضلي دايمًا مبسوطة، وتفضلي شايفة نفسك بالشكل الجميل اللي تستاهليه. يمكن الموقع ده مجرد شوية صفحات ورسائل، لكنه بالنسبة لي طريقة أقولك بيها إنك شخص يستاهل كل حاجة حلوة.',k,38);
if(!alive(k))return;p.lastChild.style.opacity=1;await sleep(2500);if(alive(k))nx(s,'آخر مفاجأة')};
/* finale */
S[11]=async(s,k)=>{$('#d').style.display='none';v.style.overflow='hidden';s.style.cssText='position:fixed;inset:0;padding:0;background:#050305;display:block';
try{await document.fonts.load('700 100px Cairo')}catch(e){}
const W=innerWidth,H=innerHeight,weak=(navigator.hardwareConcurrency||4)<=4||W*H<45e4,N=weak?5500:11000,Tn=weak?1100:2000;
const r=new THREE.WebGLRenderer({antialias:false});r.setPixelRatio(Math.min(devicePixelRatio,weak?1.5:2));r.setSize(W,H);r.setClearColor(0x050305);s.append(r.domElement);
const cam=new THREE.PerspectiveCamera(45,W/H,1,600),sc=new THREE.Scene(),grp=new THREE.Group();sc.add(grp);
const cv=document.createElement('canvas');cv.width=640;cv.height=200;const x=cv.getContext('2d');x.fillStyle='#fff';x.font='700 100px Cairo,sans-serif';x.textAlign='center';x.textBaseline='middle';x.direction='rtl';x.fillText('أحمد ♥ نورا',320,100);
const d=x.getImageData(0,0,640,200).data,tp=[];for(let j=0;j<200;j+=2)for(let i=0;i<640;i+=2)if(d[(j*640+i)*4+3]>128)tp.push([(i-320)*.04,(100-j)*.04+.5,(640-i)/640]);
const a=new Float32Array(N*3),b=new Float32Array(N*3),c=new Float32Array(N*3),sz=new Float32Array(N),dl=new Float32Array(N),col=new Float32Array(N*3);
for(let i=0;i<N;i++){const tx=i<Tn&&tp.length,t=Math.random()*6.2832,ph=tx?Math.random()*.9:Math.acos(1-2*Math.random()),kk=Math.sin(ph)*(tx?1:.9+Math.random()*.1),
hx=16*Math.pow(Math.sin(t),3),hy=13*Math.cos(t)-5*Math.cos(2*t)-2*Math.cos(3*t)-Math.cos(4*t);
b[i*3]=hx*kk+(Math.random()-.5)*.4;b[i*3+1]=(hy+2.5)*kk+(Math.random()-.5)*.4;b[i*3+2]=9*Math.cos(ph)+(Math.random()-.5)*.4;
const u=Math.random()*6.28,w=Math.random()*2-1,q=Math.sqrt(1-w*w),R=40+Math.random()*90;a[i*3]=q*Math.cos(u)*R;a[i*3+1]=w*R;a[i*3+2]=q*Math.sin(u)*R;
if(tx){const p=tp[Math.floor(Math.random()*tp.length)];c[i*3]=p[0];c[i*3+1]=p[1];c[i*3+2]=10.8+Math.random()*.3;dl[i]=p[2];sz[i]=2.8;col.set([1,.86,.5],i*3)}
else{c.set([b[i*3],b[i*3+1],b[i*3+2]],i*3);sz[i]=1.2+Math.random()*1.4;const m=Math.random(),l=.6+Math.random()*.4;col.set(m<.55?[1*l,.78*l,.42*l]:m<.85?[1*l,.95*l,.82*l]:[.65*l,.14*l,.22*l],i*3)}}
const gm=new THREE.BufferGeometry();[['position',b,3],['a',a,3],['c',c,3],['s',sz,1],['dl',dl,1],['col',col,3]].forEach(([n,ar,z])=>gm.setAttribute(n,new THREE.BufferAttribute(ar,z)));
const m=new THREE.ShaderMaterial({transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,uniforms:{p:{value:0},t:{value:0},be:{value:0},wv:{value:-9},px:{value:r.getPixelRatio()}},
vertexShader:`attribute vec3 a;attribute vec3 c;attribute float s;attribute float dl;attribute vec3 col;uniform float p,t,be,wv,px;varying vec3 vc;varying float va;
void main(){float e=p*p*(3.-2.*p);float g=(1.-e)*(3.+s);float cs=cos(g),sn=sin(g);vec3 st=vec3(a.x*cs-a.z*sn,a.y,a.x*sn+a.z*cs);
vec3 q=mix(st,position*(1.+be*.035),e);float tt=clamp(t*1.7-dl*.7,0.,1.);tt=tt*tt*(3.-2.*tt);q=mix(q,c,tt);
float w=exp(-pow((length(position)-wv)*.25,2.));vc=col*(.5+.5*e)+vec3(.9,.65,.25)*w*be*.8;va=.35+.65*e;
vec4 mv=modelViewMatrix*vec4(q,1.);gl_PointSize=s*px*(60./-mv.z)*(1.+tt*.6);gl_Position=projectionMatrix*mv;}`,
fragmentShader:'varying vec3 vc;varying float va;void main(){float d=length(gl_PointCoord-.5);if(d>.5)discard;gl_FragColor=vec4(vc,va*smoothstep(.5,0.,d));}'});
grp.add(new THREE.Points(gm,m));
const base=Math.max(66,24/(W/H)/.414)*1.12;
const f1=h('div','fin','<p style="font-size:22px;margin:0">كل قطعة لقت مكانها... لحد ما اكتملت أجمل صورة.</p>'),f2=h('div','fin','<p style="font-size:18px;margin:0;color:#d4af6a">من أحمد إلى نورا، بكل الحب ♡</p>');
f1.style.bottom='calc(env(safe-area-inset-bottom,0px) + 90px)';f2.style.bottom='calc(env(safe-area-inset-bottom,0px) + 40px)';s.append(f1,f2);
addEventListener('resize',()=>{r.setSize(innerWidth,innerHeight);cam.aspect=innerWidth/innerHeight;cam.updateProjectionMatrix()});
const t0=performance.now(),cl=(x,a,b)=>Math.min(b,Math.max(a,x));
(function f(){const T=(performance.now()-t0)/1000,u=m.uniforms;u.p.value=cl((T-1.5)/9,0,1);u.t.value=cl((T-11.5)/5,0,1);
let be=0,wv=-9;[17.5,19.5,21.5].forEach(b0=>{const dd=T-b0;if(dd>0&&dd<1.4){be=Math.sin(dd/1.4*Math.PI);wv=dd*26}});u.be.value=be;u.wv.value=wv;
grp.scale.setScalar(1+.04*be+.012*Math.sin(T*2));grp.rotation.y=Math.sin(T*.5)*.34;
const z=cl((T-12)/16,0,1);cam.position.z=base*(.8+.2*z*z*(3-2*z));cam.position.y=0;cam.lookAt(0,0,0);
if(T>22)f1.style.opacity=1;if(T>25)f2.style.opacity=1;r.render(sc,cam);requestAnimationFrame(f)})()};
go(0);
