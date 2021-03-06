import without from 'lodash/without'
import { defaultSanitizerOptions } from './index'

const customSanitizerOptions = (options) =>
  Object.assign({}, defaultSanitizerOptions, options)

export default [
  {
    name: 'should render markdown h1 headers',
    source: '# Foobar',
    expected: '<h1>Foobar</h1>'
  },
  {
    name: 'should render markdown h2 headers',
    source: '## Foobar',
    expected: '<h2>Foobar</h2>'
  },
  {
    name: 'should render markdown h3 headers',
    source: '### Foobar',
    expected: '<h3>Foobar</h3>'
  },
  {
    name: 'should render markdown h4 headers',
    source: '#### Foobar',
    expected: '<h4>Foobar</h4>'
  },
  {
    name: 'should render markdown h4 headers',
    source: '#### Foobar',
    expected: '<h4>Foobar</h4>'
  },
  {
    name: 'should render markdown h5 headers',
    source: '##### Foobar',
    expected: '<h5>Foobar</h5>'
  },
  {
    name: 'should render markdown h5 headers',
    source: '###### Foobar',
    expected: '<h6>Foobar</h6>'
  },
  {
    name: 'should render markdown italics using *',
    source: '*Foobar*',
    expected: '<p><em>Foobar</em></p>'
  },
  {
    name: 'should render markdown italics using _',
    source: '_Foobar_',
    expected: '<p><em>Foobar</em></p>'
  },
  {
    name: 'should render markdown bold using **',
    source: '**Foobar**',
    expected: '<p><strong>Foobar</strong></p>'
  },
  {
    name: 'should render markdown bold using __',
    source: '__Foobar__',
    expected: '<p><strong>Foobar</strong></p>'
  },
  {
    name: 'should render markdown unordered lists',
    source: '* Item 1\n* Item 2\n  * Item 2a\n  * Item 2b',
    expected:
      '<ul>\n<li>Item 1</li>\n<li>Item 2<ul>\n<li>Item 2a</li>\n<li>Item 2b</li>\n</ul>\n</li>\n</ul>'
  },
  {
    name: 'should render markdown unordered lists',
    source: '1. Item 1\n1. Item 2\n  1. Item 2a\n  1. Item 2b',
    expected:
      '<ol>\n<li>Item 1</li>\n<li>Item 2<ol>\n<li>Item 2a</li>\n<li>Item 2b</li>\n</ol>\n</li>\n</ol>'
  },
  {
    name: 'should render markdown images',
    source:
      '![GitHub logo](https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png)',
    expected:
      '<p><img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub logo"></p>'
  },
  {
    name: 'should render markdown links',
    source: '[GitHub](https://github.com)',
    expected:
      '<p><a target="_blank" rel="noopener noreferrer" href="https://github.com">GitHub</a></p>'
  },
  {
    name: 'should render link type strings as links',
    source: 'https://github.com',
    expected:
      '<p><a target="_blank" rel="noopener noreferrer" href="https://github.com">https://github.com</a></p>'
  },
  {
    name: 'should render markdown blockquotes',
    source: '> Lorem ipsum dolor sit amet',
    expected: '<blockquote>\n<p>Lorem ipsum dolor sit amet</p>\n</blockquote>'
  },
  {
    name: 'should render markdown inline code',
    source: '`Lorem ipsum dolor sit amet`',
    expected: '<p><code>Lorem ipsum dolor sit amet</code></p>'
  },
  {
    name: 'should render markdown code blocks',
    source: "```\nconst foo = () => {\n  return 'bar'\n}\n```",
    expected:
      '<pre><code>const foo = () =&gt; {\n  return &apos;bar&apos;\n}</code></pre>'
  },
  {
    name: 'should render markdown code blocks with language specified',
    source: "```javascript\nconst foo = () => {\n  return 'bar'\n}\n```",
    expected: `<pre><code><span class="hljs-keyword">const</span> foo = <span class="hljs-function">() =&gt;</span> {\n  <span class="hljs-keyword">return</span> <span class="hljs-string">&apos;bar&apos;</span>\n}</code></pre>`
  },
  {
    name: 'should render markdown task lists',
    source: '- [x] task 1\n- [x] task 2\n- [ ] task 3',
    expected:
      '<ul>\n<li><input checked disabled type="checkbox"> task 1</li>\n<li><input checked disabled type="checkbox"> task 2</li>\n<li><input disabled type="checkbox"> task 3</li>\n</ul>'
  },
  {
    name: 'should render markdown tables',
    source: 'First | Second\n------------ | -------------\n1 | 2\n3 | 4',
    expected:
      '<table>\n<thead>\n<tr>\n<th>First</th>\n<th>Second</th>\n</tr>\n</thead>\n<tbody><tr>\n<td>1</td>\n<td>2</td>\n</tr>\n<tr>\n<td>3</td>\n<td>4</td>\n</tr>\n</tbody></table>'
  },
  {
    name: 'should render markdown strikethroughs',
    source: '~~foobar~~',
    expected: '<p><del>foobar</del></p>'
  },
  {
    name: 'should render html images',
    source:
      '<img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" />',
    expected:
      '<img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png">'
  },
  {
    name: 'should render html links',
    source: '<a href="https://github.com">GitHub</a>',
    expected: '<p><a href="https://github.com">GitHub</a></p>'
  },
  {
    name: 'should drop the content of style elements',
    source: '<style>.foo { color: blue; }</style>',
    expected: ''
  },
  {
    name: 'should drop the content of textarea elements',
    source: '<textarea>foobar</textarea>',
    expected: '<p></p>'
  },
  {
    name: 'xss: 1',
    source: '<script>alert(123)</script>',
    expected: ''
  },
  {
    name: 'xss: 2',
    source: '&lt;script&gt;alert(&#39;123&#39;);&lt;/script&gt;',
    expected: '<p>&lt;script&gt;alert(&apos;123&apos;);&lt;/script&gt;</p>'
  },
  {
    name: 'xss: 3',
    source: '<img src=x onerror=alert(123) />',
    expected: '<img src="x">'
  },
  {
    name: 'xss: 4',
    source: '<svg><script>123<1>alert(123)</script>',
    expected: '<p></p>'
  },
  {
    name: 'xss: 5',
    source: '"><script>alert(123)</script>',
    expected: '<p>&quot;&gt;</p>'
  },
  {
    name: 'xss: 6',
    source: '"><script>alert(123)</script>',
    expected: '<p>&quot;&gt;</p>'
  },
  {
    name: 'xss: 7',
    source: "'><script>alert(123)</script>",
    expected: '<p>&apos;&gt;</p>'
  },
  {
    name: 'xss: 8',
    source: '><script>alert(123)</script>',
    expected: '<blockquote>\n</blockquote>'
  },
  {
    name: 'xss: 9',
    source: '</script><script>alert(123)</script>',
    expected: '<p></p>'
  },
  {
    name: 'xss: 10',
    source: '< / script >< script >alert(123)< / script >',
    expected:
      '<p>&lt; / script &gt;&lt; script &gt;alert(123)&lt; / script &gt;</p>'
  },
  {
    name: 'xss: 11',
    source: ' onfocus=JaVaSCript:alert(123) autofocus',
    expected: '<p> onfocus=JaVaSCript:alert(123) autofocus</p>'
  },
  {
    name: 'xss: 12',
    source: '" onfocus=JaVaSCript:alert(123) autofocus',
    expected: '<p>&quot; onfocus=JaVaSCript:alert(123) autofocus</p>'
  },
  {
    name: 'xss: 13',
    source: "' onfocus=JaVaSCript:alert(123) autofocus",
    expected: '<p>&apos; onfocus=JaVaSCript:alert(123) autofocus</p>'
  },
  {
    name: 'xss: 14',
    source: '＜script＞alert(123)＜/script＞',
    expected: '<p>&#xFF1C;script&#xFF1E;alert(123)&#xFF1C;/script&#xFF1E;</p>'
  },
  {
    name: 'xss: 15',
    source: '<sc<script>ript>alert(123)</sc</script>ript>',
    expected: '<p>&lt;script&gt;</p>'
  },
  {
    name: 'xss: 16',
    source: '--><script>alert(123)</script>',
    expected: '<p>--&gt;</p>'
  },
  {
    name: 'xss: 17',
    source: '";alert(123);t="',
    expected: '<p>&quot;;alert(123);t=&quot;</p>'
  },
  {
    name: 'xss: 18',
    source: "';alert(123);t='",
    expected: '<p>&apos;;alert(123);t=&apos;</p>'
  },
  {
    name: 'xss: 19',
    source: 'JavaSCript:alert(123)',
    expected: '<p>JavaSCript:alert(123)</p>'
  },
  {
    name: 'xss: 20',
    source: ';alert(123);',
    expected: '<p>;alert(123);</p>'
  },
  {
    name: 'xss: 21',
    source: 'src=JaVaSCript:prompt(132)',
    expected: '<p>src=JaVaSCript:prompt(132)</p>'
  },
  {
    name: 'xss: 22',
    source: '"><script>alert(123);</script x="',
    expected: '<p>&quot;&gt;\n</p>'
  },
  {
    name: 'xss: 23',
    source: "'><script>alert(123);</script x='",
    expected: '<p>&apos;&gt;\n</p>'
  },
  {
    name: 'xss: 24',
    source: '><script>alert(123);</script x=',
    expected: '<blockquote>\n\n</blockquote>'
  },
  {
    name: 'xss: 25',
    source: '" autofocus onkeyup="javascript:alert(123)',
    expected: '<p>&quot; autofocus onkeyup=&quot;javascript:alert(123)</p>'
  },
  {
    name: 'xss: 26',
    source: "' autofocus onkeyup='javascript:alert(123)",
    expected: '<p>&apos; autofocus onkeyup=&apos;javascript:alert(123)</p>'
  },
  {
    name: 'xss: 27',
    source: '<script\\x20type="text/javascript">javascript:alert(1);</script>',
    expected:
      '<p>&lt;script\\x20type=&quot;text/javascript&quot;&gt;javascript:alert(1);</p>'
  },
  {
    name: 'xss: 28',
    source: '<script\\x3Etype="text/javascript">javascript:alert(1);</script>',
    expected:
      '<p>&lt;script\\x3Etype=&quot;text/javascript&quot;&gt;javascript:alert(1);</p>'
  },
  {
    name: 'xss: 29',
    source: '<script\\x0Dtype="text/javascript">javascript:alert(1);</script>',
    expected:
      '<p>&lt;script\\x0Dtype=&quot;text/javascript&quot;&gt;javascript:alert(1);</p>'
  },
  {
    name: 'xss: 30',
    source: '<script\\x09type="text/javascript">javascript:alert(1);</script>',
    expected:
      '<p>&lt;script\\x09type=&quot;text/javascript&quot;&gt;javascript:alert(1);</p>'
  },
  {
    name: 'xss: 31',
    source: '<script\\x0Ctype="text/javascript">javascript:alert(1);</script>',
    expected:
      '<p>&lt;script\\x0Ctype=&quot;text/javascript&quot;&gt;javascript:alert(1);</p>'
  },
  {
    name: 'xss: 32',
    source: '<script\\x2Ftype="text/javascript">javascript:alert(1);</script>',
    expected:
      '<p>&lt;script\\x2Ftype=&quot;text/javascript&quot;&gt;javascript:alert(1);</p>'
  },
  {
    name: 'xss: 33',
    source: '<script\\x0Atype="text/javascript">javascript:alert(1);</script>',
    expected:
      '<p>&lt;script\\x0Atype=&quot;text/javascript&quot;&gt;javascript:alert(1);</p>'
  },
  {
    name: 'xss: 34',
    source: '\'`"><\\x3Cscript>javascript:alert(1)</script>',
    expected: '<p>&apos;`&quot;&gt;&lt;\\x3Cscript&gt;javascript:alert(1)</p>'
  },
  {
    name: 'xss: 35',
    source: '\'`"><\\x00script>javascript:alert(1)</script>',
    expected: '<p>&apos;`&quot;&gt;&lt;\\x00script&gt;javascript:alert(1)</p>'
  },
  {
    name: 'xss: 36',
    source: 'ABC<div style="x\\x3Aexpression(javascript:alert(1)">DEF',
    expected: '<p>ABC</p><div>DEF<p></p>\n</div>'
  },
  {
    name: 'xss: 37',
    source: 'ABC<div style="x:expression\\x5C(javascript:alert(1)">DEF',
    expected: '<p>ABC</p><div>DEF<p></p>\n</div>'
  },
  {
    name: 'xss: 38',
    source: 'ABC<div style="x:expression\\x00(javascript:alert(1)">DEF',
    expected: '<p>ABC</p><div>DEF<p></p>\n</div>'
  },
  {
    name: 'xss: 39',
    source: 'ABC<div style="x:exp\\x00ression(javascript:alert(1)">DEF',
    expected: '<p>ABC</p><div>DEF<p></p>\n</div>'
  },
  {
    name: 'xss: 40',
    source: 'ABC<div style="x:exp\\x5Cression(javascript:alert(1)">DEF',
    expected: '<p>ABC</p><div>DEF<p></p>\n</div>'
  },
  {
    name: 'xss: 41',
    source: 'ABC<div style="x:\\x0Aexpression(javascript:alert(1)">DEF',
    expected: '<p>ABC</p><div>DEF<p></p>\n</div>'
  },
  {
    name: 'xss: 42',
    source: 'ABC<div style="x:\\x09expression(javascript:alert(1)">DEF',
    expected: '<p>ABC</p><div>DEF<p></p>\n</div>'
  },
  {
    name: 'xss: 43',
    source:
      'ABC<div style="x:\\xE3\\x80\\x80expression(javascript:alert(1)">DEF',
    expected: '<p>ABC</p><div>DEF<p></p>\n</div>'
  },
  {
    name: 'xss: 44',
    source:
      'ABC<div style="x:\\xE2\\x80\\x84expression(javascript:alert(1)">DEF',
    expected: '<p>ABC</p><div>DEF<p></p>\n</div>'
  },
  {
    name: 'xss: 45',
    source: 'ABC<div style="x:\\xC2\\xA0expression(javascript:alert(1)">DEF',
    expected: '<p>ABC</p><div>DEF<p></p>\n</div>'
  },
  {
    name: 'xss: 46',
    source:
      'ABC<div style="x:\\xE2\\x80\\x80expression(javascript:alert(1)">DEF',
    expected: '<p>ABC</p><div>DEF<p></p>\n</div>'
  },
  {
    name: 'xss: 47',
    source:
      'ABC<div style="x:\\xE2\\x80\\x8Aexpression(javascript:alert(1)">DEF',
    expected: '<p>ABC</p><div>DEF<p></p>\n</div>'
  },
  {
    name: 'xss: 48',
    source: 'ABC<div style="x:\\x0Dexpression(javascript:alert(1)">DEF',
    expected: '<p>ABC</p><div>DEF<p></p>\n</div>'
  },
  {
    name: 'xss: 49',
    source: 'ABC<div style="x:\\x0Cexpression(javascript:alert(1)">DEF',
    expected: '<p>ABC</p><div>DEF<p></p>\n</div>'
  },
  {
    name: 'xss: 50',
    source:
      'ABC<div style="x:\\xE2\\x80\\x87expression(javascript:alert(1)">DEF',
    expected: '<p>ABC</p><div>DEF<p></p>\n</div>'
  },
  {
    name: 'xss: 51',
    source:
      'ABC<div style="x:\\xEF\\xBB\\xBFexpression(javascript:alert(1)">DEF',
    expected: '<p>ABC</p><div>DEF<p></p>\n</div>'
  },
  {
    name: 'xss: 52',
    source: 'ABC<div style="x:\\x20expression(javascript:alert(1)">DEF',
    expected: '<p>ABC</p><div>DEF<p></p>\n</div>'
  },
  {
    name: 'xss: 53',
    source:
      'ABC<div style="x:\\xE2\\x80\\x88expression(javascript:alert(1)">DEF',
    expected: '<p>ABC</p><div>DEF<p></p>\n</div>'
  },
  {
    name: 'xss: 54',
    source: 'ABC<div style="x:\\x00expression(javascript:alert(1)">DEF',
    expected: '<p>ABC</p><div>DEF<p></p>\n</div>'
  },
  {
    name: 'xss: 55',
    source:
      'ABC<div style="x:\\xE2\\x80\\x8Bexpression(javascript:alert(1)">DEF',
    expected: '<p>ABC</p><div>DEF<p></p>\n</div>'
  },
  {
    name: 'xss: 56',
    source:
      'ABC<div style="x:\\xE2\\x80\\x86expression(javascript:alert(1)">DEF',
    expected: '<p>ABC</p><div>DEF<p></p>\n</div>'
  },
  {
    name: 'xss: 57',
    source:
      'ABC<div style="x:\\xE2\\x80\\x85expression(javascript:alert(1)">DEF',
    expected: '<p>ABC</p><div>DEF<p></p>\n</div>'
  },
  {
    name: 'xss: 58',
    source:
      'ABC<div style="x:\\xE2\\x80\\x82expression(javascript:alert(1)">DEF',
    expected: '<p>ABC</p><div>DEF<p></p>\n</div>'
  },
  {
    name: 'xss: 59',
    source: 'ABC<div style="x:\\x0Bexpression(javascript:alert(1)">DEF',
    expected: '<p>ABC</p><div>DEF<p></p>\n</div>'
  },
  {
    name: 'xss: 60',
    source:
      'ABC<div style="x:\\xE2\\x80\\x81expression(javascript:alert(1)">DEF',
    expected: '<p>ABC</p><div>DEF<p></p>\n</div>'
  },
  {
    name: 'xss: 61',
    source:
      'ABC<div style="x:\\xE2\\x80\\x83expression(javascript:alert(1)">DEF',
    expected: '<p>ABC</p><div>DEF<p></p>\n</div>'
  },
  {
    name: 'xss: 62',
    source:
      'ABC<div style="x:\\xE2\\x80\\x89expression(javascript:alert(1)">DEF',
    expected: '<p>ABC</p><div>DEF<p></p>\n</div>'
  },
  {
    name: 'xss: 63',
    source:
      '<a href="\\x0Bjavascript:javascript:alert(1)" id="fuzzelement1">test</a>',
    expected: '<p><a href="\\x0Bjavascript:javascript:alert(1)">test</a></p>'
  },
  {
    name: 'xss: 64',
    source:
      '<a href="\\x0Fjavascript:javascript:alert(1)" id="fuzzelement1">test</a>',
    expected: '<p><a href="\\x0Fjavascript:javascript:alert(1)">test</a></p>'
  },
  {
    name: 'xss: 65',
    source:
      '<a href="\\xC2\\xA0javascript:javascript:alert(1)" id="fuzzelement1">test</a>',
    expected:
      '<p><a href="\\xC2\\xA0javascript:javascript:alert(1)">test</a></p>'
  },
  {
    name: 'xss: 66',
    source:
      '<a href="\\x05javascript:javascript:alert(1)" id="fuzzelement1">test</a>',
    expected: '<p><a href="\\x05javascript:javascript:alert(1)">test</a></p>'
  },
  {
    name: 'xss: 67',
    source:
      '<a href="\\xE1\\xA0\\x8Ejavascript:javascript:alert(1)" id="fuzzelement1">test</a>',
    expected:
      '<p><a href="\\xE1\\xA0\\x8Ejavascript:javascript:alert(1)">test</a></p>'
  },
  {
    name: 'xss: 68',
    source:
      '<a href="\\x18javascript:javascript:alert(1)" id="fuzzelement1">test</a>',
    expected: '<p><a href="\\x18javascript:javascript:alert(1)">test</a></p>'
  },
  {
    name: 'xss: 69',
    source:
      '<a href="\\x11javascript:javascript:alert(1)" id="fuzzelement1">test</a>',
    expected: '<p><a href="\\x11javascript:javascript:alert(1)">test</a></p>'
  },
  {
    name: 'xss: 70',
    source:
      '<a href="\\xE2\\x80\\x88javascript:javascript:alert(1)" id="fuzzelement1">test</a>',
    expected:
      '<p><a href="\\xE2\\x80\\x88javascript:javascript:alert(1)">test</a></p>'
  },
  {
    name: 'xss: 71',
    source:
      '<a href="\\xE2\\x80\\x89javascript:javascript:alert(1)" id="fuzzelement1">test</a>',
    expected:
      '<p><a href="\\xE2\\x80\\x89javascript:javascript:alert(1)">test</a></p>'
  },
  {
    name: 'xss: 72',
    source:
      '<a href="\\xE2\\x80\\x80javascript:javascript:alert(1)" id="fuzzelement1">test</a>',
    expected:
      '<p><a href="\\xE2\\x80\\x80javascript:javascript:alert(1)">test</a></p>'
  },
  {
    name: 'xss: 73',
    source:
      '<a href="\\x17javascript:javascript:alert(1)" id="fuzzelement1">test</a>',
    expected: '<p><a href="\\x17javascript:javascript:alert(1)">test</a></p>'
  },
  {
    name: 'xss: 74',
    source:
      '<a href="\\x03javascript:javascript:alert(1)" id="fuzzelement1">test</a>',
    expected: '<p><a href="\\x03javascript:javascript:alert(1)">test</a></p>'
  },
  {
    name: 'xss: 75',
    source:
      '<a href="\\x0Ejavascript:javascript:alert(1)" id="fuzzelement1">test</a>',
    expected: '<p><a href="\\x0Ejavascript:javascript:alert(1)">test</a></p>'
  },
  {
    name: 'xss: 76',
    source:
      '<a href="\\x1Ajavascript:javascript:alert(1)" id="fuzzelement1">test</a>',
    expected: '<p><a href="\\x1Ajavascript:javascript:alert(1)">test</a></p>'
  },
  {
    name: 'xss: 77',
    source:
      '<a href="\\x00javascript:javascript:alert(1)" id="fuzzelement1">test</a>',
    expected: '<p><a href="\\x00javascript:javascript:alert(1)">test</a></p>'
  },
  {
    name: 'xss: 78',
    source:
      '<a href="\\x10javascript:javascript:alert(1)" id="fuzzelement1">test</a>',
    expected: '<p><a href="\\x10javascript:javascript:alert(1)">test</a></p>'
  },
  {
    name: 'xss: 79',
    source:
      '<a href="\\xE2\\x80\\x82javascript:javascript:alert(1)" id="fuzzelement1">test</a>',
    expected:
      '<p><a href="\\xE2\\x80\\x82javascript:javascript:alert(1)">test</a></p>'
  },
  {
    name: 'xss: 80',
    source:
      '<a href="\\x20javascript:javascript:alert(1)" id="fuzzelement1">test</a>',
    expected: '<p><a href="\\x20javascript:javascript:alert(1)">test</a></p>'
  },
  {
    name: 'xss: 81',
    source:
      '<a href="\\x13javascript:javascript:alert(1)" id="fuzzelement1">test</a>',
    expected: '<p><a href="\\x13javascript:javascript:alert(1)">test</a></p>'
  },
  {
    name: 'xss: 82',
    source:
      '<a href="\\x09javascript:javascript:alert(1)" id="fuzzelement1">test</a>',
    expected: '<p><a href="\\x09javascript:javascript:alert(1)">test</a></p>'
  },
  {
    name: 'xss: 83',
    source:
      '<a href="\\xE2\\x80\\x8Ajavascript:javascript:alert(1)" id="fuzzelement1">test</a>',
    expected:
      '<p><a href="\\xE2\\x80\\x8Ajavascript:javascript:alert(1)">test</a></p>'
  },
  {
    name: 'xss: 84',
    source:
      '<a href="\\x14javascript:javascript:alert(1)" id="fuzzelement1">test</a>',
    expected: '<p><a href="\\x14javascript:javascript:alert(1)">test</a></p>'
  },
  {
    name: 'xss: 85',
    source:
      '<a href="\\x19javascript:javascript:alert(1)" id="fuzzelement1">test</a>',
    expected: '<p><a href="\\x19javascript:javascript:alert(1)">test</a></p>'
  },
  {
    name: 'xss: 86',
    source:
      '<a href="\\xE2\\x80\\xAFjavascript:javascript:alert(1)" id="fuzzelement1">test</a>',
    expected:
      '<p><a href="\\xE2\\x80\\xAFjavascript:javascript:alert(1)">test</a></p>'
  },
  {
    name: 'xss: 87',
    source:
      '<a href="\\x1Fjavascript:javascript:alert(1)" id="fuzzelement1">test</a>',
    expected: '<p><a href="\\x1Fjavascript:javascript:alert(1)">test</a></p>'
  },
  {
    name: 'xss: 88',
    source:
      '<a href="\\xE2\\x80\\x81javascript:javascript:alert(1)" id="fuzzelement1">test</a>',
    expected:
      '<p><a href="\\xE2\\x80\\x81javascript:javascript:alert(1)">test</a></p>'
  },
  {
    name: 'xss: 89',
    source:
      '<a href="\\x1Djavascript:javascript:alert(1)" id="fuzzelement1">test</a>',
    expected: '<p><a href="\\x1Djavascript:javascript:alert(1)">test</a></p>'
  },
  {
    name: 'xss: 90',
    source:
      '<a href="\\xE2\\x80\\x87javascript:javascript:alert(1)" id="fuzzelement1">test</a>',
    expected:
      '<p><a href="\\xE2\\x80\\x87javascript:javascript:alert(1)">test</a></p>'
  },
  {
    name: 'xss: 91',
    source:
      '<a href="\\x07javascript:javascript:alert(1)" id="fuzzelement1">test</a>',
    expected: '<p><a href="\\x07javascript:javascript:alert(1)">test</a></p>'
  },
  {
    name: 'xss: 92',
    source:
      '<a href="\\xE1\\x9A\\x80javascript:javascript:alert(1)" id="fuzzelement1">test</a>',
    expected:
      '<p><a href="\\xE1\\x9A\\x80javascript:javascript:alert(1)">test</a></p>'
  },
  {
    name: 'xss: 93',
    source:
      '<a href="\\xE2\\x80\\x83javascript:javascript:alert(1)" id="fuzzelement1">test</a>',
    expected:
      '<p><a href="\\xE2\\x80\\x83javascript:javascript:alert(1)">test</a></p>'
  },
  {
    name: 'xss: 94',
    source:
      '<a href="\\x04javascript:javascript:alert(1)" id="fuzzelement1">test</a>',
    expected: '<p><a href="\\x04javascript:javascript:alert(1)">test</a></p>'
  },
  {
    name: 'xss: 95',
    source:
      '<a href="\\x01javascript:javascript:alert(1)" id="fuzzelement1">test</a>',
    expected: '<p><a href="\\x01javascript:javascript:alert(1)">test</a></p>'
  },
  {
    name: 'xss: 96',
    source:
      '<a href="\\x08javascript:javascript:alert(1)" id="fuzzelement1">test</a>',
    expected: '<p><a href="\\x08javascript:javascript:alert(1)">test</a></p>'
  },
  {
    name: 'xss: 97',
    source:
      '<a href="\\xE2\\x80\\x84javascript:javascript:alert(1)" id="fuzzelement1">test</a>',
    expected:
      '<p><a href="\\xE2\\x80\\x84javascript:javascript:alert(1)">test</a></p>'
  },
  {
    name: 'xss: 98',
    source:
      '<a href="\\xE2\\x80\\x86javascript:javascript:alert(1)" id="fuzzelement1">test</a>',
    expected:
      '<p><a href="\\xE2\\x80\\x86javascript:javascript:alert(1)">test</a></p>'
  },
  {
    name: 'xss: 99',
    source:
      '<a href="\\xE3\\x80\\x80javascript:javascript:alert(1)" id="fuzzelement1">test</a>',
    expected:
      '<p><a href="\\xE3\\x80\\x80javascript:javascript:alert(1)">test</a></p>'
  },
  {
    name: 'xss: 100',
    source:
      '<a href="\\x12javascript:javascript:alert(1)" id="fuzzelement1">test</a>',
    expected: '<p><a href="\\x12javascript:javascript:alert(1)">test</a></p>'
  },
  {
    name: 'xss: 101',
    source:
      '<a href="\\x0Djavascript:javascript:alert(1)" id="fuzzelement1">test</a>',
    expected: '<p><a href="\\x0Djavascript:javascript:alert(1)">test</a></p>'
  },
  {
    name: 'xss: 102',
    source:
      '<a href="\\x0Ajavascript:javascript:alert(1)" id="fuzzelement1">test</a>',
    expected: '<p><a href="\\x0Ajavascript:javascript:alert(1)">test</a></p>'
  },
  {
    name: 'xss: 103',
    source:
      '<a href="\\x0Cjavascript:javascript:alert(1)" id="fuzzelement1">test</a>',
    expected: '<p><a href="\\x0Cjavascript:javascript:alert(1)">test</a></p>'
  },
  {
    name: 'xss: 104',
    source:
      '<a href="\\x15javascript:javascript:alert(1)" id="fuzzelement1">test</a>',
    expected: '<p><a href="\\x15javascript:javascript:alert(1)">test</a></p>'
  },
  {
    name: 'xss: 105',
    source:
      '<a href="\\xE2\\x80\\xA8javascript:javascript:alert(1)" id="fuzzelement1">test</a>',
    expected:
      '<p><a href="\\xE2\\x80\\xA8javascript:javascript:alert(1)">test</a></p>'
  },
  {
    name: 'xss: 106',
    source:
      '<a href="\\x16javascript:javascript:alert(1)" id="fuzzelement1">test</a>',
    expected: '<p><a href="\\x16javascript:javascript:alert(1)">test</a></p>'
  },
  {
    name: 'xss: 107',
    source:
      '<a href="\\x02javascript:javascript:alert(1)" id="fuzzelement1">test</a>',
    expected: '<p><a href="\\x02javascript:javascript:alert(1)">test</a></p>'
  },
  {
    name: 'xss: 108',
    source:
      '<a href="\\x1Bjavascript:javascript:alert(1)" id="fuzzelement1">test</a>',
    expected: '<p><a href="\\x1Bjavascript:javascript:alert(1)">test</a></p>'
  },
  {
    name: 'xss: 109',
    source:
      '<a href="\\x06javascript:javascript:alert(1)" id="fuzzelement1">test</a>',
    expected: '<p><a href="\\x06javascript:javascript:alert(1)">test</a></p>'
  },
  {
    name: 'xss: 110',
    source:
      '<a href="\\xE2\\x80\\xA9javascript:javascript:alert(1)" id="fuzzelement1">test</a>',
    expected:
      '<p><a href="\\xE2\\x80\\xA9javascript:javascript:alert(1)">test</a></p>'
  },
  {
    name: 'xss: 111',
    source:
      '<a href="\\xE2\\x80\\x85javascript:javascript:alert(1)" id="fuzzelement1">test</a>',
    expected:
      '<p><a href="\\xE2\\x80\\x85javascript:javascript:alert(1)">test</a></p>'
  },
  {
    name: 'xss: 112',
    source:
      '<a href="\\x1Ejavascript:javascript:alert(1)" id="fuzzelement1">test</a>',
    expected: '<p><a href="\\x1Ejavascript:javascript:alert(1)">test</a></p>'
  },
  {
    name: 'xss: 113',
    source:
      '<a href="\\xE2\\x81\\x9Fjavascript:javascript:alert(1)" id="fuzzelement1">test</a>',
    expected:
      '<p><a href="\\xE2\\x81\\x9Fjavascript:javascript:alert(1)">test</a></p>'
  },
  {
    name: 'xss: 114',
    source:
      '<a href="\\x1Cjavascript:javascript:alert(1)" id="fuzzelement1">test</a>',
    expected: '<p><a href="\\x1Cjavascript:javascript:alert(1)">test</a></p>'
  },
  {
    name: 'xss: 115',
    source:
      '<a href="javascript\\x00:javascript:alert(1)" id="fuzzelement1">test</a>',
    expected: '<p><a href="javascript\\x00:javascript:alert(1)">test</a></p>'
  },
  {
    name: 'xss: 116',
    source:
      '<a href="javascript\\x3A:javascript:alert(1)" id="fuzzelement1">test</a>',
    expected: '<p><a href="javascript\\x3A:javascript:alert(1)">test</a></p>'
  },
  {
    name: 'xss: 117',
    source:
      '<a href="javascript\\x09:javascript:alert(1)" id="fuzzelement1">test</a>',
    expected: '<p><a href="javascript\\x09:javascript:alert(1)">test</a></p>'
  },
  {
    name: 'xss: 118',
    source:
      '<a href="javascript\\x0D:javascript:alert(1)" id="fuzzelement1">test</a>',
    expected: '<p><a href="javascript\\x0D:javascript:alert(1)">test</a></p>'
  },
  {
    name: 'xss: 119',
    source:
      '<a href="javascript\\x0A:javascript:alert(1)" id="fuzzelement1">test</a>',
    expected: '<p><a href="javascript\\x0A:javascript:alert(1)">test</a></p>'
  },
  {
    name: 'xss: 120',
    source: '`"\'><img src=xxx:x \\x0Aonerror=javascript:alert(1)>',
    expected:
      '<p>`&quot;&apos;&gt;&lt;img src=xxx:x \\x0Aonerror=javascript:alert(1)&gt;</p>'
  },
  {
    name: 'xss: 121',
    source: '`"\'><img src=xxx:x \\x22onerror=javascript:alert(1)>',
    expected:
      '<p>`&quot;&apos;&gt;&lt;img src=xxx:x \\x22onerror=javascript:alert(1)&gt;</p>'
  },
  {
    name: 'xss: 122',
    source: '`"\'><img src=xxx:x \\x0Bonerror=javascript:alert(1)>',
    expected:
      '<p>`&quot;&apos;&gt;&lt;img src=xxx:x \\x0Bonerror=javascript:alert(1)&gt;</p>'
  },
  {
    name: 'xss: 123',
    source: '`"\'><img src=xxx:x \\x0Donerror=javascript:alert(1)>',
    expected:
      '<p>`&quot;&apos;&gt;&lt;img src=xxx:x \\x0Donerror=javascript:alert(1)&gt;</p>'
  },
  {
    name: 'xss: 124',
    source: '`"\'><img src=xxx:x \\x2Fonerror=javascript:alert(1)>',
    expected:
      '<p>`&quot;&apos;&gt;&lt;img src=xxx:x \\x2Fonerror=javascript:alert(1)&gt;</p>'
  },
  {
    name: 'xss: 125',
    source: '`"\'><img src=xxx:x \\x09onerror=javascript:alert(1)>',
    expected:
      '<p>`&quot;&apos;&gt;&lt;img src=xxx:x \\x09onerror=javascript:alert(1)&gt;</p>'
  },
  {
    name: 'xss: 126',
    source: '`"\'><img src=xxx:x \\x0Conerror=javascript:alert(1)>',
    expected:
      '<p>`&quot;&apos;&gt;&lt;img src=xxx:x \\x0Conerror=javascript:alert(1)&gt;</p>'
  },
  {
    name: 'xss: 127',
    source: '`"\'><img src=xxx:x \\x00onerror=javascript:alert(1)>',
    expected:
      '<p>`&quot;&apos;&gt;&lt;img src=xxx:x \\x00onerror=javascript:alert(1)&gt;</p>'
  },
  {
    name: 'xss: 128',
    source: '`"\'><img src=xxx:x \\x27onerror=javascript:alert(1)>',
    expected:
      '<p>`&quot;&apos;&gt;&lt;img src=xxx:x \\x27onerror=javascript:alert(1)&gt;</p>'
  },
  {
    name: 'xss: 129',
    source: '`"\'><img src=xxx:x \\x20onerror=javascript:alert(1)>',
    expected:
      '<p>`&quot;&apos;&gt;&lt;img src=xxx:x \\x20onerror=javascript:alert(1)&gt;</p>'
  },
  {
    name: 'xss: 130',
    source: '"`\'><script>\\x3Bjavascript:alert(1)</script>',
    expected: '<p>&quot;`&apos;&gt;</p>'
  },
  {
    name: 'xss: 131',
    source: '"`\'><script>\\x0Djavascript:alert(1)</script>',
    expected: '<p>&quot;`&apos;&gt;</p>'
  },
  {
    name: 'xss: 132',
    source: '"`\'><script>\\xEF\\xBB\\xBFjavascript:alert(1)</script>',
    expected: '<p>&quot;`&apos;&gt;</p>'
  },
  {
    name: 'xss: 133',
    source: '"`\'><script>\\xE2\\x80\\x81javascript:alert(1)</script>',
    expected: '<p>&quot;`&apos;&gt;</p>'
  },
  {
    name: 'xss: 134',
    source: '"`\'><script>\\xE2\\x80\\x84javascript:alert(1)</script>',
    expected: '<p>&quot;`&apos;&gt;</p>'
  },
  {
    name: 'xss: 135',
    source: '"`\'><script>\\xE3\\x80\\x80javascript:alert(1)</script>',
    expected: '<p>&quot;`&apos;&gt;</p>'
  },
  {
    name: 'xss: 136',
    source: '"`\'><script>\\x09javascript:alert(1)</script>',
    expected: '<p>&quot;`&apos;&gt;</p>'
  },
  {
    name: 'xss: 137',
    source: '"`\'><script>\\xE2\\x80\\x89javascript:alert(1)</script>',
    expected: '<p>&quot;`&apos;&gt;</p>'
  },
  {
    name: 'xss: 138',
    source: '"`\'><script>\\xE2\\x80\\x85javascript:alert(1)</script>',
    expected: '<p>&quot;`&apos;&gt;</p>'
  },
  {
    name: 'xss: 139',
    source: '"`\'><script>\\xE2\\x80\\x88javascript:alert(1)</script>',
    expected: '<p>&quot;`&apos;&gt;</p>'
  },
  {
    name: 'xss: 140',
    source: '"`\'><script>\\x00javascript:alert(1)</script>',
    expected: '<p>&quot;`&apos;&gt;</p>'
  },
  {
    name: 'xss: 141',
    source: '"`\'><script>\\xE2\\x80\\xA8javascript:alert(1)</script>',
    expected: '<p>&quot;`&apos;&gt;</p>'
  },
  {
    name: 'xss: 142',
    source: '"`\'><script>\\xE2\\x80\\x8Ajavascript:alert(1)</script>',
    expected: '<p>&quot;`&apos;&gt;</p>'
  },
  {
    name: 'xss: 143',
    source: '"`\'><script>\\xE1\\x9A\\x80javascript:alert(1)</script>',
    expected: '<p>&quot;`&apos;&gt;</p>'
  },
  {
    name: 'xss: 144',
    source: '"`\'><script>\\x0Cjavascript:alert(1)</script>',
    expected: '<p>&quot;`&apos;&gt;</p>'
  },
  {
    name: 'xss: 145',
    source: '"`\'><script>\\x2Bjavascript:alert(1)</script>',
    expected: '<p>&quot;`&apos;&gt;</p>'
  },
  {
    name: 'xss: 146',
    source: '"`\'><script>\\xF0\\x90\\x96\\x9Ajavascript:alert(1)</script>',
    expected: '<p>&quot;`&apos;&gt;</p>'
  },
  {
    name: 'xss: 147',
    source: '"`\'><script>-javascript:alert(1)</script>',
    expected: '<p>&quot;`&apos;&gt;</p>'
  },
  {
    name: 'xss: 148',
    source: '"`\'><script>\\x0Ajavascript:alert(1)</script>',
    expected: '<p>&quot;`&apos;&gt;</p>'
  },
  {
    name: 'xss: 149',
    source: '"`\'><script>\\xE2\\x80\\xAFjavascript:alert(1)</script>',
    expected: '<p>&quot;`&apos;&gt;</p>'
  },
  {
    name: 'xss: 150',
    source: '"`\'><script>\\x7Ejavascript:alert(1)</script>',
    expected: '<p>&quot;`&apos;&gt;</p>'
  },
  {
    name: 'xss: 151',
    source: '"`\'><script>\\xE2\\x80\\x87javascript:alert(1)</script>',
    expected: '<p>&quot;`&apos;&gt;</p>'
  },
  {
    name: 'xss: 152',
    source: '"`\'><script>\\xE2\\x81\\x9Fjavascript:alert(1)</script>',
    expected: '<p>&quot;`&apos;&gt;</p>'
  },
  {
    name: 'xss: 153',
    source: '"`\'><script>\\xE2\\x80\\xA9javascript:alert(1)</script>',
    expected: '<p>&quot;`&apos;&gt;</p>'
  },
  {
    name: 'xss: 154',
    source: '"`\'><script>\\xC2\\x85javascript:alert(1)</script>',
    expected: '<p>&quot;`&apos;&gt;</p>'
  },
  {
    name: 'xss: 155',
    source: '"`\'><script>\\xEF\\xBF\\xAEjavascript:alert(1)</script>',
    expected: '<p>&quot;`&apos;&gt;</p>'
  },
  {
    name: 'xss: 156',
    source: '"`\'><script>\\xE2\\x80\\x83javascript:alert(1)</script>',
    expected: '<p>&quot;`&apos;&gt;</p>'
  },
  {
    name: 'xss: 157',
    source: '"`\'><script>\\xE2\\x80\\x8Bjavascript:alert(1)</script>',
    expected: '<p>&quot;`&apos;&gt;</p>'
  },
  {
    name: 'xss: 158',
    source: '"`\'><script>\\xEF\\xBF\\xBEjavascript:alert(1)</script>',
    expected: '<p>&quot;`&apos;&gt;</p>'
  },
  {
    name: 'xss: 159',
    source: '"`\'><script>\\xE2\\x80\\x80javascript:alert(1)</script>',
    expected: '<p>&quot;`&apos;&gt;</p>'
  },
  {
    name: 'xss: 160',
    source: '"`\'><script>\\x21javascript:alert(1)</script>',
    expected: '<p>&quot;`&apos;&gt;</p>'
  },
  {
    name: 'xss: 161',
    source: '"`\'><script>\\xE2\\x80\\x82javascript:alert(1)</script>',
    expected: '<p>&quot;`&apos;&gt;</p>'
  },
  {
    name: 'xss: 162',
    source: '"`\'><script>\\xE2\\x80\\x86javascript:alert(1)</script>',
    expected: '<p>&quot;`&apos;&gt;</p>'
  },
  {
    name: 'xss: 163',
    source: '"`\'><script>\\xE1\\xA0\\x8Ejavascript:alert(1)</script>',
    expected: '<p>&quot;`&apos;&gt;</p>'
  },
  {
    name: 'xss: 164',
    source: '"`\'><script>\\x0Bjavascript:alert(1)</script>',
    expected: '<p>&quot;`&apos;&gt;</p>'
  },
  {
    name: 'xss: 165',
    source: '"`\'><script>\\x20javascript:alert(1)</script>',
    expected: '<p>&quot;`&apos;&gt;</p>'
  },
  {
    name: 'xss: 166',
    source: '"`\'><script>\\xC2\\xA0javascript:alert(1)</script>',
    expected: '<p>&quot;`&apos;&gt;</p>'
  },
  {
    name: 'xss: 167',
    source: '<img \\x00src=x onerror="alert(1)">',
    expected: '<p>&lt;img \\x00src=x onerror=&quot;alert(1)&quot;&gt;</p>'
  },
  {
    name: 'xss: 168',
    source: '<img \\x47src=x onerror="javascript:alert(1)">',
    expected:
      '<p>&lt;img \\x47src=x onerror=&quot;javascript:alert(1)&quot;&gt;</p>'
  },
  {
    name: 'xss: 169',
    source: '<img \\x11src=x onerror="javascript:alert(1)">',
    expected:
      '<p>&lt;img \\x11src=x onerror=&quot;javascript:alert(1)&quot;&gt;</p>'
  },
  {
    name: 'xss: 170',
    source: '<img \\x12src=x onerror="javascript:alert(1)">',
    expected:
      '<p>&lt;img \\x12src=x onerror=&quot;javascript:alert(1)&quot;&gt;</p>'
  },
  {
    name: 'xss: 171',
    source: '<img\\x47src=x onerror="javascript:alert(1)">',
    expected:
      '<p>&lt;img\\x47src=x onerror=&quot;javascript:alert(1)&quot;&gt;</p>'
  },
  {
    name: 'xss: 172',
    source: '<img\\x10src=x onerror="javascript:alert(1)">',
    expected:
      '<p>&lt;img\\x10src=x onerror=&quot;javascript:alert(1)&quot;&gt;</p>'
  },
  {
    name: 'xss: 173',
    source: '<img\\x13src=x onerror="javascript:alert(1)">',
    expected:
      '<p>&lt;img\\x13src=x onerror=&quot;javascript:alert(1)&quot;&gt;</p>'
  },
  {
    name: 'xss: 174',
    source: '<img\\x32src=x onerror="javascript:alert(1)">',
    expected:
      '<p>&lt;img\\x32src=x onerror=&quot;javascript:alert(1)&quot;&gt;</p>'
  },
  {
    name: 'xss: 175',
    source: '<img\\x47src=x onerror="javascript:alert(1)">',
    expected:
      '<p>&lt;img\\x47src=x onerror=&quot;javascript:alert(1)&quot;&gt;</p>'
  },
  {
    name: 'xss: 176',
    source: '<img\\x11src=x onerror="javascript:alert(1)">',
    expected:
      '<p>&lt;img\\x11src=x onerror=&quot;javascript:alert(1)&quot;&gt;</p>'
  },
  {
    name: 'xss: 177',
    source: '<img \\x47src=x onerror="javascript:alert(1)">',
    expected:
      '<p>&lt;img \\x47src=x onerror=&quot;javascript:alert(1)&quot;&gt;</p>'
  },
  {
    name: 'xss: 178',
    source: '<img \\x34src=x onerror="javascript:alert(1)">',
    expected:
      '<p>&lt;img \\x34src=x onerror=&quot;javascript:alert(1)&quot;&gt;</p>'
  },
  {
    name: 'xss: 179',
    source: '<img \\x39src=x onerror="javascript:alert(1)">',
    expected:
      '<p>&lt;img \\x39src=x onerror=&quot;javascript:alert(1)&quot;&gt;</p>'
  },
  {
    name: 'xss: 180',
    source: '<img \\x00src=x onerror="javascript:alert(1)">',
    expected:
      '<p>&lt;img \\x00src=x onerror=&quot;javascript:alert(1)&quot;&gt;</p>'
  },
  {
    name: 'xss: 181',
    source: '<img src\\x09=x onerror="javascript:alert(1)">',
    expected:
      '<p>&lt;img src\\x09=x onerror=&quot;javascript:alert(1)&quot;&gt;</p>'
  },
  {
    name: 'xss: 182',
    source: '<img src\\x10=x onerror="javascript:alert(1)">',
    expected:
      '<p>&lt;img src\\x10=x onerror=&quot;javascript:alert(1)&quot;&gt;</p>'
  },
  {
    name: 'xss: 183',
    source: '<img src\\x13=x onerror="javascript:alert(1)">',
    expected:
      '<p>&lt;img src\\x13=x onerror=&quot;javascript:alert(1)&quot;&gt;</p>'
  },
  {
    name: 'xss: 184',
    source: '<img src\\x32=x onerror="javascript:alert(1)">',
    expected:
      '<p>&lt;img src\\x32=x onerror=&quot;javascript:alert(1)&quot;&gt;</p>'
  },
  {
    name: 'xss: 185',
    source: '<img src\\x12=x onerror="javascript:alert(1)">',
    expected:
      '<p>&lt;img src\\x12=x onerror=&quot;javascript:alert(1)&quot;&gt;</p>'
  },
  {
    name: 'xss: 186',
    source: '<img src\\x11=x onerror="javascript:alert(1)">',
    expected:
      '<p>&lt;img src\\x11=x onerror=&quot;javascript:alert(1)&quot;&gt;</p>'
  },
  {
    name: 'xss: 187',
    source: '<img src\\x00=x onerror="javascript:alert(1)">',
    expected:
      '<p>&lt;img src\\x00=x onerror=&quot;javascript:alert(1)&quot;&gt;</p>'
  },
  {
    name: 'xss: 188',
    source: '<img src\\x47=x onerror="javascript:alert(1)">',
    expected:
      '<p>&lt;img src\\x47=x onerror=&quot;javascript:alert(1)&quot;&gt;</p>'
  },
  {
    name: 'xss: 189',
    source: '<img src=x\\x09onerror="javascript:alert(1)">',
    expected:
      '<p>&lt;img src=x\\x09onerror=&quot;javascript:alert(1)&quot;&gt;</p>'
  },
  {
    name: 'xss: 190',
    source: '<img src=x\\x10onerror="javascript:alert(1)">',
    expected:
      '<p>&lt;img src=x\\x10onerror=&quot;javascript:alert(1)&quot;&gt;</p>'
  },
  {
    name: 'xss: 191',
    source: '<img src=x\\x11onerror="javascript:alert(1)">',
    expected:
      '<p>&lt;img src=x\\x11onerror=&quot;javascript:alert(1)&quot;&gt;</p>'
  },
  {
    name: 'xss: 192',
    source: '<img src=x\\x12onerror="javascript:alert(1)">',
    expected:
      '<p>&lt;img src=x\\x12onerror=&quot;javascript:alert(1)&quot;&gt;</p>'
  },
  {
    name: 'xss: 193',
    source: '<img src=x\\x13onerror="javascript:alert(1)">',
    expected:
      '<p>&lt;img src=x\\x13onerror=&quot;javascript:alert(1)&quot;&gt;</p>'
  },
  {
    name: 'xss: 194',
    source: '<img[a][b][c]src[d]=x[e]onerror=[f]"alert(1)">',
    expected:
      '<p>&lt;img[a][b][c]src[d]=x[e]onerror=[f]&quot;alert(1)&quot;&gt;</p>'
  },
  {
    name: 'xss: 195',
    source: '<img src=x onerror=\\x09"javascript:alert(1)">',
    expected:
      '<p>&lt;img src=x onerror=\\x09&quot;javascript:alert(1)&quot;&gt;</p>'
  },
  {
    name: 'xss: 196',
    source: '<img src=x onerror=\\x10"javascript:alert(1)">',
    expected:
      '<p>&lt;img src=x onerror=\\x10&quot;javascript:alert(1)&quot;&gt;</p>'
  },
  {
    name: 'xss: 197',
    source: '<img src=x onerror=\\x11"javascript:alert(1)">',
    expected:
      '<p>&lt;img src=x onerror=\\x11&quot;javascript:alert(1)&quot;&gt;</p>'
  },
  {
    name: 'xss: 198',
    source: '<img src=x onerror=\\x12"javascript:alert(1)">',
    expected:
      '<p>&lt;img src=x onerror=\\x12&quot;javascript:alert(1)&quot;&gt;</p>'
  },
  {
    name: 'xss: 199',
    source: '<img src=x onerror=\\x32"javascript:alert(1)">',
    expected:
      '<p>&lt;img src=x onerror=\\x32&quot;javascript:alert(1)&quot;&gt;</p>'
  },
  {
    name: 'xss: 200',
    source: '<img src=x onerror=\\x00"javascript:alert(1)">',
    expected:
      '<p>&lt;img src=x onerror=\\x00&quot;javascript:alert(1)&quot;&gt;</p>'
  },
  {
    name: 'xss: 201',
    source:
      '<a href=java&#1&#2&#3&#4&#5&#6&#7&#8&#11&#12script:javascript:alert(1)>XXX</a>',
    expected: '<p><a>XXX</a></p>'
  },
  {
    name: 'xss: 202',
    source: '<img src="x` `<script>javascript:alert(1)</script>"` `>',
    expected: '<p>&lt;img src=&quot;x<code></code>&quot;<code></code>&gt;</p>'
  },
  {
    name: 'xss: 203',
    source: '<img src onerror /" \'"= alt=javascript:alert(1)//">',
    expected:
      '<p>&lt;img src onerror /&quot; &apos;&quot;= alt=javascript:alert(1)//&quot;&gt;</p>'
  },
  {
    name: 'xss: 204',
    source:
      '<title onpropertychange=javascript:alert(1)></title><title title=>',
    expected: ''
  },
  {
    name: 'xss: 205',
    source:
      '<a href=http://foo.bar/#x=`y></a><img alt="`><img src=x:x onerror=javascript:alert(1)></a>">',
    expected:
      '<p>&lt;a href=<a target="_blank" rel="noopener noreferrer" href="http://foo.bar/#x=%60y&gt;">http://foo.bar/#x=`y&gt;</a><img alt="`&gt;&lt;img src=x:x onerror=javascript:alert(1)&gt;&lt;/a&gt;"></p>'
  },
  {
    name: 'xss: 206',
    source: '<!--[if]><script>javascript:alert(1)</script -->',
    expected: ''
  },
  {
    name: 'xss: 207',
    source: '<!--[if<img src=x onerror=javascript:alert(1)//]> -->',
    expected: ''
  },
  {
    name: 'xss: 208',
    source: '<script src="/\\%(jscript)s"></script>',
    expected: ''
  },
  {
    name: 'xss: 209',
    source: '<script src="\\\\%(jscript)s"></script>',
    expected: ''
  },
  {
    name: 'xss: 210',
    source: '<IMG """><SCRIPT>alert("XSS")</SCRIPT>">',
    expected: '<p>&lt;IMG &quot;&quot;&quot;&gt;&quot;&gt;</p>'
  },
  {
    name: 'xss: 211',
    source: '<IMG SRC=javascript:alert(String.fromCharCode(88,83,83))>',
    expected: '<img>'
  },
  {
    name: 'xss: 212',
    source: '<IMG SRC=# onmouseover="alert(\'xxs\')">',
    expected: '<img src="#">'
  },
  {
    name: 'xss: 213',
    source: '<IMG SRC= onmouseover="alert(\'xxs\')">',
    expected:
      '<p>&lt;IMG SRC= onmouseover=&quot;alert(&apos;xxs&apos;)&quot;&gt;</p>'
  },
  {
    name: 'xss: 214',
    source: '<IMG onmouseover="alert(\'xxs\')">',
    expected: '<img>'
  },
  {
    name: 'xss: 215',
    source:
      '<IMG SRC=&#106;&#97;&#118;&#97;&#115;&#99;&#114;&#105;&#112;&#116;&#58;&#97;&#108;&#101;&#114;&#116;&#40;&#39;&#88;&#83;&#83;&#39;&#41;>',
    expected: '<img>'
  },
  {
    name: 'xss: 216',
    source:
      '<IMG SRC=&#0000106&#0000097&#0000118&#0000097&#0000115&#0000099&#0000114&#0000105&#0000112&#0000116&#0000058&#0000097&#0000108&#0000101&#0000114&#0000116&#0000040&#0000039&#0000088&#0000083&#0000083&#0000039&#0000041>',
    expected: '<img>'
  },
  {
    name: 'xss: 217',
    source:
      '<IMG SRC=&#x6A&#x61&#x76&#x61&#x73&#x63&#x72&#x69&#x70&#x74&#x3A&#x61&#x6C&#x65&#x72&#x74&#x28&#x27&#x58&#x53&#x53&#x27&#x29>',
    expected: '<img>'
  },
  {
    name: 'xss: 218',
    source: '<IMG SRC="jav   ascript:alert(\'XSS\');">',
    expected: '<img>'
  },
  {
    name: 'xss: 219',
    source: '<IMG SRC="jav&#x09;ascript:alert(\'XSS\');">',
    expected: '<img>'
  },
  {
    name: 'xss: 220',
    source: '<IMG SRC="jav&#x0A;ascript:alert(\'XSS\');">',
    expected: '<img>'
  },
  {
    name: 'xss: 221',
    source: '<IMG SRC="jav&#x0D;ascript:alert(\'XSS\');">',
    expected: '<img>'
  },
  {
    name: 'xss: 222',
    source:
      'perl -e \'print "<IMG SRC=java\\0script:alert(\\"XSS\\")>";\' > out',
    expected:
      '<p>perl -e &apos;print &quot;&lt;IMG SRC=java\\0script:alert(&quot;XSS&quot;)&gt;&quot;;&apos; &gt; out</p>'
  },
  {
    name: 'xss: 223',
    source: '<IMG SRC=" &#14;  javascript:alert(\'XSS\');">',
    expected: '<img>'
  },
  {
    name: 'xss: 224',
    source: '<SCRIPT/XSS SRC="http://ha.ckers.org/xss.js"></SCRIPT>',
    expected:
      '<p>&lt;SCRIPT/XSS SRC=&quot;<a target="_blank" rel="noopener noreferrer" href="http://ha.ckers.org/xss.js&quot;&gt;">http://ha.ckers.org/xss.js&quot;&gt;</a></p>'
  },
  {
    name: 'xss: 225',
    source: '<BODY onload!#$%&()*~+-_.,:;?@[/|\\]^`=alert("XSS")>',
    expected: ''
  },
  {
    name: 'xss: 226',
    source: '<SCRIPT/SRC="http://ha.ckers.org/xss.js"></SCRIPT>',
    expected:
      '<p>&lt;SCRIPT/SRC=&quot;<a target="_blank" rel="noopener noreferrer" href="http://ha.ckers.org/xss.js&quot;&gt;">http://ha.ckers.org/xss.js&quot;&gt;</a></p>'
  },
  {
    name: 'xss: 227',
    source: '<<SCRIPT>alert("XSS");//<</SCRIPT>',
    expected: '<p>&lt;</p>'
  },
  {
    name: 'xss: 228',
    source: '<SCRIPT SRC=http://ha.ckers.org/xss.js?< B >',
    expected: ''
  },
  {
    name: 'xss: 229',
    source: '<SCRIPT SRC=//ha.ckers.org/.j>',
    expected: ''
  },
  {
    name: 'xss: 230',
    source: '<IMG SRC="javascript:alert(\'XSS\')"',
    expected:
      '<p>&lt;IMG SRC=&quot;javascript:alert(&apos;XSS&apos;)&quot;</p>'
  },
  {
    name: 'xss: 231',
    source: '<iframe src=http://ha.ckers.org/scriptlet.html <',
    expected: ''
  },
  {
    name: 'xss: 232',
    source: "\\\";alert('XSS');//",
    expected: '<p>&quot;;alert(&apos;XSS&apos;);//</p>'
  },
  {
    name: 'xss: 233',
    source: '<u oncopy=alert()> Copy me</u>',
    expected: '<p> Copy me</p>'
  },
  {
    name: 'xss: 234',
    source: '<i onwheel=alert(1)> Scroll over me </i>',
    expected: '<p><i> Scroll over me </i></p>'
  },
  {
    name: 'xss: 235',
    source: '<plaintext>',
    expected: ''
  },
  {
    name: 'xss: 236',
    source: 'http://a/%%30%30',
    expected:
      '<p><a target="_blank" rel="noopener noreferrer" href="http://a/%%30%30">http://a/%%30%30</a></p>'
  },
  {
    name: 'xss: 237',
    source: '</textarea><script>alert(123)</script>',
    expected: '<p></p>'
  },
  {
    name: 'Custom sanitizer options: allowedTags can be overridden',
    sanitizerOptions: customSanitizerOptions({
      allowedTags: without(defaultSanitizerOptions.allowedTags, 'h1')
    }),
    source: '# Foobar\nSome text',
    expected: 'Foobar\n<p>Some text</p>'
  },
  {
    name: 'Custom sanitizer options: allowedAttributes can be overridden',
    sanitizerOptions: customSanitizerOptions({
      allowedAttributes: {
        input: ['disabled']
      }
    }),
    source: '<input disabled checked>',
    expected: '<input disabled>'
  }
]
