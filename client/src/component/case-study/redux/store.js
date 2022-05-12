import { createStore, applyMiddleware } from 'redux';
import rootReducerCaseStudy from './reducers'; 
import createSagaMiddleware from 'redux-saga';
import rootSaga from './saga';
 
// Apply middleware
const sagaMiddleware = createSagaMiddleware();
// đăng kí reducer cho redux quản lí
const storeCaseStudy = createStore(rootReducerCaseStudy, applyMiddleware(sagaMiddleware));
// Chạy middleware cho redux để chạy các effect taị dòng code
  
sagaMiddleware.run(rootSaga)
 
export default storeCaseStudy;