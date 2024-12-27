import { createBrowserRouter } from 'react-router';
import {
  Usebatterydetailsexample,
  Useclipboarddetails,
  Usegeolocationdeatails,
  Useplatformdetails,
  Usespeechsynthesisdetails,
} from './components/examples';

export const routes = createBrowserRouter([
  {
    path: '/',
    index: true,
  },
  {
    path: '/usebatterydetails',
    element: <Usebatterydetailsexample />,
  },
  {
    path: '/useclipboarddetails',
    element: <Useclipboarddetails />,
  },
  {
    path: '/usegeolocationdeatails',
    element: <Usegeolocationdeatails />,
  },
  {
    path: '/useplatformdetails',
    element: <Useplatformdetails />,
  },
  {
    path: '/usespeechsynthesisdetails',
    element: <Usespeechsynthesisdetails />,
  },
]);
