document.addEventListener('DOMContentLoaded', function(){
  // footer year
  var footer = document.getElementById('hp-footer');
  if(footer) footer.textContent = '© ' + new Date().getFullYear() + ' Hoverplay Demo';

  // Notes demo
  var notesKey = 'hp-notes-v1';
  var elList = document.getElementById('hp-list-notes');
  var btnSave = document.getElementById('hp-btn-save-note');
  var btnAdd = document.getElementById('hp-btn-add-note');
  var btnClear = document.getElementById('hp-btn-clear-notes');
  var inputTitle = document.getElementById('hp-input-note-title');
  var inputContent = document.getElementById('hp-input-note-content');

  function loadNotes(){
    var raw = localStorage.getItem(notesKey);
    try{ return raw ? JSON.parse(raw) : []; }catch(e){ return []; }
  }
  function saveNotes(arr){ localStorage.setItem(notesKey, JSON.stringify(arr)); }
  function renderNotes(){
    if(!elList) return;
    var notes = loadNotes(); elList.innerHTML = '';
    notes.forEach(function(note, idx){
      var li = document.createElement('li'); li.className = 'note-item'; li.id = 'hp-note-' + idx;
      li.innerHTML = '<strong>' + escapeHtml(note.title) + '</strong><p>' + escapeHtml(note.content) + '</p>';
      var del = document.createElement('button'); del.id = 'hp-btn-delete-' + idx; del.className = 'button button-ghost small'; del.textContent = 'Delete';
      del.addEventListener('click', function(){ deleteNote(idx); });
      li.appendChild(del);
      elList.appendChild(li);
    });
  }
  function addNote(){
    var title = inputTitle ? inputTitle.value.trim() : '';
    var content = inputContent ? inputContent.value.trim() : '';
    if(!title && !content) return;
    var arr = loadNotes(); arr.unshift({title:title, content:content, created: new Date().toISOString()}); saveNotes(arr);
    if(inputTitle) inputTitle.value = ''; if(inputContent) inputContent.value = '';
    renderNotes();
  }
  function deleteNote(idx){ var arr = loadNotes(); if(idx>=0 && idx<arr.length){ arr.splice(idx,1); saveNotes(arr); renderNotes(); }}
  function clearNotes(){ localStorage.removeItem(notesKey); renderNotes(); }
  if(btnAdd) btnAdd.addEventListener('click', function(e){ e.preventDefault(); addNote(); });
  if(btnSave) btnSave.addEventListener('click', function(e){ e.preventDefault(); addNote(); });
  if(btnClear) btnClear.addEventListener('click', function(e){ e.preventDefault(); clearNotes(); });
  renderNotes();

  // JSON playground
  var btnParse = document.getElementById('hp-btn-parse-json');
  var btnCopy = document.getElementById('hp-btn-copy-json');
  var inputJson = document.getElementById('hp-input-json');
  var outputJson = document.getElementById('hp-json-output');
  if(btnParse) btnParse.addEventListener('click', function(){
    var txt = inputJson ? inputJson.value : '';
    try{ var obj = JSON.parse(txt); if(outputJson) outputJson.textContent = JSON.stringify(obj, null, 2); }catch(e){ if(outputJson) outputJson.textContent = 'Invalid JSON: ' + e.message; }
  });
  if(btnCopy) btnCopy.addEventListener('click', function(){ var txt = outputJson ? outputJson.textContent : ''; if(!txt) return; navigator.clipboard && navigator.clipboard.writeText(txt); });

  function escapeHtml(s){ if(!s) return ''; return s.replace(/[&<>"']/g, function(m){ return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"})[m]; }); }
});
