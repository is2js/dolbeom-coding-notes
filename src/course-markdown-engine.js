import { Marked } from 'marked';

// CommonMark does not close emphasis after punctuation when a Hangul particle
// immediately follows it (e.g. **Ctrl+,**로). Treat that narrow, common Korean
// form as emphasis, while leaving escaped markers and code tokens untouched.
export const courseMarked = new Marked();
courseMarked.use({ extensions: [{
  name: 'koreanStrong',
  level: 'inline',
  start(source) {
    const position = source.indexOf('**');
    return position < 0 ? undefined : position;
  },
  tokenizer(source) {
    const match = /^\*\*((?=\S)(?:[^\n*]|\\\*)+?)\*\*(?=[\p{Script=Hangul}])/u.exec(source);
    if (!match) return undefined;
    return { type: 'koreanStrong', raw: match[0], tokens: this.lexer.inlineTokens(match[1]) };
  },
  renderer(token) {
    return `<strong>${this.parser.parseInline(token.tokens)}</strong>`;
  },
}] });
