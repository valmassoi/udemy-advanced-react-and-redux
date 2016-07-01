import { expect } from '../test_helper'
import commentReducer from '../../src/reducers/comments'
import { SAVE_COMMENT } from '../../src/actions/types'

describe('Comments Reducer', () => {

  it('handles action with unknown type', () => {
    expect(commentReducer(undefined, {})).to.eql([])
  })
  it('handles action of type SAVE_COMMENT', () => { // could just be: SAVE_COMMENT
    const action = { type: SAVE_COMMENT, payload: 'test comment' } // see if test payload gets added to state
    expect(commentReducer([], action)).to.eql(['test comment'])
  })

})
