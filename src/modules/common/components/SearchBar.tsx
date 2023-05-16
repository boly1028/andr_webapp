import React, { FC } from "react";
import { Input, InputGroup, InputLeftElement, InputProps } from "@chakra-ui/react";
import SearchIcon from "./icons/SearchIcon";

const SearchBar: FC<InputProps> = (props) => {
  return (
      <InputGroup>
        <InputLeftElement 
          pointerEvents='none'
          height="40px"
        >
          <SearchIcon color='content.medium' />   
        </InputLeftElement>
        <Input 
          placeholder='Search..'
          size="sm"
          variant="filled"
          height="40px"
          borderRadius="8px"
          {...props}
        />
      </InputGroup>
  );
};

export default SearchBar;
