要实现在点击导航栏 (`#LeftNavts`) 中的 `li` 元素时，为其应用 `1px solid white` 的边框样式，并在点击另一个 `li` 时将样式从先前的 `li` 切换到当前点击的 `li`，你可以使用React来实现。以下是具体的步骤和代码：

### 步骤 1：更新组件

首先，需要在组件中使用 `useState` 来管理当前活动的 `li` 元素。同时，为每个 `li` 元素添加 `onClick` 处理函数来处理点击事件，并更新活动状态。

```jsx
import React, { useState } from 'react';
import './Backend.css'; // 假设你已经定义了边框效果的样式
import EPK from '../img/EPK.png';

const NavLeft = ({ onOptionClick }) => {
  // 初始化状态变量，BackA设置为激活状态
  //const [activeItem, setActiveItem] = useState('BackA');
  const [activeItem, setActiveItem] = useState(null);

  const handleItemClick = (itemId) => {
    setActiveItem(itemId);
    onOptionClick(itemId); // 调用父组件函数，并传递点击的项目ID
  };

  return (
    <div>
      {/* left导航栏 */}
      <div id="LeftNavt">
        <div id="LeftNavts">
          <div>
            <img src={EPK} alt="EPK Logo" />
            <span>EPK</span>
          </div>
          <ul>
            <li className={activeItem === 'BackA' ? 'active' : ''}>
              <a onClick={() => handleItemClick('BackA')}>首页 💡</a>
            </li>
            <li className={activeItem === 'BackB' ? 'active' : ''}>
              <a onClick={() => handleItemClick('BackB')}>统计 📚</a>
            </li>
            <li className={activeItem === 'BackC' ? 'active' : ''}>
              <a onClick={() => handleItemClick('BackC')}>博客 📕</a>
            </li>
            <li className={activeItem === 'BackD' ? 'active' : ''}>
              <a onClick={() => handleItemClick('BackD')}>文章 📑</a>
            </li>
            <li className={activeItem === 'BackE' ? 'active' : ''}>
              <a onClick={() => handleItemClick('BackE')}>笔记 📔</a>
            </li>
            <li className={activeItem === 'BackF' ? 'active' : ''}>
              <a onClick={() => handleItemClick('BackF')}>标签 🔖</a>
            </li>
          </ul>
        </div>
      </div>

      {/* 顶部栏 */}
      <div id="BackHeadBox">
        <ul>
          <li>1</li>
          <li>2</li>
          <li>3</li>
        </ul>
      </div>
    </div>
  );
};

export default NavLeft;
```

### 步骤 2：定义 CSS 样式

在你的 `Backend.css` 文件中，添加样式来应用边框效果：

```css
#LeftNavts ul {
  list-style-type: none;
  padding: 0;
}

#LeftNavts ul li.active {
  border: 1px solid white;
}
```

### 解释

- **状态管理**: 使用 `useState` 来管理 `activeItem` 状态，它存储当前活动 `li` 元素的 ID。初始时为 `null`。
- **事件处理**: `handleItemClick` 函数用于更新 `activeItem` 为被点击的项目ID，并调用 `onOptionClick` 将点击的项目ID传递给父组件。
- **CSS 样式**: 根据 `activeItem` 的值，动态添加或移除 `active` 类来应用或移除边框样式。

这种方法确保了点击不同的 `li` 元素时，边框样式按预期进行切换，以反映当前的活动状态。根据设计需求，可以调整 CSS 类和样式。