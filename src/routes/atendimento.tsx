import { createFileRoute } from '@tanstack/react-router';
import { Portal } from '@/components/Portal';

export const Route = createFileRoute('/atendimento')({
  head: () => ({ meta: [{title:'Acesso do Atendimento — MagaVision'},{name:'description',content:'Área restrita da equipe de atendimento MagaVision.'},{property:'og:title',content:'Acesso do Atendimento — MagaVision'},{property:'og:description',content:'Área restrita da equipe de atendimento MagaVision.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary'},{name:'robots',content:'noindex'}] }),
  component: () => <Portal portal="sac" />,
});
