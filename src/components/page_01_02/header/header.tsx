import "./header.css";

function Header() {
  return (
    <>
      <nav className="my-nav">
        <div className="dz-logo"></div>
        <h1>
          <div className="text-container">
            <h5 id="title-0">الجمهورية الحزائرية الديمقراطية الشعبية</h5>
            <p>وزارة السكن و العمران و المدينة</p>
            <p>الوكالة الوطنية لتحسين السكن و تطويره</p>
          </div>
        </h1>
        <div className="aadl-logo"></div>
      </nav>
    </>
  );
}

export default Header;
