import React, { useState, useEffect } from 'react';
import axios from 'axios';

const search="请输入内容:"

const BackE = ()=>{

    const [icos, setPosts] = useState([]);

    useEffect(() => {
    axios.get('http://localhost:3033/api/icos')
      .then(res => {
        console.log('Data received:', res.data);
        setPosts(res.data);
      })
      .catch(err => console.log(err));
  }, []);

    //文章数据端口
    const [Note, setPostss] = useState([]);
  
    useEffect(() => {
    axios.get('http://localhost:3033/api/notes')
      .then(res => {
        console.log('Data received:', res.data);
        setPostss(res.data);
      })
      .catch(err => console.log(err));
    }, []);
    return(
        <div id="Back">
            <div id="BackBox">
                <div id="head-prompt"><a>后端</a> ﹥ 笔记</div>

                <div id="BackE-Box">

                {/* 功能区 */}
                <div id="Back-head">
                <input type="search" placeholder={search}/>
                <button>🔍 搜索</button>
                <button>↻ 重置</button>
                <button>+  创建笔记</button>
                </div>

                 {/* 标签数据 */}
                 <div id="Back-center">
                {icos.map(post => (
                <span key={post._id}>{post.icoName}</span>
                ))}
                </div>
                
                {Note.map(post => (
                <div id='BackE-content' key={post._id}>
                    <div>
                        <div>
                            <a>{post.nTitle}</a>
                            <button>修</button>
                            <button>删</button>
                        </div>
                        <div>{post.nContent}</div>

                        <div><button>{post.icoType}</button></div>
                        <div><a>{post.Dateu}</a></div>
                    </div>

                    <div></div>
                </div>
                ))}

                </div>
            </div>
        </div>
    )
}

export default BackE;