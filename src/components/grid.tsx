import { Box, SxProps, Theme } from "@mui/material";
import * as React from 'react';

export interface GridProps {
    children: React.ReactNode;
    columns?: number;
    rows?: number;
    gap?: string;
    sx?: SxProps<Theme>;
}

export function Grid(props: GridProps) {
    const { children, columns, rows, gap, sx } = props;

    return (
        <Box
            display="grid"
            gap = {gap ? gap : "0px"}
            gridTemplateColumns={columns ? `repeat(${columns}, 1fr)` : `repeat(12, 1fr)`}
            gridTemplateRows={rows ? `repeat(${rows}, 1fr)` : `repeat(12, 1fr)`}
            sx = {sx}
        >
            {children}
        </Box>
    );
}

export interface GridItemProps {
    children?: React.ReactNode;
    column: string | number;
    row: string | number;
    sx?: SxProps<Theme>;
}

export function GridItem(props: GridItemProps ) {
    const { children, column, row, sx } = props;

    return (
        <Box
            gridColumn = {column}
            gridRow = {row}
            sx ={sx}
        >
            {children}
        </Box>
    );
}