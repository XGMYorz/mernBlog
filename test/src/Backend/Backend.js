import React, { useState } from 'react';

import { useContext } from 'react'; 
import { CurrentComponentContext } from '../CurrentComponentContext';

// 导入 BackLeft 下的组件
// import BackA from './BackLeft/BackA';
import BackB from './BackLeft/BackB';
import BackC from './BackLeft/BackC';
import BackD from './BackLeft/BackD';
import BackE from './BackLeft/BackE';
import BackF from './BackLeft/BackF';

import './Backend.css'
import EPK from '../img/EPK.png';
import badapple from "../img/videos/badapple.mp4" 
import Juedui from '../img/UserAvatar/Juedui.png'
import jfcq from '../img/jfcq.png'

// 父组件 Backend
const Backend = () => {
   
    // 默认显示组件页 
    const [currentOption, setCurrentOption] = useState('BackA');

    const handleOptionClick = (option) => {
        setCurrentOption(option);
    }

    // 渲染对应的组件
    const renderContent = () => {
        switch (currentOption) {//这里根据currentOption的值渲染相应的组件！
            case 'BackA':
                return <BackA onOptionClick={handleOptionClick}/>;
                //这里添加BackA组件的新实时情况！
            case 'BackB':
                return <BackB />;
            case 'BackC':
                return <BackC />;
            case 'BackD':
                return <BackD />;
            case 'BackE':
                return <BackE />;
            case 'BackF':
                return <BackF />;
            default:
                return <BackA />;
        }
    };

    return (
        <div>
            {/* <NavLeft onOptionClick={handleOptionClick} activeItemNav={activeItem} /> */}
            <NavLeft onOptionClick={handleOptionClick} />
            {renderContent()}
            <div id='BackendImg'><img></img></div>

        </div>
    );
}

//子组件 后端管理首页 
const BackA = ({onOptionClick})=>{

    const [activeItem, setActiveItem] = useState('BackA');

    const handleItemClick = (itemId) => {
        setActiveItem(itemId);
        onOptionClick(itemId);
    };
    

    return(
        <div id="Back">
           <div id="BackBox">
           <div id="head-prompt"><a>后端</a> ﹥ 首页</div>
                <div id='BackA-Box'>
                    欢迎使用后端管理系统
                </div>
                <div id='BackA-Box'>
                   猜您想要执行以下操作
                </div>
                <div id='BackA-Box'>                  
                    <div>
                        <button 
                        className={activeItem === 'BackC' ? 'active' : ''} 
                        onClick={() => handleItemClick('BackC')}
                        >+ 创建博客</button>
                        <button
                        className={activeItem === 'BackD' ? 'active' : ''} 
                        onClick={() => handleItemClick('BackD')}
                        >+ 创建文章</button>
                        <button 
                        className={activeItem === 'BackE' ? 'active' : ''} 
                        onClick={() => handleItemClick('BackE')}
                        >+ 创建笔记</button>
                        <button
                        className={activeItem === 'BackF' ? 'active' : ''} 
                        onClick={() => handleItemClick('BackF')}
                        >+ 创建标签</button>
                    </div>
                </div>
                <div id='BackA-Box'>
                <video autoplay muted loop  src={badapple} />
                </div>
                
           </div>
        </div>
    )
}

// NavLeft 左侧导航栏 组件
const NavLeft = ({ onOptionClick }) => {
    //点击切换根组件渲染
    const { switchComponent } = useContext(CurrentComponentContext);

    const [activeItem, setActiveItem] = useState('BackA');

    const handleItemClick = (itemId) => {
        setActiveItem(itemId);
        onOptionClick(itemId);
    };

const [display, setDisplay] = useState(true);
const UseClick = () => {
  setDisplay(!display);
};


    return (
        <div>
            <div id="LeftNavt">
                <div id="LeftNavts">
                    <div>
                        <img src={EPK} alt="EPK Logo" />
                        <span>EPK</span>
                    </div>
                    <ul>
                        <li><a className={activeItem === 'BackA' ? 'active' : ''} 
                        onClick={() => handleItemClick('BackA')}>首页 💡</a></li>
                        <li><a className={activeItem === 'BackB' ? 'active' : ''} 
                        onClick={() => handleItemClick('BackB')}>统计 📚</a></li>
                        <li><a className={activeItem === 'BackC' ? 'active' : ''} 
                        onClick={() => handleItemClick('BackC')}>博客 📕</a></li>
                        <li><a className={activeItem === 'BackD' ? 'active' : ''} 
                        onClick={() => handleItemClick('BackD')}>文章 📑</a></li>
                        <li><a className={activeItem === 'BackE' ? 'active' : ''} 
                        onClick={() => handleItemClick('BackE')}>笔记 📔</a></li>
                        <li><a className={activeItem === 'BackF' ? 'active' : ''} 
                        onClick={() => handleItemClick('BackF')}>标签 🔖</a></li>
                    </ul>
                </div>
            </div>
            
            {/* 顶部导航栏 */}
            <div id="BackHeadBox">
                <div>
                    <img src={Juedui} onClick={UseClick}></img>
                    <ul style={{ display: display ? 'none' : 'block' }}>
                        <li>我的账号</li>
                        <li>帮 助</li>
                        <li onClick={() => switchComponent('ComponentA')}>
                            退出登录</li>
                    </ul>
                </div>
            </div>

        </div>
    );
};

export default Backend;