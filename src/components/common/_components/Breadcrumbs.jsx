import { useTranslation } from "react-i18next";
import { Link, useLocation, useParams } from "react-router-dom";

function Breadcrumbs() {
  const { t } = useTranslation();
  const location = useLocation();
  const { idList } = useParams();
  const pathnames = location.pathname.split('/').filter((x) => x && !/^[0-9a-fA-F]{24}$/.test(x));

  function goBack() {
    window.history.back();
  }

  const buttonStyle = {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '10px 20px',
    cursor: 'pointer',
  };

  return (
    <>
     <section className="section-box">
      <div className="breacrumb-cover">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-12 col-12">
              <ul className="breadcrumbs">
                {pathnames.map((pathname, index) => (
                <li key={pathname}>
                  <Link to={`/${pathnames.slice(0, index + 1).join('/')}`}>
                    {t(pathname)}
                  </Link>
                </li>
              ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section>
      <div className="container">
          <div className="row">
             <div>
                { idList && <button
                className="btn btn-primary" 
                onClick={goBack} 
              >
                <i className="bi bi-chevron-left"></i>
              </button> }
             </div>
          </div>          
      </div>
    </section>
    </>
  );
}

export default Breadcrumbs;
