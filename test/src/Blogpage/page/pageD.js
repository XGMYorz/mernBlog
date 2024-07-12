import React from 'react';

const captions = {
  width:'150px'
};

const ComponentA = () => {
  return (
    <div id='blogpage'>
      <div id='blogpageBox'>
        <div id='pageDBox'>

      <div id='caption' style={captions}>|∀` ) 关于</div>
        <br></br>
        <a>关于此blog</a>
        <p></p>
        <br></br>
        <a>全栈技能</a>
        <li>Test</li>

        <br></br>
        <a>前端</a>
        <li>• HTML+CSS+JavaScript 熟练运用</li>
        <li>• Test</li>

        <br></br>
        <a>后端</a>
        <li>Test</li>
        <li>Test</li>

        <br></br>
        <a>库</a>
        <li>Test</li>
        <li>Test</li>

        <br></br>
        <a>工具</a>
        <li>Test</li>
        <li>Test</li>
      </div>

      </div>
    </div>
  );
}

export default ComponentA;