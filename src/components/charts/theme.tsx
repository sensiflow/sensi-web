import * as Echarts from "echarts";
import { Theme, useTheme } from '@mui/material/styles';
import { tokens } from "../../theme";

const theme: Theme = useTheme()
const colors = tokens(theme.palette.mode);

const appTheme = {
    color: [
        "#9b8bba",
        colors.grey[100],
        "#8fd3e8",
        "#71669e",
        "#cc70af",
        "#7cb4cc"
    ],
    backgroundColor: colors.primary[400],
}


Echarts.registerTheme('app-theme-dark', appTheme);