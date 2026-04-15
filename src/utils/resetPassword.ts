import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";

export const resetPassword = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Şifre sıfırlama e-postası gönderildi! 📧 E-postanızı kontrol edin.");
  } catch (error: any) {
    alert("Hata: " + error.message);
  }
};
