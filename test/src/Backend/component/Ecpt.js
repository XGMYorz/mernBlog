import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Ecpt = ({ maxLength }) => {
  const [icos, setIcos] = useState([]);
  const [selectedIco, setSelectedIco] = useState('');
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
  
  const handleIcoChange = (event) => {
    setSelectedIco(event.target.value);
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

  const handleCreateClick = () => {
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
        Datec: new Date().toISOString(),
        Dateu: new Date().toISOString()
      };

      axios.post('http://localhost:3033/api/notes', newNote)
        .then(res => {
          console.log('Note created:', res.data);
          // 刷新组件状态
          setSelectedIco('');
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
        <select required value={selectedIco} onChange={handleIcoChange}>
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
      <div><input placeholder="请输入标题..." value={titleInputValue} onChange={handleTitleChange} /></div>
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
      <div><button onClick={handleCreateClick}>创建</button></div>
    </div>
  );
};

export default Ecpt;