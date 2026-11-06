import test from 'node:test';
import assert from 'node:assert/strict';
import { writeClipboard } from '../src/clipboard.js';

test('modern clipboard receives the exact selected command, including quotes and multiline source', async () => {
  const text='Get-ChildItem `\n  -LiteralPath "C:\\강의 자료"';
  let copied;
  assert.equal(await writeClipboard(text,{clipboard:{writeText:async value=>{copied=value;}},document:null}),true);
  assert.equal(copied,text);
});

function fallbackDocument(result=true) {
  const state={};
  const host={append:field=>{state.field=field;}};
  const active={closest:()=>host,focus:options=>{state.focus=options;}};
  const field={style:{},setAttribute(){},select:()=>{state.selected=true;},setSelectionRange:(...args)=>{state.range=args;},remove:()=>{state.removed=true;}};
  const doc={body:{append(){throw Error('the open dialog should host the temporary field');}},activeElement:active,createElement:()=>field,execCommand:command=>{state.command=command;return result;}};
  return {doc,state};
}

test('a rejected permission falls back inside the open dialog and restores focus without scrolling', async () => {
  const {doc,state}=fallbackDocument();
  const text='git status --short';
  assert.equal(await writeClipboard(text,{clipboard:{writeText:async()=>{throw Error('denied');}},document:doc}),true);
  assert.equal(state.field.value,text);
  assert.equal(state.command,'copy');
  assert.deepEqual(state.range,[0,text.length]);
  assert.equal(state.removed,true);
  assert.deepEqual(state.focus,{preventScroll:true});
});

test('unsupported or failed copying reports failure and still removes the temporary field', async () => {
  assert.equal(await writeClipboard('pwd',{clipboard:null,document:null}),false);
  const {doc,state}=fallbackDocument(false);
  assert.equal(await writeClipboard('pwd',{clipboard:null,document:doc}),false);
  assert.equal(state.removed,true);
  assert.equal(await writeClipboard('',{clipboard:{writeText:()=>{throw Error('must not copy empty source');}},document:null}),false);
});
