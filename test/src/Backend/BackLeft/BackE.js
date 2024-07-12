import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import Ecpt from '../component/Ecpt'
import viewSVG from '../../img/functionSVG/view.svg'
import deleteSVG from '../../img/functionSVG/delete.svg'

const search = "请输入标题 or 内容: ";
const 笔记页 = () => {
    
    const [icos, setIcos] = useState([]);
    const [Note, setNote] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredNotes, setFilteredNotes] = useState([]);

    useEffect(() => {
      Promise.all([
        axios.get('http://localhost:3033/api/icos'),
        axios.get('http://localhost:3033/api/notes')
      ])
        .then(bothResults => {
          const [icosResult, noteResult] = bothResults;
          setIcos(icosResult.data);
           //将获取到的Note数据按_id倒序排序
          const sortedNotes = noteResult.data.sort((a, b) => b._id.localeCompare(a._id));
          setNote(noteResult.data);
          setFilteredNotes(noteResult.data);
        })
        .catch((error) => console.log(error));
    }, []);

    const handleSearch = () => {
        const filteredData = Note.filter(post => 
            post.nTitle.toLowerCase().includes(searchQuery.toLowerCase()) || 
            post.nContent.toLowerCase().includes(searchQuery.toLowerCase()));

            // const sortedFilteredData = filteredData.sort((a, b) => new Date(b.Dateu) - new Date(a.Dateu));
          // setFilteredNotes(sortedFilteredData);
          setFilteredNotes(filteredData);     
    };

    const handleReset = () => {
        setSearchQuery(''); // 清空搜索查询
        setFilteredNotes(Note); // 重置过滤后的笔记为原始笔记数组
    };
    
//该函数用来清除搜索查询 (setSearchQuery(''))
//将搜索结果重置为原始笔记的数组 (setFilteredNotes(Note))，
const handleIcoClick = (post) => {
    const filteredData = Note.filter(NotePost => NotePost.icoType === post.icoType);
    setFilteredNotes(filteredData);
  };

// 定义隐藏切换
const [display, setDisplay] = useState(true);
//displays:布尔类型状态变量，初始化为true
const CJClick = () => {
  setDisplay(!display);//此函数用来切换display的值
};

//删除笔记数据
const handleDelete = (post) => {
    if (window.confirm(`确定要删除笔记 "${post.nTitle}" 吗?`)) {
      axios.delete(`http://localhost:3033/api/notes/${post._id}`)
        .then(res => {
          console.log(res.data.message);
          // 从 filteredNotes 数组中移除被删除的笔记
          setFilteredNotes(filteredNotes.filter(note => note._id !== post._id));
          // 从 Note 数组中移除被删除的笔记
          setNote(Note.filter(note => note._id !== post._id));
        })
        .catch(err => {
          console.error(err);
        });
    }
  };

    return (
        <div id="Back">

            {/* 创建笔记窗口 */}
            <div id='NoteCreate' style={{ display: display ? 'none' : 'block' }}>
            <div id='NoteCreates'>
                <div id='NoteCreateBox'>
                    <div><a>创建笔记</a>
                    <a onClick={CJClick}>x</a></div>
                    <Ecpt maxLength={1500} />
                </div>
            </div>
            </div>


            <div id="BackBox">
                <div id="head-prompt"><a>后端</a> ﹥ 笔记</div>
                <div id="BackE-Box">
                        {/* 功能区 */}
                        <div id="Back-head">
                        {/* 输入搜索框 */}
                        <input
                        type="search"
                        placeholder={search}
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        />
                        <button onClick={handleSearch}>🔍 搜索</button>
                        <button onClick={handleReset}>↻ 重置</button>
                        <button onClick={CJClick}>+  创建笔记</button>
                    </div>

                   
                    <div id="Back-center">
                         {/* 标签数据 */}
                        {icos.map(post => (
                        <span key={post._id} onClick={()=> handleIcoClick(post)}>     
                        {post.icoType}<img src={post.icoImg} alt=''></img></span>
                        ))}
                    </div>
                    {/* 笔记数据 */}
                        <div id='BackE-content' >
                        {filteredNotes.map(post => (

                            <div key={post._id}>
                                <div>
                                {/* 显示标题 */}
                                <a>{post.nTitle}</a>
                                {/* 显示可操作项 */}
                                <button>
                                  修</button>
                                <button onClick={() => handleDelete(post)}>
                                <img src={deleteSVG}></img></button></div>
                                {/* 显示内容 */}
                                <div>{post.nContent}</div>
                                {/* 显示标签 */}
                                <div><button>{post.icoType}</button></div>
                                {/* 显示最新修改日期 */}
                                <div><a>{post.Dateu}</a></div>
                            </div>
                           
                        ))}
                        </div>
                  
                </div>
            </div>
        </div>
    );
}

