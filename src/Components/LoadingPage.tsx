import loader from '../assets/Eclipse-1s-200px.svg';
import '../css/loadingpage.css';

export const LoadingPage: React.FC = () => (
  <div className="loader">
    <img className="loader__image" src={loader} alt="Loading..." />
  </div>
);
