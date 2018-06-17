import React from 'react';
import { mount } from 'enzyme';

import { MemoryRouter } from 'react-router-dom';

import Root from 'Root';
import App from 'components/App';
import CommentBox from 'components/CommentBox';
import CommentList from 'components/CommentList';

// Wrapped App Component
let wrapped;

beforeEach(() => {
  wrapped = mount(
    <Root>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </Root>
  );
});

afterEach(() => {
  wrapped.unmount();
});

it('shows a comment list', () => {
  expect(wrapped.find(CommentList).length).toEqual(1);
});
