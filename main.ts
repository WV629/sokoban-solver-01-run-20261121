import{mkdirSync,readFileSync,writeFileSync}from'node:fs'
const I=process.env.MAKEFUN_INPUT_DIR||'/input',O=process.env.MAKEFUN_OUTPUT_DIR||'/output'
function S(t){let s=t.replace(/\n/g,''),w=t.indexOf('\n'),n=s.length,W=new Uint8Array(n),G=new Uint8Array(n),B=[],P=0
for(let i=0;i<n;i++){let c=s[i];W[i]=c=='#';G[i]=c=='.'||c=='*'||c=='+';if(c=='$'||c=='*')B.push(i);if(c=='@'||c=='+')P=i}
B.sort((a,b)=>a-b);let N=[-w,w,-1,1],hy=(P/w)|0,box=new Uint8Array(n);for(let b of B)box[b]=1
function F(f,b,o){let p=new Int32Array(n).fill(-2);p[f]=-1;let q=[f];for(let i=0;i<q.length;i++){let c=q[i];for(let e of N){let m=c+e;if(W[m]||b[m]||p[m]!=-2||(o&&!o(m)))continue;p[m]=c;q.push(m)}}return p}
function Wk(f,t,b){let p=F(f,b);if(p[t]==-2)return null;let r='',c=t;for(;p[c]+1;){let d=p[c];r='udlr'[N.indexOf(c-d)]+r;c=d}return r}
let seen=new Uint8Array(n),R=[]
for(let d=-1;d<2;d+=2){let y=hy+d;if(y<0||y>=n/w)continue
for(let x=0;x<w;x++){let a=y*w+x;if(W[a]||seen[a])continue
let p=F(a,new Uint8Array(n),m=>d<0?(m/w|0)<hy:(m/w|0)>hy),c=[]
for(let i=0;i<n;i++)if(p[i]+2){c.push(i);seen[i]=1}
let b=c.filter(x=>B.includes(x)),g=c.filter(x=>G[x])
if(!b.length||b.length!=g.length)return''
R.push([c,b,a-d*w])}}
let pl=P,mv=''
for(let X of R){let c=X[0],b=X[1],e=X[2],wk=Wk(pl,e,box);if(wk===null)return'';mv+=wk;pl=e
let Y=new Uint8Array(n);for(let i of c)Y[i]=1
let M=new Map(),K=(p,bs)=>p+','+bs,sk=K(e,b);M.set(sk,[null,'',0])
let Q=[[[e,b.slice()]]],gk=null,fb=null,fp=0
for(let z=0;z<Q.length&&gk===null;z++){let q=Q[z];if(!q)continue
while(q.length){let s=q.pop(),p=s[0],bs=s[1],k=K(p,bs)
if(M.get(k)[2]!==z)continue
if(bs.every(x=>G[x])){gk=k;fb=bs;fp=p;break}
for(let i=0;i<4;i++){let u=p+N[i],j=bs.indexOf(u),nb=bs,c=z,l='udlr'[i]
if(W[u]||(!Y[u]&&u!==e))continue
if(j>=0){let de=u+N[i];if(W[de]||!Y[de]||bs.includes(de))continue;nb=bs.slice();nb[j]=de;nb.sort((a,x)=>a-x);c=z+1;l='UDLR'[i]}
let nk=K(u,nb),v=M.get(nk);if(v&&v[2]<=c)continue;M.set(nk,[k,l,c]);(Q[c]=Q[c]||[]).push([u,nb])}}}
if(gk===null)return''
let r='';for(let k=gk;M.get(k)[0]!==null;){let v=M.get(k);r=v[1]+r;k=v[0]}
mv+=r
for(let x of b)box[x]=0
for(let x of fb)box[x]=1
pl=fp}
return mv}
for(let k=1;k<6;k++){let d='i00'+k,m=''
try{m=S(readFileSync(I+'/'+d+'/level.txt','utf8'))}catch{m=''}
mkdirSync(O+'/'+d,{recursive:true});writeFileSync(O+'/'+d+'/solution.txt',m+'\n')}
