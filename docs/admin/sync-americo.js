/* Recarrega os produtos editáveis do Américo, mantendo fallback do cardápio original. */
(async function(){
try{
 const response=await fetch("admin-data.json",{cache:"no-store"});
 if(!response.ok)throw new Error("HTTP "+response.status);
 const payload=await response.json();
 if(!Array.isArray(payload.products))throw new Error("Catálogo inválido");
 const clean=payload.products.filter(p=>p&&p.active!==false&&p.name&&p.category&&Array.isArray(p.opts)&&p.opts.length);
 if(!clean.length)throw new Error("Catálogo vazio");
 products.splice(0,products.length,...clean);
 const dynamic=[...new Set(clean.map(x=>x.category))];
 const allIndex=categories.indexOf("Todos");
 categories.splice(0,categories.length,...dynamic,"Todos");
 if(!categories.includes(selected))selected=dynamic[0];
 renderTabs();render();
}catch(e){console.warn("Américo: usando catálogo de reserva:",e.message)}
})();