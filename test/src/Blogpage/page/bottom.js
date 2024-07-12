import React,{ useState } from 'react';

import gongan from '../../img/gongan.png'
import '../../Blogpage/page.css'

const gong_01 = "https://beian.mps.gov.cn/#/query/webSearch"
const gong_02 = "https://beian.miit.gov.cn/#/Integrated/index"


const Bottom = ({onOptionClick}) => {

    // const handleItemClick = (itemID) => {
    //     setActiveItem(itemID);
    //     onOptionClick(itemID);
    //   }

    return(
        <div>
             
        <div id="BlogBottom">
            <div id="Bottom01">
                <div>
                    <ul>
                        <li onClick={() => onOptionClick('A')} >导航</li>
                        <li>首页</li>
                        <li>博客</li>
                        <li>纸条</li>
                        <li>推荐</li>
                        <li>关于</li>
                    </ul>
                </div>
                <div>
                    <ul>
                        <li>其它</li>
                        <li>当日 x 次浏览</li>
                        <li>总计 xx 次浏览</li>
                        <li>(　^ω^)</li>
                        <li>(　^ω^)</li>
                        <li>(　^ω^)</li>
                    </ul>
                </div>
            </div>
            <div id="Bottom02">
            <div>
                <a href={gong_01}>
                    <img src={gongan}></img>京公网安备xxxxxx号</a>
                <a href={gong_02}>xICP备用 xxxxx号</a>
                <a>© 2024 喻文舟  ·  共同参与构建强大的JavaScript生态</a>
            </div>
            </div>
        </div>

        </div>
    )

}

export default Bottom;