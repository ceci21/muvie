import React, { useEffect, useState } from 'react';
import './ScrollToTopBtn.scss';

const ScollToTopBtn = () => {
  const [shouldShowBtn, setShouldShowBtn] = useState(false);

  // When the user scrolls down 20px from the top of the document, show the button
  useEffect(() => {
    function scrollFunction() {
      if (
        document.body.scrollTop > 20 ||
        document.documentElement.scrollTop > 20
      ) {
        setShouldShowBtn(true);
      } else {
        setShouldShowBtn(false);
      }
    }
    window.onscroll = function () {
      scrollFunction();
    };
  }, []);

  const onClickHandler = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  // When the user clicks on the button, scroll to the top of the document
  const className = 'scroll-to-top-btn' + ((shouldShowBtn) ? ' show' : '');
  return (
    <div className={className} onClick={onClickHandler}>
      <i className="fas fa-arrow-up"></i>
      <div>up to top</div>
    </div>
  );
};

export default ScollToTopBtn;
