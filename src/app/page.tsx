'use client'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import store from '@/redux/store';
import 'react-toastify/dist/ReactToastify.css';
import { Toast } from '@/components/ToastContainer';
import { App } from '../components/app';

export default function Home() {
  return (
    <Provider store={store}>
      <Toast />
      <App />
    </Provider>

  )
}
