import React from 'react';
import { mount } from 'enzyme';
import moxios from 'moxios';

import { Provider } from 'react-redux';

import { MemoryRouter } from 'react-router-dom';

import Root from 'Root';
import App from 'components/App';

beforeEach(() => {
  moxios.install();
  moxios.stubRequest('http://jsonplaceholder.typicode.com/comments', {
    status: 200,
    response: [
      {
        name: 'Fetched #1'
      },
      {
        name: 'Fetched #2'
      }
    ]
  });
});

afterEach(() => {
  moxios.uninstall();
});

it('can fetch a list of comments and display them', done => {
  const initialState = {
    auth: true
  };

  // Attemp to render the *entire* App
  const wrapped = mount(
    <Root initialState={initialState}>
      <MemoryRouter initialEntries={['/post']}>
        <App />
      </MemoryRouter>
    </Root>
  );

  // find the 'fetchComments' button and click it
  wrapped.find('.fetch-comments').simulate('click');
  // introduce a TINY little pause
  moxios.wait(() => {
    // expect to find a list of comments!
    wrapped.update();
    const state = wrapped
      .find(Provider)
      .prop('store')
      .getState();
    try {
      expect(state.comments.length).toEqual(2);
      done();
    } catch (error) {
      done.fail(error);
    }
    wrapped.unmount();
  });
});
