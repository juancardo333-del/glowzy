var cart={},t=document.getElementById('toast'),c=document.getElementById('cart'),h,
d=document.getElementById('drawer'),ov=document.getElementById('ov'),
done=document.getElementById('done'),err=document.getElementById('err');
function cop(v){return '$'+v.toLocaleString('es-CO')}
function totals(){var n=0,s=0;for(var k in cart){n+=cart[k].q;s+=cart[k].q*cart[k].p}return{n:n,s:s}}
function save(){try{localStorage.setItem('glowzy-cart',JSON.stringify(cart))}catch(e){}}
function render(keepDone){
var T=totals(),keys=Object.keys(cart),l=document.getElementById('items');
c.textContent='Carrito ('+T.n+')'+(T.n?' · '+cop(T.s):'');
l.innerHTML='';
keys.forEach(function(k){
var it=cart[k],li=document.createElement('li');
li.innerHTML='<div><b></b><small></small></div><div class="q"><button type="button" aria-label="Quitar una unidad">−</button><span></span><button type="button" aria-label="Agregar una unidad">+</button></div>';
li.querySelector('b').textContent=k;
li.querySelector('small').textContent=cop(it.p*it.q);
li.querySelector('.q span').textContent=it.q;
var bs=li.querySelectorAll('button');
bs[0].onclick=function(){it.q--;if(it.q<1)delete cart[k];save();render()};
bs[1].onclick=function(){it.q++;save();render()};
l.appendChild(li)});
document.getElementById('tot').textContent=cop(T.s);
document.getElementById('order').hidden=!keys.length;
if(!keepDone)done.hidden=true;
document.getElementById('empty').hidden=keys.length>0||!done.hidden;
err.hidden=true}
function openD(v){d.classList.toggle('on',v);ov.classList.toggle('on',v);d.setAttribute('aria-hidden',String(!v));if(v)document.getElementById('x').focus();else c.focus()}
c.addEventListener('click',function(){openD(true)});
document.getElementById('x').addEventListener('click',function(){openD(false)});
ov.addEventListener('click',function(){openD(false)});
document.addEventListener('keydown',function(e){if(e.key==='Escape')openD(false)});
document.querySelectorAll('.add').forEach(function(b){b.addEventListener('click',function(){
var k=b.dataset.n;
if(cart[k])cart[k].q++;else cart[k]={p:Number(b.dataset.p),q:1};
save();render();
t.textContent=k+' agregado al carrito';t.classList.add('on');
clearTimeout(h);h=setTimeout(function(){t.classList.remove('on')},1800)})});
document.querySelectorAll('.chip').forEach(function(ch){ch.addEventListener('click',function(){
document.querySelectorAll('.chip').forEach(function(x){x.classList.toggle('on',x===ch)});
document.querySelectorAll('.p').forEach(function(p){p.hidden=ch.dataset.f!=='Todos'&&p.dataset.c!==ch.dataset.f})})});
document.getElementById('go').addEventListener('click',function(){
var fn=document.getElementById('fn').value.trim(),fa=document.getElementById('fa').value.trim(),fo=document.getElementById('fo').value.trim();
if(!fn||!fa){err.hidden=false;return}
var T=totals(),m='Hola Glowzy, quiero hacer este pedido:\n';
Object.keys(cart).forEach(function(k){m+='- '+cart[k].q+' x '+k+' ('+cop(cart[k].p*cart[k].q)+')\n'});
m+='Total: '+cop(T.s)+'\nNombre: '+fn+'\nDirección: '+fa;
if(fo)m+='\nNotas: '+fo;
window.open('https://wa.me/573052116068?text='+encodeURIComponent(m),'_blank');
cart={};save();done.hidden=false;render(true)});
try{var s=JSON.parse(localStorage.getItem('glowzy-cart')||'{}');if(s&&typeof s==='object')cart=s}catch(e){}
render();
