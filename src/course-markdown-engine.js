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
}, {
  // Korean particles can immediately follow a closing delimiter. CommonMark
  // treats a punctuation-ending *phrase*이 and most _phrase_이 as literal.
  // Handle that narrow form while preserving underscores inside identifiers.
  name: 'koreanEmphasis',
  level: 'inline',
  start(source) {
    // Scan only for a complete candidate; stopping at every marker would
    // interfere with Marked's own nested strong/emphasis tokenization.
    const candidate = /(?<![*\\])\*(?!\*)(?=\S)(?:\\\*|[^*\n])*?(?!\*)[\p{P}\p{S}](?<!\\)\*(?!\*)(?=[\p{Script=Hangul}])|(?<![\\\p{L}\p{N}_])_(?!_)(?=\S)(?:\\_|[^_\n])*?[^\s_](?<!\\)_(?!_)(?=[\p{Script=Hangul}])/u;
    const position = source.search(candidate);
    return position < 0 ? undefined : position;
  },
  tokenizer(source, tokens) {
    let match;
    const previous = tokens.at(-1)?.raw || '';
    if (source.startsWith('*')) {
      if (/[*\\]$/u.test(previous)) return undefined;
      match = /^\*(?!\*)((?=\S)(?:\\\*|[^*\n])*?(?!\*)[\p{P}\p{S}])(?<!\\)\*(?!\*)(?=[\p{Script=Hangul}])/u.exec(source);
    } else if (source.startsWith('_')) {
      if (/[\\\p{L}\p{N}_]$/u.test(previous)) return undefined;
      match = /^_(?!_)((?=\S)(?:\\_|[^_\n])*?[^\s_])(?<!\\)_(?!_)(?=[\p{Script=Hangul}])/u.exec(source);
    }
    if (!match) return undefined;
    return { type: 'koreanEmphasis', raw: match[0], tokens: this.lexer.inlineTokens(match[1]) };
  },
  renderer(token) {
    return `<em>${this.parser.parseInline(token.tokens)}</em>`;
  },
}] });
