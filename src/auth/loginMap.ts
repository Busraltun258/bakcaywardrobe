/** Kullanıcı adı → Firebase Auth e-postası (Console’da aynı e-postalarla kullanıcı oluştur) */
export const USERNAME_TO_EMAIL: Record<string, string> = {
  kamuran: 'kamuran@dolabim.app',
  busra: 'busra@dolabim.app',
  altnbusra32: 'busra@dolabim.app',
  altinbusra32: 'busra@dolabim.app',
}

export function resolveLoginEmail(input: string): string | null {
  const t = input.trim().toLowerCase()
  if (t.includes('@')) return t
  return USERNAME_TO_EMAIL[t] ?? null
}

export function defaultDisplayName(usernameKey: string): string {
  const u = usernameKey.trim().toLowerCase()
  if (u === 'kamuran') return 'Kamuran'
  if (u === 'altnbusra32' || u === 'altinbusra32' || u === 'busra') return 'Büşra'
  return usernameKey.trim() || 'Kullanıcı'
}
