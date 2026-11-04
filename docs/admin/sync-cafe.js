/* Café QR: sincroniza catálogo editado pelo painel sem alterar o layout existente. */
(async function(){
 try{
  const r=await fetch("admin-data.json",{cache:"no-store"});
  if(!r.ok)throw new Error("HTTP "+r.status);
  const data=await r.json();
  if(!Array.isArray(data.products))throw new Error("catálogo inválido");
  const groups=[...document.querySelectorAll(".category")];
  const originals=new Map();
  for(const group of groups){const cards=[...group.querySelectorAll(".products article")];cards.forEach((card,i)=>{originals.set(group.id+"-"+String(i+1).padStart(3,"0"),card)})}
  const ids=new Set();
  const formatMoney=v=>v===null||v===undefined||v===""?"Preço a consultar":Number(v).toLocaleString("pt-BR",{style:"currency",currency:"BRL"});
  for(const p of data.products){
    if(!p||!p.id||!p.category)continue;
    ids.add(p.id);
    const group=document.getElementById(p.category);
    if(!group)continue;
    let card=originals.get(p.id);
    const isNew=!card;
    if(!card){card=document.createElement("article");card.className="admin-new";const copy=document.createElement("div");copy.className="copy";for(const tag of ["h3","p","b"])copy.append(document.createElement(tag));card.append(copy);group.querySelector(".products").append(card)}
    if(!p.active){card.remove();continue}
    card.dataset.adminId=p.id;
    const copy=card.querySelector(".copy")||card;
    const name=copy.querySelector("h3"),desc=copy.querySelector("p"),price=copy.querySelector("b");
    if(name)name.textContent=p.name||"Produto";if(desc)desc.textContent=p.desc||"";if(price)price.textContent=formatMoney(p.price);
    card.dataset.search=((p.name||"")+" "+(p.desc||"")).toLocaleLowerCase("pt-BR");
    if(p.image){
      const old=card.querySelector("img");
      const oldSrc=old?.getAttribute("src");
      if(oldSrc!==p.image||!old){card.querySelector(".combo-photo")?.remove();let picture=card.querySelector("img");if(!picture){picture=document.createElement("img");card.prepend(picture)}picture.src=p.image;picture.alt=p.name||"";picture.loading="lazy"}
    }
    if(isNew){
      card.setAttribute("role","button");card.tabIndex=0;
      card.addEventListener("click",()=>openProduct(card));
      card.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();openProduct(card)}});
    }
  }
  for(const [id,card] of originals){if(!ids.has(id))card.remove()}
  const known=[...document.querySelectorAll(".category article")];
  for(const feature of document.querySelectorAll(".featured article")){
    const heading=feature.querySelector("h3")?.textContent?.trim();
    const matched=data.products.find(x=>x.name===heading);
    if(matched){if(!matched.active){feature.remove();continue}const price=feature.querySelector("b");if(price)price.textContent=formatMoney(matched.price)}
  }
  if(typeof renderMenu==="function")renderMenu();
 }catch(e){console.warn("Cardápio usa versão de reserva:",e.message)}
})();