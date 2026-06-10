import { OutfitMessage, OutfitSuggestion } from '../types'

/**
 * Bir önerinin mesaj geçmişini (ağaç/thread) döndürür — eskiden yeniye sıralı.
 *
 * Yeni kayıtlar `messages` dizisini kullanır. Eski kayıtlarda bu alan yoktur;
 * o durumda stilistin `advisorNote`'u + kullanıcının `comment`'i tek seferlik
 * türetilir. Böylece eski öneriler de bozulmadan görünür.
 */
export function buildThread(s: OutfitSuggestion): OutfitMessage[] {
  if (Array.isArray(s.messages) && s.messages.length > 0) {
    return [...s.messages].sort((a, b) => a.at - b.at)
  }
  const synth: OutfitMessage[] = []
  if (s.advisorNote && s.advisorNote.trim()) {
    synth.push({
      role: 'advisor',
      uid: s.advisorUid,
      text: s.advisorNote.trim(),
      at: s.createdAt ?? 0,
    })
  }
  if (s.comment && s.comment.trim()) {
    synth.push({
      role: 'user',
      uid: s.requesterUid ?? '',
      text: s.comment.trim(),
      at: s.feedbackAt ?? s.createdAt ?? 0,
    })
  }
  return synth.sort((a, b) => a.at - b.at)
}

/** Bir mesajı, eski kayıtların geçmişini koruyarak ekleyecek tam diziyi üretir. */
export function appendMessage(s: OutfitSuggestion, msg: OutfitMessage): OutfitMessage[] {
  return [...buildThread(s), msg]
}
