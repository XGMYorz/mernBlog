import React, { useState, useEffect } from 'react';
import { CurrentComponentContext } from './CurrentComponentContext';

// 前端展示页
import ComponentA from './Blogpage/Blog';
// 后端管理页面
import ComponentB from './Backend/Backend';
// 登录到后端
import ComponentC from './Blogpage/ButtonC';

const App = () => {
  const [currentComponent, setCurrentComponent] = useState('ComponentA'); // 默认组件

  useEffect(() => {
    // 页面加载时，从localStorage读取组件状态
    const savedComponent = localStorage.getItem('currentComponent');
    if (savedComponent) {
      setCurrentComponent(savedComponent);
    }
  }, []);

  // 切换组件的函数
  const switchComponent = (component) => {
    setCurrentComponent(component);
    // 更新localStorage中的组件状态
    localStorage.setItem('currentComponent', component);
  };

  return (
    <CurrentComponentContext.Provider value={{ currentComponent, switchComponent }}>
      {/* 根据当前组件渲染对应的组件 */}
      {currentComponent === 'ComponentA' && <ComponentA />}
      {currentComponent === 'ComponentB' && <ComponentB />}
      {currentComponent === 'ComponentC' && <ComponentC />}
    </CurrentComponentContext.Provider>
  );
};

export default App;