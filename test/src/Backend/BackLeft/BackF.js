import React,{useState,useEffect} from "react";
import axios from 'axios';
import searchSVG from '../../img/functionSVG/search.svg'
import deleteSVG from '../../img/functionSVG/delete.svg'


const search="请输入标签名称:"
const BackF = ()=>{

    const [icos, setIcos] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredIcos, setFilteredIcos] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:3033/api/icos')
            .then(res => {
                console.log('Data received:', res.data);
                const sortedIcos = res.data.sort((a, b) => b._id.localeCompare(a._id));
                // setIcos(sortedIcos);
                // setFilteredIcos(sortedIcos);
                setIcos(res.data);
                setFilteredIcos(res.data)
            })
            .catch(err => console.log(err));
    }, []);

    const handleSearch = () => {
        const filteredData = icos.filter(post => 
            post.icoType.toLowerCase().includes(searchQuery.toLowerCase()) || 
            post.itype.toLowerCase().includes(searchQuery.toLowerCase()));
        setFilteredIcos(filteredData);
    };

    const handleReset = () => {
        setSearchQuery(''); // 清空搜索查询
        setFilteredIcos(icos); // 重置过滤后的笔记为原始笔记数组
    };

//切换隐藏状态
const [display,setDisplay] = useState(true)
const CJClick = () => {
    setDisplay(!display);
}

//删除标签
const handleDelete = (post) => {
  if (window.confirm(`确定要删除笔记 "${post.icoType}" 吗?`)) {
    axios.delete(`http://localhost:3033/api/icos/${post._id}`)
      .then(res => {
        console.log(res.data.message);
        // 从 filteredNotes 数组中移除被删除的笔记
        setFilteredIcos(filteredIcos.filter(ico => ico._id !== post._id));
        // 从 Note 数组中移除被删除的笔记
        setIcos(icos.filter(ico => ico._id !== post._id));
      })
      .catch(err => {
        console.error(err);
      });
  }
};
    return(
        <div id="Back">

            {/* 创建标签窗口 */}
            <div id='IcoCreate' style={{ display: display ? 'none' : 'block' }}>
            <div id='IcoCreates'>
                <div id='IcoCreateBox'>
                    <div><a>创建标签</a>
                    <a onClick={CJClick}>x</a></div>
                    <Fcpt/>
                </div>
            </div>
            </div>



            <div id="BackBox">
            <div id="head-prompt"><a>后端</a> ﹥ 标签</div>

                <div id="BackF-Box">
                    {/* head */}
                <div id="Back-head">
                {/* 输入搜索内容 */}
                <input 
                type="search" 
                placeholder={search}
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                />
                {/* 类型下拉列表 */}
                <select required>
                    <option value="1">通用</option>
                    <option value="2">项目工程化</option>
                </select>

                <button onClick={handleSearch}>
                  <img src={searchSVG}></img> 搜索</button>
                <button onClick={handleReset}>↻ 重置</button>
                <button onClick={CJClick}>+  创建标签</button>

                </div>

                 {/* 标签数据list */}
                <div id="BackF-bottom">
                <div>
                    <span> 名称 </span>
                    <span> 类型 </span>
                    <span> 图标 </span>
                    <span> 博客 </span>
                    <span> 文章 </span>
                    <span> 笔记 </span>
                    <span> 创建时间</span>
                    <span> 更新时间</span>
                </div>

                {filteredIcos.map(post =>(
                <div className="BackF-content" key={post._id}>
                    <div>❐ {post.icoType}</div>
                    <div>{post.itype}</div>
                    <div><img src={post.icoImg} alt=""></img></div>
                    <div>0</div>
                    <div>0</div>
                    <div>0</div>
                    {/* <div>0</div> */}
                    <div>{post.Datec}</div>
                    <div>{post.Dateu}</div>
                    <div>
                        <button>
                          ✏️</button>
                        <button onClick={() => handleDelete(post)}>
                        <img src={deleteSVG}></img></button>
                    </div>
                </div>))}
                
                </div >

                <div>
                    
                </div>
                </div>
            </div>
        </div>
    )
}


//子组件 Fcpt 创建标签窗口
const Fcpt = ( ) => {
    const [icos, setIcos] = useState([]);
    const [selectedIco, setSelectedIco] = useState('');
    const [titleInputValue, setTitleInputValue] = useState('');
    const [textareaValue, 文本值] = useState('');
    //存入base64转换值
    const [base64Value, setBase64Value] = useState('');
  
    useEffect(() => {
      axios.get('://localhost:3033/api/icos')
        .then(res => {
          console.log('Data received:', res.data);
          setIcos(res.data);
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
      文本值(newValue);
     
    };

    const convertToBase64 = () => {
      // 对 textareaValue 进行 Base64 编码
      const base64Encoded = btoa(textareaValue);
      setBase64Value(`data:image/svg+xml;base64,${base64Encoded}`);
    };
  
    const handleCreateClick = () => {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
      const day = currentDate.getDate().toString().padStart(2, '0');

      if (window.confirm('是否创建标签?')) {
        const newIco = {
          oid:0,
          icoName:'icoName',
          // icoImg:textareaValue,
          icoImg:base64Value,
          // uname: 'username', 
          // 替换为实际的用户名
          icoType:titleInputValue,
          Datec: `${year}-${month}-${day}`,
          Dateu: `${year}-${month}-${day}`,
          itype:selectedIco
        };
  
        axios.post('http://localhost:3033/api/icos', newIco)
          .then(res => {
            console.log('Note created:', res.data);
            // 刷新组件状态
            setSelectedIco('');
            setTitleInputValue('');
            文本值('');
            setIcos([...icos,newIco])
          })
          .catch(err => console.error(err));
      }
    };
  
    return (
      <div>
        {/* 1 */}
        <div><a>标签名称</a></div>
        {/* 2 */}
        <div><input 
        placeholder="请输入标签名称..." 
        value={titleInputValue} 
        onChange={handleTitleChange} /></div>
        {/* 3 */}
        <div><a>类型</a></div>
        {/* 4 */}
       <div>
          <select required value={selectedIco} onChange={handleIcoChange}>
            <option value="">请选择标签类型</option>
            <option value="1">通用</option>
            <option value="2">项目工程化</option> 
          </select>
        </div>
        {/* 5 */}
        <div>图标</div>
        {/* 6 */}
        <div><textarea
          id="example"
          name="example"
          rows="4"
          cols="50"
          placeholder="请输入SVG字符串"
          value={textareaValue}
          onChange={handleTextareaChange}
        ></textarea>
        <button onClick={convertToBase64}>转换为Base64编码</button>
        </div>
        {/* 7 */}
        <div><button onClick={handleCreateClick}>创建</button></div>
      </div>
    );
  };


export default BackF;