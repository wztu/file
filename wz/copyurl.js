// ==UserScript==
// @name         悬浮按钮 - 复制URL
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  在指定网站页面上显示一个悬浮按钮，点击按钮复制当前网页的URL地址到剪切板，并显示绿色提示文本“已复制到剪切板”，1秒后自动隐藏
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
        button.innerHTML = '<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDgiPjwvcG9seT4KICA8IS0tCjxnIGlkPSJMYXllcl8xIiBmaWxsPSJub25lIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2U9Im5vbmUiPgogICAgPGcgaWQ9Ik1heExfMiIgcG9pbnRzPSIxIDAgMCAxIDEiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWNhcD0iMTAiIHN0cm9rZS1saW5lam9pbj0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2U9Im5vbmUiPgogICAgPGcgaWQ9Ik1heExfMyIgcG9pbnRzPSIxIDAgMCAxIDEiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWNhcD0iMTAiIHN0cm9rZS1saW5lam9pbj0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2U9Im5vbmUiPgogICAgPGcgaWQ9Ik1heExfNCIgcG9pbnRzPSIxIDAgMCAxIDEiIGZpbGw9Im5vb...">';
        button.style.position = 'fixed';
        button.style.bottom = '20px';
        button.style.right = '20px';
        button.style.padding = '10px 20px';
        button.style.border = 'none';
        button.style.backgroundColor = '#ff0000';
        button.style.color = 'white';
        button.style.borderRadius = '5px';
        button.style.cursor = 'pointer';
        button.addEventListener('click', () => {
            navigator.clipboard.writeText(window.location.href).then(() => {
                const message = document.createElement('div');
                message.innerText = '已复制到剪切板';
                message.style.position = 'fixed';
                message.style.bottom = '70px';
                message.style.right = '20px';
                message.style.padding = '10px 20px';
                message.style.backgroundColor = 'green';
                message.style.color = 'white';
                message.style.borderRadius = '5px';
                document.body.appendChild(message);
                setTimeout(() => {
                    document.body.removeChild(message);
                }, 1000);
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