//子组件 Ecpt 创建窗口
const Ecpt = ({ maxLength }) => {
    const [icos, setIcos] = useState([]);
    const [selectedIco, 标签函数] = useState('');
    const [titleInputValue, setTitleInputValue] = useState('');
    const [textareaValue, setTextareaValue] = useState('');
    const [charCount, setCharCount] = useState(0);
    const [lineCount, setLineCount] = useState(0);
  
    useEffect(() => {
      axios.get('http://localhost:3033/api/icos')
        .then(res => {
          console.log('Data received:', res.data);
          setIcos(res.data);
        })
        .catch(err => console.log(err));
    }, []);
  
    useEffect(() => {
      axios.get('://localhost:3033/api/notes')
        .then(res => {
          console.log('Notes data received:', res.data);
          // 更新组件状态,将获取到的笔记数据存储
          // 例如: setNotes(res.data);
        })
        .catch(err => console.log(err));
    }, []);
    
    const 标签状态 = (event) => {
      标签函数(event.target.value);
    };
  
    const handleTitleChange = (event) => {
      setTitleInputValue(event.target.value);
    };
  
    const handleTextareaChange = (event) => {
      const newValue = event.target.value;
      setTextareaValue(newValue);

      const updatedCharCount = newValue.length;
      setCharCount(updatedCharCount);
  
      // 计算行数
      const lines = newValue.split('\n');
      setLineCount(lines.length);
    };
  
    //handleCreateClick
    const 创建笔记函数 = () => {
      if (window.confirm('确认创建?')) {
        const newNote = {
          // nid: selectedIco,
          nid:0,
          nTitle: titleInputValue,
          uname:'EPK',
          // uname: 'username', 
          // 替换为实际的用户名
          nContent: textareaValue,
          icoType: icos.find(ico => ico._id === selectedIco).icoType,
          Datec: new Date().toISOString().slice(0, 10),
          Dateu: new Date().toISOString().slice(0, 10)
        };
  
        axios.post('http://localhost:3033/api/notes', newNote)
          .then(res => {
            console.log('Note created:', res.data);
            // 刷新组件状态
            标签函数('');
            setTitleInputValue('');
            setTextareaValue('');
            setCharCount(0);
            setLineCount(0);
          })
          .catch(err => console.error(err));
      }
    };
  
    return (
      <div>
        {/* 1 */}
        <div><a>标签</a>
          <select 
          required 
          value={selectedIco} 
          onChange={标签状态}>
            <option value="">请选择标签</option>
            {icos.map(post => (
              <option key={post._id} value={post._id}>
                {post.icoType}
              </option>
            ))}
          </select>
        </div>
        {/* 2 */}
        <div><a>标题</a></div>
        {/* 3 标题输入框*/}
        <div><input 
        placeholder="请输入标题..." 
        value={titleInputValue} 
        onChange={handleTitleChange} /></div>
        {/* 4 */}
        <div><a>内容</a></div>
        {/* 5 内容输入框*/}
        <div><textarea
          id="example"
          name="example"
          rows="4"
          cols="50"
          placeholder="请输入要记录的内容..."
          value={textareaValue}
          onChange={handleTextareaChange}
          maxLength={maxLength}
        ></textarea></div>
        <div>字数：{charCount} 行数：{lineCount}</div>
        {/* 6 */}
        <div><button onClick={创建笔记函数}>创建</button></div>
      </div>
    );
  };
  



export default 笔记页;