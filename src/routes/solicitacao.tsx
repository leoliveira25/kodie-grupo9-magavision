import { createFileRoute, Link } from '@tanstack/react-router';
import { useEffect, useState, type FormEvent } from 'react';
import { ArrowLeftRight, ArrowRight, ArrowLeft, LockKeyhole, UploadCloud, CheckCircle2, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Toaster, toast } from 'sonner';
import { STORAGE_KEY, initialRequests, statuses, createProtocol, type RequestItem } from '@/lib/requests';

export const Route = createFileRoute('/solicitacao')({
 head: () => ({ meta: [{title:'Abrir solicitação — MagaVision'},{name:'description',content:'Abra uma solicitação de troca ou devolução na MagaVision em poucos minutos, com foto do produto e acompanhamento por protocolo.'},{property:'og:title',content:'Abrir solicitação — MagaVision'},{property:'og:description',content:'Abra uma solicitação de troca ou devolução na MagaVision em poucos minutos, com foto do produto e acompanhamento por protocolo.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}] }),
 component: Solicitacao,
});

function loadItems(): RequestItem[] {
 try {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) {
   const value = JSON.parse(raw);
   if (Array.isArray(value) && value.length && value.every(x => x.id && statuses.includes(x.status) && Array.isArray(x.messages))) return value;
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(initialRequests));
 } catch { toast.error('Não foi possível carregar os dados salvos neste navegador.'); }
 return initialRequests;
}

function Solicitacao() {
 const [items, setItems] = useState<RequestItem[]>(initialRequests);
 const [ready, setReady] = useState(false);
 const [photo, setPhoto] = useState('');
 const [busy, setBusy] = useState(false);
 const [done, setDone] = useState<RequestItem | null>(null);

 useEffect(() => { setItems(loadItems()); setReady(true); }, []);

 async function upload(file?: File) {
  if (!file) return;
  if (!['image/jpeg','image/png','image/webp','image/gif'].includes(file.type)) { toast.error('Selecione uma foto JPG, PNG, WebP ou GIF.'); return; }
  if (file.size > 3*1024*1024) { toast.error('A foto deve ter até 3 MB.'); return; }
  setBusy(true);
  const reader = new FileReader();
  reader.onload = () => { if (typeof reader.result === 'string') setPhoto(reader.result); setBusy(false); };
  reader.onerror = () => { setBusy(false); toast.error('Não foi possível ler a foto.'); };
  reader.readAsDataURL(file);
 }

 function submit(e: FormEvent<HTMLFormElement>) {
  e.preventDefault();
  const f = new FormData(e.currentTarget);
  const value = (name: string) => String(f.get(name) ?? '').trim();
  if (['order','name','contact','product','description'].some(x => !value(x))) { toast.error('Preencha os campos obrigatórios.'); return; }
  const order = value('order');
  const item: RequestItem = { id: createProtocol(items), order: order.startsWith('#') ? order : `#${order}`, name: value('name'), contact: value('contact'), product: value('product'), type: value('type'), reason: value('reason'), description: value('description'), photo, status: 'Solicitação Recebida', date: new Date().toISOString(), messages: [] };
  const next = [item, ...items];
  try {
   localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
   setItems(next);
   setDone(item);
   toast.success(`Solicitação enviada! Protocolo ${item.id}`);
  } catch { toast.error('Não foi possível salvar. Libere espaço no navegador ou use uma foto menor.'); }
 }

 function reset() { setDone(null); setPhoto(''); }

 return <>
 <Toaster position="top-right" richColors/>
 <header className="app-header"><div className="header-inner"><div className="brand"><div className="brand-icon"><ArrowLeftRight size={23}/></div><div><div className="brand-name">MagaVision<span className="text-orange">.</span></div><div className="brand-sub">Central de Trocas e Devoluções</div></div></div><div className="header-right"><Link to="/"><Button variant="outline" size="sm"><ArrowLeft/>Voltar ao início</Button></Link></div></div></header>
 <main className="main-wrap">
  {done ? <section className="login-wrap">
   <div className="login-card success-card">
    <div className="success-icon"><CheckCircle2 size={44}/></div>
    <h1>Solicitação enviada!</h1>
    <p className="section-sub">Recebemos seu pedido de {done.type.toLowerCase()} e nossa equipe já vai analisar.</p>
    <div className="protocol-box"><small>Seu protocolo</small><strong>{done.id}</strong><span>Pedido {done.order} · {done.product}</span></div>
    <p className="search-hint">Guarde o protocolo. Com ele e seu contato cadastrado você acompanha cada etapa.</p>
    <div className="manage-actions">
     <Button variant="outline" onClick={reset}>Abrir outra solicitação</Button>
     <Link to="/"><Button><Search/>Acompanhar solicitação</Button></Link>
    </div>
   </div>
  </section> : <section className="login-wrap">
   <div className="login-hero"><div className="eyebrow"><ArrowLeftRight size={14}/> TROCA OU DEVOLUÇÃO</div><h1>Vamos resolver isso juntos.</h1><p>Conte o que aconteceu com seu produto para iniciarmos o atendimento. Não precisa de login.</p></div>
   <form className="login-card" onSubmit={submit}>
    <div className="form-grid">
     <label>Número do pedido *<input className="field" name="order" placeholder="Ex.: #1001" required/></label>
     <label>Nome completo *<input className="field" name="name" placeholder="Seu nome completo" autoComplete="name" required/></label>
     <label>E-mail ou WhatsApp para alertas *<input className="field" name="contact" placeholder="E-mail ou (11) 99999-9999" required/></label>
     <label>Nome do produto *<input className="field" name="product" placeholder="Ex.: Ventilador Turbo 40cm" required/></label>
     <label>Tipo de solicitação<select className="field" name="type"><option>Troca</option><option>Devolução</option></select></label>
     <label>Motivo<select className="field" name="reason">{['Defeito técnico','Avaria no transporte','Produto incorreto','Arrependimento'].map(r=><option key={r}>{r}</option>)}</select></label>
     <label className="wide">Descrição do problema *<textarea className="field" name="description" placeholder="Descreva o que aconteceu com seu produto…" required/></label>
     <label className="wide">Foto do produto<div className="upload">{photo?<img src={photo} alt="Prévia da foto selecionada"/>:<><UploadCloud size={25}/><div>Selecione uma foto do produto</div><p className="text-xs mt-2">JPG, PNG, WebP ou GIF · até 3 MB</p></>}<input aria-label="Selecionar foto do produto" type="file" accept="image/jpeg,image/png,image/webp,image/gif" className="mt-3 w-full text-xs" onChange={e=>upload(e.target.files?.[0])}/></div></label>
    </div>
    <div className="form-footer"><p><LockKeyhole size={12} className="inline mr-1"/>Ao enviar, você autoriza o uso dos seus dados apenas para tratar esta solicitação, em conformidade com a LGPD.</p><Button type="submit" disabled={busy||!ready}>{busy?'Carregando foto…':'Enviar solicitação'}<ArrowRight/></Button></div>
   </form>
  </section>}
  <p className="alert-local mt-7">Ambiente demonstrativo: dados e fotos salvos apenas neste navegador. Alertas de e-mail e WhatsApp não são enviados.</p>
 </main>
 <footer className="page-footer"><span><span className="footer-brand">MagaVision<span className="text-orange">.</span></span> Cuidando da sua experiência, até depois da compra.</span><span><LockKeyhole size={12}/> Seus dados protegidos · LGPD</span><span>© 2026 MagaVision</span></footer>
 </>;
}
