import * as React from 'react';
import Txt, { TxtProps } from '../../components/Txt';
import Heading from '../../components/Heading';
import Link from '../../components/Link';
import unified from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeReact from 'rehype-react';
import sanitize from 'rehype-sanitize';
import raw from 'rehype-raw';
import prism from '@mapbox/rehype-prism';
import Divider from '../../components/Divider';
import styled, { withTheme } from 'styled-components';
import gh from 'hast-util-sanitize/lib/github.json';
import { Theme } from '../../common-types';
import 'prismjs/themes/prism.css';
export { gh as defaultSanitizerOptions };

const MarkdownWrapper = styled(Txt)`
	* {
		box-sizing: border-box;
	}

	& code {
		background-color: rgba(27, 31, 35, 0.05);
		padding: 0.2em 0px;
		margin: 0px;
		border-radius: 3px;
		line-height: 1.2;
	}

	& pre {
		background-color: rgba(27, 31, 35, 0.05);
	}

	& pre > code {
		background: none;
	}

	& code,
	kbd,
	pre {
		font-family: ${(props) => props.theme.monospace};
	}

	& kbd {
		display: inline-block;
		padding: 3px 5px;
		font-size: 11px;
		line-height: 10px;
		color: #444d56;
		vertical-align: middle;
		background-color: #fafbfc;
		border: solid 1px #d1d5da;
		border-bottom-color: #c6cbd1;
		border-radius: 3px;
		box-shadow: inset 0 -1px 0 #c6cbd1;
	}

	dl {
		padding: 0;
	}

	dl dt {
		padding: 0;
		margin-top: 16px;
		font-size: 1em;
		font-style: italic;
		font-weight: 600;
	}

	dl dd {
		padding: 0 16px;
		margin-bottom: 16px;
	}

	td,
	th {
		padding: 0;
	}

	table {
		border-spacing: 0;
		border-collapse: collapse;
		display: block;
		width: 100%;
		overflow: auto;
	}

	table th {
		font-weight: 600;
	}

	table th,
	table td {
		padding: 6px 13px;
		border: 1px solid #dfe2e5;
	}

	table tr {
		background-color: #fff;
		border-top: 1px solid #c6cbd1;
	}

	table tr:nth-child(2n) {
		background-color: #f6f8fa;
	}

	blockquote {
		margin: 0;
	}

	blockquote,
	dl,
	table {
		margin-top: 0;
		margin-bottom: 16px;
	}

	blockquote {
		padding: 0 1em;
		color: #6a737d;
		border-left: 0.25em solid #dfe2e5;
	}

	blockquote > :first-child {
		margin-top: 0;
	}

	blockquote > :last-child {
		margin-bottom: 0;
	}
`;

type components = {
	[element: string]: React.ReactElement;
};

export const getProcessor = (
	componentOverrides?: components,
	sanitizerOptions?: any,
) => {
	return unified()
		.use(remarkParse, { gfm: true })
		.use(remarkRehype, { allowDangerousHtml: true })
		.use(prism)
		.use(raw)
		.use(
			sanitize,
			sanitizerOptions ?? {
				...gh,
				attributes: {
					...gh.attributes,
					'*': [...gh.attributes['*'], 'class', 'className'],
				},
			},
		)
		.use(rehypeReact, {
			createElement: React.createElement,
			components: {
				p: (props: any) => <Txt.p {...props} />,
				a: (props: any) => <Link {...props} />,
				h1: (props: any) => <Heading.h1 {...props} />,
				h2: (props: any) => <Heading.h2 {...props} />,
				h3: (props: any) => <Heading.h3 {...props} />,
				h4: (props: any) => <Heading.h4 {...props} />,
				h5: (props: any) => <Heading.h5 {...props} />,
				h6: (props: any) => <Heading.h6 {...props} />,
				hr: (props: any) => <Divider {...props} />,
				...componentOverrides,
			},
		});
};

type MarkdownProps = TxtProps & {
	children: string;
	componentOverrides?: components;
	theme: Theme;
	sanitizerOptions?: any; // https://github.com/syntax-tree/hast-util-sanitize#schema
};

export const MarkdownBase = ({
	children,
	componentOverrides,
	sanitizerOptions,
	...props
}: MarkdownProps) => {
	return (
		<MarkdownWrapper {...props}>
			{
				(getProcessor(componentOverrides, sanitizerOptions).processSync(
					children,
				) as any).result // type any because vFile types doesn't contains result, even though it should.
			}
		</MarkdownWrapper>
	);
};

export const Markdown = withTheme(MarkdownBase);
