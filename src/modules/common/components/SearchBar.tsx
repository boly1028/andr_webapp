import React, { FC } from "react";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import SearchIcon from "./icons/SearchIcon";

const SearchBar: FC = ({ }) => {
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
        />
      </InputGroup>
  );
};

export default SearchBar;
