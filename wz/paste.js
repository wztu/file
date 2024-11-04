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
        pasteButton.style.zIndex = 9999;
        pasteButton.style.bottom = '20px';
        pasteButton.style.right = '20px';
        pasteButton.style.padding = '10px';
        pasteButton.style.backgroundColor = '#4CAF50';
        pasteButton.style.color = 'white';
        pasteButton.style.border = 'none';
        pasteButton.style.borderRadius = '5px';
        pasteButton.style.cursor = 'pointer';

        document.body.appendChild(pasteButton);

        pasteButton.addEventListener('click', async () => {
            const activeElement = document.activeElement;
            if (activeElement.tagName === 'TEXTAREA' || 
                (activeElement.tagName === 'INPUT' && (activeElement.type === 'text' || activeElement.type === 'email' || activeElement.type === 'search'))) {
                
                try {
                    const text = await navigator.clipboard.readText();
                    const startPos = activeElement.selectionStart;
                    const endPos = activeElement.selectionEnd;

                    activeElement.value = activeElement.value.slice(0, startPos) + text + activeElement.value.slice(endPos);
                    activeElement.setSelectionRange(startPos + text.length, startPos + text.length);
                } catch (err) {
                    console.error('无法读取剪切板内容：', err);
                }
            } else {
                alert('请选中一个文本框来粘贴内容。');
            }
        });
    }

    window.addEventListener('load', createButtons);
})();