export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <p className="footer-copy">© {year} Kuper. All rights reserved.</p>
        <a href="#home" className="footer-back">Back to top ↑</a>
      </div>
    </footer>
  )
}
