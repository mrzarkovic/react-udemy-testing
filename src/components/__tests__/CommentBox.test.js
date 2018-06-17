import React from 'react';
import { mount } from 'enzyme';

import Root from 'Root';
import CommentBox from 'components/CommentBox';

// Wrapped CommentBox Component
let wrapped;

beforeEach(() => {
  try {
    wrapped = mount(
      <Root>
        <CommentBox history={{ push: () => {} }} />
      </Root>
    );
  } catch (err) {
    console.log(err);
  }
});

afterEach(() => {
  wrapped.unmount();
});

it('shows a textarea and two buttons', () => {
  expect(wrapped.find('textarea').length).toEqual(1);
  expect(wrapped.find('button').length).toEqual(2);
});

describe('the textarea', () => {
  beforeEach(() => {
    // Simulate a 'change' event on textarea
    // and provide a fake event object
    wrapped.find('textarea').simulate('change', {
      target: {
        value: 'new comment'
      }
    });

    // Force component to update
    wrapped.update();
  });

  it('has a textarea that users can type in', () => {
    // Assert that the textarea value changed
    expect(wrapped.find('textarea').prop('value')).toEqual('new comment');
  });

  it('when form is submitted, textarea gets emptied', () => {
    wrapped.find('form').simulate('submit');
    wrapped.update();
    expect(wrapped.find('textarea').prop('value')).toEqual('');
  });
});
