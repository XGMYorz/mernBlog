import React, { useState, useEffect } from 'react';
import axios from 'axios';

const captions = {
  width:'330px'
};

const ComponentB = ({ handleOptionClick }) => {
  const [combinedData, setCombinedData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:3033/api/icos'),
      axios.get('http://localhost:3033/api/posts')
    ])
      .then(([icoRes, postRes]) => {
        const icoData = icoRes.data;
        const blogData = postRes.data;

        const combined = blogData.map(blog => {
          const relatedIco = icoData.find(ico => ico.icoType === blog.icoType);
          return {
            ...blog,
            ico: relatedIco
          };
        });
        // 对combinedData数组按_id倒序排序
        combined.sort((a, b) => b._id.localeCompare(a._id));
        setCombinedData(combined);
      })
      .catch(err => console.log(err));
  }, []);

  const handleDropdownItemClick = (itemId) => {
    setSelectedItem(itemId);
    // handleOptionClick('t');
  };

  const renderBlogItems = () => {
    return combinedData.map(item => (
      <div key={item._id} onClick={() => handleDropdownItemClick(item._id)}>
        <div id=''># {item.icoType} 
          {item.ico && <img src={item.ico.icoImg} alt={item.ico.icoName} />}
        </div>
        <div id=''>{item.bTitle}</div>
        <div id=''>{item.bBrief}</div>
        <div id=''>{item.Dateu}</div>         
      </div>
    ));
  };

  const renderSelectedItemInfo = () => {
    if (selectedItem) {
      const selectedItemData = combinedData.find(item => item._id === selectedItem);

      return (
        <div>
          {/* 在这里显示选中项的信息 */}
          <div>{selectedItemData.bTitle}</div>
          <div>{selectedItemData.bContent}</div>
          {/* ...显示其他信息 */}
        </div>
      );
    }

    return null;
  };

  return (
    <div id='blogpage'>
      <div id='blogpageBox'>
        <div id='caption' style={captions}>最新の博客 (　ﾟ 3ﾟ)</div>
      
        {/* Blog>pageB 专属Box */}
        <div id='BlogBoxs'>
          <div id='BlogBox'>
            {renderBlogItems()}
          </div>
        </div>

        {/* 新增组件 */}
        {renderSelectedItemInfo()}
      </div>
    </div>
  );
}

export default ComponentB;