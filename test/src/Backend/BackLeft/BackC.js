// import React  from "react";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import viewSVG from '../../img/functionSVG/view.svg'
import reviseSVG from '../../img/functionSVG/revise.svg'
import deleteSVG from '../../img/functionSVG/delete.svg'

const search="请输入博客标题:"

const BackC = ()=>{
    const [icos, setIcos] = useState([]);
    //博客数据端口
    const [posts, setBlog] = useState([]);
    const [searchQuery,setSearchQuery] = useState('');
    const [filteredBlog,setFilteredBlog] = useState([]);

    useEffect(() => {
    axios.get('http://localhost:3033/api/icos')
      .then(res => {
        console.log('Data received:', res.data);
        setIcos(res.data);
      })
      .catch(err => console.log(err));
  }, []);
  
  
  useEffect(() => {
    axios.get('http://localhost:3033/api/posts')
      .then(res => {
        console.log('Data received:', res.data);
        const sortedIcos = res.data.sort((a, b) => b._id.localeCompare(a._id));

        setBlog(res.data);
        setFilteredBlog(res.data);
        
      })
      .catch(err => console.log(err));
  }, []);

//   const handleSearch = () => {
//     const filteredData = posts.filter(post => {
//         const icotype = post.icoType.toLowerCase();
//         return icotype.includes(searchQuery.toLowerCase());
//     });
//     setFilteredBlog(filteredData);
// };

  const handleSearchs = () => {
    const filteredData = posts.filter(post => 
        post.bTitle.toLowerCase().includes(searchQuery.toLowerCase()) || 
        post.bContent.toLowerCase().includes(searchQuery.toLowerCase()));
    setFilteredBlog(filteredData);
};

 const handleReset = () => {
   setSearchQuery('');
   setFilteredBlog(posts);
 };
const handleIcoClick = (post) => {
  const filteredData = posts.filter(blogPost => blogPost.icoType === post.icoType);
  setFilteredBlog(filteredData);
};

//删除博客数据
const handleDelete = (post) => {
  if (window.confirm(`确定要删除笔记 "${post.bTitle}" 吗?`)) {
    axios.delete(`http://localhost:3033/api/posts/${post._id}`)
      .then(res => {
        console.log(res.data.message);
        // 从 filteredNotes 数组中移除被删除的笔记
        setFilteredBlog(filteredBlog.filter(note => note._id !== post._id));
        // 从 Note 数组中移除被删除的笔记
        setBlog(posts.filter(note => note._id !== post._id));
      })
      .catch(err => {
        console.error(err);
      });
  }
};
    return(
        <div id="Back">
            <div id="BackBox">
            <div id="head-prompt"><a>后端</a> ﹥ 博客</div>

              <div id="BackC-Box">
                    
                {/* 功能区 */}
                <div id="Back-head">
                {/* 输入搜索框 */}
                <input 
                type="search" 
                placeholder={search}
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}/>
                {/* 触发点击搜索 */}
                <button onClick={handleSearchs}>🔍 搜索</button>
                {/* 触发更新数组状态 */}
                <button onClick={handleReset}>↻ 重置</button>
                <button>+  创建博客</button>
                </div>

                
              <div id="Back-center">
                {/* 标签数据 */}
                {icos.map(post => (
                <span key={post._id} 
                onClick={() => handleIcoClick(post)}>{post.icoType}
                <img src={post.icoImg} alt=''></img></span>
                ))}
              </div>

                <div id="Back-bottom">
                <div>
                    <span> 🖕博客标题 </span>
                    <span> 🙎‍♂️创建者 </span>
                    <span> 🔖标签 </span>
                    <span> 👁️‍🗨️发布状态 </span>
                    <span> 📅创建时间 </span>
                    <span> 📅更新时间 </span>
                </div>
                {/* 博客数据 */}
                {filteredBlog.map(post => (
                <div className="Back-bottom-content" key={post._id}>
                    <div>➛ {post.bTitle}</div>
                    <div>{post.uname}</div>
                    <div>
                        <span>{post.icoType}</span>
                        </div>
                    <div></div>
                    <div>{post.Datec}</div>
                    <div>{post.Dateu}</div>

                    <div>
                      <button>
                      <img src={viewSVG}></img></button>
                      <button>
                      <img src={reviseSVG}></img></button>
                      <button onClick={() => handleDelete(post)}>
                      <img src={deleteSVG}></img></button>
                    </div>
                </div>))}
                
                
                </div >

                </div>
           </div>
        </div>
    )
}

export default BackC;