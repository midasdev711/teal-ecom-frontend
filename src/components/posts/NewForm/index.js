import React, { useState } from 'react';
import styled from 'styled-components';
import { RemirorEditor } from "../../atoms";

// ui
import { Row } from 'antd';

const NewForm = props => {
	const [collect_tax, setCollectTax] = useState(true);

	const { onChangeEditor } = props;

	const onChange = content => {
		onChangeEditor(content.getHTML())
	}

	return (
		<Row gutter={24}>
			<ContentBox>
				<RemirorEditor onChangeEditor={onChange} />
			</ContentBox>
		</Row>
	);
};

const ContentBox = styled.div`
	padding: 24px;
	width: 100%;
	background: #f6f8f9;
	border-radius: 3px;
	outline: 0.1rem solid transparent;
`;

const TitleBox = styled.h3`
	font-weight: 600;
	font-size: 16px;
	color: #000;
	opacity: 0.9;
`;

export default NewForm;
