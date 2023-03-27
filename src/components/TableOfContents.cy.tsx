import React from 'react';
import { Typography } from '@mui/material';

import TableOfContents, { TableOfContentsProps } from './TableOfContents';

describe('<TableOfContents />', () => {
  it('renders', () => {
    const props: TableOfContentsProps = {
      contents: [
        {
          header: 'Test Header',
          element: <Typography>test element</Typography>
        }
      ]
    };
    cy.mount(<TableOfContents {...props} />);
    cy.get('a').should('contain.text', props.contents[0].header);
  });
});
