// ==UserScript==
// @name         悬浮按钮 - 自动粘贴文本
// @namespace    http://www.wuzhij.us.kg/
// @version      1.0
// @description  在网站页面上显示一个悬浮粘贴按钮，点击粘贴按钮自动在页面的文本框中粘贴剪切板中的文本。
// @author       wuzhij
// @match        *://*/*
// @icon         http://www.wuzhij.us.kg/wz/copyurl.svg
// @grant        GM_registerMenuCommand
// @grant        GM_setValue
// @grant        GM_getValue
// @license      GPL License
// @downloadURL https://update.greasyfork.org/scripts/515731/%E6%82%AC%E6%B5%AE%E6%8C%89%E9%92%AE%20-%20%E5%A4%8D%E5%88%B6URL.user.js
// @updateURL https://update.greasyfork.org/scripts/515731/%E6%82%AC%E6%B5%AE%E6%8C%89%E9%92%AE%20-%20%E5%A4%8D%E5%88%B6URL.user.js
// ==/UserScript==

(function() {
    'use strict';

    function createButtons() {
        const pasteButton = document.createElement('button');
        pasteButton.innerText = '粘贴内容';
        pasteButton.style.position = 'fixed';
        pasteButton.style.bottom = '20px';
        pasteButton.style.right = '120px'; // Adjust the position to avoid overlapping with the copy button
        pasteButton.style.padding = '10px 20px';
        pasteButton.style.border = 'none';
        pasteButton.style.backgroundColor = '#00ff00';
        pasteButton.style.color = 'white';
        pasteButton.style.borderRadius = '5px';
        pasteButton.style.cursor = 'pointer';
        pasteButton.addEventListener('click', () => {
            navigator.clipboard.readText().then(text => {
                const inputFields = document.querySelectorAll('input, textarea');
                if (inputFields.length > 0) {
                    inputFields[0].value = text; // Paste into the first input or textarea field found on the page
                } else {
                    console.log('没有找到可粘贴内容的输入框或文本区域');
                }
            }).catch(err => {
                console.error('粘贴失败:', err);
            });
        });
        document.body.appendChild(pasteButton);
    }

    function checkSite() {
        const currentHost = window.location.hostname;
        const sites = ['example.com', 'another-site.com']; // Add your target sites here
        if (sites.some(site => currentHost.includes(site))) {
            createButtons();
        }
    }

    window.addEventListener('load', checkSite);
})();
