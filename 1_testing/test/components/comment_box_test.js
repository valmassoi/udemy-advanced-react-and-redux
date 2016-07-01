import { renderComponent, expect } from '../test_helper'
import CommentBox from '../../src/components/comment_box'

describe('CommentBox', () => {
  let component
  beforeEach(() => {
    component = renderComponent(CommentBox)//component is a jquery
  })

  it('has the correct class', () => {
    expect(component).to.have.class('comment-box')
  })

  it('has a text area', () => {
    expect(component.find('textarea')).to.exist
  })

  it('has a button', () => {
    expect(component.find('button')).to.exist
  })

  describe('entering some text', () => {//nesting
    let textArea
    beforeEach(() => {
      textArea = component.find('textarea')
      textArea.simulate('change', 'new comment')
    })

    it('shows text in textarea', () => {
      expect(textArea).to.have.value('new comment')
    })

    it('when submitted, clears the input', () => {
      component.simulate('submit')
      expect(textArea).to.have.value('')
    })
  })

})
