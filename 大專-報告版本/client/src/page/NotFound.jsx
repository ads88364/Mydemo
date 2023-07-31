import React from 'react';
const NotFound = () => {
  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="text-center">
              <h1 className="display-4 text-danger">404 - Page Not Found</h1>
              <p className="lead">很抱歉! 路徑出現錯誤....</p>
              <a href="/" className="btn btn-primary">
                回到首頁
              </a>
              <br />
              <br />
              <br />
              <img
                src="https://media.tenor.com/vryv726_a4EAAAAC/%E7%B5%B1%E7%A5%9E-%E5%BC%B5%E5%98%89%E8%88%AA.gif"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
