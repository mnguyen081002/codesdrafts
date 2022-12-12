import styled from "@emotion/styled";
import { MenuItem, MenuList, Paper, Stack } from "@mui/material";
import React from "react";

interface INavigate {
  title: string;
  main: string[];
}

export const ListItem = styled(Stack)(() => ({
  position: "relative",
  "&:hover .MuiPaper-root": {
    display: "block",
  },
}));

export const ItemPopover = styled(Paper)(() => ({
  position: "absolute",
  zIndex: 2,
  left: 0,
  top: 30,
  display: "none",
}));

const Navigate = () => {
  const navigate: INavigate[] = [
    { title: "Solutions", main: ["Educative Enterprise", "Developers"] },
    { title: "Products", main: ["Courses for Enterprise", "Courses for Individuals"] },
  ];

  return (
    <div className="flex justify-start items-center gap-6" >
      {navigate.map((item) => {
        return (
          <ListItem>
            <span>{item.title}</span>
            <ItemPopover elevation={2}>
              <MenuList>
                {item.main.map((subItem) => {
                  return <MenuItem>{subItem}</MenuItem>;
                })}
              </MenuList>
            </ItemPopover>
          </ListItem>
        );
      })}
    </div>
  );
};

export default Navigate;
