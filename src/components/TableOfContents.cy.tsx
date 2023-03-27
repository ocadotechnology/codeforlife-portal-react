import React from 'react';
import {
  Typography
} from '@mui/material';

import theme from 'app/theme';
import TableOfContents, { TableOfContentsProps, ids } from './TableOfContents';

describe('<TableOfContents />', () => {
  const props: TableOfContentsProps = {
    contents: [
      {
        header: 'Test Header 1',
        element: <Typography>test element 1</Typography>
      },
      {
        header: 'Test Header 2',
        element: <Typography>test element 2</Typography>
      },
      {
        header: 'Test Header 3',
        element: <Typography>test element 3</Typography>
      },
      {
        header: 'Test Header 4',
        element: <Typography>test element 3</Typography>
      }
    ]
  };

  it('renders', () => {
    cy.mount(<TableOfContents {...props} />);
    cy.get('a').should('contain.text', props.contents[0].header);
    cy.get('a').should('have.css', 'text-decoration', 'underline solid rgb(0, 0, 0)');
  });

  describe('responsiveness', () => {
    beforeEach(() => {
      cy.mount(<TableOfContents {...props} />);
    });

    Object.entries(theme.breakpoints.values).forEach(([breakpoint, viewportWidth], index) => {
      if (breakpoint !== 'xl') viewportWidth = Object.values(theme.breakpoints.values)[index + 1] - 1;
      it(breakpoint, () => {
        cy.viewport(viewportWidth, 1000);
        const stackWidth = `${breakpoint === 'xs' ? viewportWidth : viewportWidth / 2}${theme.breakpoints.unit ?? ''}`;
        cy.get(`#${ids.leftLinkStack}.MuiGrid2-root`).should('have.css', 'width', stackWidth);
      });
    });
  });
});
