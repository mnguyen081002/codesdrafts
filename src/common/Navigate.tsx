import styled from '@emotion/styled';
import { MenuItem, MenuList, Paper, Stack } from '@mui/material';

interface INavigate {
  title: string;
  main: string[];
}

export const ListItem = styled(Stack)(() => ({
  position: 'relative',
  '&:hover .MuiPaper-root': {
    display: 'inline',
  },
}));

export const ItemPopover = styled(Paper)(() => ({
  position: 'absolute',
  zIndex: 2,
  left: 0,
  top: 30,
  display: 'none',
}));

const Navigate = () => {
  const navigate: INavigate[] = [
    // { title: 'Solutions', main: ['Educative Enterprise', 'Developers'] },
    // { title: 'Products', main: ['Courses for Enterprise', 'Courses for Individuals'] },
  ];

  return (
    <div className="flex items-center justify-start gap-6">
      {navigate.map((item) => {
        return (
          <ListItem key={item.title}>
            <span>{item.title}</span>
            <ItemPopover elevation={2}>
              <MenuList>
                {item.main.map((subItem) => {
                  return <MenuItem key={subItem}>{subItem}</MenuItem>;
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
