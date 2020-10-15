import React from 'react';
import { PageLayout } from '../../../../../src/components/views';
import { TEPageFooter } from '../../../../../src/components/atoms';
import { ViewData } from '../../../../../src/components/transfers';
import PageHeader from '../../../../../src/components/PageHeader';
import styled from 'styled-components';
import { Layout, Empty, Button } from 'antd';
import Link from 'next/link';
import { getUserData } from '../../../../../src/utils';


const Transfers = () => {
	let userData = getUserData()
	return (
		<PageLayout>
			<TransferContent>
				{/* <EmptyTransferContent>
          <PageHeader />
          <EmptyDataContent>
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}>
              <Message>
                Currently you do not have any transfers to manage.
              </Message>
              <Button type="primary" size="large">
                <Link href="transfers/new">
                  <a>Add transfer</a>
                </Link>
              </Button>
            </Empty>
          </EmptyDataContent>
          <TEPageFooter>
            Learn more about
            <Link href="#">
              <a> transfers</a>
            </Link>
          </TEPageFooter>
        </EmptyTransferContent> */}
				<ViewsTransferContent>
					<PageHeaderContent>
						<TitleActionContent>
							<PageHeaderTitle>Transfers</PageHeaderTitle>
						</TitleActionContent>
						<Button type="primary" size="large">
						<Link href="/[portal_id]/ecom/products/transfers/new" as={`/${userData?.uniqueID}/ecom/products/transfers/new`}>
								<a>Add transfer</a>
							</Link>
						</Button>
					</PageHeaderContent>
					<ViewData />
					<TEPageFooter>
						Learn more about
						<Link href="#">
							<a> transfers.</a>
						</Link>
					</TEPageFooter>
				</ViewsTransferContent>
			</TransferContent>
		</PageLayout>
	);
};

const PageHeaderContent = styled(Layout.Content)`
	display: flex;
	margin-bottom: 20px;
	justify-content: space-between;
	align-items: center;
`;

const ImportExportContent = styled.div`
	display: flex;
	margin-top: 5px;
	button {
		margin-right: 20px;
	}
`;

const TitleActionContent = styled.div`
	flex: 1 1 auto;
	padding-bottom: 10px;
	border-bottom: ${props => (props.transferData ? '1px solid #bbc3c9' : 0)};
`;

const PageHeaderTitle = styled.h1`
	font-size: 27px;
	margin-bottom: 0;
	font-weight: 600;
	color: #212b36;
`;

const TransferContent = styled.div`
	padding: 20px;
`;

const EmptyTransferContent = styled.div`
	padding: 20px;
	max-width: 60rem;
	margin: 0 auto;
`;

const StyledSettingFooter = styled.div`
	display: flex;
	justify-content: center;
	padding-top: 20px;
`;

const ViewsTransferContent = styled.div`
	padding: 20px;
`;

const EmptyDataContent = styled(Layout.Content)`
	padding: 20px;
	width: 100%;
	border: none;
	outline: none;
	display: flex;
	justify-content: center;
	min-height: 50vh;
	align-items: center;
	background: white;
	box-shadow: 0px 4px 4px rgba(186, 195, 201, 0.25);
	border-radius: 5px;
`;

const Message = styled.p`
	color: #637381;
	font-size: 14px;
`;

export default Transfers;
