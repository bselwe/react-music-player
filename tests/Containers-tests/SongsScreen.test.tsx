// import * as actions from '../../src/Containers/SongsScreen/reducers'
// ​
// describe('actions', () => {
//   it('should create an action to update songs', () => {
//     expect(actions.UpdateSongs(text)).toEqual(expectedAction)
//   })
// })

import configureStore from 'redux-mock-store' //ES6 modules
import * as action from '../../src/Containers/SongsScreen/reducers'
const { configureStore } = require('redux-mock-store') //CommonJS

const middlewares = []
const mockStore = configureStore(middlewares)

// You would import the action from your codebase in a real scenario
//const addTodo = () => ({ type: 'ADD_TODO' })

it('should dispatch action', () => {

  // Initialize mockstore with empty state
  const initialState = {}
  const store = mockStore(initialState)

  // Dispatch the action
  store.dispatch(action.UpdateSongs)

  // Test if your store dispatched the expected actions
  const actions = store.getActions()
  const expectedPayload = { type: 'SONGS/UPDATE_SONGS' }
  expect(actions).toEqual([expectedPayload])
})