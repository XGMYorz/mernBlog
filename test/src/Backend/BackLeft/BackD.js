import React, { useState, useEffect } from 'react';
import axios from 'axios';

import viewSVG from '../../img/functionSVG/view.svg'
import reviseSVG from '../../img/functionSVG/revise.svg'
import deleteSVG from '../../img/functionSVG/delete.svg'

const search = "请输入文章标题:"

const BackD = () => {
    const [icos, setIcos] = useState([]);// 保持在组件级别的状态
    // const [activeIcoIndex, setActiveIcoIndex] = useState(null); 
    // 新的状态变量来表示当前活动的ICO类型
    
    const [article, setArticle] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredArticle, setFilteredArticle] = useState([]);
    

    useEffect(() => {
        axios.get('http://localhost:3033/api/icos')
            .then(res => {
                console.log('Data received:', res.data);
                setIcos(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        axios.get('http://localhost:3033/api/articles')
            .then(res => {
                console.log('Data received:', res.data);
                const sortedIcos = res.data.sort((a, b) => b._id.localeCompare(a._id));
                setArticle(res.data);
                setFilteredArticle(res.data); // Initialize filtered notes with all notes
            })
            .catch(err => console.log(err));
    }, []);

    const handleSearch = () => {
        const filteredData = article.filter(post => {
            const icotype = post.icoType.toLowerCase();
            return icotype.includes(searchQuery.toLowerCase());
        });
        setFilteredArticle(filteredData);
    };
    
    const handleSearchs = () => {
        const filteredData = article.filter(post => 
            post.aTitle.toLowerCase().includes(searchQuery.toLowerCase()) || 
            post.aContent.toLowerCase().includes(searchQuery.toLowerCase()));
        setFilteredArticle(filteredData);
    };

    const handleReset = () => {
        setSearchQuery('');
        setFilteredArticle(article);
    };

    const handleIcoClick = (post) => {
      const filteredData = article.filter(articlePost => articlePost.icoType === post.icoType);
      setFilteredArticle(filteredData);
  };

  //删除文章数据
const handleDelete = (post) => {
    if (window.confirm(`确定要删除笔记 "${post.aTitle}" 吗?`)) {
      axios.delete(`http://localhost:3033/api/article/${post._id}`)
        .then(res => {
          console.log(res.data.message);
          // 从 filteredNotes 数组中移除被删除的笔记
          setFilteredArticle(filteredArticle.filter(note => note._id !== post._id));
          // 从 Note 数组中移除被删除的笔记
          setArticle(article.filter(note => note._id !== post._id));
        })
        .catch(err => {
          console.error(err);
        });
    }
  };

    return (
        <div id="Back">
            <div id="BackBox">
                <div id="head-prompt"><a>后端</a> ﹥ 文章</div>
                <div id="BackD-Box">
                    {/* 功能按钮 */}
                    <div id="Back-head">
                        <input
                            type="search"
                            placeholder={search}
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                        />
                        <button onClick={handleSearchs}>🔍 搜索</button>
                        <button onClick={handleReset}>↻ 重置</button>
                        <button>+ 创建文章</button>
                    </div>

                    {/* 标签数据 */}
                    <div id="Back-center">
                        {icos.map(post => (
                            <span key={post._id} 
                            onClick={() => handleIcoClick(post)}>{post.icoType}
                            <img src={post.icoImg} alt=''></img></span>
                        ))}
                    </div>

                    {/* 文章数据 */}
                    <div id="Back-bottom">
                        <div>
                            <span> 🖕文章标题 </span>
                            <span> 🙎‍♂️创建者 </span>
                            <span> 🔖标签 </span>
                            <span> 👁️‍🗨️发布状态 </span>
                            <span> 📅创建时间 </span>
                            <span> 📅更新时间 </span>
                        </div>

                        {filteredArticle.map(post => (
                            <div className="Back-bottom-content" key={post._id}>
                                <div>➫ {post.aTitle}</div>
                                <div>{post.uname}</div>
                                <div>
                                    <span>{post.icoType}</span>
                                </div>
                                <div>{post.state}</div>
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
                            </div>)
                        )}
                    </div>
                </div>
            </div>
        </div>
    );

    
};

export default BackD;