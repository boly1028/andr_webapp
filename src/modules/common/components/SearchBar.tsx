import React, { FC } from "react";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import SearchIcon from "./icons/SearchIcon";

type Props = {

};

const SearchBar: FC<Props> = ({ ...props }) => {
  return (
      <InputGroup>
        <InputLeftElement 
          pointerEvents='none'
          children={<SearchIcon color='content.medium' />}
          height="40px"
        />
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
