import * as React from 'react';
import keys from 'lodash/keys';
import get from 'lodash/get';
import escapeRegExp from 'lodash/escapeRegExp';
import filter from 'lodash/filter';
import memoize from 'lodash/memoize';
import JsonSchema7Schema from 'ajv/lib/refs/json-schema-draft-07.json';
import jsone from 'json-e';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUndo } from '@fortawesome/free-solid-svg-icons/faUndo';
import asRendition from '../../../asRendition';
import {
	DefaultProps,
	RenditionSystemProps,
	Theme,
} from '../../../common-types';
import { Flex } from '../../../components/Flex';
import { Box } from '../../../components/Box';
import Card from '../../../components/Card';
import Select from '../../../components/Select';
import Button from '../../../components/Button';
import Heading from '../../../components/Heading';
import JsonSchemaRenderer, { JsonSchemaRendererProps } from '../index';
import { Format, Value, JSONSchema, UiSchema } from '../types';
import JsonEditor from './JsonEditor';
import { generateUiSchemaMetaSchema } from './util';

const EXTRA_FORMATS: Format[] = [
	{
		name: 'markdown',
		format: '.*',
	},
];

const SlimCard = styled(Card)`
	& > div {
		flex: 1;
		display: flex;
		flex-direction: column;
	}
`;

const ResultCard = styled(SlimCard)`
	& > div > div:last-child {
		display: flex;
	}
`;

const EditCard = styled(SlimCard)`
	& > div > div {
		flex: 1;
		display: flex;
		flex-direction: column;
		min-height: 0;
	}
`;

const defaultJsonProps = { value: {}, schema: {}, uiSchema: {} };
const defaultRegExp = new RegExp('');
const getExampleNames = memoize((examples) => keys(examples));

const commonCardProps = {
	small: true,
	backgroundColor: 'quartenary.light',
};

