'use strict';

const copyButton = document.getElementById('copy-prompt');
const promptField = document.getElementById('start-prompt');
const copyStatus = document.getElementById('copy-status');
let resetTimer;

copyButton.addEventListener('click', async () => {
  const promptText = promptField.value;
  let copied = false;
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(promptText);
      copied = true;
    }
  } catch {
    // A browser may deny clipboard permission; keep a manual path available.
  }
  if (!copied) {
    promptField.focus();
    promptField.select();
    promptField.setSelectionRange(0, promptText.length);
    try { copied = document.execCommand('copy'); } catch { /* Use the selection below. */ }
  }
  clearTimeout(resetTimer);
  copyButton.classList.toggle('copied', copied);
  copyButton.querySelector('span').textContent = copied ? 'コピーしました' : '全文をコピー';
  copyStatus.textContent = copied
    ? 'ChatGPTの新しいチャットに、そのまま貼り付けてください。'
    : '開始文を選択しました。コピー操作を行うか、「テキストで保存」を使ってください。';
  if (copied) {
    copyButton.focus({ preventScroll: true });
    resetTimer = setTimeout(() => {
      copyButton.classList.remove('copied');
      copyButton.querySelector('span').textContent = '全文をコピー';
    }, 6000);
  }
});
