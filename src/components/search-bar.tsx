import { InputBase, alpha, styled } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import * as React from "react";
import { debounce } from "lodash";
import { constants } from "../constants";

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%'
  }));
  
const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));


interface SearchBarProps{
    onInputChange: (input: string) => void;
}

export const SearchBar = (
    {
        onInputChange
    }: SearchBarProps
) => {

    const debouncedSearch = React.useRef(
        debounce(
            (input: string) => {
                onInputChange(input)
            }, 
            constants.search.debounceTime
        )).current;

    React.useEffect(() => {
        return () => {
          debouncedSearch.cancel();
        };
    }, [debouncedSearch]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        debouncedSearch(event.target.value)
    }

    return(
        <Search>
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                onChange={handleChange}
                sx={{
                    display: 'flex',
                    width: '100%'
                }}
            />
        </Search>
    )

}