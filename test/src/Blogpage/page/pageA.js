import React, { Component } from 'react';
import ReactTypingEffect from 'react-typing-effect';

import ico_M from '../../img/ico/MongoDB.png'
import ico_E from '../../img/ico/react.png'
import ico_R from '../../img/ico/react.png'
import ico_N from '../../img/ico/nodeJs-01.png'

import ico_01 from '../../img/ico/Nextjs.png'
import ico_02 from '../../img/ico/Javascript.png'
import ico_03 from '../../img/ico/typescript.png'
import ico_04 from '../../img/ico/Vue.png'
import ico_041 from '../../img/ico/Nuxt.png'
import ico_05 from '../../img/ico/angular.png'
import ico_06 from '../../img/ico/Nest.png'


const hrefs_01 = 'https://www.denojs.cn/'
const hrefs_02 = 'https://zh-hans.react.dev/'
const hrefs_03 = 'https://www.mongodb.com/zh-cn'

function ico_M_Click() {
  window.location.href = "https://www.mongodb.com/zh-cn";}
function ico_E_Click() {
  window.location.href = "https://zh-hans.react.dev/";}
function ico_R_Click() {
  window.location.href = "https://zh-hans.react.dev/";}
function ico_N_Click() {
  window.location.href = "https://nodejs.cn/en/learn";}
  

function ico_01_Click() {
  window.location.href = "https://www.nextjs.cn/";}
function ico_02_Click() {
  window.location.href = "https://developer.mozilla.org/zh-CN/docs/Web/JavaScript";}
function ico_03_Click() {
  window.location.href = "https://typescript.bootcss.com/";}
function ico_04_Click() {
  window.location.href = "https://cn.vuejs.org/";}
function ico_041_Click() {
  window.location.href = "https://nuxt.com.cn/";}
function ico_05_Click() {
  window.location.href = "https://angular.cn/";}
function ico_06_Click() {
  window.location.href = "https://nestjs.com/";}


class ComponentA extends Component {
  // componentDidMount() {
  //   const typeItInstance = new TypeIt('#typeit-element', {
  //     loop: true,
  //     speed: 100,
  //     nextStringDelay: 4000,
  //     deleteSpeed: 300,
  //   });
  //   typeItInstance.go();
  //   this.typeItInstance = typeItInstance;
  // }

  // componentWillUnmount() {
  //   if (this.typeItInstance) {
  //     this.typeItInstance.destroy();
  //   }
  // }
  render() {
    return (
      <div id="blogpage">
        <div id="blogpageBox">
          
          <div id="pageA-Box">
            <div>欢迎来到 (ゝ∀･)</div>
            <div>Mern Daisyouri</div>
            <div>这里,欢迎每一个热爱Web的开发人员(`ヮ´ )</div>
            <div>
              在这里、你可以                      
                <ReactTypingEffect
              text={["分享技术知识,丰富生态内容。","了解到各类技术栈的运用！"]}
              speed={50}
              cursorRenderer={null}
              effect="scroll"
              deleteSpeed={10}
                />                
            </div>

            <div>
              更多
              <a href={hrefs_01}>Deno</a>、
              <a href={hrefs_02}>React</a>、
              <a href={hrefs_03}>MongoDB</a> 相关 可戳(`ε´ )
            </div>

            <div>这里支持记录各式各样的文章与开发过程中的常见问题。(*´∀`)</div>

            <div>
              <button>个人blog</button>
              <button>关于</button>
            </div>
          
          {/* 图标列表 */}
            <div>
              <button onClick={ico_02_Click}>
                <img src={ico_02} alt="JavaScript" />
              </button>
              <button onClick={ico_03_Click}>
                <img src={ico_03} alt="TypeScript" />
              </button>

              <button onClick={ico_M_Click}>
                <img src={ico_M} alt="ico_M" />
              </button>
              <button onClick={ico_E_Click}>
                <img src={ico_01} alt="ico_E" />
              </button>
              <button onClick={ico_R_Click}>
                <img src={ico_R} alt="ico_R" />
              </button>
              <button onClick={ico_N_Click}>
                <img src={ico_N} alt="ico_N" />
              </button>

              <button onClick={ico_01_Click}>
                <img src={ico_01} alt="NextJs" />
              </button>            
              <button onClick={ico_04_Click}>
                <img src={ico_04} alt="Vue" />
              </button>
              <button onClick={ico_041_Click}>
                <img src={ico_041} alt="NuxtJs" />
              </button>
              <button onClick={ico_05_Click}>
                <img src={ico_05} alt="angular" />
              </button>
              <button onClick={ico_06_Click}>
                <img src={ico_06} alt="NestJs" />
              </button>
              <a>走过路过不要错过！</a>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default ComponentA;