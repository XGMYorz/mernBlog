import React, { useEffect, useState } from 'react';
import axios from 'axios';

import count1 from '../../img/count/count1.jpg';
import count2 from '../../img/count/count2.jpg';
import count3 from '../../img/count/count3.jpg';
import count4 from '../../img/count/count4.jpg';

const BackB = () => {
    const [BlogCount, setBlogCount] = useState(0); // 存储博客的数量状态
    const [ArticlesCount, setArticlesCount] = useState(0); 
    const [NoteCount, setNoteCount] = useState(0);
    const [IcoCount,setIcoCount] = useState(0);


    useEffect(() => {
        const fetchIcoCount = async () => {
            try {
                const response = await axios.get('http://localhost:3033/api/icos');
                const Icos = response.data; 
                setIcoCount(Icos.length);
            } catch (error) {
                console.error('Error fetching Note:', error);
            }
        };

        fetchIcoCount();
    }, []);


    useEffect(() => {  
        const fetchBlogCount = async () => {
            try {
                const response = await axios.get('http://localhost:3033/api/posts');
                const blogs = response.data;//假设返回文章列表
                setBlogCount(blogs.length);//设置文字数量
            } catch (error) {
                console.error('Error fetching blog:', error);
            }
        };

        fetchBlogCount();
    }, []);// 空数组为依赖，仅在组件加载时执行1次！

    useEffect(() => {     
        const fetchArticlesCount = async () => {
            try {
                const response = await axios.get('http://localhost:3033/api/articles');
                const articles = response.data; // 假设返回为文章列表
                setArticlesCount(articles.length); // 设置文章数量
            } catch (error) {
                console.error('Error fetching articles:', error);
            }
        };

        fetchArticlesCount();
    }, []); 


    useEffect(() => {
        const fetchNoteCount = async () => {
            try {
                const response = await axios.get('http://localhost:3033/api/Notes');
                const Notes = response.data; 
                setNoteCount(Notes.length);
            } catch (error) {
                console.error('Error fetching Note:', error);
            }
        };

        fetchNoteCount();
    }, []);

    return (
        <div id="Back">
            <div id="BackBox">
                <div id="head-prompt"><a>后端</a> ﹥ 统计</div>
                {/* 统计 */}
                <div id="BackB-Box">
                    <li>
                        <li>标签</li>
                        {/* 统计标签数量 */}
                        <li>{IcoCount}</li>
                        <img src={count1} alt="count1" />
                    </li>
                    <li>
                        <li>博客</li>
                        {/* 统计博客数量 */}
                        <li>{BlogCount}</li>
                        <img src={count2} alt="count2" />
                    </li>
                    <li>
                        <li>文章</li>
                        {/* 统计文章数量 */}
                        <li>{ArticlesCount}</li>
                        <img src={count3} alt="count3" />
                    </li>
                    <li>
                        <li>笔记</li>
                        {/* 统计笔记数量 */}
                        <li>{NoteCount}</li>
                        <img src={count4} alt="count4" />
                    </li>
                </div>
            </div>
        </div>
    );
};

export default BackB;