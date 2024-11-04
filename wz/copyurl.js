// ==UserScript==
// @name         悬浮按钮 - 复制URL
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  在指定网站页面上显示一个悬浮按钮，点击按钮复制当前网页的URL地址到剪切板
// @author       code200
// @match        *://*/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        GM_registerMenuCommand
// @grant        GM_setValue
// @grant        GM_getValue
// @license      GPL License
// @downloadURL https://update.greasyfork.org/scripts/446646/%E9%93%BE%E6%8E%A5%E8%BD%AC%E6%8D%A2transformation%20to%20links.user.js
// @updateURL https://update.greasyfork.org/scripts/446646/%E9%93%BE%E6%8E%A5%E8%BD%AC%E6%8D%A2transformation%20to%20links.meta.js
// ==/UserScript==

(function() {
    'use strict';

    const sites = [
        'example.com',
        'another-site.com',
        'jable.tv'
    ];

    function createButton() {
        const button = document.createElement('button');
        button.innerText = '复制URL';
        button.style.position = 'fixed';
        button.style.bottom = '20px';
        button.style.right = '20px';
        button.style.padding = '10px 20px';
        button.style.backgroundColor = '#ff0000';
        button.style.color = '#ffffff';
        button.style.border = 'none';
        button.style.borderRadius = '5px';
        button.style.cursor = 'pointer';
        button.style.zIndex = '1000';
        button.addEventListener('click', () => {
            navigator.clipboard.writeText(window.location.href).then(() => {
                alert('URL已复制到剪切板');
            }).catch(err => {
                console.error('复制失败:', err);
            });
        });
        document.body.appendChild(button);
    }

    function checkSite() {
        const currentHost = window.location.hostname;
        if (sites.some(site => currentHost.includes(site))) {
            createButton();
        }
    }

    checkSite();
})();