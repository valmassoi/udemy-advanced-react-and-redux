import { renderComponent, expect } from '../test_helper'
import App from '../../src/components/app'

// describe: group together similar tests
describe('App', () => {
  let component
  beforeEach(() => {
    component = renderComponent(App)//component is a jquery
  })
  it('shows a comment box', () => {
    expect(component.find('.comment-box')).to.exist
  })
  it('shows a comment list', () => {
    expect(component.find('.comment-list')).to.exist
  })
})
