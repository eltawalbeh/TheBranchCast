import { useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabase';

export function useWorkspaceRealtime(tables: string[], onChange: () => void) {
  const callback = useRef(onChange);
  callback.current = onChange;
  const key = tables.join('|');
  useEffect(() => {
    if (!supabase || !tables.length) return;
    const channel = supabase.channel(`branchcast-${key}`).on('postgres_changes', { event: '*', schema: 'public', table: tables[0] }, () => callback.current());
    tables.slice(1).forEach(table => channel.on('postgres_changes', { event: '*', schema: 'public', table }, () => callback.current()));
    channel.subscribe();
    return () => { void supabase.removeChannel(channel); };
  }, [key]);
}
