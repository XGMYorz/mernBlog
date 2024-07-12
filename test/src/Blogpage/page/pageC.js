import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

//引入语法高亮功能
//npm install react-markdown highlight.js 废弃
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';

const captions = {
  width:'280px'
};


// postList：文章列表数据
// activePostId：当前选中文章的id
// onItemClick：点击文章列表项的回调函数
const PostList = ({ postList, activePostId, onItemClick }) => {
  return (
    <div id='BlogBoxs'>
      <div id='caption' style={captions}>小纸条 (´・ω・`)</div>
    
      <div id='BlogBox'>
        {/* // 渲染文章列表项的每一项 */}
        {postList.map(post => (
          <div
            key={post._id}
            // 根据选中状态添加相应样式
            className={`BlogBox ${post._id === activePostId ? 'active' : ''}`}
            // 点击时传入当前列表项的id
            onClick={() => onItemClick(post._id)}
          >
            <div id=''># {post.icoType} 
              {/* // 根据文章类型渲染相应图标 */}
              {post.ico && <img src={post.ico.icoImg} alt={post.ico.icoName} />}
            </div>
            <div>{post.aTitle}</div>
            <div>{post.aBrief}</div>
            <div>{post.Dateu}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// 1：当前选中的文章数据
// 2：关闭文章详情的回调函数
const PostDetails = ({ post, onCloseDetails }) => {
  return (
    <div className="post-details">
      <button id='details-return' onClick={onCloseDetails}>← 返回文章列表</button>
      <div id='details-Date'>发布于 {post.Dateu}</div>
      <div id='details-title'><strong>{post.aTitle}</strong></div>
      <div id='details-Brief'>{post.aBrief}</div>
      <div id='details-Content'>
        {/* <ReactMarkdown children={post.aContent} /> */}

        <ReactMarkdown
        // Prism主题中的solarizedlight样式。
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '');
              return !inline && match ? (
                <SyntaxHighlighter
                  style={solarizedlight}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            }
          }}
        >
        {post.aContent}
        </ReactMarkdown>

      </div>
    </div>
  );
};

const ComponentA = () => {
  const [combinedData, setCombinedData] = useState([]);
  const [activePostId, setActivePostId] = useState(null);
  const [showPostDetails, setShowPostDetails] = useState(false);

  // useEffect用于组件进行副作用操作,ajax请求数据
  useEffect(() => {
    // 使用Promise.all同时请求数据
    Promise.all([
      axios.get('http://localhost:3033/api/icos'),
      axios.get('http://localhost:3033/api/articles')
    ])
      .then(([icoRes, postRes]) => {
        const icoData = icoRes.data;
        const articlesData = postRes.data;

        // 将相关数据关联
        const combined = articlesData.map(articles => {
          const relatedIco = icoData.find(ico => ico.icoType === articles.icoType);
          return {
            ...articles,
            ico: relatedIco
          };
        });
        // 对combinedData数组按_id倒序排序
        combined.sort((a, b) => b._id.localeCompare(a._id));
        // 此处将关联的数据保存到state
        setCombinedData(combined);
      })
      .catch(err => console.log(err));
  }, []);

  const handlePostItemClick = (postId) => {
    // 更改当前选中的文章的id值
    setActivePostId(postId);
    // 显示文章的详情页
    setShowPostDetails(true);

    // 将页面滚动到顶部
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const handleClosePostDetails = () => {
    // 关闭文章详情并将选中文章id设置为null
    setShowPostDetails(false);
    setActivePostId(null);
  }

  return (
    <div id='blogpage'>
    <div id='blogpageBox'>
    <div id='pageCBox'>
    
      {/* // 根据showPostDetails状态显示不同组件 */}
      {showPostDetails ? (
        <PostDetails
          post={combinedData.find(post => post._id === activePostId)}
          onCloseDetails={handleClosePostDetails}
        />
      ) : (
        <PostList
          postList={combinedData}
          activePostId={activePostId}
          onItemClick={handlePostItemClick}
        />
      )}
    
    </div>
    </div>
    </div>
  );
}

export default ComponentA;