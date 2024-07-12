import { useEffect } from 'react';
// 从库中导入useEffect的Hook，Hooks用于函数组件中“钩子”  

const styles = { 
  position: 'fixed',
  bottom: '50px',
  right: '50px'
};

function BackToTop() {
  useEffect(() => {
    const backToTopButton = document.getElementById('backToTop');

    const handleScroll = () => {
      if (window.scrollY > 100) {
        backToTopButton.style.opacity = 1;
      } else {
        backToTopButton.style.opacity = 0;
      }
    };

    const handleClick = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    };

    window.addEventListener('scroll', handleScroll);
    backToTopButton.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      backToTopButton.removeEventListener('click', handleClick);
    };
  }, []); // 空数组表示只在组件挂载时执行一次

  return (
    <button id="backToTop" style={styles}>
      ▲
    </button>
  );
}

export default BackToTop;