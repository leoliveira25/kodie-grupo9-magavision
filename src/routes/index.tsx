import { createFileRoute } from '@tanstack/react-router';
import { Portal } from '@/components/Portal';

export const Route = createFileRoute('/')({
 head: () => ({ meta: [{title:'MagaVision — Central de Trocas e Devoluções'},{name:'description',content:'Solicite uma troca ou devolução e acompanhe cada etapa com a MagaVision. Atendimento simples e transparente.'},{property:'og:title',content:'MagaVision — Central de Trocas e Devoluções'},{property:'og:description',content:'Sua troca ou devolução, acompanhada de perto. Uma central para clientes e atendimento.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}] }),
 component: Index,
});
function Index() { return <Portal portal="client" />; }
