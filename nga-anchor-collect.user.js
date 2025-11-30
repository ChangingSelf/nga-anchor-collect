// ==UserScript==
// @name         NGA安价快捷收集
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  点击楼层内容即可复制，去除引用块和空行，作为安价结算用的选项
// @author       ChangingSelf
// @match        https://ngabbs.com/read.php*
// @match        https://bbs.nga.cn/read.php*
// @match        https://nga.178.com/read.php*
// @match        https://g.nga.cn/read.php*
// @icon         https://img.nga.178.com/attachments/mon_202107/02/-otpguQ2o-bowcK2S14-14.png
// @grant        GM_addStyle
// @license      MIT
// ==/UserScript==

(function() {
  'use strict';
// 1. 添加悬停效果和提示框的样式
  GM_addStyle(`
      /* 悬停时的文本凸出阴影效果 */
      .post-content-hover {
          cursor: pointer;
          transition: all 0.3s ease-in-out;
          display: inline-block;
          border-radius: 6px;
          padding: 4px;
      }
      .post-content-hover:hover {
          outline: 3px solid #FF6B35; /* 醒目的橙色描边 */
          outline-offset: -1px;
      }

      /* 复制成功/失败提示框 */
      .copy-toast {
          position: fixed;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          padding: 10px 20px;
          color: white;
          border-radius: 5px;
          z-index: 9999999;
          opacity: 0;
          transition: opacity 0.5s ease-in-out;
      }
      .copy-toast.show {
          opacity: 1;
      }
      .copy-toast.success {
          background-color: #4CAF50; /* 绿色 */
      }
      .copy-toast.error {
          background-color: #f44336; /* 红色 */
      }
  `);

  // 2. 创建复制提示框
  let toast = document.createElement('div');
  toast.className = 'copy-toast';
  document.body.appendChild(toast);

  // 3. 显示提示框的函数
  function showToast(message, isSuccess = true) {
      toast.textContent = message;
      toast.classList.remove('success', 'error', 'show');
      toast.classList.add(isSuccess ? 'success' : 'error');
      setTimeout(() => toast.classList.add('show'), 10);
      setTimeout(() => toast.classList.remove('show'), 2000);
  }

  // 4. 深度清理所有 .quote 元素
  function deepCleanQuotes(element) {
      const clone = element.cloneNode(true);
      const quotes = clone.querySelectorAll('.quote');
      quotes.forEach(quote => quote.remove());
      return clone;
  }

  // 5. 核心复制逻辑函数
  function copyPostContent(element) {
      const cleanedElement = deepCleanQuotes(element);
      const textToCopy = cleanedElement.innerText.trim();

      if (!textToCopy) {
          showToast('复制失败：没有可复制的文本', false);
          return false;
      }

      navigator.clipboard.writeText(textToCopy+'\n')
          .then(() => showToast('复制成功！'))
          .catch(err => {
              console.error('无法复制文本: ', err);
              showToast('复制失败，请手动复制', false);
          });

      return true;
  }

  // 6. 为目标楼层内容元素添加功能（核心修正点）
  function init() {
      // 使用更宽泛的选择器，然后用 filter 进行精确过滤
      const allCandidates = document.querySelectorAll('[id^="postcontent"]');

      // 使用正则表达式过滤出 id 为 "postcontent" + "数字" 格式的元素
      const postContents = Array.from(allCandidates).filter(element => {
          return /^postcontent\d+$/.test(element.id);
      });

      postContents.forEach(content => {
          content.classList.add('post-content-hover');
          content.addEventListener('click', function(e) {
              if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
              copyPostContent(this);
          });
      });
  }

  // 初始化
  if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", init);
  } else {
      init();
  }

})();