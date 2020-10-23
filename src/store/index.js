import {createStore, compose, applyMiddleware} from 'redux'
import reducer from './reducer'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './rootSaga'

const sagaMiddleware = createSagaMiddleware()
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const enhancer = composeEnhancers(
    applyMiddleware(sagaMiddleware)
)

const store = createStore(
    reducer,
    enhancer
)

rootSaga.map((saga) => {
    sagaMiddleware.run(saga)
    return ''
})

export default store
