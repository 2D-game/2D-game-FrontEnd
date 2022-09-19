import { Container } from '@mui/material';
import React, { ReactNode } from 'react';
import styles from './PageContainer.styling';

interface IPageContainer {
    children: ReactNode;
}

const PageContainer = ({ children }: IPageContainer) => {

    return (
        <Container fixed sx={styles.rootContainer}>
            {children}
        </Container>

    )
}

export default PageContainer;