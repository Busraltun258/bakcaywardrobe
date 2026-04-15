import { useNavigate } from 'react-router-dom'

export default function Header({ title, showBack = false, right = null }) {
  const navigate = useNavigate()
  return (
    <div className="header">
      {showBack ? (
        <button className="back-btn" onClick={() => navigate(-1)}>←</button>
      ) : <div />}
      <h1>{title}</h1>
      {right || <div />}
    </div>
  )
}
