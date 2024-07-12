import React, { useState } from 'react';
import { useContext } from 'react'; 

import { CurrentComponentContext } from '../CurrentComponentContext.js';
// import ReactTypingEffect from 'react-typing-effect';
import TypeIt from "typeit-react";

import logo from '../img/ico/Denotou.png';

import PageA from './page/pageA.js';
import PageB from './page/pageB.js';
import PageC from './page/pageC.js';
import PageD from './page/pageD.js';
import PageE from './page/pageE.js';

import Bato from './page/bato.js';
import Bottom from './page/bottom.js';

//父组件 blog
const Blog = () => {
  //切换根组件渲染
  const { switchComponent } = useContext(CurrentComponentContext);
  //默认显示的组件页
  const [currentOption, setCurrentOption] = useState('A');

  const handleOptionClick = (option) => {
    setCurrentOption(option);

    window.scrollTo(0, 0); // 将滚动位置重置为顶部
    setCurrentOption(option);
  };

  
  return (
    <div>
      <div id="topNavt">
        <div id="topNavts">
          {/* logo区 */}
          <div id="topNavtsUser">
            <div>
            <img src={logo} className="App-logo" alt="logo" />
            </div>

                <TypeIt>
                <a>Mern Daisyouri</a>
                </TypeIt>  
          </div>

          {/* Top导航菜单 */}
          <div id="topNavtsA">
            <a className={currentOption === 'A' ? 'active' : ''}
              onClick={() => handleOptionClick('A')}>首页</a>
            <a className={currentOption === 'B' ? 'active' : ''}
              onClick={() => handleOptionClick('B')}>博客</a>
            <a className={currentOption === 'C' ? 'active' : ''}
              onClick={() => handleOptionClick('C')}>纸条</a>
            <a className={currentOption === 'E' ? 'active' : ''}
              onClick={() => handleOptionClick('E')}>推荐</a>
            <a className={currentOption === 'D' ? 'active' : ''}
              onClick={() => handleOptionClick('D')}>关于</a>
          </div>

          {/* 后端登录页面 */}
          <div id="topNavtsIco">
            <button>☾</button>
            <button>Git</button>
            <button onClick={() => switchComponent('ComponentC')}>Us</button>
          </div>

        </div>
      </div>

      {/* 组件页内容 */}
      <div>
        {currentOption === 'A' && <PageA />}
        {currentOption === 'B' && <PageB />}
        {currentOption === 'C' && <PageC />}
        {currentOption === 'D' && <PageD />}
        {currentOption === 'E' && <PageE />}
      </div>

      {/* 其他组件 */}
      <Bato />
      <Bottom />
    </div>
  );
};

export default Blog;