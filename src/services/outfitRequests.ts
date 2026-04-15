import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'

export async function sendOutfitFeedback(params: {
  requestId: string
  liked: boolean
  comment?: string
}) {
  const { requestId, liked, comment } = params
  await updateDoc(doc(db, 'outfitRequests', requestId), {
    status: liked ? 'liked' : 'disliked',
    feedbackLiked: liked ? 'yes' : 'no',
    feedbackComment: (comment ?? '').trim(),
    feedbackAt: Date.now(),
  })
}