const JsonSchemaRendererPlayground = ({
	title = 'JSON Playground',
	examples,
	...props
}: ThemedJsonSchemaRendererPlaygroundProps) => {
	const [selectedExample, setSelectedExample] = React.useState<string>('');
	const [searchTermRegExp, setSearchTermRegExp] = React.useState<RegExp>(
		defaultRegExp,
	);

	const [value, setValue] = React.useState<Value>({});
	const [schema, setSchema] = React.useState<object>({});
	const [uiSchema, setUiSchema] = React.useState<object>({});

	const [valueStr, setValueStr] = React.useState<string>(
		JSON.stringify(value, null, 2),
	);
	const [schemaStr, setSchemaStr] = React.useState<string>(
		JSON.stringify(schema, null, 2),
	);
	const [uiSchemaStr, setUiSchemaStr] = React.useState<string>(
		JSON.stringify(uiSchema, null, 2),
	);

	const [isValueJsonValid, setIsValueJsonValid] = React.useState<boolean>(true);
	const [isSchemaJsonValid, setIsSchemaJsonValid] = React.useState<boolean>(
		true,
	);
	const [isUiSchemaJsonValid, setIsUiSchemaJsonValid] = React.useState<boolean>(
		true,
	);

	const [uiSchemaMetaSchema, setUiSchemaMetaSchema] = React.useState<object>(
		{},
	);

	const [jsonProps, setJsonProps] = React.useState<JsonSchemaRendererProps>(
		defaultJsonProps,
	);

	const reset = React.useCallback(() => {
		setSelectedExample('');
		setSearchTermRegExp(defaultRegExp);
	}, [setSelectedExample, setSearchTermRegExp]);

	React.useEffect(() => {
		try {
			setValue(JSON.parse(valueStr));
			setIsValueJsonValid(true);
		} catch {
			setIsValueJsonValid(false);
		}
	}, [valueStr]);

	React.useEffect(() => {
		try {
			setSchema(JSON.parse(schemaStr));
			setIsSchemaJsonValid(true);
		} catch {
			setIsSchemaJsonValid(false);
		}
	}, [schemaStr]);

	React.useEffect(() => {
		try {
			setUiSchema(JSON.parse(uiSchemaStr));
			setIsUiSchemaJsonValid(true);
		} catch {
			setIsUiSchemaJsonValid(false);
		}
	}, [uiSchemaStr]);

	React.useEffect(() => {
		const example = get(examples, selectedExample, defaultJsonProps);
		setValueStr(JSON.stringify(example.value, null, 2));
		setSchemaStr(JSON.stringify(example.schema, null, 2));
		setUiSchemaStr(JSON.stringify(example.uiSchema, null, 2));
		setSearchTermRegExp(defaultRegExp);
	}, [selectedExample]);

	React.useEffect(() => {
		try {
			const processedUiSchema = jsone(uiSchema, { source: value });
			const newMetaSchema = generateUiSchemaMetaSchema({
				value,
				schema,
				uiSchema: processedUiSchema,
			});
			setUiSchemaMetaSchema(newMetaSchema);
			setJsonProps({ value, schema, uiSchema });
		} catch (error) {
			console.error('Failed to parse schemas', error);
		}
	}, [uiSchema, schema, value]);

	const unfilteredExampleNames = getExampleNames(examples);
	const exampleNames = searchTermRegExp.source
		? filter(unfilteredExampleNames, (name) => searchTermRegExp.test(name))
		: unfilteredExampleNames;

	return (
		<Flex p={3} {...props}>
			<Flex flex="1 1 50%" minWidth={0} flexDirection="column" pr={2}>
				<Flex mb={3} alignItems="center" justifyContent="space-between">
					<Heading.h3>{title}</Heading.h3>
					<Flex ml={3} alignItems="center" justifyContent="flex-end" flex={1}>
						<Box flex={1}>
							<Select
								placeholder="Load an example..."
								emptySearchMessage="No results"
								searchPlaceholder="Search..."
								onSearch={(s) =>
									setSearchTermRegExp(new RegExp(escapeRegExp(s), 'i'))
								}
								value={selectedExample}
								options={exampleNames}
								onChange={({ option }) => {
									setSelectedExample(option as string);
								}}
							/>
						</Box>
						<Button
							ml={2}
							tooltip={{ text: 'Reset', placement: 'right' }}
							icon={<FontAwesomeIcon icon={faUndo} />}
							onClick={reset}
						/>
					</Flex>
				</Flex>
				<EditCard flex={1} {...commonCardProps}>
					<JsonEditor
						title="Data"
						value={valueStr}
						onChange={setValueStr}
						schema={schema}
						isValid={isValueJsonValid}
					/>
					<JsonEditor
						title="Schema"
						value={schemaStr}
						onChange={setSchemaStr}
						schema={JsonSchema7Schema}
						isValid={isSchemaJsonValid}
					/>
					<JsonEditor
						title="UI Schema"
						value={uiSchemaStr}
						onChange={setUiSchemaStr}
						schema={uiSchemaMetaSchema}
						isValid={isUiSchemaJsonValid}
					/>
				</EditCard>
			</Flex>
			<Flex flex="1 1 50%" minWidth={0} flexDirection="column" pl={2}>
				<ResultCard flex={1} {...commonCardProps} title="Result">
					<JsonSchemaRenderer
						{...jsonProps}
						p={2}
						pb={1}
						validate
						backgroundColor="#fff"
						extraFormats={EXTRA_FORMATS}
					/>
				</ResultCard>
			</Flex>
		</Flex>
	);
};

interface InternalJsonSchemaRendererPlaygroundProps extends DefaultProps {
	title?: string;
	examples?: {
		[key: string]: {
			value: Value;
			schema: JSONSchema;
			uiSchema: UiSchema;
		};
	};
}

interface ThemedJsonSchemaRendererPlaygroundProps
	extends InternalJsonSchemaRendererPlaygroundProps {
	theme: Theme;
}

export type JsonSchemaRendererPlaygroundProps = InternalJsonSchemaRendererPlaygroundProps &
	RenditionSystemProps;

export default asRendition<
	React.FunctionComponent<JsonSchemaRendererPlaygroundProps>
>(JsonSchemaRendererPlayground);
