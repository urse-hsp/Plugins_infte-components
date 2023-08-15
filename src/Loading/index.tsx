import React from 'react';
import './index.scss';

interface LoadingProps {
  text?: string;
  show: boolean;
}

export function Loading(props: LoadingProps = { show: false, text: '' }) {
  return (
    props.show && (
      <div className="my-loading">
        <div className="my-loading-round" />
        {props.text && <div className="my-loading-text">{props.text}</div>}
      </div>
    )
  );
}

/* loading组件的 React.Element */
export const LoadingElement = React.createElement(
  'div',
  { className: 'my-loading' },
  React.createElement('div', { className: 'my-loading-round' }),
  React.createElement('div', { className: 'my-loading-text' }, 'Loading'),
);

/* loading组件的 React.Element */
export const LoadingElementWrapper = React.createElement(
  'div',
  { id: 'loader-wrapper' },
  <>
    <div id="loader"></div>
    <div className="loader-section section-left"></div>
    <div className="loader-section section-right"></div>
    <div className="load_title">正在加载，请耐心等待</div>
  </>,
);

export function Loader({
  size = '20px',
  stroke,
}: {
  size?: string;
  stroke?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="svg-loading"
      style={{
        height: size,
        width: size,
      }}
      stroke={stroke}
    >
      <path
        d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 9.27455 20.9097 6.80375 19.1414 5"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default Loader;
