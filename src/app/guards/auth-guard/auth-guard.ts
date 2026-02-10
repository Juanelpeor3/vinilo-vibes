import { CanActivateFn } from '@angular/router';
import { supabase } from '../../supabase';

export const authGuard: CanActivateFn = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  return !!session;
};