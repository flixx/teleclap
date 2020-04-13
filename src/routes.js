import Home from './views/Home'
import TestRoom from './views/TestRoom'
import OpenRoom from './views/OpenRoom'
import Room from './views/Room'

export default [
  {
    path: '/',
    component: Home
  },
  {
    path: '/test-room',
    component: TestRoom
  },
  {
    path: '/open-room',
    component: OpenRoom
  },
  {
    path: '*',
    component: Room
  }
]