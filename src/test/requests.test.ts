import { describe, it, expect } from 'vitest';
import { initialRequests, findRequest, createProtocol, suggestReply } from '@/lib/requests';
describe('Request rules',()=>{
 it('initializes four requests',()=>expect(initialRequests).toHaveLength(4));
 it('tracks Ricardo’s #1001 with the specified product, reason and status',()=>{const r=findRequest(initialRequests,'#1001');expect(r?.name).toContain('Ricardo');expect(r?.product).toBe('Ventilador Turbo 40cm');expect(r?.reason).toBe('Defeito técnico');expect(r?.status).toBe('Em Análise');});
 it('finds the same request by protocol and order',()=>expect(findRequest(initialRequests,'MV-2026-01')).toEqual(findRequest(initialRequests,'1001')));
 it('generates unique protocols even when identifiers have gaps',()=>{const id=createProtocol(initialRequests);expect(initialRequests.some(x=>x.id===id)).toBe(false);const first=initialRequests[0];if(!first)throw new Error('Missing fixture');expect(createProtocol([...initialRequests,{...first,id}])).not.toBe(id);});
 it('suggests a personalized update for the selected new status',()=>{const first=initialRequests[0];if(!first)throw new Error('Missing fixture');expect(suggestReply(first,'Troca Aprovada')).toContain('Olá, Ricardo!');expect(suggestReply(first,'Troca Aprovada')).toContain('Sua troca foi aprovada!');});
});
