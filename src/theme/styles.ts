import { ButtonStylesNames } from '@mantine/core'
import { MantineThemeOverride } from '@mantine/core';

export const button = {
  Button: (theme: MantineThemeOverride, params: ButtonStylesNames) => ({
    // Shared button styles are applied to all buttons
    // root: { height: 42, padding: '0 30px' },

    // filled: {
    //   // subscribe to component params
    //   color: theme.colors[params.color || theme.primaryColor][1],
    // },

    // // These styles are applied only to buttons with outline variant
    // outline: {
    //   // You can use any selectors inside (the same way as in createStyles function)
    //   '&:hover': {
    //     backgroundColor:
    //       theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
    //   },
    // },
  }),
}