import React from 'react';
import { useContext } from 'react'; 
import { CurrentComponentContext } from '../CurrentComponentContext.js';

const ButtonCstyle = {
  height:"585px"
}

const ButtonC = ()=>{
      //切换根组件渲染
  const { switchComponent } = useContext(CurrentComponentContext);

    return(
    <div id='blogpage' style={ButtonCstyle}>
        <div id='blogpageBox'>

        <div id='ButtonCBox'>
            <div id='ButtonCs'>

            <div >后端登录</div>
            <button onClick={() => switchComponent('ComponentB')}>使用 Github 登录</button>
            <div >————————————   或者   ————————————</div>
            <button onClick={() => switchComponent('ComponentA')}>回到首页</button>
            
            </div>  
        </div>  
           
        </div>
      </div>
    );
}

export default ButtonC;