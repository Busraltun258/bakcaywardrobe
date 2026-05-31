/** Kullanıcı adı → Firebase Auth e-postası (Console'da aynı e-postalarla kullanıcı oluştur) */
export const USERNAME_TO_EMAIL: Record<string, string> = {
  test: 'test@dolabim.app',
  busra: 'busra@dolap.com',
  altnbusra32: 'busra@dolap.com',
  altinbusra32: 'busra@dolap.com',
  altunbusra32: 'altunbusra32@gmail.com',
  kamuran: 'kamuran@dolap.com',
}

export function resolveLoginEmail(input: string): string | null {
  const t = input.trim().toLowerCase()
  if (t.includes('@')) return t
  return USERNAME_TO_EMAIL[t] ?? null
}

export function defaultDisplayName(usernameKey: string): string {
  const u = usernameKey.trim().toLowerCase()
  if (u === 'test') return 'Test'
  if (u === 'kamuran') return 'Kamuran'
  if (u === 'altnbusra32' || u === 'altinbusra32' || u === 'altunbusra32' || u === 'busra') {
    return 'Büşra'
  }
  return usernameKey.trim() || 'Kullanıcı'
}
