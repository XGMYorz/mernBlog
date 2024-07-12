import React from 'react';



const PageBclick = () => {
  return (
    <div id='blogpage'>
    <div id='blogpageBox'>
    <div id='pageCBox'>
          
      <div id='pBC'>
      {/* 层级一 */}
        <div id='pBC-01'>
          <div>返回博客</div>
          <div>发布于 x月xx日 2024  xx浏览量</div>
          <div>标题:xxx</div>
          <div>简述xxxxxx</div>
        </div>
      {/* 层级二 */}
        <div id='pBC-02'>
          绝对定位目录
        </div>
      {/* 层级三 */}
        <div id='pBC-03'>
          内容区
        </div>

      </div>
        
    </div>
    </div>
    </div>

    
  );
}

export default PageBclick;